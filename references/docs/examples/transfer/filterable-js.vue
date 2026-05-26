<template>
  <e-transfer
    v-model="value"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="State Abbreviations"
    :data="data"
  />
</template>

<script setup>
import { ref } from 'vue';

const generateData = () => {
  const data = [];
  const states = ['California', 'Illinois', 'Maryland', 'Texas', 'Florida', 'Colorado', 'Connecticut '];
  const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT'];
  states.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
      initial: initials[index],
    });
  });
  return data;
};

const data = ref(generateData());
const value = ref([]);

const filterMethod = (query, item) => {
  return item.initial.toLowerCase().includes(query.toLowerCase());
};
</script>
