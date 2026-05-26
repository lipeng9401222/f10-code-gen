<template>
  <e-table ref="tableRef" :columns="columns" :data-source="data" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Delete, Edit, Save, Rollback, Setting } from '@epoint-fe/eui-icons';

const tableRef = ref();

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    editor: {
      component: 'e-input',
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
    title: '嵌套结构',
    dataIndex: ['nested', 'sub', 'name'],
    width: 150,
    editor: {
      component: 'e-input',
    },
  },
  {
    title: '评分',
    dataIndex: 'score',
    key: 'score',
    width: 150,
    editor: {
      component: 'e-input-number',
      props: {
        max: 100,
      },
    },
  },
  {
    title: '操作',
    key: 'action',
    action: {
      items: [
        {
          icon: Edit,
          label: '编辑',
          visible: (params) => !params.isRowEditing,
          onClick(record) {
            tableRef.value?.beginEditRow(record);
          },
        },
        {
          icon: Save,
          label: '保存',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.commitEditRow(record);
          },
        },
        {
          icon: Rollback,
          label: '取消',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.cancelEditRow(record);
          },
        },
        {
          icon: Delete,
          label: '删除',
          onClick(record) {
            tableRef.value?.deleteRow(record);
          },
        },
        {
          icon: Setting,
          label: '设置',
          onClick(record) {
            console.log(record);
          },
        },
      ],
    },
  },
];

function createRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createData(length: number = 20) {
  const data = [] as Array<any>;
  for (let i = 1; i <= length; i++) {
    data.push({
      key: i.toString(),
      name: `产品${i}`,
      date: `2025-04-02`,
      color: createRandomColor(),
      tags: ['标签1', '标签2', '标签3'],
      nested: { sub: { name: `子项${i}` } },
      score: Math.floor(Math.random() * 100),
    });
  }
  return data;
}

const data = createData();
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}

.mb-10 {
  margin-bottom: 10px;
}
</style>
