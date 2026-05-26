<template>
  <e-image-upload
    v-model:image-list="imageList1"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    :image-size="100"
  />

  <div style="margin: 20px 0" />

  <e-image-upload
    v-model:image-list="imageList2"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    :image-size="150"
  />
</template>

<script setup>
import { ref } from 'vue';

const imageList1 = ref([
  {
    name: '图片1',
    attachGuid: '1',
    downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(Math.random() * 100000)}`,
  },
  {
    name: '图片2',
    attachGuid: '2',
    downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(Math.random() * 100000)}`,
  },
]);

const imageList2 = ref([
  {
    name: '图片3',
    attachGuid: '3',
    downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(Math.random() * 100000)}`,
  },
  {
    name: '图片4',
    attachGuid: '4',
    downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(Math.random() * 100000)}`,
  },
]);
</script>
