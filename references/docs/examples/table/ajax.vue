<template>
  <e-table :columns="columns" :row-key="record => record.login.uuid" :data-source="dataSource" :pagination="pagination"
    :loading="loading" @change="handleTableChange">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import type { TableProps } from '@epoint-fe/eui-components';
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

type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};
type APIResult = {
  results: {
    gender: 'female' | 'male';
    name: string;
    email: string;
  }[];
};

const queryData = (params: APIParams) => {
  return axios.get<APIResult>('https://randomuser.me/api?noinfo', { params });
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

const getData = (params?: any) => {
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
const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
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
