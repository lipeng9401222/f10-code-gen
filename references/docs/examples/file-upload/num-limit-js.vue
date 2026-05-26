<template>
  <e-file-upload
    v-model:file-list="fileList"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    :num-limit="1"
  />
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([]);
</script>
