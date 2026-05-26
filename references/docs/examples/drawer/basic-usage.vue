<template>
  <e-radio-group v-model="direction">
    <e-radio value="ltr">left to right</e-radio>
    <e-radio value="rtl">right to left</e-radio>
    <e-radio value="ttb">top to bottom</e-radio>
    <e-radio value="btt">bottom to top</e-radio>
  </e-radio-group>

  <e-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </e-button>
  <e-button type="primary" style="margin-left: 16px" @click="drawer2 = true"> with footer </e-button>

  <e-drawer
    v-model="drawer"
    title="I am the title"
    :direction="direction"
    :before-close="handleClose"
    :close-on-press-escape="true"
    :close-on-click-modal="true"
  >
    <span>Hi, there!</span>
  </e-drawer>
  <e-drawer v-model="drawer2" :direction="direction" :close-on-press-escape="true" :close-on-click-modal="true">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <e-radio v-model="radio1" label="Option 1" size="large">Option 1</e-radio>
        <e-radio v-model="radio1" label="Option 2" size="large">Option 2</e-radio>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <e-button @click="cancelClick">cancel</e-button>
        <e-button type="primary" @click="confirmClick">confirm</e-button>
      </div>
    </template>
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';

const drawer = ref(false);
const drawer2 = ref(false);
const direction = ref('rtl');
const radio1 = ref('Option 1');
const handleClose = (done: () => void) => {
  EMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  EMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false;
    })
    .catch(() => {
      // catch error
    });
}
</script>
