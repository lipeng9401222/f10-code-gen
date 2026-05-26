<template>
  <div>
    <e-checkbox v-model="checked1" label="选项 1" size="large" />
    <e-checkbox v-model="checked2" label="选项 2" size="large" />
  </div>
  <div>
    <e-checkbox v-model="checked3" label="选项 1" />
    <e-checkbox v-model="checked4" label="选项 2" />
  </div>
  <div>
    <e-checkbox v-model="checked5" label="选项 1" size="small" />
    <e-checkbox v-model="checked6" label="选项 2" size="small" />
  </div>
  <div>
    <e-checkbox v-model="checked5" label="选项 1" size="small" disabled />
    <e-checkbox v-model="checked6" label="选项 2" size="small" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(false);
const checked4 = ref(false);
const checked5 = ref(false);
const checked6 = ref(false);
</script>
