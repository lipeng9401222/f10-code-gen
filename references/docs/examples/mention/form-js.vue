<template>
  <e-form ref="ruleFormRef" style="max-width: 600px" label-width="120px" :model="ruleForm" :rules="rules">
    <e-form-item label="name" prop="name">
      <e-mention v-model="ruleForm.name" :options="options" />
    </e-form-item>
    <e-form-item label="desc" prop="desc">
      <e-mention v-model="ruleForm.desc" type="textarea" :options="options" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(ruleFormRef)"> Submit </e-button>
      <e-button @click="resetForm(ruleFormRef)">Reset</e-button>
    </e-form-item>
  </e-form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const ruleFormRef = ref();
const ruleForm = reactive({
  name: '',
  desc: '',
});

const options = ref([
  {
    label: 'Fuphoenixes',
    value: 'Fuphoenixes',
  },
  {
    label: 'kooriookami',
    value: 'kooriookami',
  },
  {
    label: 'Jeremy',
    value: 'Jeremy',
  },
  {
    label: 'btea',
    value: 'btea',
  },
]);

const rules = reactive({
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  desc: [{ required: true, message: 'Please input desc', trigger: 'blur' }],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
