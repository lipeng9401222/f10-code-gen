<template>
  <e-tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <e-button @mouseenter="visible = true" @mouseleave="visible = false"> Hover me </e-button>
  </e-tooltip>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
