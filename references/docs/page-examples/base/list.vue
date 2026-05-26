<template>
  <ep-layout-manager class="fui-page" v-loading="model.global.state.loading">
    <template #top>
      <e-toolbar title-block>
        <template #title>
          <e-toolbar-title title="标段（包）管理"></e-toolbar-title>
        </template>
        <template #button>
          <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="4" config-id="toolbar-btns" />
        </template>
        <template #actions>
          <!-- help-url 必须填写有效的帮助文档URL，否则帮助按钮不会显示 -->
          <e-toolbar-more :table-ref="tableRef" :model="model" help-url="http://192.168.219.170/docs/vue/latest/frame/components/eui-core/e-toolbar/">
            <template #tip-content>
              <p>帮助提示内容示例：此处可填写页面操作说明</p>
            </template>
          </e-toolbar-more>
        </template>
        <template #filter="{ opened }">
          <e-toolbar-search
            ref="toolbarSearchRef"
            :search-list="searchList"
            :is-open="opened"
            @advance-search="onAdvanceSearch"
            configurable
            config-id="toolbar-search"
          />
        </template>
      </e-toolbar>
    </template>

    <template #main>
      <div class="h-full pb-xl bg-white">
        <ep-data-grid
          ref="tableRef"
          :id-field="model.gridList.idField"
          :data="model.gridList.data"
          :total="model.gridList.total"
          :current="model.gridList.current"
          :page-size="model.gridList.pageSize"
          :columns="columnList"
          :loading="model.gridList.loading"
          v-model:selectedRowKeys="model.selectedRowKeys"
          :show-index-column="true"
          :show-selection-column="true"
          :default-show-index="true"
          @change="model.gridList.change"
          @refresh="model.gridList.refresh"
          configurable
          config-id="datagrid"
          :key="tableKey"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'reviewState'">
              <e-tag :type="reviewStateData[text - 1]?.cls" round>{{ reviewStateData[text - 1]?.text }}</e-tag>
            </template>
            <template v-if="column.dataIndex === 'classification'">
              {{ text === 1 ? '设计' : text === 2 ? '施工' : '-' }}
            </template>
            <template v-if="column.dataIndex === 'releaseState'">
              <e-tag :type="text === 1 ? 'success' : 'info'">{{ text === 1 ? '已发布' : '未发布' }}</e-tag>
            </template>
          </template>
        </ep-data-grid>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, computed, onMounted, onActivated, h, defineAsyncComponent, getCurrentInstance } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

defineOptions({
  name: 'PageExamplesDefineDataModelList'
});

const { proxy } = getCurrentInstance();
const { useTableModel, useListModel } = Hooks;
const { createSubModel, PageConfig, request } = Utils;

// 页面配置模型
const pageConfig = new PageConfig({});

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const selectedRowKeys = ref([]);

  const searchParams = createSubModel(
    {
      logicOperator: 'and',
      conditions: []
    },
    {
      update: (params) => {
        searchParams.data.conditions = params.conditions;
        searchParams.data.logicOperator = params.logicOperator;
      }
    }
  );

  const reviewStateList = useListModel('/api/page-examples/reviewStateOptions', {
    labelField: 'label',
    lazy: false
  });

  const classificationList = useListModel('/api/page-examples/classificationOptions', {
    labelField: 'label',
    lazy: false
  });

  const gridList = useTableModel('/api/page-examples/list', {
    idField: 'id',
    lazy: false,
    params: computed(() => ({
      ...searchParams.data
    }))
  });

  return {
    global: { pageConfig },
    models: {
      searchParams,
      reviewStateList,
      classificationList,
      selectedRowKeys,
      gridList
    }
  };
});

// 工具栏按钮
const isSelected = computed(() => model.selectedRowKeys.length > 0);
const toolbarBtnsRef = ref(null);
const toolbarBtnList = ref([
  {
    type: 'primary',
    onClick: () => openAddDialog('新增标段（包）'),
    content: '新增'
  },
  {
    type: 'danger',
    onClick: () => handleBatchDelete(),
    disabled: () => !isSelected.value,
    content: '批量删除'
  }
]);

// 搜索配置
const toolbarSearchRef = ref(null);
const operationsList = ref([
  { label: '等于', type: 'input', value: 'EQ' },
  { label: '不等于', type: 'input', value: 'NQ' },
  { label: '等于空', type: 'none', value: 'EQBLANK' },
  { label: '不等于空', type: 'none', value: 'NQBLANK' },
  { label: '模糊匹配', type: 'input', value: 'LIKE' },
  { label: '模糊匹配（排除）', type: 'input', value: 'NOTLIKE' },
  { label: '以...开头', type: 'input', value: 'LEFTLIKE' },
  { label: '以...结尾', type: 'input', value: 'RIGHTLIKE' },
  { label: '包含', type: 'multiSelect', value: 'IN' },
  { label: '不包含', type: 'multiSelect', value: 'NOTIN' }
]);

const searchList = computed(() => [
  {
    label: '全部',
    field: 'searchField',
    fieldType: 'string',
    type: 'mixSearch',
    default: true,
    operation: 'LIKE',
    operations: operationsList.value,
    data: [
      { label: '标段编号', value: 'sectionCode' },
      { label: '采购项目名称', value: 'procurementName' }
    ]
  },
  {
    label: '标段编号',
    field: 'sectionCode',
    default: true,
    type: 'input',
    operation: 'LIKE',
    operations: operationsList.value
  },
  {
    label: '审核状态',
    field: 'reviewState',
    type: 'select',
    default: true,
    operation: 'EQ',
    operations: operationsList.value,
    data: model.reviewStateList.data,
    labelField: 'label',
    valueField: 'value'
  },
  {
    label: '分类',
    field: 'classification',
    type: 'select',
    default: false,
    operation: 'EQ',
    operations: operationsList.value,
    data: model.classificationList.data,
    labelField: 'label',
    valueField: 'value'
  }
]);

const onAdvanceSearch = (params) => {
  model.searchParams.update(params);
};

// 审核状态映射
const reviewStateData = [
  { cls: 'danger', text: '审核不通过' },
  { cls: 'warning', text: '待审核' },
  { cls: 'success', text: '审核通过' },
  { cls: '', text: '编辑中' }
];

// 表格列配置
const tableKey = ref(0);
const tableRef = ref(null);
const columnList = ref([
  {
    title: '标段(包)编号',
    dataIndex: 'sectionCode',
    width: 180,
    ellipsis: true,
    sorter: true
  },
  {
    title: '采购项目名称',
    dataIndex: 'procurementName',
    ellipsis: true,
    sorter: true
  },
  {
    title: '标段(包)名称',
    dataIndex: 'sectionName',
    width: 200,
    ellipsis: true
  },
  {
    title: '分类',
    dataIndex: 'classification',
    width: 80,
    sorter: true
  },
  {
    title: '审核状态',
    dataIndex: 'reviewState',
    width: 100
  },
  {
    title: '发布状态',
    dataIndex: 'releaseState',
    width: 80,
    sorter: true
  },
  {
    title: '投标截止时间',
    dataIndex: 'deadline',
    width: 140,
    ellipsis: true
  },
  {
    dataIndex: 'action',
    title: '操作',
    width: 180,
    key: 'action',
    action: {
      asText: true,
      defaultShowItems: 4,
      items: [
        {
          label: '详情',
          onClick: (row) => openDetailDialog('标段（包）详情', row.id),
          visible: () => true,
          disabled: () => false
        },
        {
          label: '编辑',
          onClick: (row) => openEditDialog('编辑标段（包）', row.id),
          visible: (row) => row.reviewState !== 3, // 已审核通过不可编辑
          disabled: () => false
        },
        {
          label: '删除',
          onClick: (row) => handleDelete(row),
          visible: (row) => row.reviewState !== 3, // 已审核通过不可删除
          disabled: () => false
        }
      ]
    }
  }
]);

// 弹窗操作
const openAddDialog = (title) => {
  proxy?.$dialog(
    {
      title,
      width: 600,
      height: 500,
      contentPadding: false,
      closeCallback: (action) => {
        if (action === 'submit') {
          model.gridList.refresh();
        }
      }
    },
    () => h(
      defineAsyncComponent(() => import('./add.vue'))
    )
  );
};

const openEditDialog = (title, rowGuid) => {
  proxy?.$dialog(
    {
      title,
      width: 600,
      height: 500,
      contentPadding: false,
      closeCallback: (action) => {
        if (action === 'submit') {
          model.gridList.refresh();
        }
      }
    },
    () => h(
      defineAsyncComponent(() => import('./edit.vue')),
      { rowGuid }
    )
  );
};

const openDetailDialog = (title, rowGuid) => {
  proxy?.$dialog(
    {
      title,
      width: 600,
      height: 400,
      contentPadding: false
    },
    () => h(
      defineAsyncComponent(() => import('./detail.vue')),
      { rowGuid }
    )
  );
};

// 删除操作
const handleDelete = (row) => {
  EMessageBox.confirm('确认删除该标段（包）吗？删除后不可恢复。', '删除确认', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const { state, message } = await request({
        url: '/api/page-examples/delete',
        data: { params: { id: row.id } }
      });
      EMessage({ message, type: state ? 'success' : 'error' });
      if (state) model.gridList.refresh();
    } catch (e) {
      console.error('删除失败:', e);
    }
  });
};

// 批量删除
const handleBatchDelete = () => {
  if (model.selectedRowKeys.length === 0) {
    EMessage.warning('请先选择要删除的数据');
    return;
  }
  EMessageBox.confirm(`确认删除选中的 ${model.selectedRowKeys.length} 条数据吗？`, '批量删除确认', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const { state, message } = await request({
        url: '/api/page-examples/batchDelete',
        data: { params: { ids: model.selectedRowKeys } }
      });
      EMessage({ message, type: state ? 'success' : 'error' });
      if (state) {
        model.selectedRowKeys = [];
        model.gridList.refresh();
      }
    } catch (e) {
      console.error('批量删除失败:', e);
    }
  });
};

// 页面激活时刷新表格 key
onActivated(() => {
  tableKey.value++;
});

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style lang="less" scoped></style>