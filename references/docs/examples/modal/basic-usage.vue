<template>
  <e-button @click="visible = true">打开 Modal</e-button>

  <e-modal v-model="visible" title="用户信息">
    <p>这里是内容区域</p>
    <p>Modal 采用全屏布局,提供沉浸式的操作体验</p>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
