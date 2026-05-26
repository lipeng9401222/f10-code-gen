<template>
  <e-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </e-button>

  <e-drawer v-model="drawer" title="I'm outer Drawer" size="50%">
    <div>
      <e-button @click="innerDrawer = true">Click me!</e-button>
      <e-drawer v-model="innerDrawer" title="I'm inner Drawer" :append-to-body="true" :before-close="handleClose">
        <p>_(:зゝ∠)_</p>
      </e-drawer>
    </div>
  </e-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';

const drawer = ref(false);
const innerDrawer = ref(false);

const handleClose = (done) => {
  EMessageBox.confirm('You still have unsaved data, proceed?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
