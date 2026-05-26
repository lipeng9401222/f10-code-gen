<template>
  <e-row class="demo-autocomplete">
    <e-col :span="12">
      <div class="sub-title my-2 text-sm text-gray-600">list suggestions when activated</div>
      <e-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </e-col>
    <e-col :span="12">
      <div class="sub-title my-2 text-sm text-gray-600">list suggestions on input</div>
      <e-autocomplete
        v-model="state2"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </e-col>
  </e-row>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const state1 = ref('');
const state2 = ref('');

const restaurants = ref([]);
const querySearch = (queryString, cb) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value;
  // call callback function to return suggestions
  cb(results);
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ];
};

const handleSelect = (item) => {
  console.log(item);
};

onMounted(() => {
  restaurants.value = loadAll();
});
</script>
