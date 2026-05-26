<template>
  <e-button-group>
    <e-button :type="errorMode === 'tooltip' ? 'primary' : ''" @click="errorMode = 'tooltip'">tooltip</e-button>
    <e-button :type="errorMode === 'text' ? 'primary' : ''" @click="errorMode = 'text'">text</e-button>
  </e-button-group>
  <e-text class="mx-1">边框</e-text>
  <e-switch v-model="showBorder" />
  <e-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="220px"
    class="demo-ruleForm mt-m"
    :bordered="showBorder"
    :size="formSize"
    :error-mode="errorMode"
  >
    <e-form-item label="活动名称" prop="name">
      <e-input v-model="ruleForm.name" />
    </e-form-item>
    <e-form-item label="活动区域" prop="region">
      <e-select v-model="ruleForm.region" placeholder="选择活动区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
      <template #error>
        <div class="error-message">
          <span>错误信息</span>
        </div>
      </template>
    </e-form-item>
    <e-form-item label="活动时间" required>
      <e-row>
        <e-col :span="11">
          <e-form-item prop="date1">
            <e-date-picker v-model="ruleForm.date1" type="date" label="选择日期" placeholder="选择日期" />
          </e-form-item>
        </e-col>
        <e-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </e-col>
        <e-col :span="11">
          <e-form-item prop="date2">
            <e-time-picker v-model="ruleForm.date2" label="选择时间" placeholder="选择时间" style="width: 100%" />
          </e-form-item>
        </e-col>
      </e-row>
    </e-form-item>
    <e-form-item label="活动类型" prop="type">
      <e-checkbox-group v-model="ruleForm.type">
        <e-checkbox value="线上活动" label="线上活动" name="type" />
        <e-checkbox value="促销活动" label="线上活动" name="type" />
        <e-checkbox value="线下活动" label="线上活动" name="type" />
        <e-checkbox value="简单品牌曝光" label="线上活动" name="type" />
      </e-checkbox-group>
    </e-form-item>
    <e-form-item label="活动形式" prop="desc">
      <e-input v-model="ruleForm.desc" type="textarea" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(ruleFormRef)"> 创建 </e-button>
      <e-tooltip content="验证表单时，遇到第一个错误就立即返回，不再进行后续字段的验证">
        <e-button type="primary" @click="quicklyValidate(ruleFormRef)"> 快速验证 </e-button>
      </e-tooltip>
      <e-button @click="resetForm(ruleFormRef)">重置</e-button>
    </e-form-item>
  </e-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@epoint-fe/eui-components';

const formSize = ref('default'); // 表单尺寸
const ruleFormRef = ref<FormInstance>(); // 表单引用
const errorMode = ref('tooltip'); // 错误提示模式
const showBorder = ref(false); // 是否显示边框

const ruleForm = reactive({
  name: 'Hello', // 活动名称
  region: '', // 活动区域
  date1: '', // 活动日期
  date2: '', // 活动时间
  type: [], // 活动类型
  desc: '', // 活动形式
});

const rules = reactive<FormRules>({
  name: [
    {
      validator: (v, opt) => {
        console.log(v, opt);
        if (v.length >= 3 && v.length <= 5) {
          return true;
        }
        return new Error('长度应为3至5个字符');
      },
      required: false,
      min: 3,
      max: 5,
      trigger: 'blur',
    },
  ],
  region: [
    {
      required: true,
      message: '请选择活动区域',
      trigger: 'change',
    },
  ],
  date1: [{ required: true, type: 'date', message: '请选择日期', trigger: 'change' }],
  date2: [{ required: true, type: 'date', message: '请选择时间', trigger: 'change' }],
  type: [
    {
      required: true,
      message: '请至少选择一个活动类型',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: '请输入活动形式', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('提交成功！');
    } else {
      console.log('提交失败！', fields);
    }
  });
};

const quicklyValidate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.fastValidate((valid, fields) => {
    if (valid) {
      console.log('验证成功！');
    } else {
      console.log('验证失败！', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 12px;
  background-color: #f0f0f0;
  border-radius: 4px;
}
</style>
