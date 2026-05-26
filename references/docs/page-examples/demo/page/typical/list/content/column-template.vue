<template>
  <ep-layout-manager class="eui-page" :class="{ 'bg-transparent': isComponent }" v-loading="model.global.state.loading" :top-config="{ contentClass: 'eui-top-section', showDivider: false }">
    <template #top>
      <div>
        <e-toolbar title-block>
          <template #title>
            <e-toolbar-title title="多字段同列" />
          </template>
          <template #actions>
            <e-button-group>
              <e-toolbar-more :table-ref="tableRef" :model="model" :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'" />
            </e-button-group>
          </template>
          <template #button>
            <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="4" config-id="toolbar-btns" />
          </template>
          <template #filter="{ opened }">
            <e-toolbar-search
              ref="toolbarSearchRef"
              :search-list="searchList"
              :is-open="opened"
              @advance-search="onAdvanceSearch"
              configurable
              config-id="toolbar-search"
              config-url="/showcase/f10-demo/grid2"
            />
          </template>
        </e-toolbar>
      </div>
    </template>

    <template #main>
      <div class="eui-main-section">
        <ep-data-grid
          ref="tableRef"
          class="eui-table"
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
              <e-tag :type="reviewStateData[text - 1]?.cls" round class="text-primary">{{ reviewStateData[text - 1]?.text }}</e-tag>
            </template>
            <template v-else-if="column.dataIndex === 'receivePerson'">
              <p>{{ text }}</p>
              <p>{{ text }}</p>
            </template>
            <template v-else-if="column.dataIndex === 'receiveInfo'">
              <p><span class="text-secondary">接收人：</span>{{ record.receivePerson }}</p>
              <p class="ellipsis"><span class="text-secondary">所在公司：</span>{{ record.receiveUnit }}</p>
            </template>
            <template v-else-if="column.dataIndex === 'reportInfo'">
              <p><span class="text-secondary">提报人：</span>{{ record.reportPerson }}</p>
              <p class="ellipsis"><span class="text-secondary">提报单位：</span>{{ record.reportUnit }}</p>
            </template>
            <template v-else-if="column.dataIndex === 'scheme'">
              <p class="text-brand"><span class="text-secondary">编号：</span>{{ record.sectionCode }}</p>
              <p class="ellipsis text-brand"><span class="text-secondary">名称：</span>{{ record.procurementName }}</p>
            </template>
            <template v-else-if="column.dataIndex === 'tags'">
              <e-tag v-for="item in record.tags" :key="item.tag" :type="tagsState[item.type - 1]?.cls" class="mr-s">{{ item.tag }}</e-tag>
            </template>
          </template>
        </ep-data-grid>
      </div>
    </template>
  </ep-layout-manager>
</template>
<script setup>
import { ref, computed, onMounted, onActivated, watch } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';

defineOptions({
  name: 'ColumnTemplate'
});

const { useTableModel, useListModel } = Hooks;
const { createSubModel, PageConfig } = Utils;

// 页面配置模型
const pageConfig = new PageConfig({});
// 定义数据模型
const model = Utils.defineDataModel(() => {
  const selectedRowKeys = ref([]); // 表格选中行 id
  // 页面搜索条件 创建普通子模型
  const searchParams = createSubModel(
    {
      logicOperator: 'and', // 逻辑操作符
      conditions: [] // 搜索条件
    },
    {
      update: (params) => {
        searchParams.data.conditions = params.conditions; // 更新搜索条件
        searchParams.data.logicOperator = params.logicOperator; // 更新逻辑操作符
      }
    }
  );

  // 审核状态下拉列表数据模型
  const reviewStateList = useListModel('/showcase/f10-demo/platformOptions', {
    labelField: 'label',
    lazy: false // 懒加载
  });

  // 分类下拉列表数据模型
  const classificationList = useListModel('/showcase/f10-demo/platformOptions', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 表格数据模型
  const gridList = useTableModel('/showcase/f10-demo/grid2', {
    idField: 'id',
    requestType: 'restful', // 请求类型
    lazy: false, // 懒加载
    params: computed(() => {
      return {
        ...searchParams.data,
        extendConditions: [{}]
      };
    })
  });

  return {
    global: { pageConfig }, // 全局模型
    models: {
      searchParams, // 页面搜索条件模型
      reviewStateList, // 审核状态下拉列表数据模型
      classificationList, // 分类下拉列表数据模型
      selectedRowKeys, // 表格选中行 ID 列表
      gridList // 表格数据模型
    }
  };
});
// 按标段新增
const AddBySection = () => {};
// 按订单新增
const AddByOrder = () => {};
// 批量导入合同
const BatchImportContract = () => {};

// 工具栏按钮配置
const toolbarBtnsRef = ref(null);
const toolbarBtnList = ref([
  {
    type: 'primary',
    onClick: async () => AddBySection(),
    content: '按标段新增'
  },
  {
    type: 'default',
    onClick: async () => AddByOrder(),
    content: '按订单新增'
  },
  {
    type: 'default',
    onClick: async () => BatchImportContract(),
    content: '批量导入合同'
  }
]);
// 工具栏搜索相关方法
const toolbarSearchRef = ref(null);
// 搜索操作符列表
const operationsList = ref([
  {
    label: '等于',
    type: 'input',
    value: 'EQ'
  },
  {
    label: '不等于',
    type: 'input',
    value: 'NQ'
  },
  {
    label: '等于空',
    type: 'none',
    value: 'EQBLANK'
  },
  {
    label: '不等于空',
    type: 'none',
    value: 'NQBLANK'
  },
  {
    label: '模糊匹配',
    type: 'input',
    value: 'LIKE'
  },
  {
    label: '模糊匹配（排除）',
    type: 'input',
    value: 'NOTLIKE'
  },
  {
    label: '以...开头',
    type: 'input',
    value: 'LEFTLIKE'
  },
  {
    label: '以...结尾',
    type: 'input',
    value: 'RIGHTLIKE'
  },
  {
    label: '包含',
    type: 'multiSelect',
    value: 'IN'
  },
  {
    label: '不包含',
    type: 'multiSelect',
    value: 'NOTIN'
  }
]);
// 工具栏搜索配置
const searchList = computed(() => {
  return [
    {
      label: '全部',
      field: 'searchField',
      fieldType: 'string',
      type: 'mixSearch', // 复合搜索 搜索按钮
      default: true,
      operation: 'LIKE',
      operations: operationsList.value,
      data: [
        { label: '采购寻源方案名称', value: 'sectionCodeCopy' },
        { label: '采购寻源方案编号', value: 'reviewState' }
      ]
    },
    {
      label: '采购项目名称',
      field: 'procurementName',
      default: false,
      type: 'input',
      operation: 'EQ', //
      operations: operationsList.value
    },
    {
      label: '分类',
      field: 'classification',
      type: 'select',
      dataType: 'select',
      default: false,
      operation: 'EQ',
      operations: operationsList.value,
      data: model.classificationList.data,
      labelField: 'label',
      valueField: 'value'
    }
  ];
});
// 高级搜索回调
const onAdvanceSearch = (params) => {
  // 更新搜索参数模型
  model.searchParams.update(params);
};

// 解决第二次进入页面表格样式错乱的问题，根源是 keep-alive缓存列宽不会重新计算导致的
const tableKey = ref(0);

// 审核状态数据
const reviewStateData = [
  {
    cls: 'danger',
    text: '审核不通过'
  },
  {
    cls: '',
    text: '审核中'
  },
  {
    cls: 'success',
    text: '审核通过'
  },
  {
    cls: 'warning',
    text: '编辑中'
  }
];

const tagsState = [
  {
    cls: ''
  },
  {
    cls: 'success'
  },
  {
    cls: 'warning'
  },
  {
    cls: 'danger'
  }
];

// 表格行
const columnList = ref([
  {
    title: '采购寻源方案',
    dataIndex: 'scheme',
    width: 266,
    ellipsis: true, // 内容过长显示省略号
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 310,
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '两行文本信息',
    dataIndex: 'receivePerson',
    width: 140,
    ellipsis: true
  },
  {
    title: '寻源方案接收人',
    dataIndex: 'receiveInfo',
    width: 240,
    ellipsis: true,
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '采购申请提报',
    dataIndex: 'reportInfo',
    ellipsis: true
  },
  {
    title: '创建日期',
    dataIndex: 'creatTime',
    width: 120,
    ellipsis: true
  },
  {
    title: '审核状态',
    dataIndex: 'reviewState',
    width: 130,
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '变更接收人',
    dataIndex: 'changeRecipient',
    width: 120,
    ellipsis: true
  }
]);

// 定义 props传参
const props = defineProps({
  data: { type: Object, default: () => ({}) } // 编辑节点数据
});

// 是否是组件
const isComponent = ref(false);
// 监听
watch(
  () => props.data,
  (newVal) => {
    // 是否是组件
    newVal && (isComponent.value = newVal.isComponent);
  },
  {
    deep: true,
    immediate: true
  }
);

// 监听组件激活事件
onActivated(() => {
  tableKey.value++;
});

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style lang="scss" scoped></style>
