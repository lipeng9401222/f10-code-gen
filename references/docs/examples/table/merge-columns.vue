<template>
  <e-table :columns="columns" :data-source="data" :merge-columns="mergeColumns" borderStyle="full" />
</template>

<script setup>
import { ref } from 'vue';

const mergeColumns = ref(['rowIndex', 'company.name', 'company.address']);

const data = [
  {
    rowIndex: '1',
    company: {
      name: '广西农业',
      address: '广西南宁市',
    },
    type: '汽油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '1',
    company: {
      name: '广西农业',
      address: '广西南宁市',
    },
    type: '柴油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '2',
    company: {
      name: '广西工业',
      address: '广西柳州市',
    },
    type: '汽油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '2',
    company: {
      name: '广西工业',
      address: '广西柳州市',
    },
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
    title: '公司名称',
    dataIndex: ['company', 'name'],
  },
  {
    title: '公司地址',
    dataIndex: ['company', 'address'],
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
