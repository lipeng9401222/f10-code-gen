<template>
  <e-input-amount v-model="amount" :min="0" :max="999999.99" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue';

const amount = ref(1234.56);
const handleChange = (current, prev) => {
  console.log(current, prev);
};
</script>
