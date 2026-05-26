<template>
  <e-button text @click="open">Click to open Message Box</e-button>
</template>

<script setup>
import { EMessageBox } from '@epoint-fe/eui-components';

const open = () => {
  EMessageBox.alert('<strong>proxy is <i>HTML</i> string</strong>', 'HTML String', {
    dangerouslyUseHTMLString: true,
  });
};
</script>
