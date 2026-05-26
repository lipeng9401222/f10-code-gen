<script setup lang="ts">
import { reactive } from 'vue';
const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
});
</script>

<template>
  <e-watermark :font="font" :content="['Eui', 'Epoint Eui']">
    <div style="height: 500px" />
  </e-watermark>
</template>
