<template>
  <e-button text @click="open">Click to open Message Box</e-button>
</template>

<script setup>
import { markRaw } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';
import { Delete } from '@epoint-fe/eui-icons';

const open = () => {
  EMessageBox.confirm('It will permanently delete the file. Continue?', 'Warning', {
    type: 'warning',
    icon: markRaw(Delete),
  });
};
</script>
