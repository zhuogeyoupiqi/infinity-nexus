/**
 * 🌌 Micro App Configuration Center
 * ------------------------------------------------
 * 负责根据环境变量动态计算子应用的入口地址 (Entry)
 * 完美支持 IP 部署、域名部署及本地开发
 */

// 1. 定义子应用枚举，防止字符串魔法值
export const AppName = {
  VISUAL: 'lab-visual',
  LOWCODE: 'lab-lowcode'
} as const;

export type AppName = typeof AppName[keyof typeof AppName];


// 2. 类型定义
export interface MicroAppConfig {
  name: string;       // 应用唯一名称
  entry: string;      // 关键：子应用 HTML 入口地址
  activeRule: string; // 激活路由 (浏览器地址栏变成什么时激活)
  baseroute: string;  // 下发给子应用的基础路由
}

// 3. 环境判断
const isProd = import.meta.env.MODE === 'production';
const host = import.meta.env.VITE_APP_HOST || 'localhost'; // 从 .env 读取 IP
const port = import.meta.env.VITE_APP_PORT ? `:${import.meta.env.VITE_APP_PORT}` : '';

// 4. 计算入口地址的辅助函数
// 生产环境：http://192.168.1.200/infinity/lab-visual/
// 开发环境：http://localhost:4001/
const getEntry = (devPort: number, prodPath: string) => {
  if (isProd) {
    // 假设生产环境都在同一个 IP 下，通过 /infinity/xxx 区分
    return `http://${host}${port}/infinity/${prodPath}/`;
  }
  return `http://localhost:${devPort}/`;
};

// 5. 导出配置列表
export const microApps: MicroAppConfig[] = [
  {
    name: AppName.VISUAL,
    // 开发用 4001 端口，生产用 /lab-visual 路径
    entry: getEntry(4001, 'lab-visual'), 
    activeRule: '/infinity/lab-visual',
    baseroute: '/infinity/lab-visual',
  },
  {
    name: AppName.LOWCODE,
    entry: getEntry(4002, 'lab-lowcode'),
    activeRule: '/infinity/lab-lowcode',
    baseroute: '/infinity/lab-lowcode',
  }
];

// 6. 查找工具
export const currentAppConfig = (path: string) => {
  return microApps.find(app => path.startsWith(app.activeRule));
};