<template>
  <div class="tags-view-container">
    <div class="tags-wrapper">
      <router-link
        v-for="tag in appStore.visitedViews"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        :class="{ active: isActive(tag) }"
      >
        {{ tag.meta.title }}
        <span 
          v-if="!isAffix(tag)" 
          class="close-icon" 
          @click.prevent.stop="closeTag(tag)"
        >×</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();

const isActive = (tag: any) => tag.path === route.path;
const isAffix = (tag: any) => tag.meta && tag.meta.affix; // 如 Dashboard 可能固定不可关闭

// 监听路由变化，自动添加 Tag
watch(() => route.path, () => {
  if (route.meta && route.meta.title) {
    appStore.addView(route);
  }
}, { immediate: true });

// 关闭标签逻辑
const closeTag = (tag: any) => {
  const newViews = appStore.deleteView(tag);
  // 如果关闭的是当前页，跳转到最后一个 Tag
  if (isActive(tag)) {
    const latestView = newViews.slice(-1)[0];
    if (latestView) {
      router.push(latestView.path);
    } else {
      router.push('/');
    }
  }
};
</script>

<style lang="less" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: @app-bg-layout;
  border-bottom: 1px solid @app-glass-border;
  display: flex;
  align-items: center;
  padding: 0 16px;
  overflow-x: auto; // 支持横向滚动
  
  // 隐藏滚动条但保留功能
  &::-webkit-scrollbar { height: 0; }

  .tags-wrapper {
    display: flex;
    gap: 6px;
    align-items: center;
    
    .tags-view-item {
      display: inline-flex;
      align-items: center;
      height: 26px;
      padding: 0 10px;
      font-size: 12px;
      border: 1px solid rgba(0,0,0,0.05);
      border-radius: 4px;
      color: @app-text-sub;
      background: @app-bg-container;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;

      .close-icon {
        margin-left: 6px;
        width: 14px;
        height: 14px;
        line-height: 12px;
        text-align: center;
        border-radius: 50%;
        font-size: 14px;
        &:hover { background: rgba(0,0,0,0.1); color: #ff4d4f; }
      }

      &:hover {
        color: @app-primary;
        border-color: rgba(var(--app-primary), 0.3);
      }

      &.active {
        background: @app-primary;
        color: white;
        border-color: @app-primary;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        
        .close-icon:hover { background: rgba(255,255,255,0.2); color: white; }
      }
    }
  }
}
</style>