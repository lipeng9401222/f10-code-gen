---
title: Typography
originUrl: http://192.168.219.170/docs/vue/latest/component/component/typography.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/typography.html)

# Typography 排版

我们对字体进行统一规范，力求在各个操作系统下都有最佳展示效果。

## 字体

**Demo 示例**: `typography/font`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/typography.html)

```vue
<script lang="ts" setup>
import { isDark } from '~/utils/is-dark';
</script>

<template>
  <div v-if="!isDark" class="demo-term-box">
    <img src="/images/typography/term-pingfang.png" alt="" />
    <img src="/images/typography/term-hiragino.png" alt="" />
    <img src="/images/typography/term-microsoft.png" alt="" />
    <img src="/images/typography/term-helvetica.png" alt="" />
    <img src="/images/typography/term-arial.png" alt="" />
  </div>
  <div v-else class="demo-term-box">
    <img src="/images/typography/term-pingfang-dark.png" alt="" />
    <img src="/images/typography/term-hiragino-dark.png" alt="" />
    <img src="/images/typography/term-microsoft-dark.png" alt="" />
    <img src="/images/typography/term-helvetica-dark.png" alt="" />
    <img src="/images/typography/term-arial-dark.png" alt="" />
  </div>
</template>

<style scoped>
img {
  width: 220px;
  height: 174px;
  margin: 0 24px 24px 0;
}
img:nth-of-type(3) {
  margin-right: 0;
}
</style>

```

## 字号

**Demo 示例**: `typography/convention`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/typography.html)

```vue
<template>
  <table class="demo-typo-size">
    <tbody>
      <tr>
        <td>Level</td>
        <td>Font Size</td>
        <td class="color-dark-light">Demo</td>
      </tr>
      <tr v-for="(fontSize, i) in fontSizes" :key="i" :style="`font-size: var(--e-font-size-${fontSize.type})`">
        <td>{{ fontSize.level }}</td>
        <td>
          {{ useCssVar(`--e-font-size-${fontSize.type}`).value + ' ' + formatType(fontSize.type) }}
        </td>
        <td>Build In EuiComponents</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { useCssVar } from '@vueuse/core';

const fontSizes = [
  {
    level: '辅助文本 Supplementary text',
    type: 'extra-small',
  },
  {
    level: '正文（小号） Body (small)',
    type: 'small',
  },
  {
    level: '正文 Body',
    type: 'base',
  },
  {
    level: '小标题 Small Title',
    type: 'medium',
  },
  {
    level: '标题 Title',
    type: 'large',
  },
  {
    level: '主标题 Main Title',
    type: 'extra-large',
  },
];

function formatType(type: string) {
  return type
    .split('-')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}
</script>

<style scoped>
.demo-typo-size td {
  padding: 5px 10px;
}
</style>

```

## 行高

**Demo 示例**: `typography/line-height`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/typography.html)

```vue
<script lang="ts" setup>
import { isDark } from '~/utils/is-dark';
</script>

<template>
  <div>
    <img v-if="isDark" class="lineH-left" src="/images/typography/line-height-dark.png" />
    <img v-else class="lineH-left" src="/images/typography/line-height.png" />
    <ul class="lineH-right">
      <li>
        line-height: <code>1</code> <span>无行高 No line height</span>
        <div class="block">
          <div class="row" style="line-height: 1"><span class="text">无行高 No line height</span></div>
          <div class="row" style="line-height: 1"><span class="text">无行高 No line height</span></div>
          <div class="row" style="line-height: 1"><span class="text">无行高 No line height</span></div>
        </div>
      </li>
      <li>
        line-height: <code>1.3</code> <span>紧凑 Compact</span>
        <div class="block">
          <div class="row" style="line-height: 1.3"><span class="text">紧凑 Compact</span></div>
          <div class="row" style="line-height: 1.3"><span class="text">紧凑 Compact</span></div>
          <div class="row" style="line-height: 1.3"><span class="text">紧凑 Compact</span></div>
        </div>
      </li>
      <li>
        line-height: <code>1.5</code> <span>常规 Regular</span>
        <div class="block">
          <div class="row" style="line-height: 1.5"><span class="text">常规 Regular</span></div>
          <div class="row" style="line-height: 1.5"><span class="text">常规 Regular</span></div>
          <div class="row" style="line-height: 1.5"><span class="text">常规 Regular</span></div>
        </div>
      </li>
      <li>
        line-height: <code>1.7</code> <span>宽松 Loose</span>
        <div class="block">
          <div class="row" style="line-height: 1.7"><span class="text">宽松 Loose</span></div>
          <div class="row" style="line-height: 1.7"><span class="text">宽松 Loose</span></div>
          <div class="row" style="line-height: 1.7"><span class="text">宽松 Loose</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.block {
  background: #f5f5f5;
  color: #fff;
}
.row {
  background: #cce3ff;
}
.text {
  font-size: 14px;
  background: red;
}
</style>

```

## Font-family

```css
font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
```