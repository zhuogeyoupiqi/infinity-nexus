import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4001, // 必须和基座里填的 url 一致
    cors: true, // 允许跨域，微前端必须开启！
    origin: 'http://localhost:3000'
  }
})
