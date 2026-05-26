<template>
  <e-button text @click="doOpenDrawer"> 点击打开抽屉 </e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()!;

const doOpenDrawer = () => {
  const handler = proxy?.$drawer({
    title: '抽屉',
    url: 'http://192.168.219.170/docs/vue/latest/frame/',
    size: '60%',
    direction: 'rtl',
    closeCallback: (params) => {
      console.log('close drawer params:', params);
    },
  });

  // setTimeout(() => {
  //   handler.closeDrawer()
  // }, 10000);
};
</script>
