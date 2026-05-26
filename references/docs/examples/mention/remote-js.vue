<template>
  <e-mention
    v-model="value"
    :options="options"
    :loading="loading"
    style="width: 320px"
    placeholder="Please input"
    @search="handleSearch"
  />
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue';

const value = ref('');
const loading = ref(false);
const options = ref([]);

let timer;
const handleSearch = (pattern) => {
  if (timer) clearTimeout(timer);

  loading.value = true;
  timer = setTimeout(() => {
    options.value = ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'].map((item) => ({
      label: pattern + item,
      value: pattern + item,
    }));
    loading.value = false;
  }, 1500);
};

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>
