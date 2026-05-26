<template>
  <e-table
    v-model:columns="columns"
    :data-source="data"
    :row-drag="rowDrag"
    :allow-row-drag="true"
    :allow-col-drag="true"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link>{{ text }}</e-button>
      </template>
    </template>
  </e-table>
  <e-button type="primary" @click="getColumns">获取当前列数据</e-button>
  <e-button type="primary" @click="manualDrag">第一列数据放置最后</e-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
]);

const data = [
  {
    name: 'Dog',
    age: 18,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
  },
  {
    name: 'Cat',
    age: 24,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
  },
  {
    name: 'Rat',
    age: 36,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
  },
];

// 获取当前列数据
const getColumns = () => {
  EMessage({
    type: 'info',
    message: `当前表格数据名称列表: ${columns.value.map((ele) => ele.title).join(' | ')}`,
  });
};

// 手动拖拽
const manualDrag = () => {
  const unshiftData = columns.value.shift()!;
  columns.value.push(unshiftData);
  EMessage({
    type: 'info',
    message: `当前表格数据名称列表: ${columns.value.map((ele) => ele.title).join(' | ')}`,
  });
};

const rowDrag = {
  // 监听拖拽变化后
  onChange: (dragRow: any, dragStartPathList: number[], dropPathList: number[]) => {
    EMessage({
      type: 'info',
      message: `拖拽目标: ${dragRow.name}`
    });
  },
};
</script>
