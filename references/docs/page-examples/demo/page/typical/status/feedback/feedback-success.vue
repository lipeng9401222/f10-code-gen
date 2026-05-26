<template>
  <div class="eui-page">
    <e-main class="eui-main-section section__center">
      <e-result icon="success" :title="model.title" :sub-title="model.info">
        <template #extra>
          <e-button type="primary" @click="onComplete">完善信息</e-button>
          <e-button @click="onBack" :disabled="model.countdown > 0"
            >返回<span v-if="model.countdown > 0">({{ model.countdown }})</span></e-button
          >
        </template>
      </e-result>
    </e-main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Utils } from '@epframe/eui-core';

defineOptions({
  name: 'FeedbackSuccess'
});

const model = Utils.defineDataModel(() => {
  const INIT_COUNTDOWN = 5;
  const countdown = ref(INIT_COUNTDOWN);
  const title = ref('创建成功');
  const info = ref('建议进一步完善用户信息，填写完整资料');

  return {
    models: {
      title,
      info,
      countdown
    }
  };
});

// 点击完善信息
const onComplete = () => {
  Utils.logger.info('点击完善信息');
};

// 点击返回
const onBack = () => {
  if (model.countdown > 0) {
    return;
  }
  Utils.logger.info('点击返回');
};

let timer = null;
onMounted(() => {
  // 倒计时
  timer = setInterval(() => {
    model.countdown--;
    if (model.countdown <= 0) {
      clearInterval(timer);
      onBack();
    }
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
<style scoped lang="scss"></style>
