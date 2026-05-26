<template>
  <e-table :columns="columns" :row-key="record => record.key" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <e-button link type="primary">
          {{ record.name }}
        </e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
const columns = [
  {
    title: '姓名（所有屏幕）',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄（中等屏幕或更大）',
    dataIndex: 'age',
    key: 'age',
    responsive: ['md'],
  },
  {
    title: '地址（大屏幕或更大）',
    dataIndex: 'address',
    key: 'address',
    responsive: ['lg'],
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '纽约第一湖公园',
  },
];
</script>
