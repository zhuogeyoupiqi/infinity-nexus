import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '../views/login/login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "登录"
    }
  },
]

const router = createRouter({
  history: createWebHistory(), // 开启 History 模式，去掉 #
  routes
})

export default router