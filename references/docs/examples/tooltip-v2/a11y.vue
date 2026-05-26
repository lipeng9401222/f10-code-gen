<template>
  <e-tooltip-v2 :aria-label="title">
    <template #trigger>
      <e-button
        ><e-icon><Delete /></e-icon
      ></e-button>
    </template>
    {{ content }}
  </e-tooltip-v2>
</template>

<script setup lang="ts">
import { Delete } from '@epoint-fe/eui-icons';
const content = 'Delete';
const title = 'Delete item';
</script>
