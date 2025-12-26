/**
 * 本地存储工具类
 */
// 存储前缀
const NAMESPACE = 'INFINITY_';

export class Storage {
  /**
   * 设置存储
   * @param key 键名
   * @param value 值（会自动序列化）
   */
  static set(key: string, value: any): void {
    try {
      localStorage.setItem(NAMESPACE + key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }

  /**
   * 获取存储
   * @param key 键名
   * @returns 值（会自动反序列化）
   */
  static get<T = any>(key: string): T | null {
    try {
      const item = localStorage.getItem(NAMESPACE + key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  /**
   * 删除存储
   * @param key 键名
   */
  static remove(key: string): void {
    localStorage.removeItem(NAMESPACE + key);
  }

  /**
   * 清空所有存储
   */
  static clear(): void {
    localStorage.clear();
  }
}
