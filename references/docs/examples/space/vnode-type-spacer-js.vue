<template>
  <e-space :size="size" :spacer="spacer">
    <div v-for="i in 2" :key="i">
      <e-button> button {{ i }} </e-button>
    </div>
  </e-space>
</template>

<script setup>
import { h, ref } from 'vue';
import { EDivider } from '@epoint-fe/eui-components';

const size = ref(10);
const spacer = h(EDivider, { direction: 'vertical' });
</script>
