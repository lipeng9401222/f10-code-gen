<template>
  <div>
    <div m="b-2">firstDayOfWeek：<e-input-number v-model="config.firstDayOfWeek" :min="1" :max="7" /></div>
    <div m="b-2">format：<e-select v-model="config.format" :options="options" /></div>

    <e-config-provider :date-picker="config">
      <e-date-picker v-model="value" type="date" />
    </e-config-provider>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
const options = [
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
  { label: 'YYYY年MM月DD日', value: 'YYYY年MM月DD日' },
];
const value = ref('');
const config = reactive({
  firstDayOfWeek: 1,
  format: 'YYYY-MM-DD',
});
</script>
