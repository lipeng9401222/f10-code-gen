<template>
  <div class="eui-page">
    <e-main class="eui-main-section section__center">
      <e-result icon="error" :title="model.title" :sub-title="model.info">
        <template #extra>
          <e-button type="primary" @click="onBack">返回修改</e-button>
        </template>
      </e-result>
    </e-main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Utils } from '@epframe/eui-core';

defineOptions({
  name: 'FeedbackError'
});

const model = Utils.defineDataModel(() => {
  const title = ref('提交失败');
  const info = ref('请核对并修改信息后，再重新提交');

  return {
    models: {
      title,
      info
    }
  };
});

// 点击返回
const onBack = () => {
  Utils.logger.info('点击返回');
};
</script>
