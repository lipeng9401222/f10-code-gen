<template>
  <div class="demo-collapse">
    <e-collapse v-model="activeItem" accordion>
      <e-collapse-item id="1" title="一致性">
        <div>与现实生活保持一致：与现实生活的过程和逻辑一致，并符合用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应保持一致，如设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <div>操作反馈：通过样式更新和交互效果使用户清晰地感知其操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3" title="效率">
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确清晰：明确表达您的意图，以便用户能够快速理解并做出决策；</div>
        <div>易于识别：界面应该直接，有助于用户识别，避免他们记忆和回想。</div>
      </e-collapse-item>
      <e-collapse-item id="4" title="可控性">
        <div>决策制定：提供操作建议是可以接受的，但不要为用户做决策；</div>
        <div>可控的后果：用户应该被授予自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeItem = ref('1');
</script>
