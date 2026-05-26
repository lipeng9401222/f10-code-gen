<template>
  <e-input-amount v-model="amount" :min="10" :max="99.99" :step="0.01" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const amount = ref(12.34);
</script>
