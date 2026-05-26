<template>
  <e-button :plain="true" @click="open2">success</e-button>
  <e-button :plain="true" @click="open3">warning</e-button>
  <e-button :plain="true" @click="open1">message</e-button>
  <e-button :plain="true" @click="open4">error</e-button>
</template>

<script setup>
import { EMessage } from '@epoint-fe/eui-components';

const open1 = () => {
  EMessage('this is a message.');
};
const open2 = () => {
  EMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
const open3 = () => {
  EMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
  });
};
const open4 = () => {
  EMessage.error('Oops, this is a error message.');
};
</script>
