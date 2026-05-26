<template>
  <e-select
    v-model="value"
    style="width: 240px"
    multiple
    filterable
    remote
    :remote-method="remoteMethod"
    clearable
    :options="options"
    :loading="loading"
    placeholder="Please enter a keyword"
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script setup>
import { ref } from 'vue';

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
const list = states.map((item) => {
  return { value: `value:${item}`, label: `label:${item}` };
});

const value = ref([]);
const options = ref([]);
const loading = ref(false);

const remoteMethod = (query) => {
  if (query !== '') {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options.value = [];
  }
};
</script>
