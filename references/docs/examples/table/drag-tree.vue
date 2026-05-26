<template>
  <e-table v-model:columns="columns" v-model:data-source="data" :drag="drag" />
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
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
    width: '12%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
]);

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
  children?: DataItem[];
}

const data = ref<DataItem[]>([
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
]);

const drag = {
  allowRowDrag: true,
  // 监听拖拽变化后
  onChange: (dragRow: any, dragStartPathList: number[], dropPathList: number[]) => {
    EMessage({
      type: 'info',
      message: `拖拽目标: ${dragRow.name} | 拖拽路径: ${JSON.stringify(dragStartPathList)} | 放置路径: ${JSON.stringify(
        dropPathList
      )}`,
    });
  },
  rowDropInToItem: true,
};
</script>
