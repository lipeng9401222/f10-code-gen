<template>
  <e-table
    class="e-card-demo"
    :columns="columns"
    :data-source="data"
    :row-selection="rowSelection"
    view-type="card"
    card-auto-layout
  >
    <template #bodyRow="{ record, selectionNode, actionNode }">
      <e-card class="card-item" :key="record.key">
        <template #header>
          <div class="card-header">
            <e-avatar shape="square" :size="50" :src="record.avatar" />
            <div>
              <component class="card-selection" v-if="selectionNode" :is="selectionNode" />
              <e-tag :type="record.status === '进行中' ? 'success' : 'warning'">{{ record.status }}</e-tag>
              <component v-if="actionNode" :is="actionNode" />
            </div>
          </div>
        </template>
        <p>{{ record.name }}</p>
        <span>{{ record.date }}</span>
        <div class="room-info">
          <span>会议室： {{ record.room }}</span>
          <e-divider direction="vertical" />
          <span>线上： {{ record.online_id }}</span>
        </div>
        <e-avatar-group class="avatar-list" :avatar-list="record.personal" :max-count="3" />
      </e-card>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

// 多选表格行选择配置（用于测试）
const rowSelection = reactive({
  type: 'checkbox',
  selectedRowKeys: ['1', '2'] as string[],
  onChange: (selectedRowKeys: string[]) => {
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
    title: '参会人员',
    key: 'avatarList',
    dataIndex: 'avatarList',
    width: 180,
  },
  {
    title: '操作',
    key: 'action',
    width: 180,
    action: {
      asText: () => false,
      maxCollapse: () => 1,
      type: () => 'default',
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

function createData(len: number) {
  const result: any[] = [];
  for (let i = 0; i < len; i++) {
    result.push({
      key: (i + 1).toString(),
      name: `AI大模型产品方案汇报-${i}`,
      date: i % 2 === 0 ? '今天 14:00-15:00' : '明天 14:00-15:00',
      room: `E80${i}`,
      online_id: '123 321 785',
      status: i % 2 === 0 ? '进行中' : '待开始',
      avatar: 'https://picsum.photos/200/200/?random=' + i,
      personal: [
        { src: 'https://picsum.photos/200/200/?random=1', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=2', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=3', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=4', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=5', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=6', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=7', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=8', alt: '用户头像' },
      ],
    });
  }
  return result;
}

const data = createData(20);
</script>

<style scoped lang="scss">
.e-card-demo {
  margin-top: 20px;
  height:400px;

  .card-item {
    padding: var(--e-space-xl);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .card-more {
        height: 24px;
        outline: none !important;
        margin-left: 12px;
      }
      :deep(.card-selection) {
        height: 24px;
      }
    }
    p {
      margin: 12px 0;
    }

    .room-info {
      span {
        font-size: 14px;
        color: var(--e-text-color-secondary);
      }
    }

    .avatar-list {
      margin-top: 16px;
    }
  }
}
</style>
