<template>
  <e-button @click="visible = true">打开内容页声明头部操作的 Drawer</e-button>

  <e-drawer v-model="visible" title="筛选条件" size="420px">
    <content-page />
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ContentPage from './content-header-extra-content.vue';

const visible = ref(false);
</script>
