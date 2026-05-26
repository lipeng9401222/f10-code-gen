<template>
  <e-popup-header-extra v-if="inDialog">
    <e-button class="my-0 e-dialog__header_btn" text size="small" title="刷新" :icon="Refresh" @click="refreshDialog" />
  </e-popup-header-extra>
  <!-- 页面根节点绑定全局 loading，覆盖整个页面初始化过程 -->
  <ep-layout-manager class="fui-page" v-loading="model.global.state.loading">
    <template #top v-if="!inDialog">
      <e-toolbar title="穿梭框">
        <template #filter="{ opened }">
          <e-button-group>
            <e-toolbar-more :table-ref="tableRef" :model="model" />
          </e-button-group>
        </template>
      </e-toolbar>
    </template>
    <!-- 上方的页面标签仅为示意所用，实际开发时请根据情况决定是否需要 -->

    <template #main>
      <div class="max-h-full flex pt-m pr-xxl pb-xxl pl-xxl flex-1" :class="{ 'gap-l': autoTransfer }">
        <div class="grid-transfer-panel rounded border bg-white flex-1 flex flex-col pb-xl">
          <e-toolbar class="px-xl pb-l" :space-gap="10">
            <template #title>
              <e-toolbar-title class="text-lg fw-md">
                <span>待选择({{ model.leftSelectedRowKeys.length }}/{{ model.leftGridList.data.total || 0 }})</span>
              </e-toolbar-title>
            </template>
            <template #filter="{ opened }">
              <e-toolbar-search
                ref="leftToolbarSearchRef"
                :search-list="leftSearchList"
                :is-open="opened"
                @advance-search="onAdvanceSearch"
                configurable
                config-id="toolbar-search"
                config-url="/showcase/f10-demo/dynamicGrid"
                :filter-advanced-fixed-list="filterAdvancedFixedList"
              />
            </template>
          </e-toolbar>

          <ep-data-grid
            class="flex-1 flex flex-col px-m"
            ref="leftTableRef"
            :id-field="model.leftGridList.idField"
            :data="model.leftGridList.data.list"
            :total="model.leftGridList.data.total"
            :page-size="model.leftGridList.data.pageSize"
            :current="model.leftGridList.current"
            :columns="columnList"
            :loading="model.leftGridList.loading"
            v-model:selectedRowKeys="model.leftSelectedRowKeys"
            :show-index-column="true"
            :show-selection-column="true"
            :default-show-index="true"
            :pagination="{
              hideOnSinglePage: true,
              size: 'small',
              showLessItems: true
            }"
            :rowSelection="{
              onChange: leftSelectedChange
            }"
            @change="model.leftGridList.change"
            @refresh="model.leftGridList.refresh"
            configurable
            config-id="datagrid"
            :key="leftTableKey"
          >
          </ep-data-grid>
        </div>
        <div v-if="!autoTransfer" class="grid-transfer-buttons flex flex-col justify-center items-center gap-l p-xl">
          <e-button type="default" :icon="ArrowLeft" @click="toLeft" :disabled="isRightNotSelected" :loading="isGridLoading" />
          <e-button type="default" :icon="ArrowRight" @click="toRight" :disabled="isLeftNotSelected" :loading="isGridLoading" />
        </div>
        <div class="grid-transfer-panel rounded border bg-white flex-1 flex flex-col pb-xl">
          <e-toolbar class="px-xl pb-l">
            <template #title>
              <e-toolbar-title class="text-lg fw-md">
                <span>已选择({{ model.rightSelectedRowKeys.length }}/{{ rightTableTotal }})</span>
              </e-toolbar-title>
            </template>
            <template #actions>
              <e-tooltip v-if="!autoTransfer" content="删除" placement="top" :disabled="isRightNotSelected">
                <e-button class="w-sm h-sm" :icon="Delete" text @click="toLeft" :disabled="isRightNotSelected" :loading="isGridLoading" type="danger" ghost />
              </e-tooltip>
              <e-tooltip content="重置" placement="top">
                <e-button class="w-sm h-sm" :icon="Rollback" text @click="resetSelected" />
              </e-tooltip>
            </template>
          </e-toolbar>

          <ep-data-grid
            class="flex-1 flex flex-col px-m"
            ref="rightTableRef"
            id-field="id"
            :data="rightTableData"
            :total="rightTableTotal"
            :columns="columnList"
            v-model:selectedRowKeys="model.rightSelectedRowKeys"
            :show-index-column="true"
            :show-selection-column="true"
            :default-show-index="false"
            :pagination="rightPagination"
            :rowSelection="{
              onChange: rightSelectedChange
            }"
            configurable
            config-id="datagrid"
            :key="rightTableKey"
          >
          </ep-data-grid>
        </div>
      </div>
    </template>
    <template #bottom>
      <e-toolbar class="bg-white px-xxl py-l" button-position="right">
        <template #button>
          <e-toolbar-btns ref="footerBtnsRef" :items="footerBtnList" />
        </template>
      </e-toolbar>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, watch, computed, onMounted, inject, onActivated, nextTick } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { ArrowLeft, ArrowRight, Delete, Refresh, Rollback } from '@epoint-fe/eui-icons';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

defineOptions({
  name: 'TransferGrid'
});

const getCurrentDialog = inject('getCurrentDialog');
// 是否处于弹窗中
const inDialog = !!getCurrentDialog;

// 关闭弹窗
const closeDialog = (action = 'close', data) => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action || 'close', data);
  }
};

const { PageConfig, createSubModel } = Utils;
const { useTableModel } = Hooks;

// 定义 props传参
const props = defineProps({
  //  父组件传入的参数GUID
  rowGuid: { type: String, default: '' },
  // 自动穿梭
  autoTransfer: { type: Boolean, default: false }
});

// 页面配置模型
const pageConfig = new PageConfig({});
// 穿梭到右侧的key值列表
const transferToRightKeys = ref([]);
// 默认选中的key值列表
const defaultRightKeys = ref([]);
// 默认选中的行列表
const defaultRightRows = ref([]);
// 右侧列表数据
const rightTableData = ref([]);
// 右侧列表总数
const rightTableTotal = computed(() => rightTableData.value?.length || 0);
// 操作次数(用于识别第一次操作)
const optTimes = ref(0);
// 控制右侧表格分页显示状态
const rightPagination = {
  hideOnSinglePage: true,
  size: 'small',
  showLessItems: true
};
// 高级搜索框支持的所在位置列表
const filterAdvancedFixedList = [];

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const rowGuid = ref(null); //  父组件传入的参数GUID

  const leftSelectedRowKeys = ref([]); // 左侧表格选中行 id
  const rightSelectedRowKeys = ref([]); // 右侧表格选中行 id

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

  const leftGrid = useTableModel('/showcase/f10-demo/transfer-grid/left-datagrid-v2', {
    idField: 'id',
    requestType: 'restful', // 请求类型
    lazy: true, // 懒加载
    params: computed(() => {
      return {
        ...searchParams.data,
        transferToRightKeys: transferToRightKeys.value,
        optTimes: optTimes.value,
        extendConditions: [
          {
            path: 'rowGuid',
            type: rowGuid.value ? 'EQ' : 'NQ',
            value: rowGuid.value
          }
        ]
      };
    })
  });

  // 给 initSecurityConfig 请求的 securityConfigParams 参数
  const securityConfig = {
    // apiUrl: 'rest/frameuserlist/addUser'
  };

  return {
    global: { pageConfig, securityConfig }, // 全局模型
    models: {
      rowGuid, //  GUID
      searchParams, // 页面搜索条件模型
      leftSelectedRowKeys, // 左侧 表格选中行 ID 列表
      leftGridList: leftGrid, // 左侧表格数据模型
      rightSelectedRowKeys // 右侧 表格选中行 ID 列表
    }
  };
});

const { leftGridList } = model;

// 解决第二次进入页面表格样式错乱的问题，根源是 keep-alive缓存列宽不会重新计算导致的
const leftTableKey = ref(0);
const rightTableKey = ref(0);
// 表格引用
const leftTableRef = ref(null);
const rightTableRef = ref(null);

// 表格加载中
const isGridLoading = computed(() => model.leftGridList.loading);
const isLeftNotSelected = computed(() => model.leftSelectedRowKeys.length === 0);
const isRightNotSelected = computed(() => model.rightSelectedRowKeys.length === 0);

// 搜索操作符列表
const operationsList = [
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
];
// 工具栏搜索配置
const leftSearchList = ref([
  {
    label: '全部',
    field: 'searchField',
    fieldType: 'string',
    type: 'mixSearch', // 复合搜索 搜索按钮
    default: true,
    operation: 'LIKE',
    operations: operationsList,
    data: [
      { label: '单位', value: 'workplace' },
      { label: '报价', value: 'quotedPrice' },
      { label: '单价', value: 'unitPrice' }
    ]
  },
  {
    label: '报价',
    field: 'quotedPrice',
    default: true,
    type: 'input-number',
    operation: 'EQ', //
    operations: operationsList
  },
  {
    label: '单价',
    field: 'unitPrice',
    default: true,
    type: 'input-number',
    operation: 'EQ', //
    operations: operationsList
  }
]);

// 高级搜索回调
const onAdvanceSearch = (params) => {
  // 更新搜索参数模型
  model.searchParams.update(params);
};

// 从右侧列表中删除,放入左侧列表
const toLeft = () => {
  if (model.rightSelectedRowKeys.length === 0) {
    return;
  }

  // 从右侧删除后的新数组
  const newRows = filterByIds(model.rightSelectedRowKeys, rightTableData.value, true);

  // 第一次操作的时候将defaultRightKeys更新入transferToRightKeys
  updateTransferToRightKeysOnFirst('toLeft', newRows);

  // 删除右侧列表中选中的行的key
  transferToRightKeys.value = removeIdsFromTargetKeys(transferToRightKeys.value, model.rightSelectedRowKeys);

  // 删除右侧列表中选中的行
  rightTableData.value = newRows;

  // 重新渲染表格(触发重新渲染分页，避免页码标签dom过宽导致换行)
  leftTableKey.value++;
  rightTableKey.value++;

  nextTick(() => {
    // 更新右侧的选中列表
    model.rightSelectedRowKeys = transferToRightKeys.value;
  });
};

// 从左侧列表选中,放入右侧列表
const toRight = () => {
  if (model.leftSelectedRowKeys.length === 0) {
    return;
  }

  // 第一次操作的时候将defaultRightKeys更新入transferToRightKeys
  updateTransferToRightKeysOnFirst('toRight');

  // 将左侧列表中选中的行的key 插入到最前面
  transferToRightKeys.value = insertUniqueKeysToFront(transferToRightKeys.value, model.leftSelectedRowKeys);

  // 获取新选中的行
  const newRows = filterByIds(model.leftSelectedRowKeys, leftGridList.data.list, false);

  // 将新选中的行 插入到到右侧列表最前面
  rightTableData.value = newRows.concat(rightTableData.value);

  // 重新渲染表格(触发重新渲染分页，避免页码标签dom过宽导致换行)
  leftTableKey.value++;
  rightTableKey.value++;
};

const leftSelectedChange = (selectedRowKeys, selectedRows) => {
  // 绑定了rowSelection之后v-model:selectedRowKeys="model.leftSelectedRowKeys"便失效
  // 因此需要以下逻辑处理选中项的变更
  model.leftSelectedRowKeys = selectedRowKeys;

  if (!props.autoTransfer) {
    return;
  }
  // 为优化体验，延迟50ms
  setTimeout(() => {
    toRight();
  }, 50);
};

const rightSelectedChange = (selectedRowKeys, selectedRows) => {
  // 绑定了rowSelection之后v-model:selectedRowKeys="model.leftSelectedRowKeys"便失效
  // 因此需要以下逻辑处理选中项的变更
  model.rightSelectedRowKeys = selectedRowKeys;

  if (!props.autoTransfer) {
    return;
  }
  // 为优化体验，延迟50ms
  setTimeout(() => {
    toLeft();
  }, 50);
};

// 重置
const resetSelected = () => {
  EMessageBox.confirm('确定要重置到初始状态吗？', '警告', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then((data) => {
      // 重置选中的key
      transferToRightKeys.value = defaultRightKeys.value;
      // 重置右侧列表
      rightTableData.value = defaultRightRows.value;
      EMessage({
        message: '已重置',
        type: 'success'
      });
    })
    .catch(() => {
      // 用户取消了重置操作
    });
};

// 表格行
const columnList = ref([
  {
    title: '单位',
    dataIndex: 'workplace',
    ellipsis: true, // 内容过长显示省略号
    sorter: false // 是否启用排序功能
  },
  {
    title: '报价(元)',
    dataIndex: 'quotedPrice',
    width: 110,
    ellipsis: true, // 内容过长显示省略号
    sorter: true // 是否启用排序功能
  },
  {
    title: '单价(元/件)',
    dataIndex: 'unitPrice',
    width: 120,
    ellipsis: true, // 内容过长显示省略号
    sorter: true // 是否启用排序功能
  }
]);

/**
 * 在页面第一次加载时将右侧列表默认选中数据放到defaultRightRows中传递给前台，
 * 此时如果直接更新transferToRightKeys.value，会触发leftGridList刷新，导致左侧列表刷新（用户就会看到列表刷新2次），
 * 用户体验不好。所以在用户第一次操作的时候将defaultRightRows（以及第一次操作后的真实数据一起）更新到
 * transferToRightKeys.value中，这样就避免了刷新2次，节省资源，且体验更好。
 * 备注：在初始化是使用watch检测的方案无法避免列表刷新2次的问题
 */
// 第一次操作的时候更新transferToRightKeys.value
const updateTransferToRightKeysOnFirst = (type, newRows) => {
  // 是否为第一次操作
  if (optTimes.value <= 0) {
    // 向右侧添加
    if (type === 'toLeft') {
      // 第一次删除的时候 更新transferToRightKeys.value
      const newKeys = newRows.map((item) => item.id);
      if (transferToRightKeys.value.length <= 0) {
        transferToRightKeys.value = newKeys.concat(transferToRightKeys.value);
      }

      // 向左侧添加（从右侧删除）
    } else if (type === 'toRight') {
      // 第一次添加的时候 更新transferToRightKeys.value
      if (transferToRightKeys.value.length <= 0) {
        transferToRightKeys.value = leftGridList.data.defaultRightKeys.concat(transferToRightKeys.value);
      }
    }
  }
  optTimes.value++;
};

/**
 * 将selectedRowKeys中有且toRightKeys中没有的ID按顺序插入toRightKeys最前面
 * @param {string[]} toRightKeys - 目标数组（需插入的数组）
 * @param {string[]} selectedRowKeys - 源ID数组（需提取的ID来源）
 * @returns {string[]} 处理后的新数组，所有ID均为字符串类型
 *
 * @example
 * insertUniqueKeysToFront(['2', '3'], ['4', '5'])
 * 返回: ['4', '5', '2', '3']
 */
const insertUniqueKeysToFront = (toRightKeys, selectedRowKeys) => {
  // 1. 容错处理：确保入参是数组，非数组转为空数组；并统一转为字符串（避免数字ID）
  const safeToRight = Array.isArray(toRightKeys) ? toRightKeys.map((key) => String(key)) : [];
  const safeSelected = Array.isArray(selectedRowKeys) ? selectedRowKeys.map((key) => String(key)) : [];

  // 2. 将toRightKeys转为Set，用于快速查找（O(1)效率）
  const toRightSet = new Set(safeToRight);

  // 3. 筛选：selectedRowKeys中有、toRightKeys中没有的ID（保留原有顺序）
  const uniqueKeys = safeSelected.filter((key) => !toRightSet.has(key));

  // 4. 清理toRightKeys中已存在于uniqueKeys的ID（避免重复）
  const uniqueToRightSet = new Set(uniqueKeys);
  const cleanedToRight = safeToRight.filter((key) => !uniqueToRightSet.has(key));

  // 5. 合并：uniqueKeys在前，清理后的toRightKeys在后
  const result = [...uniqueKeys, ...cleanedToRight];

  return result;
};

/**
 * 从targetKeys数组中删除所有在delKeys数组中出现的id（生成新数组，不修改原数组）
 * @param {(string|number)[]} targetKeys - 源id数组
 * @param {(string|number)[]} delKeys - 需删除的id数组
 * @returns {string[]} 过滤后的新数组，无符合条件则返回空数组
 *
 * @example
 * removeIdsFromTargetKeys(['4', '5', '6', '7', '2', '3'], ['5', '2'])
 * 返回: ['4', '6', '7', '3']
 */
const removeIdsFromTargetKeys = (targetKeys, delKeys) => {
  // 容错处理：确保入参是数组，非数组转为空数组；统一转为字符串类型
  const safeTarget = Array.isArray(targetKeys) ? targetKeys.map((key) => String(key)) : [];
  const safeDel = Array.isArray(delKeys) ? delKeys.map((key) => String(key)) : [];

  // 将delKeys转为Set，提升查找效率
  const delSet = new Set(safeDel);

  // 过滤targetKeys：保留不在delKeys中的id
  const filteredTarget = safeTarget.filter((id) => !delSet.has(id));

  return filteredTarget;
};

/**
 * 过滤对象数组arr，根据excluded参数决定保留/排除ids中的id对应的对象
 * @param {string[]} ids - 目标id字符串数组（如 ["1", "2"]）
 * @param {Array<Object>} arr - 待过滤的对象数组（每个对象含id、name等属性）
 * @param {boolean} [excluded=true] - true：排除ids中的id；false：仅保留ids中的id
 * @returns {Array<Object>} 过滤后的新数组，无符合条件的对象则返回空数组
 *
 * @example
 * filterByIds(
 * ['3'],
 * [{
        id: "2",
        workplace: "子通律观它公司",
        quotedPrice: 39371,
        unitPrice: 1415,
    },
    {
        id: "3",
        workplace: "山团将之公司",
        quotedPrice: 19057,
        unitPrice: 1087,
    },
    {
        id: "4",
        workplace: "正面离长公司",
        quotedPrice: 27703,
        unitPrice: 1707,
    }],
 * true
 * )
 * 返回:
 * [{
        id: "2",
        workplace: "子通律观它公司",
        quotedPrice: 39371,
        unitPrice: 1415,
    },
    {
        id: "4",
        workplace: "正面离长公司",
        quotedPrice: 27703,
        unitPrice: 1707,
    }]
 */
const filterByIds = (ids, arr, excluded = true) => {
  // 1. 容错处理：确保入参是合法数组，非数组转为空数组
  const safeIds = Array.isArray(ids) ? ids : [];
  const safeArr = Array.isArray(arr) ? arr : [];

  // 2. 将ids转为Set（提升查找效率，数据量大时优势明显）
  const idSet = new Set(safeIds);

  // 3. 核心过滤逻辑：根据excluded切换保留/排除规则
  const filteredArr = safeArr.filter((item) => {
    // 排除id为undefined/null的情况（统一处理：无有效id时，excluded=true则保留，false则过滤）
    if (item?.id === undefined || item.id === null) {
      return excluded;
    }
    // 统一将对象id转为字符串，避免数字/字符串id匹配不一致
    const itemId = String(item.id);
    const isInIds = idSet.has(itemId);

    // excluded=true：排除ids中的id（保留!isInIds）；excluded=false：保留ids中的id（保留isInIds）
    return excluded ? !isInIds : isInIds;
  });

  return filteredArr;
};

// 监听 GUID 变化，刷新表单数据
watch(
  () => props.rowGuid,
  (newVal) => {
    model.rowGuid = newVal;
  },
  {
    immediate: true
  }
);

// 监听 data 变化
watch(
  () => model.leftGridList.data,
  (newVal) => {
    rightTableData.value = newVal.defaultRightRows || [];
    defaultRightRows.value = newVal.defaultRightRows || [];
  },
  {
    once: true,
    deep: true
  }
);

// 底部按钮
const footerBtnList = [
  {
    type: 'default',
    content: '取消',
    onClick: async () => {
      EMessage({
        message: '取消！',
        type: 'success'
      });
      closeDialog();
    }
  },
  {
    type: 'primary',
    content: '确认',
    onClick: async () => {
      EMessage({
        message: '确认！',
        type: 'success'
      });
      closeDialog(JSON.stringify({ action: 'save', data: rightTableData.value }));
      Utils.logger.info('选中数据：', rightTableData.value);
    }
  }
];

/**
 * 刷新弹窗内容
 */
const refreshDialog = async () => {
  transferToRightKeys.value = [];
  defaultRightKeys.value = [];
  defaultRightRows.value = [];
  rightTableData.value = [];
  optTimes.value = 0;
  model.leftSelectedRowKeys = [];
  model.rightSelectedRowKeys = [];
  leftTableKey.value++;
  rightTableKey.value++;

  const latestData = (await model.leftGridList.refresh()) || model.leftGridList.data || {};
  defaultRightKeys.value = latestData.defaultRightKeys || [];
  defaultRightRows.value = latestData.defaultRightRows || [];
  rightTableData.value = latestData.defaultRightRows || [];
};

// 初始化数据
onMounted(() => {
  model.methods.initData();
});

onActivated(() => {
  leftTableKey.value++;
  rightTableKey.value++;
});
</script>

<style lang="scss" scoped>
.grid-transfer-panel {
  width: calc((100% - 2 * var(--e-size-base)) / 2);

  .e-button + .e-button {
    margin-left: var(--e-space-m);
  }
}

.grid-transfer-buttons {
  .e-button {
    margin-left: 0;
  }
}

:deep(.grid-transfer-panel) {
  .e-pagination__options-size-changer {
    width: 85px;
  }

  .e-toolbar-filter__content {
    .e-button.search-icon {
      padding: 0;
      .e-icon {

        background: url('./images/icon-search.svg') center no-repeat;
        svg {
          display: none;
        }
      }
    }

    .e-button.advance-btn {
      padding: 0;
      .e-icon {
        background: url('./images/icon-advance.svg') center no-repeat;
        svg {
          display: none;
        }
      }
    }
  }
}

// 删除按钮hover高亮
.e-button--danger.is-text:not(.is-disabled):hover{
  background-color: var(--e-color-danger-light-9);
}
</style>
