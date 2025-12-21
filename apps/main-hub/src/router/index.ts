import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { microApps } from '@/config/micro-apps';
import Layout from '@/layout/index.vue'
import MicroContainer from '@/views/micro/index.vue';

// 动态生成微应用路由表
// 这样每加一个子应用，不需要改 Router 代码，只需改配置
const microAppRoutes: RouteRecordRaw[] = microApps.map(app => ({
  path: `${app.activeRule}/:page*`, // 匹配 /lab-visual/xxx 全路径
  name: app.name,
  component: MicroContainer,
  meta: {
    title: app.name,
    isMicroApp: true,
    config: app // 将配置挂载，供组件使用
  }
}));

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/infinity'
  },
  {
    path: '/infinity',
    component: Layout,
    redirect: '/infinity/welcome', // 默认进欢迎页
    children: [
      {
        path: 'welcome',
        component: () => import('@/views/welcome/index.vue'),
        meta: { title: '控制台首页' }
      },
      // 展开微应用路由
      ...microAppRoutes 
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  // 404 页面
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/views/error/404.vue')
  // }
];

const router = createRouter({
  // 使用 WebHistory，看起来像正常网站
  history: createWebHistory('/'), 
  routes
});

export default router;