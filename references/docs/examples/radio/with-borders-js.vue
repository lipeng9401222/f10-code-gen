<template>
  <div>
    <e-radio-group v-model="radio1">
      <e-radio value="1" size="large" border>Option A</e-radio>
      <e-radio value="2" size="large" border>Option B</e-radio>
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio2">
      <e-radio value="1" border>Option A</e-radio>
      <e-radio value="2" border>Option B</e-radio>
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio3" size="small">
      <e-radio value="1" border>Option A</e-radio>
      <e-radio value="2" border disabled>Option B</e-radio>
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio4" size="small" disabled>
      <e-radio value="1" border>Option A</e-radio>
      <e-radio value="2" border>Option B</e-radio>
    </e-radio-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio1 = ref('1');
const radio2 = ref('1');
const radio3 = ref('1');
const radio4 = ref('1');
</script>
