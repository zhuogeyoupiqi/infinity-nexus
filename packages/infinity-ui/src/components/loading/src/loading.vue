<script setup lang='ts'>
import { computed } from 'vue';

// 定义 Props
export interface LoadingProps {
  visible?: boolean;    // 是否显示
  text?: string;        // 加载文案
  fullscreen?: boolean; // 是否全屏覆盖
  glass?: boolean;      // 是否开启强力毛玻璃
}

const props = withDefaults(defineProps<LoadingProps>(), {
  visible: true,
  text: 'System Loading...',
  fullscreen: false,
  glass: true
});

// 计算背景色：支持毛玻璃或纯色
const backgroundColor = computed(() => {
  if (props.glass) return 'rgba(255, 255, 255, 0.1)'; // 配合 backdrop-filter
  return 'transparent';
});
</script>

<!-- 模块名称（中文） -->
<template>
  <transition name="fade">
    <div 
      v-if="visible" 
      class="infinity-loading"
      :class="{ 'is-fullscreen': fullscreen, 'is-absolute': !fullscreen }"
      :style="{ background: backgroundColor }"
    >
      <div class="loader-core">
        <div class="ring outer"></div>
        <div class="ring inner"></div>
        <div class="dot"></div>
      </div>
      
      <div v-if="text" class="loading-text">{{ text }}</div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.infinity-loading {
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;

  // 模式控制
  &.is-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(10px); // 全屏时开启强力模糊
  }

  &.is-absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px); // 局部容器内轻微模糊
    border-radius: inherit; // 继承父容器圆角
  }

  // 核心动画容器
  .loader-core {
    position: relative;
    width: 60px;
    height: 60px;
    margin-bottom: 16px;

    // 通用圆环
    .ring {
      position: absolute;
      border-radius: 50%;
      border: 3px solid transparent;
    }

    // 外环：旋转的渐变
    .outer {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-top-color: @app-primary;
      // border-left-color: fade(@app-primary, 30%); // Less 函数处理透明度
      animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
      // filter: drop-shadow(0 0 8px fade(@app-primary, 40%));
    }

    // 内环：反向旋转
    .inner {
      top: 10px;
      left: 10px;
      width: 40px;
      height: 40px;
      border-bottom-color: @app-primary;
      // border-right-color: fade(@app-primary, 20%);
      animation: spin 1s linear infinite reverse;
      opacity: 0.8;
    }

    // 中心能量点：呼吸
    .dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      background: @app-primary;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: pulse 2s ease-in-out infinite;
      box-shadow: 0 0 15px @app-primary;
    }
  }

  .loading-text {
    font-size: 14px;
    letter-spacing: 1px;
    color: @app-text-main;
    font-weight: 500;
    text-transform: uppercase;
    animation: fadeIn 0.5s ease;
  }
}

// 动画定义
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>