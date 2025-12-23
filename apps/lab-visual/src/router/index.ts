import { createRouter, createWebHistory } from 'vue-router';

// 添加类型声明
declare global {
  interface Window {
    __MICRO_APP_BASE_ROUTE__?: string;
  }
}

console.log(window.__MICRO_APP_BASE_ROUTE__, 'window?.__MICRO_APP_BASE_ROUTE__')

const router = createRouter({
  history: createWebHistory(window?.__MICRO_APP_BASE_ROUTE__ || '/'), 
  routes: [
  ]
});

export default router;