import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import microApp from '@micro-zoe/micro-app'

// 初始化微前端
microApp.start()

createApp(App).mount('#app')
