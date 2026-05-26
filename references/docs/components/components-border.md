---
title: Border 边框
originUrl: http://192.168.219.170/docs/vue/latest/component/component/border.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/border.html)

# Border 边框

我们对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。

## 边框样式

我们提供了以下几种边框样式，以供选择。

**Demo 示例**: `border/border`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/border.html)

```vue
<template>
  <table class="demo-border">
    <tbody>
      <tr>
        <td class="text">名称</td>
        <td class="text">粗细</td>
        <td class="line">示例</td>
      </tr>
      <tr>
        <td class="text">实线</td>
        <td class="text">1px</td>
        <td class="line">
          <div />
        </td>
      </tr>
      <tr>
        <td class="text">虚线</td>
        <td class="text">1px</td>
        <td class="line">
          <div class="dashed" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.demo-border .text {
  width: 15%;
}
.demo-border .line {
  width: 70%;
}
.demo-border .line div {
  width: 100%;
  height: 0;
  border-top: 1px solid var(--e-border-color);
}
.demo-border .line .dashed {
  border-top: 1px dashed var(--e-border-color);
}
</style>

```

## 圆角

有以下几种圆角样式，以供选择。

**Demo 示例**: `border/radius`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/border.html)

```vue
<template>
  <e-row :gutter="12" class="demo-radius">
    <e-col v-for="(radius, i) in radiusGroup" :key="i" :span="6" :xs="{ span: 12 }">
      <div class="title">{{ radius.name }}</div>
      <div class="value">
        <code>border-radius: {{ getValue(radius.type) || '0px' }}</code>
      </div>
      <div
        class="radius"
        :style="{
          borderRadius: radius.type ? `var(--e-border-radius-${radius.type})` : '',
        }"
      />
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radiusGroup = ref([
  {
    name: '无圆角',
    type: '',
  },
  {
    name: '小圆角（图标）',
    type: 'mini',
  },
  {
    name: '小圆角（菜单）',
    type: 'small',
  },
  {
    name: '基础圆角',
    type: 'base',
  },
  {
    name: '大圆角',
    type: 'large',
  },
  {
    name: '全圆角（胶囊形状）',
    type: 'round',
  },
]);

const getValue = (type: string) => {
  const getCssVarValue = (prefix, type) =>
    getComputedStyle(document.documentElement).getPropertyValue(`--e-${prefix}-${type}`);
  return getCssVarValue('border-radius', type);
};
</script>
<style scoped>
.demo-radius .title {
  color: var(--e-text-color-regular);
  font-size: 18px;
  margin: 10px 0;
}
.demo-radius .value {
  color: var(--e-text-color-primary);
  font-size: 16px;
  margin: 10px 0;
}
.demo-radius .radius {
  height: 40px;
  width: 70%;
  border: 1px solid var(--e-border-color);
  border-radius: 0;
  margin-top: 20px;
}
</style>

```

## 阴影

有以下几种阴影样式，以供选择。

**Demo 示例**: `border/shadow`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/border.html)

```vue
<template>
  <div class="flex justify-between items-center flex-wrap">
    <div v-for="(shadow, i) in shadowGroup" :key="i" class="flex flex-col justify-center items-center" m="auto" w="46">
      <div
        class="inline-flex"
        h="30"
        w="30"
        m="2"
        :style="{
          boxShadow: `var(${getCssVarName(shadow.type)})`,
        }"
      />
      <span p="y-4" class="demo-shadow-text" text="sm">
        {{ shadow.name }}
      </span>
      <code text="xs">
        {{ getCssVarName(shadow.type) }}
      </code>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const shadowGroup = ref([
  {
    name: '元件，卡片元素',
    type: 's',
  },
  {
    name: '下拉菜单',
    type: 'm',
  },
  {
    name: '弹窗',
    type: 'l',
  },
  {
    name: '客户端窗体',
    type: 'xl',
  },
]);

const getCssVarName = (type: string) => {
  return `--e-shadow${type ? '-' : ''}${type}`;
};
</script>

```