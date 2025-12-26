import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    // 自动生成 TypeScript 类型声明文件
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'), // 入口文件
      name: 'InfinityUtils',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // 外部化依赖（如果需要，可以在这里声明）
      external: [],
      output: {
        exports: 'named',
      },
    },
  },
});
