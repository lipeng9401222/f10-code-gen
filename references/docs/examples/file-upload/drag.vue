<template>
  <e-file-upload v-model:file-list="fileList" action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile" drag />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fileList = ref([]);
</script>
