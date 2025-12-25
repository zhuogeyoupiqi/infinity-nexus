import type { App, Plugin } from 'vue'; // 引入 Plugin 类型
import { InfinityLoading } from './src/components/loading';

const components = [InfinityLoading];

// 1. 定义 install 函数
const install = (app: App) => {
  components.forEach((component) => {
    // 兼容可能没有定义 name 的情况
    const name = (component as any).name || 'InfinityLoading';
    app.component(name, component);
  });
};

// 2. 导出插件对象（作为 default）
export default { install } as Plugin;

// 3. 具名导出组件
export { InfinityLoading };