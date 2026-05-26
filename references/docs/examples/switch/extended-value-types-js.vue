<template>
  <e-tooltip :content="'Switch value: ' + value" placement="top">
    <e-switch
      v-model="value"
      style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949"
      active-value="100"
      inactive-value="0"
    />
  </e-tooltip>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('100');
</script>
