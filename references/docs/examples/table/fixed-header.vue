<template>
  <e-table :columns="columns" :data-source="data" :pagination="{ pageSize: 50 }" :scroll="{ y: 240 }" />
</template>
<script lang="ts" setup>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const data = [...Array(100)].map((_, i) => ({
  key: i,
  name: `张三 ${i}`,
  age: 32,
  address: `张家港第 ${i} 号`,
}));
</script>
