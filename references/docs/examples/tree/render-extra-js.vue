<template>
  <div style="width: 500px; padding: 2px; overflow: auto">
    <e-tree :block-node="true" :checkable="true" :multiple="true" :data="treeData">
      <template #extra="nodeData">
        <e-icon style="color: #3370ff; margin-right: 5px" @click="() => onIconClick(nodeData)">
          <Plus />
        </e-icon>
        <e-icon style="color: #f53f3f" @click="() => onDeleteClick(nodeData)">
          <Minus />
        </e-icon>
      </template>
    </e-tree>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Minus, Plus } from '@epoint-fe/eui-icons';

function findNodeByValue(nodes, value) {
  for (const node of nodes) {
    if (node.value === value) {
      return node;
    }
    if (node.children) {
      const found = findNodeByValue(node.children, value);
      if (found) return found;
    }
  }
  return null;
}

function findParentNode(nodes, value, parent = null) {
  for (const node of nodes) {
    if (node.value === value) {
      return parent;
    }
    if (node.children && node.children.length > 0) {
      const found = findParentNode(node.children, value, node);
      if (found) return found;
    }
  }
  return null;
}

function onIconClick(nodeData) {
  const originalNode = findNodeByValue(treeData.value, nodeData.value);

  if (originalNode) {
    if (!originalNode.children) {
      originalNode.children = [];
    }

    originalNode.children.push({
      label: 'new tree node',
      value: `${nodeData.value}-${originalNode.children.length + 1}`,
    });

    treeData.value = [...treeData.value];
  }
}

function onDeleteClick(nodeData) {
  if (nodeData.value.split('-').length === 2) {
    const index = treeData.value.findIndex((node) => node.value === nodeData.value);
    if (index !== -1) {
      treeData.value.splice(index, 1);
      treeData.value = [...treeData.value];
    }
    return;
  }

  const parentNode = findParentNode(treeData.value, nodeData.value);

  if (parentNode && parentNode.children) {
    const index = parentNode.children.findIndex((node) => node.value === nodeData.value);
    if (index !== -1) {
      parentNode.children.splice(index, 1);

      if (parentNode.children.length === 0) {
        delete parentNode.children;
      }

      treeData.value = [...treeData.value];
    }
  }
}

const treeData = ref([
  {
    label: 'Trunk',
    value: '0-0',
    children: [
      {
        label: 'Leaf',
        value: '0-0-1',
      },
      {
        label: 'Branch',
        value: '0-0-2',
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk',
    value: '0-1',
    children: [
      {
        label: 'Branch',
        value: '0-1-1',
        children: [
          {
            label: 'Leaf',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf',
        value: '0-1-2',
      },
    ],
  },
]);
</script>
