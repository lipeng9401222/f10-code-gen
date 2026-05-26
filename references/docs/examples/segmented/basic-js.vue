<template>
  <div class="flex flex-col items-start gap-4">
    <e-segmented v-model="value" :options="options" size="large" />
    <e-segmented v-model="value" :options="options" size="default" />
    <e-segmented v-model="value" :options="options" size="small" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const value = ref('Mon');

const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
</script>
