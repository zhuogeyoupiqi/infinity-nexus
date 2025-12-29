/**
 * 用户服务
 */
import { request } from '@infinity/utils';
import type {
  UserListResult,
  UserQueryParams,
  CreateUserParams,
  UpdateUserParams,
  UserItem,
} from '../types';

/**
 * 获取用户列表
 */
export function getUserListApi(params: UserQueryParams) {
  return request.get<UserListResult>('/api/users', { params });
}

/**
 * 获取用户详情
 */
export function getUserDetailApi(userId: string) {
  return request.get<UserItem>(`/api/users/${userId}`);
}

/**
 * 创建用户
 */
export function createUserApi(params: CreateUserParams) {
  return request.post<UserItem>('/api/users', params, {
    showLoading: true,
  });
}

/**
 * 更新用户
 */
export function updateUserApi(userId: string, params: UpdateUserParams) {
  return request.put<UserItem>(`/api/users/${userId}`, params, {
    showLoading: true,
  });
}

/**
 * 删除用户
 */
export function deleteUserApi(userId: string) {
  return request.delete(`/api/users/${userId}`, {
    showLoading: true,
  });
}

/**
 * 批é[]) {
  return request.post('/api/users/batch-delete', { userIds }, {
    showLoading: true,
  });
}

/**
 * 重置用户密码
 */
export function resetUserPasswordApi(userId: string, newPassword: string) {
  return request.post(`/api/users/${userId}/reset-password`, {
    newPassword,
  }, {
    showLoading: true,
  });
}
