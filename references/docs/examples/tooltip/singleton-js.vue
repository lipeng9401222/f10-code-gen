<template>
  <div>
    <e-button v-for="i in 3" :key="i" @mouseover="(e) => (buttonRef = e.currentTarget)" @click="visible = !visible"
      >Click to open tooltip</e-button
    >
  </div>

  <e-tooltip
    ref="tooltipRef"
    :visible="visible"
    :popper-options="{
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            enabled: false,
          },
        },
      ],
    }"
    :virtual-ref="buttonRef"
    virtual-triggering
    popper-class="singleton-tooltip"
  >
    <template #content>
      <span> Some content </span>
    </template>
  </e-tooltip>
</template>

<script setup>
import { ref } from 'vue';
const buttonRef = ref();
const tooltipRef = ref();

const visible = ref(false);
</script>

<style scoped>
.singleton-tooltip {
  transition: transform 0.3s var(--e-transition-function-fast-bezier);
}
</style>
