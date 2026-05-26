<template>
  <e-table :columns="columns" :row-key="record => record.login.uuid" :data-source="dataSource" :pagination="pagination"
    :loading="loading" @change="handleTableChange">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
    </template>
  </e-table>
</template>
<script setup>
import { computed, ref, reactive } from 'vue';
import axios from 'axios';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    // filters: [
    //   { text: '男', value: 'male' },
    //   { text: '女', value: 'female' },
    // ],
    width: '20%',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
];

const queryData = (params) => {
  return axios.get('https://randomuser.me/api?noinfo', { params });
};

const current = ref(1)
const pageSize = ref(10)
const dataSource = ref([])
const pagination = reactive({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
});
const loading = ref(false);

const getData = (params) => {
  loading.value = true;
  queryData({
    results: pagination.pageSize,
    page: pagination.current,
    ...params
  }).then((res) => {
    dataSource.value = res.data.results;
    loading.value = false;

    console.log(res)
  }).catch((err) => {
    loading.value = false;
  });
}
const handleTableChange = (
  pag,
  filters,
  sorter,
) => {
  pagination.pageSize = pag.pageSize;
  pagination.current = pag.current;

  getData({
    sortField: sorter.field,
    sortOrder: sorter.order
  })
};

getData()
</script>
