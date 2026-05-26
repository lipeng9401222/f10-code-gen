<template>
  <div class="embed-demo">
    <div class="embed-demo__toolbar">
      <e-button type="primary" @click="visible = true">打开嵌入式 Modal</e-button>
      <e-button @click="changeContainerHeight">切换容器高度</e-button>
    </div>

    <div class="embed-demo__target-wrap">
      <div class="embed-demo__target-title">目标容器（Modal 将嵌入到这里）</div>
      <div ref="targetElement" class="embed-demo__target" :style="{ height: `${containerHeight}px` }">
        <e-modal v-model="visible" mode="embed" :target="targetElement" title="嵌入式编辑面板">
          <p>当前为嵌入式模式，不会全屏覆盖页面。</p>
          <p>点击“切换容器高度”可验证弹窗尺寸跟随容器变化。</p>
        </e-modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const containerHeight = ref(320);

const targetElement = ref<HTMLElement | null>(null);

const changeContainerHeight = () => {
  containerHeight.value = containerHeight.value === 320 ? 420 : 320;
};
</script>

<style scoped>
.embed-demo__toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.embed-demo__target-wrap {
  border: 1px solid var(--e-border-color);
  border-radius: 6px;
  padding: 12px;
  background: var(--e-bg-color-page);
}

.embed-demo__target-title {
  margin-bottom: 8px;
  color: var(--e-text-color-secondary);
  font-size: 13px;
}

.embed-demo__target {
  position: relative;
  overflow: auto;
  border: 1px dashed var(--e-border-color);
  border-radius: 4px;
  background: var(--e-bg-color);
  transition: height 0.2s ease;
}
</style>
