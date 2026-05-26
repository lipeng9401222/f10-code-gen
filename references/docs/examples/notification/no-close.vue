<template>
  <e-button plain @click="open"> Hide close button </e-button>
</template>

<script lang="ts" setup>
import { ENotification } from '@epoint-fe/eui-components';

const open = () => {
  ENotification.success({
    title: 'Info',
    message: 'This is a message without close button',
    showClose: false,
  });
};
</script>
