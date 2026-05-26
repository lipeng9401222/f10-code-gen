<template>
  <div style="margin-bottom: 24px">
    <e-radio-group
      v-model="checkedStrategy"
      type="button"
      @change="
        (value) => {
          selected = [];
        }
      "
    >
      <e-radio v-for="item in strategyOptions" :key="item?.value" :value="item?.value">
        {{ item?.label }}
      </e-radio>
    </e-radio-group>
  </div>
  <e-tree-select
    v-model="selected"
    checkable
    multiple
    :checked-strategy="checkedStrategy"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const selected = ref([]);
const checkedStrategy = ref('all');

const strategyOptions = [
  {
    value: 'all',
    label: 'show all',
  },
  {
    value: 'parent',
    label: 'show parent',
  },
  {
    value: 'child',
    label: 'show child',
  },
];

const treeData = [
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
