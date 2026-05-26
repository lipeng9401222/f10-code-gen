<template>
  <div class="mb-2 flex items-center text-sm">
    <e-radio-group v-model="radio1" class="ml-4">
      <e-radio value="1" size="large">Option 1</e-radio>
      <e-radio value="2" size="large">Option 2</e-radio>
    </e-radio-group>
  </div>
  <div class="my-2 flex items-center text-sm">
    <e-radio-group v-model="radio2" class="ml-4">
      <e-radio value="1">Option 1</e-radio>
      <e-radio value="2">Option 2</e-radio>
    </e-radio-group>
  </div>
  <div class="my-4 flex items-center text-sm">
    <e-radio-group v-model="radio3" class="ml-4">
      <e-radio value="1" size="small">Option 1</e-radio>
      <e-radio value="2" size="small">Option 2</e-radio>
    </e-radio-group>
  </div>
  <div class="mb-2 flex items-center text-sm">
    <e-radio-group v-model="radio3" disabled class="ml-4">
      <e-radio value="1" size="small">Option 1</e-radio>
      <e-radio value="2" size="small">Option 2</e-radio>
    </e-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('1');
const radio2 = ref('1');
const radio3 = ref('1');
</script>
