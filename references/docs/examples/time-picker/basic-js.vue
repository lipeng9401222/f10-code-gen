<template>
  <div class="example-basic">
    <e-time-picker v-model="value1" placeholder="Arbitrary time" />
    <e-time-picker v-model="value2" arrow-control placeholder="Arbitrary time" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const value1 = ref();
const value2 = ref();
</script>

<style scoped>
.example-basic .e-time-picker {
  margin: 8px;
}
</style>
