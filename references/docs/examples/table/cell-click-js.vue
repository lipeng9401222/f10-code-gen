<template>
  <e-table :columns="columns" :data-source="dataSource" :pagination="false" @cell-click="handleCellClick" />
</template>

<script setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const dataSource = ref([
  {
    key: '1',
    name: '张明',
    dept: '研发一部',
    status: '在职',
  },
  {
    key: '2',
    name: '李华',
    dept: '产品部',
    status: '试用',
  },
  {
    key: '3',
    name: '王强',
    dept: '测试部',
    status: '离职',
  },
]);

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    customCell: (record) => ({
      style: {
        cursor: 'pointer',
      },
      onClick: () => {
        EMessage({
          message: `customCell.onClick: ${record.name}`,
          type: 'success',
        });
      },
    }),
  },
  {
    title: '部门',
    dataIndex: 'dept',
    key: 'dept',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
]);

function handleCellClick(record, column, value) {
  EMessage({
    message: `cell-click: 行[${record.name}]，列[${column.title}]，值[${value}]`,
    type: 'success',
  });
}
</script>
