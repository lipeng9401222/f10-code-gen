<template>
  <e-upload
    v-model:file-list="fileList"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    enable-sort
    :on-sort-change="handleSortChange"
  >
    <e-icon>
      <Plus />
    </e-icon>
  </e-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@epoint-fe/eui-icons';

import type { UploadProps, UploadUserFile } from '@epoint-fe/eui-components';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
  },
  {
    name: 'plant-2.png',
    url: '/images/plant-2.png',
  },
  {
    name: 'figure-1.png',
    url: '/images/figure-1.png',
  },
  {
    name: 'figure-2.png',
    url: '/images/figure-2.png',
  },
]);

const handleSortChange: UploadProps['onSortChange'] = (uploadFiles) => {
  console.log(uploadFiles);
};
</script>
