<template>
  <e-rate v-model="value" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" show-text />
</template>

<script setup>
import { ref } from 'vue';

const value = ref();
</script>
