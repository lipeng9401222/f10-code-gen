<template>
  <e-table
    :columns="columns"
    :data-source="data"
    :row-expandable="() => true"
    :scroll="{ x: 800 }"
    :expand-column-width="100"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action'">
        <e-button link type="primary">删除</e-button>
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <p style="margin: 0">
        {{ record.description }}
      </p>
    </template>
    <template #expandColumnTitle>
      <span style="color: red">更多</span>
    </template>
  </e-table>
</template>
<script setup>
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name', fixed: true },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '操作', key: 'action' },
];

const data = [
  {
    key: 1,
    name: '张三',
    age: 32,
    address: '北京市朝阳区第一公园',
    description: '我叫张三，今年32岁，住在北京市朝阳区第一公园。',
  },
  {
    key: 2,
    name: '李四',
    age: 42,
    address: '上海市浦东新区第一公园',
    description: '我叫李四，今年42岁，住在上海市浦东新区第一公园。',
  },
  {
    key: 3,
    name: '王五',
    age: 32,
    address: '广州市天河区第一公园',
    description: '我叫王五，今年32岁，住在广州市天河区第一公园。',
  },
];
</script>
