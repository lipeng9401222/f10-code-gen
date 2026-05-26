<template>
  <e-tooltip-v2 aria-label="content" placement="left">
    <template #trigger>
      <e-button circle
        ><e-icon><Plus /></e-icon
      ></e-button>
    </template>
    Basic tooltip
  </e-tooltip-v2>
</template>

<script setup>
import { Plus } from '@epoint-fe/eui-icons';
</script>
