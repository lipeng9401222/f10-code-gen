<template>
  <div class="eui-page" v-loading="model.global.state.loading">
    <e-scrollbar class="eui-main-section">
      <ep-form
        ref="formRef"
        class="eui-form eui-max-width"
        :model="formModel.data"
        :security-config="model.global.securityConfig"
        :validate-on-rule-change="model.global.state.validateOnRuleChange"
        label-position="top"
      >
        <ep-form-layout :gutter="40">
          <ep-form-item label="申请人" prop="name" required>
            <ep-input v-model="formModel.data.name" placeholder="请选择" :suffix-icon="SearchList" />
          </ep-form-item>
          <ep-form-item label="申请事由" prop="reason" required>
            <ep-select v-model="formModel.data.reason" :options="model.models.reasonOptions.data" placeholder="请选择" />
          </ep-form-item>
          <ep-form-item label="加班原因和内容" prop="content" required label-tooltip="帮助提示：请输入加班原因和内容">
            <ep-input v-model="formModel.data.content" :rows="3" type="textarea" placeholder="请输入" />
          </ep-form-item>
          <ep-form-item label="加班服务" prop="checkList">
            <ep-checkbox-group v-model="formModel.data.checkList" :options="model.models.checkOptions.data" />
          </ep-form-item>
          <ep-form-item label="加班开始时间" prop="startTime" :span="12">
            <ep-date-picker v-model="formModel.data.startTime" type="date" placeholder="请选择" />
          </ep-form-item>
          <ep-form-item label="加班结束时间" prop="endTime" :span="12">
            <ep-date-picker v-model="formModel.data.endTime" type="date" placeholder="请选择" />
          </ep-form-item>
          <ep-form-item label="是否包含节假日" prop="isHoliday">
            <ep-radio-group v-model="formModel.data.isHoliday">
              <ep-radio value="1">是</ep-radio>
              <ep-radio value="2">否</ep-radio>
            </ep-radio-group>
          </ep-form-item>
          <ep-form-item label="图片上传">
            <div>
              <e-text type="info">图片要求：75px*75px，png或jpg格式，小于1M。若未提供图片素材，将会直接使用默认图片。</e-text>
              <e-image-upload class="mb-s" v-model:image-list="formModel.data.uploadFile" :action="model.models.uploadUrl" multiple :size-limit="2048" :image-size="75" type-limit="jpg,png" />
            </div>
          </ep-form-item>
          <ep-form-item>
            <e-button type="primary" @click="submitForm">提交申请</e-button>
            <e-button type="default" @click="onSave">暂存</e-button>
          </ep-form-item>
        </ep-form-layout>
      </ep-form>
    </e-scrollbar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

import { EpButtonEdit, Utils, Hooks } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';
import { SearchList } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'Base'
});

const { createSubModel, request, getRightUrl } = Utils;
const { useListModel, useValidation } = Hooks;
const { validate } = useValidation();

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const uploadUrl = computed(() => 'http://localhost:5174/f10-live-demo/rest/v1/showcase/f10-demo/uploadFile');

  // 获取申请事由下拉选项数据
  const reasonOptions = useListModel('/showcase/f10-demo/platformOptions', {
    labelField: 'label',
    lazy: false // 懒加载
  });
  // 获取加班服务选项数据
  const checkOptions = useListModel('/showcase/f10-demo/platformOptions', {
    labelField: 'label',
    lazy: false // 懒加载
  });
  const formModel = createSubModel(
    {
      nameId: '', // 申请人ID
      name: '', // 申请人
      reason: '', // 申请事由
      content: '', // 加班原因和内容
      checkList: [], // 加班服务
      startTime: '', // 加班时间
      endTime: '', // 加班时间
      isHoliday: '', // 是否包含节假日
      uploadFile: [] // 添加此字段
    },
    {
      // 获取数据
      refresh: async () => {
        const formData = await request({
          url: '/showcase/f10-demo/form-base-select',
          data: {}
        });
        return formData;
      },
      // 保存
      saveForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/form-base-select`,
          data: {
            entities: [formData],
            type: 'saveForm'
          }
        });
      },
      // 提交
      submitForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/form-base-select`,
          data: {
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
      formModel, //表单数据
      uploadUrl, //图片上传请求接口地址
      reasonOptions, //申请事由选项数据
      checkOptions //加班服务选项数据
    }
  };
});

const { formModel, reasonOptions, checkOptions } = model;

// 初始化数据
onMounted(() => {
  model.methods.initData();
});

const formRef = ref(null); // 表单引用

// 提交表单事件
const submitForm = async () => {
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
</script>

<style scoped lang="scss"></style>
