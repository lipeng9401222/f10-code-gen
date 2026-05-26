<template>
  <div class="eui-page">
    <ep-layout-manager class="eui-main-section" v-loading="model.global.state.loading" :bottom-config="{ contentClass: 'eui-bottom-section' }">
      <template #main>
        <e-scrollbar>
          <ep-form
            ref="formRef"
            class="eui-form"
            :label-position="'top'"
            :model="formModel.data"
            :security-config="model.global.securityConfig"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
          >
            <e-collapse v-model="activeItems">
              <e-collapse-item id="1">
                <template #index>
                  公告信息
                  <span class="text-danger text-base ml-xl fw-normal">系统级维护公告，请注意措辞表达严谨可信</span>
                </template>
                <ep-form-layout :gutter="40">
                  <ep-form-item label="公告标题" label-tooltip="公告标题" required prop="noticeTitle">
                    <ep-input v-model="formModel.data.noticeTitle" placeholder="请输入" />
                  </ep-form-item>
                  <ep-form-item label="公告内容" label-tooltip="公告内容" required prop="noticeContent">
                    <ep-input v-model="formModel.data.noticeContent" type="textarea" placeholder="请输入" />
                  </ep-form-item>
                  <ep-form-item label="通知开始时间" required prop="noticeStartTime" :span="12">
                    <ep-date-picker v-model="formModel.data.noticeStartTime" type="date" placeholder="请选择" />
                  </ep-form-item>
                  <ep-form-item label="通知结束时间" required prop="noticeEndTime" :span="12">
                    <ep-date-picker v-model="formModel.data.noticeEndTime" type="date" placeholder="请选择" />
                  </ep-form-item>
                  <ep-form-item label="通知系统/平台" required prop="systemPlatform">
                    <ep-select v-model="formModel.data.systemPlatform" :options="platformOptions.data" multiple placeholder="请选择" />
                  </ep-form-item>
                </ep-form-layout>
              </e-collapse-item>
              <e-collapse-item id="2">
                <template #index>
                  <div class="custom-collapse-head flex justify-between items-center">
                    <div class="flex items-center">
                      <span>更新时间</span>
                      <span class="text-info text-base ml-xl fw-normal">截止2025年12月</span>
                    </div>
                    <e-button class="mr-xl pb-xs fw-normal" type="primary" link @click="handleManage">管理</e-button>
                  </div>
                </template>
                <ep-form-layout :gutter="40">
                  <ep-form-item label="更新开始时间" required prop="updateStartTime" :span="12">
                    <ep-date-picker v-model="formModel.data.updateStartTime" type="date" placeholder="请选择" />
                  </ep-form-item>
                  <ep-form-item label="更新结束时间" required prop="updateEndTime" :span="12">
                    <ep-date-picker v-model="formModel.data.updateEndTime" type="date" placeholder="请选择" />
                  </ep-form-item>
                  <ep-form-item label="备注说明">
                    <ep-input v-model="formModel.data.remark" type="textarea" placeholder="请输入" />
                  </ep-form-item>
                </ep-form-layout>
              </e-collapse-item>
              <e-collapse-item id="3">
                <template #title>
                  更新内容
                  <span class="text-warning text-base ml-xl fw-normal">本次新增消息提示、会议提醒等功能</span>
                </template>
                <ep-form-item label="更新详细内容">
                  <ep-input v-model="formModel.data.updateContent" type="textarea" placeholder="请输入" />
                </ep-form-item>
              </e-collapse-item>
            </e-collapse>
          </ep-form>
        </e-scrollbar>
      </template>
      <template #bottom>
        <e-toolbar button-position="right">
          <template #button>
            <e-button @click="onSave">暂存</e-button>
            <e-button type="primary" @click="onSubmit">提交</e-button>
          </template>
        </e-toolbar>
      </template>
    </ep-layout-manager>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { EpLayoutManager, Utils, Hooks } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

defineOptions({
  name: 'GroupAccordion'
});

const { createSubModel, request } = Utils;
const { useListModel, useValidation } = Hooks;
const { validate } = useValidation();

const activeItems = ref(['1']); //当前激活的面板

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const formModel = createSubModel(
    {
      noticeTitle: '',
      noticeContent: '',
      noticeStartTime: '',
      noticeEndTime: '',
      systemPlatform: [],
      updateStartTime: '',
      updateEndTime: '',
      remark: '',
      updateContent: ''
    },
    {
      refresh: async () => {
        return await request({
          url: '/showcase/f10-demo/form-group-block',
          data: {}
        });
      },
      // 保存
      saveForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/form-group-block`,
          data: {
            entities: [formData],
            type: 'saveForm'
          }
        });
      },
      // 提交
      submitForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/form-group-block`,
          data: {
            entities: [formData],
            type: 'submitForm'
          }
        });
      }
    }
  );

  const platformOptions = useListModel('/showcase/f10-demo/platformOptions', {
    labelField: 'label',
    lazy: false
  });

  // 给 getApiSecurityConfig 请求的 customParams 参数
  const securityConfig = {
    apiUrl: 'rest/frameuserlist/addUser'
  };

  return {
    global: {
      securityConfig
    },
    models: {
      formModel, //表单数据
      platformOptions // 通知系统/平台选项数据
    }
  };
});

const { formModel, platformOptions } = model;

onMounted(() => {
  model.methods.initData(); // 初始化数据
});

const formRef = ref(); // 表单引用

// 点击管理按钮事件
const handleManage = () => {
  Utils.logger.debug('点击管理');
};

// 暂存表单事件
const onSave = () => {
  // 执行更新
  formModel.saveForm({ formData: formModel.data }).then(() => {
    EMessage({
      message: '暂存成功！',
      type: 'success'
    });
  });
};

// 提交表单
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
</script>
<style scoped lang="scss">
.custom-collapse-head {
  width: 100%;
}
</style>
