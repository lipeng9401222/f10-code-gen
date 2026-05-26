---
title: Select 虚拟列表选择器
originUrl: http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

# Select 虚拟列表选择器

> **💡 提示**
>
> 此组件在服务器端渲染 (例如：[Nuxt](https://nuxt.com/v3)) 和静态生成 (例如：[VitePress](https://vitepress.vuejs.org/)) 中使用时，需要包装在 `<client-only></client-only>` 内。

## 背景

在某些用例中，单个选择器可能会加载成千上万行的数据。
将如此多的数据呈现到 DOM 中可能会对浏览器产生负担，从而导致性能问题。
为了提供更好的用户体验和开发体验，我们决定添加了这个虚拟列表功能。

## 基本用法

通过配置 `virtualListProps` 来开启虚拟列表功能，同时数据源必须通过 `options` 属性来指定。

**Demo 示例**: `select-virtual/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <e-select
    v-model="value"
    :options="options"
    placeholder="Please select"
    size="large"
    :virtual-list-props="{
      height: 200,
    }"
  />
  <e-select
    v-model="value"
    :options="options"
    placeholder="Please select"
    :virtual-list-props="{
      height: 200,
    }"
  />
  <e-select
    v-model="value"
    :options="options"
    placeholder="Please select"
    size="small"
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref();
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
</script>

<style scoped>
.example-showcase .e-select {
  margin-right: 20px;
}
</style>

```

## 多选

具有标签的基本多选选择器

**Demo 示例**: `select-virtual/multiple`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <e-select
    v-model="value"
    :options="options"
    placeholder="Please select"
    style="width: 240px"
    multiple
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref([]);
const options = ref(
  Array.from({ length: 1000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${initials[idx % 10]}${idx}`,
  }))
);
</script>

```

## 当选择的项目过多时，可以隐藏额外的标签。

您可以使用 `collapse-tags` 属性将标签折叠为文本。您可以在鼠标悬停在折叠文本上时检查它们，使用 `collapse-tags-tooltip` 属性。

**Demo 示例**: `select-virtual/hide-extra-tags`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <div class="m-4">
    <p>use collapse-tags</p>
    <e-select
      v-model="value"
      :options="options"
      placeholder="Please select"
      style="width: 240px"
      multiple
      collapse-tags
      :virtual-list-props="{
        height: 200,
      }"
    />
  </div>
  <div class="m-4">
    <p>use collapse-tags-tooltip</p>
    <e-select
      v-model="value2"
      :options="options"
      placeholder="Please select"
      style="width: 240px"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :virtual-list-props="{
        height: 200,
      }"
    />
  </div>
  <div class="m-4">
    <p>use max-collapse-tags</p>
    <e-select
      v-model="value3"
      :options="options"
      placeholder="Please select"
      style="width: 240px"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="3"
      :virtual-list-props="{
        height: 200,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref([]);
const value2 = ref([]);
const value3 = ref([]);
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
</script>

```

## 可筛选的多选选择器

当选项过于多时，您可以使用 `filterable` 选项来启用筛选功能，以查找所需的选项。

**Demo 示例**: `select-virtual/filterable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <e-select
    v-model="value"
    filterable
    :options="options"
    placeholder="Please select"
    style="width: 240px"
    multiple
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref([]);
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
</script>

```

## 禁用选择器和选择选项

您可以选择禁用选择器本身或选项。

**Demo 示例**: `select-virtual/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <e-select
    v-model="value"
    filterable
    :options="options"
    placeholder="Please select"
    style="width: 240px; margin-right: 16px; vertical-align: middle"
    multiple
    :virtual-list-props="{
      height: 200,
    }"
  />
  <e-select
    v-model="value"
    disabled
    filterable
    :options="options"
    placeholder="Please select"
    style="width: 240px; vertical-align: middle"
    multiple
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref([]);
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
  disabled: idx % 10 === 0,
}));
</script>

```

## 选项分组

只要数据满足模式，我们可以随心所欲地对选项进行分组。

**Demo 示例**: `select-virtual/grouping`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <e-select
    v-model="value"
    filterable
    :options="options"
    placeholder="Please select"
    style="width: 240px"
    multiple
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref([]);
const options = Array.from({ length: 10 }).map((_, idx) => {
  const label = idx + 1;
  return {
    value: `Group ${label}`,
    label: `Group ${label}`,
    options: Array.from({ length: 10 }).map((_, idx) => ({
      value: `Option ${idx + 1 + 10 * label}`,
      label: `${initials[idx % 10]}${idx + 1 + 10 * label}`,
    })),
  };
});
</script>

```

## 自定义选项渲染器

我们可以定义自己的模板来渲染弹出窗口中的选项。

**Demo 示例**: `select-virtual/customized-option`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <e-select
    v-model="value"
    filterable
    :options="options"
    placeholder="Please select"
    style="width: 240px"
    multiple
    :virtual-list-props="{
      height: 200,
    }"
  >
    <template #option="{ item }">
      <span style="margin-right: 8px">{{ item.label }}</span>
      <span style="color: var(--e-text-color-secondary); font-size: 13px">
        {{ item.value }}
      </span>
    </template>
  </e-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref([]);
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
</script>

```

## 可清除的选择器

我们可以一次性清除所有已选择的选项，也适用于单选。

**Demo 示例**: `select-virtual/clearable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <e-select
    v-model="value1"
    :options="options"
    placeholder="Please select"
    style="width: 240px; margin-right: 16px; vertical-align: middle"
    multiple
    clearable
    :virtual-list-props="{
      height: 200,
    }"
  />
  <e-select
    v-model="value2"
    :options="options"
    placeholder="Please select"
    style="width: 240px; vertical-align: middle"
    clearable
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value1 = ref([]);
const value2 = ref();
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
</script>

```

## 创建选项

创建和选择不包含在选择选项中的新项目

通过使用 `allow-create` 属性，用户可以通过在输入框中键入来创建新项目。请注意，要使 `allow-create` 工作，`filterable` 必须为 `true`。

> **💡 提示**
>
> 当使用 `allow-create` 时，最好将 `:reserve-keyword="false"`。

**Demo 示例**: `select-virtual/allow-create`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <div style="flex: auto">
    <div>
      <e-select
        v-model="value1"
        :options="options"
        placeholder="Please select"
        style="width: 240px; margin-right: 16px; vertical-align: middle"
        allow-create
        filterable
        multiple
        clearable
        :virtual-list-props="{
          height: 200,
        }"
      />
      <e-select
        v-model="value2"
        :options="options"
        placeholder="Please select"
        style="width: 240px; vertical-align: middle"
        allow-create
        filterable
        clearable
        :virtual-list-props="{
          height: 200,
        }"
      />
    </div>
    <div>
      <p style="margin-top: 20px; margin-bottom: 8px">set reserve-keyword false</p>
      <e-select
        v-model="value3"
        :options="options"
        placeholder="Please select"
        style="width: 240px; margin-right: 16px; vertical-align: middle"
        allow-create
        filterable
        multiple
        clearable
        :reserve-keyword="false"
        :virtual-list-props="{
          height: 200,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value1 = ref([]);
const value2 = ref();
const value3 = ref([]);
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
</script>

```

## 远程搜索

输入关键字并从服务器搜索数据。

**Demo 示例**: `select-virtual/remote-search`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <e-select
    v-model="value"
    style="width: 240px"
    multiple
    filterable
    remote
    :remote-method="remoteMethod"
    clearable
    :options="options"
    :loading="loading"
    placeholder="Please enter a keyword"
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
const list = states.map((item): ListItem => {
  return { value: `value:${item}`, label: `label:${item}` };
});

interface ListItem {
  value: string;
  label: string;
}

const value = ref([]);
const options = ref<ListItem[]>([]);
const loading = ref(false);

const remoteMethod = (query: string) => {
  if (query !== '') {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options.value = [];
  }
};
</script>

```

## 使用 `value-key`

**Demo 示例**: `select-virtual/use-valueKey`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select-virtual.html)

```vue
<template>
  <e-select
    v-model="value"
    :options="options"
    placeholder="Please select"
    value-key="name"
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref();
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: {
    name: `Option ${idx + 1}`,
    test: `test ${idx % 3}`,
  },
  label: `${initials[idx % 10]}${idx}`,
}));
</script>

```

## API

直接查看 [select](http://192.168.219.170/docs/vue/latest/component/component/select.html#api) 组件的文档