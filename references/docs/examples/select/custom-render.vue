<template>
  <div class="mb-2 flex items-center text-sm">
    <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" :render="customRender" />
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
    gender: 0,
    contentStyle: 'color: red',
  },
  {
    value: 'Option2',
    label: 'Option2',
    gender: 1,
    contentStyle: 'color: blue',
  },
  {
    value: 'Option3',
    label: 'Option3',
    gender: 0,
    contentStyle: 'color: green',
  },
  {
    value: 'Option4',
    label: 'Option4',
    gender: 1,
    contentStyle: 'color: yellow',
  },
  {
    value: 'Option5',
    label: 'Option5',
    gender: 0,
    contentStyle: 'color: purple',
  },
];

type RemoteDataItem = {
  value: string; // value
  label: string; // label
  disable: boolean; // disabled

  gender: 0 | 1; // 性别
  contentStyle: string;
};

const customRender = (itemData: RemoteDataItem) => {
  return h(
    'div',
    {
      style: itemData.contentStyle,
    },
    [h('span', itemData.gender == 0 ? '男' : '女'), h('span', ` ${itemData.label}`)]
  );
};
</script>
