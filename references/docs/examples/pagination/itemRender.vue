<template>
  <e-pagination v-model:current="current" :total="500">
    <template #itemRender="{ type, originalElement }">
      <span v-if="type === 'prev'" class="custom-page">Prev</span>
      <span v-else-if="type === 'next'" class="custom-page">Next</span>
      <component :is="originalElement" v-else />
    </template>
  </e-pagination>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const current = ref(1);
</script>

<style scoped>
.custom-page {
  padding: 0 8px;
}
</style>
