<template>
  <div class="flex flex-col items-start gap-4">
    <e-segmented v-model="value" :options="options" disabled />
    <e-segmented v-model="value" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('Mon');
const options = [
  {
    label: 'Mon',
    value: 'Mon',
    disabled: true,
  },
  {
    label: 'Tue',
    value: 'Tue',
  },
  {
    label: 'Wed',
    value: 'Wed',
    disabled: true,
  },
  {
    label: 'Thu',
    value: 'Thu',
  },
  {
    label: 'Fri',
    value: 'Fri',
    disabled: true,
  },
  {
    label: 'Sat',
    value: 'Sat',
  },
  {
    label: 'Sun',
    value: 'Sun',
  },
];
</script>
