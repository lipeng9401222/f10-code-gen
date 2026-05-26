---
title: Notification 通知
originUrl: http://192.168.219.170/docs/vue/latest/component/component/notification.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/notification.html)

# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基本用法

**Demo 示例**: `notification/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/notification.html)

```vue
<template>
  <e-button plain @click="open1"> Closes automatically </e-button>
  <e-button plain @click="open2"> Won't close automatically </e-button>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { ENotification } from '@epoint-fe/eui-components';

const open1 = () => {
  ENotification({
    title: 'Title',
    message: h('i', { style: 'color: teal' }, 'This is a reminder'),
  });
};

const open2 = () => {
  ENotification({
    title: 'Prompt',
    message: 'This is a message that does not automatically close',
    duration: 0,
  });
};
</script>

```

## 带类型

我们提供了四种类型：success（成功）、warning（警告）、info（信息）和 error（错误）。

**Demo 示例**: `notification/different-types`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/notification.html)

```vue
<template>
  <e-button plain @click="open1"> Success </e-button>
  <e-button plain @click="open2"> Warning </e-button>
  <e-button plain @click="open3"> Info </e-button>
  <e-button plain @click="open4"> Error </e-button>
</template>

<script lang="ts" setup>
import { ENotification } from '@epoint-fe/eui-components';

const open1 = () => {
  ENotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success',
  });
};

const open2 = () => {
  ENotification({
    title: 'Warning',
    message: 'This is a warning message',
    type: 'warning',
  });
};

const open3 = () => {
  ENotification({
    title: 'Info',
    message: 'This is an info message',
    type: 'info',
  });
};

const open4 = () => {
  ENotification({
    title: 'Error',
    message: 'This is an error message',
    type: 'error',
  });
};
</script>

```

## 自定义位置

通知可以从任何你喜欢的角落出现。

**Demo 示例**: `notification/positioning`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/notification.html)

```vue
<template>
  <e-button plain @click="open1"> Top Right </e-button>
  <e-button plain @click="open2"> Bottom Right </e-button>
  <e-button plain @click="open3"> Bottom Left </e-button>
  <e-button plain @click="open4"> Top Left </e-button>
</template>

<script lang="ts" setup>
import { ENotification } from '@epoint-fe/eui-components';

const open1 = () => {
  ENotification({
    title: 'Custom Position',
    message: "I'm at the top right corner",
  });
};

const open2 = () => {
  ENotification({
    title: 'Custom Position',
    message: "I'm at the bottom right corner",
    position: 'bottom-right',
  });
};

const open3 = () => {
  ENotification({
    title: 'Custom Position',
    message: "I'm at the bottom left corner",
    position: 'bottom-left',
  });
};

const open4 = () => {
  ENotification({
    title: 'Custom Position',
    message: "I'm at the top left corner",
    position: 'top-left',
  });
};
</script>

```

## 带有偏移

自定义通知距离屏幕边缘的偏移量。

**Demo 示例**: `notification/offsetting`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/notification.html)

```vue
<template>
  <e-button plain @click="open"> N ENotification with offset </e-button>
</template>

<script lang="ts" setup>
import { ENotification } from '@epoint-fe/eui-components';

const open = () => {
  ENotification.success({
    title: 'Success',
    message: 'This is a success message',
    offset: 100,
  });
};
</script>

```

## 使用 HTML 字符串

`message`支持 HTML 字符串。

**Demo 示例**: `notification/raw-html`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/notification.html)

```vue
<template>
  <e-button plain @click="open"> Use HTML String </e-button>
</template>

<script lang="ts" setup>
import { ENotification } from '@epoint-fe/eui-components';

const open = () => {
  ENotification({
    title: 'HTML String',
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  });
};
</script>

```

> **⚠️ 警告**
>
> 尽管`message`属性支持 HTML 字符串，但在您的网站上动态呈现任意 HTML 可能非常危险，因为它很容易导致[XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此，在启用`dangerouslyUseHTMLString`时，请确保`message`的内容是可信的，**绝对不要**将`message`分配给用户提供的内容。

## 隐藏关闭按钮

可以隐藏关闭按钮

**Demo 示例**: `notification/no-close`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/notification.html)

```vue
<template>
  <e-button plain @click="open"> Hide close button </e-button>
</template>

<script lang="ts" setup>
import { ENotification } from '@epoint-fe/eui-components';

const open = () => {
  ENotification.success({
    title: 'Info',
    message: 'This is a message without close button',
    showClose: false,
  });
};
</script>

```

## 全局方法

EUI 为`app.config.globalProperties`添加了全局方法`$notify`。因此，在 Vue 实例中，您可以像在本页中所做的那样调用`Notification`。

## 单独引用

```javascript
import { ENotification } from '@epoint-fe/eui-components';
```

你可以在对应的处理函数内调用 `ENotification(options)` 来呼出通知栏。 我们也提前定义了多个 `type` 的单独调用方法，如 `ENotification.success(options)`。 当你需要关闭页面上所有的通知栏的时候，可以调用 `ENotification.closeAll()` 来关闭所有的实例。

## 应用程序上下文继承

现在，通知接受一个`context`作为消息构造函数的第二个参数，允许您将当前应用程序的上下文注入通知中，从而允许您继承应用程序的所有属性。

您可以像这样使用它：

> **💡 提示**
>
> 如果您全局注册了 `ENotification` 组件，它将自动继承您的应用程序上下文。

```ts
import { getCurrentInstance } from 'vue';
import { ENotification } from '@epoint-fe/eui-components';

// in your setup method
const { appContext } = getCurrentInstance()!;
ENotification({}, appContext);
```

## API

### Options

| Name                     | Description                                                        | Type                                                                  | Default   |
| ------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------- | --------- |
| title                    | 标题                                                               | ^[string]                                                             | ''        |
| message                  | 描述文本                                                           | ^[string] / ^[VNode]                                                  | ''        |
| dangerouslyUseHTMLString | 是否将 `message` 视为 HTML 字符串                                  | ^[boolean]                                                            | false     |
| type                     | 通知类型                                                           | ^[enum]`'success' \| 'warning' \| 'info' \| 'error' \| ''`            | ''        |
| icon                     | 自定义图标组件。如果设置，将覆盖 `type` 字段                       | ^[string] / ^[Component]                                              | —         |
| customClass              | 自定义通知的 class 名称                                            | ^[string]                                                             | ''        |
| duration                 | 关闭前的持续时间。如果设置为 0，则不会自动关闭                     | ^[number]                                                             | 4500      |
| position                 | 自定义位置                                                         | ^[enum]`'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | top-right |
| showClose                | 是否显示关闭按钮                                                   | ^[boolean]                                                            | true      |
| onClose                  | 关闭通知时的回调函数                                               | ^[Function]`() => void`                                               | —         |
| onClick                  | 单击通知时的回调函数                                               | ^[Function]`() => void`                                               | —         |
| offset                   | 距离屏幕顶部边缘的偏移量。同一时刻的每个通知实例应具有相同的偏移量 | ^[number]                                                             | 0         |
| appendTo                 | 设置通知的根元素，默认为 `document.body`                           | ^[string] / ^[HTMLElement]                                            | —         |
| zIndex                   | 初始的层叠顺序                                                     | ^[number]                                                             | 0         |

### Method

`Notification` 和 `this.$notify` 返回当前的通知实例。要手动关闭实例，您可以在其上调用 `close`。

| Name  | Description | Type                    |
| ----- | ----------- | ----------------------- |
| close | 关闭通知    | ^[Function]`() => void` |