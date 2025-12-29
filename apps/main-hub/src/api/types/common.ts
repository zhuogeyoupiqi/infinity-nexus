/**
 * 通用 API 类型定义
 */

/**
 * 分页请求参数
 */
export interface PageParams {
  /** 当前页码 */
  current: number;
  /** 每页数量 */
  pageSize: number;
}

/**
 * 分页响应数据
 */
export interface PageResult<T = any> {
  /** 数据列表 */
  list: T[];
  /** 总数量 */
  total: number;
  /** 当前页码 */
  current: number;
  /** 每页数量 */
  pageSize: number;
}

/**
 * 排序参数
 */
export interface SortParams {
  /** 排序字段 */
  field: string;
  /** 排序方式：asc | desc */
  order: 'asc' | 'desc';
}

/**
 * 通用查询参数（带分页和排序）
 */
export interface QueryParams extends PageParams {
  /** 关键字搜索 */
  keyword?: string;
  /** 排序参数 */
  sort?: SortParams;
  /** 其他查询条件 */
  [key: string]: any;
}