/**
 * 认证相关类型定义
 */

/**
 * 登录请求参数
 */
export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 记住我 */
  remember?: boolean;
  /** 验证码 */
  captcha?: string;
}

/**
 * 登录响应数据
 */
export interface LoginResult {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken?: string;
  /** 令牌过期时间（秒） */
  expiresIn: number;
  /** 用户信息 */
  user: UserInfo;
}

/**
 * 用户基本信息
 */
export interface UserInfo {
  /** 用户ID */
  id: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 头像 */
  avatar?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 角色列表 */
  roles: string[];
  /** 权限列表 */
  permissions: string[];
}

/**
 * 刷新令牌参数
 */
export interface RefreshTokenParams {
  /** 刷新令牌 */
  refreshToken: string;
}
