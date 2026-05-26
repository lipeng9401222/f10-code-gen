<template>
  <e-button @click="openComponentDialog">点击打开组件对话框</e-button>
</template>

<script setup>
import { defineAsyncComponent, getCurrentInstance, h } from 'vue';

const { proxy } = getCurrentInstance();

const openComponentDialog = () => {
  console.log(proxy, proxy.$dialog, proxy.$message);
  proxy?.$dialog(
    {
      title: '快速显示组件的dialog',
      width: 600,
      height: 400,
      closeCallback: (action) => {
        console.log('关闭对话框, 回传值为', action);
        proxy?.$message(`关闭对话框, 回传值为${action}`);
      },
    },
    () => {
      return h(
        // content1,
        defineAsyncComponent(() => import('./component-dialog-content-1.vue')),
        {
          title: '属性值1',
          content: '属性值2 ',
        }
      );
    }
  );
};
</script>

<style lang="scss" scoped></style>
