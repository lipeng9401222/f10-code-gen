<template>
  <div>
    <e-radio-group v-model="borderStyle" label="边框控制">
      <e-radio-button value="none">无边框</e-radio-button>
      <e-radio-button value="horizontal">行边框</e-radio-button>
      <e-radio-button value="full">全边框</e-radio-button>
    </e-radio-group>
  </div>
  <br />
  <e-table :columns="columns" :data-source="data" :borderStyle="borderStyle">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link>{{ text }}</e-button>
      </template>
    </template>
    <template #title>表头</template>
    <template #footer>表尾</template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

type BorderStyle = boolean | 'none' | 'horizontal' | 'full';
const borderStyle = ref<BorderStyle>('full');

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '现金资产',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    money: '￥300,000.00',
    address: '北京市朝阳区第一公园',
  },
  {
    key: '2',
    name: '李四',
    money: '￥1,256,000.00',
    address: '上海市浦东新区第一公园',
  },
  {
    key: '3',
    name: '王五',
    money: '￥120,000.00',
    address: '广州市天河区第一公园',
  },
];
</script>
<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
