<template>
  <e-form label-width="96px" :model="formData">
    <e-form-item label="申请事项">
      <e-input v-model="formData.name" />
    </e-form-item>
    <e-form-item label="预算金额">
      <e-input-number v-model="formData.amount" :min="0" />
    </e-form-item>
    <e-form-item label="备注">
      <e-input v-model="formData.remark" type="textarea" :rows="4" />
    </e-form-item>
  </e-form>

  <e-popup-header-extra>
    <e-button @click="preview">预览</e-button>
    <e-button type="primary" :loading="submitting" @click="submit">提交</e-button>
  </e-popup-header-extra>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const submitting = ref(false);
const formData = reactive({
  name: '办公设备采购',
  amount: 12000,
  remark: '',
});

const preview = () => {
  EMessage.info(`预览：${formData.name}`);
};

const submit = async () => {
  submitting.value = true;
  await Promise.resolve();
  EMessage.success(`已提交，预算 ${formData.amount}`);
  submitting.value = false;
};
</script>
