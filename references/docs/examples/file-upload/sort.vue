<template>
  <e-file-upload
    v-model:file-list="fileList"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    enable-sort
    :on-sort-change="handleSortChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fileList = ref([
  {
    name: '图片1.jpg',
    attachGuid: 'c8ecece4-0a99-46dc-b419-fb7050aab4c8',
    downloadUrl: 'https://picsum.photos/800/800/',
    uploadDate: '2023-10-27 18:17:31',
    size: 1392528,
  },
  {
    name: '图片2.png',
    attachGuid: '19314fdd-be3b-42f4-ab7e-78c90b797b2b',
    downloadUrl: 'https://picsum.photos/800/800/',
    uploadDate: '2023-10-27 18:18:55',
    size: 79358,
  },
]);

const handleSortChange = (files) => {
  console.log(files);
};
</script>
