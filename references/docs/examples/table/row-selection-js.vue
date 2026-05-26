<template>
  <e-table :row-selection="rowSelection" :columns="columns" :data-source="data">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link type="primary">{{ text }}</e-button>
      </template>
    </template>
  </e-table>
</template>
<script setup>

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
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
  {
    key: '4',
    name: '禁用用户',
    age: 99,
    address: '上海第一公园',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`选中的行键值: ${selectedRowKeys}`, '选中的行数据: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === '禁用用户', // 配置不可选中的列
    name: record.name,
  }),
};
</script>
