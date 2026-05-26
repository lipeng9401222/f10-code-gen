---
title: Message 消息提示
originUrl: http://192.168.219.170/docs/vue/latest/component/component/message.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/message.html)

# Message 消息提示

常用于主动操作后的反馈提示。 与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

**Demo 示例**: `message/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/message.html)

```vue
<template>
  <e-button :plain="true" @click="open">Show message</e-button>
  <e-button :plain="true" @click="openVn">VNode</e-button>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const open = () => {
  EMessage('this is a message.');
};

const openVn = () => {
  EMessage({
    message: h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
  });
};
</script>

```

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

**Demo 示例**: `message/different-types`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/message.html)

```vue
<template>
  <e-button :plain="true" @click="open2">success</e-button>
  <e-button :plain="true" @click="open3">warning</e-button>
  <e-button :plain="true" @click="open1">message</e-button>
  <e-button :plain="true" @click="open4">error</e-button>
</template>

<script lang="ts" setup>
import { EMessage } from '@epoint-fe/eui-components';

const open1 = () => {
  EMessage('this is a message.');
};
const open2 = () => {
  EMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
const open3 = () => {
  EMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
  });
};
const open4 = () => {
  EMessage.error('Oops, this is a error message.');
};
</script>

```

## 可关闭的消息提示

可以添加关闭按钮。

**Demo 示例**: `message/closable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/message.html)

```vue
<template>
  <e-button :plain="true" @click="open1">message</e-button>
  <e-button :plain="true" @click="open2">success</e-button>
  <e-button :plain="true" @click="open3">warning</e-button>
  <e-button :plain="true" @click="open4">error</e-button>
</template>

<script lang="ts" setup>
import { EMessage } from '@epoint-fe/eui-components';

const open1 = () => {
  EMessage({
    showClose: true,
    message: 'This is a message.',
  });
};
const open2 = () => {
  EMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
const open3 = () => {
  EMessage({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning',
  });
};
const open4 = () => {
  EMessage({
    showClose: true,
    message: 'Oops, this is a error message.',
    type: 'error',
  });
};
</script>

```

## 文字居中

使用 `center` 属性让文字水平居中。

**Demo 示例**: `message/centered-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/message.html)

```vue
<template>
  <e-button plain @click="openCenter">Centered text</e-button>
</template>

<script lang="ts" setup>
import { EMessage } from '@epoint-fe/eui-components';

const openCenter = () => {
  EMessage({
    showClose: true,
    message: 'Centered text',
    center: true,
  });
};
</script>

```

## 使用 HTML 片段作为正文内容

`message` 支持使用 HTML 字符串作为正文内容。

**Demo 示例**: `message/raw-html`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/message.html)

```vue
<template>
  <e-button :plain="true" @click="openHTML">Use HTML String</e-button>
</template>

<script lang="ts" setup>
import { EMessage } from '@epoint-fe/eui-components';

const openHTML = () => {
  EMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  });
};
</script>

```

> **⚠️ 警告**
>
> `message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting). 因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，永远不要将用户提交的内容赋值给 `message` 属性。

## 分组消息合并

合并相同内容的消息。

**Demo 示例**: `message/grouping`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/message.html)

```vue
<template>
  <e-button :plain="true" @click="open">Show message</e-button>
</template>

<script lang="ts" setup>
import { EMessage } from '@epoint-fe/eui-components';

const open = () => {
  EMessage({
    message: 'this is a message.',
    grouping: true,
    type: 'success',
  });
};
</script>

```

## 全局方法

`app.config.globalProperties` 上存在全局方法 `$message`。 因此在 vue 实例中你可以使用当前页面中的调用方式调用 `Message`

## 单独引用

```ts
import { EMessage } from '@epoint-fe/eui-components';
```

此时调用方法为 `EMessage(options)`。 我们也为每个 `type` 定义了各自的方法，如 `EMessage.success(options)`。 并且可以调用 `EMessage.closeAll()` 手动关闭所有实例。

## 应用程序上下文继承

`Message` 可接受一条 `context` 作为消息构造器的第二个参数，允许你将当前应用的上下文注入到 `Message` 中，这将允许你继承应用程序的所有属性。

你可以像这样使用它：

> **💡 提示**
>
> 如果您全局注册了 `EMessage` 组件，它将自动继承应用的上下文环境。

```ts
import { getCurrentInstance } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

// 在你的 setup 方法中
const { appContext } = getCurrentInstance()!;
EMessage({}, appContext);
```

## API

### Options

| Name                     | Description                                                | Type                                                 | Default |
| ------------------------ | ---------------------------------------------------------- | ---------------------------------------------------- | ------- |
| message                  | 消息文本                                                   | ^[string] / ^[VNode] / ^[Function]`() => VNode`      | ''      |
| type                     | 消息类型                                                   | ^[enum]`'success' \| 'warning' \| 'info' \| 'error'` | info    |
| icon                     | 自定义图标组件，覆盖 `type`                                | ^[string] / ^[Component]                             | —       |
| dangerouslyUseHTMLString | 是否将 `message` 视为 HTML 字符串                          | ^[boolean]                                           | false   |
| customClass              | 消息的自定义类名                                           | ^[string]                                            | ''      |
| duration                 | 显示持续时间，毫秒。如果设置为 0，不会自动关闭             | ^[number]                                            | 3000    |
| showClose                | 是否显示关闭按钮                                           | ^[boolean]                                           | false   |
| center                   | 是否居中显示文本                                           | ^[boolean]                                           | false   |
| onClose                  | 消息关闭时的回调函数，以消息实例为参数                     | ^[Function]`() => void`                              | —       |
| offset                   | 设置距离视口顶部的距离                                     | ^[number]                                            | 16      |
| appendTo                 | 设置消息的根元素，默认为 `document.body`                   | ^[string] / ^[HTMLElement]                           | —       |
| grouping                 | 合并具有相同内容的消息，不支持 VNode 消息                  | ^[boolean]                                           | false   |
| repeatNum                | 重复次数，类似于徽标，与 `grouping` 结合使用时用作初始数字 | ^[number]                                            | 1       |

### Methods

`Message` 和 `this.$message` 会返回当前 Message 的实例。 如果需要手动关闭实例，可以调用它的 `close` 方法来关闭。

| Name  | Description       | Type                    |
| ----- | ----------------- | ----------------------- |
| close | 关闭当前的 Message | ^[Function]`() => void` |