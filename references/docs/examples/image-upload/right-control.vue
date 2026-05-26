<template>
  <e-image-upload
    v-model:image-list="imageList"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    :enable-add="false"
    :enable-delete="false"
    :enable-download="true"
    :enable-preview="true"
    :data="data"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const imageList = ref([
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

const data = ref({
  custom: 'customData',
});
</script>
