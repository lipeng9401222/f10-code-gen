<template>
  <div>
    <e-button
      v-for="(item, index) in columns"
      :key="index"
      :type="item.hidden ? 'default' : 'primary'"
      @click="changeVisible(item)"
      >{{ item.title }}</e-button
    >
  </div>
  <br />
  <e-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <e-button link type="primary">操作</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const columns = ref([
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', hidden: false },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', hidden: false },
  { title: '列 1', dataIndex: 'address', key: '1', hidden: false },
  { title: '列 2', dataIndex: 'address', key: '2', hidden: false },
  { title: '列 3', dataIndex: 'address', key: '3', hidden: false },
  { title: '列 4', dataIndex: 'address', key: '4', hidden: false },
  {
    title: '操作',
    key: 'operation',
    hidden: false,
    width: 100,
  },
]);

const changeVisible = (item) => {
  item.hidden = !item.hidden;
};

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '张家港公园',
  },
  {
    key: '2',
    name: '李四',
    age: 40,
    address: '张家港公园',
  },
];
</script>
