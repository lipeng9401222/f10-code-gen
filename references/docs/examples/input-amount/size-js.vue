<template>
  <e-input-amount v-model="large" size="large" />
  <e-input-amount v-model="medium" class="mx-4" />
  <e-input-amount v-model="small" size="small" />
</template>

<script setup>
import { ref } from 'vue';

const large = ref(1000);
const medium = ref(1000);
const small = ref(1000);
</script>
