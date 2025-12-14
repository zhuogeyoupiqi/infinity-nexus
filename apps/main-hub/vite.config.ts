import { defineConfig } from 'vite'

// 导入 path 模块来处理文件路径
import path from 'path';

// 获取项目根目录，方便路径引用
const projectRoot = path.resolve(__dirname, './');

import vue from '@vitejs/plugin-vue'

// Vue 组件自动导入配置
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 告诉 Vue，micro-app 不是 Vue 组件，是自定义元素，别报错
          isCustomElement: tag => tag.startsWith('micro-app')
        }
      }
    }),
   Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  server: {
    port: 3000
  },
  // --- 核心 Less 配置部分 ---
  css: {
    preprocessorOptions: {
      less: {
        // 自动注入全局 Less 文件（如变量、混入）
        additionalData: `@import "${path.resolve(projectRoot, 'src/styles/theme/variables.less')}";`,
        // 确保你的 Less 兼容性
        javascriptEnabled: true,
      }
    }
  }
})
