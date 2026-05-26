<template>
  <e-radio v-model="radio" disabled value="disabled">Option A</e-radio>
  <e-radio v-model="radio" disabled value="selected and disabled">Option B</e-radio>
</template>

<script setup>
import { ref } from 'vue';

const radio = ref('selected and disabled');
</script>
