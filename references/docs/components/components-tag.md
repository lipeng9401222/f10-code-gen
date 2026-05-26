---
title: Tag
originUrl: http://192.168.219.170/docs/vue/latest/component/component/tag.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/tag.html)

# Tag 标签

用于标记和选择。

## 基本用法

**Demo 示例**: `tag/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tag.html)

```vue
<template>
  <e-tag>Tag 1</e-tag>
  <e-tag class="ml-2" type="success">Tag 2</e-tag>
  <e-tag class="ml-2" type="info">Tag 3</e-tag>
  <e-tag class="ml-2" type="warning">Tag 4</e-tag>
  <e-tag class="ml-2" type="danger">Tag 5</e-tag>
</template>

```

## 可移除标签

**Demo 示例**: `tag/removable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tag.html)

```vue
<template>
  <e-tag v-for="tag in tags" :key="tag.name" class="mx-1" closable :type="tag.type">
    {{ tag.name }}
  </e-tag>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tags = ref([
  { name: 'Tag 1', type: '' },
  { name: 'Tag 2', type: 'success' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 4', type: 'warning' },
  { name: 'Tag 5', type: 'danger' },
]);
</script>

```

## 动态编辑

您可以使用 `close` 事件来动态添加和删除标签。

**Demo 示例**: `tag/editable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tag.html)

```vue
<template>
  <e-tag
    v-for="tag in dynamicTags"
    :key="tag"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </e-tag>
  <e-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <e-button v-else class="button-new-tag ml-1" size="small" @click="showInput"> + New Tag </e-button>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { EInput } from '@epoint-fe/eui-components';

const inputValue = ref('');
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof EInput>>();

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};
</script>

```

## 大小

除了默认大小，标签组件还提供了三种额外的大小供您在不同场景中选择。

**Demo 示例**: `tag/sizes`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tag.html)

```vue
<template>
  <e-row>
    <e-tag class="mx-1" size="large">Large</e-tag>
    <e-tag class="mx-1">Default</e-tag>
    <e-tag class="mx-1" size="small">Small</e-tag>
  </e-row>

  <e-row class="mt-4">
    <e-tag class="mx-1" size="large" closable>Large</e-tag>
    <e-tag class="mx-1" closable>Default</e-tag>
    <e-tag class="mx-1" size="small" closable>Small</e-tag>
  </e-row>
</template>

```

## 主题

标签提供了四种不同的主题：`dark`、`light`、`plain` 和 `soft`

**Demo 示例**: `tag/theme`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tag.html)

```vue
<template>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1 line-height-2">Dark</span>
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark">
      {{ item.label }}
    </e-tag>
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark" closable>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Light</span>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="light">
      {{ item.label }}
    </e-tag>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="light" closable>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Plain</span>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain">
      {{ item.label }}
    </e-tag>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain" closable>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Soft</span>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="soft">
      {{ item.label }}
    </e-tag>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="soft" closable>
      {{ item.label }}
    </e-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { TagProps } from '@epoint-fe/eui-components';

type Item = { type: TagProps['type']; label: string };

const items = ref<Array<Item>>([
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
]);
</script>

```

## 圆角

标签也可以像按钮一样具有圆角。

**Demo 示例**: `tag/rounded`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tag.html)

```vue
<template>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark" round>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="flex flex-wrap gap-2">
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="light" round>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="plain" round>
      {{ item.label }}
    </e-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { TagProps } from '@epoint-fe/eui-components';

type Item = { type: TagProps['type']; label: string };

const items = ref<Array<Item>>([
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
]);
</script>

```

## 图标标签

标签可以添加图标，使其更加醒目。

**Demo 示例**: `tag/icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tag.html)

```vue
<template>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag :icon="User">User</e-tag>
    <e-tag :icon="Star" type="success">Star</e-tag>
    <e-tag :icon="Message" type="info">Message</e-tag>
    <e-tag :icon="Warning" type="warning">Warning</e-tag>
    <e-tag :icon="Delete" type="danger">Delete</e-tag>
  </div>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag :icon="User" effect="dark">User</e-tag>
    <e-tag :icon="Star" type="success" effect="dark">Star</e-tag>
    <e-tag :icon="Message" type="info" effect="dark">Message</e-tag>
    <e-tag :icon="Warning" type="warning" effect="dark">Warning</e-tag>
    <e-tag :icon="Delete" type="danger" effect="dark">Delete</e-tag>
  </div>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag :icon="User" round>User</e-tag>
    <e-tag :icon="Star" type="success" round>Star</e-tag>
    <e-tag :icon="Message" type="info" round>Message</e-tag>
    <e-tag :icon="Warning" type="warning" round>Warning</e-tag>
    <e-tag :icon="Delete" type="danger" round>Delete</e-tag>
  </div>
</template>

<script lang="ts" setup>
import { Delete, Message, Star, User, Warning } from '@epoint-fe/eui-icons';
</script>

```

## 可选标签

有时因业务需求，我们可能需要类似于复选框的标签，但是**按钮式复选框**无法满足我们的需求，这时就有了 `check-tag`

**Demo 示例**: `tag/checkable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tag.html)

```vue
<template>
  <div>
    <e-check-tag checked style="margin-right: 8px">Checked</e-check-tag>
    <e-check-tag :checked="checked" @change="onChange">Toggle me</e-check-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(false);

const onChange = (status: boolean) => {
  checked.value = status;
};
</script>

```

## Tag API

### Tag Attributes

| 属性                | 描述                   | 类型                                                        | 默认值 |
| ------------------- | ---------------------- | ----------------------------------------------------------- | ------ |
| type                | 标签的类型             | ^[enum]`'success' \| 'info' \| 'warning' \| 'danger' \| ''` | ''     |
| closable            | 是否可以移除标签       | ^[boolean]                                                  | false  |
| disable-transitions | 是否禁用动画           | ^[boolean]                                                  | false  |
| hit                 | 标签是否具有突出的边框 | ^[boolean]                                                  | false  |
| color               | 标签的背景颜色         | ^[string]                                                   | ''     |
| size                | 标签的大小             | ^[enum]`'large' \| 'default' \| 'small' \| ''`              | ''     |
| effect              | 标签的主题             | ^[enum]`'dark' \| 'light' \| 'plain' \| 'soft'`             | light  |
| round               | 标签是否是圆角的       | ^[boolean]                                                  | false  |
| icon                | 图标组件               | ^[string] / ^[Component]                                    | —      |

### Tag Events

| 名称  | 描述           | 类型                                   |
| ----- | -------------- | -------------------------------------- |
| click | 点击标签时触发 | ^[Function]`(evt: MouseEvent) => void` |
| close | 移除标签时触发 | ^[Function]`(evt: MouseEvent) => void` |

### Tag Slots

| 名称 | 描述           |
| ---- | -------------- |
| —    | 自定义默认内容 |

## CheckTag API

### CheckTag Attributes

| 名称                      | 描述     | 类型       | 默认值 |
| ------------------------- | -------- | ---------- | ------ |
| checked / v-model:checked | 是否选中 | ^[boolean] | false  |
| disabled                  | 是否禁用 | ^[boolean] | false  |

### CheckTag Events

| 名称   | 描述                  | 类型                                  |
| ------ | --------------------- | ------------------------------------- |
| change | 点击 Check Tag 时触发 | ^[Function]`(value: boolean) => void` |

### CheckTag Slots

| 名称 | 描述           |
| ---- | -------------- |
| —    | 自定义默认内容 |