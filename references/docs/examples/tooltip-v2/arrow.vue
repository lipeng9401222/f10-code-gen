<template>
  <e-tooltip-v2 aria-label="content" show-arrow always-on placement="top">
    <template #trigger>
      <e-button circle
        ><e-icon><Plus /></e-icon
      ></e-button>
    </template>
    Basic tooltip
  </e-tooltip-v2>
</template>

<script setup lang="ts">
import { Plus } from '@epoint-fe/eui-icons';
</script>
