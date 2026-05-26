<template>
  <e-table :row-selection="rowSelection" :columns="columns" :data-source="data" />
</template>
<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { ETable } from '@epoint-fe/eui-components';

interface DataType {
  key: string | number;
  name: string;
  age: number;
  address: string;
}

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

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `张三 ${i}`,
    age: 32,
    address: `张家港第一公园 ${i}号`,
  });
}

const selectedRowKeys = ref<DataType['key'][]>([]); // Check here to configure the default column

const onSelectChange = (changableRowKeys: string[]) => {
  console.log('选中的行发生变化：', changableRowKeys);
  selectedRowKeys.value = changableRowKeys;
};

const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      ETable.SELECTION_ALL,
      ETable.SELECTION_INVERT,
      ETable.SELECTION_NONE,
      {
        key: 'odd',
        text: '选择奇数行',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          selectedRowKeys.value = newSelectedRowKeys;
        },
      },
      {
        key: 'even',
        text: '选择偶数行',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          selectedRowKeys.value = newSelectedRowKeys;
        },
      },
    ],
  };
});
</script>
