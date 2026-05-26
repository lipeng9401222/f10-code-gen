<template>
  <e-input-amount v-model="amount" :step="50" :min="0" :max="1000" step-strictly />
</template>

<script setup>
import { ref } from 'vue';

const amount = ref(100);
</script>
