<template>
  <e-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-change="handleChange"
  >
    <e-button type="primary">Click to upload</e-button>
    <template #tip>
      <div class="e-upload__tip">jpg/png files with a size less than 500kb</div>
    </template>
  </e-upload>
</template>
<script setup>
import { ref } from 'vue';

const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
]);

const handleChange = (uploadFile, uploadFiles) => {
  fileList.value = fileList.value.slice(-3);
};
</script>
