<template>
  <e-space :size="size" spacer="|">
    <div v-for="i in 2" :key="i">
      <e-button> button {{ i }} </e-button>
    </div>
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref(10);
</script>
