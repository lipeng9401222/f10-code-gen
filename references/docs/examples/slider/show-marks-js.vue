<template>
  <div class="slider-demo-block">
    <e-slider v-model="value" range :marks="marks" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const value = ref([30, 60]);
const marks = reactive({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA',
    },
    label: '50%',
  },
});
</script>
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
