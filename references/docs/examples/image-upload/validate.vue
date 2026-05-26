<template>
  <e-image-upload
    v-model:image-list="imageList"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    :on-validate="handleValidate"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const imageList = ref([]);

const handleValidate = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isValidate = file.size < 102400;
      if (!isValidate) {
        EMessage.error('验证失败，文件大小不能超过 100KB！');
      }
      resolve(isValidate);
    }, 100);
  });
};
</script>
