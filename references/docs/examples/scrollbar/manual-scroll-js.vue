<template>
  <e-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </e-scrollbar>

  <e-slider v-model="value" :max="max" :format-tooltip="formatTooltip" @input="inputSlider" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { EScrollbar } from '@epoint-fe/eui-components';

const max = ref(0);
const value = ref(0);
const innerRef = ref(null);
const scrollbarRef = ref(null);

onMounted(() => {
  max.value = innerRef.value.clientHeight - 380;
});

const inputSlider = (value) => {
  if (scrollbarRef.value) {
    scrollbarRef.value.setScrollTop(value);
  }
};
const scroll = ({ scrollTop }) => {
  value.value = scrollTop;
};
const formatTooltip = (value) => {
  return `${value} px`;
};
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--e-color-primary-light-9);
  color: var(--e-color-primary);
}
.e-slider {
  margin-top: 20px;
}
</style>
