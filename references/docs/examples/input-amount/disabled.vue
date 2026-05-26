<template>
  <e-input-amount v-model="amount" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const amount = ref(100);
</script>
