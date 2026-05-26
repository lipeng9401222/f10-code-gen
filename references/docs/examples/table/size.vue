<template>
  <h4>大尺寸表格</h4>
  <e-table :columns="columns" :data-source="data" size="large" />
  <h4>小尺寸表格</h4>
  <e-table :columns="columns" :data-source="data" size="small" />
</template>
<script lang="ts" setup>
const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];
const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
  },
];
</script>
<style scoped>
h4 {
  margin-bottom: 16px;
}
</style>
