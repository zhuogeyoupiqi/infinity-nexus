import { defineConfig } from 'vite'
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
})
