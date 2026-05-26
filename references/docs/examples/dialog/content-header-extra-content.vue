<template>
  <e-form label-width="80px" :model="formData">
    <e-form-item label="项目名称">
      <e-input v-model="formData.name" />
    </e-form-item>
    <e-form-item label="说明">
      <e-input v-model="formData.description" type="textarea" :rows="3" />
    </e-form-item>
  </e-form>

  <e-popup-header-extra>
    <e-button @click="reset">重置</e-button>
    <e-button type="primary" :loading="saving" @click="save">保存</e-button>
  </e-popup-header-extra>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const saving = ref(false);
const formData = reactive({
  name: '门户改造',
  description: '按钮声明在内容组件中，可以直接访问当前表单状态。',
});

const reset = () => {
  formData.name = '';
  formData.description = '';
};

const save = async () => {
  saving.value = true;
  await Promise.resolve();
  EMessage.success(`已保存：${formData.name || '未命名项目'}`);
  saving.value = false;
};
</script>
