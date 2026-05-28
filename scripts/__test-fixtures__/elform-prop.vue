<template>
  <ep-layout-manager>
    <e-form :model="formData" :rules="formRules" ref="formRef">
      <e-form-item label="名称" prop="name">
        <e-input v-model="formData.name" />
      </e-form-item>
    </e-form>
  </ep-layout-manager>
</template>

<script setup>
import { reactive, ref } from 'vue';

// 这是 Element form 的 :model prop，不应该被 DM-R11.1 误报
const formData = reactive({ name: '' });
const formRules = ref({ name: [{ required: true, message: '请输入名称' }] });
const formRef = ref(null);
</script>
