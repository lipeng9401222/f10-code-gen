<template>
  <e-input-tag v-model="input" clearable placeholder="Please input" />
</template>

<script setup>
import { ref } from 'vue';
const input = ref(['tag1', 'tag2', 'tag3']);
</script>
