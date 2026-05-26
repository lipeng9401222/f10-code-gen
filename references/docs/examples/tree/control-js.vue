<template>
  <e-button-group style="margin-bottom: 20px">
    <e-button type="primary" @click="toggleChecked">
      {{ checkedKeys?.length ? 'deselect all' : 'select all' }}
    </e-button>
    <e-button type="primary" @click="toggleExpanded">
      {{ expandedKeys?.length ? 'fold' : 'unfold' }}
    </e-button>
  </e-button-group>
  <e-tree
    v-model:selected-keys="selectedKeys"
    v-model:checked-keys="checkedKeys"
    v-model:expanded-keys="expandedKeys"
    :checkable="true"
    :multiple="true"
    :data="treeData"
    @select="onSelect"
    @check="onCheck"
    @expand="onExpand"
  />
</template>

<script setup>
import { ref } from 'vue';

const allCheckedKeys = ['0-0', '0-0-1', '0-0-2', '0-0-2-1', '0-1', '0-1-1', '0-1-2'];
const allExpandedKeys = ['0-0', '0-1', '0-0-2'];

const selectedKeys = ref([]);
const checkedKeys = ref([]);
const expandedKeys = ref([]);

const toggleChecked = () => {
  checkedKeys.value = checkedKeys?.value.length ? [] : allCheckedKeys;
};
const toggleExpanded = () => {
  expandedKeys.value = expandedKeys?.value.length ? [] : allExpandedKeys;
};
const onSelect = (newSelectedKeys, event) => {
  console.log('select:', newSelectedKeys, event);
};
const onCheck = (newCheckedKeys, event) => {
  console.log('check:', newCheckedKeys, event);
};
const onExpand = (newExpandedKeys, event) => {
  console.log('expand:', newExpandedKeys, event);
};

const treeData = [
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
        children: [
          {
            label: 'Leaf 0-0-2-1',
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
        label: 'Leaf 0-1-1',
        value: '0-1-1',
      },
      {
        label: 'Leaf 0-1-2',
        value: '0-1-2',
      },
    ],
  },
];
</script>
