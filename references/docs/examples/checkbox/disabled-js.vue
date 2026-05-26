<template>
  <e-checkbox v-model="checked1" disabled>Disabled</e-checkbox>
  <e-checkbox v-model="checked2">Not disabled</e-checkbox>
</template>

<script setup>
import { ref } from 'vue';
const checked1 = ref(false);
const checked2 = ref(true);
</script>
