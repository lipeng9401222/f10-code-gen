---
title: VerifyCode
originUrl: http://192.168.219.170/docs/vue/latest/component/component/verify-code.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/verify-code.html)

# VerifyCode 验证码

滑块验证码控件。

## 基本用法

**Demo 示例**: `verify-code/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/verify-code.html)

```vue
<template>
  <e-verify-code
    captcha-type="textclick"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha"
    @validate="onValidate"
  />
  <p>验证状态：{{ isValidate ? '成功' : '失败' }}</p>
  <p>validateCode: {{ validateCode }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isValidate = ref<boolean>(false);
const validateCode = ref<string>('');

const onValidate = (e) => {
  isValidate.value = e.isValid;
  validateCode.value = e.validateCode;
};
</script>

```

## trigger 模式

**Demo 示例**: `verify-code/trigger`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/verify-code.html)

```vue
<template>
  <e-verify-code action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha" type="trigger" />
</template>

<script setup lang="ts"></script>

```

## dialog 模式

**Demo 示例**: `verify-code/popup`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/verify-code.html)

```vue
<template>
  <e-button @click="showDialog"> 打开验证码 </e-button>
  <e-dialog v-model="dialogVisible" title="请完成安全验证" :width="340">
    <e-verify-code
      ref="verifyCodeRef"
      captcha-type="iconclick"
      icon-base-url="https://picsum.photos/20/20"
      action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha"
      @validate="onValidate"
    />
  </e-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const verifyCodeRef = ref();

const dialogVisible = ref<boolean>(false);
const isValidate = ref<boolean>(false);
const validateCode = ref<string>('');

const showDialog = () => {
  dialogVisible.value = true;
  verifyCodeRef.value?.reload();
};
const onValidate = (e) => {
  isValidate.value = e.isValid;
  validateCode.value = e.validateCode;

  if (e.isValid) {
    setTimeout(() => {
      dialogVisible.value = false;
    }, 1000);
  }
};
</script>

```

## API

### Attributes

| Name         | Description                                           | Type                                                                               | Default       |
| ------------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------- |
| action       | 接口地址                                              | `string`                                                                           | ''            |
| type         | 展示的Type                                            | ^[enum]`'normal' \| 'trigger'`                                                     | 'normal'      |
| width        | 宽                                                    | `number`                                                                           | 300           |
| captchaType  | 验证码类型                                            | ^[enum]`'blockpuzzle' \| 'textclick' \| 'iconclick'`                               | 'blockpuzzle' |
| iconBaseUrl  | 图标地址                                              | `string`                                                                           | null          |
| http-request | 覆盖默认的 xhr 行为，允许你实现自己的初始化和验证请求 | ^[function]`(options: VerifyRequestHandler) => XMLHttpRequest \| Promise<unknown>` | —             |

### Events

| Name     | Description    | Type                                                                                        |
| -------- | -------------- | ------------------------------------------------------------------------------------------- |
| validate | 验证完成后触发 | ^[function]`(evt: { isValid： boolean, validateCode?: string, errorMsg:? string }) => void` |

### Exposes

| Name   | Description    | Type                    |
| ------ | -------------- | ----------------------- |
| reload | 重新加载验证码 | ^[function]`() => void` |