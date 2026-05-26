<template>
  <e-tree
    :default-selected-keys="['0-0-1']"
    :field-names="{
      value: 'value',
      label: 'text',
      children: 'items',
      icon: 'customIcon',
    }"
    :data="treeData"
  />
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { Notebook, Star } from '@epoint-fe/eui-icons';

const treeData = [
  {
    text: 'Trunk 0-0',
    value: '0-0',
    items: [
      {
        text: 'Branch 0-0-2',
        value: '0-0-2',
        selectable: false,
        customIcon: () => h(Notebook),
        items: [
          {
            text: 'Leaf',
            value: '0-0-2-1',
            items: [
              {
                text: 'Leaf 0-0-2',
                value: '0-0-2-1-0',
                items: [
                  {
                    text: 'Leaf',
                    customIcon: () => h(Star),
                    value: '0-0-2-1-0-0',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: 'Trunk 0-1',
    value: '0-1',
    items: [
      {
        text: 'Branch 0-1-1',
        value: '0-1-1',
        items: [
          {
            text: 'Leaf',
            value: '0-1-1-0',
          },
        ],
      },
    ],
  },
];
</script>
