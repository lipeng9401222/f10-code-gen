<script setup>
import { reactive } from 'vue';

const font = reactive({
  color: 'rgba(0, 0, 0, 0.15)',
});
</script>

<template>
  <e-watermark :font="font">
    <div style="height: 200px" />
  </e-watermark>
</template>
