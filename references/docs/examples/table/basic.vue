<template>
  <e-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <e-button link>
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
import { ArrowDown } from '@epoint-fe/eui-icons';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
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
    width: 180,
  },
  {
    title: '嵌套结构',
    dataIndex: ['nested', 'sub', 'name'],
  },
  {
    title: '操作',
    key: 'action',
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京市朝阳区',
    nested: { sub: { name: '子项1' } },
    tags: ['优秀', '工程师'],
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海市浦东新区',
    nested: { sub: { name: '子项2' } },
    tags: ['待改进'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '广州市天河区',
    nested: { sub: { name: '子项3' } },
    tags: ['资深', '讲师'],
  },
];
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>
