<template>
  <e-table :columns="columns" :data-source="data" :mergeCells="mergeCells" borderStyle="full" />
</template>

<script setup>
import { ref } from 'vue';

const mergeCells = ref([
  { rowIndex: 0, columnIndex: 3, rowSpan: 3 },
  { rowIndex: 2, columnIndex: 1, rowSpan: 2, colSpan: 3 },
]);

const data = [
  {
    rowIndex: '1',
    company: '广西农业',
    type: '汽油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '1',
    company: '广西农业',
    type: '柴油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '2',
    company: '广西工业',
    type: '汽油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '2',
    company: '广西工业',
    type: '柴油',
    unit: '吨',
    sales: '600',
    price: '5000',
  },
];

const columns = [
  {
    title: '序号',
    dataIndex: 'rowIndex',
    width: 100,
  },
  {
    title: '公司',
    dataIndex: 'company',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '单位',
    dataIndex: 'unit',
  },
  {
    title: '销量',
    dataIndex: 'sales',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
];
</script>
