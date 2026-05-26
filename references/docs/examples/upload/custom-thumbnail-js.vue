<template>
  <e-upload action="#" list-type="picture-card" :auto-upload="false">
    <e-icon><Plus /></e-icon>

    <template #file="{ file }">
      <div>
        <img class="e-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="e-upload-list__item-actions">
          <span class="e-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <e-icon><zoom-in /></e-icon>
          </span>
          <span v-if="!disabled" class="e-upload-list__item-delete" @click="handleDownload(file)">
            <e-icon><Download /></e-icon>
          </span>
          <span v-if="!disabled" class="e-upload-list__item-delete" @click="handleRemove(file)">
            <e-icon><Delete /></e-icon>
          </span>
        </span>
      </div>
    </template>
  </e-upload>

  <e-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </e-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { Delete, Download, Plus, ZoomIn } from '@epoint-fe/eui-icons';

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);

const handleRemove = (file) => {
  console.log(file);
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};
</script>
