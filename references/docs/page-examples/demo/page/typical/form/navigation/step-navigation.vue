<template>
  <div class="eui-page" v-loading="model.global.state.loading">
    <ep-step-form ref="stepsRef" v-model="formModel.data.formData" :active="formModel.data.active" align-center @submit="submit">
      <ep-step-form-item title="基本信息" :description="'这里是提示文字'" :validate="() => basicInfoRef?.validate()">
        <step-content ref="basicInfoRef" v-model="formModel.data.formData.basicInfoStep" />
      </ep-step-form-item>
      <ep-step-form-item title="公告内容" :description="'这里是提示文字'" :validate="() => noticeContentRef?.validate()">
        <step-content ref="noticeContentRef" v-model="formModel.data.formData.noticeContentStep" />
      </ep-step-form-item>
      <ep-step-form-item title="备选方案" :description="'这里是提示文字'" :validate="() => backupRef?.validate()">
        <step-content ref="backupRef" v-model="formModel.data.formData.backupStep" />
      </ep-step-form-item>
      <ep-step-form-item title="发布公告" :description="'这里是提示文字'" :validate="() => publishRef?.validate()">
        <step-content ref="publishRef" v-model="formModel.data.formData.publishStep" />
      </ep-step-form-item>
    </ep-step-form>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Utils, EpStepForm, EpStepFormItem } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';
import stepContent from './step-contents/content.vue';

const { createSubModel, defineDataModel, request } = Utils;

const stepsRef = ref(null);
const basicInfoRef = ref(null);
const noticeContentRef = ref(null);
const backupRef = ref(null);
const publishRef = ref(null);

const rules = reactive({
  noticeTitle: [
    {
      required: true,
      message: '请输入公告标题',
      trigger: 'blur'
    }
  ],
  noticeContent: [
    {
      required: true,
      message: '请输入公告内容',
      trigger: 'blur'
    }
  ]
});

const model = defineDataModel(() => {
  const formModel = createSubModel(
    {
      active: 0,
      steps: [
        {
          id: 'basicInfoStep',
          title: '基本信息'
        },
        {
          id: 'noticeContentStep',
          title: '公告内容'
        },
        {
          id: 'backupStep',
          title: '备选方案'
        },
        {
          id: 'publishStep',
          title: '发布公告'
        }
      ],
      formData: {
        basicInfoStep: {
          noticeTitle: '',
          noticeContent: '',
          noticeStartTime: '',
          noticeEndTime: '',
          systemPlatform: [],
          updateStartTime: '',
          updateEndTime: '',
          remark: '',
          updateContent: '',
          priority: ''
        },
        noticeContentStep: {
          noticeTitle: '',
          noticeContent: '',
          noticeStartTime: '',
          noticeEndTime: '',
          systemPlatform: [],
          updateStartTime: '',
          updateEndTime: '',
          remark: '',
          updateContent: '',
          priority: ''
        },
        backupStep: {
          noticeTitle: '',
          noticeContent: '',
          noticeStartTime: '',
          noticeEndTime: '',
          systemPlatform: [],
          updateStartTime: '',
          updateEndTime: '',
          remark: '',
          updateContent: '',
          priority: ''
        },
        publishStep: {
          noticeTitle: '',
          noticeContent: '',
          noticeStartTime: '',
          noticeEndTime: '',
          systemPlatform: [],
          updateStartTime: '',
          updateEndTime: '',
          remark: '',
          updateContent: '',
          priority: ''
        }
      }
    },
    {
      // 获取数据
      refresh: async () => {
        const formData = await request({
          url: '/showcase/f10-demo/stepNavFormData',
          data: {}
        });
        return formData;
      },
      // 保存
      saveForm: async (formData) => {
        return await request({
          url: `/showcase/f10-demo/form-base`,
          data: {
            entities: [formData],
            type: 'saveForm'
          }
        });
      },
      // 提交
      submitForm: async (formData) => {
        return await request({
          url: `/showcase/f10-demo/form-base`,
          data: {
            entities: [formData],
            type: 'submitForm'
          }
        });
      }
    }
  );

  return {
    models: {
      formModel
    }
  };
});

const { formModel } = model;

const submit = (submitData) => {
  console.log('最终提交数据：', submitData);
  formModel.submitForm(submitData).then(() => {
    EMessage({
      message: '提交成功！',
      type: 'success'
    });
  });
};

onMounted(async () => {
  await model.methods.initData();
});
</script>

<style scoped lang="scss"></style>
