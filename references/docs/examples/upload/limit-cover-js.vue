<template>
  <e-upload
    ref="upload"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <template #trigger>
      <e-button type="primary">select file</e-button>
    </template>
    <e-button class="ml-3" type="success" @click="submitUpload"> upload to server </e-button>
    <template #tip>
      <div class="e-upload__tip text-red">limit 1 file, new file will cover the old file</div>
    </template>
  </e-upload>
</template>

<script setup>
import { ref } from 'vue';
import { genFileId } from '@epoint-fe/eui-components';

const upload = ref();

const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};

const submitUpload = () => {
  upload.value.submit();
};
</script>
