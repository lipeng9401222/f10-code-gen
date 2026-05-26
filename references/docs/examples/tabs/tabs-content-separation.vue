<template>
  <div class="header-area"></div>
  <div class="main-area">
    <e-tabs v-model="activeName" header-target=".header-area">
      <e-tab-pane label="Task1">Task1 - 内容</e-tab-pane>
      <e-tab-pane label="Task2">Task2 - 内容</e-tab-pane>
      <e-tab-pane label="Task3" url="http://192.168.219.170/showcase/eui3/components/" lazy></e-tab-pane>
    </e-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeName = ref('0');
</script>

<style scoped>
.demo-header-target {
  display: block;
}

.header-area {
  min-height: 48px;
  padding: 8px 12px;
  border: 1px dashed #d0d5dd;
  margin-bottom: 8px;
  color: #6b778c;
}

.main-area {
  padding: 12px;
  border: 1px solid #f2f4f7;
  border-radius: 8px;
}
</style>
