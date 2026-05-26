<template>
  <e-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="220px" class="demo-ruleForm" :size="formSize">
    <e-form-item label="活动名称" prop="name">
      <e-input v-model="ruleForm.name" />
    </e-form-item>
    <e-form-item label="活动区域" prop="region">
      <e-select v-model="ruleForm.region" placeholder="选择活动区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
    </e-form-item>
    <e-form-item label="活动次数" prop="count">
      <e-select
        v-model="ruleForm.count"
        placeholder="选择活动次数"
        :options="options"
        :virtual-list-props="{
          height: 200,
        }"
      />
    </e-form-item>
    <e-form-item label="活动时间" required>
      <e-col :span="11">
        <e-form-item prop="date1">
          <e-date-picker
            v-model="ruleForm.date1"
            type="date"
            label="选择日期"
            placeholder="选择日期"
            style="width: 100%"
          />
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
    </e-form-item>
    <e-form-item label="即时交付" prop="delivery">
      <e-switch v-model="ruleForm.delivery" />
    </e-form-item>
    <e-form-item label="活动类型" prop="type">
      <e-checkbox-group v-model="ruleForm.type">
        <e-checkbox value="线上活动" label="线上活动" name="type" />
        <e-checkbox value="促销活动" label="线上活动" name="type" />
        <e-checkbox value="线下活动" label="线上活动" name="type" />
        <e-checkbox value="简单品牌曝光" label="线上活动" name="type" />
      </e-checkbox-group>
    </e-form-item>
    <e-form-item label="资源" prop="resource">
      <e-radio-group v-model="ruleForm.resource">
        <e-radio value="赞助商" label="赞助商" />
        <e-radio value="场馆" label="场馆" />
      </e-radio-group>
    </e-form-item>
    <e-form-item label="活动形式" prop="desc">
      <e-input v-model="ruleForm.desc" type="textarea" />
    </e-form-item>
    <e-form-item label="主办人身份证号码" prop="idCard">
      <e-input v-model="ruleForm.idCard" />
    </e-form-item>
    <e-form-item label="主办人手机号码" prop="phone">
      <e-input v-model="ruleForm.phone" />
    </e-form-item>
    <e-form-item label="地址" prop="address">
      <e-input v-model="ruleForm.address" />
    </e-form-item>
    <e-form-item label="社会信用代码" prop="creditCode">
      <e-input v-model="ruleForm.creditCode" />
    </e-form-item>
    <e-form-item label="邮编" prop="postCode">
      <e-input v-model="ruleForm.postCode" />
    </e-form-item>
    <e-form-item label="爱好" prop="hobby">
      <e-input v-model="ruleForm.hobby" />
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
const ruleForm = reactive({
  name: 'Hello', // 活动名称
  region: '', // 活动区域
  count: '', // 活动次数
  date1: '', // 活动日期
  date2: '', // 活动时间
  delivery: false, // 即时交付
  type: [], // 活动类型
  resource: '', // 资源
  desc: '', // 活动形式
  idCard: '', // 主办人身份证号码
  phone: '', // 主办人身份证号码
  url: 'abc',
  email: '',
  num: 0,
  address: '',
  creditCode: '',
  postCode: '',
  hobby: '',
});

const rules = reactive<FormRules>({
  name: [
    {
      // type: 'string',
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
      // message: '长度应为3至5个字符',
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
  count: [
    {
      required: true,
      // message: '请选择活动次数',
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
  resource: [
    {
      required: true,
      message: '请选择活动资源',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: '请输入活动形式', trigger: 'blur' }],
  idCard: [{ type: 'idCard', required: true, message: '必须是身份证格式', trigger: 'blur' }],
  phone: [{ required: true }, { type: 'phone' }],
  url: [{ type: 'url', required: true, trigger: 'blur' }],
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  num: [
    {
      type: 'number',
      min: 3,
      max: 10,
      message: '人数应在3-10人之间',
      trigger: ['blur', 'change'],
    },
  ],
  address: [{ type: 'string', required: true, min: 10, trigger: 'blur' }],
  creditCode: [{ type: 'creditCode', required: true, min: 10, trigger: 'blur' }],
  postCode: [{ type: 'postCode', required: true, min: 10, trigger: 'blur' }],
  hobby: [{ type: 'enum', enums: ['读书', '音乐', '写代码'], trigger: 'blur' }],
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

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>
