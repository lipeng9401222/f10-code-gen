<template>
  <e-space>
    <e-button @click="openIframe1">简写形式</e-button>
    <e-button @click="openIframe2">配置对象形式</e-button>
  </e-space>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const { proxy } = getCurrentInstance()!;

const openIframe1 = () => {
  proxy?.$modal('页面标题', 'http://192.168.219.170/docs/vue/latest/frame/');
};

const openIframe2 = () => {
  proxy?.$modal({
    title: 'Vue 文档',
    url: 'http://192.168.219.170/docs/vue/latest/frame/',
    width: '80%',
    height: '80%',
    closeCallback: (action) => {
      EMessage.info(`Modal 已关闭: ${action}`);
    },
  });
};
</script>
