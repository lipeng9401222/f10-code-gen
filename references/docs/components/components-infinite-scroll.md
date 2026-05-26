---
title: Infinite Scroll 无限滚动
originUrl: http://192.168.219.170/docs/vue/latest/component/component/infinite-scroll.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/infinite-scroll.html)

# Infinite Scroll 无限滚动

滚动至底部时，加载更多数据。

## 基础用法

在要实现滚动加载的列表上添加 `v-infinite-scroll`，并赋值相应的加载方法，可实现滚动到底部时自动执行加载方法。

**Demo 示例**: `infinite-scroll/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/infinite-scroll.html)

```vue
<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const count = ref(0);
const load = () => {
  count.value += 2;
};
</script>

<style scoped>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--e-color-primary-light-9);
  margin: 10px;
  color: var(--e-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>

```

## 禁用加载

**Demo 示例**: `infinite-scroll/disable-loading`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/infinite-scroll.html)

```vue
<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
      <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="noMore">No more</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const count = ref(10);
const loading = ref(false);
const noMore = computed(() => count.value >= 20);
const disabled = computed(() => loading.value || noMore.value);
const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 2000);
};
</script>

<style scoped>
.infinite-list-wrapper {
  height: 300px;
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--e-color-danger-light-9);
  color: var(--e-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>

```

## API

### Attributes

| Name                      | Description                                            | Type        | Default |
| ------------------------- | ------------------------------------------------------ | ----------- | ------- |
| v-infinite-scroll         | 滚动到底部时，加载更多数据                             | ^[Function] | —       |
| infinite-scroll-disabled  | 是否禁用                                               | ^[boolean]  | false   |
| infinite-scroll-delay     | 节流时延，单位为 ms                                    | ^[number]   | 200     |
| infinite-scroll-distance  | 触发加载的距离阈值，单位为 px                          | ^[number]   | 0       |
| infinite-scroll-immediate | 是否立即执行加载方法，以防初始状态下内容无法撑满容器。 | ^[boolean]  | true    |