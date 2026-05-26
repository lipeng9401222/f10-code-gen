<template>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :left-config="leftConfig" :top-config="{ contentClass: 'eui-top-section', showDivider: false }">
    <template #top>
      <e-toolbar title-block>
        <template #title>
          <e-toolbar-title title="分区结构" />
        </template>
        <template #button>
          <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="4" config-id="toolbar-btns" />
        </template>
        <template #actions>
          <e-button-group>
            <e-toolbar-more :table-ref="tableRef" :model="model" :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'" />
          </e-button-group>
        </template>
        <template #filter="{ opened }">
          <e-toolbar-search
            class="toolbar-search"
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
      <div class="eui-sub-section rounded rounded-l side-container">
        <div class="side-list">
          <e-scrollbar>
            <div class="side-list-wrap" v-show="model.leftList.data.total > 0">
              <div class="side-item" :class="{ active: model.selectId === item.id }" v-for="item in model.leftList.data.data" :key="item.id" @click="leftListClick(item)">
                <img class="item-img" src="@/assets/list/list-ico.png" />
                <div class="item-content">
                  <div class="item-title">{{ item.name }}</div>
                  <div class="item-desc">
                    <e-text class="item-desc-text">{{ item.dateTime }}</e-text>
                    <e-text class="item-desc-line" />
                    <e-text class="item-desc-text">{{ item.adrs }}</e-text>
                    <e-text class="item-desc-line" />
                    <e-text class="item-desc-text">线上ID：{{ item.onlineId }}</e-text>
                  </div>
                </div>
              </div>
            </div>
            <e-empty class="flex-auto" v-show="model.leftList.data.total <= 0" description="暂无数据" />
          </e-scrollbar>
          <div class="side-list-paginate">
            <e-pagination size="small" :total="model.leftList.data.total" show-size-changer :current="model.page" :page-size="model.pageSize" :show-quick-jumper="false" @change="listPageChanged" />
          </div>
        </div>
      </div>
    </template>
    <template #main>
      <div class="eui-main-section rounded-r">
        <e-scrollbar v-show="model.selectId">
          <ep-form
            ref="formRef"
            class="p-xxl"
            :model="model.rightForm.data"
            :security-config="model.global.securityConfig"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
            label-position="top"
          >
            <div class="section-title mb-l flex justify-between">
              工单信息
              <span class="text-base text-secondary cursor-pointer fw-normal flex items-center" @click="showFormBlock1 = !showFormBlock1">
                {{ showFormBlock1 ? '收起' : '展开' }}
                <e-icon v-show="!showFormBlock1" class="ml-s text-third"><ChevronDownDouble /></e-icon>
                <e-icon v-show="showFormBlock1" class="ml-s text-third"><ChevronUpDouble /></e-icon>
              </span>
            </div>
            <div class="form-block" v-show="showFormBlock1">
              <ep-form-item label="工单内容" prop="content">
                <e-input v-model="model.rightForm.data.content" placeholder="请输入" />
              </ep-form-item>
              <e-row :gutter="40">
                <e-col :span="8">
                  <ep-form-item label="工单类型" prop="type">
                    <ep-select v-model="model.rightForm.data.type" :options="model.typeList.data" placeholder="请选择" />
                  </ep-form-item>
                </e-col>
                <e-col :span="8">
                  <ep-form-item label="工单登记日期" prop="registerDate">
                    <ep-input v-model="model.rightForm.data.registerDate" placeholder="请输入" />
                  </ep-form-item>
                </e-col>
                <e-col :span="8">
                  <ep-form-item label="工单处理日期" prop="handleDate">
                    <ep-input v-model="model.rightForm.data.handleDate" placeholder="请输入" />
                  </ep-form-item>
                </e-col>
              </e-row>
              <ep-form-item label="建议内容" prop="suggestion">
                <ep-input v-model="model.rightForm.data.suggestion" type="textarea" :rows="3" placeholder="请输入" />
              </ep-form-item>
              <ep-form-item label="备注说明" prop="remark">
                <ep-input v-model="model.rightForm.data.remark" type="textarea" :rows="3" placeholder="请输入" />
              </ep-form-item>
            </div>
            <div class="section-title mb-l flex justify-between">
              身份信息
              <span class="text-base text-secondary cursor-pointer fw-normal flex items-center" @click="showFormBlock2 = !showFormBlock2">
                {{ showFormBlock2 ? '收起' : '展开' }}
                <e-icon v-show="!showFormBlock2" class="ml-s text-third"><ChevronDownDouble /></e-icon>
                <e-icon v-show="showFormBlock2" class="ml-s text-third"><ChevronUpDouble /></e-icon>
              </span>
            </div>
            <div class="form-block" v-show="showFormBlock2">
              <e-row :gutter="40">
                <e-col :span="12">
                  <ep-form-item label="发起人姓名" prop="name">
                    <ep-input v-model="model.rightForm.data.name" placeholder="请输入" />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item label="发起人手机号" prop="phone">
                    <ep-input v-model="model.rightForm.data.phone" placeholder="请输入" />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="40">
                <e-col :span="12">
                  <ep-form-item label="所属部门" prop="department">
                    <ep-tree-select v-model="model.rightForm.data.department" :data="model.departmentList.data" placeholder="请选择" />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item label="是否在职" prop="isEmployed">
                    <ep-select v-model="model.rightForm.data.isEmployed" :options="isEmployedOptions" placeholder="请输入" />
                  </ep-form-item>
                </e-col>
              </e-row>
            </div>
          </ep-form>
        </e-scrollbar>
        <e-empty class="h-full" v-show="!model.selectId" description="请选择数据" />
      </div>
    </template>
  </ep-layout-manager>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';
import { ChevronDownDouble, ChevronUpDouble } from '@epoint-fe/eui-icons';
import { EMessage } from '@epoint-fe/eui-components';

defineOptions({
  name: 'PartitionStructure'
});

const { useTableModel, useListModel, useTreeModel, useValidation } = Hooks;
const { createSubModel, PageConfig, request } = Utils;
const { validate } = useValidation();

// 左侧导航配置
const leftConfig = ref({
  enabled: true,
  defaultWidth: 356,
  toggle: false,
  resize: false
});
// 页面配置模型
const pageConfig = new PageConfig({});
// 定义数据模型
const model = Utils.defineDataModel(() => {
  const selectId = ''; // 选中ID
  const page = 1;
  const pageSize = 20;

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

  // 左侧列表数据模型
  const leftList = createSubModel(
    {
      data: [],
      total: 0
    },
    {
      refresh: async () => {
        const res = await request({
          url: `/showcase/f10-demo/partition-structure/partitionList`,
          data: {
            ...searchParams.data,
            page: model.page,
            pageSize: model.pageSize
          }
        });
        return res;
      }
    }
  );

  // 工单类型下拉列表数据模型
  const typeList = useListModel('/showcase/f10-demo/platformOptions', {
    labelField: 'label',
    lazy: false // 懒加载
  });

  // 所属单位下拉树数据模型
  const departmentList = useTreeModel('/showcase/f10-demo/partition-structure/departmentTree', {
    requestType: 'restful', // 请求类型
    lazy: false // 懒加载
  });

  // 右侧表单数据模型
  const rightForm = createSubModel(
    {
      content: '',
      type: '',
      registerDate: '',
      handleDate: '',
      suggestion: '',
      remark: '',
      name: '',
      phone: '',
      department: '',
      isEmployed: ''
    },
    {
      refresh: async () => {
        const res = await request({
          url: `/showcase/f10-demo/partition-structure/partitionForm`,
          data: {
            id: model.selectId
          }
        });
        return res;
      },
      submitForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/partition-structure/submitForm`,
          data: {
            id: model.selectId,
            entities: [formData],
            type: 'complete'
          }
        });
      }
    }
  );

  return {
    global: {
      pageConfig,
      securityConfig: { apiUrl: 'rest/frameuserlist/addUser' }
    },
    models: {
      selectId,
      page,
      pageSize,
      searchParams, // 页面搜索条件模型
      reviewStateList, // 审核状态下拉列表数据模型
      leftList, // 左侧列表数据模型
      typeList, // 工单类型下拉列表数据模型
      departmentList, // 所属单位下拉树数据模型
      rightForm // 右侧表单数据模型
    }
  };
});

// 工具栏按钮相关方法
// 办结工单
const complete = async () => {
  const isValid = await validate(formRef);
  if (!isValid) return;
  await model.rightForm.submitForm({ formData: model.rightForm.data });
  EMessage.success('办结成功！');
};

// 转交工单
const transfer = () => {};

// 更多
const more = () => {};

// 工具栏按钮配置
const toolbarBtnsRef = ref(null);
const toolbarBtnList = ref([
  {
    type: 'primary',
    onClick: async () => complete(),
    content: '办结工单'
  },
  {
    type: 'default',
    onClick: async () => transfer(),
    content: '转交工单'
  },
  {
    type: 'default',
    onClick: async () => more(),
    content: '更多'
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
        { label: '日期范围', value: 'dateRange' },
        { label: '审核状态', value: 'reviewState' }
      ]
    },
    {
      label: '日期范围',
      field: 'dateRange',
      fieldType: 'string',
      default: true,
      type: 'rangeDatePicker',
      operation: 'EQ', //
      operations: operationsList.value
    },
    {
      label: '审核状态',
      field: 'reviewState',
      fieldType: 'string',
      type: 'select',
      dataType: 'select',
      default: true,
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

// 左侧列表分页回调
const listPageChanged = (page, pageSize) => {
  console.log('page', page, 'pageSize', pageSize);
  model.page = page;
  model.pageSize = pageSize;
  model.leftList.refresh();
};

// 左侧列表点击事件
const leftListClick = (item) => {
  model.selectId = item.id;
  model.rightForm.refresh();
};

// 表单状态、是否在职下拉参数定义
const formRef = ref(null);
const isEmployedOptions = [
  { label: '是', value: true },
  { label: '否', value: false }
];
const showFormBlock1 = ref(true);
const showFormBlock2 = ref(true);

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style lang="scss" scoped>
.side-container {
  height: 100%;
}
.side-list {
  display: flex;
  flex-direction: column;
  padding: var(--e-space-l) 0;
  height: 100%;
  .side-list-wrap {
    overflow: hidden;
    padding: 0 var(--e-space-l);
    flex: 1 1 auto;
    .side-item {
      display: flex;
      align-items: center;
      padding: var(--e-space-l);
      border-radius: var(--e-border-radius-small);
      cursor: pointer;
      border: 1px solid transparent;
      &:nth-last-child(n + 2) {
        margin-bottom: var(--e-space-l);
      }
      &:hover,
      &.active {
        border-color: var(--e-border-color-click);
      }
      .item-img {
        margin-right: var(--e-space-xl);
      }
      .item-content {
        flex: 1 1 0%;
        line-height: var(--e-font-line-height-base);
        overflow: hidden;
        .item-title {
          margin-bottom: var(--e-space-s);
          font-size: var(--e-font-size-medium);
          font-weight: var(--e-font-weight-medium);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .item-desc {
          color: var(--e-text-color-secondary);
          vertical-align: top;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          .item-desc-text {
            color: var(--e-text-color-secondary);
          }
          .item-desc-line {
            display: inline-block;
            width: 1px;
            height: 10px;
            background: var(--e-function-color-line);
            margin-left: var(--e-space-m);
            margin-right: var(--e-space-m);
          }
        }
      }
    }
  }
}
.side-list-paginate {
  display: flex;
  justify-content: flex-end;
  flex: none;
  margin-top: var(--e-space-l);
  margin-right: var(--e-space-l);
  overflow-x: hidden;
}
</style>
