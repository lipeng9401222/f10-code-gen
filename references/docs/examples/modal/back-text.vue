<template>
  <e-space>
    <e-button @click="visible1 = true">自定义返回文字</e-button>
    <e-button @click="visible2 = true">只显示箭头</e-button>
  </e-space>

  <e-modal v-model="visible1" title="自定义返回文字" back-text="关闭">
    <p>返回按钮显示为"关闭"</p>
  </e-modal>

  <e-modal v-model="visible2" title="只显示箭头" back-text="">
    <p>返回按钮只显示箭头图标</p>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible1 = ref(false);
const visible2 = ref(false);
</script>
