<template>
  <div class="hover-scope">
    <div>
      <h3>默认整行高亮</h3>
      <e-tree :default-selected-keys="['0-0-1']" :data="treeData" />
    </div>
    <div>
      <h3>设置文字高亮</h3>
      <e-tree :default-selected-keys="['0-0-1']" :data="treeData" hover-scope="text" />
    </div>
  </div>
</template>

<script setup>
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
          {
            label: 'Leaf',
            value: '0-0-2-2',
            disableCheckbox: true,
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
        children: [
          {
            label: 'Leaf ',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf ',
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
];
</script>
<style lang="scss">
.hover-scope {
  display: flex;
  > div {
    flex: 1;
    width: 0;
  }
}
</style>
