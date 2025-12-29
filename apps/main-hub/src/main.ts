import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import microApp from '@micro-zoe/micro-app'

import './styles/main.less' // 引入全局样式入口

import { setupRequest } from '@infinity/utils';

// setupRequest({
//   baseURL: 'http://localhost:3000',
//   timeout: 10000,
//   getToken: () => localStorage.getItem('token'),
//   showError: (msg) => message.error(msg),
// });

// 初始化微前端
microApp.start({
  disableScopecss: true,
})

const pinia = createPinia();
createApp(App).use(pinia).use(router).mount('#app')
