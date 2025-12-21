<template>
  <a-layout-header class="app-header">
    <div class="header-left">
      <div class="trigger-btn" @click="appStore.toggleCollapse">
        <component :is="appStore.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
      </div>
      
      <a-breadcrumb class="breadcrumb-hidden-xs">
        <a-breadcrumb-item>Nexus</a-breadcrumb-item>
        <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
          <span v-if="index === breadcrumbs.length - 1">{{ item.meta.title }}</span>
          <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="header-right">
      <a-tooltip title="全屏模式">
        <div class="action-btn" @click="toggleFullscreen">
          <FullscreenExitOutlined v-if="isFullscreen" />
          <FullscreenOutlined v-else />
        </div>
      </a-tooltip>

      <a-dropdown placement="bottomRight">
        <div class="action-btn">
          <SkinOutlined />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="t in themeList" :key="t.key" @click="switchTheme(t.key)">
              <div style="display:flex;align-items:center;gap:8px">
                <span class="dot" :style="{background: t.colors.primary}"></span>
                {{ t.name }}
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <a-dropdown placement="bottomRight">
        <div class="user-info">
          <a-avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <span class="username">Admin</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="center">个人中心</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout" style="color: #ff4d4f">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFullscreen } from '@vueuse/core';
import { 
  MenuUnfoldOutlined, MenuFoldOutlined, 
  FullscreenOutlined, FullscreenExitOutlined, SkinOutlined 
} from '@ant-design/icons-vue';
import { useAppStore } from '@/stores/app';
import { useAppTheme } from '@/hooks/useAppTheme';

const appStore = useAppStore();
const route = useRoute();
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();
const { switchTheme, themeList } = useAppTheme();

// 自动生成面包屑
const breadcrumbs = computed(() => {
  return route.matched.filter(item => item.meta && item.meta.title);
});
</script>

<style lang="less" scoped>
.app-header {
  padding: 0 16px;
  height: 60px;
  line-height: 60px;
  background: rgba(255, 255, 255, 0.6); // 半透明
  backdrop-filter: blur(8px); // 毛玻璃
  border-bottom: 1px solid @app-glass-border;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 99;
  transition: all 0.3s;
  
  // 暗黑模式适配
  [data-theme='midnight'] & {
    background: rgba(30, 41, 59, 0.8);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;

    .trigger-btn {
      font-size: 18px;
      cursor: pointer;
      color: @app-text-main;
      &:hover { color: @app-primary; }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 8px;

    .action-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      cursor: pointer;
      color: @app-text-sub;
      transition: all 0.3s;
      
      &:hover {
        background: rgba(0,0,0,0.05);
        color: @app-primary;
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 20px;
      transition: all 0.3s;
      
      .username { font-weight: 500; color: @app-text-main; font-size: 14px; }
      &:hover { background: rgba(0,0,0,0.05); }
    }
  }
}

.dot { width: 8px; height: 8px; border-radius: 50%; }

@media (max-width: 768px) {
  .breadcrumb-hidden-xs { display: none; }
}
</style>