/**
 * 用户相关类型定义
 */

import type { PageResult, QueryParams } from './common';

/**
 * 用户列表项
 */
export interface UserItem {
  /** 用户ID */
  id: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 状态：1-启用，0-禁用 */
  status: number;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
}

/**
 * 用户查询参数
 */
export interface UserQueryParams extends QueryParams {
  /** 用户名关键字 */
  username?: string;
  /** 状态筛选 */
  status?: number;
  /** 角色ID */
  roleId?: string;
}

/**
 * 用户列表响应
 */
export type UserListResult = PageResult<UserItem>;

/**
 * 创建用户参数
 */
export interface CreateUserParams {
  username: string;
  password: string;
  nickname: string;
  email?: string;
  phone?: string;
  roleIds?: string[];
}

/**
 * 更新用户参数
 */
export interface UpdateUserParams {
  nickname?: string;
  email?: string;
  phone?: string;
  status?: number;
  roleIds?: string[];
}
