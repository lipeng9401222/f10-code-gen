<template>
  <e-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
    <e-form-item
      label="年龄"
      prop="age"
      :rules="[
        { required: true, message: '年龄是必填项' },
        { type: 'number', message: '年龄必须是数字' },
      ]"
    >
      <e-input v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(formRef)">提交</e-button>
      <e-button @click="resetForm(formRef)">重置</e-button>
    </e-form-item>
  </e-form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const formRef = ref(null);

const numberValidateForm = reactive({
  age: '',
});

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
