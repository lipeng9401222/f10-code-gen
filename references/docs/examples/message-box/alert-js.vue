<template>
  <e-button text @click="open">Click to open the Message Box</e-button>
</template>

<script setup>
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

const open = () => {
  EMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    callback: (action) => {
      EMessage({
        type: 'info',
        message: `action: ${action}`,
      });
    },
  });
};
</script>
