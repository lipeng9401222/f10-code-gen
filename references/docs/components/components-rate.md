---
title: Rate 评分
originUrl: http://192.168.219.170/docs/vue/latest/component/component/rate.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/rate.html)

# Rate 评分

用于评分

## 基本用法

**Demo 示例**: `rate/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/rate.html)

```vue
<template>
  <div class="demo-rate-block">
    <span class="demonstration">Default</span>
    <e-rate v-model="value1" />
  </div>
  <div class="demo-rate-block">
    <span class="demonstration">Color for different levels</span>
    <e-rate v-model="value2" :colors="colors" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(null);
const value2 = ref(null);
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']); // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
</script>

<style scoped>
.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 尺寸

**Demo 示例**: `rate/sizes`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/rate.html)

```vue
<template>
  <e-rate v-model="value" size="large" />
  <br />
  <e-rate v-model="value" />
  <br />
  <e-rate v-model="value" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(null);
</script>

```

## 启用半星

**Demo 示例**: `rate/allow-half`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/rate.html)

```vue
<template>
  <e-rate v-model="value" allow-half />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();
</script>

```

## 显示文本

使用文本来指示评分分数

**Demo 示例**: `rate/text`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/rate.html)

```vue
<template>
  <e-rate v-model="value" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" show-text />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();
</script>

```

## 可清除

**Demo 示例**: `rate/clearable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/rate.html)

```vue
<template>
  <e-rate v-model="value" clearable />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(3);
</script>

```

## 更多图标

您可以使用不同的图标来区分不同的评分组件。

**Demo 示例**: `rate/more-icons`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/rate.html)

```vue
<template>
  <e-rate v-model="value" :icons="icons" :void-icon="ChatRound" :colors="['#409eff', '#67c23a', '#FF9900']" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ChatDotRound, ChatLineRound, ChatRound } from '@epoint-fe/eui-icons';

const value = ref();
const icons = [ChatRound, ChatLineRound, ChatDotRound]; // same as { 2: ChatRound, 4: { value: ChatLineRound, excluded: true }, 5: ChatDotRound }
</script>

```

## 只读

只读的 Rate 用于显示评分分数。支持半星。

**Demo 示例**: `rate/readonly`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/rate.html)

```vue
<template>
  <e-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value} points" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(3.7);
</script>

```

## 自定义样式

现在您可以为 Rate 组件设置自定义样式。使用 `css/scss` 语言来更改全局或本地颜色。我们设置了一些全局颜色变量：`--e-rate-void-color`、`--e-rate-fill-color`、`--e-rate-disabled-void-color`、`--e-rate-text-color`。您可以像这样使用：`:root { --e-rate-void-color: red; --e-rate-fill-color: blue; }`。

### Default Variables

| Variable                     | Default Color                |
| ---------------------------- | ---------------------------- |
| --e-rate-void-color          | var(--e-border-color-darker) |
| --e-rate-fill-color          | #f7ba2a                      |
| --e-rate-disabled-void-color | var(--e-fill-color)          |
| --e-rate-text-color          | var(--e-text-color-primary)  |

## API

### Attributes

| Name                  | Description                                                                                                                         | Type                                                                      | Default                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
| model-value / v-model | 绑定的值                                                                                                                            | ^[number]                                                                 | 0                                          |
| max                   | 最大评分分数                                                                                                                        | ^[number]                                                                 | 5                                          |
| size                  | Rate 的尺寸                                                                                                                         | ^[enum]`'large' \| 'default' \| 'small'`                                  | —                                          |
| disabled              | 是否只读                                                                                                                            | ^[boolean]                                                                | false                                      |
| allow-half            | 是否允许选择半星                                                                                                                    | ^[boolean]                                                                | false                                      |
| low-threshold         | 低分和中分之间的阈值值。该值本身将包含在低分中。                                                                                    | ^[number]                                                                 | 2                                          |
| high-threshold        | 中分和高分之间的阈值值。该值本身将包含在高分中。                                                                                    | ^[number]                                                                 | 4                                          |
| colors                | 图标的颜色。如果是数组，应该有 3 个元素，每个对应一个分数等级，否则如果是对象，键应该是两个等级之间的阈值值，值应该是对应的颜色。   | ^[object]`string[] \| Record<number, string>`                             | ['#F7BA2A', '#F7BA2A', '#F7BA2A']          |
| void-color            | 未选中图标的颜色                                                                                                                    | ^[string]                                                                 | #C6D1DE                                    |
| disabled-void-color   | 只读状态下未选中图标的颜色                                                                                                          | ^[string]                                                                 | #EFF2F7                                    |
| icons                 | 图标组件。如果是数组，应该有 3 个元素，每个对应一个分数等级，否则如果是对象，键应该是两个等级之间的阈值值，值应该是对应的图标组件。 | ^[object]`string[] \| Component[] \| Record<number, string \| Component>` | [StarFilled, StarFilled, StarFilled]       |
| void-icon             | 未选中图标的组件                                                                                                                    | ^[string] / ^[Component]                                                  | Star                                       |
| disabled-void-icon    | 只读状态下未选中图标的组件                                                                                                          | ^[string] / ^[Component]                                                  | StarFilled                                 |
| show-text             | 是否显示文本                                                                                                                        | ^[boolean]                                                                | false                                      |
| show-score            | 是否显示当前分数。show-score 和 show-text 不能同时为真。                                                                            | ^[boolean]                                                                | false                                      |
| text-color            | 文本的颜色                                                                                                                          | ^[string]                                                                 | #1F2D3D                                    |
| texts                 | 文本数组                                                                                                                            | ^[array]`string[]`                                                        | ['非常差', '失望', '一般', '满意', '惊喜'] |
| score-template        | 分数模板                                                                                                                            | ^[string]                                                                 | {value}                                    |
| clearable             | 是否可以将值重置为 `0`                                                                                                              | ^[boolean]                                                                | false                                      |
| id                    | 原生 `id` 属性                                                                                                                      | ^[string]                                                                 | —                                          |
| label ^(a11y)         | 与 Rate 中的 `aria-label` 相同                                                                                                      | ^[string]                                                                 | —                                          |

### Events

| Name   | Description        | Type                                 |
| ------ | ------------------ | ------------------------------------ |
| change | 当评分值更改时触发 | ^[Function]`(value: number) => void` |

### Exposes

| Name              | Description | Type                                 |
| ----------------- | ----------- | ------------------------------------ |
| setCurrentValue   | 设置当前值  | ^[Function]`(value: number) => void` |
| resetCurrentValue | 重置当前值  | ^[Function]`() => void`              |