<template>
  严格选择: <e-switch v-model="rowSelection.checkStrictly"></e-switch>
  <e-table :columns="columns" :data-source="data" :row-selection="rowSelection" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    key: 1,
    name: '张大明',
    age: 60,
    address: '北京市朝阳区第一公园',
    children: [
      {
        key: 11,
        name: '张小明',
        age: 42,
        address: '北京市朝阳区第二公园',
      },
      {
        key: 12,
        name: '张小华',
        age: 30,
        address: '北京市朝阳区第三公园',
        children: [
          {
            key: 121,
            name: '张华华',
            age: 16,
            address: '北京市朝阳区第三公园',
          },
        ],
      },
      {
        key: 13,
        name: '李大明',
        age: 72,
        address: '上海市浦东新区第一公园',
        children: [
          {
            key: 131,
            name: '李小明',
            age: 42,
            address: '上海市浦东新区第二公园',
            children: [
              {
                key: 1311,
                name: '李小华',
                age: 25,
                address: '上海市浦东新区第三公园',
              },
              {
                key: 1312,
                name: '李华华',
                age: 18,
                address: '上海市浦东新区第四公园',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: '王大明',
    age: 32,
    address: '广州市天河区第一公园',
  },
];

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows);
  },
});
</script>
