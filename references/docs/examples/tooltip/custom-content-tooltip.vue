<template>
  <div class="tooltip-custom-content-demo">
    <div class="demo-section">
      <div class="actions">
        <e-button type="primary" @click="initTooltip">初始化自定义内容工具提示</e-button>
        <e-button type="danger" @click="closeAllTooltips">关闭所有提示</e-button>
      </div>

      <div class="content-sections">
        <div class="section">
          <h5>基于元素属性的自定义内容</h5>
          <p class="hint">根据元素上的data属性生成丰富的HTML内容</p>
          <div class="items-container">
            <div
              v-for="item in staticItems"
              :key="item.id"
              class="tooltip-item static"
              :data-id="item.id"
              :data-name="item.name"
              :data-desc="item.description"
            >
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="section">
          <h5>异步加载内容</h5>
          <p class="hint">模拟从API获取数据填充提示内容</p>
          <div class="items-container">
            <div
              v-for="item in asyncItems"
              :key="item.id"
              class="tooltip-item async"
              :data-id="item.id"
              :data-name="item.name"
            >
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="section">
          <h5>自适应位置和主题</h5>
          <p class="hint">根据内容或元素类型调整提示的位置和主题</p>
          <div class="items-container">
            <div
              v-for="item in themeItems"
              :key="item.id"
              class="tooltip-item theme"
              :data-id="item.id"
              :data-name="item.name"
              :data-type="item.type"
              :data-theme="item.theme"
            >
              {{ item.type }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';
import { closeAllTooltip, createTooltip } from '@eui-components/components/tooltip';
import type {
  TooltipBeforeShowParams,
  TooltipBeforeShowResult,
  TooltipEffect,
  TooltipPlacement,
} from '@eui-components/components/tooltip';

// 记录创建的工具提示实例
const tooltipInstance = ref<{ close: () => void } | null>(null);

// 静态数据项
const staticItems = ref([
  { id: 1, name: '产品A', description: '这是产品A的详细介绍，包含完整的规格和特点。' },
  { id: 2, name: '产品B', description: '产品B是我们的畅销产品，具有优异的性能和耐用性。' },
  { id: 3, name: '产品C', description: '产品C适用于特殊场景，提供专业级别的支持。' },
]);

// 异步数据项
const asyncItems = ref([
  { id: 101, name: '用户统计' },
  { id: 102, name: '销售数据' },
  { id: 103, name: '库存信息' },
]);

// 主题数据项
const themeItems = ref([
  { id: 201, name: '操作提示', type: '信息', theme: 'info' },
  { id: 202, name: '成功消息', type: '成功', theme: 'success' },
  { id: 203, name: '警告信息', type: '警告', theme: 'warning' },
  { id: 204, name: '错误消息', type: '错误', theme: 'danger' },
]);

// 模拟API请求
const fetchItemDetails = (id: number): Promise<string> => {
  return new Promise((resolve) => {
    // 模拟网络请求
    setTimeout(() => {
      switch (id) {
        case 101:
          resolve('用户总数: 1,234<br>活跃用户: 789<br>新增用户: 56<br><small>更新于: 今天</small>');
          break;
        case 102:
          resolve('本月销售额: ¥123,456<br>同比增长: 12.5%<br>热销产品: 产品B<br><small>更新于: 昨天</small>');
          break;
        case 103:
          resolve('总库存量: 567件<br>库存预警: 3件<br>近期入库: 45件<br><small>更新于: 3天前</small>');
          break;
        default:
          resolve('无详细信息');
      }
    }, 300);
  });
};

/**
 * 初始化带有自定义内容的工具提示
 */
function initTooltip() {
  // 先清理之前可能存在的实例
  if (tooltipInstance.value) {
    tooltipInstance.value.close();
    tooltipInstance.value = null;
  }

  // 创建工具提示实例，使用beforeShow钩子自定义内容
  const instance = createTooltip({
    selector: '.tooltip-item', // 匹配所有提示项
    placement: 'top',
    effect: 'dark',
    // trigger: 'click',
    trigger: 'hover',
    showAfter: 200,
    hideAfter: 200,
    rawContent: true, // 将内容视为HTML字符串
    // 自定义内容获取逻辑
    beforeShow: async (params: TooltipBeforeShowParams): Promise<TooltipBeforeShowResult | void> => {
      const { el } = params;
      const id = Number(el.dataset.id || '0');
      const name = el.dataset.name || '';

      // 1. 处理静态内容元素
      if (el.classList.contains('static')) {
        const description = el.dataset.desc || '';
        return {
          content: `
            <div class="custom-tooltip-content">
              <h4>${name}</h4>
              <p>${description}</p>
              <div class="tooltip-footer">ID: ${id}</div>
            </div>
          `,
          placement: 'top',
        };
      }

      // 2. 处理异步内容元素
      if (el.classList.contains('async')) {
        // 显示加载状态
        el.classList.add('loading');

        try {
          // 异步获取详情
          const details = await fetchItemDetails(id);

          // 移除加载状态
          el.classList.remove('loading');

          return {
            content: `
              <div class="custom-tooltip-content">
                <h4>${name}</h4>
                <div class="content-body">${details}</div>
                <div class="loading-status">✓ 数据已加载</div>
              </div>
            `,
            effect: 'dark',
            placement: 'right',
          };
        } catch {
          el.classList.remove('loading');
          return {
            content: '加载失败，请稍后再试',
            effect: 'dark',
          };
        }
      }

      // 3. 处理主题样式元素
      if (el.classList.contains('theme')) {
        const type = el.dataset.type || '';
        const themeName = el.dataset.theme || '';

        // 根据类型决定主题和位置
        let placement = 'top';
        let effect = 'dark';

        switch (themeName) {
          case 'info':
            placement = 'top';
            effect = 'dark';
            break;
          case 'success':
            placement = 'right';
            effect = 'light';
            break;
          case 'warning':
            placement = 'bottom';
            effect = 'light';
            break;
          case 'danger':
            placement = 'left';
            effect = 'dark';
            break;
        }

        return {
          content: `
            <div class="custom-tooltip-content theme-${themeName}">
              <h4>${type}提示</h4>
              <p>${name}</p>
            </div>
          `,
          placement: placement as TooltipPlacement,
          effect: effect as TooltipEffect,
        };
      }

      // 默认返回元素的名称作为提示内容
      return {
        content: name,
      };
    },
  });

  // 保存实例引用
  tooltipInstance.value = instance;
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
initTooltip();
</script>

<style scoped>
/* 全局样式：自定义工具提示内容 */
.custom-tooltip-content {
  padding: 8px;
  font-size: 13px;
  min-width: 200px;
}

.custom-tooltip-content h4 {
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
  color: var(--e-color-white);
}

.custom-tooltip-content.theme-success h4 {
  color: var(--e-color-success);
}
.custom-tooltip-content.theme-warning h4 {
  color: var(--e-color-warning);
}
.custom-tooltip-content.theme-danger h4 {
  color: var(--e-color-danger);
}

.custom-tooltip-content p {
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.custom-tooltip-content .tooltip-footer {
  font-size: 12px;
  color: var(--e-text-color-secondary);
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.content-body {
  line-height: 1.5;
}

.loading-status {
  margin-top: 8px;
  color: var(--e-color-success);
  font-size: 12px;
}

/* 主题样式 */
.theme-info {
  color: var(--e-color-info);
}

.theme-success {
  color: var(--e-color-success);
}

.theme-warning {
  color: var(--e-color-warning);
}

.theme-danger {
  color: var(--e-color-danger);
}
</style>

<style scoped>
.tooltip-custom-content-demo {
  padding: 16px;
}

h4 {
  margin-top: 0;
  margin-bottom: 12px;
  font-weight: 600;
}

h5 {
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 500;
}

.description {
  margin-bottom: 20px;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.hint {
  margin-top: 0;
  margin-bottom: 12px;
  color: var(--e-text-color-placeholder);
  font-size: 13px;
  font-style: italic;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section {
  padding: 16px;
  border: 1px solid var(--e-border-color);
  border-radius: 4px;
}

.items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.tooltip-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid var(--e-border-color);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tooltip-item.static {
  background-color: var(--e-fill-color-light);
  color: var(--e-text-color-primary);
}

.tooltip-item.static:hover {
  background-color: var(--e-fill-color-hover);
}

.tooltip-item.async {
  background-color: var(--e-color-success-light-9);
  border-color: var(--e-color-success-light-3);
  color: var(--e-color-success);
}

.tooltip-item.async:hover {
  background-color: var(--e-color-success-light-8);
}

.tooltip-item.async.loading::after {
  content: '...';
  position: absolute;
  right: 6px;
  animation: loading 1s infinite;
}

@keyframes loading {
  0% {
    content: '.';
  }
  33% {
    content: '..';
  }
  66% {
    content: '...';
  }
}

.tooltip-item.theme {
  background-color: var(--e-fill-color-light);
}

.tooltip-item.theme:nth-child(1) {
  border-color: var(--e-text-color-secondary);
  color: var(--e-text-color-secondary);
}

.tooltip-item.theme:nth-child(2) {
  border-color: var(--e-color-success);
  color: var(--e-color-success);
}

.tooltip-item.theme:nth-child(3) {
  border-color: var(--e-color-warning);
  color: var(--e-color-warning);
}

.tooltip-item.theme:nth-child(4) {
  border-color: var(--e-color-danger);
  color: var(--e-color-danger);
}
</style>
