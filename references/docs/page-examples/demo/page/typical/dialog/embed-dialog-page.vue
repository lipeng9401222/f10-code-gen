<template>
  <ep-layout-manager class="eui-page" :top-config="{ contentClass: 'eui-top-section', showDivider: false }">
    <template #top>
      <e-toolbar button-position="right">
        <template #title>
          <div class="flex gap-m widget-title">
            <e-button link :icon="ArrowLeft" @click="back" />
            <span>页面标题</span>
          </div>
        </template>
        <template #button>
          <e-toolbar-btns :items="toolbarBtnList" configurable config-id="toolbar-btns" />
        </template>
        <template #actions>
          <e-button-group>
            <e-button text>
              <e-icon size="16">
                <ChatMessage />
              </e-icon>
            </e-button>
            <e-button text>
              <e-icon size="16">
                <SystemComponents />
              </e-icon>
            </e-button>
            <e-button text>
              <e-icon size="16">
                <MoreFilled />
              </e-icon>
            </e-button>
          </e-button-group>
        </template>
      </e-toolbar>
    </template>
    <template #main>
      <div class="eui-main-section">
        <e-scrollbar>
          <ep-form
            ref="formRef"
            class="eui-form"
            :model="formModel.data"
            :security-config="model.global.securityConfig"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
            label-position="top"
          >
            <e-collapse v-model="activeItems" :show-arrow="false">
              <e-collapse-item id="1" title="公告信息" class="overflow-hidden">
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
              <e-collapse-item id="2" title="更新时间" class="overflow-hidden">
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
              <e-collapse-item id="3" title="更新内容" class="overflow-hidden">
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
import { Hooks, Utils } from '@epframe/eui-core';
import { ArrowLeft, MoreFilled, ChatMessage, SystemComponents } from '@epoint-fe/eui-icons';
import { request } from '@epoint-fe/utils';
import { inject, ref } from 'vue';

const { createSubModel, defineDataModel } = Utils;
const { useValidation } = Hooks;
const { validate } = useValidation();

const getCurrentModal = inject('getCurrentModal');

const back = () => {
  getCurrentModal?.()?.close();
};

const activeItems = ref(['1', '2', '3']);

const noticeSystemOptions = [
  { label: '前台用户系统', value: 'frontend' },
  { label: '后台管理系统', value: 'backend' },
  { label: '移动端系统', value: 'mobile' }
];

const model = defineDataModel(() => {
  // 工单头部只读信息
  const workItemModel = createSubModel(
    {
      workOrderNo: '',
      type: '',
      createTime: '',
      submitter: '',
      description: '',
      emergency: '',
      emergencyType: ''
    },
    {
      refresh: async () => {
        return await request({
          url: `/showcase/f10-demo/summary-layout/work-item`
        });
      }
    }
  );

  // 表单数据模型
  const formModel = createSubModel(
    {
      noticeTitle: '',
      noticeContent: '',
      noticeStartTime: undefined,
      noticeEndTime: undefined,
      noticeSystems: ['frontend', 'backend'],
      updateStartTime: undefined,
      updateEndTime: undefined,
      remark: '',
      updateDetail: ''
    },
    {
      refresh: async () => {
        return await request({
          url: `/showcase/f10-demo/summary-layout/form`
        });
      },
      saveForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/summary-layout/form`,
          data: {
            entities: [formData],
            type: 'saveForm'
          }
        });
      },
      submitForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/summary-layout/form`,
          data: {
            entities: [formData],
            type: 'submitForm'
          }
        });
      }
    }
  );

  return {
    global: {
      securityConfig: { apiUrl: 'rest/announcement/addAnnouncement' }
    },
    models: { workItemModel, formModel }
  };
});

const { workItemModel, formModel } = model;

const toolbarBtnList = ref([{ content: '主要按钮', type: 'primary' }, { content: '次要按钮' }, { content: '更多' }]);
</script>
