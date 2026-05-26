<template>
  <e-slider v-model="value" show-input size="large" />
  <e-slider v-model="value" show-input />
  <e-slider v-model="value" show-input size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>

<style scoped>
.e-slider {
  margin-top: 20px;
}

.e-slider:first-child {
  margin-top: 0;
}
</style>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .e-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
