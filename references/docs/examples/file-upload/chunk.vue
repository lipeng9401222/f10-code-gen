<template>
  <e-file-upload
    v-model:file-list="fileList"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    chunk
    :chunk-size="1024"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fileList = ref([]);
</script>
