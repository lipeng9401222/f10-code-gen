<template>
  <e-input-tag v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>();
</script>
