<template>
  <e-file-upload
    v-model:file-list="fileList"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    multiple
    :size-limit="1024"
  />
  <e-text>最大可上传文件大小为 1024KB</e-text>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fileList = ref([]);
</script>
