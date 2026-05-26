<template>
  <e-button text @click="open">Click to open Message Box</e-button>
</template>

<script setup>
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';
const open = () => {
  EMessageBox.confirm('You have unsaved changes, save and proceed?', 'Confirm', {
    distinguishCancelAndClose: true,
    confirmButtonText: '保存',
    cancelButtonText: '取消修改',
  })
    .then(() => {
      EMessage({
        type: 'info',
        message: 'Changes saved. Proceeding to a new route.',
      });
    })
    .catch((action) => {
      EMessage({
        type: 'info',
        message: action === 'cancel' ? 'Changes discarded. Proceeding to a new route.' : 'Stay in the current route',
      });
    });
};
</script>
