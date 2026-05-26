<template>
  <e-table :columns="columns" :data-source="data" :drag="drag">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link>{{ text }}</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

// 是否允许行拖拽
const isAllowRowDrag = ref(true);
// 是否允许列拖拽
const isAllowColDrag = ref(true);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age(禁止列拖拽)',
    dataIndex: 'age',
    key: 'age',
    dragDisabled: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
];

const data = [
  {
    name: 'Dog',
    age: 18,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
  },
  {
    name: 'Cat(禁止行拖拽)',
    age: 24,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
  },
  {
    name: 'Rat',
    age: 36,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
  },
];

const drag = {
  allowRowDrag: isAllowRowDrag,
  allowColDrag: isAllowColDrag,
  rowDragHandler: true,
  // 拖拽变化前监听，返回false则阻断当前拖拽
  onChangeBefore: (dragRow: any, dragPathList: number[], dropPathList: number[]) => {
    // NOTE: 返回boolean或不返回,若返回false,则阻断当前的拖拽操作
    return true;
  },
  // 监听拖拽变化后
  onChange: (dragRow: any, dragPathList: number[], dropPathList: number[]) => {
    EMessage({
      type: 'info',
      message: `拖拽目标: ${dragRow.name} | 拖拽位置: ${JSON.stringify(dragPathList)} | 放置位置: ${JSON.stringify(
        dropPathList
      )}`,
    });
  },
  // 是否禁止当前行进行拖拽
  rowDisabled: (record: any) => {
    // 第二行禁止拖拽
    return record.name === 'Cat(禁止行拖拽)';
  },
};
</script>
