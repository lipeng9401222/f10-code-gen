<template>
  <e-time-select v-model="value" start="08:30" step="00:15" end="18:30" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
</script>
