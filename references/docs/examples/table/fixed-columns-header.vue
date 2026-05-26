<template>
  <e-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <e-button link type="primary">操作</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
const columns: TableColumnsType = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '列 1', dataIndex: 'address', key: '1', width: 160 },
  { title: '列 2', dataIndex: 'address', key: '2', width: 160 },
  { title: '列 3', dataIndex: 'address', key: '3', width: 160 },
  { title: '列 4', dataIndex: 'address', key: '4', width: 160 },
  { title: '列 5', dataIndex: 'address', key: '5', width: 160 },
  { title: '列 6', dataIndex: 'address', key: '6', width: 160 },
  { title: '列 7', dataIndex: 'address', key: '7', width: 160 },
  { title: '列 8', dataIndex: 'address', key: '8', width: 160 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `张三 ${i}`,
    age: 32,
    address: `张家港第 ${i} 号`,
  });
}
</script>
