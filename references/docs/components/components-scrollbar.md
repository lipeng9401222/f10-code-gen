---
title: Scrollbar 滚动条
originUrl: http://192.168.219.170/docs/vue/latest/component/component/scrollbar.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/scrollbar.html)

# Scrollbar 滚动条

用于替换浏览器原生滚动条。

## 基础用法

**Demo 示例**: `scrollbar/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/scrollbar.html)

```vue
<template>
  <e-scrollbar height="400px">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </e-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--e-color-primary-light-9);
  color: var(--e-color-primary);
}
</style>

```

## 横向滚动

**Demo 示例**: `scrollbar/horizontal-scroll`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/scrollbar.html)

```vue
<template>
  <e-scrollbar>
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </e-scrollbar>
</template>

<style scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--e-color-danger-light-9);
  color: var(--e-color-danger);
}
</style>

```

## 最大高度

**Demo 示例**: `scrollbar/max-height`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/scrollbar.html)

```vue
<template>
  <e-button @click="add">Add Item</e-button>
  <e-button @click="onDelete">Delete Item</e-button>
  <e-scrollbar max-height="400px">
    <p v-for="item in count" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </e-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const count = ref(3);

const add = () => {
  count.value++;
};
const onDelete = () => {
  if (count.value > 0) {
    count.value--;
  }
};
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--e-color-primary-light-9);
  color: var(--e-color-primary);
}
</style>

```

## 手动滚动

**Demo 示例**: `scrollbar/manual-scroll`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/scrollbar.html)

```vue
<template>
  <e-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </e-scrollbar>

  <e-slider v-model="value" :max="max" :format-tooltip="formatTooltip" @input="inputSlider" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { EScrollbar } from '@epoint-fe/eui-components';

const max = ref(0);
const value = ref(0);
const innerRef = ref<HTMLDivElement>();
const scrollbarRef = ref<InstanceType<typeof EScrollbar>>();

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380;
});

const inputSlider = (value: number) => {
  scrollbarRef.value!.setScrollTop(value);
};
const scroll = ({ scrollTop }) => {
  value.value = scrollTop;
};
const formatTooltip = (value: number) => {
  return `${value} px`;
};
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--e-color-primary-light-9);
  color: var(--e-color-primary);
}
.e-slider {
  margin-top: 20px;
}
</style>

```

## API

### Attributes

| Name       | Description                                                  | Type                                                         | Default |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------- |
| height     | 滚动条高度                                                   | ^[string] / ^[number]                                        | —       |
| max-height | 滚动条最大高度                                               | ^[string] / ^[number]                                        | —       |
| native     | 是否使用原生滚动条样式                                       | ^[boolean]                                                   | false   |
| wrap-style | 包裹容器的自定义样式                                         | ^[string] / ^[object]`CSSProperties \| CSSProperties[] \| string[]` | —       |
| wrap-class | 包裹容器的自定义类名                                         | ^[string]                                                    | —       |
| view-style | 视图的自定义样式                                             | ^[string] / ^[object]`CSSProperties \| CSSProperties[] \| string[]` | —       |
| view-class | 视图的自定义类名                                             | ^[string]                                                    | —       |
| noresize   | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 | ^[boolean]                                                   | false   |
| tag        | 视图的元素标签                                               | ^[string]                                                    | div     |
| always     | 滚动条总是显示                                               | ^[boolean]                                                   | false   |
| min-size   | 滚动条最小尺寸                                               | ^[number]                                                    | 20      |
| visible    | 是否显示滚动条                                               | ^[boolean]                                                    | true    |

### Events

| Name   | Description                      | Type                                                             |
| ------ | -------------------------------- | ---------------------------------------------------------------- |
| scroll | 当触发滚动事件时，返回滚动的距离 | ^[Function]`({ scrollLeft: number, scrollTop: number }) => void` |

### Slots

| Name    | Description    |
| ------- | -------------- |
| default | 自定义默认内容 |

### Exposes

| Name          | Description            | Type                                                                       |
| ------------- | ---------------------- | -------------------------------------------------------------------------- |
| handleScroll  | 触发滚动事件           | ^[Function]`() => void`                                                    |
| scrollTo      | 滚动到一组特定坐标     | ^[Function]`(options: ScrollToOptions \| number, yCoord?: number) => void` |
| setScrollTop  | 设置滚动条到顶部的距离 | ^[Function]`(scrollTop: number) => void`                                   |
| setScrollLeft | 设置滚动条到左边的距离 | ^[Function]`(scrollLeft: number) => void`                                  |
| update        | 手动更新滚动条状态     | ^[Function]`() => void`                                                    |
| wrapRef       | 滚动条包裹的 ref 对象  | ^[object]`Ref<HTMLDivElement>`                                             |