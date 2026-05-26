<template>
  <e-tooltip-v2 full-transition :transition-props="transitionProps">
    <template #trigger>
      <e-button circle
        ><e-icon><Plus /></e-icon
      ></e-button>
    </template>
    <div>content</div>
  </e-tooltip-v2>
</template>

<script setup lang="ts">
import { Plus } from '@epoint-fe/eui-icons';

const transitionProps = {
  name: 'el-fade-in-linear',
};
</script>
