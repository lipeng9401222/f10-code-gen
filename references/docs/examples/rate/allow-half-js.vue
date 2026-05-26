<template>
  <e-rate v-model="value" allow-half />
</template>

<script setup>
import { ref } from 'vue';

const value = ref();
</script>
