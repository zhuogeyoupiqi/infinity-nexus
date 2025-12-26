<template>
  <a-layout class="layout-wrapper">
    <AppSider />

    <a-layout>
      <AppHeader />
      
      <AppTags />

      <a-layout-content class="app-content">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="appStore.cachedViews">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import AppSider from './components/app-sider.vue';
import AppHeader from './components/app-header.vue';
import AppTags from './components/app-tags.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
</script>

<style lang="less" scoped>
.layout-wrapper {
  min-height: 100vh;
  background-color: @app-bg-layout;
}

.app-content {
  position: relative;
  padding: 10px;
  background: transparent; // 让内容决定背景，或者透明显示下层
  overflow: hidden;
}

/* 页面切换动画：更精致的滑动淡入 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s ease;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>