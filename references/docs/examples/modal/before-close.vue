<template>
  <e-button @click="visible = true">打开表单 Modal</e-button>

  <e-modal v-model="visible" title="编辑表单" :before-close="handleBeforeClose">
    <e-card>
      <e-form :model="formData" label-width="100px">
        <e-form-item label="标题">
          <e-input v-model="formData.title" @input="hasChanged = true" />
        </e-form-item>
        <e-form-item label="内容">
          <e-input v-model="formData.content" type="textarea" :rows="4" @input="hasChanged = true" />
        </e-form-item>
      </e-form>
    </e-card>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';

const visible = ref(false);
const hasChanged = ref(false);
const formData = ref({
  title: '',
  content: '',
});

const handleBeforeClose = (done: () => void) => {
  if (hasChanged.value) {
    EMessageBox.confirm('表单尚未保存,确定要关闭吗?')
      .then(() => {
        hasChanged.value = false;
        done();
      })
      .catch(() => {
        // 取消关闭
      });
  } else {
    done();
  }
};
</script>
