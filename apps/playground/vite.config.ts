import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @app-primary: var(--primary, #8b5cf6);
          @app-text-main: var(--app-text-main, #333);
        `,
        javascriptEnabled: true, // 开启 Less 的 JS 支持
      },
    },
  },
  resolve: {
    alias: [
      {
        // 关键配置：将包名指向源码入口而不是 dist
        find: '@infinity/ui',
        replacement: resolve(__dirname, '../../packages/infinity-ui/index.ts')
      },
      {
        find: '@infinity/utils',
        replacement: resolve(__dirname, '../../packages/infinity-utils/index.ts')
      }
    ]
  }
});