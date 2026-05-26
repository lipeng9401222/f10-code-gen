<template>
  <e-mention
    v-model="value"
    :options="options"
    :prefix="['@', '#']"
    style="width: 320px"
    placeholder="input @ to mention people, # to mention tag"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue';

const MOCK_DATA = {
  '@': ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'],
  '#': ['1.0', '2.0', '3.0'],
};
const value = ref('');
const options = refDefault([]);

const handleSearch = (_, prefix) => {
  options.value = (MOCK_DATA[prefix] || []).map((value) => ({
    value,
  }));
};
</script>
