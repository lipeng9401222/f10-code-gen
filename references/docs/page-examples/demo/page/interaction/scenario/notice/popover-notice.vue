<template>
  <ep-layout-manager>
    <template #main>
      <div class="flex-1" :class="{ 'px-xl pt-xl': !inDialog && !inTab }">
        <div class="form-collapse h-full flex">
          <ep-layout-manager class="rounded bg-white">
            <template #main>
              <ep-form
                class="h-full flex-1 flex flex-col"
                ref="formRef"
                :model="formModel.data"
                :security-config="model.global.securityConfig"
          :validate-on-rule-change="model.global.state.validateOnRuleChange"
                label-position="top"
              >
                <e-scrollbar ref="contentRef" class="form-collapse-content">
                  <e-collapse class="form-collapse-item" v-model="activeItems" v-loading="model.global.state.loading" :show-nav="false" @change="collapseChange" ref="collapseRef">
                    <e-collapse-item id="1" title="公告信息" class="px-xxl pt-xxl">
                      <ep-form-item label="公告标题" prop="title" label-tooltip="公告标题帮助提示">
                        <ep-input v-model="formModel.data.title" placeholder="请输入" />
                      </ep-form-item>
                      <ep-form-item label="公告内容" prop="content" label-tooltip="公告内容帮助提示">
                        <ep-input v-model="formModel.data.content" type="textarea" :rows="3" placeholder="请输入" />
                      </ep-form-item>
                      <e-row :gutter="40">
                        <e-col :span="12">
                          <ep-form-item label="通知开始时间" prop="noticeStartTime">
                            <ep-date-picker v-model="formModel.data.noticeStartTime" type="date" label="选择日期" placeholder="选择日期" />
                          </ep-form-item>
                        </e-col>
                        <e-col :span="12">
                          <ep-form-item label="通知结束时间" prop="noticeEndTime">
                            <ep-date-picker v-model="formModel.data.noticeEndTime" type="date" label="选择日期" placeholder="选择日期" />
                          </ep-form-item>
                        </e-col>
                      </e-row>
                      <ep-form-item label="通知系统/平台" prop="platform">
                        <ep-select v-model="formModel.data.platform" :options="platformModel.data" multiple placeholder="请选择活动区域" />
                      </ep-form-item>
                    </e-collapse-item>

                    <e-collapse-item id="2" title="更新时间" class="px-xxl">
                      <e-row :gutter="40">
                        <e-col :span="12">
                          <ep-form-item label="更新开始时间" prop="updateStartTime" :tooltip="{ content: '更新开始时间帮助提示', placement: 'bottom-start' }">
                            <ep-date-picker v-model="formModel.data.updateStartTime" type="date" label="选择日期" placeholder="选择日期" />
                          </ep-form-item>
                        </e-col>
                        <e-col :span="12">
                          <ep-form-item label="更新持续时间" prop="updateDuration" tooltip="更新持续时间帮助提示">
                            <ep-time-picker v-model="formModel.data.updateDuration" type="time" label="选择时间" placeholder="选择时间" />
                          </ep-form-item>
                        </e-col>
                      </e-row>
                      <ep-form-item label="备注说明" prop="remark">
                        <ep-input v-model="formModel.data.remark" type="textarea" :rows="3" placeholder="请输入" />
                      </ep-form-item>
                    </e-collapse-item>

                    <e-collapse-item id="3" title="更新内容" class="px-xxl pb-xxl">
                      <ep-form-item label="更新详细内容" prop="updateDetails" label-tooltip="公告内容帮助提示">
                        <ep-input v-model="formModel.data.updateDetails" type="textarea" :rows="3" placeholder="请输入" />
                      </ep-form-item>
                    </e-collapse-item>
                  </e-collapse>
                </e-scrollbar>
              </ep-form>
            </template>
            <template #bottom v-if="showBottom">
              <e-toolbar class="px-xxl py-l" button-position="right">
                <template #button>
                  <e-toolbar-btns ref="footerBtnsRef" :items="footerBtnList" />
                </template>
              </e-toolbar>
            </template>
          </ep-layout-manager>
        </div>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { defineProps, ref, onMounted, inject, computed, watch } from 'vue';
import { Hooks, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

defineOptions({
  name: 'ToolbarBottom'
});

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
// 折叠面板
const collapseRef = ref(null);
// 折叠面板展开项
const activeItems = ref(['1', '2', '3']);

// 定义 props传参
const props = defineProps({
  rowGuid: { type: String, default: '' },
  inTab: { type: Boolean, default: false },
  showNav: { type: Boolean, default: true }, // 处于弹窗中时不显示锚点导航，此项配置无效
  showBottom: { type: Boolean, default: true },
  showCancel: { type: Boolean, default: false }
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

// 取消事件
const onCancel = () => {
  closeDialog('cancel');
};

// 底部按钮
const footerBtnsRef = ref(null);
// 取消按钮
const cancelBtn = () => {
  let cancelBtnObj = null;

  if (props.showCancel) {
    cancelBtnObj = {
      type: 'default',
      content: '取消',
      onClick: () => {
        EMessage({
          message: '取消！'
        });
      }
    };
  }
  return cancelBtnObj;
};
// 底部按钮列表
const footerBtnList = computed(() => {
  let btnList = [
    {
      type: 'default',
      content: '暂存',
      onClick: () => {
        EMessage({
          message: '暂存！'
        });
      }
    },
    {
      type: 'primary',
      content: '提交',
      onClick: () => {
        onSubmit(formRef);
      }
    }
  ];
  let cancelBtnObj = cancelBtn();
  if (cancelBtnObj) {
    btnList.unshift(cancelBtnObj);
  }
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
const onSubmit = async (formEl) => {
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

onMounted(async () => {
  // 页面初始化
  model.methods.initData();
});
</script>
