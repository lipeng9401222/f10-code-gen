<template>
  <e-space direction="vertical" :size="24">
    <e-input-amount v-model="inner" />
    <e-input-amount v-model="bottom" text-position="bottom" />
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inner = ref(8888.88);
const bottom = ref(8888.88);
</script>
