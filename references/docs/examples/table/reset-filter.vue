<template>
  <div>
    <div class="table-operations">
      <e-button @click="setAgeSort">年龄排序</e-button>
      <e-button @click="clearFilters">清除筛选</e-button>
      <e-button @click="clearAll">清除筛选和排序</e-button>
    </div>
    <e-table :columns="columns" :data-source="data" @change="handleChange" />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [
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

const filteredInfo = ref();
const sortedInfo = ref();

const columns = computed(() => {
  const filtered = filteredInfo.value || {};
  const sorted = sortedInfo.value || {};
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: '王', value: '王' },
        { text: '李', value: '李' },
      ],
      filteredValue: filtered.name || null,
      onFilter: (value: string, record: DataItem) => record.name.includes(value),
      sorter: (a: DataItem, b: DataItem) => a.name.length - b.name.length,
      sortOrder: sorted.columnKey === 'name' && sorted.order,
      ellipsis: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: DataItem, b: DataItem) => a.age - b.age,
      sortOrder: sorted.columnKey === 'age' && sorted.order,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: '张家港', value: '张家港' },
        { text: '北京', value: '北京' },
      ],
      filteredValue: filtered.address || null,
      onFilter: (value: string, record: DataItem) => record.address.includes(value),
      sorter: (a: DataItem, b: DataItem) => a.address.length - b.address.length,
      sortOrder: sorted.columnKey === 'address' && sorted.order,
      ellipsis: true,
    },
  ];
});

const handleChange = (pagination, filters, sorter) => {
  console.log('各种参数', pagination, filters, sorter);
  filteredInfo.value = filters;
  sortedInfo.value = sorter;
};
const clearFilters = () => {
  filteredInfo.value = null;
};
const clearAll = () => {
  filteredInfo.value = null;
  sortedInfo.value = null;
};
const setAgeSort = () => {
  sortedInfo.value = {
    order: 'descend',
    columnKey: 'age',
  };
};
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
