<template>
  <e-button text @click="open">Click to open Message Box</e-button>
</template>

<script setup>
import { h } from 'vue';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';
const open = () => {
  EMessageBox({
    title: 'Message',
    message: h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
    showCancelButton: true,
    // confirmButtonText: 'OK',
    // cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = 'Loading...';
        setTimeout(() => {
          done();
          setTimeout(() => {
            instance.confirmButtonLoading = false;
          }, 300);
        }, 3000);
      } else {
        done();
      }
    },
  }).then((action) => {
    EMessage({
      type: 'info',
      message: `action: ${action}`,
    });
  });
};
</script>
