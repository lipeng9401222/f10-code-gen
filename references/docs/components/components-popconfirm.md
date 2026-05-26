---
title: Popconfirm 气泡确认框
originUrl: http://192.168.219.170/docs/vue/latest/component/component/popconfirm.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/popconfirm.html)

# Popconfirm 气泡确认框

点击某个元素弹出一个简单的气泡确认框

> **💡 提示**
>
> 在 SSR（例如：[Nuxt](https://nuxt.com/v3)）和 SSG（例如：[VitePress](https://vitepress.vuejs.org/)）中使用此组件时，需要将其包装在 `<client-only></client-only>` 中。

## 基础用法

Popconfirm 类似于 Popover。因此，对于一些重复的属性，请参考 Popover 的文档。

**Demo 示例**: `popconfirm/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/popconfirm.html)

```vue
<template>
  <e-popconfirm title="Are you sure to delete this?">
    <template #reference>
      <e-button>Delete</e-button>
    </template>
  </e-popconfirm>
</template>

```

## 自定义

您可以自定义 Popconfirm，例如：

**Demo 示例**: `popconfirm/customize`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/popconfirm.html)

```vue
<template>
  <e-popconfirm
    width="220"
    confirm-button-text="OK"
    cancel-button-text="No, Thanks"
    :icon="InfoFilled"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
  >
    <template #reference>
      <e-button>Delete</e-button>
    </template>
  </e-popconfirm>
</template>

<script setup lang="ts">
import { InfoFilled } from '@epoint-fe/eui-icons';
</script>

```

## 触发事件

单击按钮以触发事件

**Demo 示例**: `popconfirm/trigger-event`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/popconfirm.html)

```vue
<template>
  <e-popconfirm
    confirm-button-text="Yes"
    cancel-button-text="No"
    :icon="InfoFilled"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <e-button>Delete</e-button>
    </template>
  </e-popconfirm>
</template>

<script setup lang="ts">
import { InfoFilled } from '@epoint-fe/eui-icons';

const confirmEvent = () => {
  console.log('confirm!');
};
const cancelEvent = () => {
  console.log('cancel!');
};
</script>

```

## 编程式创建 Popconfirm

除了组件形式，Popconfirm 也可以通过 JavaScript 方法来创建。这在您需要为动态元素添加确认框，或者需要更灵活控制确认框行为时非常有用。

> **💡 提示**
>
> `createPopconfirm` 必须提供 `virtualRef` 参数，用于指定 Popconfirm 定位的参考元素（即以哪个元素为基准显示确认框）。每个 Popconfirm 实例都返回一个包含 `close()` 方法的对象，您可以使用它来手动关闭确认框。您也可以使用 `closeAllPopconfirm()` 方法关闭所有活动的 Popconfirm 实例。
> 
> **与组件事件的区别**：编程式 API 使用 `onConfirm` 和 `onCancel` 作为**回调函数**传入配置对象，而组件用法则是通过 `@confirm` 和 `@cancel` 监听**事件**。
> 
> **异步回调**：当 `onConfirm` 返回 Promise 时，Popconfirm 会等待 Promise resolve 后再自动关闭；如果 Promise reject，则不会自动关闭，您可以在 catch 中自行决定是手动关闭还是保持打开（方便重试）。错误不会被框架捕获，交由您自行处理。

**Demo 示例**: `popconfirm/programmatic-popconfirm`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/popconfirm.html)

```vue
<template>
  <div class="programmatic-popconfirm-demo">
    <h3>编程式 Popconfirm</h3>
    <p class="description">使用 createPopconfirm 方法以编程方式创建 Popconfirm</p>

    <div class="demo-section">
      <h4>基础用法</h4>
      <e-button ref="buttonRef1" type="danger" @click="handleDelete"> 删除 </e-button>
    </div>

    <div class="demo-section">
      <h4>自定义配置</h4>
      <e-button ref="buttonRef2" type="primary" @click="handleCustom"> 自定义配置 </e-button>
    </div>

    <div class="demo-section">
      <h4>异步确认</h4>
      <e-button ref="buttonRef3" type="warning" @click="handleAsync"> 异步确认 </e-button>
    </div>

    <div class="demo-section">
      <h4>异步失败处理</h4>
      <p class="description">请求失败时 Popconfirm 不会自动关闭，方便用户重试</p>
      <e-button ref="buttonRef5" type="danger" @click="handleAsyncError"> 模拟失败 </e-button>
    </div>

    <div class="demo-section">
      <h4>手动关闭</h4>
      <e-button ref="buttonRef4" @click="handleManual"> 显示 Popconfirm </e-button>
      <e-button style="margin-left: 16px" @click="closeManual"> 手动关闭 </e-button>
    </div>

    <div class="demo-section">
      <h4>关闭所有</h4>
      <e-button type="info" @click="handleCloseAll"> 关闭所有 Popconfirm </e-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EButton, EMessage, closeAllPopconfirm, createPopconfirm } from '@epoint-fe/eui-components';
import type { PopconfirmHandler } from '@epoint-fe/eui-components';

type ButtonInstance = InstanceType<(typeof import('@epoint-fe/eui-components'))['EButton']>;

const buttonRef1 = ref<ButtonInstance>();
const buttonRef2 = ref<ButtonInstance>();
const buttonRef3 = ref<ButtonInstance>();
const buttonRef4 = ref<ButtonInstance>();
const buttonRef5 = ref<ButtonInstance>();

let manualHandler: PopconfirmHandler | null = null;

/**
 * 关闭所有 Popconfirm
 */
const handleCloseAll = () => {
  closeAllPopconfirm();
  EMessage.info('已关闭所有 Popconfirm');
};

/**
 * 基础删除示例
 */
const handleDelete = () => {
  if (!buttonRef1.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  createPopconfirm({
    virtualRef: buttonRef1.value.$el,
    title: '确认删除这条记录吗？',
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    onConfirm: () => {
      EMessage.success('删除成功');
    },
    onCancel: () => {
      EMessage.info('已取消删除');
    },
  });
};

/**
 * 自定义配置示例
 */
const handleCustom = () => {
  if (!buttonRef2.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  createPopconfirm({
    virtualRef: buttonRef2.value.$el,
    title: '自定义标题内容',
    confirmButtonText: '确定',
    cancelButtonText: '关闭',
    confirmButtonType: 'success',
    cancelButtonType: 'text',
    iconColor: '#67c23a',
    onConfirm: () => {
      EMessage.success('点击了确定');
    },
  });
};

/**
 * 异步确认示例（带加载状态）
 */
const handleAsync = () => {
  if (!buttonRef3.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  createPopconfirm({
    virtualRef: buttonRef3.value.$el,
    title: '确认提交审核吗？',
    confirmButtonText: '提交',
    cancelButtonText: '取消',
    // onConfirm 支持返回 Promise，在异步操作完成前 Popconfirm 会保持打开状态
    // 这天然防止了重复提交的问题
    async onConfirm() {
      // 模拟异步请求（如 API 调用）
      await new Promise((resolve) => setTimeout(resolve, 1000));
      EMessage.success('提交成功');
    },
  });
};

/**
 * 异步失败处理示例
 * 演示 onConfirm reject 时 Popconfirm 保持打开，用户可在 catch 中手动关闭或重试
 */
const handleAsyncError = () => {
  if (!buttonRef5.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  let retryCount = 0;
  createPopconfirm({
    virtualRef: buttonRef5.value.$el,
    title: '模拟请求失败，是否重试？',
    confirmButtonText: '重试',
    cancelButtonText: '取消',
    async onConfirm() {
      retryCount++;
      if (retryCount <= 2) {
        // 前两次模拟失败
        await new Promise((resolve) => setTimeout(resolve, 800));
        EMessage.error(`请求失败（第 ${retryCount} 次），Popconfirm 保持打开，可再次重试`);
        // 返回 void，不关闭
        return;
      }
      // 第三次模拟成功
      await new Promise((resolve) => setTimeout(resolve, 800));
      EMessage.success('请求成功');
      // 正常完成，Popconfirm 自动关闭
    },
  });
};

/**
 * 手动关闭示例
 */
const handleManual = () => {
  if (!buttonRef4.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  manualHandler = createPopconfirm({
    virtualRef: buttonRef4.value.$el,
    title: '这个 Popconfirm 可以手动关闭',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    onConfirm: () => {
      EMessage.success('点击确认');
      manualHandler = null;
    },
    onCancel: () => {
      EMessage.info('点击取消');
      manualHandler = null;
    },
  });
};

const closeManual = () => {
  if (manualHandler) {
    manualHandler.close();
    manualHandler = null;
    EMessage.info('已手动关闭');
  } else {
    EMessage.warning('没有活动的 Popconfirm');
  }
};
</script>

<style scoped>
.programmatic-popconfirm-demo {
  padding: 20px;
}

h3 {
  margin-top: 0;
  color: #303133;
}

h4 {
  margin-top: 0;
  color: #606266;
  font-size: 14px;
  margin-bottom: 12px;
}

.description {
  color: #909399;
  font-size: 14px;
  margin-bottom: 20px;
}

.demo-section {
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f5f7fa;
}

.demo-section:last-child {
  margin-bottom: 0;
}
</style>

```

## API

### Attributes

| Name                | Description                                                              | Type                                                                         | Default        |
| ------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | -------------- |
| title               | 标题                                                                     | ^[string]                                                                    | —              |
| confirm-button-text | 确认按钮文本                                                             | ^[string]                                                                    | —              |
| cancel-button-text  | 取消按钮文本                                                             | ^[string]                                                                    | —              |
| confirm-button-type | 确认按钮类型                                                             | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'` | primary        |
| cancel-button-type  | 取消按钮类型                                                             | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'` | text           |
| icon                | 图标组件                                                                 | ^[string] / ^[Component]                                                     | QuestionFilled |
| icon-color          | 图标颜色                                                                 | ^[string]                                                                    | #f90           |
| hide-icon           | 是否隐藏图标                                                             | ^[boolean]                                                                   | false          |
| hide-after          | 消失延迟，以毫秒为单位                                                   | ^[number]                                                                    | 200            |
| teleported          | Popconfirm 是否被传送到 body 上                                          | ^[boolean]                                                                   | true           |
| persistent          | 当 Popconfirm 不活跃并且 `persistent` 为 `false` 时，Popconfirm 将被销毁 | ^[boolean]                                                                   | false          |
| width               | Popconfirm 宽度，最小宽度为 150px                                        | ^[string] / ^[number]                                                        | 150            |
| virtual-triggering  | 是否启用虚拟触发（编程式 API 使用时需要设置为 `true`）                                   | ^[boolean]                                                                   | —              |
| virtual-ref         | 虚拟触发模式下，作为 Popconfirm 定位基准的 DOM 元素（编程式 API 的必填参数）                       | ^[HTMLElement]                                                               | —              |

### Events

| Name    | Description          | Type                                 |
| ------- | -------------------- | ------------------------------------ |
| confirm | 当点击确认按钮时触发 | ^[Function]`(e: MouseEvent) => void` |
| cancel  | 当点击取消按钮时触发 | ^[Function]`(e: MouseEvent) => void` |
| hide    | 当隐藏动画开始时触发 | ^[Function]`() => void`              |
| after-hide | 当隐藏动画结束后触发 | ^[Function]`() => void`           |

### Slots

| Name      | Description                  |
| --------- | ---------------------------- |
| reference | 触发 Popconfirm 的 HTML 元素 |

### Exposes

| Name   | Description             | Type                    |
| ------ | ----------------------- | ----------------------- |
| open   | 手动打开 Popconfirm      | ^[Function]`() => void` |
| close  | 手动关闭 Popconfirm      | ^[Function]`() => void` |

### createPopconfirmOptions

以下是通过 `createPopconfirm` 方法创建 Popconfirm 时可用的配置选项：

| Name                | Description                              | Type                                           | Default        |
| ------------------- | ---------------------------------------- | ---------------------------------------------- | -------------- |
| virtualRef          | 作为 Popconfirm 定位基准的 DOM 元素 **(必填)**<br>（即以哪个元素为基准显示确认框）   | ^[HTMLElement]                                 | —              |
| title               | 标题                                     | ^[string]                                      | —              |
| confirmButtonText   | 确认按钮文本                             | ^[string]                                      | —              |
| cancelButtonText    | 取消按钮文本                             | ^[string]                                      | —              |
| confirmButtonType   | 确认按钮类型                             | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'` | primary        |
| cancelButtonType    | 取消按钮类型                             | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'` | text           |
| icon                | 图标组件                                 | ^[string] / ^[Component]                       | QuestionFilled |
| iconColor           | 图标颜色                                 | ^[string]                                      | #f90           |
| hideIcon            | 是否隐藏图标                             | ^[boolean]                                     | false          |
| width               | Popconfirm 宽度                          | ^[string] / ^[number]                          | 150            |
| onConfirm           | 点击确认按钮时的回调函数（对应组件的 `@confirm` 事件）                     | ^[function]`(e: MouseEvent) => void \| Promise<void>` | —              |
| onCancel            | 点击取消按钮时的回调函数（对应组件的 `@cancel` 事件）                      | ^[function]`(e: MouseEvent) => void`           | —              |

`createPopconfirm` 方法返回一个具有以下属性的对象：

| Name  | Description                | Type                    |
| ----- | -------------------------- | ----------------------- |
| close | 用于关闭 Popconfirm 的方法 | ^[function]`() => void` |