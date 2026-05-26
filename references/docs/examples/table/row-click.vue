<template>
  <e-table
    :rowSelection="rowSelection"
    :columns="columns"
    :data-source="dataSource"
    :pagination="false"
    @row-click="handleRowClick"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const rowSelection = reactive({
  type: 'check',
  defaultShowIndex: true
})

const dataSource = ref([
  {
    key: '1',
    name: '张明',
    dept: '研发一部',
  },
  {
    key: '2',
    name: '李华',
    dept: '产品部',
  },
  {
    key: '3',
    name: '王强',
    dept: '测试部',
  },
]);

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '部门',
    dataIndex: 'dept',
    key: 'dept',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    action: {
      asText: true,
      maxCollapse: 2,
      items: [
        {
          icon: 'View',
          label: '查看1',
          onClick(record) {
            EMessage({
              message: '点击了按钮[查看1]',
              type: 'success',
            });
          },
        },
        {
          icon: 'View',
          label: '查看2',
          onClick(record) {
            EMessage({
              message: '点击了按钮[查看2]',
              type: 'success',
            });
          },
        },
        {
          icon: 'View',
          label: '查看3',
          onClick(record) {
            EMessage({
              message: '点击了按钮[查看3]',
              type: 'success',
            });
          },
        },
      ],
    },
  },
]);

function handleRowClick(record) {
  EMessage({
    message: `点击了行: ${record.name}`,
    type: 'success',
  });
}
</script>
