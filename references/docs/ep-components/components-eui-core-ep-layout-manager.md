---
title: LayoutManager 布局管理
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-layout-manager/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-layout-manager/)

此组件由 `@epframe/eui-core` 包提供。

LayoutManager 是一个强大的布局管理器组件，用于构建具有多区域（顶部、左侧、右侧、底部、主内容）的复杂页面布局。它支持动态配置、区域切换、大小调整等功能，并提供了灵活的 API 来程序化控制布局。

## 基础使用

LayoutManager 组件通过插槽（slots）的方式定义各个区域的内容。

**支持的五个区域：**

- **top**：顶部区域，通常用于页面标题、导航栏或工具栏
- **left**：左侧区域，通常用于侧边菜单或导航树
- **right**：右侧区域，通常用于辅助信息面板或属性设置
- **bottom**：底部区域，通常用于状态栏或页脚信息
- **main**：主内容区域（必需），用于显示页面的主要内容

**使用要点：**

- 只需要在对应的插槽中放置内容即可
- 如果某个区域不需要，直接不使用该插槽即可
- `main` 插槽是必需的，其他区域都是可选的

**Demo 示例**: `@epframe/eui-core/components/layout-manager/base.vue`

```vue
<template>
  <ep-layout-manager class="fui-page" style="height: 500px">
    <template #top>
      <div
        class="bg-primary text-white px-xl py-m flex items-center text-lg fw-md h-full"
      >
        顶部导航
      </div>
    </template>
    <template #left>
      <div class="bg-fill-light text-secondary p-l text-base h-full">
        左侧菜单
      </div>
    </template>
    <template #main>
      <div class="bg-color text-primary p-xl text-base h-full">
        主要内容区域
      </div>
    </template>
    <template #right>
      <div class="bg-fill-light text-secondary p-l text-base h-full">
        右侧面板
      </div>
    </template>
    <template #bottom>
      <div
        class="bg-fill-lighter text-secondary px-xl py-s flex items-center text-base h-full"
      >
        底部信息
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { EpLayoutManager } from "@epframe/eui-core";
</script>

<style scoped>
.h-full {
  height: 100%;
  box-sizing: border-box;
}
</style>

```

## 区域配置

通过各区域的配置对象，可以精确控制每个区域的行为。

**配置要点：**

- 使用 `topConfig`、`leftConfig`、`rightConfig`、`bottomConfig`、`mainConfig` 属性配置对应区域
- `defaultWidth` 和 `defaultHeight` 用于设置区域的初始尺寸
- `resize` 属性允许用户拖动调整区域大小
- `toggle` 属性允许用户切换区域的显示/隐藏状态
- `closed` 属性用于设置区域默认是否收起

**Demo 示例**: `@epframe/eui-core/components/layout-manager/setarea.vue`

```vue
<template>
    <div>
      <div class="demo-controls">
        <e-button @click="toggleLeft">切换左侧栏</e-button>
        <e-button @click="toggleRight">切换右侧栏</e-button>
      </div>
      <ep-layout-manager ref="layoutRef" style="height: 500px;" :top-config="topConfig" :left-config="leftConfig" :right-config="rightConfig" :bottom-config="bottomConfig">
        <template #top>
          <div class="bg-primary text-white px-xl py-m flex items-center text-base h-full">
            顶部区域（高度 60px，不可调整）
          </div>
        </template>
        <template #left>
          <div class="bg-fill-light text-secondary p-l text-base h-full">
            左侧菜单（宽度 200px，可切换）
          </div>
        </template>
        <template #main>
          <div class="bg-color text-primary p-xl text-base h-full">
            <h3 class="text-xl fw-md text-primary mb-l">主内容区域</h3>
            <p class="text-secondary leading-lg">左侧和右侧区域可以通过按钮切换显示/隐藏</p>
          </div>
        </template>
        <template #right>
          <div class="bg-fill-light text-secondary p-l text-base h-full">
            右侧面板（宽度 250px，可切换）
          </div>
        </template>
        <template #bottom>
          <div class="bg-fill-lighter text-secondary px-xl py-s flex items-center text-base h-full">
            底部信息（默认收起）
          </div>
        </template>
      </ep-layout-manager>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { EpLayoutManager } from '@epframe/eui-core';
  const layoutRef = ref();

  const topConfig = {
    enabled: true,
    defaultHeight: '60px',
    resize: false
  };

  const leftConfig = {
    enabled: true,
    defaultWidth: '200px',
    toggle: true,
    resize: true
  };

  const rightConfig = {
    enabled: true,
    defaultWidth: '250px',
    toggle: true,
    resize: true
  };

  const bottomConfig = {
    enabled: true,
    closed: true,
    defaultHeight: '100px'
  };

  function toggleLeft() {
    layoutRef.value?.toggleLeft();
  }

  function toggleRight() {
    layoutRef.value?.toggleRight();
  }
  </script>

  <style scoped>
  .demo-controls {
    margin-bottom: 16px;
    display: flex;
    gap: 12px;
  }

  .h-full {
    height: 100%;
    box-sizing: border-box;
  }
  </style>
```

## 动态布局

支持动态启用/禁用区域，实现灵活的布局切换。

**实现方式：**

- 通过修改配置对象的 `enabled` 属性来控制区域的启用状态
- 配置对象需要使用 `reactive` 包装以保持响应性
- 适用于根据业务逻辑动态调整页面布局的场景

**Demo 示例**: `@epframe/eui-core/components/layout-manager/render.vue`

```vue
<template>
    <div>
      <div class="demo-controls">
        <e-button @click="toggleHeaderEnabled" type="primary"> {{ topConfig.enabled ? '隐藏' : '显示' }}顶部区域 </e-button>
        <e-button @click="toggleLeftEnabled" type="success"> {{ leftConfig.enabled ? '移除' : '添加' }}左侧栏 </e-button>
        <e-button @click="toggleRightEnabled" type="warning"> {{ rightConfig.enabled ? '移除' : '添加' }}右侧栏 </e-button>
      </div>
      <ep-layout-manager style="height: 500px;" :top-config="topConfig" :left-config="leftConfig" :right-config="rightConfig">
        <template #top>
          <div class="bg-primary text-white px-xl py-m flex items-center text-lg fw-md h-full">
            动态顶部区域
          </div>
        </template>
        <template #left>
          <div class="bg-fill-light text-secondary p-l text-base h-full">
            动态左侧栏
          </div>
        </template>
        <template #main>
          <div class="bg-color text-primary p-xl text-base h-full">
            <h3 class="text-xl fw-md text-primary mb-l">主内容区域</h3>
            <p class="text-secondary mb-l leading-lg">点击按钮可以动态添加或移除各个区域</p>
            <ul class="text-secondary leading-lg" style="padding-left: 20px; list-style-type: disc;">
              <li class="mb-s">顶部区域：{{ topConfig.enabled ? '已显示' : '已隐藏' }}</li>
              <li class="mb-s">左侧栏：{{ leftConfig.enabled ? '已添加' : '已移除' }}</li>
              <li>右侧栏：{{ rightConfig.enabled ? '已添加' : '已移除' }}</li>
            </ul>
          </div>
        </template>
        <template #right>
          <div class="bg-fill-light text-secondary p-l text-base h-full">
            动态右侧栏
          </div>
        </template>
      </ep-layout-manager>
    </div>
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { EpLayoutManager } from '@epframe/eui-core';

  const topConfig = reactive({
    enabled: true,
    defaultHeight: '60px'
  });

  const leftConfig = reactive({
    enabled: false,
    defaultWidth: '200px'
  });

  const rightConfig = reactive({
    enabled: false,
    defaultWidth: '200px'
  });

  function toggleHeaderEnabled() {
    topConfig.enabled = !topConfig.enabled;
  }

  function toggleLeftEnabled() {
    leftConfig.enabled = !leftConfig.enabled;
  }

  function toggleRightEnabled() {
    rightConfig.enabled = !rightConfig.enabled;
  }
  </script>

  <style scoped>
  .demo-controls {
    margin-bottom: 16px;
    display: flex;
    gap: 12px;
  }

  .h-full {
    height: 100%;
    box-sizing: border-box;
  }
  </style>
```

## Inset 模式

Inset 模式用于改变顶部和底部区域的层次关系。

**模式说明：**

- **正常模式**：顶部/底部区域横跨整个页面宽度（包含左右侧栏区域）
- **Inset 模式**：顶部/底部区域仅在左右侧栏之间显示
- 通过设置 `topConfig` 或 `bottomConfig` 的 `inset` 属性为 `true` 来启用
- 适用于需要左右侧栏固定、顶部/底部区域仅覆盖中间内容区的场景

**Demo 示例**: `@epframe/eui-core/components/layout-manager/inset.vue`

```vue
<template>
    <div>
      <div class="demo-controls">
        <e-switch v-model="insetMode" active-text="Inset 模式" inactive-text="正常模式" />
      </div>
      <ep-layout-manager
        style="height: 500px;"
        :top-config="{ enabled: true, inset: insetMode, defaultHeight: '60px' }"
        :left-config="{ enabled: true, defaultWidth: '200px' }"
        :right-config="{ enabled: true, defaultWidth: '200px' }"
      >
        <template #top>
          <div class="bg-primary text-white px-xl py-m flex items-center text-base h-full">
            顶部区域（{{ insetMode ? 'Inset' : '正常' }}模式）
          </div>
        </template>
        <template #left>
          <div class="bg-fill-light text-secondary p-l text-base h-full">
            左侧栏
          </div>
        </template>
        <template #main>
          <div class="bg-color text-primary p-xl text-base h-full">
            <h3 class="text-xl fw-md text-primary mb-l">Inset 模式演示</h3>
            <p class="text-secondary mb-m leading-lg">
              <span class="text-primary fw-md">正常模式：</span>顶部区域横跨整个宽度
            </p>
            <p class="text-secondary leading-lg">
              <span class="text-primary fw-md">Inset 模式：</span>顶部区域在左右侧栏之间
            </p>
          </div>
        </template>
        <template #right>
          <div class="bg-fill-light text-secondary p-l text-base h-full">
            右侧栏
          </div>
        </template>
      </ep-layout-manager>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { EpLayoutManager } from '@epframe/eui-core';

  const insetMode = ref(false);
  </script>

  <style scoped>
  .demo-controls {
    margin-bottom: 16px;
  }

  .h-full {
    height: 100%;
    box-sizing: border-box;
  }
  </style>
```

## API

### Attributes

| Name         | Description    | Type           | Default |
| ------------ | -------------- | -------------- | ------- |
| topConfig    | 顶部区域配置   | `RegionConfig` | `{}`    |
| leftConfig   | 左侧区域配置   | `RegionConfig` | `{}`    |
| rightConfig  | 右侧区域配置   | `RegionConfig` | `{}`    |
| bottomConfig | 底部区域配置   | `RegionConfig` | `{}`    |
| mainConfig   | 主内容区域配置 | `RegionConfig` | `{}`    |

### RegionConfig

区域配置对象的属性：

| Name          | Description                        | Type                                                  | Default |
| ------------- | ---------------------------------- | ----------------------------------------------------- | ------- |
| enabled       | 是否启用该区域                     | `boolean`                                             | `true`  |
| closed        | 是否默认收起                       | `boolean`                                             | `false` |
| resize        | 是否允许调整大小                   | `boolean`                                             | `false` |
| toggle        | 是否允许切换显示/隐藏              | `boolean`                                             | `false` |
| showDivider   | 是否显示分割线                     | `boolean`                                             | `true`  |
| defaultHeight | 默认高度（用于 top/bottom 区域）   | `string`                                              | —       |
| defaultWidth  | 默认宽度（用于 left/right 区域）   | `string`                                              | —       |
| minHeight     | 最小高度（用于 top/bottom 区域）   | `string \| number`                                    | —       |
| maxHeight     | 最大高度（用于 top/bottom 区域）   | `string \| number`                                    | —       |
| minWidth      | 最小宽度（用于 left/right 区域）   | `string \| number`                                    | —       |
| maxWidth      | 最大宽度（用于 left/right 区域）   | `string \| number`                                    | —       |
| inset         | 是否在内侧（用于 top/bottom 区域） | `boolean`                                             | `false` |
| contentClass  | 内容区域的自定义类名               | `string`                                              | —       |
| onToggle      | 切换事件回调                       | ^[Function]`(region: string, state: boolean) => void` | —       |
| onResize      | 调整大小事件回调                   | ^[Function]`(region: string, size: number) => void`   | —       |

### Events

| Name   | Description        | Type                                                   |
| ------ | ------------------ | ------------------------------------------------------ |
| toggle | 区域切换时触发     | ^[Function]`(event: ToggleEvent) => void`              |
| resize | 区域大小调整时触发 | ^[Function]`(event: ResizeEvent) => void`              |
| ready  | 组件挂载完成后触发 | ^[Function]`(instance: LayoutManagerInstance) => void` |

### Slots

| Name   | Description  |
| ------ | ------------ |
| top    | 顶部区域内容 |
| left   | 左侧区域内容 |
| main   | 主内容区域   |
| right  | 右侧区域内容 |
| bottom | 底部区域内容 |

### Exposes

| Name                    | Description            | Type                                                         |
| ----------------------- | ---------------------- | ------------------------------------------------------------ |
| toggle                  | 切换指定区域的显示状态 | ^[Function]`(region: RegionType, show?: boolean) => boolean` |
| toggleTop               | 切换顶部区域           | ^[Function]`(show?: boolean) => boolean`                     |
| toggleLeft              | 切换左侧区域           | ^[Function]`(show?: boolean) => boolean`                     |
| toggleRight             | 切换右侧区域           | ^[Function]`(show?: boolean) => boolean`                     |
| toggleBottom            | 切换底部区域           | ^[Function]`(show?: boolean) => boolean`                     |
| getState                | 获取所有区域的当前状态 | ^[Function]`() => Partial<RegionStates>`                     |
| parse                   | 触发布局重新解析和渲染 | ^[Function]`() => void`                                      |
| on                      | 监听事件               | ^[Function]`(event: string, callback: Function) => void`     |
| off                     | 移除事件监听           | ^[Function]`(event: string, callback: Function) => void`     |
| tableStickyContainerRef | 表格粘性容器的引用     | `Ref<HTMLElement \| undefined>`                              |