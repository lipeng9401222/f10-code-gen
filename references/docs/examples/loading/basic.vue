<template>
  <e-table v-loading="true" :data-source="tableData" :columns="columns" />
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 180,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const tableData = [
  {
    date: '2016-05-03',
    name: '张三',
    address: '北京市朝阳区建国路189号',
  },
  {
    date: '2016-05-02',
    name: '李四',
    address: '上海市浦东新区世纪大道200号',
  },
  {
    date: '2016-05-04',
    name: '王五',
    address: '广州市天河区珠江新城88号',
  },
];
</script>

<style scoped>
body {
  margin: 0;
}
.example-showcase .e-loading-mask {
  z-index: 9;
}
</style>
