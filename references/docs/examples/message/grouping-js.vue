<template>
  <e-button :plain="true" @click="open">Show message</e-button>
</template>

<script setup>
import { EMessage } from '@epoint-fe/eui-components';

const open = () => {
  EMessage({
    message: 'this is a message.',
    grouping: true,
    type: 'success',
  });
};
</script>
