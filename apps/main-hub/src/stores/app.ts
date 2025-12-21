import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';

export const useAppStore = defineStore('app', () => {
  // --- 1. 侧边栏状态 ---
  const collapsed = ref(false);
  const toggleCollapse = () => (collapsed.value = !collapsed.value);

  // --- 2. 标签页 (Tags View) & 缓存 (KeepAlive) ---
  const visitedViews = ref<RouteLocationNormalized[]>([]);
  const cachedViews = ref<string[]>([]); // 存储组件 name

  // 添加标签
  const addView = (view: RouteLocationNormalized) => {
    if (visitedViews.value.some((v) => v.path === view.path)) return;
    // 限制最大标签数，防止内存泄漏
    if (visitedViews.value.length >= 10) visitedViews.value.shift();
    
    visitedViews.value.push(Object.assign({}, view, { title: view.meta.title || 'no-name' }));
    
    // 如果配置了需要缓存，且组件有 name
    if (!view.meta.noCache && view.name) {
      if (!cachedViews.value.includes(view.name as string)) {
        cachedViews.value.push(view.name as string);
      }
    }
  };

  // 移除标签
  const deleteView = (view: RouteLocationNormalized) => {
    const i = visitedViews.value.findIndex((v) => v.path === view.path);
    if (i > -1) {
      visitedViews.value.splice(i, 1);
      // 同时移除缓存
      const indexCache = cachedViews.value.indexOf(view.name as string);
      if (indexCache > -1) cachedViews.value.splice(indexCache, 1);
    }
    return [...visitedViews.value]; // 返回新数组供路由跳转判断
  };

  // 移除其他
  const deleteOthers = (view: RouteLocationNormalized) => {
    visitedViews.value = visitedViews.value.filter(v => v.path === view.path);
    cachedViews.value = cachedViews.value.filter(name => name === view.name);
  };

  return {
    collapsed,
    toggleCollapse,
    visitedViews,
    cachedViews,
    addView,
    deleteView,
    deleteOthers
  };
});