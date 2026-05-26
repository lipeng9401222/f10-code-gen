<template>
  <e-button-group>
    <e-button
      v-for="type in types"
      :key="type"
      @click="viewType = type"
      :type="viewType === type ? 'primary' : 'default'"
      >{{ type }}</e-button
    >
  </e-button-group>

  <e-table
    class="e-card-demo"
    :columns="columns"
    :data-source="data"
    :row-selection="rowSelection"
    :view-type="viewType"
  >
  </e-table>
</template>
<script setup>
import { reactive, ref } from 'vue';

const types = ['table', 'card'];

const viewType = ref('card');

// 多选表格行选择配置（用于测试）
const rowSelection = reactive({
  type: 'checkbox',
  selectedRowKeys: ['1', '2'],
  onChange: (selectedRowKeys) => {
    rowSelection.selectedRowKeys = selectedRowKeys;
  },
});

const columns = [
  {
    title: '会议名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '会议时间',
    dataIndex: 'date',
    key: 'date',
    width: 280,
  },
  {
    title: '会议室',
    dataIndex: 'room',
    key: 'room',
    width: 180,
  },
  {
    title: '线上ID',
    key: 'online_id',
    dataIndex: 'online_id',
    width: 200,
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: 160,
  },

  {
    title: '操作',
    key: 'action',
    width: 180,
    action: {
      asText: () => viewType.value !== 'card',
      maxCollapse: () => (viewType.value === 'card' ? 1 : 3),
      type: () => (viewType.value === 'card' ? 'default' : 'primary'),
      items: [
        {
          label: '分享',
          onClick: (record) => {
            console.log('分享', record);
          },
        },
        {
          label: '编辑',
          onClick: (record) => {
            console.log('编辑', record);
          },
        },
        {
          label: '设置',
          onClick: (record) => {
            console.log('设置', record);
          },
        },
        {
          label: '删除',
          type: 'danger',
          onClick: (record) => {
            console.log('删除', record);
          },
        },
      ],
    },
  },
];

function createData(len) {
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push({
      key: (i + 1).toString(),
      name: `AI大模型产品方案汇报-${i}`,
      date: i % 2 === 0 ? '今天 14:00-15:00' : '明天 14:00-15:00',
      room: `E80${i}`,
      online_id: '123 321 785',
      status: i % 2 === 0 ? '进行中' : '待开始',
    });
  }
  return result;
}

const data = createData(20);
</script>

<style lang="scss" scoped>
.e-card-demo {
  margin-top: 16px;
}
</style>
