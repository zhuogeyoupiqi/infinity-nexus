import type { App } from 'vue';
import Loading from './src/loading.vue';

// 1. 为组件添加 install 方法，方便按需注册
Loading.install = (app: App) => {
  app.component('InfinityLoading', Loading);
};

// 2. 导出组件
export const InfinityLoading = Loading;
export default Loading;