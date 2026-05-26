<template>
  <e-button plain @click="open"> N ENotification with offset </e-button>
</template>

<script lang="ts" setup>
import { ENotification } from '@epoint-fe/eui-components';

const open = () => {
  ENotification.success({
    title: 'Success',
    message: 'This is a success message',
    offset: 100,
  });
};
</script>
