<script setup lang='ts'>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { type MicroAppConfig } from '@/config/micro-apps';

// 接受父组件传递的参数
const props = defineProps({})

// 定义对外暴露的事件，用于子组件向父组件通信
const emit = defineEmits([])

const route = useRoute();
const loading = ref(true);

// 获取当前路由对应的微应用配置
const config = computed(() => route.meta.config as MicroAppConfig);

const handleCreated = () => {
  console.log(`[Infinity Nexus] App ${config.value?.name} Created`);
};

const handleMounted = () => {
  loading.value = false;
  console.log(`[Infinity Nexus] App ${config.value?.name} Mounted`);
};

const handleError = () => {
  loading.value = false;
  console.error(`[Infinity Nexus] App ${config.value?.name} Load Failed`);
};

// 监听路由变化，重置 loading 状态（如果没开启 keep-alive）
watch(
  () => route.path,
  () => {
    // 可以在这里处理路由切换的逻辑
  }
);

// 暴露组件内部属性和方法，供父组件通过 ref 调用
defineExpose({})
</script>

<!-- 模块名称（中文） -->
<template>
  <div class="micro-app-wrapper" v-loading="loading">
    <micro-app
      v-if="config"
      :name="config.name"
      :url="config.entry"
      :baseroute="config.baseroute"
      native-scope
      keep-alive
      @created="handleCreated"
      @mounted="handleMounted"
      @error="handleError"
    ></micro-app>
    <div v-else class="error-tips">
      配置丢失，无法加载微应用
    </div>
  </div>
</template>

<style lang="less" scoped>
.micro-app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>