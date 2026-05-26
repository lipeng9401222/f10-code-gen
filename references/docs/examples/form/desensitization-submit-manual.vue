<template>
  <e-form ref="formRef" :model="formData" :rules="formRules">
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
      <e-col :span="4" style="margin-left: 131px">
        <e-button type="primary" @click="submit">提交</e-button>
      </e-col>
    </e-row>
  </e-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { DESENDATATYPE_CHINESE_NAME, EMessage } from '@epoint-fe/eui-components';
import axios from 'axios';
import type { FormRules } from '@epoint-fe/eui-components';

const formRef = ref();

const formData = reactive({
  testtext: '测试校验文本',
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

const submit = async () => {
  // 走表单验证
  const validateRes = await formRef.value.validate((valid, fields) => {
    if (!valid) {
      // 处理错误信息
      EMessage.warning(`表单验证失败，错误字段：${Object.keys(fields).join('、')}`);

      return;
    }
  });

  // 验证未通过
  if (!validateRes) {
    return;
  }

  // -- 提交表单请求 --

  // 以axios为例子
  const axiosInstance = axios;

  // 通过getCleanData 获取无需脱敏数据+脱敏已修改数据
  const data = formRef.value.getCleanData();

  EMessage.info(`提交数据： ${JSON.stringify(data)}`);

  // axios为请求例子
  axiosInstance({
    url: location.href,
    data,
    method: 'post',
  })
    .then((res) => {
      EMessage.success('提交成功');

      // 重置表单内脱敏项的已修改情况，避免重复提交
      formRef.value.resetEditState();
    })
    .catch((err) => {
      EMessage.error(`提交失败 ${JSON.stringify(err)}`);
    });
};
</script>
