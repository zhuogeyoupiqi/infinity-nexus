<template>
  <a-layout-sider
    v-model:collapsed="appStore.collapsed"
    :trigger="null"
    collapsible
    :width="240"
    class="app-sider"
  >
    <div class="logo-container">
      <img src="/vite.svg" alt="logo" class="logo-icon" />
      <h1 v-show="!appStore.collapsed" class="logo-text">Nexus</h1>
    </div>

    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :theme="themeMode"
      class="nexus-menu"
      @click="handleMenuClick"
    >
      <a-menu-item key="welcome">
        <template #icon><AppstoreOutlined /></template>
        <span>控制台</span>
      </a-menu-item>
      
      <a-sub-menu key="lab">
        <template #icon><ExperimentOutlined /></template>
        <template #title>创新实验室</template>
        <a-menu-item key="lab-visual">视觉引擎 (Visual)</a-menu-item>
        <a-menu-item key="lab-lowcode">低代码 (LowCode)</a-menu-item>
      </a-sub-menu>

      <a-menu-item key="settings">
        <template #icon><SettingOutlined /></template>
        <span>系统设置</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppstoreOutlined, ExperimentOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useAppStore } from '@/stores/app';
import { useAppTheme } from '@/hooks/useAppTheme';

const appStore = useAppStore();
const { currentTheme } = useAppTheme();
const route = useRoute();
const router = useRouter();

const selectedKeys = ref<string[]>([]);
// 根据当前主题判断 Antd 菜单应该是 dark 还是 light 模式
const themeMode = computed(() => currentTheme.value.key === 'midnight' ? 'dark' : 'light');

const handleMenuClick = ({ key }: { key: string }) => {
  if (key === 'welcome') router.push('/infinity/welcome');
  else router.push(`/infinity/${key}`);
};

watch(() => route.path, (path) => {
  if (path.includes('visual')) selectedKeys.value = ['lab-visual'];
  else if (path.includes('lowcode')) selectedKeys.value = ['lab-lowcode'];
  else selectedKeys.value = ['welcome'];
}, { immediate: true });
</script>

<style lang="less" scoped>
.app-sider {
  // 使用 CSS 变量实现主题跟随
  background: @app-bg-sidebar !important;
  border-right: 1px solid @app-glass-border;
  z-index: 100;
  box-shadow: 2px 0 8px rgba(0,0,0,0.02);

  .logo-container {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    // Logo 区域下边框
    border-bottom: 1px solid @app-glass-border;
    
    .logo-icon { height: 32px; transition: all 0.3s; }
    .logo-text {
      color: @app-text-main;
      font-size: 20px;
      font-weight: 800;
      margin: 0;
      font-family: 'PingFang SC', sans-serif;
    }
  }

  :deep(.nexus-menu) {
    background: transparent;
    border-right: none;
    padding-top: 16px;
    color: @app-text-sub;

    // 选中项样式：左侧高亮条 + 渐变背景
    .ant-menu-item-selected {
      background: linear-gradient(90deg, rgba(var(--app-primary), 0.1) 0%, transparent 100%);
      color: @app-primary;
      position: relative;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: @app-primary;
      }
      .anticon { color: @app-primary; }
    }

    .ant-menu-item:hover:not(.ant-menu-item-selected) {
      color: @app-primary;
    }
  }
}
</style>