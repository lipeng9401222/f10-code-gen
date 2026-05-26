<template>
  <e-table :columns="columns" :data-source="data" :pagination="false" borderStyle="full">
    <template #summary>
      <e-table-summary-row>
        <e-table-summary-cell>总计</e-table-summary-cell>
        <e-table-summary-cell>
          <e-text type="danger">{{ totals.totalBorrow }}</e-text>
        </e-table-summary-cell>
        <e-table-summary-cell>
          <e-text>{{ totals.totalRepayment }}</e-text>
        </e-table-summary-cell>
      </e-table-summary-row>
      <e-table-summary-row>
        <e-table-summary-cell>余额</e-table-summary-cell>
        <e-table-summary-cell :col-span="2">
          <e-text type="danger">
            {{ totals.totalBorrow - totals.totalRepayment }}
          </e-text>
        </e-table-summary-cell>
      </e-table-summary-row>
    </template>
  </e-table>
  <br />
  <e-table :columns="fixedColumns" :data-source="fixedData" :pagination="false" :scroll="{ x: 2000, y: 500 }" borderStyle="full">
    <template #summary>
      <e-table-summary fixed>
        <e-table-summary-row>
          <e-table-summary-cell :index="0">汇总</e-table-summary-cell>
          <e-table-summary-cell :index="1">这是汇总内容</e-table-summary-cell>
        </e-table-summary-row>
      </e-table-summary>
    </template>
  </e-table>
</template>

<script setup>
import { computed, ref } from 'vue';

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '借款',
    dataIndex: 'borrow',
  },
  {
    title: '还款',
    dataIndex: 'repayment',
  },
]);

const data = ref([
  {
    key: '1',
    name: '张三',
    borrow: 10,
    repayment: 33,
  },
  {
    key: '2',
    name: '李四',
    borrow: 100,
    repayment: 0,
  },
  {
    key: '3',
    name: '王五',
    borrow: 10,
    repayment: 10,
  },
  {
    key: '4',
    name: '赵六',
    borrow: 75,
    repayment: 45,
  },
]);

const fixedColumns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    fixed: true,
    width: 100,
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
]);

const fixedData = ref([]);
for (let i = 0; i < 20; i += 1) {
  fixedData.value.push({
    key: i,
    name: ['光明', '竹子', '小不点'][i % 3],
    description: '万物有始必有终。',
  });
}

const totals = computed(() => {
  let totalBorrow = 0;
  let totalRepayment = 0;

  data.value.forEach(({ borrow, repayment }) => {
    totalBorrow += borrow;
    totalRepayment += repayment;
  });
  return { totalBorrow, totalRepayment };
});
</script>

<style scoped>
.e-table tfoot th,
.e-table tfoot td {
  background: #fafafa;
}

html.dark .e-table tfoot th,
html.dark .e-table tfoot td {
  background: #1d1d1d;
}
</style>
