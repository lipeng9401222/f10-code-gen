<template>
  <e-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="openFullScreen1">
    As a directive
  </e-button>
  <e-button type="primary" @click="openFullScreen2"> As a service </e-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ELoading } from '@epoint-fe/eui-components';

const fullscreenLoading = ref(false);
const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    fullscreenLoading.value = false;
  }, 2000);
};

const openFullScreen2 = () => {
  const loading = ELoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  setTimeout(() => {
    loading.close();
  }, 2000);
};
</script>
