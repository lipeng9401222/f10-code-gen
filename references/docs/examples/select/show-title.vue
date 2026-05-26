<template>
  <p>组件插槽</p>
  <e-select v-model="value" class="m-2" placeholder="请选择" size="large" :fit-input-width="true">
    <e-option v-for="item in options" :key="item.value" :title="item.title" :label="item.label" :value="item.value" />
  </e-select>
  <p>Options 数据绑定</p>
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" size="large" :fit-input-width="true" />
  <p>不设置fitInputWidth</p>
  <e-select v-model="value" class="m-2" placeholder="请选择" size="large">
    <e-option v-for="item in options" :key="item.value" :title="item.title" :label="item.label" :value="item.value" />
  </e-select>
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" size="large" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');

const options = [
  {
    title:
      'This is a tooltip that provides additional information for the long value when hovered over, helping users understand its significance in the context of their selection.',
    value: 'long-value-example-1234567890',
    label: 'An Example of a Long Label That Demonstrates the Use of Extended Descriptions for Clarity',
  },
  {
    value: 'option-2',
    label: 'A Label That Clearly Defines the Second Choice',
  },
  {
    title:
      'This is the description for the third option, which offers users another selection to consider based on their needs.',
    value: 'option-3',
    label: 'A Label That Clearly Defines the Third Choice',
  },
  {
    title: 'option-4',
    value: 'option-4',
    label: 'option-4',
  },
];
</script>
