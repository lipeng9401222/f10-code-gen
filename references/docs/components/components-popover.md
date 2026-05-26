---
title: Popover 气泡卡片
originUrl: http://192.168.219.170/docs/vue/latest/component/component/popover.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/popover.html)

# Popover 气泡卡片

> **💡 提示**
>
> 当在 SSR（例如 [Nuxt](https://nuxt.com/v3)）和 SSG（例如 [VitePress](https://vitepress.vuejs.org/)） 中使用此组件时，需要使用 `<client-only></client-only>` 包装。

## 基础用法

与 Tooltip 类似，Popover 也是使用 `EPopper` 构建的。因此，对于一些重复的属性，请参考 Tooltip 的文档。

**Demo 示例**: `popover/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/popover.html)

```vue
<template>
  <e-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2">Hover to activate</e-button>
    </template>
  </e-popover>

  <e-popover
    placement="bottom"
    title="Title"
    :width="200"
    trigger="click"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2">Click to activate</e-button>
    </template>
  </e-popover>

  <e-popover
    ref="popover"
    placement="right"
    title="Title"
    :width="200"
    trigger="focus"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2">Focus to activate</e-button>
    </template>
  </e-popover>

  <e-popover
    ref="popover"
    title="Title"
    :width="200"
    trigger="contextmenu"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2">contextmenu to activate</e-button>
    </template>
  </e-popover>

  <e-popover
    :visible="visible"
    placement="bottom"
    title="Title"
    :width="200"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2" @click="visible = !visible">Manual to activate</e-button>
    </template>
  </e-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<style scoped>
.e-button + .e-button {
  margin-left: 8px;
}
</style>

```

## 虚拟触发

与 Tooltip 类似，Popover 可以由虚拟元素触发，如果你的用例包括分离触发元素和内容元素，那么你应该绝对使用这个机制，通常我们使用 `#reference` 来放置触发元素，使用 `triggering-element` API，你可以将触发元素放在任何你喜欢的位置，但要注意触发元素应该是一个可以接受 `鼠标` 和 `键盘` 事件的元素。

> **⚠️ 警告**
>
> `v-popover` 即将被弃用，请使用 `virtual-ref` 作为替代。

**Demo 示例**: `popover/virtual-triggering`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/popover.html)

```vue
<template>
  <e-button ref="buttonRef" v-click-outside="onClickOutside">Click me</e-button>

  <e-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" title="With title" virtual-triggering>
    <span> Some content </span>
  </e-popover>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import { ClickOutside as vClickOutside } from '@epoint-fe/eui-components';
const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
</script>

```

## 丰富的内容

Popover 中可以嵌套其他组件/元素。以下是嵌套表格的示例。

**Demo 示例**: `popover/nested-information`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/popover.html)

```vue
<template>
  <div style="display: flex; align-items: center">
    <e-popover placement="right" :width="400" trigger="click">
      <template #reference>
        <e-button style="margin-right: 16px">点击激活</e-button>
      </template>
      <e-table :data-source="gridData" :columns="columns" />
    </e-popover>

    <e-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <e-avatar>张三</e-avatar>
      </template>
      <template #default>
        <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
          <e-avatar :size="60" style="margin-bottom: 8px">张三</e-avatar>
          <div>
            <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">张三</p>
            <p class="demo-rich-content__mention" style="margin: 0; font-size: 14px; color: var(--e-color-info)">
              @zhangsan
            </p>
          </div>

          <p class="demo-rich-content__desc" style="margin: 0">
            一位热爱技术的前端开发工程师，专注于Vue.js生态系统的开发与实践。
          </p>
        </div>
      </template>
    </e-popover>
  </div>
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 150,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 300,
  },
];

const gridData = [
  {
    date: '2016-05-02',
    name: '张三',
    address: '北京市朝阳区',
  },
  {
    date: '2016-05-04',
    name: '李四',
    address: '上海市浦东新区',
  },
  {
    date: '2016-05-01',
    name: '王五',
    address: '广州市天河区',
  },
  {
    date: '2016-05-03',
    name: '赵六',
    address: '深圳市南山区',
  },
];
</script>

```

## 嵌套操作

当然，你可以嵌套其他操作。这比使用对话框更轻量。

**Demo 示例**: `popover/nested-operation`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/popover.html)

```vue
<template>
  <e-popover :visible="visible" placement="top" :width="160">
    <p>Are you sure to delete this?</p>
    <div style="text-align: right; margin: 0">
      <e-button size="small" text @click="visible = false">cancel</e-button>
      <e-button size="small" type="primary" @click="visible = false">confirm</e-button>
    </div>
    <template #reference>
      <e-button @click="visible = true">Delete</e-button>
    </template>
  </e-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

```

## 指令

你仍然可以以指令方式使用 Popover，但这不再推荐，因为这会使你的应用程序变得复杂。你可以参考虚拟触发的更多信息。

**Demo 示例**: `popover/directive-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/popover.html)

```vue
<template>
  <e-button v-popover="popoverRef" v-click-outside="onClickOutside">Click me</e-button>

  <e-popover ref="popoverRef" trigger="click" title="With title" virtual-triggering persistent>
    <span> Some content </span>
  </e-popover>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import { ClickOutside as vClickOutside } from '@epoint-fe/eui-components';
const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
</script>

```

## API

### Attributes

| Name                      | Description                                                                                             | Type                                                                                                                                                                        | Default                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| trigger                   | 弹出框触发方式                                                                                          | ^[枚举]`'hover' \| 'click' \| 'focus' \| 'contextmenu'`                                                                                                                     | hover                                                                      |
| title                     | 弹出框标题                                                                                              | ^[string]                                                                                                                                                                   | —                                                                          |
| effect                    | 弹出框主题，内置主题：`dark` / `light`                                                                  | ^[枚举]`'light' \| 'dark'`                                                                                                                                                  | light                                                                      |
| content                   | 弹出框内容，可以替换为默认的 `slot`                                                                     | ^[string]                                                                                                                                                                   | —                                                                          |
| width                     | 弹出框宽度                                                                                              | ^[string] / ^[number]                                                                                                                                                       | 最小宽度 150px                                                             |
| placement                 | 弹出框位置                                                                                              | ^[枚举]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | bottom                                                                     |
| disabled                  | 是否禁用弹出框                                                                                          | ^[boolean]                                                                                                                                                                  | false                                                                      |
| visible / v-model:visible | 弹出框是否可见                                                                                          | ^[boolean]                                                                                                                                                                  | false                                                                      |
| offset                    | 弹出框偏移量                                                                                            | ^[number]                                                                                                                                                                   | 0                                                                          |
| transition                | 弹出框过渡动画                                                                                          | ^[string]                                                                                                                                                                   | e-fade-in-linear                                                           |
| show-arrow                | 是否显示提示框箭头。有关更多信息，请参考 [EPopper] 源码                                                 | ^[boolean]                                                                                                                                                                  | true                                                                       |
| popper-options            | [popper.js](https://popper.js.org/docs/v2/) 的参数                                                      | ^[object] <br> 请参考 [popper.js](https://popper.js.org/docs/v2/)                                                                                                              | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| popper-class              | 自定义弹出框的类名                                                                                      | ^[string]                                                                                                                                                                   | —                                                                          |
| popper-style              | 自定义弹出框的样式                                                                                      | ^[string] / ^[object]                                                                                                                                                       | —                                                                          |
| show-after                | 出现的延迟，以毫秒计                                                                                    | ^[number]                                                                                                                                                                   | 0                                                                          |
| hide-after                | 隐藏的延迟，以毫秒计                                                                                    | ^[number]                                                                                                                                                                   | 200                                                                        |
| auto-close                | 以毫秒为单位的超时，用于隐藏提示框                                                                      | ^[number]                                                                                                                                                                   | 0                                                                          |
| tabindex                  | Popover 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | ^[number]                                                                                                                                                                   | —                                                                          |
| teleported                | 是否将弹出框移动到 body 中                                                                              | ^[boolean]                                                                                                                                                                  | true                                                                       |
| persistent                | 当弹出框不活跃且 `persistent` 为 `false` 时，弹出框将被销毁                                             | ^[boolean]                                                                                                                                                                  | true                                                                       |

### Slots

| Name      | Description            |
| --------- | ---------------------- |
| —         | 弹出框的文本内容       |
| reference | 触发弹出框的 HTML 元素 |

### Events

| Name         | Description            | Parameters |
| ------------ | ---------------------- | ---------- |
| show         | 弹出框显示时触发       | —          |
| before-enter | 进入过渡动画之前触发   | —          |
| after-enter  | 进入过渡动画结束时触发 | —          |
| hide         | 弹出框隐藏时触发       | —          |
| before-leave | 离开过渡动画之前触发   | —          |
| after-leave  | 离开过渡动画结束时触发 | —          |