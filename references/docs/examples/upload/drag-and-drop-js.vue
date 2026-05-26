<template>
  <e-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
    <e-icon class="e-icon--upload"><upload-filled /></e-icon>
    <div class="e-upload__text">拖拽到此区域<em>点击上传</em></div>
    <template #tip>
      <div class="e-upload__tip">支持 jpg/png 格式文件，且文件大小不超过 500kb</div>
    </template>
  </e-upload>
</template>

<script setup>
import { UploadFilled } from '@epoint-fe/eui-icons';
</script>
