import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import microApp from '@micro-zoe/micro-app'

import './styles/main.less' // 引入全局样式入口

// 初始化微前端
microApp.start()

createApp(App).use(router).mount('#app')
