<template>
  <e-space direction="vertical" :size="16">
    <e-input-amount v-model="toMin" :min="100" value-on-clear="min" placeholder="清空后回到 min(100)" />
    <e-input-amount v-model="toMax" :max="500" value-on-clear="max" placeholder="清空后回到 max(500)" />
  </e-space>
</template>

<script setup>
import { ref } from 'vue';

const toMin = ref(200);
const toMax = ref(200);
</script>
