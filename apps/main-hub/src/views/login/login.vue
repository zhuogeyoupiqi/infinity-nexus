<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { 
  UserOutlined, 
  LockOutlined, 
  GithubOutlined, 
  GoogleOutlined,
  WechatOutlined 
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

// 接受父组件传递的参数
const props = defineProps({})

// 定义对外暴露的事件，用于子组件向父组件通信
const emit = defineEmits([])

// --- 状态定义 ---
const loading = ref(false);
const formState = reactive({
  username: '',
  password: '',
  remember: true
});

// --- 逻辑处理 ---
const handleLogin = () => {
  loading.value = true;
  // 模拟 API 请求
  setTimeout(() => {
    loading.value = false;
    message.success({
      content: '欢迎回来，指挥官！正在进入 Infinity Nexus...',
      duration: 3,
    });
    // TODO: 路由跳转 router.push('/')
  }, 1500);
};

// 暴露组件内部属性和方法，供父组件通过 ref 调用
defineExpose({})
</script>

<!-- 登录页面 -->
<template>
  <div class="login-wrapper">
    <div class="background-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <!-- 背景发光圆球，用于营造科技感的动态背景 -->
    <div class="login-container">
      
      <!-- 左侧品牌视觉区：Logo、标题、文案、波浪背景等 -->
      <div class="visual-side">
        <div class="glass-reflection"></div>
        <div class="content-box">
          <div class="brand">
            <img src="/vite.svg" alt="Logo" class="logo-spin" />
            <span class="brand-text">Infinity Nexus</span>
          </div>
          <div class="headline">
            <h1>构建未来<br>微前端架构</h1>
            <p>One Platform, Infinite Possibilities.</p>
          </div>
          <div class="wave-decoration">
            <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffffff" fill-opacity="0.2" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- 右侧登录表单区域 -->
      <div class="form-side">
        <div class="form-header">
          <h2>Welcome Back 👋</h2>
          <span class="sub-text">请输入您的账号以访问控制台</span>
        </div>

        <a-form
          layout="vertical"
          :model="formState"
          class="elegant-form"
          @finish="handleLogin"
        >
          <a-form-item name="username">
            <div class="field-label">Account</div>
            <a-input 
              v-model:value="formState.username" 
              placeholder="admin" 
              class="soft-input"
            >
              <template #prefix>
                <UserOutlined class="icon-prefix" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <div class="field-label">Password</div>
            <a-input-password 
              v-model:value="formState.password" 
              placeholder="••••••" 
              class="soft-input"
            >
              <template #prefix>
                <LockOutlined class="icon-prefix" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="form-footer">
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
            <a class="forgot-pwd">忘记密码?</a>
          </div>

          <a-button 
            type="primary" 
            html-type="submit" 
            block 
            class="glow-button"
            :loading="loading"
          >
            登 录
          </a-button>

          <div class="divider">
            <span>Or login with</span>
          </div>
          
          <div class="social-grid">
            <div class="social-btn"><GithubOutlined /></div>
            <div class="social-btn"><GoogleOutlined /></div>
            <div class="social-btn"><WechatOutlined /></div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// --- 设计变量 (提取自你提供的图片风格) ---
// 图片中的紫色/蓝色渐变
@gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
@gradient-button: linear-gradient(90deg, #4f46e5, #9333ea);
@bg-color: #f8fafc;        // 极浅的蓝灰底色
@text-main: #0f172a;       // 深色文字
@text-sub: #94a3b8;        // 浅色文字
@input-bg: #f1f5f9;        // 输入框背景 (参考图片中的灰色块)
@card-radius: 24px;        // 大圆角

// --- 1. 全局容器与动态背景 ---
.login-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: @bg-color;
  overflow: hidden;
  font-family: 'Inter', sans-serif; // 现代无衬线字体

  // 动态光球动画
  .background-orbs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px); // 高斯模糊制造光晕感
      opacity: 0.6;
      animation: float 10s infinite ease-in-out;
    }

    // 紫色光球
    .orb-1 {
      width: 400px;
      height: 400px;
      background: #8b5cf6;
      top: -100px;
      left: -100px;
      animation-delay: 0s;
    }
    // 粉色光球
    .orb-2 {
      width: 300px;
      height: 300px;
      background: #ec4899;
      bottom: -50px;
      right: -50px;
      animation-delay: -5s;
    }
    // 蓝色光球
    .orb-3 {
      width: 200px;
      height: 200px;
      background: #3b82f6;
      top: 40%;
      left: 60%;
      animation-delay: -2s;
    }
  }
}

// 动画定义
@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

// --- 2. 登录主卡片 ---
.login-container {
  position: relative;
  z-index: 1;
  width: 1000px;
  height: 640px;
  background: rgba(255, 255, 255, 0.8); // 半透明白底
  backdrop-filter: blur(20px);          // 毛玻璃效果
  border-radius: @card-radius;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.1), 
    0 0 0 1px rgba(255, 255, 255, 0.5); // 细腻的边框光泽
  display: flex;
  overflow: hidden;

  // 移动端适配
  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    flex-direction: column;
    .visual-side { display: none; }
  }
}

// --- 3. 左侧视觉区 ---
.visual-side {
  width: 45%;
  background: @gradient-primary;
  position: relative;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  
  // 玻璃反光层，增加质感
  .glass-reflection {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
    z-index: 1;
  }

  .content-box {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: auto;
      
      .logo-spin { height: 32px; animation: spin 20s linear infinite; }
      .brand-text { font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    }

    .headline {
      margin-bottom: 60px;
      h1 {
        font-size: 42px;
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 16px;
        text-shadow: 0 4px 20px rgba(0,0,0,0.1);
      }
      p { font-size: 16px; opacity: 0.9; font-weight: 300; }
    }
  }

  .wave-decoration {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0.6;
    mix-blend-mode: overlay; // 混合模式让波浪更自然融合
  }
}

// --- 4. 右侧表单区 ---
.form-side {
  flex: 1;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;

  .form-header {
    margin-bottom: 40px;
    h2 { font-size: 32px; color: @text-main; margin-bottom: 8px; font-weight: 700; }
    .sub-text { color: @text-sub; font-size: 15px; }
  }

  .elegant-form {
    .field-label {
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 8px;
      text-transform: uppercase; // 大写标签显得更专业
      letter-spacing: 0.5px;
    }

    // 核心：复刻图片中的 Input 样式
    // 这种"无边框"、"灰色填充"的样式是现代 Soft UI 的精髓
    :deep(.soft-input) {
      border: 2px solid transparent !important; // 预留边框位置
      background-color: @input-bg;
      border-radius: 12px;
      padding: 10px 12px;
      transition: all 0.3s ease;
      
      input { background-color: transparent; font-weight: 500; color: @text-main; }
      .icon-prefix { color: #94a3b8; font-size: 18px; margin-right: 8px; transition: color 0.3s;}

      // 聚焦状态：边框变色，背景变白，增加阴影
      &.ant-input-affix-wrapper-focused {
        background-color: #fff;
        border-color: #8b5cf6 !important; // 聚焦时显示品牌色
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15); // 柔和的光晕
        .icon-prefix { color: #8b5cf6; }
      }
      
      &:hover { background-color: #e2e8f0; }
    }

    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0 32px;
      .forgot-pwd { color: #8b5cf6; font-weight: 600; font-size: 14px; }
    }

    // 核心：渐变发光按钮
    .glow-button {
      height: 52px;
      border-radius: 14px;
      background: @gradient-button;
      border: none;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4); // 投影很重要
      transition: all 0.3s;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
      }
      
      &:active { transform: scale(0.98); }
    }
  }

  // 社交登录
  .divider {
    text-align: center;
    margin: 30px 0 20px;
    position: relative;
    span { 
      background: white; 
      padding: 0 10px; 
      color: @text-sub; 
      font-size: 13px; 
      position: relative; 
      z-index: 1; 
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 10%;
      right: 10%;
      height: 1px;
      background: #e2e8f0;
      z-index: 0;
    }
  }

  .social-grid {
    display: flex;
    justify-content: center;
    gap: 16px;
    
    .social-btn {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background: white;
        border-color: #cbd5e1;
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        color: #0f172a;
      }
    }
  }
}

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>