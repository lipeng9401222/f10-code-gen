<template>
  <e-button type="primary" @click="getChanges">获取编辑数据</e-button>
  <e-button type="primary" @click="reject">还原编辑数据</e-button>

  <e-table ref="tableRef" :columns="columns" :data-source="data" @edit-cell-change="onCellChange">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tags'">{{ record.tags.join(', ') }} </template>
    </template>
  </e-table>
</template>
<script setup>
import { ref, h } from 'vue';
import { EInput, ESelect } from '@eui-components/components';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    editor: {
      component: (props) => h(EInput, props),
      props: {
        placeholder: '请输入名称',
      },
    },
    rules: [
      { type: 'string', required: true, message: '姓名不能为空' },
      { type: 'string', min: 2, message: '姓名最少2个字符' },
    ],
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 180,
    editor: {
      component: 'e-date-picker',
      props: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请选择日期',
      },
    },
  },
  {
    title: '颜色',
    dataIndex: 'color',
    key: 'color',
    width: 150,
    editor: {
      component: 'e-color-picker',
    },
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    width: 240,
    editor: {
      component: (props) => h(ESelect, props),
      props: {
        multiple: true,
        options: [
          { label: '标签1', value: '标签1' },
          { label: '标签2', value: '标签2' },
        ],
      },
    },
  },
];

const tableRef = ref();

function createRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createData(length = 20) {
  const data = [];
  for (let i = 1; i <= length; i++) {
    data.push({
      key: i.toString(),
      name: `产品${i}`,
      date: `2025-04-02`,
      color: createRandomColor(),
      tags: ['标签1', '标签2'],
    });
  }
  return data;
}

const data = ref(createData());

const reject = () => {
  tableRef.value?.reject();
};

const getChanges = () => {
  const modified = tableRef.value?.getChanges();
  console.log('modified', modified);
};

const onCellChange = (changed) => {
  console.log('cell changes', changed);
};
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>
