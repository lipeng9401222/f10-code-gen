<template>
  <div class="demo-color-sizes">
    <e-color-picker v-model="color" size="large" />
    <e-color-picker v-model="color" />
    <e-color-picker v-model="color" size="small" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const color = ref('409EFF');
</script>

<style scoped>
.demo-color-sizes .e-color-picker:not(:last-child) {
  margin-right: 16px;
}
</style>
