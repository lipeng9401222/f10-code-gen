<template>
  <e-pagination
    v-model:current="current"
    v-model:page-size="pageSizeRef"
    :page-size-options="pageSizeOptions"
    :total="total"
    :build-option-text="buildOptionText"
    show-size-changer
    @show-size-change="onShowSizeChange"
  />
</template>
<script setup>
import { ref } from 'vue';

const pageSizeOptions = ref(['10', '20', '30', '40', '50']);
const current = ref(1);
const pageSizeRef = ref(10);
const total = ref(50);

const buildOptionText = (option) => {
  if (option.value !== '50') {
    return `${option.value}条/页`;
  }
  return '全部';
};
const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
  pageSizeRef.value = pageSize;
};
</script>
