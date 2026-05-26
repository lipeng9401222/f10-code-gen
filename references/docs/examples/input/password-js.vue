<template>
  <e-input v-model="input" type="password" placeholder="Please input password" show-password />
</template>

<script setup>
import { ref } from 'vue';
const input = ref('');
</script>
