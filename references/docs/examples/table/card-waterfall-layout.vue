<template>
  <e-table
    class="e-card-demo"
    :columns="columns"
    :data-source="data"
    :row-selection="rowSelection"
    :view-type="viewType"
    card-auto-layout
    card-waterfall
  />
</template>
<script setup>
import { reactive, ref } from 'vue';

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
    filters: [
      {
        text: 'E800',
        value: 'E800',
      },
      {
        text: 'E801',
        value: 'E801',
      },
    ],
    onFilter: (value, record) => record.room === value,
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
    sorter: (a, b) => a.online_id - b.online_id,
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: 160,
  },
  {
    title: '内容',
    key: 'content',
    dataIndex: 'content',
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
      online_id: 100 + i,
      status: i % 2 === 0 ? '进行中' : '待开始',
      content: randomString(5, 100),
    });
  }
  return result;
}

function randomString(min, max) {
  const chars = '啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎';
  let result = '';
  const len = Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const data = createData(20);
</script>

<style lang="scss" scoped>
.e-card-demo {
  height: 400px;
}
</style>
