<template>
  <div class="checker-column-with-index-demos">
    <div class="control-panel">
      <e-switch v-model="defaultShowIndex" active-text="显示序号" inactive-text="常规显示" />
      <e-switch v-model="multiple" active-text="多选" inactive-text="单选" />
    </div>
    <e-table
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';

const defaultShowIndex = ref(true);
const multiple = ref(true);

const rowSelection = reactive({
  // columnWidth: 52,
  type: multiple.value ? 'check' : 'radio',
  selectedRowKeys: ['2'] as string[],
  onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
    console.log(`选中的行键值: ${selectedRowKeys}`, '选中的行数据: ', selectedRows);
    rowSelection.selectedRowKeys = selectedRowKeys;
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === '禁用用户', // 配置不可选中的列
    name: record.name,
  }),
  defaultShowIndex: defaultShowIndex.value, // 默认显示序号
  // 自定义序号格式 可选
  indexFormatter: (index: number, paginationInfo) => {
    if (!paginationInfo || !paginationInfo.pageSize) {
      return `#${index + 1}`;
    }
    return `#${paginationInfo.pageSize * (paginationInfo.current - 1) + index + 1}`;
  },
});

watch(defaultShowIndex, () => {
  rowSelection.defaultShowIndex = defaultShowIndex.value;
});

watch(multiple, () => {
  rowSelection.type = multiple.value ? 'check' : 'radio';
});

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width:800,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width:800,
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 800,
  },
];

const data = ref<DataType[]>([]);

const current = ref(1);
const pageSize = ref(5);
const pagination = reactive({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
});

const loading = ref(false);

const queryData = (params) => {
  // 模拟表格数据
  return new Promise((resolve) => {
    setTimeout(() => {
      const { current, pageSize } = params;
      let i = 0;
      const data: DataType[] = [];
      while (++i < pageSize) {
        data.push({
          key: `${pageSize * (current - 1) + i}`,
          name: `用户 ${current}-${i}`,
          age: Math.floor(Math.random() * 40 + 20),
          address: '北京第一公园',
        });
      }
      data.push({
        key: `${pageSize * (current - 1) + i}`,
        name: '禁用用户',
        age: 33,
        address: '北京第一公园',
      });
      resolve({
        results: data,
      });
    }, (Math.random() * 1000 + 20) >>> 0);
  });
};

const getData = () => {
  loading.value = true;
  queryData(pagination)
    .then((res) => {
      // @ts-ignore
      data.value = res.results;
      loading.value = false;
      console.log(pagination, current.value, pageSize.value);
    })
    .catch((err) => {
      loading.value = false;
    });
};
const handleTableChange = (pager: { pageSize: number; current: number }) => {
  console.log('表格变化', pager);
  pagination.pageSize = pager.pageSize;
  pagination.current = pager.current;

  getData();
};

getData();
</script>

<style lang="scss" scoped>
.control-panel {
  display: flex;
  gap: 20px;
}
</style>
