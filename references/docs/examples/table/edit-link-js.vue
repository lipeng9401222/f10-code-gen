<template>
  <e-table
    ref="tableRef"
    :columns="columns"
    :data-source="data"
    :before-edit="onBeforeEdit"
    :cell-editable="true"
    @edit-cell-change="onCellChange"
  />
</template>
<script setup>
import { nextTick, ref } from 'vue';
import { Edit, Save, Rollback } from '@epoint-fe/eui-icons';

const tableRef = ref();

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 200,
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
    title: '部门',
    dataIndex: 'dept_name',
    key: 'dept_name',
    width: 200,
    editor: {
      component: 'e-select',
      props: {
        options: [
          { label: '财务部', value: '1' },
          { label: '人事部', value: '2' },
          { label: '研发部', value: '3' },
        ],
      },
    },
  },
  {
    title: '职务',
    dataIndex: 'position_name',
    key: 'position_name',
    width: 200,
    editor: {
      component: 'e-select',
    },
  },
  {
    title: '操作',
    key: 'action',
    action: {
      asText: true,
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
      ],
    },
  },
];

const data = ref([
  {
    key: '1',
    name: '张三',
    dept_name: '研发部',
    position_name: '工程师',
  },
  {
    key: '2',
    name: '李四',
    dept_name: '人事部',
    position_name: '招聘专员',
  },
  {
    key: '3',
    name: '王五',
    dept_name: '财务部',
    position_name: '财务总监',
  },
]);

const getOptions = (name) => {
  let options = [];

  if (name === '人事部') {
    options = [
      { label: '招聘专员', value: '招聘专员' },
      { label: '人事主管', value: '人事主管' },
      { label: '人事经理', value: '人事经理' },
    ];
  } else if (name === '研发部') {
    options = [
      { label: '工程师', value: '工程师' },
      { label: '高级工程师', value: '高级工程师' },
      { label: '研发经理', value: '研发经理' },
    ];
  } else if (name === '财务部') {
    options = [
      { label: '会计', value: '会计' },
      { label: '出纳', value: '出纳' },
      { label: '财务总监', value: '财务总监' },
    ];
  }

  return options;
};

const onBeforeEdit = (params) => {
  const { record } = params;

  const positionEditor = tableRef.value?.getCellEditor(record, 'position_name');
  const deptEditor = tableRef.value?.getCellEditor(record, 'dept_name');

  positionEditor.updateEditProps({
    options: getOptions(deptEditor.getEditValue()),
  });
};

// editStatus 用于处理取消行编辑后联动编辑再次打开的问题
let editStatus = {};

const onCellChange = (params) => {
  const { record, column, value } = params;
  if (column.dataIndex === 'dept_name') {
    const positionEditor = tableRef.value?.getCellEditor(record, 'position_name');

    const key = record.key + '-position_name';

    if (!editStatus[key]) {
      positionEditor.beginEditCell();
      nextTick(() => {
        positionEditor.setEditValue('');
      });
      editStatus[key] = true;
    } else {
      positionEditor.updateEditProps({
        options: getOptions(value),
      });
      positionEditor.setEditValue('');
      editStatus[key] = positionEditor.isEditing;
    }
  }
};
</script>
