<template>
  <e-table :sticky="stickyOption" :columns="columns" :data-source="data" :scroll="{ x: 1500 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'"><e-button link type="primary">操作</e-button></template>
    </template>
    <template #summary>
      <e-table-summary :fixed="fixedTop ? 'top' : 'bottom'">
        <e-table-summary-row>
          <e-table-summary-cell :index="0" :col-span="2">
            <e-switch v-model="fixedTop" active-text="固定在顶部" inactive-text="固定在顶部" inline-prompt></e-switch>
          </e-table-summary-cell>
          <e-table-summary-cell :index="2" :col-span="8">滚动区域</e-table-summary-cell>
          <e-table-summary-cell :index="10">固定在右侧</e-table-summary-cell>
        </e-table-summary-row>
      </e-table-summary>
    </template>
  </e-table>
</template>

<script setup>
import { ref } from 'vue';
const stickyOption = { offsetHeader: 56 };
const columns = ref([
  {
    title: '姓名',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '年龄',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: '列 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: '列 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: '列 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: '列 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: '列 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: '列 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: '列 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: '列 8', dataIndex: 'address', key: '8' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
]);

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `张三 ${i}`,
    age: 32,
    address: `北京公园 ${i}号`,
  });
}
const fixedTop = ref(false);
</script>

<style scoped>
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}

[data-theme='dark'] #components-table-demo-summary tfoot th,
[data-theme='dark'] #components-table-demo-summary tfoot td {
  background: #1d1d1d;
}
</style>
