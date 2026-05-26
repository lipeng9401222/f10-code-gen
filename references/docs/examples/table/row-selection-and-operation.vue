<template>
  <div>
    <div style="margin-bottom: 16px">
      <e-button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="start">
        重新加载
      </e-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `已选择 ${state.selectedRowKeys.length} 项` }}
        </template>
      </span>
    </div>
    <e-table :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :columns="columns"
      :data-source="data" />
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';

type Key = string | number;

interface DataType {
  key: Key;
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

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const start = () => {
  state.loading = true;
  // ajax request after empty completing
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};
const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('选中的行发生变化：', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
</script>
