<template>
  <!-- NOTE: 已去除未知场景类名  :class="{ 'bg-transparent': isComponent }" -->
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :top-config="{ contentClass: 'eui-top-section', showDivider: false }">
    <template #top>
      <e-toolbar title-block v-if="!isComponent" :class="{ 'pb-0': !metricVisible }">
        <template #title>
          <e-toolbar-title class="mb-l" title="指标卡导航" />
        </template>
        <template #actions>
          <div class="flex justify-end items-center">
            <div class="flex justify-end items-center mr-l">
              <span class="leading-xl text-base fw-normal mr-s">数据概览</span><e-switch v-model="metricVisible" size="small" @change="handleMetricVisibleChange" />
            </div>
            <e-toolbar-more :table-ref="tableRef" :model="model" :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'" />
          </div>
        </template>
      </e-toolbar>
      <div class="tag-list" v-show="metricVisible">
        <e-metric-nav v-model="model.selectCardId" :options="cardList" @change="handleCardChange" :columns="6" :gap="12" />
      </div>
      <e-toolbar title-block :class="{ 'pt-m': !isComponent && !metricVisible }">
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
            config-url="/showcase/f10-demo/grid"
          />
        </template>
      </e-toolbar>
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
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'reviewState'">
              <e-tag :type="reviewStateData[text - 1].cls" round class="text-primary">{{ reviewStateData[text - 1].text }}</e-tag>
            </template>
          </template>
        </ep-data-grid>
      </div>
    </template>
  </ep-layout-manager>
</template>
<script setup>
import { ref, computed, onMounted, onActivated, watch, onUnmounted } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { Setting } from '@epoint-fe/eui-icons';
import { debounce } from '@epoint-fe/common-utils';

defineOptions({
  name: 'TopCard'
});

const { useTableModel, useListModel } = Hooks;
const { createSubModel, PageConfig, request } = Utils;

// 页面配置模型
const pageConfig = new PageConfig({});
// 定义数据模型
const model = Utils.defineDataModel(() => {
  const selectCardId = ref(''); // 卡片选中节点 id
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
  const gridList = useTableModel('/showcase/f10-demo/grid', {
    idField: 'id',
    requestType: 'restful', // 请求类型
    lazy: true, // 懒加载
    params: computed(() => {
      return {
        ...searchParams.data,
        extendConditions: [
          {
            path: 'selectCardId',
            type: selectCardId.value ? 'EQ' : 'NQ',
            value: selectCardId.value
          }
        ]
      };
    })
  });

  // 卡片数据模型
  const cardList = createSubModel(
    {
      data: []
    },
    {
      // 刷新表单数据
      refresh: async () => {
        // 请求表单数据
        const listData = await request({
          url: `/showcase/f10-demo/topCardData`,
          data: {
            // 查询条件
            conditions: []
          }
        });

        return listData;
      },
      lazy: false
    }
  );

  return {
    global: { pageConfig }, // 全局模型
    models: {
      searchParams, // 页面搜索条件模型
      reviewStateList, // 审核状态下拉列表数据模型
      classificationList, // 分类下拉列表数据模型
      selectCardId, // 卡片选中的节点 id
      selectedRowKeys, // 表格选中行 ID 列表
      cardList, // 卡片数据模型
      gridList // 表格数据模型
    }
  };
});

// 工具栏按钮相关方法
// 是否选中某条数据
const isSelected = computed(() => model.selectedRowKeys.length);
// 新增采购信息
const addPurchase = () => {};
// 回到第一步
const backFirst = () => {};
// 终止流程
const terminateProcess = () => {};
// 工具栏按钮配置
const toolbarBtnsRef = ref(null);
const toolbarBtnList = ref([
  {
    type: 'primary',
    onClick: async () => addPurchase(),
    content: '新增采购公告'
  },
  {
    type: 'default',
    onClick: async () => backFirst(),
    disabled: () => !isSelected.value,
    content: '回到第一步'
  },
  {
    type: 'default',
    onClick: async () => terminateProcess(),
    disabled: () => !isSelected.value,
    content: '终止流程'
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
        { label: '标段（包）编号', value: 'sectionCodeCopy' },
        { label: '审核状态', value: 'reviewState' }
      ]
    },
    {
      label: '标段（包）编号',
      field: 'sectionCodeCopy',
      default: true,
      type: 'input',
      operation: 'EQ', //
      operations: operationsList.value
    },
    {
      label: '审核状态',
      field: 'reviewState',
      type: 'select',
      dataType: 'select',
      default: true,
      operation: 'EQ',
      operations: operationsList.value,
      data: model.reviewStateList.data,
      labelField: 'label',
      valueField: 'value'
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

// 卡片
const metricVisible = ref(true);
const metricShow = ref(true);
const cardList = ref(null);

const handleMetricVisibleChange = (value) => {
  if (metricShow.value) {
    metricShow.value = false;
    window.removeEventListener('resize', updateHeight); // 销毁监听
  }
};

const METRIC_MIN_VISIBLE_HEIGHT = 780; // 指标卡显示的最小窗口高度
const updateHeight = debounce(() => {
  metricVisible.value = window.innerHeight >= METRIC_MIN_VISIBLE_HEIGHT;
}, 150);

watch(
  () => model.cardList.data,
  (newVal) => {
    cardList.value = newVal.data;
    model.selectCardId = newVal?.data[0]?.value;
  },
  {
    deep: true,
    immediate: true
  }
);

// 卡片选中
const handleCardChange = (value, item) => {
  model.selectCardId = value;
};

// 解决第二次进入页面表格样式错乱的问题，根源是 keep-alive缓存列宽不会重新计算导致的
const tableKey = ref(0);
// 表格引用
const tableRef = ref(null);
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
// 表格行
const columnList = ref([
  {
    title: '标段(包)编号',
    dataIndex: 'sectionCode',
    width: 220,
    ellipsis: true, // 内容过长显示省略号
    sorter: true // 是否启用排序功能
  },
  {
    title: '采购项目名称',
    dataIndex: 'procurementName',
    ellipsis: true, // 内容过长显示省略号
    sorter: true // 是否启用排序功能
  },
  {
    title: '标段(包)名称',
    dataIndex: 'sectionName',
    width: 302,
    ellipsis: true
  },
  {
    title: '分类',
    dataIndex: 'classification',
    width: 100,
    sorter: true, // 是否启用排序功能
    customRender: function ({ text, record, index, column }) {
      return text == 1 ? '设计' : text == 2 ? '施工' : '';
    }
  },
  {
    title: '审核状态',
    dataIndex: 'reviewState',
    width: 130,
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '发布状态',
    dataIndex: 'releaseState',
    width: 110,
    sorter: true, // 是否启用排序功能
    customRender: function ({ text, record, index, column }) {
      return text == 1 ? '已发布' : text == 2 ? '未发布' : '';
    }
  },
  {
    title: '投标截止时间',
    dataIndex: 'deadline',
    width: 120,
    ellipsis: true
  },
  {
    dataIndex: 'action',
    title: '操作',
    width: 100,
    key: 'action',
    hidden: false,
    action: {
      asText: true, // 是否以文本形式展示操作项，默认值为 false
      defaultShowItems: 4, // 默认展示的操作项数量，默认值为 4
      // 操作项列表
      items: [
        {
          icon: 'Setting', // 操作项的图标，可选值为组件库中的图标名字
          label: '设置', // 操作项的文本标签
          // 操作项的点击事件处理函数
          onClick: (row) => {},
          // 操作项是否可见的判断函数
          visible: (row) => true,
          // 操作项是否禁用的判断函数
          disabled: (row) => false
        }
      ]
    }
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

  updateHeight();
  window.addEventListener('resize', updateHeight); // 监听窗口变化
});

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight); // 销毁监听
});
</script>

<style lang="scss" scoped>
.tag-list {
  padding: var(--e-space-xl) 0;
}
</style>
