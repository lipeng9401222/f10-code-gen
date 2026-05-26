<template>
  <ep-layout-manager class="eui-page" :right-config="rightConfig">
    <template #main>
      <ep-layout-manager class="eui-main-section" :bottom-config="bottomConfig">
        <template #main>
          <e-scrollbar ref="contentRef">
            <ep-form
              class="eui-form"
              ref="formRef"
              :model="formModel.data"
              :security-config="model.global.securityConfig"
              :validate-on-rule-change="model.global.state.validateOnRuleChange"
              label-position="top"
            >
              <e-collapse v-model="activeItems" v-loading="model.global.state.loading" :show-nav="false" @change="collapseChange">
                <e-collapse-item id="1" title="公告信息">
                  <ep-form-layout :gutter="40">
                    <ep-form-item label="公告标题" prop="title" label-tooltip="公告标题帮助提示">
                      <ep-input v-model="formModel.data.title" placeholder="请输入" />
                    </ep-form-item>
                    <ep-form-item label="公告内容" prop="content" label-tooltip="公告内容帮助提示">
                      <ep-input v-model="formModel.data.content" type="textarea" :rows="3" placeholder="请输入" />
                    </ep-form-item>

                    <ep-form-item label="通知开始时间" prop="noticeStartTime" :span="12">
                      <ep-date-picker v-model="formModel.data.noticeStartTime" type="date" placeholder="选择日期" />
                    </ep-form-item>
                    <ep-form-item label="通知结束时间" prop="noticeEndTime" :span="12">
                      <ep-date-picker v-model="formModel.data.noticeEndTime" type="date" placeholder="选择日期" />
                    </ep-form-item>
                    <ep-form-item label="通知系统/平台" prop="platform">
                      <ep-select v-model="formModel.data.platform" :options="platformModel.data" multiple placeholder="请选择活动区域" />
                    </ep-form-item>
                  </ep-form-layout>
                </e-collapse-item>

                <e-collapse-item id="2" title="更新时间">
                  <ep-form-layout :gutter="40">
                    <ep-form-item label="更新开始时间" prop="updateStartTime" :span="12">
                      <ep-date-picker v-model="formModel.data.updateStartTime" type="date" placeholder="选择日期" />
                    </ep-form-item>
                    <ep-form-item label="更新持续时间" prop="updateDuration" :span="12">
                      <ep-time-picker v-model="formModel.data.updateDuration" type="time" placeholder="选择时间" />
                    </ep-form-item>
                    <ep-form-item label="备注说明" prop="remark">
                      <ep-input v-model="formModel.data.remark" type="textarea" :rows="3" placeholder="请输入" />
                    </ep-form-item>
                  </ep-form-layout>
                </e-collapse-item>

                <e-collapse-item id="3" title="更新内容">
                  <ep-form-item label="更新详细内容" prop="updateDetails" label-tooltip="公告内容帮助提示">
                    <ep-input v-model="formModel.data.updateDetails" type="textarea" :rows="3" placeholder="请输入" />
                  </ep-form-item>
                </e-collapse-item>
              </e-collapse>
            </ep-form>
          </e-scrollbar>
        </template>
        <template #bottom v-if="showBottom">
          <e-toolbar button-position="right">
            <template #button>
              <e-toolbar-btns ref="footerBtnsRef" :items="footerBtnList" />
            </template>
          </e-toolbar>
        </template>
      </ep-layout-manager>
    </template>
    <template #right>
      <e-anchor v-if="showAnchorNav && !inDialog" class="ml-xl" :target="collapseTarget" :tags="anchorTags" @active-change="handleAnchorChange" />
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, onMounted, inject, computed, watch } from 'vue';
import { Hooks, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

// 非定宽页面
defineOptions({
  name: 'SideDirectory'
});

const bottomConfig = {
  contentClass: 'eui-bottom-section',
  inset: true
};

const rightConfig = {
  defaultWidth: 'fit-content',
  contentClass: 'eui-right-section',
  showDivider: false
};

const { createSubModel, defineDataModel, request } = Utils;
const { useValidation, useListModel } = Hooks;
const { validate } = useValidation();
const getCurrentDialog = inject('getCurrentDialog');
// 是否处于弹窗中
const inDialog = !!getCurrentDialog;

// 关闭弹窗
const closeDialog = (action = 'close', data) => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action || 'close', data);
  }
};

// 表单
const formRef = ref(null);
// 折叠面板展开项
const activeItems = ref(['1', '2', '3']);

// Anchor 锚点导航配置
const anchorTags = ref(['.e-collapse-item__title']);
const contentRef = ref(null);
const collapseTarget = computed(() => contentRef.value?.wrapRef);

// 定义 props传参
const props = defineProps({
  rowGuid: { type: String, default: '' },
  inTab: { type: Boolean, default: false },
  showNav: { type: Boolean, default: true }, // 处于弹窗中时不显示锚点导航，此项配置无效
  showBottom: { type: Boolean, default: true }
});

// 是否显示锚点导航
const showAnchorNav = computed(() => props.showNav);

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
      updateStartTime: '',
      updateDuration: '',
      remark: '',
      updateDetails: ''
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

        return formData;
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

// 折叠面板展开项变更
const collapseChange = (val) => {
  Utils.logger.info('collapseChange val=', val);
};

// 锚点导航变更
const handleAnchorChange = (newValue, oldValue) => {
  Utils.logger.info('handleAnchorChange newValue=', newValue, 'oldValue=', oldValue);
};

// 底部按钮
const footerBtnsRef = ref(null);

// 底部按钮列表
const footerBtnList = computed(() => {
  let btnList = [
    {
      type: 'default',
      content: '暂存',
      onClick: onSave
    },
    {
      type: 'primary',
      content: '提交',
      onClick: () => {
        onSubmit();
      }
    }
  ];
  return btnList;
});

// 暂存
const onSave = () => {
  // 执行更新
  formModel.saveForm({ formData: formModel.data }).then(() => {
    closeDialog('save', formModel.data);
    EMessage({
      message: '暂存成功！',
      type: 'success'
    });
  });
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
    closeDialog('submit', formModel.data);
  });
};

onMounted(() => {
  // 页面初始化
  model.methods.initData();
});
</script>
<style scoped lang="scss"></style>
