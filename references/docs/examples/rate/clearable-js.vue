<template>
  <e-rate v-model="value" clearable />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(3);
</script>
