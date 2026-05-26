<template>
  <e-input-number v-model="num" :precision="2" :step="0.1" :max="10" />
</template>

<script setup>
import { ref } from 'vue';

const num = ref(1);
</script>
