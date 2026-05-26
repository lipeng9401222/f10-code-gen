<template>
  <e-table :columns="columns" :data-source="data" @change="onChange" />
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '语文成绩',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: '数学成绩',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: '英语成绩',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: '李四',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: '王五',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: '赵六',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('参数', pagination, filters, sorter, extra);
}
</script>
