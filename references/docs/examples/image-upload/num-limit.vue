<template>
  <e-image-upload
    v-model:image-list="imageList"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    :num-limit="1"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const imageList = ref([]);
</script>
