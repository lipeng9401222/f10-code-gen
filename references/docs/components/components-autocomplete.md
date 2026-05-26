---
title: Autocomplete 自动补全输入框
originUrl: http://192.168.219.170/docs/vue/latest/component/component/autocomplete.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/autocomplete.html)

# Autocomplete 自动补全输入框

根据输入内容提供对应的输入建议。

> **💡 提示**
>
> 在服务器端渲染 (例如：[Nuxt](https://nuxt.com/v3)) 和静态站点生成 (例如：[VitePress](https://vitepress.vuejs.org/)) 中使用此组件需要将其包装在 `<client-only></client-only>` 标签内。

## 基本用法

自动完成组件提供输入建议。

**Demo 示例**: `autocomplete/autocomplete`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/autocomplete.html)

```vue
<template>
  <e-row class="demo-autocomplete">
    <e-col :span="12">
      <div class="sub-title my-2 text-sm text-gray-600">list suggestions when activated</div>
      <e-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </e-col>
    <e-col :span="12">
      <div class="sub-title my-2 text-sm text-gray-600">list suggestions on input</div>
      <e-autocomplete
        v-model="state2"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface RestaurantItem {
  value: string;
  link: string;
}

const state1 = ref('');
const state2 = ref('');

const restaurants = ref<RestaurantItem[]>([]);
const querySearch = (queryString: string, cb: any) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value;
  // call callback function to return suggestions
  cb(results);
};
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ];
};

const handleSelect = (item: RestaurantItem) => {
  console.log(item);
};

onMounted(() => {
  restaurants.value = loadAll();
});
</script>

```

## 自定义模板

自定义建议的显示方式。

**Demo 示例**: `autocomplete/autocomplete-template`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/autocomplete.html)

```vue
<template>
  <e-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    popper-class="my-autocomplete"
    placeholder="Please input"
    @select="handleSelect"
  >
    <template #suffix>
      <e-icon class="e-input__icon" @click="handleIconClick">
        <edit />
      </e-icon>
    </template>
    <template #default="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </e-autocomplete>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Edit } from '@epoint-fe/eui-icons';

interface LinkItem {
  value: string;
  link: string;
}

const state = ref('');
const links = ref<LinkItem[]>([]);

const querySearch = (queryString: string, cb) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;
  // call callback function to return suggestion objects
  cb(results);
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ];
};
const handleSelect = (item: LinkItem) => {
  console.log(item);
};

const handleIconClick = (ev: Event) => {
  console.log(ev);
};

onMounted(() => {
  links.value = loadAll();
});
</script>

<style scoped>
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}
.my-autocomplete li .highlighted .addr {
  color: #ddd;
}
</style>

```

## 远程搜索

从服务器端检索数据。

**Demo 示例**: `autocomplete/remote-search`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/autocomplete.html)

```vue
<template>
  <e-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please input"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const state = ref('');

interface LinkItem {
  value: string;
  link: string;
}

const links = ref<LinkItem[]>([]);

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ];
};

let timeout: NodeJS.Timeout;
const querySearchAsync = (queryString: string, cb) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 3000 * Math.random());
};
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};

const handleSelect = (item: LinkItem) => {
  console.log(item);
};

onMounted(() => {
  links.value = loadAll();
});
</script>

```

## API

### Attributes

| Name                  | Description                                                                      | Type                                                                                     | Default      |
| --------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------ |
| model-value / v-model | 绑定值                                                                           | ^[string]                                                                                | —            |
| placeholder           | 自动完成输入框的占位符                                                           | ^[string]                                                                                | —            |
| clearable             | 是否显示清除按钮                                                                 | ^[boolean]                                                                               | false        |
| disabled              | 是否禁用自动完成                                                                 | ^[boolean]                                                                               | false        |
| value-key             | 用于显示输入建议对象的键名                                                       | ^[string]                                                                                | value        |
| debounce              | 输入时的去抖延迟，以毫秒为单位                                                   | ^[number]                                                                                | 300          |
| placement             | 弹出菜单的位置                                                                   | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'` | bottom-start |
| fetch-suggestions     | 获取输入建议的方法。当建议准备好时，调用 `callback(data: [])` 返回它们给自动完成 | ^[Function]`(queryString: string, callback: callbackfn) => void`                         | —            |
| trigger-on-focus      | 输入框获取焦点时是否显示建议                                                     | ^[boolean]                                                                               | true         |
| select-when-unmatched | 当没有自动完成匹配项时，是否在按回车键时触发 `select` 事件                       | ^[boolean]                                                                               | false        |
| name                  | 与原生输入框的 `name` 属性相同                                                   | ^[string]                                                                                | —            |
| label                 | 标签文本                                                                         | ^[string]                                                                                | —            |
| hide-loading          | 是否隐藏远程搜索中的加载图标                                                     | ^[boolean]                                                                               | false        |
| popper-class          | 自动完成下拉菜单的自定义类名                                                     | ^[string]                                                                                | —            |
| teleported            | 选择下拉菜单是否被传送到 `body` 中                                               | ^[boolean]                                                                               | true         |
| highlight-first-item  | 是否默认高亮显示远程搜索建议中的第一项                                           | ^[boolean]                                                                               | false        |
| fit-input-width       | 下拉菜单的宽度是否与输入框相同                                                   | ^[boolean]                                                                               | false        |

### Events

| Name   | Description                  | Type                                                  |
| ------ | ---------------------------- | ----------------------------------------------------- |
| select | 当选择建议时触发             | ^[Function]`(item: typeof modelValue \| any) => void` |
| change | 当输入值内部的图标更改时触发 | ^[Function]`(value: string \| number) => void`        |

### Slots

| Name    | Description                                 |
| ------- | ------------------------------------------- |
| default | 自定义输入建议的内容。作用域参数为 { item } |
| prefix  | 作为输入框前缀的内容                        |
| suffix  | 作为输入框后缀的内容                        |
| prepend | 输入框前的内容                              |
| append  | 输入框后的内容                              |

### Exposes

| Name             | Description        | Type                                      |
| ---------------- | ------------------ | ----------------------------------------- |
| activated        | 自动完成是否激活   | ^[object]`Ref<boolean>`                   |
| blur             | 模糊输入框元素     | ^[Function]`() => void`                   |
| close            | 收起建议列表       | ^[Function]`() => void`                   |
| focus            | 聚焦输入框元素     | ^[Function]`() => void`                   |
| handleSelect     | 当选择建议时触发   | ^[Function]`(item: any) => promise<void>` |
| handleKeyEnter   | 处理键盘回车事件   | ^[Function]`() => promise<void>`          |
| highlightedIndex | 当前高亮项目的索引 | ^[object]`Ref<number>`                    |
| highlight        | 高亮建议中的项目   | ^[Function]`(itemIndex: number) => void`  |
| inputRef         | e-input 组件实例   | ^[object]`Ref<EInputInstance>`            |
| loading          | 远程搜索加载指示器 | ^[object]`Ref<boolean>`                   |
| popperRef        | e-tooltip 组件实例 | ^[object]`Ref<ETooltipInstance>`          |
| suggestions      | 获取建议结果       | ^[object]`Ref<record<string, any>>`       |