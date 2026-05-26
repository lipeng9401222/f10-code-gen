<template>
  <e-radio-group v-model="radio">
    <e-radio :value="3">Option A</e-radio>
    <e-radio :value="6">Option B</e-radio>
    <e-radio :value="9">Option C</e-radio>
  </e-radio-group>
</template>

<script setup>
import { ref } from 'vue';

const radio = ref(3);
</script>
