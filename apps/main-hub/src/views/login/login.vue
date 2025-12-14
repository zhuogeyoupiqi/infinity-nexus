<script setup lang='ts'>
// 接受父组件传递的参数
const props = defineProps({})

// 定义对外暴露的事件，用于子组件向父组件通信
const emit = defineEmits([])

// 暴露组件内部属性和方法，供父组件通过 ref 调用
defineExpose({})
</script>

<!-- 登录 -->
<template>
  <div class="login-container">
    <div class="cyber-bg"></div>

    <div class="login-box">
      <div class="header">
        <h1 class="title">INFINITY <span class="highlight">NEXUS</span></h1>
        <p class="subtitle">Access Control System // v2.0</p>
      </div>

      <a-form layout="vertical">
        <a-form-item name="username">
          <a-input placeholder="Identity Code" class="cyber-input">
            <template #prefix><UserOutlined /></template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password  placeholder="Passkey" class="cyber-input">
            <!-- <template #prefix><LockOutlined /></template> -->
          </a-input-password>
        </a-form-item>

        <a-button type="primary" html-type="submit" block class="cyber-btn">
          INITIALIZE LINK
        </a-button>
      </a-form>
      
      <div class="scan-line"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 变量定义：赛博朋克色系
@neon-blue: #00f3ff;
@neon-purple: #bc13fe;
@dark-bg: #050505;

.login-container {
  height: 100vh;
  width: 100vw;
  background-color: @dark-bg;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: 'Courier New', Courier, monospace; // 复古代码字体
}

// 动态网格背景
.cyber-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: 
    linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  perspective: 500px;
  transform: scale(1.1);
  animation: moveGrid 20s linear infinite;
}

.login-box {
  position: relative;
  width: 400px;
  padding: 40px;
  background: rgba(10, 10, 20, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 10;
  clip-path: polygon(
    0 0, 
    100% 0, 
    100% 85%, 
    90% 100%, 
    0 100%
  ); // 切角效果

  &::before {
    content: '';
    position: absolute;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    background: linear-gradient(45deg, @neon-blue, transparent, @neon-purple);
    z-index: -1;
    opacity: 0.5;
  }
}

.title {
  color: #fff;
  text-align: center;
  letter-spacing: 4px;
  font-size: 24px;
  margin-bottom: 5px;
  
  .highlight {
    color: @neon-blue;
    text-shadow: 0 0 10px @neon-blue;
  }
}

.subtitle {
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-size: 12px;
  margin-bottom: 30px;
  text-transform: uppercase;
}

// 深度选择器覆盖 Ant Design 样式
:deep(.ant-input-affix-wrapper) {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #333;
  color: #fff;
  height: 45px;
  
  &:hover, &:focus, &-focused {
    border-color: @neon-blue;
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
  }
  
  input {
    background: transparent !important;
    color: #fff;
  }
  
  .anticon {
    color: @neon-blue;
  }
}

:deep(.ant-btn-primary) {
  height: 45px;
  background: linear-gradient(90deg, fade(@neon-blue, 80%), fade(@neon-purple, 80%));
  border: none;
  font-weight: bold;
  letter-spacing: 2px;
  
  &:hover {
    opacity: 0.9;
    box-shadow: 0 0 15px @neon-blue;
  }
}

// 扫描线动画
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: @neon-blue;
  box-shadow: 0 0 10px @neon-blue;
  opacity: 0.5;
  animation: scan 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes scan {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

@keyframes moveGrid {
  0% { transform: translateY(0); }
  100% { transform: translateY(30px); }
}
</style>