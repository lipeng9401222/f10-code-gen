---
title: Tour
originUrl: http://192.168.219.170/docs/vue/latest/component/component/tour.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/tour.html)

# Tour 漫游式引导

用于分步引导用户了解产品功能的气泡组件。 用来引导用户并介绍产品。

## 基础用法

最简单的用法。

**Demo 示例**: `tour/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tour.html)

```vue
<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button ref="ref1">Upload</e-button>
    <e-button ref="ref2" type="primary">Save</e-button>
    <e-button ref="ref3" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open">
    <e-tour-step :target="ref1?.$el" title="Upload File">
      <div style="font-size: 24px; color: #409eff; font-weight: 500; width: 128; height: 60px; line-height: 60px">
        EUI Vue
      </div>
      <div>Put you files here.</div>
    </e-tour-step>
    <e-tour-step :target="ref2?.$el" title="Save" description="Save your changes" />
    <e-tour-step :target="ref3?.$el" title="Other Actions" description="Click to see other" />
  </e-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';
import type { ButtonInstance } from '@epoint-fe/eui-components';

const ref1 = ref<ButtonInstance>();
const ref2 = ref<ButtonInstance>();
const ref3 = ref<ButtonInstance>();

const open = ref(false);
</script>

```

## 自定义icon

通过 `icon` 属性可以为每个引导步骤设置自定义图标，图标会显示在引导内容的左侧。支持传入图标组件或图标名称字符串。

**Demo 示例**: `tour/icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tour.html)

```vue
<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button id="btn1">Upload</e-button>
    <e-button id="btn2" type="primary">Save</e-button>
    <e-button ref="btnRef" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open" type="primary">
    <e-tour-step target="#btn1" :icon="Menu" title="Upload File" description="Put you files here." />
    <e-tour-step :target="el" :icon="Save" title="Save" description="Save your changes" />
    <e-tour-step :target="btnRef?.$el" :icon="MoreFilled" title="Other Actions" description="Click to see other" />
  </e-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu, MoreFilled, Save } from '@epoint-fe/eui-icons';
import type { ButtonInstance } from '@epoint-fe/eui-components';

const el = () => document.querySelector<HTMLElement>('#btn2');
const btnRef = ref<ButtonInstance>();

const open = ref(false);
</script>

```

## 非模态

使用 `:mask="false"` 可以将引导变为非模态， 同时为了强调引导本身，建议与 `type="primary"` 组合使用。

**Demo 示例**: `tour/non-modal`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tour.html)

```vue
<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button ref="ref1">Upload</e-button>
    <e-button ref="ref2" type="primary">Save</e-button>
    <e-button ref="ref3" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open" type="primary" :mask="false">
    <e-tour-step :target="ref1?.$el" title="Upload File" description="Put you files here." />
    <e-tour-step :target="ref2?.$el" title="Save" description="Save your changes" />
    <e-tour-step :target="ref3?.$el" title="Other Actions" description="Click to see other" />
  </e-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';
import type { ButtonInstance } from '@epoint-fe/eui-components';

const ref1 = ref<ButtonInstance>();
const ref2 = ref<ButtonInstance>();
const ref3 = ref<ButtonInstance>();

const open = ref(false);
</script>

```

## 位置

改变引导相对于目标的位置，共有 12 种位置可供选择。 当 `target` 为空时引导将会展示在正中央。

**Demo 示例**: `tour/placement`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tour.html)

```vue
<template>
  <e-button ref="btnRef" type="primary" @click="open = true"> Begin Tour </e-button>

  <e-tour v-model="open">
    <e-tour-step title="Center" description="Displayed in the center of screen." />
    <e-tour-step title="Right" description="On the right of target." placement="right" :target="btnRef?.$el" />
    <e-tour-step title="Top" description="On the top of target." placement="top" :target="btnRef?.$el" />
  </e-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonInstance } from '@epoint-fe/eui-components';

const btnRef = ref<ButtonInstance>();

const open = ref(false);
</script>

```

## 自定义遮罩样式

自定义遮罩样式。

**Demo 示例**: `tour/mask`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tour.html)

```vue
<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button ref="ref1">Upload</e-button>
    <e-button ref="ref2" type="primary">Save</e-button>
    <e-button ref="ref3" :icon="MoreFilled" />
  </e-space>

  <e-tour
    v-model="open"
    :mask="{
      style: {
        boxShadow: 'inset 0 0 15px #333',
      },
      color: 'rgba(80, 255, 255, .4)',
    }"
  >
    <e-tour-step :target="ref1?.$el" title="Upload File">
      <div style="font-size: 24px; color: #409eff; font-weight: 500; width: 128; height: 60px; line-height: 60px">
        EUI Vue
      </div>
      <div>Put you files here.</div>
    </e-tour-step>
    <e-tour-step
      :target="ref2?.$el"
      title="Save"
      description="Save your changes"
      :mask="{
        style: {
          boxShadow: 'inset 0 0 15px #fff',
        },
        color: 'rgba(40, 0, 255, .4)',
      }"
    />
    <e-tour-step :target="ref3?.$el" title="Other Actions" description="Click to see other" :mask="false" />
  </e-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';
import type { ButtonInstance } from '@epoint-fe/eui-components';

const ref1 = ref<ButtonInstance>();
const ref2 = ref<ButtonInstance>();
const ref3 = ref<ButtonInstance>();

const open = ref(false);
</script>

```

## 自定义指示器

自定义指示器。

**Demo 示例**: `tour/indicator`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tour.html)

```vue
<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button ref="ref1">Upload</e-button>
    <e-button ref="ref2" type="primary">Save</e-button>
    <e-button ref="ref3" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open">
    <e-tour-step :target="ref1?.$el" title="Upload File" description="Put you files here." />
    <e-tour-step :target="ref2?.$el" title="Save" description="Save your changes" />
    <e-tour-step :target="ref3?.$el" title="Other Actions" description="Click to see other" />
    <template #indicators="{ current, total }">
      <span>{{ current + 1 }} / {{ total }}</span>
    </template>
  </e-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';
import type { ButtonInstance } from '@epoint-fe/eui-components';

const ref1 = ref<ButtonInstance>();
const ref2 = ref<ButtonInstance>();
const ref3 = ref<ButtonInstance>();

const open = ref(false);
</script>

```

## 目标

可以传入目标的各种类型的参数。支持字符串和函数类型。

**Demo 示例**: `tour/target`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tour.html)

```vue
<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button id="btn1">Upload</e-button>
    <e-button id="btn2" type="primary">Save</e-button>
    <e-button ref="btnRef" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open">
    <e-tour-step target="#btn1" title="Upload File" description="Put you files here." />
    <e-tour-step :target="el" title="Save" description="Save your changes" />
    <e-tour-step :target="btnRef?.$el" title="Other Actions" description="Click to see other" />
  </e-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';
import type { ButtonInstance } from '@epoint-fe/eui-components';

const el = () => document.querySelector<HTMLElement>('#btn2');
const btnRef = ref<ButtonInstance>();

const open = ref(false);
</script>

```

## API

> **💡 提示**
>
> tour-step 组件上相同名称配置的优先级更高。

### Attributes

| Property                  | Description                                                      | Type                                                                                                                                                                        | Default                        |
| ------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| show-arrow                | 是否显示箭头                                                     | `boolean`                                                                                                                                                                   | true                           |
| placement                 | 引导卡片相对于目标元素的位置                                     | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `bottom`                       |
| content-style             | 为content自定义样式                                              | `CSSProperties`                                                                                                                                                             | —                              |
| mask                      | 是否启用遮罩，通过自定义属性改变遮罩样式以及填充的颜色           | `boolean` \| ^[Object]`{ style?: CSSProperties; color?: string; }`                                                                                                          | `true`                         |
| type                      | 类型，影响底色与文字颜色                                         | `default` \| `primary`                                                                                                                                                      | `default`                      |
| model-value / v-model     | 打开引导                                                         | `boolean`                                                                                                                                                                   | —                              |
| current / v-model:current | 当前值                                                           | `number`                                                                                                                                                                    | —                              |
| scroll-into-view-options  | 是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数 | `boolean` \| `ScrollIntoViewOptions`                                                                                                                                        | ^[Object]`{ block: 'center' }` |
| z-index                   | Tour 的层级                                                      | `number`                                                                                                                                                                    | `2001`                         |
| show-close                | 是否显示关闭按钮                                                 | `boolean`                                                                                                                                                                   | `true`                         |
| close-icon                | 自定义关闭图标，默认Close                                        | `string` \| `Component`                                                                                                                                                     | —                              |
| close-on-press-escape     | 是否可以通过按下 ESC 关闭引导                                    | `boolean`                                                                                                                                                                   | `true`                         |
| target-area-clickable     | 启用蒙层时，target 元素区域是否可以点击。                        | `boolean`                                                                                                                                                                   | `true`                         |

### slots

| Name       | Description                                     |
| ---------- | ----------------------------------------------- |
| default    | tourStep 组件列表                               |
| indicators | 自定义指示器, scope 参数是 `{ current, total }` |

### events

| Name   | Description          | Type                                   |
| ------ | -------------------- | -------------------------------------- |
| close  | 关闭引导时的回调函数 | ^[Function]`(current: number) => void` |
| finish | 引导完成时的回调     | ^[Function]`() => void`                |
| change | 步骤改变时的回调     | ^[Function]`(current: number) => void` |

### TourStep Attributes

| Property                 | Description                                                                                                                                                                 | Type                                                               | Default   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------- |
| target                   | 获取引导卡片指向的元素， 为空时居中于屏幕。支持字符串和函数类型。 字符串类型是文档.querySelector的选择器。                                                                  | `HTMLElement` \| `string` \| ^[Function]`() => HTMLElement`        | —         |
| show-arrow               | 是否显示箭头                                                                                                                                                                | `boolean`                                                          | `true`    |
| title                    | 标题                                                                                                                                                                        | `string`                                                           | —         |
| description              | 主要描述部分                                                                                                                                                                | `string`                                                           | —         |
| icon                     | 引导步骤的图标，显示在内容左侧，支持图标组件或图标名称字符串                                                                                                                | `string` \| `Component`                                            | —         |
| placement                | 引导卡片相对于目标元素的位置                                                                                                                                                |
| element                  | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `bottom`                                                           |
| content-style            | 为content自定义样式                                                                                                                                                         | `CSSProperties`                                                    | —         |
| mask                     | 是否启用蒙层，也可传入配置改变蒙层样式和填充色                                                                                                                              | `boolean` \| ^[Object]`{ style?: CSSProperties; color?: string; }` | `true`    |
| type                     | 类型，影响底色与文字颜色                                                                                                                                                    | `default` \| `primary`                                             | `default` |
| next-button-props        | “下一步”按钮的属性                                                                                                                                                          | ^[Object]`{ children: VueNode \| string; onClick: Function }`      | —         |
| prev-button-props        | “上一步”按钮的属性                                                                                                                                                          | ^[Object]`{ children: VueNode \| string; onClick: Function }`      | —         |
| scroll-into-view-options | 是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数，默认跟随 Tour 的 `scrollIntoViewOptions` 属性                                                             | `boolean` \| `ScrollIntoViewOptions`                               | —         |
| show-close               | 是否显示关闭按钮                                                                                                                                                            | `boolean`                                                          | `true`    |
| close-icon               | 自定义关闭图标，默认Close                                                                                                                                                   | `string` \| `Component`                                            | —         |

### TourStep slots

| Name    | Description  |
| ------- | ------------ |
| default | 主要描述部分 |
| header  | 头部         |

### TourStep events

| Name  | Description          | Arguments               |
| ----- | -------------------- | ----------------------- |
| close | 关闭引导时的回调函数 | ^[Function]`() => void` |