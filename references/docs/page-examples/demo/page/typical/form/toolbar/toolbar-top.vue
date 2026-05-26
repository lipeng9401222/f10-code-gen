<template>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :top-config="{ contentClass: 'mb-m', showDivider: false }">
    <template #top>
      <e-toolbar class="p-0" button-position="right" filter-block filter-position="left">
        <template #title>
          <span>工单编号：{{ workItemModel.data.workOrderNo }}</span>
        </template>
        <template #button>
          <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="2" config-id="toolbar-btns" />
        </template>
        <template #actions>
          <e-button-group>
            <e-tooltip content="按钮提示文字">
              <e-button text>
                <e-icon size="16">
                  <ChatMessage />
                </e-icon>
              </e-button>
            </e-tooltip>
            <e-tooltip content="按钮提示文字">
              <e-button text>
                <e-icon size="16">
                  <SystemComponents />
                </e-icon>
              </e-button>
            </e-tooltip>
            <e-tooltip content="更多">
              <e-button text>
                <e-icon size="16">
                  <MoreFilled />
                </e-icon>
              </e-button>
            </e-tooltip>
          </e-button-group>
        </template>
        <template #filter>
          <div class="eui-header-summary">
            <span class="summary-item" v-if="!Utils.isEmpty(workItemModel.data.emergency)">
              <e-tag :type="workItemModel.data.emergencyType" round effect="dark">{{ workItemModel.data.emergency }}</e-tag>
            </span>
            <span class="summary-item">
              所属应用：<span>{{ workItemModel.data.type }}</span>
            </span>
            <span class="summary-item">
              创建时间：<span>{{ workItemModel.data.createTime }}</span>
            </span>
            <span class="summary-item">
              提交人：<span>{{ workItemModel.data.sponsor }}</span>
            </span>
            <e-button text type="primary" @click="isExpanded = !isExpanded">
              {{ isExpanded ? '收起' : '更多' }}
              <e-icon>
                <component :is="isExpanded ? CaretTop : CaretBottom" />
              </e-icon>
            </e-button>
          </div>
        </template>
      </e-toolbar>
    </template>
    <template #main>
      <div class="eui-main-section bg-transparent rounded-t">
        <e-scrollbar wrap-class="h-full" view-class="min-h-full flex flex-col">
          <e-collapse-transition>
            <ep-form class="eui-form eui-sub-section" :model="workItemModel.data" filled v-if="isExpanded">
              <ep-form-layout :gutter="40">
                <ep-form-item label="所属应用" prop="type" :span="12">
                  <ep-output :value="workItemModel.data.type" />
                </ep-form-item>
                <ep-form-item label="创建时间" prop="createTime" :span="12">
                  <ep-output :value="workItemModel.data.createTime" />
                </ep-form-item>
                <ep-form-item label="提交人" prop="submitter" :span="12">
                  <ep-output :value="workItemModel.data.submitter" />
                </ep-form-item>
                <ep-form-item label="优先级" prop="emergency" :span="12">
                  <ep-output :value="workItemModel.data.emergency" />
                </ep-form-item>
                <ep-form-item label="详细诉求" prop="description">
                  <ep-output :value="workItemModel.data.description" />
                </ep-form-item>
              </ep-form-layout>
            </ep-form>
          </e-collapse-transition>

          <ep-form
            class="eui-form eui-sub-section rounded-t flex-1"
            ref="formRef"
            :model="formModel.data"
            :security-config="model.global.securityConfig"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
            label-position="top"
          >
            <e-collapse v-model="activeItems" :show-arrow="false">
              <e-collapse-item id="1" title="公告信息">
                <ep-form-layout :gutter="40">
                  <ep-form-item label="公告标题" prop="noticeTitle">
                    <ep-input v-model="formModel.data.noticeTitle" placeholder="请输入" />
                  </ep-form-item>

                  <ep-form-item label="公告内容" prop="noticeContent">
                    <ep-input v-model="formModel.data.noticeContent" type="textarea" :rows="5" placeholder="请输入" />
                  </ep-form-item>

                  <ep-form-item label="通知开始时间" prop="noticeStartTime" :span="12">
                    <ep-date-picker v-model="formModel.data.noticeStartTime" type="datetime" placeholder="请选择" />
                  </ep-form-item>
                  <ep-form-item label="通知结束时间" prop="noticeEndTime" :span="12">
                    <ep-date-picker v-model="formModel.data.noticeEndTime" type="datetime" placeholder="请选择" />
                  </ep-form-item>

                  <ep-form-item label="通知系统/平台" prop="noticeSystems">
                    <ep-select v-model="formModel.data.noticeSystems" :options="noticeSystemOptions" multiple placeholder="请选择" />
                  </ep-form-item>
                </ep-form-layout>
              </e-collapse-item>
              <e-collapse-item id="2" title="更新时间">
                <ep-form-layout :gutter="40">
                  <ep-form-item label="更新开始时间" prop="updateStartTime" :span="12">
                    <ep-date-picker v-model="formModel.data.updateStartTime" type="datetime" placeholder="请选择" />
                  </ep-form-item>
                  <ep-form-item label="更新结束时间" prop="updateEndTime" :span="12">
                    <ep-date-picker v-model="formModel.data.updateEndTime" type="datetime" placeholder="请选择" />
                  </ep-form-item>
                  <ep-form-item label="备注说明" prop="remark">
                    <ep-input v-model="formModel.data.remark" type="textarea" :rows="3" placeholder="请输入" />
                  </ep-form-item>
                </ep-form-layout>
              </e-collapse-item>
              <e-collapse-item id="3" title="更新内容">
                <ep-form-item label="更新详细内容" prop="updateDetail">
                  <ep-input v-model="formModel.data.updateDetail" type="textarea" :rows="5" placeholder="请输入" />
                </ep-form-item>
              </e-collapse-item>
            </e-collapse>
          </ep-form>
        </e-scrollbar>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { EpLayoutManager, Hooks, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';
import { MoreFilled, CaretBottom, CaretTop, ChatMessage, SystemComponents } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'ToolbarTop'
});

// 展开收起顶部表单
const isExpanded = ref(false);

const { createSubModel, defineDataModel, request } = Utils;
const { useValidation, useListModel } = Hooks;
const { validate } = useValidation();

// 表单
const formRef = ref(null);
// 折叠面板展开项
const activeItems = ref(['1', '2']);

// 定义 props传参
const props = defineProps({
  rowGuid: { type: String, default: '' }
});

const model = defineDataModel(() => {
  // 工单类型 下拉列表
  const workOrderTypeList = useListModel('/showcase/f10-demo/toolbar-top/workOrderType', {
    labelField: 'label',
    lazy: false
  });
  // 所属部门 下拉列表
  const departmentList = useListModel('/showcase/f10-demo/toolbar-top/department', {
    labelField: 'label',
    lazy: false
  });
  // 是否在职 下拉列表
  const inServiceList = useListModel('/showcase/f10-demo/toolbar-top/inService', {
    labelField: 'label',
    lazy: false
  });

  // 工单头部只读信息
  const workItemModel = createSubModel(
    {
      workOrderNo: '',
      type: '',
      createTime: '',
      sponsor: '',
      description: '',
      emergency: '',
      emergencyType: ''
    },
    {
      refresh: async () => {
        return await request({
          url: `/showcase/f10-demo/toolbar-top/work-item`,
          data: {
            guid: props.rowGuid
          }
        });
      }
    }
  );

  // 表单数据模型
  const formModel = createSubModel(
    {
      workOrderContent: '',
      workOrderType: null,
      registerDate: undefined,
      processDate: undefined,
      suggest: undefined,
      remark: undefined,
      sponsor: '',
      sponsorPhone: '',
      department: null,
      inService: null
    },
    {
      refresh: async () => {
        return await request({
          url: `/showcase/f10-demo/toolbar-top/form`,
          data: {
            guid: props.rowGuid
          }
        });
      },
      saveForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/toolbar-top/form`,
          data: {
            entities: [formData],
            type: 'saveForm',
            guid: props.rowGuid
          }
        });
      },
      submitForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/toolbar-top/form`,
          data: {
            entities: [formData],
            type: 'submitForm',
            guid: props.rowGuid
          }
        });
      }
    }
  );

  return {
    global: {
      securityConfig: { apiUrl: 'rest/frameuserlist/addUser' }
    },
    models: {
      workItemModel,
      workOrderTypeList,
      departmentList,
      inServiceList,
      formModel
    }
  };
});

const { workItemModel, workOrderTypeList, departmentList, inServiceList, formModel } = model;

// 更新表单
watch(
  () => props.rowGuid,
  () => {
    model.workItemModel.refresh();
    model.formModel.refresh();
  },
  { immediate: true }
);

const onSave = async () => {
  await formModel.saveForm({ formData: formModel.data });
  EMessage.success('暂存成功！');
};

// 提交
const onSubmit = async () => {
  const isValid = await validate(formRef);
  if (!isValid) {
    return;
  }

  // 执行更新
  formModel.submitForm({ formData: formModel.data }).then(() => {
    EMessage({
      message: '提交成功！',
      type: 'success'
    });
  });
};

// 工具栏按钮配置
const toolbarBtnsRef = ref(null);
const toolbarBtnList = [
  {
    type: 'primary',
    onClick: onSubmit,
    content: '批准'
  },
  {
    type: 'default',
    content: '转交'
  },
  {
    type: 'default',
    content: '退回'
  },
  {
    type: 'default',
    onClick: onSave,
    content: '暂存'
  }
];

onMounted(() => {
  model.methods.initData();
});
</script>

<style scoped lang="scss"></style>
