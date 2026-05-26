<template>
  <e-popup-header-extra>
    <e-button class="my-0 e-dialog__header_btn" text size="small" title="刷新" :icon="Refresh" @click="refreshDialog" />
  </e-popup-header-extra>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :top-config="topConfig" :left-config="leftConfig">
    <template #left>
      <e-menu class="pt-m pb-xxl pl-xxl pr-l border-none" :default-active="model.ouGuid" @select="onOuNodeClick">
        <template v-for="item in model.ouTree.data" :key="'menu-' + item.value">
          <template v-if="item.children && item.children.length > 0">
            <e-sub-menu :index="item.value">
              <template #title>
                <e-icon v-if="item.icon"><component :is="item.icon" /></e-icon>
                <span>{{ item.label }}</span>
              </template>
              <template v-for="subItem in item.children" :key="'children-' + subItem.value">
                <e-menu-item class="mb-s" :index="subItem.value">
                  <e-icon v-if="subItem.icon"><component :is="subItem.icon" /></e-icon>
                  <span>{{ subItem.label }}</span>
                </e-menu-item>
              </template>
            </e-sub-menu>
          </template>
          <template v-else>
            <e-menu-item :index="item.value" class="mb-s">
              <e-icon v-if="item.icon"><component :is="item.icon" /></e-icon>
              <span>{{ item.label }}</span>
            </e-menu-item>
          </template>
        </template>
      </e-menu>
    </template>
    <template #top>
      <e-toolbar>
        <template #title>
          <e-toolbar-title
            ><span class="text-lg fw-md">已选择({{ model.selectedRowKeys.length }})</span></e-toolbar-title
          >
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
          class="eui-table mx-xl"
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
          auto-height
          configurable
          config-id="datagrid"
          :key="tableKey"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'reviewState'">
              <div class="flex justify-start items-center">
                <span class="review-icon rounded mr-s" :class="'bg-' + reviewStateData[text - 1].cls"></span><span class="text-primary">{{ reviewStateData[text - 1].text }}</span>
              </div>
            </template>
          </template>
        </ep-data-grid>
      </div>
    </template>
    <template #bottom>
      <div class="flex justify-end py-l px-xxl operation">
        <e-button @click="handleDrawerCancel">取消</e-button>
        <e-button type="primary" @click="handleDrawerConfirm">确认</e-button>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, computed, onMounted, onActivated, inject, watch } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { Refresh } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'SelectDataClassification'
});

const { useTableModel, useListModel, useTreeModel } = Hooks;
const { createSubModel, PageConfig } = Utils;

const getCurrentDialog = inject('getCurrentDialog');
// 关闭弹窗
const closeDialog = (action = 'close', data = '') => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action === 'close' ? action : data);
  }
};

// 定义 props传参
const props = defineProps({
  data: { type: Object, default: {} }
});

// 页面配置模型
const pageConfig = new PageConfig({});
// 定义数据模型
const model = Utils.defineDataModel(() => {
  const condition = ref(null); // 条件
  condition.value = props.data;

  const ouGuid = ref(null); // 组织节点 GUID
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

  // 组织树模型
  const ouTree = useTreeModel('/showcase/f10-demo/selectDataTreeClassification', {
    requestType: 'restful', // 请求类型
    lazy: false, // 懒加载
    customParams: computed(() => {
      return {
        extendConditions: [
          {
            path: 'condition',
            type: condition.value ? 'EQ' : 'NQ',
            value: condition.value
          }
        ]
      };
    })
  });

  // 表格数据模型
  const gridList = useTableModel('/showcase/f10-demo/selectDataBase', {
    idField: 'id',
    requestType: 'restful', // 请求类型
    lazy: true, // 懒加载
    params: computed(() => {
      return {
        ...searchParams.data,
        extendConditions: [
          {
            path: 'ouGuid',
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
      condition, // 基础条件
      ouGuid, // 组织节点 GUID
      searchParams, // 页面搜索条件模型
      reviewStateList, // 审核状态下拉列表数据模型
      classificationList, // 分类下拉列表数据模型
      ouTree, // 组织树数据模型
      selectedRowKeys, // 表格选中行 ID 列表
      gridList // 表格数据模型
    }
  };
});
// 监听组织树数据变化
watch(
  () => model.ouTree.data,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      model.ouGuid = model.ouTree.ouGuid ? model.ouTree.ouGuid : newVal[0].value;
    }
  },
  { deep: true }
);

// 顶部导航配置
const topConfig = {
  enabled: true,
  inset: true,
  contentClass: 'eui-main-section',
  showDivider: false
};
// 左侧导航配置
const leftConfig = {
  enabled: true,
  defaultWidth: '180px',
  toggle: false,
  resize: false,
  contentClass: 'eui-left-section'
};

// 菜单栏选择事件
const onOuNodeClick = (nodeData) => {
  model.ouGuid = nodeData;
  model.selectedRowKeys = []; // 清空表格选中行
};

// 工具栏按钮相关方法
// 是否选中某条数据
const isSelected = computed(() => model.selectedRowKeys.length);

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
      label: '关键字',
      field: 'searchField',
      fieldType: 'string',
      type: 'mixSearch', // 复合搜索 搜索按钮
      alwaysExpand: true, // 是否始终展开
      default: true,
      operation: 'LIKE',
      operations: operationsList.value,
      data: [
        { label: '项目名称', value: 'projectName' },
        { label: '项目编号', value: 'projectCode' }
      ]
    },
    {
      label: '项目编号',
      field: 'projectCode',
      default: false,
      type: 'input',
      operation: 'EQ', //
      operations: operationsList.value
    },
    {
      label: '审批状态',
      field: 'reviewState',
      type: 'select',
      dataType: 'select',
      default: false,
      operation: 'EQ',
      operations: operationsList.value,
      data: model.reviewStateList.data,
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
// 表格引用
const tableRef = ref(null);
// 审核状态数据
const reviewStateData = [
  {
    cls: 'danger',
    text: '审核不通过'
  },
  {
    cls: 'primary',
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
    title: '项目名称',
    dataIndex: 'projectName',
    ellipsis: true // 内容过长显示省略号
  },
  {
    title: '项目编号',
    dataIndex: 'projectCode',
    width: 180,
    ellipsis: true // 内容过长显示省略号
  },
  {
    title: '审批状态',
    dataIndex: 'reviewState',
    width: 120,
    allowHtml: true // 允许渲染 HTML 代码
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
          icon: 'Search', // 操作项的图标，可选值为组件库中的图标名字
          label: '查看', // 操作项的文本标签
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

// 取消
const handleDrawerCancel = () => {
  closeDialog('close');
};
// 确认
const handleDrawerConfirm = () => {
  const selectedRowKeys = ref(null);
  selectedRowKeys.value = model.selectedRowKeys;
  closeDialog('save', selectedRowKeys.value);
};

/**
 * 刷新弹窗内容
 */
const refreshDialog = () => {
  model.selectedRowKeys = [];
  tableKey.value++;
  model.methods.initData();
};

// 监听组件激活事件
onActivated(() => {
  tableKey.value++;
});

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style lang="scss" scoped>
.review-icon {
  width: 6px;
  height: 6px;
}
.e-menu--vertical:deep {
  .e-sub-menu .e-sub-menu__title {
    margin-bottom: var(--e-space-s);
  }
}
</style>
