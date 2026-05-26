<template>
  <e-steps :active="active" finish-status="success">
    <e-step title="Step 1" />
    <e-step title="Step 2" />
    <e-step title="Step 3" />
  </e-steps>

  <e-button style="margin-top: 12px" @click="next">Next step</e-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>
