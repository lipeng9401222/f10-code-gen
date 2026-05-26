<template>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading">
    <template #main>
      <div class="eui-main-section">
        <e-scrollbar>
          <ep-form
            ref="formRef"
            class="eui-form eui-max-width"
            :model="formModel.data"
            :security-config="model.global.securityConfig"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
            label-position="top"
          >
            <ep-form-layout :gutter="40">
              <ep-form-item label="申请人" prop="nameId" required>
                <ep-person-picker
                  class="w-full"
                  v-model="formModel.data.nameId"
                  v-model:cache-data="formModel.data.cacheData"
                  url="/showcase/f10-demo/form-person-depart-wait"
                  more-page-url="demo/page/typical/chosen/person-depart-select"
                />
              </ep-form-item>
              <ep-form-item label="申请事由" prop="reason" required>
                <ep-select v-model="formModel.data.reason" :options="model.models.reasonOptions.data" placeholder="请选择"></ep-select>
              </ep-form-item>
              <ep-form-item label="加班原因和内容" prop="content" required label-tooltip="帮助提示：请输入加班原因和内容">
                <ep-input v-model="formModel.data.content" :rows="3" type="textarea" placeholder="请输入" />
              </ep-form-item>
              <ep-form-item label="加班服务" prop="checkList">
                <ep-checkbox-group v-model="formModel.data.checkList" :options="model.models.checkOptions.data"></ep-checkbox-group>
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
                <div class="flex flex-col gap-s">
                  <e-text class="mx-1" type="info">图片要求：75px*75px，png或jpg格式，小于1M。若未提供图片素材，将会直接使用默认图片。</e-text>
                  <e-image-upload v-model:image-list="formModel.data.uploadFile" :action="model.models.uploadUrl" multiple :size-limit="2048" :image-size="75" type-limit="jpg,png" />
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
  </ep-layout-manager>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

defineOptions({
  name: 'PersonDepart'
});

const { createSubModel, request } = Utils;
const { useListModel, useValidation } = Hooks;
const { validate } = useValidation();

const formRef = ref(null); // 表单引用

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const uploadUrl = computed(() => 'https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile');

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
      nameId: [], // 申请人ID
      cacheData: [], // 缓存的人员数据，用于初始化时回显已选人员的头像和姓名
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
          url: '/showcase/f10-demo/form-person-depart',
          data: {}
        });
        return formData;
      },
      // 保存
      saveForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/form-person-depart`,
          data: {
            entities: [formData],
            type: 'saveForm'
          }
        });
      },
      // 提交
      submitForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/form-person-depart`,
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

// 提交表单事件
const submitForm = async () => {
  Utils.logger.info('submitForm formModel.data=', formModel.data);
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
