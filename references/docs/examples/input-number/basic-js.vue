<template>
  <e-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue';

const num = ref(1);
const handleChange = (value) => {
  console.log(value);
};
</script>
