import { theme } from 'ant-design-vue';

// 定义主题类型
export type ThemeKey = 'infinity' | 'ocean' | 'forest' | 'midnight';

export interface ThemeConfig {
  key: ThemeKey;
  name: string;
  colors: {
    primary: string;         // 主色 (AntD 按钮等)
    primaryGradient: string; // 核心渐变 (用于大卡片、背景光球)
    bgLayout: string;        // 整体背景
    bgContainer: string;     // 卡片容器背景
    bgSidebar: string;       // 侧边栏背景
    textMain: string;        // 主标题色
    textSub: string;         // 次要文字色
    glassBorder: string;     // 玻璃边框色
  };
  // Ant Design 的算法 (亮色/暗色)
  antdAlgorithm: any;
}

export const themePalette: Record<ThemeKey, ThemeConfig> = {
  // 💜 1. 无限 (Infinity) - 也就是我们登录页的风格，梦幻紫
  infinity: {
    key: 'infinity',
    name: 'Infinity Dream',
    colors: {
      primary: '#8b5cf6',
      primaryGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
      bgLayout: '#f8fafc', // 浅灰蓝底，干净
      bgContainer: 'rgba(255, 255, 255, 0.7)',
      bgSidebar: 'rgba(255, 255, 255, 0.6)',
      textMain: '#0f172a',
      textSub: '#64748b',
      glassBorder: 'rgba(255, 255, 255, 0.6)',
    },
    antdAlgorithm: theme.defaultAlgorithm,
  },
  
  // 💙 2. 深蓝 (Ocean) - 商务、稳重、科技
  ocean: {
    key: 'ocean',
    name: 'Deep Ocean',
    colors: {
      primary: '#3b82f6',
      primaryGradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
      bgLayout: '#f0f9ff',
      bgContainer: 'rgba(255, 255, 255, 0.8)',
      bgSidebar: 'rgba(255, 255, 255, 0.7)',
      textMain: '#0c4a6e',
      textSub: '#64748b',
      glassBorder: 'rgba(255, 255, 255, 0.5)',
    },
    antdAlgorithm: theme.defaultAlgorithm,
  },

  // 🌿 3. 森林 (Forest) - 清新、舒适、护眼
  forest: {
    key: 'forest',
    name: 'Misty Forest',
    colors: {
      primary: '#10b981',
      primaryGradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
      bgLayout: '#f0fdf4',
      bgContainer: 'rgba(255, 255, 255, 0.8)',
      bgSidebar: 'rgba(255, 255, 255, 0.7)',
      textMain: '#064e3b',
      textSub: '#6b7280',
      glassBorder: 'rgba(255, 255, 255, 0.5)',
    },
    antdAlgorithm: theme.defaultAlgorithm,
  },

  // 🌑 4. 暗夜 (Midnight) - 极客、高对比度
  midnight: {
    key: 'midnight',
    name: 'Cyber Night',
    colors: {
      primary: '#6d28d9',
      primaryGradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
      bgLayout: '#0f172a', // 深色底
      bgContainer: 'rgba(30, 41, 59, 0.6)', // 深色玻璃
      bgSidebar: 'rgba(15, 23, 42, 0.8)',
      textMain: '#f8fafc', // 白字
      textSub: '#94a3b8',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
    },
    antdAlgorithm: theme.darkAlgorithm, // 启用 AntD 暗色模式
  },
};