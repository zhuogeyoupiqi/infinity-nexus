/**
 * 认证服务
 */
import { request } from '@infinity/utils';
import type { LoginParams, LoginResult, RefreshTokenParams } from '../types';

/**
 * 登录
 */
export function loginApi(params: LoginParams) {
  return request.post<LoginResult>('/api/auth/login', params, {
    needToken: false, // 登录接口不需要 token
    showLoading: true,
  });
}

/**
 * 登出
 */
export function logoutApi() {
  return request.post('/api/auth/logout', {}, {
    showLoading: true,
  });
}

/**
 * 刷新令牌
 */
export function refreshTokenApi(params: RefreshTokenParams) {
  return request.post<LoginResult>('/api/auth/refresh', params, {
    needToken: false,
  });
}

/**
 * 获取当前用户信息
 */
export function getCurrentUserApi() {
  return request.get('/api/auth/me');
}

/**
 * 修改密码
 */
export function changePasswordApi(oldPassword: string, newPassword: string) {
  return request.post('/api/auth/change-password', {
    oldPassword,
    newPassword,
  }, {
    showLoading: true,
  });
}
