<template>
  <div class="tooltip-programmatic-demo">
    <h4>使用JavaScript方法创建工具提示</h4>
    <p class="description">通过<code>createTooltip</code>方法，您可以为多个元素添加工具提示，支持动态添加的元素。</p>

    <div class="demo-section">
      <div class="actions">
        <e-button @click="initTooltips">初始化工具提示</e-button>
        <e-button type="danger" @click="closeAllTooltips">关闭所有提示</e-button>
      </div>

      <div class="tooltip-container">
        <h5>工具提示有 9 种放置方式</h5>
        <p class="hint">通过 data-tooltip-placement 属性可以设置工具提示的出现位置</p>

        <div class="tooltip-demo-box">
          <!-- 顶部三个方向 -->
          <div class="row center">
            <div class="tooltipped-item" data-tooltip="顶部左侧提示信息" data-tooltip-placement="top-start">
              top-start
            </div>
            <div class="tooltipped-item" data-tooltip="顶部居中提示信息" data-tooltip-placement="top">top</div>
            <div class="tooltipped-item" data-tooltip="顶部右侧提示信息" data-tooltip-placement="top-end">top-end</div>
          </div>

          <!-- 左右两侧方向的第一行 -->
          <div class="row">
            <div class="tooltipped-item" data-tooltip="左侧顶部提示信息" data-tooltip-placement="left-start">
              left-start
            </div>
            <div class="tooltipped-item" data-tooltip="右侧顶部提示信息" data-tooltip-placement="right-start">
              right-start
            </div>
          </div>

          <!-- 左右两侧方向的第二行 -->
          <div class="row">
            <div class="tooltipped-item" data-tooltip="左侧居中提示信息" data-tooltip-placement="left">left</div>
            <div class="tooltipped-item" data-tooltip="右侧居中提示信息" data-tooltip-placement="right">right</div>
          </div>

          <!-- 左右两侧方向的第三行 -->
          <div class="row">
            <div class="tooltipped-item" data-tooltip="左侧底部提示信息" data-tooltip-placement="left-end">
              left-end
            </div>
            <div class="tooltipped-item" data-tooltip="右侧底部提示信息" data-tooltip-placement="right-end">
              right-end
            </div>
          </div>

          <!-- 底部三个方向 -->
          <div class="row center">
            <div class="tooltipped-item" data-tooltip="底部左侧提示信息" data-tooltip-placement="bottom-start">
              bottom-start
            </div>
            <div class="tooltipped-item" data-tooltip="底部居中提示信息" data-tooltip-placement="bottom">bottom</div>
            <div class="tooltipped-item" data-tooltip="底部右侧提示信息" data-tooltip-placement="bottom-end">
              bottom-end
            </div>
          </div>
        </div>

        <h5>主题</h5>
        <p class="hint">通过 data-tooltip-effect 属性可以设置工具提示的主题</p>
        <div class="element-row">
          <div class="tooltipped-item" data-tooltip="我是一个暗色主题提示" data-tooltip-effect="dark">暗色主题</div>
          <div class="tooltipped-item" data-tooltip="我是一个亮色主题提示" data-tooltip-effect="light">亮色主题</div>
        </div>

        <h5>动态添加的元素</h5>
        <e-button type="primary" @click="addElement">添加新元素</e-button>
        <p class="hint">通过点击"添加新元素"按钮添加的元素，无需重新初始化工具提示</p>
        <div class="dynamic-container">
          <div
            v-for="(item, index) in dynamicElements"
            :key="index"
            class="tooltipped-item dynamic"
            :data-tooltip="`我是动态添加的第 ${index + 1} 个元素`"
          >
            动态元素 #{{ index + 1 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';
import { closeAllTooltip, createTooltip } from '@epoint-fe/eui-components';
import type { TooltipBeforeShowParams } from '@eui-components/components/tooltip';

// 记录创建的工具提示实例
const tooltipInstance = ref<{ close: () => void } | null>(null);
// 动态元素列表
const dynamicElements = ref<number[]>([]);

/**
 * 初始化工具提示
 * 使用事件委托，只需初始化一次，即可支持动态添加的元素
 */
function initTooltips() {
  // 先清理之前可能存在的实例
  if (tooltipInstance.value) {
    tooltipInstance.value.close();
    tooltipInstance.value = null;
  }

  // 创建工具提示实例
  const instance = createTooltip({
    selector: '.tooltipped-item', // 为所有匹配选择器的元素添加工具提示
    placement: 'top', // 默认位置，可被元素属性覆盖
    effect: 'dark', // 默认主题，可被元素属性覆盖
    trigger: 'hover', // 悬停触发
    showAfter: 100, // 显示延迟（毫秒）
    hideAfter: 100, // 隐藏延迟（毫秒）
    rawContent: true, // 将内容视为HTML字符串
    // 从data-tooltip属性获取内容
    beforeShow: (params: TooltipBeforeShowParams) => {
      const { el } = params;
      // 优先使用data-tooltip属性，其次使用title属性
      const content = el.dataset.tooltip || el.getAttribute('title') || '';
      // 检查是否有自定义位置
      const placementAttr = el.dataset.tooltipPlacement;
      // 检查是否有自定义主题
      const effectAttr = el.dataset.tooltipEffect;

      return {
        content,
        placement: placementAttr || params.placement,
        effect: effectAttr || params.effect,
      };
    },
  });

  // 保存实例引用
  tooltipInstance.value = instance;
}

/**
 * 添加新的动态元素
 */
function addElement() {
  const currentCount = dynamicElements.value.length;
  dynamicElements.value.push(currentCount + 1);
}

/**
 * 关闭所有工具提示
 */
function closeAllTooltips() {
  closeAllTooltip();
  tooltipInstance.value = null;
}

// 组件销毁前清理工具提示
onBeforeUnmount(() => {
  closeAllTooltips();
});

// 初始自动初始化
initTooltips();
</script>

<style scoped>
.tooltip-programmatic-demo {
  padding: 16px;
}

h4 {
  margin-top: 0;
  margin-bottom: 12px;
  font-weight: 600;
}

h5 {
  margin-top: 24px;
  margin-bottom: 8px;
  font-weight: 500;
}

.description {
  margin-bottom: 20px;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.hint {
  margin-top: 12px;
  margin-bottom: 12px;
  color: #909399;
  font-size: 13px;
  font-style: italic;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tooltip-container {
  margin-top: 16px;
}

.element-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.tooltipped-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid var(--e-border-color);
  border-radius: var(--e-border-radius-base);
  background-color: var(--e-fill-color-light);
  color: var(--e-text-color-primary);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tooltipped-item:hover {
  background-color: var(--e-fill-color-hover);
}

.dynamic-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 16px;
  border: 1px dashed var(--e-border-color);
  border-radius: var(--e-border-radius-base);
  min-height: 50px;
}

.tooltipped-item.dynamic {
  background-color: var(--e-color-success-light-9);
  border-color: var(--e-color-success-light-3);
  color: var(--e-color-success);
}

.tooltipped-item.dynamic:hover {
  background-color: var(--e-color-success-light-8);
}

.tooltip-demo-box {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.row.center {
  justify-content: center;
}
</style>
