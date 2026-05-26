<template>
  <e-color-palette ref="colorPalette" v-model="color" show-alpha enable-predefine enable-history />
  <e-button type="primary" plain style="margin-top: 30px" @click="getValue">getValue</e-button>
</template>

<script setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const colorPalette = ref();
const color = ref('rgba(255, 69, 0, 0.68)');

const getValue = () => {
  EMessage({
    message: colorPalette.value?.color.value,
  });
};
</script>
