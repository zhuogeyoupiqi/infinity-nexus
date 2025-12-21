<script setup lang="ts">
import { computed } from 'vue';
import { useAppTheme } from '@/hooks/useAppTheme';

// 立即执行 Hook，初始化主题
// 这会立即往 html 标签注入 style="--app-primary: ...;"
const { currentTheme } = useAppTheme();

// 这里的 Antd 配置是为了确保非 Layout 页面（如 Login）也能拿到 Antd 的样式
const antdTheme = computed(() => ({
  algorithm: currentTheme.value.antdAlgorithm,
  token: {
    colorPrimary: currentTheme.value.colors.primary,
  },
}));

</script>

<template>
  <a-config-provider :theme="antdTheme">
    <router-view />
  </a-config-provider>
</template>

<style lang="less" scoped>
.title {
  color: @app-primary;
}
</style>
