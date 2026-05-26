<template>
  <e-tree-select v-model="value" :data="data" :filter-method="filterMethod" filterable :loading="loading" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref();
const loading = ref(false);

const sourceData = [
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
const data = ref();

const filterMethod = (keyword) => {
  const loop = (data) => {
    const result = [];
    data.forEach((item) => {
      if (item.label.toLowerCase().includes(keyword.toLowerCase())) {
        result.push({ ...item });
      } else if (item.children) {
        const childData = loop(item.children);
        if (childData.length) {
          result.push({
            ...item,
            children: childData,
          });
        }
      }
    });
    return result;
  };

  return new Promise((resolve) => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      data.value = loop(sourceData);
      resolve();
    }, 500);
  });
};
</script>
