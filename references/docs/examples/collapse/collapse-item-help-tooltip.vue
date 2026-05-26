<template>
  <div class="collapse-help-tip-demo">
    <e-collapse v-model="activeItems">
      <e-collapse-item id="basic" title="基础帮助提示" tooltip="这一项用于说明标题旁的补充信息。">
        <div>字符串会作为 Tooltip 的 content 展示。</div>
      </e-collapse-item>

      <e-collapse-item id="object" title="对象配置提示" :tooltip="objectTooltip">
        <div>对象形式可继续传入 content、placement、effect、showArrow 等 Tooltip 配置。</div>
      </e-collapse-item>

      <e-collapse-item
        id="text"
        title="纯文本提示"
        tooltip="这一段内容直接展示在标题右侧。"
        tooltip-mode="text"
        tooltip-status="warning"
      >
        <div>纯文本模式由 CollapseItem 自己渲染，不创建帮助提示图标。</div>
      </e-collapse-item>

      <e-collapse-item id="slot" title="插槽内容提示" :tooltip="slotTooltip">
        <template #tooltip-content>
          <div class="collapse-help-tip-demo__tooltip-content">
            <div class="collapse-help-tip-demo__tooltip-title">高级配置说明</div>
            <div>提示内容可以通过 tooltip-content 插槽自定义。</div>
            <div>placement、effect 等配置仍然从 tooltip 属性透传。</div>
          </div>
        </template>
        <div>当 tooltip-content 插槽存在时，帮助提示内容使用插槽渲染。</div>
      </e-collapse-item>

      <e-collapse-item
        id="custom-icon"
        title="自定义图标"
        tooltip="可以通过 tooltip-icon 替换默认帮助图标。"
        :tooltip-icon="InfoFilled"
      >
        <div>自定义图标仍然复用 Tooltip 的触发能力。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InfoFilled } from '@epoint-fe/eui-icons';

const activeItems = ref(['basic', 'object', 'text', 'slot', 'custom-icon']);

const objectTooltip = {
  content: '对象模式：提示显示在右侧，使用 dark 主题，并且关闭箭头。',
  placement: 'right',
  effect: 'dark',
  showArrow: false,
} as const;

const slotTooltip = {
  placement: 'right',
  effect: 'light',
  showArrow: true,
} as const;
</script>

<style lang="scss" scoped>
.collapse-help-tip-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__tooltip-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 260px;
    line-height: 20px;
  }

  &__tooltip-title {
    font-weight: 600;
    color: var(--e-text-color-primary);
  }
}
</style>
