<template>
  <e-checkbox v-model="checked" style="margin-bottom: 20px"> checkable </e-checkbox>
  <e-tree class="tree-demo" draggable block-node :checkable="checked" :data="treeData" @drop="onDrop" />
</template>

<script setup>
import { ref } from 'vue';

const defaultTreeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf 0-0-1',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        disableCheckbox: true,
        children: [
          {
            draggable: false,
            label: 'Leaf 0-0-2-1 (Drag disabled)',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        checkable: false,
        children: [
          {
            label: 'Leaf 0-1-1-1',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf 0-1-1-2',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf 0-1-2',
        value: '0-1-2',
      },
    ],
  },
];
const treeData = ref(defaultTreeData);
const checked = ref(false);

const onDrop = ({ dragNode, dropNode, dropPosition }) => {
  const data = treeData.value;
  const loop = (data, value, callback) => {
    data.some((item, index, arr) => {
      if (item.value === value) {
        callback(item, index, arr);
        return true;
      }
      if (item.children) {
        return loop(item.children, value, callback);
      }
      return false;
    });
  };

  loop(data, dragNode.value, (_, index, arr) => {
    arr.splice(index, 1);
  });

  if (dropPosition === 0) {
    loop(data, dropNode.value, (item) => {
      item.children = item.children || [];
      item.children.push(dragNode);
    });
  } else {
    loop(data, dropNode.value, (_, index, arr) => {
      arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
    });
  }
};
</script>
