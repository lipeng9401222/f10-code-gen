<template>
  <e-button @click="visible = true"> 打开带有自定义标题的对话框 </e-button>
  <e-dialog v-model="visible" :show-close="false">
    <template #header="{ actions, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">这是自定义标题！</h4>
        <e-button type="danger" @click="actions.close">
          <e-icon class="e-icon--left"><CircleCloseFilled /></e-icon>
          关闭
        </e-button>
      </div>
    </template>
    这是对话框内容。
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CircleCloseFilled } from '@epoint-fe/eui-icons';

const visible = ref(false);
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
