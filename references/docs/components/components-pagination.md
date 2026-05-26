---
title: Pagination 分页
originUrl: http://192.168.219.170/docs/vue/latest/component/component/pagination.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)

# Pagination 分页

当数据量过多时，使用分页分解数据。

## 基础用法

**Demo 示例**: `pagination/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)

```vue
<template>
  <div class="example-pagination-block">
    <div class="example-demonstration">当你只有几页时</div>
    <e-pagination :total="50" />
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">当你只有很多页时</div>
    <e-pagination :total="10000" />
  </div>
</template>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>

```

## 改变

**Demo 示例**: `pagination/changer`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)

```vue
<template>
  <div>
    <e-pagination
      v-model:current="current1"
      v-model:page-size="pageSize"
      show-size-changer
      :total="500"
      @show-size-change="onShowSizeChange"
    />
    <br />
    <e-pagination
      v-model:current="current2"
      show-size-changer
      :total="500"
      disabled
      @show-size-change="onShowSizeChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
const pageSize = ref(20);
const current1 = ref(3);
const current2 = ref(4);
const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize);
};
watch(pageSize, () => {
  console.log('pageSize', pageSize.value);
});
watch(current1, () => {
  console.log('current', current1.value);
});
</script>

```

## 自定义下拉选项

**Demo 示例**: `pagination/custom-changer`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)

```vue
<template>
  <e-pagination
    v-model:current="current"
    v-model:page-size="pageSizeRef"
    :page-size-options="pageSizeOptions"
    :total="total"
    :build-option-text="buildOptionText"
    show-size-changer
    @show-size-change="onShowSizeChange"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const current = ref(1);
const pageSizeRef = ref(10);
const total = ref(50);

const buildOptionText = (option) => {
  if (option.value !== '50') {
    return `${option.value}条/页`;
  }
  return '全部';
};
const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize);
  pageSizeRef.value = pageSize;
};
</script>

```

## 跳转

**Demo 示例**: `pagination/jump`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)

```vue
<template>
  <div>
    <e-pagination v-model:current="current1" show-quick-jumper :total="500" @change="onChange" />
    <br />
    <e-pagination
      v-model:current="current2"
      show-quick-jumper
      :total="500"
      disabled
      show-less-items
      @change="onChange"
    />
    <br />
    <e-pagination v-model:current="current3" :show-quick-jumper="false" :total="500" @change="onChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const current1 = ref<number>(1);
const current2 = ref<number>(2);
const current3 = ref<number>(3);
const onChange = (pageNumber: number) => {
  console.log('Page:', pageNumber);
};
</script>

```

## 迷你

迷你版本。

**Demo 示例**: `pagination/mini`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)

```vue
<template>
  <div id="components-pagination-demo-mini">
    <e-pagination size="small" :total="50" />
    <e-pagination size="small" :total="50" show-size-changer show-quick-jumper />
    <e-pagination size="small" :total="50" :show-total="(total) => `Total ${total} items`" />
  </div>
</template>
<style scoped>
#components-pagination-demo-mini .e-pagination:not(:last-child) {
  margin-bottom: 24px;
}
</style>

```

## 简洁

简单的翻页。

**Demo 示例**: `pagination/simple`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)

```vue
<template>
  <e-pagination v-model:current="current" simple :total="50" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const current = ref<number>(2);
</script>

```

## 总数

通过设置 showTotal 展示总共有多少数据。

**Demo 示例**: `pagination/total`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)

```vue
<template>
  <div>
    <e-pagination
      v-model:current="current1"
      v-model:page-size="pageSize1"
      :total="85"
      :show-total="(total) => `总数 ${total} 个`"
    />
    <br />
    <e-pagination
      v-model:current="current2"
      v-model:page-size="pageSize2"
      :total="85"
      :show-total="(total, range) => ` 共${total} 项，当前显示第${range[0]}至${range[1]}条`"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const current1 = ref<number>(1);
const current2 = ref<number>(2);
const pageSize1 = ref<number>(20);
const pageSize2 = ref<number>(20);
</script>

```

## 上一步和下一步

修改上一步和下一步为文字链接。

**Demo 示例**: `pagination/itemRender`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)

```vue
<template>
  <e-pagination v-model:current="current" :total="500">
    <template #itemRender="{ type, originalElement }">
      <span v-if="type === 'prev'" class="custom-page">Prev</span>
      <span v-else-if="type === 'next'" class="custom-page">Next</span>
      <component :is="originalElement" v-else />
    </template>
  </e-pagination>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const current = ref(1);
</script>

<style scoped>
.custom-page {
  padding: 0 8px;
}
</style>

```

## API

### Attributes

| Name              | Description                                                  | Type                                                                           | Default                    |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------- |
| current(v-model)  | 当前页数                                                     | number                                                                         | -                          |
| defaultPageSize   | 默认的每页条数                                               | number                                                                         | 10                         |
| disabled          | 禁用分页                                                     | boolean                                                                        | -                          |
| hideOnSinglePage  | 只有一页时是否隐藏分页器                                     | boolean                                                                        | false                      |
| itemRender        | 用于自定义页码的结构，可用于优化 SEO                         | ({page, type: 'page' \| 'prev' \| 'next', originalElement}) => vNode \| v-slot | -                          |
| pageSize(v-model) | 每页条数                                                     | number                                                                         | -                          |
| pageSizeOptions   | 指定每页可以显示多少条                                       | string\[] \| number\[]                                                         | \['10', '20', '50', '100'] |
| responsive        | 当 size 未指定时，根据屏幕宽度自动调整尺寸                   | boolean                                                                        | -                          |
| showLessItems     | 是否显示较少页面内容                                         | boolean                                                                        | false                      |
| showQuickJumper   | 是否可以快速跳转至某页                                       | boolean                                                                        | true                       |
| showSizeChanger   | 是否展示 `pageSize` 切换器，当 `total` 大于 50 时默认为 true | boolean                                                                        | -                          |
| showTotal         | 用于显示数据总量和当前数据顺序                               | Function(total, range)                                                         | -                          |
| simple            | 当添加该属性时，显示为简单分页                               | boolean                                                                        | -                          |
| size              | 当为「small」时，是小尺寸分页                                | string                                                                         | ""                         |
| total             | 数据总数                                                     | number                                                                         | 0                          |

### Events

| Name           | Description                                                | Type                       |
| -------------- | ---------------------------------------------------------- | -------------------------- |
| change         | 页码或 `pageSize` 改变的回调，参数是改变后的页码及每页条数 | `Function(page, pageSize)` |
| showSizeChange | pageSize 变化的回调                                        | `Function(current, size)`  |