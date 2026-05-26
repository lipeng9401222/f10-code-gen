<template>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :top-config="{ contentClass: 'mb-m', showDivider: false }" :bottom-config="{ contentClass: 'eui-bottom-section' }">
    <template #top>
      <e-toolbar class="p-0" title-block>
        <template #title>
          <e-toolbar-title title="工单编号：20248293920201899" />
        </template>
        <template #button>
          <div class="eui-header-summary">
            <span class="summary-item">
              <e-tag :type="workItemModel.data.emergencyType" round effect="dark" v-if="!Utils.isEmpty(workItemModel.data.emergency)">{{ workItemModel.data.emergency }}</e-tag>
            </span>
            <span class="summary-item"
              >所属应用：<span>{{ workItemModel.data.type }}</span></span
            >
            <span class="summary-item"
              >创建时间：<span>{{ workItemModel.data.createTime }}</span></span
            >
            <span class="summary-item"
              >提交人：<span>{{ workItemModel.data.submitter }}</span></span
            >
            <e-button text type="primary" @click="isExpanded = !isExpanded">
              {{ isExpanded ? '收起' : '更多' }}
              <e-icon>
                <component :is="isExpanded ? CaretTop : CaretBottom" />
              </e-icon>
            </e-button>
          </div>
        </template>
        <template #actions>
          <e-button-group>
            <e-toolbar-more :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'" />
          </e-button-group>
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
    <template #bottom>
      <e-toolbar button-position="right">
        <template #button>
          <e-toolbar-btns :items="footerBtnList" />
        </template>
      </e-toolbar>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { EpLayoutManager, Hooks, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';
import { Printer, MoreFilled, CaretBottom, CaretTop } from '@epoint-fe/eui-icons';

const isExpanded = ref(false);

const { createSubModel, defineDataModel, request } = Utils;
const { useValidation } = Hooks;
const { validate } = useValidation();

const formRef = ref(null);

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

const footerBtnList = ref([
  {
    type: 'default',
    content: '暂存',
    onClick: () => {
      onSave();
    }
  },
  {
    type: 'primary',
    content: '提交',
    onClick: () => {
      onSubmit();
    }
  }
]);

const onSave = async () => {
  await formModel.saveForm({ formData: formModel.data });
  EMessage.success('暂存成功！');
};

const onSubmit = async () => {
  const isValid = await validate(formRef);
  if (!isValid) return;

  await formModel.submitForm({ formData: formModel.data });
  EMessage.success('提交成功！');
};

onMounted(() => {
  model.methods.initData();
});
</script>

<style scoped lang="scss"></style>
