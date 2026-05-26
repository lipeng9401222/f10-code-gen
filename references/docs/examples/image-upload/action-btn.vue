<template>
  <e-image-upload
    v-model:image-list="imageList"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    :enable-preview="false"
    :before-remove="handleBeforeRemove"
    :on-remove="handleRemove"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessageBox, type UploadImage } from '@epoint-fe/eui-components';

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

const handleBeforeRemove = (file: UploadImage, data: Record<string, any>) => {
  return new Promise((resolve) => {
    EMessageBox.confirm(`确定移除${file.name}？`, '删除提醒')
      .then(() => {
        // 发送删除请求
        setTimeout(() => {
          console.log('删除图片请求', data);
          resolve(true);
        });
      })
      .catch(() => {
        resolve(false);
      });
  });
};
const handleRemove = (file: UploadImage) => {
  console.log('删除成功', file);
};
</script>
