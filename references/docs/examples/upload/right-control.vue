<template>
  <e-upload
    action="#"
    list-type="picture-card"
    :enable-add="true"
    :enable-download="true"
    :enable-delete="true"
    :enable-preview="true"
  >
    <e-icon><Plus /></e-icon>

    <template #file="{ file, enableDelete, enableDownload, enablePreview }">
      <div>
        <img class="e-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="e-upload-list__item-actions">
          <span v-if="enablePreview" class="e-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <e-icon><zoom-in /></e-icon>
          </span>
          <span v-if="enableDownload" class="e-upload-list__item-delete" @click="handleDownload(file)">
            <e-icon><Download /></e-icon>
          </span>
          <span v-if="enableDelete" class="e-upload-list__item-delete" @click="handleRemove(file)">
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
<script lang="ts" setup>
import { ref } from 'vue';
import { Delete, Download, Plus, ZoomIn } from '@epoint-fe/eui-icons';

import type { UploadFile } from '@epoint-fe/eui-components';

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove = (file: UploadFile) => {
  console.log('Delete', file);
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log('Download', file);
};
</script>
