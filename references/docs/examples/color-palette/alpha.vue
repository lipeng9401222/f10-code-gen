<template>
  <e-color-palette v-model="color" show-alpha />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('rgba(236, 29, 15, 0.8)');
</script>
