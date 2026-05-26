<template>
  <ep-layout-manager class="eui-page" :bottom-config="{ contentClass: 'eui-bottom-section' }">
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
          <ep-form-item label="申请人" prop="applicant">
            <ep-input v-model="formModel.data.applicant" placeholder="请选择" readonly>
              <template #suffix>
                <e-icon>
                  <Search />
                </e-icon>
              </template>
            </ep-input>
          </ep-form-item>

          <ep-form-item label="申请事由" prop="reasonType">
            <ep-select v-model="formModel.data.reasonType" :options="reasonOptions" placeholder="请选择" />
          </ep-form-item>

          <ep-form-item label="加班原因和内容" prop="reasonContent" label-tooltip="说明信息帮助提示">
            <ep-input v-model="formModel.data.reasonContent" type="textarea" :rows="4" placeholder="请输入" />
          </ep-form-item>

          <e-row :gutter="40">
            <e-col :span="12">
              <ep-form-item label="加班开始时间" prop="startTime">
                <ep-date-picker v-model="formModel.data.startTime" type="datetime" placeholder="请选择" />
              </ep-form-item>
            </e-col>
            <e-col :span="12">
              <ep-form-item label="加班结束时间" prop="endTime">
                <ep-date-picker v-model="formModel.data.endTime" type="datetime" placeholder="请选择" />
              </ep-form-item>
            </e-col>
          </e-row>

          <ep-form-item label="加班服务" prop="services">
            <ep-checkbox-group v-model="formModel.data.services">
              <ep-checkbox label="dinner" value="dinner">加班餐（晚餐+夜宵）</ep-checkbox>
              <ep-checkbox label="snacks" value="snacks">零食饮料</ep-checkbox>
              <ep-checkbox label="bus" value="bus">夜班班车</ep-checkbox>
            </ep-checkbox-group>
          </ep-form-item>
        </ep-form>
      </e-scrollbar>
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
import { ref, onMounted, inject, watch } from 'vue';
import { Hooks, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';
import { Search } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'OvertimeForm'
});

const { createSubModel, defineDataModel, request } = Utils;
const { useValidation } = Hooks;
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

const formRef = ref(null);

const reasonOptions = [
  { label: '加班申请', value: 'overtime' },
  { label: '调休申请', value: 'leave' }
];

const footerBtnList = ref([
  {
    type: 'default',
    content: '取消',
    onClick: () => {
      onCancel();
    }
  },
  {
    type: 'primary',
    content: '确认',
    onClick: () => {
      onSubmit();
    }
  }
]);

const model = defineDataModel(() => {
  const formModel = createSubModel(
    {
      applicant: '',
      reasonType: 'overtime',
      reasonContent: '',
      startTime: '',
      endTime: '',
      services: ['dinner', 'snacks']
    },
    {
      refresh: async () => {
        return {
          applicant: '',
          reasonType: 'overtime',
          reasonContent: '',
          startTime: '',
          endTime: '',
          services: ['dinner', 'snacks']
        };
      },
      submitForm: async ({ formData }) => {
        return Promise.resolve(formData);
      }
    }
  );

  const securityConfig = {
    apiUrl: ''
  };

  return {
    global: {
      securityConfig
    },
    models: {
      formModel
    }
  };
});

const { formModel } = model;

const onCancel = () => {
  closeDialog('cancel');
};

const onSubmit = async () => {
  const isValid = await validate(formRef);
  if (!isValid) return;

  formModel.submitForm({ formData: formModel.data }).then(() => {
    EMessage({
      message: '提交成功！',
      type: 'success'
    });
    closeDialog('submit', formModel.data);
  });
};

onMounted(() => {
  model.methods.initData();
});
</script>
<style lang="scss" scoped></style>
