<template>
  <div class="eui-page">
    <ep-layout-manager class="eui-main-section" v-loading="model.global.state.loading" :bottom-config="{ contentClass: 'eui-bottom-section' }">
      <template #main>
        <e-scrollbar>
          <ep-form
            ref="formRef"
            class="eui-form"
            :model="formModel.data"
            :security-config="model.global.securityConfig"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
            label-position="top"
          >
            <!-- 公告信息分组 - 无标题 -->
            <e-card shadow="never">
              <ep-form-layout :gutter="40">
                <ep-form-item label="公告标题" prop="title" label-tooltip="公告标题帮助提示">
                  <ep-input v-model="formModel.data.title" placeholder="请输入" />
                </ep-form-item>
                <ep-form-item label="公告内容" prop="content" label-tooltip="公告内容帮助提示">
                  <ep-input v-model="formModel.data.content" type="textarea" :rows="3" placeholder="请输入" />
                </ep-form-item>
                <ep-form-item label="通知开始时间" prop="noticeStartTime" :span="12">
                  <ep-date-picker v-model="formModel.data.noticeStartTime" type="date" label="选择日期" placeholder="选择日期" />
                </ep-form-item>
                <ep-form-item label="通知结束时间" prop="noticeEndTime" :span="12">
                  <ep-date-picker v-model="formModel.data.noticeEndTime" type="date" label="选择日期" placeholder="选择日期" />
                </ep-form-item>
                <ep-form-item label="通知系统/平台" prop="platform">
                  <ep-select v-model="formModel.data.platform" :options="platformModel.data" multiple placeholder="请选择" />
                </ep-form-item>
              </ep-form-layout>
            </e-card>

            <!-- Tab 区域 -->
            <e-card shadow="never">
              <e-tabs v-model="activeTab">
                <e-tab-pane label="更新计划" name="updatePlan">
                  <ep-form-layout :gutter="40">
                    <ep-form-item label="更新开始时间" prop="updateStartTime" :span="12">
                      <ep-date-picker v-model="formModel.data.updateStartTime" type="date" label="选择日期" placeholder="选择日期" />
                    </ep-form-item>
                    <ep-form-item label="更新持续时间" prop="updateDuration" :span="12">
                      <ep-time-picker v-model="formModel.data.updateDuration" type="time" label="选择时间" placeholder="选择时间" />
                    </ep-form-item>
                    <ep-form-item label="备注说明" prop="remark">
                      <ep-input v-model="formModel.data.remark" type="textarea" :rows="3" placeholder="请输入" />
                    </ep-form-item>
                    <ep-form-item label="更新详细内容" prop="updateDetails" label-tooltip="更新内容帮助提示">
                      <ep-input v-model="formModel.data.updateDetails" type="textarea" :rows="3" placeholder="请输入" />
                    </ep-form-item>
                  </ep-form-layout>
                </e-tab-pane>
                <e-tab-pane label="更新前备份" name="backupBefore">
                  <ep-form-item label="备份说明" prop="backupBeforeDesc">
                    <ep-input v-model="formModel.data.backupBeforeDesc" type="textarea" :rows="3" placeholder="请输入" />
                  </ep-form-item>
                </e-tab-pane>
                <e-tab-pane label="更新后配置" name="configAfter">
                  <ep-form-item label="配置说明" prop="configAfterDesc">
                    <ep-input v-model="formModel.data.configAfterDesc" type="textarea" :rows="3" placeholder="请输入" />
                  </ep-form-item>
                </e-tab-pane>
                <e-tab-pane label="日志记录" name="logRecord">
                  <e-empty />
                </e-tab-pane>
              </e-tabs>
            </e-card>
          </ep-form>
        </e-scrollbar>
      </template>
      <template #bottom>
        <e-toolbar button-position="right">
          <template #button>
            <e-toolbar-btns ref="footerBtnsRef" :items="footerBtnList" />
          </template>
        </e-toolbar>
      </template>
    </ep-layout-manager>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Hooks, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

defineOptions({
  name: 'TabLayout'
});

const { createSubModel, defineDataModel, request } = Utils;
const { useValidation, useListModel } = Hooks;
const { validate } = useValidation();

// 表单
const formRef = ref(null);
// 当前激活的 Tab
const activeTab = ref('updatePlan');

// 定义 props传参
const props = defineProps({
  rowGuid: { type: String, default: '' }
});

const model = defineDataModel(() => {
  const platformModel = useListModel('/showcase/f10-demo/platformOptions', {
    lazy: false,
    labelField: 'text'
  });

  const formModel = createSubModel(
    {
      title: '',
      content: '',
      noticeStartTime: '',
      noticeEndTime: '',
      platform: [],
      // Tab: 更新计划
      updateStartTime: '',
      updateDuration: '',
      remark: '',
      updateDetails: '',
      // Tab: 更新前备份
      backupBeforeDesc: '',
      // Tab: 更新后配置
      configAfterDesc: ''
    },
    {
      // 获取数据
      refresh: async () => {
        const formData = await request({
          url: `/showcase/f10-demo/toolbar-bottom`,
          data: {
            guid: props.rowGuid
          }
        });

        return {
          backupBeforeDesc: '',
          configAfterDesc: '',
          ...formData
        };
      },
      // 保存
      saveForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/toolbar-bottom`,
          data: {
            guid: props.rowGuid,
            entities: [formData],
            type: 'saveForm'
          }
        });
      },
      // 提交
      submitForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/toolbar-bottom`,
          data: {
            guid: props.rowGuid,
            entities: [formData],
            type: 'submitForm'
          }
        });
      }
    }
  );

  // 给 initSecurityConfig 请求的 securityConfigParams 参数
  const securityConfig = {
    apiUrl: 'rest/frameuserlist/addUser'
  };

  return {
    global: {
      securityConfig
    },
    models: {
      formModel,
      platformModel
    }
  };
});

const { formModel, platformModel } = model;

watch(
  () => props.rowGuid,
  () => {
    model.formModel.refresh();
    model.platformModel.refresh();
  }
);

/**
 * 暂存表单数据
 */
const onSave = () => {
  formModel.saveForm({ formData: formModel.data }).then(() => {
    Utils.logger.info('save', formModel.data);
    EMessage({
      message: '暂存成功！',
      type: 'success'
    });
  });
};

/**
 * 提交表单数据
 */
const onSubmit = async () => {
  const isValid = await validate(formRef);
  if (!isValid) {
    return;
  }

  formModel.submitForm({ formData: formModel.data }).then(() => {
    Utils.logger.info('submit', formModel.data);
    EMessage({
      message: '提交成功！',
      type: 'success'
    });
  });
};

// 底部按钮
const footerBtnsRef = ref(null);
// 底部按钮列表
const footerBtnList = [
  {
    type: 'default',
    content: '暂存',
    onClick: onSave
  },
  {
    type: 'primary',
    content: '提交',
    onClick: () => onSubmit()
  }
];

onMounted(async () => {
  // 页面初始化
  model.methods.initData();
});
</script>

<style scoped lang="scss"></style>
