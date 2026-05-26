<template>
  <e-button plain @click="open"> Use HTML String </e-button>
</template>

<script setup>
import { ENotification } from '@epoint-fe/eui-components';

const open = () => {
  ENotification({
    title: 'HTML String',
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  });
};
</script>
