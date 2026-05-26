<template>
  <e-button plain @click="openCenter">Centered text</e-button>
</template>

<script setup>
import { EMessage } from '@epoint-fe/eui-components';

const openCenter = () => {
  EMessage({
    showClose: true,
    message: 'Centered text',
    center: true,
  });
};
</script>
