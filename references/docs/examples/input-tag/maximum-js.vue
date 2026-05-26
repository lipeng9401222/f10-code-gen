<template>
  <e-input-tag v-model="input" :max="3" placeholder="enter up to 3 tags" />
</template>

<script setup>
import { ref } from 'vue';
const input = ref();
</script>
