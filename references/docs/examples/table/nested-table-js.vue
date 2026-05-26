<template>
  <e-table :columns="columns" :data-source="data" :row-expandable="() => true" class="components-table-demo-nested">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <e-button link type="primary">发布</e-button>
      </template>
    </template>
    <template #expandedRowRender>
      <e-table :columns="innerColumns" :data-source="innerData" :pagination="false">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'state'">
            <span>
              <e-badge status="success" />
              已完成
            </span>
          </template>
          <template v-else-if="column.key === 'operation'">
            <span class="table-operation">
              <e-button link type="primary">暂停</e-button>
              <e-button link type="primary">停止</e-button>
              <e-dropdown>
                <template #dropdown>
                  <e-dropdown-menu>
                    <e-dropdown-item>操作 1</e-dropdown-item>
                    <e-dropdown-item>操作 2</e-dropdown-item>
                  </e-dropdown-menu>
                </template>
                <e-button link type="primary">
                  更多
                  <e-icon class="e-icon--right">
                    <arrow-down />
                  </e-icon>
                </e-button>
              </e-dropdown>
            </span>
          </template>
        </template>
      </e-table>
    </template>
  </e-table>
</template>
<script setup>
import { ArrowDown } from '@epoint-fe/eui-icons';
const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '平台', dataIndex: 'platform', key: 'platform' },
  { title: '版本', dataIndex: 'version', key: 'version' },
  { title: '升级次数', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: '创建者', dataIndex: 'creator', key: 'creator' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', key: 'operation' },
];

const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: `屏幕 ${i + 1}`,
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: '张三',
    createdAt: '2014-12-24 23:12:00',
  });
}

const innerColumns = [
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '状态', key: 'state' },
  { title: '升级状态', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    name: `这是产品名称 ${i + 1}`,
    upgradeNum: '已升级: 56',
  });
}
</script>

<style scoped>
.e-dropdown {
  margin-left: 12px;
  vertical-align: middle;
}
</style>
