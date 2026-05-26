---
title: Space 间距
originUrl: http://192.168.219.170/docs/vue/latest/component/component/space.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/space.html)

# Space 间距

虽然我们有 [Divider](components-divider.md)，但有时我们需要多个 [Divider](components-divider.md) 来分隔元素，因此我们将每个元素堆叠在 [Divider](components-divider.md) 上，但这样做不仅使我们的代码变得混乱，而且使其难以维护。**Space（间隔）** 是这种组件，为我们提供了生产力和优雅。

## 基本用法

基本用例是使用此组件在每个组件之间提供统一的间隔

**Demo 示例**: `space/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <e-space wrap>
    <e-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <e-button class="button" text>Operation button</e-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
    </e-card>
  </e-space>
</template>

```

## 竖直布局

使用 `direction` 属性来控制布局，我们使用 `flex-direction` 来实现这一点。

**Demo 示例**: `space/vertical-layout`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <e-space direction="vertical">
    <e-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <e-button class="button" text>Operation button</e-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
    </e-card>
  </e-space>
</template>

```

## 控制间隔大小

通过 `size` API 控制间隔大小。

您可以使用内置大小 `small`、`default`、`large` 来设置大小，这些大小对应于 `8px`、`12px`、`16px`。默认大小是 `small`，即 `8px`

您还可以使用自定义大小来覆盖它。请参考下一部分。

**Demo 示例**: `space/control-size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <e-space direction="vertical" alignment="start" :size="30">
    <e-radio-group v-model="size">
      <e-radio value="large">large</e-radio>
      <e-radio value="default">default</e-radio>
      <e-radio value="small">small</e-radio>
    </e-radio-group>

    <e-space wrap :size="size">
      <e-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <e-button class="button" text>Operation button</e-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </e-card>
    </e-space>
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const size = ref('default');
</script>

```

## 自定义大小

有时内置大小无法满足业务需求，我们可以使用自定义大小（数值类型）来控制项目之间的间隔。

**Demo 示例**: `space/customized-size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <e-slider v-model="size" />
  <e-space wrap :size="size">
    <e-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <e-button class="button" text>Operation button</e-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
    </e-card>
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref(20);
</script>

```

> **💡 提示**
>
> 不要将 `ESpace` 与依赖于祖先宽度（高度）的组件一起使用，例如 `ESlider`，在这种情况下，当您拖动触发按钮时，滑块将增长，导致鼠标和触发按钮之间的错位。

## 自动换行

在**水平**模式下，使用 `wrap`（**布尔类型**）来控制自动换行行为。

**Demo 示例**: `space/auto-wrapping`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <e-space wrap>
    <div v-for="i in 20" :key="i">
      <e-button text> Text button </e-button>
    </div>
  </e-space>
</template>

```

## Spacer

有时我们希望不仅仅是空白空间，所以我们有 (spacer) 来帮助我们。

## 字面类型 spacer

**Demo 示例**: `space/literal-type-spacer`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <e-space :size="size" spacer="|">
    <div v-for="i in 2" :key="i">
      <e-button> button {{ i }} </e-button>
    </div>
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref(10);
</script>

```

## Spacer 也可以是 VNode

**Demo 示例**: `space/vnode-type-spacer`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <e-space :size="size" :spacer="spacer">
    <div v-for="i in 2" :key="i">
      <e-button> button {{ i }} </e-button>
    </div>
  </e-space>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { EDivider } from '@epoint-fe/eui-components';

const size = ref(10);
const spacer = h(EDivider, { direction: 'vertical' });
</script>

```

## 对齐

设置此属性可以调整子节点的对齐方式，可在 [align-items](https://developer.mozilla.org/docs/Web/CSS/align-items) 找到理想的值。

**Demo 示例**: `space/alignment`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <div class="alignment-container">
    <e-space>
      string
      <e-button> button </e-button>
      <e-card>
        <template #header> header </template>
        body
      </e-card>
    </e-space>
  </div>
  <div class="alignment-container">
    <e-space alignment="flex-start">
      string
      <e-button> button </e-button>
      <e-card>
        <template #header> header </template>
        body
      </e-card>
    </e-space>
  </div>
  <div class="alignment-container">
    <e-space alignment="flex-end">
      string
      <e-button> button </e-button>
      <e-card>
        <template #header> header </template>
        body
      </e-card>
    </e-space>
  </div>
</template>

<style scoped>
.alignment-container {
  width: 240px;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid var(--e-border-color);
}
</style>

```

## 填充容器

通过 `fill` **(布尔类型)** 参数，您可以控制子节点是否自动填充容器。

在下面的示例中，当设置为 `fill` 时，子节点的宽度将自动适应容器的宽度。

**Demo 示例**: `space/fill`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <div>
    <div style="margin-bottom: 15px">fill: <e-switch v-model="fill" /></div>
    <e-space :fill="fill" wrap>
      <e-card v-for="i in 3" :key="i" class="box-card">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <e-button class="button" text>Operation button</e-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </e-card>
    </e-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fill = ref(true);
</script>

```

您还可以使用 `fillRatio` 参数来自定义填充比例。默认值为 `100`，表示根据父容器宽度以 `100%` 填充。

需要注意的是，水平布局和竖直布局的表达略有不同，具体效果可以在以下示例中查看。

**Demo 示例**: `space/fill-ratio`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/space.html)

```vue
<template>
  <div>
    <div style="margin-bottom: 15px">
      direction:
      <e-radio v-model="direction" label="horizontal">horizontal</e-radio>
      <e-radio v-model="direction" label="vertical">vertical</e-radio>
    </div>
    <div style="margin-bottom: 15px">fillRatio:<e-slider v-model="fillRatio" /></div>
    <e-space fill wrap :fill-ratio="fillRatio" :direction="direction" style="width: 100%">
      <e-card v-for="i in 5" :key="i" class="box-card">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <e-button class="button" text>Operation button</e-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </e-card>
    </e-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const direction = ref('horizontal');
const fillRatio = ref(30);
</script>

```

## API

### Attributes

| Name       | Description               | Type                                                                                                                    | Default    |
| ---------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------- |
| alignment  | 对齐的方式                | ^[enum]`'center' \| 'normal' \| 'stretch' \| ...` [align-items](https://developer.mozilla.org/docs/Web/CSS/align-items) | center     |
| class      | 类名                      | ^[string] / ^[object] / ^[array]                                                                                        | —          |
| direction  | 排列的方向                | ^[enum]`'vertical' \| 'horizontal'`                                                                                     | horizontal |
| prefixCls  | 给 space-items 的类名前缀 | ^[string]                                                                                                               | —          |
| style      | 额外样式                  | ^[string] / ^[object]`CSSProperties \| CSSProperties[] \| string[]`                                                     | —          |
| spacer     | 间隔符                    | ^[string] / ^[number] / ^[VNode]                                                                                        | —          |
| size       | 间隔大小                  | ^[enum]`'default' \| 'small' \| 'large'` / ^[number] / ^[array]`[number, number]`                                       | small      |
| wrap       | 设置是否自动折行          | ^[boolean]                                                                                                              | false      |
| fill       | 子元素是否填充父容器      | ^[boolean]                                                                                                              | false      |
| fill-ratio | 填充父容器的比例          | ^[number]                                                                                                               | 100        |

### Slots

| Name    | Description        |
| ------- | ------------------ |
| default | 需要添加间隔的元素 |