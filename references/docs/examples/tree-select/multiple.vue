<template>
  <EForm label-width="100px">
    <EFormItem label="下拉树">
      <e-tree-select v-model="value1" :data="data" multiple :check-strictly="false" />
    </EFormItem>

    <e-divider />

    <EFormItem label="复选框">
      <e-tree-select v-model="value2" :data="data" checkable multiple />
    </EFormItem>

    <e-divider />

    <EFormItem label="非联动">
      <e-tree-select v-model="valueStrictly" :data="data" checkable check-strictly />
    </EFormItem>
  </EForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref([]);
const value2 = ref([]);
const valueStrictly = ref([]);

const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
</script>
