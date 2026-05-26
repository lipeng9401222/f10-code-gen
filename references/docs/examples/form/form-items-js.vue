<template>
  <e-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
    <e-form-item
      prop="email"
      label="电子邮件"
      :rules="[
        {
          required: true,
          message: '请输入电子邮件地址',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的电子邮件地址',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <e-input v-model="dynamicValidateForm.email" />
    </e-form-item>
    <e-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="'域名' + (index + 1)"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true,
        message: '域名不能为空',
        trigger: 'blur',
      }"
    >
      <e-input v-model="domain.value" />
      <e-button class="mt-2" @click.prevent="removeDomain(domain)">删除</e-button>
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(formRef)">提交</e-button>
      <e-button @click="addDomain">新增域名</e-button>
      <e-button @click="resetForm(formRef)">重置</e-button>
    </e-form-item>
  </e-form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const formRef = ref(null);
const dynamicValidateForm = reactive({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
});

const removeDomain = (item) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  });
};

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
