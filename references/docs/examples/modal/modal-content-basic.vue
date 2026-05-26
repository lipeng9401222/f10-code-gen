<template>
  <e-card class="m-l">
    <e-form :model="formData" label-width="80px">
      <e-form-item label="用户名">
        <e-input v-model="formData.username" />
      </e-form-item>
      <e-form-item label="邮箱">
        <e-input v-model="formData.email" />
      </e-form-item>
      <e-form-item>
        <e-button @click="handleCancel">取消</e-button>
        <e-button type="primary" @click="handleSave">保存</e-button>
      </e-form-item>
    </e-form>
  </e-card>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const getCurrentModal = inject('getCurrentModal');
const modal = getCurrentModal?.();

const formData = ref({
  username: '张三',
  email: 'zhangsan@example.com',
});

const handleCancel = () => {
  modal?.close('cancel');
};

const handleSave = () => {
  EMessage.success('保存成功');
  modal?.close('save');
};
</script>
