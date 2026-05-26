<template>
  <e-button @click="visible = true">打开带有自定义标题文字的对话框</e-button>
  <e-dialog v-model="visible">
    <template #title="{ titleId, titleClass }">
      <span :id="titleId" :class="titleClass" class="custom-title">
        <e-icon><StarFilled /></e-icon>
        带图标的标题
      </span>
    </template>
    这是对话框内容。
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { StarFilled } from '@epoint-fe/eui-icons';

const visible = ref(false);
</script>

<style scoped>
.custom-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>
