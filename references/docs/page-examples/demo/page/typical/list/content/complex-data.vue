<template>
  <ep-layout-manager class="eui-page" :class="{ 'bg-transparent': isComponent }" v-loading="model.global.state.loading" :top-config="{ contentClass: 'eui-top-section', showDivider: false }">
    <template #top>
      <e-toolbar title-block>
        <template #title>
          <e-toolbar-title title="复杂数据" />
        </template>
        <template #button>
          <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="4" config-id="toolbar-btns" />
        </template>
        <template #actions>
          <e-toolbar-more :table-ref="tableRef" :model="model" :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'" />
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
          :show-index-column="false"
          :show-selection-column="true"
          :default-show-index="false"
          @change="model.gridList.change"
          @refresh="model.gridList.refresh"
          configurable
          config-id="datagrid"
          :key="tableKey"
        >
          <template #headerCell="{ column }">
            <template v-if="column.key === 'progress'">
              <div class="flex items-center">
                <span class="mr-s">{{ column.title }}</span>

                <e-tooltip placement="right-start" effect="light">
                  <e-icon class="tooltip-icon mx-s cursor-pointer" :size="14">
                    <HelpCircle />
                  </e-icon>
                  <template #content>
                    <span class="text-base leading-base text-third">图例:</span>
                    <ul>
                      <li class="flex items-center mt-m">
                        <e-icon class="text-success mr-s" :size="14">
                          <CircleCheckFilled />
                        </e-icon>
                        <span class="h-xs text-base text-primary leading-lg">已完成</span>
                      </li>
                      <li class="flex items-center mt-m">
                        <e-icon class="text-brand mr-s" :size="14">
                          <PendingFilled />
                        </e-icon>
                        <span class="h-xs text-base text-primary leading-lg">进行中</span>
                      </li>
                      <li class="flex items-center mt-m">
                        <e-icon class="text-placeholder mr-s" :size="14">
                          <TimeFilled />
                        </e-icon>
                        <span class="h-xs text-base text-primary leading-lg">未开始</span>
                      </li>
                    </ul>
                  </template>
                </e-tooltip>
              </div>
            </template>
          </template>
          <template #bodyCell="{ column, text, record }">
            <!-- 标段(包)名称 -->
            <template v-if="column.dataIndex === 'sectionName'">
              <ul class="section-name" v-if="text && text.length">
                <li class="flex items-center" v-for="(item, key) in text" :key="'sectionName-' + key">
                  <e-tag class="mr-s type" effect="dark" :type="item.type === '电' ? 'success' : item.type === '纸' ? 'info' : ''" size="small">
                    {{ item.type }}
                  </e-tag>

                  <e-tooltip effect="dark" :content="item.title" placement="top">
                    <span class="h-xs text-base text-primary leading-lg ellipsis">{{ item.title }}</span>
                  </e-tooltip>

                  <e-tag v-if="item.state" class="ml-s state" :type="item.state === '已作废' ? 'danger' : 'warning'" size="small">
                    {{ item.state }}
                  </e-tag>
                </li>
              </ul>
            </template>
            <!-- 评审状态 -->
            <template v-if="column.key === 'assessState'">
              <e-icon v-if="text === 1" class="text-danger"><CircleCloseFilled /></e-icon>
              <e-icon v-else-if="text === 2" class="text-brand"><TimeFilled /></e-icon>
              <e-icon v-else-if="text === 3" class="text-success"><CircleCheckFilled /></e-icon>
              <e-icon v-else-if="text === 4" class="text-white review-state-edit bg-warning"><EditFilled /></e-icon>
            </template>
            <!-- 审核状态 -->
            <template v-if="column.key === 'auditState'">
              <e-icon v-if="text === 1" class="text-danger"><CircleCloseFilled /></e-icon>
              <e-icon v-else-if="text === 2" class="text-brand"><TimeFilled /></e-icon>
              <e-icon v-else-if="text === 3" class="text-success"><CircleCheckFilled /></e-icon>
              <e-icon v-else-if="text === 4" class="text-white review-state-edit bg-warning"><EditFilled /></e-icon>
              <span class="ml-s">{{ reviewStateData[text - 1].text }}</span>
            </template>
            <!-- 审核状态 -->
            <template v-if="column.key === 'checkState'">
              <e-icon v-if="text === 1" class="text-danger"><CircleCloseFilled /></e-icon>
              <e-icon v-else-if="text === 2" class="text-brand"><TimeFilled /></e-icon>
              <e-icon v-else-if="text === 3" class="text-success"><CircleCheckFilled /></e-icon>
              <e-icon v-else-if="text === 4" class="text-white review-state-edit bg-warning"><EditFilled /></e-icon>
              <span class="mx-s">{{ reviewStateData[text - 1].text }}</span>
              <e-popover popper-style="padding:0;" placement="bottom-start" :width="250" trigger="hover" :show-arrow="false" offset="8">
                <template #reference>
                  <e-icon class="review-user cursor-pointer"><UserFilled /></e-icon>
                </template>
                <template #default>
                  <ComplexDataPopover :ouGuid="record.id" />
                </template>
              </e-popover>
            </template>
            <!-- 进度条 -->
            <template v-if="column.key === 'stageBar'">
              <div class="w-full">
                <e-progress :percentage="record.stage" :status="stageData[record.stageType - 1].status" :stroke-width="6">
                  <e-icon v-if="stageData[record.stageType - 1].status === 'exception'">
                    <CircleCloseFilled />
                  </e-icon>
                  <e-icon v-else-if="stageData[record.stageType - 1].status === 'success'">
                    <CircleCheckFilled />
                  </e-icon>
                </e-progress>
              </div>
            </template>
            <!-- 阶段 -->
            <template v-if="column.key === 'stage'">
              <div class="w-full">
                <div class="text-primary text-base leading-base mb-s">{{ stageData[record.stageType - 1].text }}</div>
                <e-progress :percentage="record.stage" :status="stageData[record.stageType - 1].status" :stroke-width="6" :show-text="false" />
              </div>
            </template>
            <!-- 审核状态3 -->
            <template v-if="column.key === 'reviewState'">
              <e-tag :type="reviewStateData[text - 1].cls" round class="text-primary">{{ reviewStateData[text - 1].text }}</e-tag>
            </template>
            <!-- 进度 -->
            <template v-if="column.key === 'progress'">
              <ComplexDataProgress :progress="text" />
            </template>
            <!-- 操作 -->
            <template v-if="column.key === 'action'">
              <e-button link type="primary">查看</e-button>
              <e-button link :type="record.edit ? 'primary' : ''" :disabled="!record.edit">编辑</e-button>
              <e-button link type="primary">日志({{ record.logs }})</e-button>
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
import { Setting, TimeFilled, EditFilled, CircleCheckFilled, CircleCloseFilled, UserFilled, HelpCircle, PendingFilled } from '@epoint-fe/eui-icons';

// 提前导入/注册需要动态渲染的组件
import ComplexDataPopover from '../content/complex-data-popover.vue';
import ComplexDataProgress from '../content/complex-data-progress.vue';

defineOptions({
  name: 'ComplexData'
});

const { useTableModel } = Hooks;
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

  // 表格数据模型
  const gridList = useTableModel('/showcase/f10-demo/complexGrid', {
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
      selectedRowKeys, // 表格选中行 ID 列表
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
      data: [{ label: '标段（包）名称', value: 'sectionName' }]
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
const filtersData = [
  {
    text: '审核不通过',
    value: '1'
  },
  {
    text: '审核中',
    value: '2'
  },
  {
    text: '审核通过',
    value: '3'
  },
  {
    text: '编辑中',
    value: '4'
  }
];
const stageData = [
  {
    text: '作废',
    value: '1',
    status: 'exception'
  },
  {
    text: '响应中',
    value: '2',
    status: ''
  },
  {
    text: '定标结束',
    value: '3',
    status: 'success'
  },
  {
    text: '新建',
    value: '4',
    status: ''
  }
];
// 表格行
const columnList = ref([
  {
    title: '标段(包)名称',
    dataIndex: 'sectionName',
    width: 380,
    ellipsis: false, // 内容过长显示省略号
    sorter: false // 是否启用排序功能
  },
  {
    title: '评审状态',
    dataIndex: 'reviewState',
    key: 'assessState',
    width: 120,
    sorter: false, // 是否启用排序功能
    filters: filtersData,
    filterSearch: false, // 筛选菜单项是否可搜索
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '审核状态',
    dataIndex: 'reviewState',
    key: 'auditState',
    width: 150,
    sorter: false, // 是否启用排序功能
    filters: filtersData,
    filterSearch: false, // 筛选菜单项是否可搜索
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '审核状态',
    dataIndex: 'reviewState',
    key: 'checkState',
    width: 150,
    sorter: false, // 是否启用排序功能
    filters: filtersData,
    filterSearch: false, // 筛选菜单项是否可搜索
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '进度条',
    key: 'stageBar',
    dataIndex: '',
    width: 240,
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '阶段',
    key: 'stage',
    dataIndex: '',
    width: 220,
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '审核状态',
    dataIndex: 'reviewState',
    key: 'reviewState',
    width: 150,
    sorter: false, // 是否启用排序功能
    filters: filtersData,
    filterSearch: false, // 筛选菜单项是否可搜索
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
    width: 400,
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '操作',
    width: 204,
    key: 'action',
    fixed: 'right'
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

<style lang="scss" scoped>
// 标段(包)名称
.section-name {
  > li {
    + li {
      margin-top: 6px;
    }
    .type {
      flex-shrink: 0;

      :deep .e-tag__content {
        line-height: inherit;
      }
    }
    .state {
      flex-shrink: 0;
      :deep .e-tag__content {
        line-height: inherit;
      }
    }
  }
}

// 评审状态
.review {
  &-state {
    &-edit {
      width: 14px;
      height: 14px;
      font-size: 8px;
      border-radius: 50%;
    }
  }

  &-user {
    color: var(--e-icon-color-3);

    &:hover {
      color: var(--e-color-primary);
    }
  }
}

.tooltip-icon {
  color: var(--e-icon-color-1);

  &:hover {
    color: var(--e-text-color-primary);
  }
}
</style>
