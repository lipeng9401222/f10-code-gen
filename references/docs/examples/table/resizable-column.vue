<template>
  <e-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <e-button link type="primary">
          {{ record.name }}
        </e-button>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <e-tag
            v-for="tag in record.tags"
            :key="tag"
            :type="tag === '待改进' ? 'danger' : tag.length > 5 ? '' : 'success'"
          >
            {{ tag.toUpperCase() }}
          </e-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <e-button link type="primary">邀请 一 {{ record.name }}</e-button>
          <e-divider direction="vertical" />
          <e-button link type="primary">删除</e-button>
          <e-divider direction="vertical" />
          <e-button link type="primary">
            更多操作
            <e-icon>
              <ArrowDown />
            </e-icon>
          </e-button>
        </span>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ArrowDown } from '@epoint-fe/eui-icons';

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
    tags: ['优秀', '开发'],
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
    tags: ['待改进'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
    tags: ['优秀', '教师'],
  },
];

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    resizable: true,
    width: 120,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    resizable: true,
    width: 40,
    minWidth: 40,
    maxWidth: 160,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    width: 170,
  },
  {
    title: '操作',
    key: 'action',
  },
]);
function handleResizeColumn(w, col) {
  col.width = w;
}
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>
