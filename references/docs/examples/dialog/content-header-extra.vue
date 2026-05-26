<template>
  <e-button @click="visible = true">打开内容页声明头部操作的 Dialog</e-button>

  <e-dialog v-model="visible" title="编辑项目" width="620px">
    <content-page />
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ContentPage from './content-header-extra-content.vue';

const visible = ref(false);
</script>
