<script setup lang="ts">
</script>

<template>
  <!-- <div class="layout">
    <h1>🌌 Infinity Nexus Control Center</h1>
    <a-button type="primary" class="button">Test Button</a-button>
    <div class="title">大聪明</div>
    <div class="micro-container">
      <micro-app 
        name='lab-visual' 
        url='http://localhost:4001/' 
        iframe 
      ></micro-app>
    </div>
  </div> -->
  <router-view></router-view>
</template>

<style lang="less" scoped>
.title {
  color: @primary-color;
}
</style>
