<template>
  <div class="container">
    <e-progress :percentage="30" type="square" />
    <e-progress :percentage="percentage" status="warning" type="square" />
    <e-progress :percentage="percentage" status="success" type="square" />
    <e-progress :percentage="percentage" status="exception" type="square" :square-size="30" />
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';

const percentage = ref(0);

const timer = setInterval(() => {
  percentage.value += 10;
  if (percentage.value >= 100) {
    percentage.value = 0;
  }
}, 1000);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
