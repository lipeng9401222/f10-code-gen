<template>
  <e-button @click="openComponentDrawer">点击打开组件抽屉</e-button>
</template>

<script setup>
import { defineAsyncComponent, getCurrentInstance, h } from 'vue';

const { proxy } = getCurrentInstance();

const openComponentDrawer = () => {
  console.log(proxy, proxy.$drawer, proxy.$message);
  proxy?.$drawer(
    {
      title: '快速显示组件的抽屉',
      size: '500px',
      direction: 'rtl',
      closeCallback: (action) => {
        console.log('关闭抽屉, 回传值为', action);
        proxy?.$message(`关闭抽屉, 回传值为${action}`);
      },
    },
    () => {
      return h(
        defineAsyncComponent(() => import('./component-drawer-content-1.vue')),
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
