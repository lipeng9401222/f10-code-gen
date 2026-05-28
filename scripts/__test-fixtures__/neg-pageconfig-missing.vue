<template>
  <ep-layout-manager v-loading="model.global.state.loading">
    <div>{{ model.global.pageConfig.framevariable.taskCode }}</div>
  </ep-layout-manager>
</template>

<script setup>
import { onMounted } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';

const { useTableModel } = Hooks;

// 反例：读取了 model.global.pageConfig 但没有声明 PageConfig 实例
const model = Utils.defineDataModel(() => {
  const gridList = useTableModel('/api/list', {});
  return {
    models: { gridList }
  };
});

onMounted(() => {
  model.methods.initData();
});
</script>
