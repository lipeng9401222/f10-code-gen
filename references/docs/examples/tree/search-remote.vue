<template>
  <e-tree :data="treeData" show-filter :filter-method="filter" />
</template>

<script lang="ts" setup>
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Branch 0-0-0',
        value: '0-0-0',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-0-0',
          },
          {
            label: 'Leaf',
            value: '0-0-0-1',
          },
        ],
      },
      {
        label: 'Branch 0-0-1',
        value: '0-0-1',
        children: [
          {
            label: 'Leaf',
            value: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

const filter = (key: string) => {
  return new Promise((resolve) => {
    const data = [
      {
        label: 'Trunk 0-0',
        value: '0-0',
        children: [
          {
            label: `Branch ${key}`,
            value: '0-0-0',
            children: [
              {
                label: `Leaf ${key}`,
                value: '0-0-0-0',
              },
              {
                label: `${key} Leaf`,
                value: '0-0-0-1',
              },
            ],
          },
        ],
      },
    ];
    setTimeout(() => {
      resolve(key ? data : treeData);
    }, 500);
  });
};
</script>
