<template>
  <e-color-picker v-model="color" show-alpha enable-predefine enable-history />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('rgba(255, 69, 0, 0.68)');
</script>
