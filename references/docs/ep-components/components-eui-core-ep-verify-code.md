---
title: VerifyCode
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-verify-code/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-verify-code/)

此组件由 `@epframe/eui-core` 包提供。

`VerifyCode` 控件是基于 `@epoint-fe/eui-components` 中的 [VerifyCode](http://192.168.219.170/docs/vue/latest/component/component/verify-code.html) 控件封装的，对接了框架请求格式的处理。

## 基础使用​

- 配置 `action` 属性为验证码的接口地址。

**Demo 示例**: `@epframe/eui-core/components/verify-code/base.vue`

```vue
<template>
  <ep-verify-code
    captcha-type="textclick"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha"
    @validate="onValidate"
  />
  <p>验证状态：{{ isValidate ? '成功' : '失败' }}</p>
  <p>validateCode: {{ validateCode }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { EpVerifyCode } from '@epframe/eui-core';

const isValidate = ref(false);
const validateCode = ref('');

const onValidate = (e) => {
  isValidate.value = e.isValid;
  validateCode.value = e.validateCode;
};
</script>
```

## API

与 [VerifyCode](http://192.168.219.170/docs/vue/latest/component/component/verify-code.html#verify-code-attributes) 一致。

## 区别

与组件库中的 [VerifyCode](http://192.168.219.170/docs/vue/latest/component/component/verify-code.html) 控件相比，VerifyCode 控件主要有以下区别：

- 完美对接了框架的请求格式要求，无需额外处理数据。