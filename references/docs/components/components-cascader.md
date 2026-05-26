---
title: Cascader
originUrl: http://192.168.219.170/docs/vue/latest/component/component/cascader.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

# Cascader 级联选择器

如果选项具有明确的层次结构，可以使用级联选择器来查看和选择它们。

> **💡 提示**
>
> 在 SSR（例如：[Nuxt](https://nuxt.com/v3)）和 SSG（例如：[VitePress](https://vitepress.vuejs.org/)）中使用此组件时，需要使用 `<client-only></client-only>` 包装。

## 基本用法

展开子选项的方式有两种。

**Demo 示例**: `cascader/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <div class="m-4">
    <p>Child options expand when clicked (default)</p>
    <e-cascader v-model="value" :options="options" @change="handleChange" />
  </div>
  <div class="m-4">
    <p>Child options expand when hovered</p>
    <e-cascader v-model="value" :options="options" :props="props" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref([]);

const props = {
  expandTrigger: 'hover' as const,
};

const handleChange = (value) => {
  console.log(value);
};

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
];
</script>

```

## 禁用选项

通过在选项对象中设置 `disabled` 字段来禁用选项。

**Demo 示例**: `cascader/option-disabling`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <e-cascader v-model="value" :options="options" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref([]);
const options = [
  {
    value: 'guide',
    label: 'Guide',
    disabled: true,
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
];
</script>

```

## 可清除

当选中并悬停时，将显示清除图标。

**Demo 示例**: `cascader/clearable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <e-cascader v-model="value" :options="options" clearable />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref([]);
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
];
</script>

```

## 仅显示最后一级

输入框可以只显示最后一级而不是所有级别。

**Demo 示例**: `cascader/last-level`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <e-cascader v-model="value" :options="options" :show-all-levels="false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref([]);
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
];
</script>

```

## 多选

在标签中添加 :props="props" 并设置数据 props = { multiple: true } 以使用多选功能。

示例：

```html
<template>
  <e-cascader :props="props" />
</template>
<script lang="ts">
  export default {
    setup() {
      return {
        props: {
          // props.
          multiple: true,
        },
      };
    },
  };
</script>
```

不要这样做：

```html
<template>
  <!-- 级联选择器的对象字面量绑定是无效的语法 -->
  <e-cascader :props="{ multiple: true }" />
</template>
```

**Demo 示例**: `cascader/multiple-selection`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <div class="m-4">
    <p>Display all tags (default)</p>
    <e-cascader :options="options" :props="props" clearable />
  </div>
  <div class="m-4">
    <p>Collapse tags</p>
    <e-cascader :options="options" :props="props" collapse-tags clearable />
  </div>
  <div class="m-4">
    <p>Collapse tags tooltip</p>
    <e-cascader :options="options" :props="props" collapse-tags collapse-tags-tooltip clearable />
  </div>
</template>

<script lang="ts" setup>
const props = { multiple: true };

const options = [
  {
    value: 1,
    label: 'Asia',
    children: [
      {
        value: 2,
        label: 'China',
        children: [
          { value: 3, label: 'Beijing' },
          { value: 4, label: 'Shanghai' },
          { value: 5, label: 'Hangzhou' },
        ],
      },
      {
        value: 6,
        label: 'Japan',
        children: [
          { value: 7, label: 'Tokyo' },
          { value: 8, label: 'Osaka' },
          { value: 9, label: 'Kyoto' },
        ],
      },
      {
        value: 10,
        label: 'Korea',
        children: [
          { value: 11, label: 'Seoul' },
          { value: 12, label: 'Busan' },
          { value: 13, label: 'Taegu' },
        ],
      },
    ],
  },
  {
    value: 14,
    label: 'Europe',
    children: [
      {
        value: 15,
        label: 'France',
        children: [
          { value: 16, label: 'Paris' },
          { value: 17, label: 'Marseille' },
          { value: 18, label: 'Lyon' },
        ],
      },
      {
        value: 19,
        label: 'UK',
        children: [
          { value: 20, label: 'London' },
          { value: 21, label: 'Birmingham' },
          { value: 22, label: 'Manchester' },
        ],
      },
    ],
  },
  {
    value: 23,
    label: 'North America',
    children: [
      {
        value: 24,
        label: 'US',
        children: [
          { value: 25, label: 'New York' },
          { value: 26, label: 'Los Angeles' },
          { value: 27, label: 'Washington' },
        ],
      },
      {
        value: 28,
        label: 'Canada',
        children: [
          { value: 29, label: 'Toronto' },
          { value: 30, label: 'Montreal' },
          { value: 31, label: 'Ottawa' },
        ],
      },
    ],
  },
];
</script>

```

## 选择任意级别的选项

在单选模式下，只能选中叶子节点，而在多选模式下，选中父节点将导致最终选中叶子节点。启用此功能后，可以使父节点和子节点不关联，并可以选择任意级别的选项。

**Demo 示例**: `cascader/any-level`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <div class="m-4">
    <p>Select any level of options (Single selection)</p>
    <e-cascader :options="options" :props="props1" clearable />
  </div>
  <div class="m-4">
    <p>Select any level of options (Multiple selection)</p>
    <e-cascader :options="options" :props="props2" clearable />
  </div>
</template>

<script lang="ts" setup>
const props1 = {
  checkStrictly: true,
};

const props2 = {
  multiple: true,
  checkStrictly: true,
};

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
];
</script>

```

## 动态加载

当选中一个节点时，动态加载其子节点。

**Demo 示例**: `cascader/dynamic-loading`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <e-cascader v-model="value" :props="props" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { CascaderProps } from '@epoint-fe/eui-components';
const value = ref([]);
let id = 0;
const props: CascaderProps = {
  lazy: true,
  loadMore(node, resolve) {
    const { level } = node;
    setTimeout(() => {
      const nodes = Array.from({ length: level + 1 }).map((item, i) => ({
        value: ++id,
        label: `Option - ${level} - ${i + 1}`,
        isLeaf: level >= 2,
      }));
      // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
      resolve(nodes);
    }, 1000);
  },
};
</script>

```

## 可过滤

使用关键词搜索并选择选项。

**Demo 示例**: `cascader/filterable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <div class="m-4">
    <p>本地过滤（单选）</p>
    <e-cascader v-model="value1" placeholder="尝试搜索：指南" :options="options" filterable />
  </div>
  <div class="m-4">
    <p>本地过滤（多选）</p>
    <e-cascader v-model="value2" placeholder="尝试搜索：指南" :options="options" :props="multipleProps" filterable />
  </div>
  <div class="m-4">
    <p>远程搜索（单选）</p>
    <e-cascader
      v-model="value3"
      placeholder="输入关键词进行远程搜索"
      :options="remoteOptions"
      filterable
      :filter-method="remoteFilter"
    />
  </div>
  <div class="m-4">
    <p>远程搜索（多选）</p>
    <e-cascader
      v-model="value4"
      placeholder="输入关键词进行远程搜索"
      :options="remoteOptions"
      :props="multipleProps"
      filterable
      :filter-method="remoteFilter"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 单选
const value1 = ref('yizhi');
const value2 = ref();
const value3 = ref();
const value4 = ref();

// 多选配置
const multipleProps = {
  multiple: true,
};

const options = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          { value: 'yizhi', label: '一致' },
          { value: 'fankui', label: '反馈' },
          { value: 'xiaolv', label: '效率' },
          { value: 'kekong', label: '可控' },
        ],
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          { value: 'cexiang', label: '侧向导航' },
          { value: 'dingbu', label: '顶部导航' },
        ],
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: '基础组件',
        children: [
          { value: 'button', label: '按钮' },
          { value: 'icon', label: '图标' },
        ],
      },
      {
        value: 'form',
        label: '表单组件',
        children: [
          { value: 'input', label: '输入框' },
          { value: 'select', label: '选择器' },
          { value: 'cascader', label: '级联选择器' },
        ],
      },
    ],
  },
  {
    value: 'ziyuan',
    label: '资源',
    children: [
      { value: 'axure', label: 'Axure 组件' },
      { value: 'sketch', label: 'Sketch 模板' },
    ],
  },
];

// 远程搜索数据
const remoteOptions = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          { value: 'datunlu', label: '大屯路' },
          { value: 'sanyuanqiao', label: '三元桥' },
        ],
      },
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          { value: 'zhongguancun', label: '中关村' },
          { value: 'wudaokou', label: '五道口' },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [{ value: 'nanjinglu', label: '南京路' }],
      },
      {
        value: 'pudong',
        label: '浦东新区',
        children: [{ value: 'lujiazui', label: '陆家嘴' }],
      },
    ],
  },
];

// 远程搜索方法
const remoteFilter = (keyword: string) => {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      if (!keyword) {
        resolve(remoteOptions);
        return;
      }

      // 模拟远程搜索，返回匹配的结果
      const results = [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'chaoyang',
              label: `朝阳区 - ${keyword}`,
              children: [
                { value: 'datunlu', label: `${keyword} - 大屯路` },
                { value: 'datunlu2', label: `${keyword} - 大屯路2` },
                { value: 'datunlu3', label: `${keyword} - 大屯路3` },
              ],
            },
          ],
        },
        {
          value: 'shanghai',
          label: '上海',
          children: [
            { value: 'pudong', label: `浦东新区 - ${keyword}` },
            { value: 'pudong2', label: `浦东新区2 - ${keyword}` },
          ],
        },
      ];

      resolve(results);
    }, 500);
  });
};
</script>

```

## 自定义选项内容

您可以自定义级联选择器节点的内容。

**Demo 示例**: `cascader/custom-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <e-cascader :options="options">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
    </template>
  </e-cascader>
</template>

<script lang="ts" setup>
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
];
</script>

```

## 级联选择器面板

`CascaderPanel` 是 `Cascader` 的核心组件，具有各种功能，例如单选、多选、动态加载等。

**Demo 示例**: `cascader/panel`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/cascader.html)

```vue
<template>
  <e-cascader-panel :options="options" />
</template>

<script lang="ts" setup>
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
];
</script>

```

## Cascader API

### Cascader Attributes

| Name                                | Description                                                  | Type                                                         | Default |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------ |
| model-value / v-model               | 绑定值                                                       | ^[字符串]/^[数字]/^[object]`string[] \| number[] \| any`     | —      |
| text / v-model:text                 | 绑定的文本值             | ^[string] / ^[array]`string \| string[]`                     | —      |
| options                             | 选项数据，`value` 和 `label` 的键可以通过 `CascaderProps` 进行自定义。 | ^[object]`Record<string, unknown>[]`                         | —      |
| props                               | 配置选项，参见下面的 `CascaderProps` 表格。                  | ^[object]`CascaderProps`                                     | —      |
| size                                | 输入框的尺寸                                                 | ^[枚举]`'large' \| 'default' \| 'small'`                     | —      |
| placeholder                         | 输入框的占位符                                               | ^[字符串]                                                    | —      |
| disabled                            | 是否禁用级联选择器                                           | ^[布尔值]                                                    | —      |
| clearable                           | 是否可以清除已选择的值                                       | ^[布尔值]                                                    | —      |
| show-all-levels                     | 是否在输入框中显示所选值的所有级别                           | ^[布尔值]                                                    | true   |
| collapse-tags                       | 是否在多选模式下折叠标签                                     | ^[布尔值]                                                    | —      |
| collapse-tags-tooltip               | 是否在鼠标悬停在折叠标签文本时显示所有已选择的标签。要使用此选项，`collapse-tags` 必须设置为 true | ^[布尔值]                                                    | false  |
| separator                           | 选项标签分隔符                                               | ^[字符串]                                                    | ' / '  |
| filterable                          | 是否可以搜索选项                                             | ^[布尔值]                                                    | —      |
| filter-method                       | 自定义搜索方法，用于远程搜索。接收搜索关键词，返回选项数组。如果不提供，将使用内置的本地过滤逻辑。 | ^[Function]`(keyword: string) => Promise<CascaderOption[]>` | —      |
| debounce                            | 输入筛选关键词时的防抖延迟，以毫秒为单位                     | ^[数字]                                                      | 300    |
| before-filter                       | 过滤前的钩子函数，以待过滤的值作为其参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则将中止过滤操作 | ^[Function]`(value: string) => boolean`                      | —      |
| popper-class                        | 级联选择器下拉框的自定义类名                                 | ^[字符串]                                                    | ''     |
| teleported                          | 级联选择器弹出框是否进行传送                                 | ^[布尔值]                                                    | true   |
| popper-append-to-body ^(不推荐使用) | 是否将弹出菜单追加到 body 元素中。如果弹出框的定位不正确，可以尝试将此属性设置为 false | ^[布尔值]                                                    | true   |
| tag-type                            | 标签类型                                                     | ^[枚举]`'success' \| 'info' \| 'warning' \| 'danger'`        | info   |
| validate-event                      | 是否触发表单验证                                             | ^[布尔值]                                                    | true   |

### Cascader Events

| Name           | Description                       | Type                                                        |
| -------------- | -------------------------- | ----------------------------------------------------------- |
| change         | 当绑定值变化时触发         | ^[Function]`(value: CascaderValue) => void`                 |
| expand-change  | 当展开选项变化时触发       | ^[Function]`(value: CascaderValue) => void`                 |
| blur           | 当级联选择器失焦时触发     | ^[Function]`(event: FocusEvent) => void`                    |
| focus          | 当级联选择器获得焦点时触发 | ^[Function]`(event: FocusEvent) => void`                    |
| visible-change | 当下拉框显示/隐藏时触发    | ^[Function]`(value: boolean) => void`                       |
| remove-tag     | 在多选模式下移除标签时触发 | ^[Function]`(value: CascaderNode['valueByOption']) => void` |

### Cascader Slots

| Name    | Description                                                           | Scope                              |
| ------- | -------------------------------------------------------------- | ----------------------------------- |
| default | 级联选择器节点的自定义内容，分别是当前的 Node 对象和节点数据。 | ^[object]`{ node: any, data: any }` |
| empty   | 当没有匹配选项时的内容。                                       | —                                   |

### Cascader Exposes

| Name                | Description                                                                  | Type                                                            |
| ------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------- |
| getCheckedNodes     | 获取当前选定节点的数组，(leafOnly) 是否只返回叶子节点，默认为 `false` | ^[Function]`(leafOnly: boolean) => CascaderNode[] \| undefined` |
| cascaderPanelRef    | 级联选择器面板的引用                                                  | ^[object]`ComputedRef<any>`                                     |
| togglePopperVisible | 切换弹出框的可见类型                                                  | ^[Function]`(visible?: boolean) => void`                        |
| contentRef          | 级联选择器内容的引用                                                  | ^[object]`ComputedRef<any>`                                     |
| clearCheckedNodes | 清除选定节点                                                               | ^[Function]`() => void`                                         |

## CascaderPanel API

### CascaderPanel Attributes

| Name                  | Description                                                             | Type                                                       | Default |
| --------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| model-value / v-model | 绑定值                                                           | ^[string]/^[number]/^[object]`string[] \| number[] \| any` | —      |
| options               | 选项数据，`value` 和 `label` 的键可以由 `CascaderProps` 自定义。 | ^[object]`Record<string, unknown>[]`                       | —      |
| props                 | 配置选项，参见下面的 `CascaderProps` 表格。                      | ^[object]`CascaderProps`                                   | —      |

### CascaderPanel 事件

| Name          | Description                                               | Type                                                |
| ------------- | -------------------------------------------------- | --------------------------------------------------- |
| change        | 绑定值更改时触发                                   | ^[Function]`(value: CascaderValue) => void`         |
| expand-change | 展开选项更改时触发                                 | ^[Function]`(value: CascaderNodePathValue) => void` |
| close         | 关闭面板事件，提供给 Cascader 以判断是否收起面板。 | ^[Function]`() => void`                             |

### CascaderPanel 插槽

| Name    | Description                                                                  | Scope                              |
| ------- | --------------------------------------------------------------------- | ----------------------------------- |
| default | 级联节点的自定义内容，当前节点对象和节点数据分别为 `node` 和 `data`。 | ^[object]`{ node: any, data: any }` |

### CascaderPanel Exposes

| Name              | Description                                                                       | Type                                                            |
| ----------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| getCheckedNodes   | 获取当前选定节点的数组，（leafOnly）是否只返回叶子选定节点，默认为 `false` | ^[Function]`(leafOnly: boolean) => CascaderNode[] \| undefined` |
| clearCheckedNodes | 清除选定节点                                                               | ^[Function]`() => void`                                         |

## CascaderProps

| 属性           | Description                                                                     | Type                                                | Default   |
| -------------- | ------------------------------------------------------------------------ | --------------------------------------------------- | -------- |
| expandTrigger  | 展开选项的触发模式                                                       | ^[enum]`'click' \| 'hover'`                         | click    |
| multiple       | 是否启用多选                                                             | ^[boolean]                                          | false    |
| checkStrictly  | 选定节点的状态是否不影响其父节点和子节点的状态                           | ^[boolean]                                          | false    |
| emitPath       | 当选定节点改变时，是否要发射节点路径的数组，如果为 false，只发射节点的值。仅在单选模式下生效，多选模式始终返回叶子节点值 | ^[boolean]                                          | true     |
| lazy           | 是否动态加载子节点，与 `loadMore` 属性一起使用                           | ^[boolean]                                          | false    |
| loadMore       | 用于加载子节点数据的方法，仅在 `lazy` 为 true 时生效                     | ^[Function]`((node: Node, resolve: Resolve) => void) \| ((node: Node) => Promise<CascaderOption[]>)` | —        |
| value          | 指定节点对象中用作节点值的键                                             | ^[string]                                           | value    |
| label          | 指定节点对象中用作节点标签的键                                           | ^[string]                                           | label    |
| children       | 指定节点对象中用作节点子节点的键                                         | ^[string]                                           | children |
| disabled       | 指定节点对象中用作节点禁用状态的键                                       | ^[string]                                           | disabled |
| leaf           | 指定节点对象中用作节点叶子节点字段的键                                   | ^[string]                                           | isLeaf     |
| hoverThreshold | 展开选项的悬停阈值                                                       | ^[number]                                           | 500      |

## Type Declarations

<details>
  <summary>Show declarations</summary>

```ts
type CascaderNodeValue = string | number;
type CascaderNodePathValue = CascaderNodeValue[];
type CascaderValue =
  | CascaderNodeValue
  | CascaderNodePathValue
  | (CascaderNodeValue | CascaderNodePathValue)[];

type Resolve = (data: any) => void;

type ExpandTrigger = 'click' | 'hover';

type LazyLoad = (node: Node, resolve: Resolve) => void;

type LoadMore = LazyLoad | ((node: Node) => Promise<CascaderOption[]>);

type isDisabled = (data: CascaderOption, node: Node) => boolean;

type isLeaf = (data: CascaderOption, node: Node) => boolean;

interface CascaderOption extends Record<string, unknown> {
  label?: string;
  value?: CascaderNodeValue;
  children?: CascaderOption[];
  disabled?: boolean;
  leaf?: boolean;
}

interface CascaderProps {
  expandTrigger?: ExpandTrigger;
  multiple?: boolean;
  checkStrictly?: boolean;
  emitPath?: boolean;
  lazy?: boolean;
  loadMore?: LoadMore;
  value?: string;
  label?: string;
  children?: string;
  disabled?: string | isDisabled;
  leaf?: string | isLeaf;
  hoverThreshold?: number;
}

class Node {
  readonly uid: number;
  readonly level: number;
  readonly value: CascaderNodeValue;
  readonly label: string;
  readonly pathNodes: Node[];
  readonly pathValues: CascaderNodePathValue;
  readonly pathLabels: string[];

  childrenData: ChildrenData;
  children: Node[];
  text: string;
  loaded: boolean;
  /**
   * Is it checked
   *
   * @default false
   */
  checked: boolean;
  /**
   * Used to indicate the intermediate state of unchecked and fully checked child nodes
   *
   * @default false
   */
  indeterminate: boolean;
  /**
   * Loading Status
   *
   * @default false
   */
  loading: boolean;

  // getter
  isDisabled: boolean;
  isLeaf: boolean;
  valueByOption: CascaderNodeValue | CascaderNodePathValue;

  // method
  appendChild(childData: CascaderOption): Node;
  calcText(allLevels: boolean, separator: string): string;
  broadcast(event: string, ...args: unknown[]): void;
  emit(event: string, ...args: unknown[]): void;
  onParentCheck(checked: boolean): void;
  onChildCheck(): void;
  setCheckState(checked: boolean): void;
  doCheck(checked: boolean): void;
}

Node as CascaderNode;
```

</details>