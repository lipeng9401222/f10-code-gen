<template>
  <e-button @click="visible = true">打开内容页声明头部操作的 Modal</e-button>

  <e-modal v-model="visible" title="采购申请">
    <content-page />
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ContentPage from './content-header-extra-content.vue';

const visible = ref(false);
</script>
