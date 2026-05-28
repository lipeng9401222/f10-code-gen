<template>
  <ep-layout-manager v-loading="model.global.state.loading">
    <div>{{ model.dashboardData.data.total }}</div>
  </ep-layout-manager>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Utils } from '@epframe/eui-core';

// 反例：散装 ref + onMounted request，模板用了 model. 但没有 defineDataModel
const dashboardData = ref({ total: 0 });

const loadData = async () => {
  const res = await Utils.request({ url: '/api/demo/dashboard' });
  dashboardData.value = res.data;
};

onMounted(() => {
  loadData();
});
</script>
