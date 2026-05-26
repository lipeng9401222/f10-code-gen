---
title: ButtonEdit 组件
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-button-edit/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-button-edit/)

此组件由 `@epframe/eui-core` 包提供。

ButtonEdit 控件是是参照 F9 中的 mini.ButtonEdit 控件开发的，用于在表单中弹出一个选择页面这个场景的。

## 基础使用​

- 通过 `popupUrl` 参数指定弹出的页面地址。可以是一个F9页面地址，也可以是一个 Vue 页面的路径。
- 通过 `v-model` 绑定控件值，`v-model:text` 绑定控件的文本。
- 弹出的F9页面无须改造，正常使用 `epoint.closeDialog` 方法关闭页面进行传值即可。
- 弹出的 Vue 页面中需要使用组件库提供的 [`getCurrentDialog().close`](http://192.168.219.170/docs/vue/latest/component/component/dialog.html#openComponentDialog) 方法关闭页面进行传值。
- Vue 的页面中通过监听 `close` 事件获取F9页面返回的值，事件参数 `e.params` 即为F9页面 `epoint.closeDialog` 的回传值，按实际需求格式化成控件需要的格式。

## 演示效果

**Demo 示例**: `@epframe/eui-core/components/button-edit/base.vue`

```vue
<template>
  <e-form v-model="form">
    <e-form-item label="字段挑选" prop="value">
      <ep-button-edit
        v-model="form.value"
        v-model:text="form.text"
        placeholder="请选择"
        clearable
        popup-url="/framemanager/orga/ou/selectouuser"
        @close="onButtonEditClose"
      />
    </e-form-item>
  </e-form>
</template>
<script setup>
import { ref } from "vue";
import { EpButtonEdit } from "@epframe/eui-core";

const form = ref({
  value: "",
  text: "",
});

const onButtonEditClose = (e) => {
  const pArr = e.params.split(";");
  // 将返回的数据格式化成 ButtonEdit 控件需要的格式
  e.params = {
    text: pArr[0],
    value: pArr[1],
  };
};
</script>

```

## API

### Attributes

| Name       | Description                                                                | Type                                     | Default   |
| ------------ | ------------------------------------------------------------------- | ---------------------------------------- | -------- |
| v-model      | 绑定值                                                              | `string`                                 | —        |
| v-model&#58;text | 绑定文本                                                            | `string`                                 | —        |
| placeholder  | 输入框占位文本                                                      | `string`                                 | —        |
| before       | 弹窗打开前可执行的方法，支持异步，返回`false`可以中断逻辑           | `() => Promise<boolean>`                 | -        |
| clearable    | 是否显示清除按钮                                                    | `boolean`                                | false    |
| disabled     | 是否禁用                                                            | `boolean`                                | false    |
| readonly     | 是否只读                                                            | `boolean`                                | false    |
| size         | 输入框尺寸                                                          | ^[enum]`'large' \| 'default' \| 'small'` | —        |
| allowInput   | 是否允许输入,允许输入时点击按钮才会触发弹窗，否则整个控件都触发弹出 | `boolean`                                | false    |
| popupUrl     | 弹窗页面地址                                                        | `string`                                 | —        |
| title        | 弹窗标题                                                            | `string`                                 | '请挑选' |
| popupWidth   | 弹窗宽度                                                            | `number`                                 | 800      |
| popupHeight  | 弹窗高度                                                            | `number`                                 | 600      |

### Events

| Name  | Description                     | Type                                                                             |
| ----- | ------------------------ | -------------------------------------------------------------------------------- |
| click | 按钮点击弹出弹窗前触发   | ^[Function]`() => void`                                                          |
| close | 关闭弹窗更新控件值前触发 | ^[Function]`(event: { cancel: boolean, params: Record<string, string>}) => void` |

### Exposes

| Name     | Description         | Type           |
| -------- | ------------ | -------------- |
| getValue | 获取控件值   | `() => string` |
| getText  | 获取控件文本 | `() => string` |