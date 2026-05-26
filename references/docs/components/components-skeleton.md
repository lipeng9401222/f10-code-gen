---
title: Skeleton 骨架屏
originUrl: http://192.168.219.170/docs/vue/latest/component/component/skeleton.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/skeleton.html)

# Skeleton 骨架屏

当加载数据并需要为最终用户提供富有视觉和交互体验时，您可以选择 `skeleton`。

## 基本用法

基本的骨架屏。

**Demo 示例**: `skeleton/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/skeleton.html)

```vue
<template>
  <e-skeleton />
  <br />
  <e-skeleton style="--e-skeleton-circle-size: 100px">
    <template #template>
      <e-skeleton-item variant="circle" />
    </template>
  </e-skeleton>
</template>

```

## 可配置的行数

您可以自己配置行数，以获得更精确的渲染效果。实际渲染的行数将始终比给定的行数多 1 行，因为我们正在渲染一个标题行，其宽度为其他行的 33%。

**Demo 示例**: `skeleton/configurable-rows`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/skeleton.html)

```vue
<template>
  <e-skeleton :rows="5" />
</template>

```

## 动画

我们提供了一个开关标志，指示是否显示加载动画，称为 `animated`，当为 `true` 时，`e-skeleton` 的所有子元素都会显示动画。

**Demo 示例**: `skeleton/animation`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/skeleton.html)

```vue
<template>
  <e-skeleton :rows="5" animated />
</template>

```

## 自定义模板

您可以使用名为 `template` 的插槽来完成此工作。

此外，我们还提供了不同类型的骨架屏单元，您可以进行选择。有关更详细的信息，请向下滚动到本页底部查看 API 描述。此外，在构建自定义骨架结构时，您应尽量使其与真实 DOM 结构接近，以避免由高度差异引起的 DOM 弹跳。

**Demo 示例**: `skeleton/customized-template`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/skeleton.html)

```vue
<template>
  <e-skeleton style="width: 240px">
    <template #template>
      <e-skeleton-item variant="image" style="width: 240px; height: 240px" />
      <div style="padding: 14px">
        <e-skeleton-item variant="p" style="width: 50%" />
        <div style="display: flex; align-items: center; justify-items: space-between">
          <e-skeleton-item variant="text" style="margin-right: 16px" />
          <e-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </e-skeleton>
</template>

```

## 加载状态

当 `Loading` 结束时，我们始终需要向最终用户显示带有数据的真实 UI。使用 `loading` 属性，我们可以控制是否显示 DOM。您还可以使用插槽 `default` 来构建真实的 DOM 元素。

**Demo 示例**: `skeleton/loading-state`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/skeleton.html)

```vue
<template>
  <e-space direction="vertical" alignment="flex-start">
    <div>
      <label style="margin-right: 16px">Switch Loading</label>
      <e-switch v-model="loading" />
    </div>
    <e-skeleton style="width: 240px" :loading="loading" animated>
      <template #template>
        <e-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <e-skeleton-item variant="h3" style="width: 50%" />
          <div style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px">
            <e-skeleton-item variant="text" style="margin-right: 16px" />
            <e-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <e-card :body-style="{ padding: '0px', marginBottom: '1px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>Delicious hamburger</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
              <e-button text class="button">Operation button</e-button>
            </div>
          </div>
        </e-card>
      </template>
    </e-skeleton>
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(true);
const currentDate = new Date().toDateString();
</script>

```

## 渲染数据列表

大多数情况下，骨架屏用作渲染尚未从服务器获取的数据列表的指示器，然后我们需要创建一堆骨架屏，使其看起来像正在加载。使用 `count` 属性，您可以控制需要向浏览器渲染多少此类模板。

> **💡 提示**
>
> 我们不建议向浏览器渲染大量虚假 UI，这仍会导致性能问题，还需要更长的时间来销毁骨架屏。保持 `count` 尽可能小，以提供更好的用户体验。

**Demo 示例**: `skeleton/rendering-with-data`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/skeleton.html)

```vue
<template>
  <e-space direction="vertical" alignment="flex-start">
    <e-button @click="setLoading">Click me to reload</e-button>
    <e-skeleton style="width: 240px" :loading="loading" animated :count="3">
      <template #template>
        <e-skeleton-item variant="image" style="width: 400px; height: 267px" />
        <div style="padding: 14px">
          <e-skeleton-item variant="h3" style="width: 50%" />
          <div style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px">
            <e-skeleton-item variant="text" style="margin-right: 16px" />
            <e-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <e-card v-for="item in lists" :key="item.name" :body-style="{ padding: '0px', marginBottom: '1px' }">
          <img :src="item.imgUrl" class="image multi-content" />
          <div style="padding: 14px">
            <span>{{ item.name }}</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
              <e-button text class="button">Operation button</e-button>
            </div>
          </div>
        </e-card>
      </template>
    </e-skeleton>
  </e-space>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface ListItem {
  imgUrl: string;
  name: string;
}

const loading = ref(true);
const lists = ref<ListItem[]>([]);
const currentDate = new Date().toDateString();

const setLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

onMounted(() => {
  loading.value = false;
  lists.value = [
    {
      imgUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      name: 'Deer',
    },
    {
      imgUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      name: 'Horse',
    },
    {
      imgUrl: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      name: 'Mountain Lion',
    },
  ];
});
</script>

```

## 避免渲染跳动

有时 API 响应非常快，当发生这种情况时，骨架屏只是被渲染到 DOM，然后它需要切换回真实 DOM，这会导致突然的闪烁。为了避免这种情况，您可以使用 `throttle` 属性。

**Demo 示例**: `skeleton/avoiding-rendering-bouncing`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/skeleton.html)

```vue
<template>
  <e-space direction="vertical" alignment="flex-start">
    <div>
      <label style="margin-right: 16px">Switch Loading</label>
      <e-switch v-model="loading" />
    </div>
    <e-skeleton style="width: 240px" :loading="loading" animated :throttle="500">
      <template #template>
        <e-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <e-skeleton-item variant="h3" style="width: 50%" />
          <div style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px">
            <e-skeleton-item variant="text" style="margin-right: 16px" />
            <e-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <e-card :body-style="{ padding: '0px', marginBottom: '1px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>Delicious hamburger</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
              <e-button text class="button">operation button</e-button>
            </div>
          </div>
        </e-card>
      </template>
    </e-skeleton>
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(false);
const currentDate = new Date().toDateString();
</script>

```

## Skeleton API

### Skeleton Attributes

| Name     | Description                                 | Type       | Default |
| -------- | ------------------------------------------- | ---------- | ------- |
| animated | 是否使用动画                                | ^[boolean] | false   |
| count    | 渲染多少个 template, 建议使用尽可能小的数字 | ^[number]  | 1       |
| loading  | 是否显示加载结束后的 DOM 结构               | ^[boolean] | false   |
| rows     | 骨架屏段落数量                              | ^[number]  | 3       |
| throttle | 渲染延迟（以毫秒为单位）                    | ^[number]  | 0       |

### Skeleton Slots

| Name     | Description              | Scope                      |
| -------- | ------------------------ | -------------------------- |
| default  | 真正渲染的 DOM           | ^[object]`$attrs`          |
| template | 渲染 skeleton 模板的内容 | ^[object]`{ key: number }` |

## SkeletonItem API

### SkeletonItem Attributes

| Name    | Description            | Type                                                                                             | Default |
| ------- | ---------------------- | ------------------------------------------------------------------------------------------------ | ------- |
| variant | 当前渲染 skeleton 类型 | ^[enum]`'p' \| 'text' \| 'h1' \| 'h3' \| 'caption' \| 'button' \| 'image' \| 'circle' \| 'rect'` | text    |