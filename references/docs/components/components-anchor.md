---
title: Anchor 锚点
originUrl: http://192.168.219.170/docs/vue/latest/component/component/anchor.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/anchor.html)

# Anchor 锚点导航

用于跳转到页面指定位置。

## 基础用法

根据 DOM 生成导航列表

**Demo 示例**: `anchor/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/anchor.html)

```vue
<template>
  <div class="wrapper">
    <e-scrollbar ref="contentRef" class="content">
      <h2>基本信息</h2>
      <section />
      <h2>业务指标</h2>
      <section />
      <h3>关键指标</h3>
      <section />
      <h3>模块化</h3>
      <section />
      <h4>主题</h4>
      <section />
      <h2>推进计划</h2>
      <section />
      <h2>反馈</h2>
      <section />
    </e-scrollbar>
    <e-anchor class="anchor" :target="target" :tags="tags" @active-change="handleActiveChange" />
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { NodeItem } from '@eui-components/components/anchor';

const tags = ref(['h2', 'h3', 'h4', 'h5']);
const contentRef = ref();
const target = computed(() => contentRef.value?.wrapRef);

const handleActiveChange = (newValue: NodeItem, oldValue: NodeItem) => {
  console.log(newValue, oldValue);
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;

  .content {
    height: 400px;
    background: #fff;
    flex: 1;
    border-radius: 10px;
    padding-right: 20px;

    h2,
    h3,
    h4,
    h5 {
      margin: 0;
      padding: 20px 0;
    }
    section {
      height: 100px;
      border-radius: 10px;
      background: #f0f0f0;
    }
  }

  .anchor {
    margin-left: 10px;
  }
}
</style>

```

## 折叠导航

通过设置 `collapsible` 属性开启导航折叠功能

**Demo 示例**: `anchor/collapsible`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/anchor.html)

```vue
<template>
  <div class="wrapper">
    <e-scrollbar ref="contentRef" class="content">
      <h2>基本信息</h2>
      <section />
      <h2>业务指标</h2>
      <section />
      <h3>关键指标</h3>
      <section />
      <h3>模块化</h3>
      <section />
      <h4>主题</h4>
      <section />
      <h2>推进计划</h2>
      <section />
      <h2>反馈</h2>
      <section />
    </e-scrollbar>
    <e-anchor class="anchor" collapsible :target="target" :tags="tags" @active-change="handleActiveChange" />
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { NodeItem } from '@eui-components/components/anchor';

const tags = ref(['h2', 'h3', 'h4', 'h5']);
const contentRef = ref();
const target = computed(() => contentRef.value?.wrapRef);

const handleActiveChange = (newValue: NodeItem, oldValue: NodeItem) => {
  console.log(newValue, oldValue);
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;

  .content {
    height: 400px;
    background: #fff;
    flex: 1;
    border-radius: 10px;
    padding-right: 20px;

    h2,
    h3,
    h4,
    h5 {
      margin: 0;
      padding: 20px 0;
    }
    section {
      height: 100px;
      border-radius: 10px;
      background: #f0f0f0;
    }
  }

  .anchor {
    margin-left: 10px;
  }
}
</style>

```

## 布局位置

通过设置 `layout` 属性控制锚点导航位于内容左侧或右侧，导航缩进、边框位置与模块模式的对齐方向会随布局位置切换。

**Demo 示例**: `anchor/layout`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/anchor.html)

```vue
<template>
  <div class="debug-panel">
    <span>layout</span>
    <e-segmented v-model="layout" :options="layoutOptions" size="small" />
    <span>type</span>
    <e-segmented v-model="type" :options="typeOptions" size="small" />
  </div>
  <div class="wrapper" :class="`is-${layout}`">
    <e-scrollbar ref="contentRef" class="content">
      <h2>基本信息</h2>
      <section />
      <h2>业务指标</h2>
      <section />
      <h3>关键指标</h3>
      <section />
      <h4>指标明细</h4>
      <section />
      <h2>推进计划</h2>
      <section />
    </e-scrollbar>
    <div class="side" :class="`is-${layout}`">
      <e-anchor
        class="anchor"
        :target="target"
        :tags="tags"
        :layout="layout"
        :type="type"
        @active-change="handleActiveChange"
        @type-change="handleTypeChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { NodeItem } from '@eui-components/components/anchor';

type AnchorLayout = 'right' | 'left';
type AnchorType = 'text' | 'module';

const tags = ref(['h2', 'h3', 'h4']);
const contentRef = ref();
const target = computed(() => contentRef.value?.wrapRef);
const layout = ref<AnchorLayout>('right');
const type = ref<AnchorType>('text');

const layoutOptions = ['right', 'left'];
const typeOptions = ['text', 'module'];

const handleActiveChange = (newValue: NodeItem, oldValue: NodeItem) => {
  console.log(newValue, oldValue);
};

const handleTypeChange = (showType: AnchorType) => {
  type.value = showType;
};
</script>
<style lang="scss" scoped>
.debug-panel {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.wrapper {
  display: flex;
  gap: 10px;

  &.is-left {
    flex-direction: row-reverse;
  }

  .side {
    display: flex;
    width: 180px;
    flex: 0 0 180px;

    &.is-left {
      justify-content: flex-end;
    }
  }
  .content {
    height: 800px;
    background: #fff;
    flex: 1;
    border-radius: 10px;
    padding: 0 20px;

    h2,
    h3 {
      margin: 0;
      padding: 20px 0;
    }
    section {
      height: 500px;
      border-radius: 10px;
      background: #f0f0f0;
    }
  }

  .anchor {
    width: max-content;
  }
}
</style>

```

## 自定义滚动容器

当目标容器内部使用了自定义滚动条（如 `EScrollbar`）时，可通过 `scroll-target` 单独指定绑定 scroll 事件的 DOM 元素，实现滚动联动与 DOM 扫描容器的分离。

> **💡 提示**
>
> `scroll-target` 还可以解决使用默认 `target` 获取滚动条时由于滚动容器内容变化导致出现滚动条时无法正确绑定对应滚动事件的问题，例如在页面初始时页面上没有滚动条，数据渲染后页面撑开显示滚动条，这时可能无法正确绑定滚动事件

**Demo 示例**: `anchor/scroll-target`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/anchor.html)

```vue
<template>
  <div class="wrapper">
    <div ref="contentRef" class="content">
      <e-scrollbar ref="scrollbarRef" height="400px">
        <h2>基本信息</h2>
        <section />
        <h2>业务指标</h2>
        <section />
        <h3>关键指标</h3>
        <section />
        <h3>模块化</h3>
        <section />
        <h4>主题</h4>
        <section />
        <h2>推进计划</h2>
        <section />
        <h2>反馈</h2>
        <section />
      </e-scrollbar>
    </div>
    <e-anchor
      class="anchor"
      :target="target"
      :scroll-target="scrollTarget"
      :tags="tags"
      @active-change="handleActiveChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { NodeItem } from '@eui-components/components/anchor';

const tags = ref(['h2', 'h3', 'h4', 'h5']);
const contentRef = ref();
const scrollbarRef = ref();

// target 指向包含标题的目标容器，用于扫描 DOM 生成导航
const target = computed(() => contentRef.value);
// scroll-target 单独指向滚动容器，用于绑定 scroll 事件
const scrollTarget = computed(() => scrollbarRef.value?.wrapRef);

const handleActiveChange = (newValue: NodeItem, oldValue: NodeItem) => {
  console.log(newValue, oldValue);
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;

  .content {
    flex: 1;
    padding-right: 20px;

    h2,
    h3,
    h4,
    h5 {
      margin: 0;
      padding: 20px 0;
    }
    section {
      height: 100px;
      border-radius: 10px;
      background: #f0f0f0;
    }
  }

  .anchor {
    margin-left: 10px;
  }
}
</style>

```

## 额外导航节点

通过 `extra-nodes` 属性可以在自动生成的导航列表下方追加自定义节点。
- 节点提供 `elem` 字段时，会参与滚动联动（scroll 时自动高亮，点击时滚动到对应位置）
- 不提供 `elem` 时，仅支持点击切换 active，不参与滚动联动

**Demo 示例**: `anchor/extra-nodes`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/anchor.html)

```vue
<template>
  <div class="wrapper">
    <e-scrollbar ref="contentRef" class="content">
      <h2>基本信息</h2>
      <section />
      <h2>业务指标</h2>
      <section />
      <h3>关键指标</h3>
      <section />
      <h2>推进计划</h2>
      <section />
    </e-scrollbar>
    <e-tabs v-model="activeName" class="demo-tabs">
      <e-tab-pane label="User" name="first">User</e-tab-pane>
      <e-tab-pane label="Config" name="second">Config</e-tab-pane>
    </e-tabs>
    <e-anchor
      class="anchor"
      :target="target"
      :extra-nodes="extraNodes"
      :tags="tags"
      @active-change="handleActiveChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { ExtraNodeItem, NodeItem } from '@eui-components/components/anchor';

const tags = ref(['h2', 'h3']);
const contentRef = ref();
const target = computed(() => contentRef.value?.wrapRef);

const activeName = ref('first');

// 额外节点：无 elem 时仅支持点击切换 active，不参与滚动联动
const extraNodes = ref<ExtraNodeItem[]>([
  { id: 'User', name: 'User', level: 0 },
  { id: 'Config', name: 'Config', level: 0 },
]);

const handleActiveChange = (newValue: NodeItem) => {
  if (newValue.id === 'User') {
    activeName.value = 'first';
  } else if (newValue.id === 'Config') {
    activeName.value = 'second';
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 800px;

  .content {
    height: 100%;
    background: #fff;
    flex: 1;
    border-radius: 10px;
    padding-right: 20px;

    h2,
    h3 {
      margin: 0;
      padding: 20px 0;
    }
    section {
      height: 500px;
      border-radius: 10px;
      background: #f0f0f0;
    }
  }

  .demo-tabs {
    flex: 1;
  }
  .anchor {
    margin-left: 10px;
  }
}
</style>

```

## 固定位置

若使用页面滚动条，可以通过设置 `affix` 属性让导航栏固定显示

**Demo 示例**: `anchor/affix`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/anchor.html)

```vue
<template>
  <div class="wrapper">
    <div ref="contentRef" class="content">
      <h2>基本信息</h2>
      <section />
      <h2>业务指标</h2>
      <section />
      <h3>关键指标</h3>
      <section />
      <h3>模块化</h3>
      <section />
      <h4>主题</h4>
      <section />
      <h2>推进计划</h2>
      <section />
      <h2>反馈</h2>
      <section />
    </div>
    <e-anchor
      class="anchor"
      affix
      collapsible
      :affix-offset="offset"
      :offset="offset"
      :target="target"
      :tags="tags"
      @active-change="handleActiveChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { NodeItem } from '@eui-components/components/anchor';

const tags = ref(['h2', 'h3', 'h4', 'h5']);
const contentRef = ref();
const target = computed(() => contentRef.value);
const offset = ref(55);
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;

  .content {
    flex: 1;
    h2,
    h3,
    h4 {
      margin: 0;
      padding: 20px 0;
    }
    section {
      height: 100px;
      border-radius: 10px;
      background: #f0f0f0;
    }
  }

  .anchor {
    margin-left: 20px;
    z-index: 1;
  }
}
</style>

```

## API

### Attributes

| Name          | Description                              | Type                          | Default                         |
| ------------- | ---------------------------------------- | ----------------------------- | ------------------------------- |
| target        | 生成锚点的目标容器                       | ^[HTMLElement]                | —                               |
| scroll-target | 绑定 scroll 事件的滚动容器，不传时自动   | ^[HTMLElement]                | —                               |
| extra-nodes   | 附加到导航列表末尾的自定义节点           | ^[ExtraNodeItem]          | []                              |
| collapsible   | 是否开启折叠功能                         | ^[boolean]                    | false                           |
| affix         | 是否开启固钉                             | ^[boolean]                    | true                            |
| affix-offset  | 固钉偏移距离                             | ^[number]                     | 0                               |
| offset        | 锚点偏移距离                             | ^[number]                     | 0                               |
| tags          | 锚点生成节点结构(CSS selector)           | ^[array]                      | ['h2', 'h3', 'h4', 'h5', 'h6'] |
| type          | 显示类型                                 | ^[string]`'module' \| 'text'` | text                            |
| layout        | 锚点导航相对内容的布局位置               | ^[string]`'right' \| 'left'`  | right                           |
| max-width     | 锚点导航的最大宽度；module模式悬停展开时也作为展开列表最大宽度及展开方向计算依据。数字值将被视为像素值（如 100 等同于 100px）。字符串值应为能计算出具体像素值的 CSS 长度单位（如 `200px`、`10rem`），不支持百分比等相对单位 | ^[number / string]            | 150                             |
| show-btn      | 是否显示类型切换按钮                     | ^[boolean]                    | true                            |

### ExtraNodeItem

| Name     | Description                                            | Type                         |
| -------- | ------------------------------------------------------ | ---------------------------- |
| id       | 节点唯一标识                                           | ^[string \| number]          |
| name     | 节点显示文本                                           | ^[string]                    |
| level    | 缩进层级（与自动节点层级含义一致）                     | ^[string \| number]          |
| elem     | 对应的 DOM 元素，提供后参与滚动联动，不提供则仅支持点击 | ^[HTMLElement]（可选）       |
| children | 子节点列表                                             | ^[ExtraNodeItem]（可选） |

### Events

| Name         | Description        | Type           |
| ------------ | ------------------ | -------------- |
| activeChange | 导航切换后触发     | 新导航，旧导航 |
| handleClick  | 点击导航后触发     | 新导航         |
| typeChange   | 导航类型切换后触发 | 显示类型       |