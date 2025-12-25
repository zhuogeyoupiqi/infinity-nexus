<template>
  <div class="playground">
    <h3>🧪 组件实验室</h3>
    <div class="preview-box">
       <InfinityLoading text="正在调试..." :visible="true" :glass="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { InfinityLoading } from '@infinity/ui';
</script>

<style>
.preview-box {
  position: relative;
  width: 500px; 
  height: 300px; 
  /* background: #333; */
  margin: 20px auto;
}
</style>