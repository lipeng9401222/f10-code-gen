<template>
  <e-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    :submit-url="submitUrl"
    :submit-request-options="submitRequestOptions"
    :submit-http-requeset="submitHttpRequest"
  >
    <e-form-item prop="testtext" label="测试" label-width="120px">
      <e-input v-model="formData.testtext" placeholder="请输入" :desensitization-type="''" />
    </e-form-item>

    <e-divider content-position="right">以下为敏感数据,已脱敏</e-divider>
    <e-form-item prop="name" label="姓名" label-width="120px">
      <e-input v-model="formData.name" placeholder="请输入" :desensitization-type="DESENDATATYPE_CHINESE_NAME" />
    </e-form-item>
    <e-form-item prop="address" label="地址(只读)" label-width="120px">
      <e-input v-model="formData.address" placeholder="请输入" readonly />
    </e-form-item>
    <e-row>
      <e-col :span="6" style="margin-left: 131px">
        <e-button type="primary" @click="submit">提交</e-button>
      </e-col>
    </e-row>
  </e-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { DESENDATATYPE_CHINESE_NAME, EMessage } from '@epoint-fe/eui-components';
import axios from 'axios';
import type { FormRules, SubmitRequestOptions, ValidateFieldsError } from '@epoint-fe/eui-components';

const formRef = ref();

const formData = reactive({
  testtext: '测试必填文本',
  name: '张三',
  address: '张家港市港城大道',
});

const formRules = reactive<FormRules>({
  testtext: [
    {
      type: 'string',
      required: true,
      message: '请输入',
      trigger: 'change',
    },
  ],
  name: [
    {
      type: 'string',
      required: true,
      message: '请输入',
      trigger: 'change',
    },
  ],
});

const submitUrl = ref(location.href);

// 表单请求配置
const submitRequestOptions: Partial<SubmitRequestOptions> = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'with-test-falg': '1',
  },
  withCredentials: false,
  getRequestData: (data: Record<string, any>) => {
    EMessage.info(`提交数据： ${JSON.stringify(data)}`);

    return data;
  },
  validateErrorHandler: (fields: ValidateFieldsError): void => {
    EMessage.warning(`表单验证失败，错误字段：${Object.keys(fields).join('、')}`);
  },
  onSuccess: (response: any): void => {
    EMessage.success('提交成功');
  },
};

// 以axios为例子，也可不穿，使用默认请求
const submitHttpRequest = axios;

// 表单提交
const submit = () => {
  // 表单提交
  formRef.value.submit();
};
</script>
