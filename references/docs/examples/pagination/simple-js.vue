<template>
  <e-pagination v-model:current="current" simple :total="50" />
</template>
<script setup>
import { ref } from 'vue';
const current = ref(2);
</script>
