<template>
  <e-form :model="form" label-width="120px">
    <e-form-item label="输入框">
      <e-input v-model="form.input" placeholder="Please input" />
    </e-form-item>
    <e-form-item label="日期">
      <e-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%" />
    </e-form-item>

    <e-form-item>
      <e-button type="primary" :loading="loading" @click="save">提交</e-button>
    </e-form-item>
  </e-form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';
const form = reactive({
  input: 'This is EUI input component.',
  date: new Date(),
});
const loading = ref(false);
const save = () => {
  loading.value = true;

  setTimeout(
    () => {
      loading.value = false;
      const isSuccess = Math.random() > 0.4;
      if (isSuccess) {
        EMessage.success({ message: '保存成功' });
      } else {
        EMessage.error({ message: '保存失败' });
      }
    },
    (Math.random() * 2000) >>> 0
  );
};
</script>
