<template>
  <!-- eslint-disable vue/require-toggle-inside-transition  -->
  <e-tooltip-v2 aria-label="content" placement="top" content-class="scale-in">
    <template #trigger>
      <e-button circle
        ><e-icon><Plus /></e-icon
      ></e-button>
    </template>
    <div>content</div>
  </e-tooltip-v2>
</template>

<script setup>
import { Plus } from '@epoint-fe/eui-icons';
</script>

<style scoped>
@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.e-tooltip-v2__content.scale-in {
  animation: scale-in var(--e-transition-duration) ease-out forwards;
}
</style>
