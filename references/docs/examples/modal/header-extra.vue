<template>
  <e-button @click="visible = true">打开带操作按钮的 Modal</e-button>

  <e-modal v-model="visible" title="新增业务数据">
    <template #header-extra>
      <e-button @click="handleSaveDraft">保存草稿</e-button>
      <e-button type="primary" @click="handleSubmit">提交</e-button>
    </template>

    <e-card>
      <e-form ref="formRef" :model="formData" label-width="100px">
        <e-form-item label="业务名称">
          <e-input v-model="formData.name" />
        </e-form-item>
        <e-form-item label="业务类型">
          <e-select v-model="formData.type" placeholder="请选择">
            <e-option label="类型一" value="1" />
            <e-option label="类型二" value="2" />
          </e-select>
        </e-form-item>
        <e-form-item label="描述">
          <e-input v-model="formData.description" type="textarea" :rows="4" />
        </e-form-item>
      </e-form>
    </e-card>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const visible = ref(false);
const formData = ref({
  name: '',
  type: '',
  description: '',
});

const handleSaveDraft = () => {
  EMessage.success('草稿已保存');
};

const handleSubmit = () => {
  EMessage.success('提交成功');
  visible.value = false;
};
</script>
