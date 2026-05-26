<template>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :top-config="{ contentClass: 'eui-top-section', showDivider: false }">
    <template #top>
      <e-toolbar title-block="false">
        <template #title>
          <span>宫格布局</span>
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
            config-url="/showcase/f10-demo/grid"
          />
          <e-divider direction="vertical" />
          <div class="inline-flex">
            <e-tooltip content="切换为表格视图" placement="top">
              <e-button :icon="ViewAgenda" text :type="viewType === 'table' ? 'primary' : ''" :bg="viewType === 'table'" size="small" @click="changeViewType('table')" />
            </e-tooltip>
            <e-tooltip content="切换为卡片视图" placement="top">
              <e-button class="ml-0" :icon="LayoutCardBold" text :type="viewType === 'card' ? 'primary' : ''" :bg="viewType === 'card'" size="small" @click="changeViewType('card')" />
            </e-tooltip>
          </div>
        </template>
      </e-toolbar>
    </template>

    <template #main>
      <div class="eui-main-section" :class="{ 'bg-transparent': viewType === 'card' }">
        <ep-data-grid
          ref="tableRef"
          class="eui-table custom-eui-table bg-transparent"
          :id-field="model.gridList.idField"
          :data="model.gridList.data"
          :total="model.gridList.total"
          :page-size="model.gridList.pageSize"
          :current="model.gridList.current"
          :columns="columnList"
          :loading="model.gridList.loading"
          :pagination="{
            current: model.gridList.current,
            pageSize: model.gridList.pageSize,
            total: model.gridList.total,
            showSizeChanger: true,
            showQuickJumper: true
          }"
          v-model:selectedRowKeys="model.selectedRowKeys"
          :view-type="viewType"
          card-auto-layout
          :show-index-column="true"
          :show-selection-column="true"
          :default-show-index="false"
          @change="model.gridList.change"
          @refresh="model.gridList.refresh"
          configurable
          config-id="datagrid"
          :key="tableKey"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'status'">
              <e-tag v-if="text >= 1" size="small" effect="Soft" :type="meetingStatusMap[text]?.cls" round class="text-primary">{{ meetingStatusMap[text]?.label || '' }}</e-tag>
              <span v-else>{{ text }}</span>
            </template>
            <template v-if="column.dataIndex === 'tag'">
              <e-tag v-for="item in text" :key="item" size="small" effect="plain" class="mr-m">
                {{ item }}
              </e-tag>
            </template>
          </template>
          <template #bodyRow="{ record, selectionNode, actionNode }">
            <e-card class="card-item flex flex-col py-xl" @click="onRowClick($event, record)" :title="cardTitle">
              <template #header>
                <div class="card-header h-sm flex justify-between items-center">
                  <div class="row-name w-lg text-lg flex-1 ellipsis" :title="record.name">{{ record.name }}</div>
                  <div v-if="showCardCheckbox">
                    <component class="card-selection" v-if="selectionNode" :is="selectionNode" />
                  </div>
                  <div class="col-action flex justify-center items-center">
                    <component v-if="actionNode" :is="actionNode" />
                  </div>
                </div>
              </template>
              <div class="card-body w-full flex justify-center items-center">
                <div class="w-full row-info flex-1">
                  <div class="w-full other-info text-base text-secondary">
                    <div class="w-full ellipsis leading-base">
                      <span :title="'会议时间：' + record.date">会议时间：{{ record.date }}</span>
                    </div>
                    <div class="mt-s w-full ellipsis leading-base">
                      <span :title="'地点：线下' + record.room">地点：线下{{ record.room }}</span>
                      <e-divider direction="vertical" />
                      <span :title="'线上ID：' + record.online_id">线上ID：{{ record.online_id }}</span>
                    </div>
                    <div class="col-status w-full flex justify-start items-center leading-base mt-s">
                      <span>状态：</span>
                      <div>
                        <e-tag v-if="record.status >= 1" size="small" effect="Soft" :type="meetingStatusMap[record.status]?.cls" round class="flex text-primary">{{
                          meetingStatusMap[record.status]?.label || ''
                        }}</e-tag>
                      </div>
                    </div>
                    <div class="col-status w-full flex justify-center items-center leading-base mt-s">
                      <span>标签：</span>
                      <e-tooltip :content="getTagLabel(record.tag)" placement="top">
                        <div class="flex-1 flex flex-nowrap overflow-hidden">
                          <e-tag v-for="item in record.tag" :key="item" size="small" effect="plain" class="mr-m">
                            {{ item }}
                          </e-tag>
                        </div>
                      </e-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </e-card>
          </template>
        </ep-data-grid>
      </div>
    </template>
  </ep-layout-manager>
</template>
<script setup>
import { ref, computed, onMounted, onActivated, reactive } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';
import { ViewAgenda, LayoutCardBold } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'Grid'
});

const { useTableModel, useListModel } = Hooks;
const { createSubModel, PageConfig } = Utils;

const cardTitle = ref('点击选中/取消选中卡片');
// 显示卡片复选框
const showCardCheckbox = ref(false);
// 表格视图 table,card
const viewType = ref('card');
// 表格视图切换 table,card
const changeViewType = (type) => {
  if (viewType.value === type) {
    EMessage({
      message: `已经是当前视图`,
      type: 'success'
    });
    return;
  }
  viewType.value = type;
  tableKey.value++;
};

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

  // 会议状态列表数据模型
  const meetingStatusList = useListModel('/showcase/f10-demo/meetingStatus', {
    labelField: 'label',
    lazy: false // 懒加载
  });

  // 表格数据模型
  const gridList = useTableModel('/showcase/f10-demo/card-grid', {
    idField: 'id',
    requestType: 'restful', // 请求类型
    lazy: false, // 懒加载
    params: computed(() => {
      return {
        ...searchParams.data
      };
    })
  });

  return {
    global: { pageConfig }, // 全局模型
    models: {
      searchParams, // 页面搜索条件模型
      meetingStatusList, // 会议状态列表数据模型
      selectedRowKeys, // 表格选中行 ID 列表
      gridList // 表格数据模型
    }
  };
});

// 工具栏按钮相关方法
// 是否选中某条数据
const isSelected = computed(() => model.selectedRowKeys.length > 0);

// 新增会议
const addMeeting = () => {
  EMessage({
    message: '新增会议',
    type: 'success'
  });
};
// 批量办结
const batchComplete = () => {
  EMessage({
    message: '批量办结',
    type: 'success'
  });
};

// 会议状态样式映射
const STATUS_CLASS_MAP = {
  1: 'success', // 待开始
  2: '', // 进行中
  3: 'info', // 已结束
  4: 'warning' // 取消
};

// 缓存会议状态标签
const meetingStatusMap = computed(() => {
  const map = {};
  model.meetingStatusList.data.forEach((item) => {
    map[item.value] = {
      ...item,
      cls: STATUS_CLASS_MAP[item.value] || ''
    };
  });
  return map;
});

// 工具栏按钮配置
const toolbarBtnsRef = ref(null);
const toolbarBtnList = [
  {
    type: 'primary',
    onClick: addMeeting,
    content: '新增会议'
  },
  {
    type: 'default',
    onClick: batchComplete,
    disabled: () => !isSelected.value,
    content: '批量办结'
  }
];
// 工具栏搜索相关方法
const toolbarSearchRef = ref(null);
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
const searchList = computed(() => {
  return [
    {
      label: '全部',
      field: 'searchField',
      fieldType: 'string',
      type: 'mixSearch', // 复合搜索 搜索按钮
      default: true,
      operation: 'LIKE',
      operations: operationsList,
      data: [
        { label: '截止时间', value: 'date' },
        { label: '发布状态', value: 'status' }
      ]
    },
    {
      label: '截止时间',
      field: 'date',
      default: true,
      type: 'datePicker',
      operation: 'EQ',
      operations: operationsList
    },
    {
      label: '发布状态',
      field: 'status',
      type: 'select',
      dataType: 'select',
      default: true,
      operation: 'EQ',
      operations: operationsList,
      data: model.meetingStatusList.data,
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
// 表格行
const columnList = ref([
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true, // 内容过长显示省略号
    sorter: true // 是否启用排序功能
  },
  {
    title: '会议时间',
    dataIndex: 'date',
    key: 'date',
    width: 150,
    ellipsis: true, // 内容过长显示省略号
    sorter: true // 是否启用排序功能
  },
  {
    title: '地点',
    dataIndex: 'room',
    key: 'room',
    width: 100,
    ellipsis: true
  },
  {
    title: '线上id',
    dataIndex: 'online_id',
    key: 'online_id',
    width: 150,
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    sorter: true // 是否启用排序功能
  },
  {
    title: '标签',
    dataIndex: 'tag',
    key: 'tag',
    width: 260,
    ellipsis: true
  },
  {
    dataIndex: 'action',
    key: 'action',
    title: '操作',
    width: 200,
    hidden: false,
    action: {
      asText: () => viewType.value !== 'card',
      maxCollapse: () => (viewType.value === 'card' ? 1 : 3),
      type: () => (viewType.value === 'card' ? 'default' : 'primary'),
      // 操作项列表
      items: [
        {
          label: '查看', // 操作项的文本标签
          // 操作项的点击事件处理函数
          onClick: (row) => {
            options(row, '查看');
          },
          // 操作项是否可见的判断函数
          visible: true,
          // 操作项是否禁用的判断函数
          disabled: false
        },
        {
          label: '设置', // 操作项的文本标签
          // 操作项的点击事件处理函数
          onClick: (row) => {
            options(row, '设置');
          },
          // 操作项是否可见的判断函数
          visible: true,
          // 操作项是否禁用的判断函数
          disabled: false
        },
        {
          label: '办结', // 操作项的文本标签
          // 操作项的点击事件处理函数
          onClick: (row) => {
            options(row, '办结');
          },
          // 操作项是否可见的判断函数
          visible: true,
          // 操作项是否禁用的判断函数
          disabled: true
        },
        {
          label: '删除', // 操作项的文本标签
          type: 'danger',
          // 操作项的点击事件处理函数
          onClick: (row) => {
            options(row, '删除');
          },
          // 操作项是否可见的判断函数
          visible: true,
          // 操作项是否禁用的判断函数
          disabled: false
        }
      ]
    }
  }
]);

// 操作
const options = (record, opt) => {
  Utils.logger.info(record, opt);
  EMessage({
    message: opt,
    type: 'success'
  });
};

const getTagLabel = (tag) => {
  return tag
    .map((item) => {
      return item;
    })
    .join('、');
};

// 选中/取消选中行
const onRowClick = (event, record) => {
  if (event.target.closest('.e-table__cell-actions')) {
    return;
  }
  if (model.selectedRowKeys.includes(record.id)) {
    const index = model.selectedRowKeys.indexOf(record.id);
    model.selectedRowKeys.splice(index, 1);
  } else {
    model.selectedRowKeys.push(record.id);
  }
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
.card-item {
  border: 1px solid transparent;

  .col-action {
    :deep(.e-button) {
      width: 28px;
      height: 28px;
      border-radius: 4px;

      &:hover {
        color: var(--e-color-primary);
        background: var(--e-function-color-click);
      }
    }
  }

  &:hover {
    border: 1px solid var(--e-color-primary);
  }
}

// 按钮颜色
.e-button.is-text:not(.is-disabled).is-has-bg {
  background-color: var(--e-color-primary-light-7);
}
</style>
