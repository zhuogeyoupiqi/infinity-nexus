<template>
  <div class="dashboard-container">
    <div class="welcome-card">
      <div class="text-content">
        <h2 class="greeting">{{ greetingText }}, Admin ☀️</h2>
        <p class="subtitle">今天是 {{ currentDate }}，Infinity Nexus 系统运行平稳。准备好开始工作了吗？</p>
      </div>
      <div class="illustration">
        <div class="pulse-circle"></div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="left-panel">
        <div class="section-title">应用矩阵</div>
        <div class="app-cards">
          <div class="app-card visual" @click="router.push('/lab-visual/dashboard')">
            <div class="icon-box"><BgColorsOutlined /></div>
            <div class="info">
              <h3>Visual Engine</h3>
              <p>3D 渲染与可视化大屏构建器</p>
            </div>
            <div class="status-dot online"></div>
          </div>

          <div class="app-card lowcode" @click="router.push('/lab-lowcode/dashboard')">
            <div class="icon-box"><CodeOutlined /></div>
            <div class="info">
              <h3>LowCode Studio</h3>
              <p>企业级页面快速编排平台</p>
            </div>
            <div class="status-dot processing"></div>
          </div>
        </div>

        <div class="section-title" style="margin-top: 24px">资源监控</div>
        <div class="stat-row">
          <div class="stat-box">
            <div class="label">CPU 使用率</div>
            <div class="value">12%</div>
            <div class="bar"><div class="fill" style="width: 12%"></div></div>
          </div>
          <div class="stat-box">
            <div class="label">内存占用</div>
            <div class="value">4.2 GB</div>
            <div class="bar"><div class="fill warning" style="width: 60%"></div></div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="section-title">最近动态</div>
        <div class="activity-list">
          <div class="activity-item" v-for="i in 4" :key="i">
            <div class="avatar">{{ i }}</div>
            <div class="content">
              <div class="title">系统自动构建完成 <span class="time">10 mins ago</span></div>
              <div class="desc">主基座 (Main-Hub) 部署版本 v2.4.0 成功。</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { BgColorsOutlined, CodeOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs'; // 假设你装了 dayjs，或者用原生 Date

const router = useRouter();

// 计算问候语
const greetingText = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
});

const currentDate = dayjs().format('YYYY年MM月DD日');
</script>

<style lang="less" scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  animation: slideUp 0.6s ease-out;

  // 1. 欢迎卡片
  .welcome-card {
    background: @app-bg-container;
    padding: 40px;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    border: 1px solid @app-glass-border;
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
    position: relative;
    overflow: hidden;

    .greeting { font-size: 28px; font-weight: 700; color: @app-text-main; margin-bottom: 8px; }
    .subtitle { color: @app-text-sub; font-size: 16px; }

    .pulse-circle {
      width: 150px;
      height: 150px;
      background: @app-gradient;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.3;
      animation: pulse 4s infinite ease-in-out;
    }
  }

  // 2. 栅格布局
  .dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;

    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: @app-text-sub;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    // 左侧面板
    .left-panel {
      .app-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .app-card {
        background: @app-bg-container;
        border: 1px solid @app-glass-border;
        border-radius: 12px;
        padding: 24px;
        display: flex;
        align-items: center;
        gap: 20px;
        cursor: pointer;
        transition: all 0.3s;
        position: relative;

        .icon-box {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(0,0,0,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: @app-primary;
        }

        .info {
          h3 { font-size: 16px; font-weight: 600; color: @app-text-main; margin-bottom: 4px; }
          p { font-size: 13px; color: @app-text-sub; margin: 0; }
        }

        .status-dot {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          &.online { background: #52c41a; box-shadow: 0 0 8px #52c41a; }
          &.processing { background: #1890ff; box-shadow: 0 0 8px #1890ff; }
        }

        &:hover {
          transform: translateY(-4px);
          border-color: @app-primary;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          .icon-box { background: @app-primary; color: white; }
        }
      }

      // 统计条
      .stat-row {
        display: flex;
        gap: 16px;
        .stat-box {
          flex: 1;
          background: @app-bg-container;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid @app-glass-border;
          
          .label { font-size: 12px; color: @app-text-sub; margin-bottom: 8px; }
          .value { font-size: 24px; font-weight: 700; color: @app-text-main; margin-bottom: 12px; font-family: 'DIN Alternate'; }
          .bar {
            height: 6px;
            background: rgba(0,0,0,0.05);
            border-radius: 3px;
            overflow: hidden;
            .fill { height: 100%; background: @app-primary; border-radius: 3px; }
            .fill.warning { background: #faad14; }
          }
        }
      }
    }

    // 右侧面板
    .right-panel {
      .activity-list {
        background: @app-bg-container;
        border-radius: 12px;
        padding: 20px;
        border: 1px solid @app-glass-border;

        .activity-item {
          display: flex;
          gap: 12px;
          padding-bottom: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(0,0,0,0.03);
          &:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

          .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: @app-text-sub;
            font-weight: 700;
          }

          .content {
            .title { font-size: 13px; color: @app-text-main; margin-bottom: 2px; }
            .time { font-size: 12px; color: @app-text-sub; float: right; }
            .desc { font-size: 12px; color: @app-text-sub; opacity: 0.8; }
          }
        }
      }
    }
  }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(1); opacity: 0.3; }
}
</style>