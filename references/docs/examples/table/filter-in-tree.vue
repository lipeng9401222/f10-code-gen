<template>
  <e-table :columns="columns" :data-source="data" @change="onChange" />
</template>
<script lang="ts" setup>
type TableDataType = {
  key: string;
  name: string;
  age: number;
  address: string;
};

type TableFilterType = {
  text: string;
  value: string;
};

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    filters: [
      {
        text: '李四',
        value: '李四',
      },
      {
        text: '张三',
        value: '张三',
        children: [
          {
            text: '王五',
            value: '王五',
          },
          {
            text: '赵六',
            value: '赵六',
          },
        ],
      },
    ],
    onFilter: (value: string, record: TableDataType) => record.name === value,
    filterMode: 'tree',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
  },
  {
    title: '地址',
    dataIndex: 'address',
    filters: [
      {
        text: '张家港',
        value: '张家港',
      },
      {
        text: '北京',
        value: '北京',
      },
    ],
    onFilter: (value: string, record: TableDataType) =>
      record.address.indexOf(value) === 0,
  },
];

const data: TableDataType[] = [
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
  {
    key: '4',
    name: '赵六',
    age: 32,
    address: '张家港第二公园',
  },
];
const onChange = (pagination, filters, sorter) => {
  console.log('参数', pagination, filters, sorter);
};
</script>
