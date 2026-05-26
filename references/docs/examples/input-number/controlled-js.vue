<template>
  <e-input-number v-model="num" :min="1" :max="10" controls-position="both" size="large" @change="handleChange" />
  <e-input-number v-model="num" class="mx-4" :min="1" :max="10" controls-position="both" @change="handleChange" />
  <e-input-number v-model="num" :min="1" :max="10" size="small" controls-position="both" @change="handleChange" />
</template>
<script setup>
import { ref } from 'vue';

const num = ref(1);
const handleChange = (value) => {
  console.log(value);
};
</script>
