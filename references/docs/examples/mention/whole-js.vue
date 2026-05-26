<template>
  <e-mention v-model="value1" whole :options="options1" style="width: 320px" placeholder="Please input" />
  <e-divider />
  <e-mention
    v-model="value2"
    :options="options2"
    :prefix="['@', '#']"
    whole
    :check-is-whole="checkIsWhole"
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
const value1 = ref('');
const value2 = ref('');
const options1 = ref(MOCK_DATA['@'].map((value) => ({ value })));
const options2 = ref([]);

const handleSearch = (_, prefix) => {
  options2.value = (MOCK_DATA[prefix] || []).map((value) => ({
    value,
  }));
};

const checkIsWhole = (pattern, prefix) => {
  return (MOCK_DATA[prefix] || []).includes(pattern);
};
</script>
