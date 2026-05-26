<template>
  <div>
    <e-button type="primary" @click="addRow">添加行</e-button>
    <e-button type="primary" @click="getChanges">获取编辑数据</e-button>
  </div>
  <br />
  <e-table ref="tableRef" :columns="columns" :data-source="data" @edit-row-change="onRowChange">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tags'">
        <span>
          <e-tag v-for="tag in record.tags" :key="tag">
            {{ tag }}
          </e-tag>
        </span>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Delete, Edit, Save, Rollback } from '@epoint-fe/eui-icons';

const tableRef = ref();

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 130,
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
    width: 170,
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
    width: 120,
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
      component: 'e-select',
      props: {
        multiple: true,
        options: [
          { label: '标签1', value: '标签1' },
          { label: '标签2', value: '标签2' },
        ],
      },
      rules: [{ required: true, message: '标签不能为空' }],
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
          label: '提交',
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
      tags: ['标签1', '标签2'],
    });
  }
  return data;
}

const data = ref(createData());

const addRow = () => {
  tableRef.value?.addRow({
    record: {
      name: '',
      date: '',
      color: '',
      tags: [],
    },
    position: 'top',
    editable: true,
  });
};

const getChanges = () => {
  const edited = tableRef.value?.getChanges();
  console.log('edited', edited);
};

const onRowChange = (record, oldRecord) => {
  console.log('row changes', record, oldRecord);
};
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>
