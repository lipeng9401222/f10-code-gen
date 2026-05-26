<template>
  <e-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <e-button link type="primary">操作</e-button>
      </template>
    </template>
  </e-table>
</template>
<script setup>

const columns = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '列 1', dataIndex: 'address', key: '1' },
  { title: '列 2', dataIndex: 'address', key: '2' },
  { title: '列 3', dataIndex: 'address', key: '3' },
  { title: '列 4', dataIndex: 'address', key: '4' },
  { title: '列 5', dataIndex: 'address', key: '5' },
  { title: '列 6', dataIndex: 'address', key: '6' },
  { title: '列 7', dataIndex: 'address', key: '7' },
  { title: '列 8', dataIndex: 'address', key: '8' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '张家港公园',
  },
  {
    key: '2',
    name: '李四',
    age: 40,
    address: '张家港公园',
  },
];
</script>
