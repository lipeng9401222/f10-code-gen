<template>
  <e-input-tag v-model="input" placeholder="Please input" aria-label="Please click the Enter key after input" />
</template>

<script setup>
import { ref } from 'vue';
const input = ref();
</script>
