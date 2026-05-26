<template>
  <div>
    <e-button type="primary" @click="beginEdit">编辑全部</e-button>
    <e-button type="primary" @click="cancelEdit">取消编辑</e-button>
    <e-button type="primary" @click="commitEdit">提交编辑</e-button>
    <e-button type="primary" @click="acceptEdit">接受编辑</e-button>
    <e-button type="primary" @click="getChanges">获取编辑数据</e-button>
    <e-button type="primary" @click="reject">重置编辑</e-button>
  </div>
  <br />
  <e-table ref="tableRef" :columns="columns" :data-source="data" @edit-change="onEditChange" @change="onChange">
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
import { onMounted, ref, nextTick } from 'vue';
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

const getChanges = () => {
  const edited = tableRef.value?.getChanges();
  console.log('edited', edited);
};

const beginEdit = () => {
  tableRef.value?.beginEdit();
};

const commitEdit = () => {
  tableRef.value?.commitEdit();
};

const cancelEdit = () => {
  tableRef.value?.cancelEdit();
};

const acceptEdit = () => {
  tableRef.value?.accept();
};

const reject = () => {
  tableRef.value?.reject();
};

const onEditChange = (value, oldValue) => {
  console.log('edit changes', value, oldValue);
};

const onChange = () => {
  nextTick(() => {
    tableRef.value?.beginEdit();
  });
};

onMounted(() => {
  // 进入页面后自动开启编辑全部行
  tableRef.value?.beginEdit();
});
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>
