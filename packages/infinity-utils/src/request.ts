// 基于 axios 的通用请求封装
// 使用方式：
// 1. 在应用启动时可选调用 setupRequest(...) 注入 token / 提示函数
// 2. 业务代码里直接使用 request.get / request.post 等方法

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

/** 统一响应结构，可根据后端实际返回调整 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/** 扩展请求配置，支持业务侧控制 loading / 错误提示等 */
export interface RequestConfig extends AxiosRequestConfig {
  /** 是否自动显示 loading，默认 false */
  showLoading?: boolean;
  /** 是否自动弹出错误提示，默认 true */
  showError?: boolean;
  /** 是否自动携带 token，默认 true */
  needToken?: boolean;
}

/** 初始化配置（应用侧可在启动时注入） */
export interface RequestSetupOptions {
  /** 基础地址，例如：/api 或 https://xxx.com */
  baseURL?: string;
  /** 超时时间，默认 10s */
  timeout?: number;
  /** 获取 token 的函数，默认从 localStorage 读 token */
  getToken?: () => string | null;
  /** token 前缀，例如 Bearer */
  tokenPrefix?: string;
  /** 统一错误提示函数（例如调用 antd message.error） */
  showError?: (msg: string) => void;
  /** 显示全局 loading 的函数 */
  showLoading?: () => void;
  /** 隐藏全局 loading 的函数 */
  hideLoading?: () => void;
  /** token 过期回调（例如跳转登录） */
  onTokenExpired?: () => void;
  /** 无权限回调 */
  onUnauthorized?: () => void;
}

/** 内部可变配置（由 setupRequest 注入） */
const runtimeConfig: Required<RequestSetupOptions> = {
  baseURL: '',
  timeout: 10000,
  getToken: () => localStorage.getItem('token'),
  tokenPrefix: 'Bearer ',
  showError: (msg: string) => console.error(msg),
  showLoading: () => {},
  hideLoading: () => {},
  onTokenExpired: () => {},
  onUnauthorized: () => {},
};

/** 全局 axios 实例 */
const instance: AxiosInstance = axios.create({
  baseURL: runtimeConfig.baseURL,
  timeout: runtimeConfig.timeout,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

/** 当前正在展示的 loading 数量，用于多请求合并控制 */
let loadingCount = 0;

/** 内部：显示 loading */
function startLoading() {
  loadingCount++;
  if (loadingCount === 1) {
    runtimeConfig.showLoading();
  }
}

/** 内部：隐藏 loading */
function endLoading() {
  loadingCount--;
  if (loadingCount <= 0) {
    loadingCount = 0;
    runtimeConfig.hideLoading();
  }
}

/** 内部：统一错误文案转换 */
function createErrorMessage(error: AxiosError<ApiResponse> | Error): string {
  if ('isAxiosError' in error && (error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<ApiResponse>;
    const { response } = axiosError;

    if (!response) {
      return '网络异常，请检查您的网络连接';
    }

    const { status, data } = response;

    if (data?.message) {
      return data.message;
    }

    switch (status) {
      case 400:
        return '请求参数错误';
      case 401:
        return '登录已失效，请重新登录';
      case 403:
        return '没有权限访问该资源';
      case 404:
        return '请求地址不存在';
      case 500:
        return '服务器开小差了，请稍后再试';
      case 502:
        return '网关错误';
      case 503:
        return '服务暂时不可用';
      case 504:
        return '请求超时，请稍后重试';
      default:
        return `请求失败（${status}）`;
    }
  }

  return error.message || '未知错误';
}

/** 请求拦截器：注入 token、控制 loading */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const cfg = config as InternalAxiosRequestConfig & RequestConfig;

    // 1. 处理 loading
    if (cfg.showLoading) {
      startLoading();
    }

    // 2. 注入 token
    const needToken = cfg.needToken !== false;
    if (needToken) {
      const token = runtimeConfig.getToken();
      if (token) {
        cfg.headers = cfg.headers || {};
        cfg.headers.Authorization = `${runtimeConfig.tokenPrefix}${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    // 请求还没发出去就出错的场景
    return Promise.reject(error);
  }
);

/** 响应拦截器：统一 code 处理、错误处理、loading 控制 */
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const cfg = response.config as InternalAxiosRequestConfig & RequestConfig;

    if (cfg.showLoading) {
      endLoading();
    }

    const res = response.data;

    // 这里按后端约定的 code 来处理，你可以改成 [0, 200] 等
    if (res.code === 0 || res.code === 200) {
      return response;
    }

    // 特殊状态码处理
    if (res.code === 401) {
      runtimeConfig.onTokenExpired();
    } else if (res.code === 403) {
      runtimeConfig.onUnauthorized();
    }

    // 业务错误
    const msg = res.message || '请求失败';
    if (cfg.showError !== false) {
      runtimeConfig.showError(msg);
    }

    // 让调用方可以 try/catch 捕获
    return Promise.reject(new Error(msg));
  },
  (error: AxiosError<ApiResponse>) => {
    const cfg = error.config as (InternalAxiosRequestConfig & RequestConfig) | undefined;

    if (cfg?.showLoading) {
      endLoading();
    }

    const msg = createErrorMessage(error);

    if (cfg?.showError !== false) {
      runtimeConfig.showError(msg);
    }

    // 401/403 等在这里兜底处理
    if (error.response?.status === 401) {
      runtimeConfig.onTokenExpired();
    } else if (error.response?.status === 403) {
      runtimeConfig.onUnauthorized();
    }

    return Promise.reject(error);
  }
);

/**
 * 应用侧可在启动时调用，用于注入 baseURL、提示函数、token 获取方式等。
 * 不调用也能用，只是会走默认实现（console.error、本地 token 等）。
 */
export function setupRequest(options: RequestSetupOptions) {
  // 更新运行时配置
  Object.assign(runtimeConfig, options);

  // 同步更新 axios 实例配置（主要是 baseURL / timeout）
  instance.defaults.baseURL = runtimeConfig.baseURL;
  instance.defaults.timeout = runtimeConfig.timeout;
}

/**
 * 对外暴露的 request 单例
 * 使用方式：
 *   import { request } from '@infinity/utils';
 *   const res = await request.get('/user');
 */
export const request = {
  /** 原始 axios 实例（少量特殊场景可能会用到） */
  instance,

  get<T = any>(url: string, config?: RequestConfig) {
    return instance.get<any, ApiResponse<T>>(url, config);
  },

  post<T = any>(url: string, data?: any, config?: RequestConfig) {
    return instance.post<any, ApiResponse<T>>(url, data, config);
  },

  put<T = any>(url: string, data?: any, config?: RequestConfig) {
    return instance.put<any, ApiResponse<T>>(url, data, config);
  },

  patch<T = any>(url: string, data?: any, config?: RequestConfig) {
    return instance.patch<any, ApiResponse<T>>(url, data, config);
  },

  delete<T = any>(url: string, config?: RequestConfig) {
    return instance.delete<any, ApiResponse<T>>(url, config);
  },

  /** 通用请求方法，内部仍然是 axios.request */
  request<T = any>(config: RequestConfig) {
    return instance.request<any, ApiResponse<T>>(config);
  },
};