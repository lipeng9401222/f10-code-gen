<template>
  <div style="margin-bottom: 16px">
    <e-switch v-model="ellipsisEnabled" />
    <span style="margin-left: 8px">{{ ellipsisEnabled ? '开启省略' : '关闭省略' }}</span>
  </div>
  <e-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link>{{ text }}</e-button>
      </template>
    </template>
  </e-table>
</template>
<script setup>
import { ref, computed } from 'vue';

const ellipsisEnabled = ref(true);

const baseColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 80,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address 1',
  },
  {
    title: '长文本列',
    dataIndex: 'address',
    key: 'address 2',
  },
  {
    title: '长文本列',
    dataIndex: 'address',
    key: 'address 3',
  },
  {
    title: '长文本列',
    dataIndex: 'address',
    key: 'address 4',
  },
];

const columns = computed(() => {
  return baseColumns.map((column) => {
    if (column.dataIndex === 'address') {
      return {
        ...column,
        ellipsis: ellipsisEnabled.value,
        customCell: ellipsisEnabled.value
          ? undefined
          : () => ({
              style: {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              },
            }),
      };
    }
    return column;
  });
});

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京市朝阳区第一公园，北京市朝阳区第一公园',
    tags: ['优秀', '开发'],
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海市浦东新区第二公园，上海市浦东新区第二公园',
    tags: ['新手'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '广州市天河区第一公园，广州市天河区第一公园',
    tags: ['优秀', '教师'],
  },
];
</script>
