<template>
  <div class="m-4">
    <p>default</p>
    <e-select v-model="value1" class="m-2" multiple placeholder="请选择" style="width: 240px">
      <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </e-select>
    <e-select v-model="value1" class="m-2" :options="options" multiple placeholder="请选择" style="width: 240px" />
  </div>
  <div class="m-4">
    <p>use collapse-tags</p>
    <e-select v-model="value2" class="m-2" multiple collapse-tags placeholder="请选择" style="width: 240px">
      <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </e-select>
    <e-select
      v-model="value2"
      class="m-2"
      :options="options"
      multiple
      collapse-tags
      placeholder="请选择"
      style="width: 240px"
    />
  </div>
  <div class="m-4">
    <p>use collapse-tags-tooltip</p>
    <e-select
      v-model="value3"
      class="m-2"
      multiple
      collapse-tags
      collapse-tags-tooltip
      placeholder="请选择"
      style="width: 240px"
    >
      <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </e-select>
    <e-select
      v-model="value3"
      :options="options"
      multiple
      collapse-tags
      class="m-2"
      collapse-tags-tooltip
      placeholder="请选择"
      style="width: 240px"
    />
  </div>
  <div class="m-4">
    <p>use max-collapse-tags</p>
    <e-select
      v-model="value4"
      multiple
      collapse-tags
      class="m-2"
      collapse-tags-tooltip
      :max-collapse-tags="3"
      placeholder="请选择"
      style="width: 240px"
    >
      <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </e-select>
    <e-select
      v-model="value4"
      :options="options"
      multiple
      collapse-tags
      class="m-2"
      collapse-tags-tooltip
      :max-collapse-tags="3"
      placeholder="请选择"
      style="width: 240px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref([]);
const value2 = ref([]);
const value3 = ref([]);
const value4 = ref([]);
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>
