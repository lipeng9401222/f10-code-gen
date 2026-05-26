<template>
  <p>组件插槽</p>
  <e-select v-model="value" class="m-2" placeholder="请选择" size="large">
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
  <e-select v-model="value" class="m-2" placeholder="请选择">
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
  <e-select v-model="value" class="m-2" placeholder="请选择" size="small">
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
  <p>Options 数据绑定</p>
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" size="large" />
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" />
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" size="small" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');

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
