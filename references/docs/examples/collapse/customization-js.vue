<template>
  <div class="demo-collapse">
    <e-collapse accordion>
      <e-collapse-item id="1" title="一致性">
        <template #index="{ index, formattedIndex }">
          <span class="index" style="color: red">
            程序员中默认认为起始是 {{ index }} 但是人更习惯认为是 {{ formattedIndex }}
          </span>
        </template>
        <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <template #index>
          <span class="index">2</span>
        </template>
        <div>操作反馈：通过样式更新和交互效果使用户能够清晰地感知他们的操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3">
        <template #title>
          效率<e-icon class="header-icon">
            <info-filled />
          </e-icon>
        </template>
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确和清晰：明确表达您的意图，以便用户能够迅速理解并做出决策；</div>
        <div>易于识别：界面应该直截了当，帮助用户辨识，避免他们记忆和回忆。</div>
      </e-collapse-item>
      <e-collapse-item id="4" title="可控性">
        <div>决策制定：提供关于操作的建议是可以接受的，但不要代替用户做决策；</div>
        <div>可控的后果：用户应该被赋予自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script setup>
import { InfoFilled } from '@epoint-fe/eui-icons';
</script>
<style scoped lang="scss">
.index {
  color: #f00;
  font-weight: bold;
  margin-right: 6px;
}
</style>
