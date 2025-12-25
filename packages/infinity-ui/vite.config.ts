import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'; // 👈 核心插件
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    // 1. 自动生成类型声明文件 (.d.ts)
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      outDir: 'dist',
    }),
    // 2. CSS 自动注入插件：打包时把 CSS 塞进 JS 里
    cssInjectedByJsPlugin(), 
  ],
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
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'), // 入口文件
      name: 'InfinityUI',
      fileName: (format) => `index.${format}.js`, // 输出文件名
    },
    rollupOptions: {
      // 3. 外部化依赖：确保 Vue 和 AntD 不会被打包进我们的库里
      external: ['vue', 'ant-design-vue', '@ant-design/icons-vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'Antd',
        },
      },
    },
  },
});