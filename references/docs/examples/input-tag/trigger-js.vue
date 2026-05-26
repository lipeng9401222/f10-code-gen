<template>
  <div>
    <e-segmented v-model="trigger" :options="options" />
  </div>
  <br />
  <e-input-tag v-model="input" :trigger="trigger" placeholder="Please input" />
</template>

<script setup>
import { ref } from 'vue';
import { EVENT_CODE } from '@eui-components/constants';

const trigger = ref('Space');
const input = ref();
const options = [EVENT_CODE.enter, EVENT_CODE.space];
</script>
