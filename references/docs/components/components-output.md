---
title: Output 输出
originUrl: http://192.168.219.170/docs/vue/latest/component/component/output.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/output.html)

# Output 输出

用于输出渲染 HTML 字符串。

> **⚠️ 警告**
>
> 注意：该组件默认使用 v-html 指令将内容渲染为 HTML，由于可能存在 XSS 安全风险，请确保对输入内容进行安全过滤和转义处理。
> 
> 对于使用框架后端 XSS 防御功能的场景，如需正常渲染 HTML 内容，请将 `validateLevel` 设置为 1 或 3。使用默认的 2 级验证时，将直接显示原始 HTML 字符串而不进行渲染。

## 基本用法

**Demo 示例**: `output/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/output.html)

```vue
<template>
  <div>
    <e-output :value="html" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const html = ref('<div style="color: red;">123</div>&lt;div&gt;123&lt;/div&gt;');
</script>

```

## 转义 HTML 字符串

**Demo 示例**: `output/escape-html`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/output.html)

```vue
<template>
  <div>
    <e-output :value="html" escape />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const html = ref('<div style="color: red;">123</div>&lt;div&gt;123&lt;/div&gt;');
</script>

```

## Output API

### Output Attributes

| Name   | Description            | Type    | Default |
| ------ | ---------------------- | ------- | ------- |
| value  | 绑定要展示的文本字符串 | string  | —       |
| escape | 是否转义 HTML 字符串   | boolean | false   |