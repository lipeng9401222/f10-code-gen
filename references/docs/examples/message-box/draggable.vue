<template>
  <e-button text @click="open">Click to open Message Box</e-button>
</template>

<script lang="ts" setup>
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

const open = () => {
  EMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    type: 'warning',
    draggable: true,
  })
    .then(() => {
      EMessage({
        type: 'success',
        message: 'Delete completed',
      });
    })
    .catch(() => {
      EMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};
</script>
