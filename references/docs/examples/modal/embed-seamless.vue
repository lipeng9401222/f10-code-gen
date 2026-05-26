<template>
  <div class="seamless-demo">
    <div class="seamless-demo__toolbar">
      <e-button type="primary" @click="visible = true">打开无感嵌入 Modal</e-button>
    </div>

    <div ref="targetElement" :class="['seamless-demo__target', { 'is-hidden': targetHidden }]">
      <div class="seamless-demo__target-title">详情卡片</div>
      <p>示例通过 <code>open</code> 与 <code>before-close</code> 维护目标区域状态，并在相同位置展示 Modal 内容。</p>
      <p>适合把页面局部区域临时切换为编辑态或详情态。</p>

      <e-modal
        v-model="visible"
        mode="embed"
        :target="targetElement"
        title="编辑详情卡片"
        :before-close="handleBeforeClose"
        @open="targetHidden = true"
      >
        <template #header-extra>
          <e-button type="primary" @click="visible = false">完成</e-button>
        </template>
        <div class="seamless-demo__content">
          <div class="seamless-demo__content-title">编辑内容</div>
          <p>嵌入式 Modal 会自动弱化弹窗外观，并使用更贴近页面工具栏的简洁头部。</p>
        </div>
      </e-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const targetElement = ref<HTMLElement | null>(null);
const targetHidden = ref(false);

const handleBeforeClose = (done: (cancel?: boolean) => void) => {
  targetHidden.value = false;
  done();
};
</script>

<style scoped>
.seamless-demo__toolbar {
  margin-bottom: 12px;
}

.seamless-demo__target {
  min-height: 220px;
  padding: 20px;
  border: 1px solid var(--e-border-color);
  border-radius: 6px;
  background: var(--e-bg-color-page);
  box-sizing: border-box;
}

.seamless-demo__target.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.seamless-demo__target-title {
  margin-bottom: 12px;
  color: var(--e-text-color-primary);
  font-size: 16px;
  font-weight: 600;
}

.seamless-demo__target p {
  margin: 0 0 8px;
  color: var(--e-text-color-secondary);
}

.seamless-demo__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.seamless-demo__content-title {
  margin-bottom: 12px;
  color: var(--e-text-color-primary);
  font-size: 16px;
  font-weight: 600;
}

.seamless-demo__content p {
  margin: 0;
  color: var(--e-text-color-secondary);
}
</style>
