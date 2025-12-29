import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { viteMockServe } from 'vite-plugin-mock';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      enable: true, // 开发环境开启
    }),
  ],
  server: {
    port: 4001, // 必须和基座里填的 url 一致
    cors: true, // 允许跨域，微前端必须开启！
    origin: 'http://localhost:3000'
  }
})
