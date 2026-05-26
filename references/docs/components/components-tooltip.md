---
title: Tooltip
originUrl: http://192.168.219.170/docs/vue/latest/component/component/tooltip.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

# Tooltip

显示鼠标悬停时的提示信息。

> **💡 提示**
>
> 此组件在 SSR（例如：[Nuxt](https://nuxt.com/v3)）和 SSG（例如：[VitePress](https://vitepress.vuejs.org/)）中使用时，需要 `<client-only></client-only>` 包裹。

## 基本用法

工具提示有 9 种放置方式。

**Demo 示例**: `tooltip/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <e-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start">
        <e-button>top-start</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Top Center prompts info" placement="top">
        <e-button>top</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Top Right prompts info" placement="top-end">
        <e-button>top-end</e-button>
      </e-tooltip>
    </div>
    <div class="row">
      <e-tooltip class="box-item" effect="dark" content="Left Top prompts info" placement="left-start">
        <e-button>left-start</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Right Top prompts info" placement="right-start">
        <e-button>right-start</e-button>
      </e-tooltip>
    </div>
    <div class="row">
      <e-tooltip class="box-item" effect="dark" content="Left Center prompts info" placement="left">
        <e-button class="mt-3 mb-3">left</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Right Center prompts info" placement="right">
        <e-button>right</e-button>
      </e-tooltip>
    </div>
    <div class="row">
      <e-tooltip class="box-item" effect="dark" content="Left Bottom prompts info" placement="left-end">
        <e-button>left-end</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Right Bottom prompts info" placement="right-end">
        <e-button>right-end</e-button>
      </e-tooltip>
    </div>
    <div class="row center">
      <e-tooltip class="box-item" effect="dark" content="Bottom Left prompts info" placement="bottom-start">
        <e-button>bottom-start</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Bottom Center prompts info" placement="bottom">
        <e-button>bottom</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Bottom Right prompts info" placement="bottom-end">
        <e-button>bottom-end</e-button>
      </e-tooltip>
    </div>
  </div>
</template>

<style scoped>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>

```

## 主题

工具提示有三种内置主题：`dark`、`light` 和 `danger`。

> **💡 提示**
>
> 要使用自定义主题，您需要知道您的工具提示是渲染到哪个元素上的，如果您的工具提示是渲染到根元素上的，您需要全局设置 css 规则。
> 
> 当您使用自定义主题并同时显示箭头时，建议不要使用线性渐变背景色，因为弹出箭头和内容是两个不同的元素，弹出箭头的样式需要单独设置，当涉及到渐变背景色时，可能看起来有些奇怪。

**Demo 示例**: `tooltip/theme`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <e-tooltip content="Top center" placement="top">
    <e-button>Dark</e-button>
  </e-tooltip>
  <e-tooltip content="Bottom center" placement="bottom" effect="light">
    <e-button>Light</e-button>
  </e-tooltip>
  <e-tooltip content="Bottom center" placement="bottom" effect="danger">
    <e-button>Danger</e-button>
  </e-tooltip>
  <e-tooltip content="Bottom center" effect="customized">
    <e-button>Customized theme</e-button>
  </e-tooltip>
</template>

<style>
.e-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.e-popper.is-customized .e-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>

```

## 无箭头提示

**Demo 示例**: `tooltip/ellipsis`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <div class="ellipsis-container">
    <!-- 简单的文本溢出示例 -->
    <div class="ellipsis-item">
      <div class="ellipsis-text" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
        这是一段很长的文本内容，当空间不足时会被截断并显示省略号
      </div>
      <e-tooltip v-model:visible="showTooltip" :content="longText" placement="top" :show-arrow="false">
        <div class="tooltip-target" />
      </e-tooltip>
    </div>

    <!-- 文件名称溢出示例 -->
    <div class="ellipsis-item">
      <div class="ellipsis-text">
        <span>文件名：</span>
        <span class="filename">very_long_filename_example_2023.txt</span>
        <e-tooltip content="very_long_filename_example_2023.txt" placement="top" :show-arrow="false">
          <span class="tooltip-target" />
        </e-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showTooltip = ref(false);
const longText = '这是一段很长的文本内容，当空间不足时会被截断并显示省略号。无箭头提示更加简洁。';
</script>

<style scoped>
.ellipsis-container {
  width: 250px;
}

.ellipsis-item {
  position: relative;
  margin-bottom: 16px;
  border: 1px solid #eee;
  padding: 8px;
  border-radius: 4px;
}

.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filename {
  color: #409eff;
}

.tooltip-target {
  position: absolute;
  inset: 0;
  cursor: pointer;
}
</style>

```

## 更多内容

显示多行文本并设置其格式。

**Demo 示例**: `tooltip/rich-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <e-tooltip placement="top">
    <template #content> multiple lines<br />second line </template>
    <e-button>Top center</e-button>
  </e-tooltip>
</template>

```

## 高级用法

除了基本用法外，还有一些属性允许您自定义：

`transition` 属性允许您自定义工具提示显示或隐藏的动画，Default为 e-fade-in-linear。

`disabled` 属性允许您禁用 `tooltip`。您只需将其设置为 `true`。

事实上，工具提示是基于 [EPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper) 的扩展，您可以使用 EPopper 中允许的任何属性。

**Demo 示例**: `tooltip/advanced-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <e-tooltip :disabled="disabled" content="click to close tooltip function" placement="bottom" effect="light">
    <e-button @click="disabled = !disabled">click to {{ disabled ? 'active' : 'close' }} tooltip function</e-button>
  </e-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const disabled = ref(false);
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.expand-fade-leave-active {
  margin-left: 20px;
  opacity: 0;
}
</style>

```

> **💡 提示**
>
> `router-link` 组件在工具提示中不受支持，请使用 `vm.$router.push`。
> 
> 禁用的表单元素不支持工具提示，更多信息可以在 [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter) 中找到。您需要将禁用的表单元素包裹在一个容器元素中，以使工具提示正常工作。

## HTML 内容

`content` 属性可以设置为 HTML 字符串。

> **⚠️ 警告**
>
> 尽管 `content` 属性支持 HTML 字符串，但在您的网站上动态渲染任意 HTML 可能非常危险，因为它很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此，当 `raw-content` 开启时，请确保 `content` 是可信的，并且**永远不要**分配用户提供的 `content`。

**Demo 示例**: `tooltip/html-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <e-tooltip content="<span>The content can be <strong>HTML</strong></span>" raw-content>
    <e-button>hover me</e-button>
  </e-tooltip>
</template>

```

## 虚拟触发

有时我们想要在其他触发元素上渲染工具提示，我们可以将触发器和内容分开。

> **💡 提示**
>
> 虚拟触发工具提示是受控组件，因此您将必须自行控制工具提示的可见性。这种情况下，**您将不能**通过点击其他地方关闭工具提示。

**Demo 示例**: `tooltip/virtual-trigger`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <e-tooltip
    v-model:visible="visible"
    content="Bottom center"
    placement="bottom"
    effect="light"
    trigger="click"
    virtual-triggering
    :virtual-ref="triggerRef"
  />
  <e-button @click="visible = !visible">test</e-button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const visible = ref(false);
const triggerRef = ref({
  getBoundingClientRect() {
    return position.value;
  },
});

const position = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});

const mousemoveHandler = (e) => {
  position.value = DOMRect.fromRect({
    width: 0,
    height: 0,
    x: e.clientX,
    y: e.clientY,
  });
};
onMounted(() => {
  document.addEventListener('mousemove', mousemoveHandler);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', mousemoveHandler);
});
</script>

```

## 单例

工具提示也可以是单例的，这意味着您可以有多个触发器，但只有一个工具提示实例，这个功能是基于 `虚拟触发` 实现的。

> **💡 提示**
>
> 已知问题：使用单例时，弹出窗口可能会从意外的地方弹出。

**Demo 示例**: `tooltip/singleton`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <div>
    <e-button v-for="i in 3" :key="i" @mouseover="(e) => (buttonRef = e.currentTarget)" @click="visible = !visible"
      >Click to open tooltip</e-button
    >
  </div>

  <e-tooltip
    ref="tooltipRef"
    :visible="visible"
    :popper-options="{
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            enabled: false,
          },
        },
      ],
    }"
    :virtual-ref="buttonRef"
    virtual-triggering
    popper-class="singleton-tooltip"
  >
    <template #content>
      <span> Some content </span>
    </template>
  </e-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const buttonRef = ref();
const tooltipRef = ref();

const visible = ref(false);
</script>

<style scoped>
.singleton-tooltip {
  transition: transform 0.3s var(--e-transition-function-fast-bezier);
}
</style>

```

## 受控

工具提示可以由父组件控制，通过使用 `:visible`，您可以实现双向绑定。

**Demo 示例**: `tooltip/controlled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <e-tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <e-button @mouseenter="visible = true" @mouseleave="visible = false"> Hover me </e-button>
  </e-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

```

## 动画

工具提示可以自定义动画，您可以设置您所需的动画函数。

**Demo 示例**: `tooltip/animations`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
<template>
  <e-tooltip content="I am an e-tooltip">
    <e-button>trigger me</e-button>
  </e-tooltip>
</template>

<script lang="ts" setup></script>

```

## 编程式创建工具提示

除了组件形式，Tooltip 也可以通过 JavaScript 方法来创建。这在您需要为多个动态元素添加工具提示，或者需要更灵活控制工具提示行为时非常有用。

**Demo 示例**: `tooltip/programmatic-tooltip`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
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

```

> **💡 提示**
>
> `createTooltip` 必须提供 `selector` 参数。工具提示将应用于匹配选择器的所有元素，包括初始化后动态添加的元素。
> 
> 每个工具提示实例都返回一个包含 `close()` 方法的对象，您可以使用它来手动关闭工具提示。您也可以使用 `closeAllTooltip()` 方法关闭所有活动的工具提示实例。

## 编程式-自定义内容获取

编程式工具提示支持通过 `beforeShow` 钩子函数自定义内容获取逻辑，无论是基于元素的属性还是通过异步请求获取内容，都能轻松实现。

**Demo 示例**: `tooltip/custom-content-tooltip`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html)

```vue
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

```

> **⚠️ 警告**
>
> 内容使用 HTML 需要配合 `rawContent` 为 `true` 生效，但此时你要防止XSS供给，确保HTML字符串安全。

## API

### Attributes

| Name                      | Description                                                                        | Type                                                                                                                                                                        | Default           |
| ------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| append-to                 | 工具提示内容附加到的元素                                                           | ^[CSSSelector] / ^[HTMLElement]                                                                                                                                             | —                 |
| effect                    | 工具提示主题，内置主题：`dark` / `light` / `danger`                                | ^[enum]`'dark' \| 'light' \| 'danger'`                                                                                                                                      | dark              |
| content                   | 显示内容，可以通过 `slot#content` 覆盖                                             | ^[string]                                                                                                                                                                   | ''                |
| raw-content               | 是否将 `content` 视为 HTML 字符串                                                  | ^[boolean]                                                                                                                                                                  | false             |
| placement                 | 工具提示的位置                                                                     | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | bottom            |
| visible / v-model:visible | 工具提示的可见性                                                                   | ^[boolean]                                                                                                                                                                  | —                 |
| disabled                  | 工具提示是否被禁用                                                                 | ^[boolean]                                                                                                                                                                  | —                 |
| offset                    | 工具提示的偏移距离。未设置时自动计算：有箭头为 5，无箭头为 2                       | ^[number]                                                                                                                                                                   | —                 |
| transition                | 动画Name                                                                           | ^[string]                                                                                                                                                                   | —                 |
| popper-options            | [popper.js](https://popper.js.org/docs/v2/) 参数                                   | ^[object]参考 [popper.js](https://popper.js.org/docs/v2/) 文档                                                                                                              | {}                |
| show-after                | 出现延迟，以毫秒为单位                                                             | ^[number]                                                                                                                                                                   | 0                 |
| show-arrow                | 工具提示内容是否有箭头                                                             | ^[boolean]                                                                                                                                                                  | true              |
| hide-after                | 消失延迟，以毫秒为单位                                                             | ^[number]                                                                                                                                                                   | 200               |
| auto-close                | 自动隐藏工具提示的超时时间，以毫秒为单位                                           | ^[number]                                                                                                                                                                   | 0                 |
| popper-class              | 工具提示弹出框的自定义类名                                                         | ^[string]                                                                                                                                                                   | —                 |
| enterable                 | 鼠标是否可以进入工具提示                                                           | ^[boolean]                                                                                                                                                                  | true              |
| teleported                | 工具提示内容是否被传送，如果为 `true`，它将被传送到 `append-to` 设置的位置         | ^[boolean]                                                                                                                                                                  | true              |
| trigger                   | 工具提示被触发（显示）的方式                                                       | ^[enum]`'hover' \| 'click' \| 'focus' \| 'contextmenu'`                                                                                                                     | hover             |
| virtual-triggering        | 表示是否启用虚拟触发                                                               | ^[boolean]                                                                                                                                                                  | —                 |
| virtual-ref               | 表示工具提示附加到的参考元素                                                       | ^[HTMLElement]                                                                                                                                                              | —                 |
| trigger-keys              | 当您点击鼠标聚焦在触发元素上时，您可以定义一组键盘代码来通过键盘控制工具提示的显示 | ^[Array]                                                                                                                                                                    | ['Enter','Space'] |
| persistent                | 当工具提示不活跃且 `persistent` 为 `false` 时，popconfirm 将被销毁                 | ^[boolean]                                                                                                                                                                  | —                 |
| aria-label ^(a11y)        | 与 `aria-label` 相同                                                               | ^[string]                                                                                                                                                                   | —                 |

### Slots

| Name    | Description          |
| ------- | -------------------- |
| default | 提示框触发和参考元素 |
| content | 自定义内容           |

### Exposes

| Name                 | Description                                       | Type                                              |
| -------------------- | ------------------------------------------------- | ------------------------------------------------- |
| popperRef            | e-popper 组件实例                                 | ^[object]`Ref<PopperInstance \| null>`            |
| contentRef           | e-tooltip-content 组件实例                        | ^[object]`Ref<TooltipContentInstance \| null>`    |
| isFocusInsideContent | 验证当前焦点事件是否触发在 e-tooltip-content 内部 | ^[Function]`() => boolean \| undefined`           |
| updatePopper         | 更新 e-popper 组件实例                            | ^[Function]`() => void`                           |
| open                 | 打开 e-tooltip                                                 | ^[Function]`(event?: Event \| undefined) => void` |
| close                | 关闭 e-tooltip                                                 | ^[Function]`(event?: Event \| undefined) => void` |
| onOpen ^(deprecated) | 已废弃，将在下个大版本移除，请使用 `open` 代替                 | ^[Function]`(event?: Event \| undefined) => void` |
| onClose ^(deprecated) | 已废弃，将在下个大版本移除，请使用 `close` 代替               | ^[Function]`(event?: Event \| undefined) => void` |
| hide ^(deprecated)   | 已废弃，请使用 `close` 代替                                     | ^[Function]`(event?: Event \| undefined) => void` |

### createTooltipOptions

以下是通过 `createTooltip` 方法创建工具提示时可用的配置选项：

| Name       | Description                                          | Type                                                                                                     | Default       |
| ---------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------- |
| selector   | CSS选择器，用于匹配需要添加工具提示的元素 **(必填)** | ^[string]                                                                                                | —             |
| placement  | 工具提示的位置                                       | ^[enum]与组件相同的位置值                                                                                | bottom        |
| effect     | 工具提示主题                                         | ^[enum]`'dark' \| 'light'`                                                                               | dark          |
| content    | 工具提示内容                                         | ^[string] / ^[function]`() => string` / ^[VNode]                                                         | ''            |
| appendTo   | 工具提示内容附加到的元素                             | ^[HTMLElement] / ^[string]                                                                               | document.body |
| onClose    | 工具提示关闭时的回调                                 | ^[function]`() => void`                                                                                  | —             |
| onShow     | 工具提示显示时的回调                                 | ^[function]`() => void`                                                                                  | —             |
| trigger    | 工具提示的触发方式                                   | ^[enum]`'hover' \| 'click' \| 'hover click'`                                                             | hover         |
| showAfter  | 显示延迟，以毫秒为单位                               | ^[number]                                                                                                | 0             |
| hideAfter  | 隐藏延迟，以毫秒为单位                               | ^[number]                                                                                                | 200           |
| rawContent | 是否将内容视为HTML字符串                             | ^[boolean]                                                                                               | false         |
| beforeShow | 显示前钩子函数，允许自定义内容获取逻辑               | ^[function]`(params: BeforeShowParams) => Promise<BeforeShowResult \| void> \| BeforeShowResult \| void` | —             |

`beforeShow` 钩子函数接收的参数对象： `TooltipBeforeShowParams`

| Name      | Description           | Type           |
| --------- | --------------------- | -------------- |
| el        | 触发工具提示的DOM元素 | ^[HTMLElement] |
| content   | 默认的工具提示内容    | ^[string]      |
| placement | 默认的工具提示位置    | ^[string]      |
| effect    | 默认的工具提示主题    | ^[string]      |

`beforeShow` 钩子函数可以返回的结果对象： `TooltipBeforeShowResult`

| Name      | Description          | Type      |
| --------- | -------------------- | --------- |
| content   | 自定义的工具提示内容 | ^[string] |
| placement | 自定义的工具提示位置 | ^[string] |
| effect    | 自定义的工具提示主题 | ^[string] |

`createTooltip` 方法返回一个具有以下属性的对象：

| Name  | Description            | Type                    |
| ----- | ---------------------- | ----------------------- |
| close | 用于关闭工具提示的方法 | ^[function]`() => void` |

> **💡 提示**
>
> Tooltip 还提供一个常量值 `TOOLTIP_GLOBAL_TRIGGER_CLASS`， createTooltip 会自动创建一个以上面 class 为选择器的实例，供触发使用，如果你作为组件开发维护者，可在需要触发帮助提示的地方直接添加 class 为 `TOOLTIP_GLOBAL_TRIGGER_CLASS` 的元素，即可快速集成此功能。