<template>
  <e-input-amount v-model="amount" :step="100" :min="0" :max="10000" />
</template>

<script setup>
import { ref } from 'vue';

const amount = ref(1000);
</script>
