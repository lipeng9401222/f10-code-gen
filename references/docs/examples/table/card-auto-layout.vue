<template>
  <e-table class="e-card-demo" :columns="columns" :data-source="data" view-type="card" card-auto-layout />
</template>
<script lang="ts" setup>
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
];

function createData(len: number) {
  const result: any[] = [];
  for (let i = 0; i < len; i++) {
    result.push({
      key: (i + 1).toString(),
      name: `AI大模型产品方案-${i}`,
      date: i % 2 === 0 ? '今天 14:00-15:00' : '明天 14:00-15:00',
      room: `E80${i}`,
      online_id: '123 321 785',
      status: i % 2 === 0 ? '进行中' : '待开始',
    });
  }
  return result;
}

const data = createData(50);
</script>

<style scoped lang="scss">
.e-card-demo {
  height: 400px;
}
</style>
