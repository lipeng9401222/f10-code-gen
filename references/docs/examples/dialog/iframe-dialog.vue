<template>
  <e-button text @click="doOpenDialog"> 点击打开对话框 </e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()!;

const doOpenDialog = () => {
  const handler = proxy?.$dialog({
    title: '弹窗',
    url: 'http://192.168.219.170/docs/vue/latest/frame/',
    width: 800,
    height: 600,
    closeCallback: (params) => {
      console.log('close dialog params:', params);
    },
  });

  // setTimeout(() => {
  //   handler.closeDialog()
  // }, 10000);
};
</script>
