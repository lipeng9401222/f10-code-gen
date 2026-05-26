---
title: Input Tag 标签输入框
originUrl: http://192.168.219.170/docs/vue/latest/component/component/input-tag.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

# Input Tag 标签输入框

InputTag 组件允许用户添加内容作为标签

## 基础用法

**Demo 示例**: `input-tag/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <e-input-tag v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>();
</script>

```

## 自定义触发器

**Demo 示例**: `input-tag/trigger`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <div>
    <e-segmented v-model="trigger" :options="options" />
  </div>
  <br />
  <e-input-tag v-model="input" :trigger="trigger" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EVENT_CODE } from '@eui-components/constants';

const trigger = ref<'Enter' | 'Space'>('Space');
const input = ref<string[]>();
const options = [EVENT_CODE.enter, EVENT_CODE.space];
</script>

```

## 最大标签数

**Demo 示例**: `input-tag/maximum`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <e-input-tag v-model="input" :max="3" placeholder="enter up to 3 tags" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>();
</script>

```

## 禁用状态

**Demo 示例**: `input-tag/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <e-input-tag v-model="input" disabled placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>(['tag1', 'tag2', 'tag3']);
</script>

```

## 可清空

**Demo 示例**: `input-tag/clearable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <e-input-tag v-model="input" clearable placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>(['tag1', 'tag2', 'tag3']);
</script>

```

## 可拖放

**Demo 示例**: `input-tag/draggable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <e-input-tag v-model="input" draggable placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>(['tag1', 'tag2', 'tag3']);
</script>

```

## 尺寸

**Demo 示例**: `input-tag/size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <e-input-tag v-model="input" size="large" placeholder="Please input" />
  <br />
  <e-input-tag v-model="input" placeholder="Please input" />
  <br />
  <e-input-tag v-model="input" size="small" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>();
</script>

```

## 自定义标签

**Demo 示例**: `input-tag/custom-tag`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <div>
    <e-segmented v-model="tagType" :options="type" class="mr-5" />
    <e-segmented v-model="tagEffect" :options="effect" />
  </div>
  <br />
  <e-input-tag v-model="input" :tag-type="tagType" :tag-effect="tagEffect" placeholder="Please input">
    <template #tag="{ value }">
      <div class="flex items-center">
        <e-icon class="mr-1">
          <CollectionTag />
        </e-icon>
        <span>{{ value }}</span>
      </div>
    </template>
  </e-input-tag>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CollectionTag } from '@epoint-fe/eui-icons';
import type { TagProps } from '@eui-components/components/tag';

const type: Array<TagProps['type']> = ['success', 'info', 'warning', 'danger'];
const effect: Array<TagProps['effect']> = ['light', 'dark', 'plain'];

const tagType = ref<TagProps['type']>('');
const tagEffect = ref<TagProps['effect']>('plain');
const input = ref<string[]>(['tag1', 'tag2', 'tag3']);
</script>

```

## 自定义前缀和后缀

**Demo 示例**: `input-tag/prefix-suffix`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <e-input-tag v-model="input" clearable placeholder="Please input">
    <template #prefix>
      <e-icon><CollectionTag /></e-icon>
    </template>
    <template #suffix>
      <e-icon><Search /></e-icon>
    </template>
  </e-input-tag>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CollectionTag, Search } from '@epoint-fe/eui-icons';

const input = ref<string[]>();
</script>

```

## 折叠过多的标签

**Demo 示例**: `input-tag/collapse-tags`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-tag.html)

```vue
<template>
  <e-input-tag v-model="input" :max="10" collapse-tags collapse-tags-tooltip :max-collapse-tags="3" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>(['Vue', 'React', 'Angular', 'Svelte', 'Ember', 'Backbone', 'jQuery']);
</script>

```

## API

### Attributes

| Name                         | Description                                                                                   | Type                                                        | Default |
| ---------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| model-value / v-model        | 绑定值                                                                                        | ^[array]`string[]`                                          | —       |
| max                          | 可添加标签的最大数量                                                                          | ^[number]                                                   | —       |
| tag-type                     | 标签类型                                                                                      | ^[enum]`'' \| 'success' \| 'info' \| 'warning' \| 'danger'` | info    |
| tag-effect                   | 标签效果                                                                                      | ^[enum]`'' \| 'light' \| 'dark' \| 'plain'`                 | light   |
| trigger                      | 触发输入标签的按键                                                                            | ^[enum]`'Enter' \| 'Space'`                                 | Enter   |
| draggable                    | 是否可以拖动标签                                                                              | ^[boolean]                                                  | false   |
| size                         | 输入框尺寸                                                                                    | ^[enum]`'large' \| 'default' \| 'small'`                    | —       |
| clearable                    | 是否显示清除按钮                                                                              | ^[boolean]                                                  | false   |
| disabled                     | 是否禁用                                                                                      | ^[boolean]                                                  | false   |
| validate-event               | 是否触发表单验证                                                                              | ^[boolean]                                                  | true    |
| readonly                     | 等价于原生 `readonly` 属性                                                                    | ^[boolean]                                                  | false   |
| autofocus                    | 等价于原生 `autofocus` 属性                                                                   | ^[boolean]                                                  | false   |
| id                           | 等价于原生 input `id` 属性                                                                    | ^[string]                                                   | —       |
| tabindex                     | 等价于原生 `tabindex` 属性                                                                    | ^[string] / ^[number]                                       | —       |
| maxlength                    | 等价于原生 `maxlength` 属性                                                                   | ^[string] / ^[number]                                       | —       |
| minlength                    | 等价于原生 `minlength` 属性                                                                   | ^[string] / ^[number]                                       | —       |
| placeholder                  | 输入框占位文本                                                                                | ^[string]                                                   | —       |
| autocomplete                 | 等价于原生 `autocomplete` 属性                                                                | ^[string]                                                   | off     |
| collapse-tags                | 是否将标签折叠成文本                                                                          | ^[boolean]                                                  | false   |
| collapse-tags-tooltip        | 当鼠标悬停在折叠标签文本上时是否显示所有选中的标签。要使用此功能，`collapse-tags` 必须为 true | ^[boolean]                                                  | false   |
| max-collapse-tags            | 要显示的最大标签数量。要使用此选项，`collapse-tags` 必须为 true                               | ^[number]                                                   | 1       |
| collapse-tags-tooltip-effect | 折叠标签 Tooltip 主题，内置主题：`dark` / `light` / `danger`                                  | ^[枚举]`'' \| 'success' \| 'info' \| 'warning' \| 'danger'` | light   |

### Events

| Name       | Description             | Type                                     |
| ---------- | ----------------------- | ---------------------------------------- |
| change     | 绑定值变化时触发的事件  | ^[Function]`(value: string[]) => void`   |
| input      | 在 Input 值改变时触发   | ^[Function]`(value: string) => void`     |
| add-tag    | tag 被添加时触发        | ^[Function]`(value: string) => void`     |
| remove-tag | tag 被移除时触发        | ^[Function]`(value: string) => void`     |
| focus      | 在 Input 获得焦点时触发 | ^[Function]`(event: FocusEvent) => void` |
| blur       | 在 Input 失去焦点时触发 | ^[Function]`(event: FocusEvent) => void` |
| clear      | 点击清除图标时触发      | ^[Function]`() => void`                  |

### Slots

| Name   | Description       | Type                                        |
| ------ | ----------------- | ------------------------------------------- |
| tag    | 作为 tag 的内容   | ^[object]`{ value: string, index: number }` |
| prefix | InputTag 头部内容 | —                                           |
| suffix | InputTag 尾部内容 | —                                           |

### Exposes

| Name  | Description       | Type                    |
| ----- | ----------------- | ----------------------- |
| focus | 使 input 获取焦点 | ^[Function]`() => void` |
| blur  | 使 input 失去焦点 | ^[Function]`() => void` |