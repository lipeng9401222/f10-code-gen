<script setup lang="ts">
import { reactive } from 'vue';
const config = reactive({
  content: 'Eui Vue',
  font: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.15)',
  },
  zIndex: 99,
  rotate: -22,
  gap: [100, 100] as [number, number],
  offset: [0, 0] as [number, number],
});
</script>

<template>
  <div v-watermark="config" style="height: 200px" />
</template>
