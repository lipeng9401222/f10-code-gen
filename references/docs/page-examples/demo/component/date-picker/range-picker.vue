<template>
  <div class="p-xl">
    <ep-form :model="model.models">
      <ep-form-item label="时间选择">
        <e-date-picker v-model="model.datePickerValue" type="daterange" range-separator="~" start-placeholder="开始" end-placeholder="结束" value-format="YYYY-MM-DD" />
      </ep-form-item>
      <ep-form-item label="已选值"> from：{{ model.from }}, to：{{ model.to }}, datePickerValue：{{ model.datePickerValue }} </ep-form-item>
    </ep-form>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { Utils } from '@epframe/eui-core';

const model = Utils.defineDataModel(() => {
  const from = ref('2025-01-01');
  const to = ref('2025-01-31');

  const datePickerValue = ref([from.value, to.value]);

  watch(datePickerValue, (val) => {
    if (val.length === 2) {
      from.value = val[0];
      to.value = val[1];
    }
  });
  return {
    models: {
      datePickerValue,
      from,
      to
    }
  };
});
</script>
