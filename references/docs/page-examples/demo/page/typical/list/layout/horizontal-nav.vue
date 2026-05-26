<template>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" ref="layoutRef" :left-config="leftConfig" :top-config="{ contentClass: 'eui-top-section', showDivider: false }">
    <template #top>
      <e-toolbar title-block>
        <template #title>
          <e-toolbar-title title="同级导航结构" />
        </template>
        <template #actions>
          <e-toolbar-more :table-ref="tableRef" :model="model" :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'" />
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
            config-url="/showcase/f10-demo/grid"
          />
        </template>
      </e-toolbar>
    </template>
    <template #left>
      <e-scrollbar>
        <div class="side-tree">
          <e-dropdown class="side-dropdown">
            <e-button :icon="Setting" />
            <template #dropdown>
              <e-dropdown-menu>
                <e-dropdown-item><e-button :icon="AddRectangle" @click="handleAddRectangle" /></e-dropdown-item>
                <e-dropdown-item><e-button :icon="Edit" @click="handleEdit" /></e-dropdown-item>
              </e-dropdown-menu>
            </template>
          </e-dropdown>
          <e-tree ref="treeRef" v-model:selected-keys="model.ouGuid" :data="model.ouTree.data" show-filter filter-placeholder="搜索" @select="onOuNodeClick" />
        </div>
      </e-scrollbar>
    </template>
    <template #main>
      <div class="eui-main-section rounded-r">
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
          show-index-column
          show-selection-column
          default-show-index
          @change="model.gridList.change"
          @refresh="model.gridList.refresh"
          :auto-height="autoHeight"
          :sticky-container="tableStickyContainerRef"
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
import { ref, watch, computed, onMounted, onActivated } from 'vue';
import { EpLayoutManager, EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { Setting, AddRectangle, Edit } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'HorizontalNav'
});

const { useTreeModel, useTableModel, useListModel } = Hooks;
const { createSubModel, PageConfig } = Utils;

// 页面配置模型
const pageConfig = new PageConfig({});
// 定义数据模型
const model = Utils.defineDataModel(() => {
  const selectedRowKeys = ref([]); // 表格选中行 id
  const ouGuid = ref(null); // 左侧树选中节点 id 数组
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

  // 组织树模型
  const ouTree = useTreeModel('/showcase/f10-demo/outree', {
    requestType: 'restful' // 请求类型
  });

  const gridList = useTableModel('/showcase/f10-demo/grid', {
    idField: 'id',
    requestType: 'restful', // 请求类型
    lazy: true, // 懒加载
    params: computed(() => {
      return {
        ...searchParams.data,
        extendConditions: [
          {
            path: 'ouguid',
            type: ouGuid.value ? 'EQ' : 'NQ',
            value: ouGuid.value
          }
        ]
      };
    })
  });

  return {
    global: { pageConfig }, // 全局模型
    models: {
      searchParams, // 页面搜索条件模型
      reviewStateList, // 审核状态下拉列表数据模型
      classificationList, // 分类下拉列表数据模型
      ouTree, // 组织树模型
      ouGuid, // 选中组织节点 ID
      selectedRowKeys, // 表格选中行 ID 列表
      gridList // 表格数据模型
    }
  };
});

// 布局引用
const layoutRef = ref(null);
// 左侧导航配置
const leftConfig = {
  contentClass: 'eui-left-section bg-fill rounded rounded-l',
  enabled: true,
  defaultWidth: '240px',
  minWidth: '180px',
  maxWidth: '480px',
  toggle: true,
  resize: true
};

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
    content: '新增采购信息'
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

// 添加矩形节点
const handleAddRectangle = () => {};

// 编辑节点
const handleEdit = () => {};

// 组织树引用
const treeRef = ref(null);

// 监听组织树数据变化
watch(
  () => model.ouTree.data,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      model.ouGuid = [model.ouTree.ouGuid ? model.ouTree.ouGuid : newVal[0].value];
    }
  },
  { deep: true }
);
// 组织树节点点击事件
const onOuNodeClick = (nodeData) => {
  model.ouGuid = nodeData;
  model.selectedRowKeys = []; // 清空表格选中行

  // 组织树节点切换时回到表格顶部
  if (autoHeight.value && layoutRef.value) {
    layoutRef.value.rootEl.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动
    });
  }
};

// 解决第二次进入页面表格样式错乱的问题，根源是 keep-alive缓存列宽不会重新计算导致的
const tableKey = ref(0);
// 表格引用
const tableRef = ref(null);
const autoHeight = ref(false); // 是否自动高度
// 计算表格粘性容器
const tableStickyContainerRef = computed(() => {
  return layoutRef.value ? layoutRef.value.tableStickyContainerRef : null;
});
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
    customRender: function ({ text }) {
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
    customRender: function ({ text }) {
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

onActivated(() => {
  tableKey.value++;
});

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style lang="scss" scoped>
.side-tree {
  position: relative;
  height: 100%;
  padding: var(--e-space-l);
  background-color: var(--e-color-white);
  .side-dropdown {
    position: absolute;
    top: var(--e-space-l);
    right: var(--e-space-l);
    z-index: 1;
  }
}
.e-tree {
  :deep {
    & > .e-input {
      width: calc(100% - 40px);
    }
  }
}
</style>
