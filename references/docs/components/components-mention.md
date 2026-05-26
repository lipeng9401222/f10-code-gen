---
title: Mention 提及
originUrl: http://192.168.219.170/docs/vue/latest/component/component/mention.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/mention.html)

# Mention 提及

用于在输入中提及某人或某事。

## 基础用法

**Demo 示例**: `mention/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/mention.html)

```vue
<template>
  <div>
    <p>
      整个文本框的值： <span>{{ value }}</span>
    </p>
    <e-mention v-model="value" :options="options" style="width: 320px" placeholder="Please input" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('@');

const options = ref([
  {
    label: '张三',
    value: '张三',
  },
  {
    label: '李四',
    value: '张三',
  },
  {
    label: '王五',
    value: '张三',
  },
  {
    label: 'btea',
    value: 'btea',
  },
]);
</script>

```

## Textarea

**Demo 示例**: `mention/textarea`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/mention.html)

```vue
<template>
  <e-mention v-model="value" type="textarea" :options="options" style="width: 320px" placeholder="Please input" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');

const options = ref([
  {
    label: 'Fuphoenixes',
    value: 'Fuphoenixes',
  },
  {
    label: 'kooriookami',
    value: 'kooriookami',
  },
  {
    label: 'Jeremy',
    value: 'Jeremy',
  },
  {
    label: 'btea',
    value: 'btea',
  },
]);
</script>

```

## 自定义标签

**Demo 示例**: `mention/label`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/mention.html)

```vue
<template>
  <e-mention v-model="value" :options="options" style="width: 320px" placeholder="Please input">
    <template #label="{ item }">
      <div style="display: flex; align-items: center">
        <e-avatar :size="24" :src="item.avatar" />
        <span style="margin-left: 6px">{{ item.value }}</span>
      </div>
    </template>
  </e-mention>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');

const options = ref([
  {
    value: 'Fuphoenixes',
    avatar: 'https://avatars.githubusercontent.com/u/27912232',
  },
  {
    value: 'kooriookami',
    avatar: 'https://avatars.githubusercontent.com/u/38392315',
  },
  {
    value: 'Jeremy',
    avatar: 'https://avatars.githubusercontent.com/u/15975785',
  },
  {
    value: 'btea',
    avatar: 'https://avatars.githubusercontent.com/u/24516654',
  },
]);
</script>

```

## 加载远程选项

**Demo 示例**: `mention/remote`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/mention.html)

```vue
<template>
  <e-mention
    v-model="value"
    :options="options"
    :loading="loading"
    style="width: 320px"
    placeholder="Please input"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import type { MentionOption } from '@epoint-fe/eui-components';

const value = ref('');
const loading = ref(false);
const options = ref<MentionOption[]>([]);

let timer: ReturnType<typeof setTimeout>;
const handleSearch = (pattern: string) => {
  if (timer) clearTimeout(timer);

  loading.value = true;
  timer = setTimeout(() => {
    options.value = ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'].map((item) => ({
      label: pattern + item,
      value: pattern + item,
    }));
    loading.value = false;
  }, 1500);
};

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

```

## 自定义触发字段

**Demo 示例**: `mention/prefix`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/mention.html)

```vue
<template>
  <e-mention
    v-model="value"
    :options="options"
    :prefix="['@', '#']"
    style="width: 320px"
    placeholder="input @ to mention people, # to mention tag"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { MentionOption } from '@epoint-fe/eui-components';

const MOCK_DATA: Record<string, string[]> = {
  '@': ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'],
  '#': ['1.0', '2.0', '3.0'],
};
const value = ref('');
const options = ref<MentionOption[]>([]);

const handleSearch = (_: string, prefix: string) => {
  options.value = (MOCK_DATA[prefix] || []).map((value) => ({
    value,
  }));
};
</script>

```

## 整体删除

**Demo 示例**: `mention/whole`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/mention.html)

```vue
<template>
  <e-mention v-model="value1" whole :options="options1" style="width: 320px" placeholder="Please input" />
  <e-divider />
  <e-mention
    v-model="value2"
    :options="options2"
    :prefix="['@', '#']"
    whole
    :check-is-whole="checkIsWhole"
    style="width: 320px"
    placeholder="input @ to mention people, # to mention tag"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { MentionOption } from '@epoint-fe/eui-components';

const MOCK_DATA: Record<string, string[]> = {
  '@': ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'],
  '#': ['1.0', '2.0', '3.0'],
};
const value1 = ref('');
const value2 = ref('');
const options1 = ref<MentionOption[]>(MOCK_DATA['@'].map((value) => ({ value })));
const options2 = ref<MentionOption[]>([]);

const handleSearch = (_: string, prefix: string) => {
  options2.value = (MOCK_DATA[prefix] || []).map((value) => ({
    value,
  }));
};

const checkIsWhole = (pattern: string, prefix: string) => {
  return (MOCK_DATA[prefix] || []).includes(pattern);
};
</script>

```

## 在表单里使用

**Demo 示例**: `mention/form`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/mention.html)

```vue
<template>
  <e-form ref="ruleFormRef" style="max-width: 600px" label-width="120px" :model="ruleForm" :rules="rules">
    <e-form-item label="name" prop="name">
      <e-mention v-model="ruleForm.name" :options="options" />
    </e-form-item>
    <e-form-item label="desc" prop="desc">
      <e-mention v-model="ruleForm.desc" type="textarea" :options="options" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(ruleFormRef)"> Submit </e-button>
      <e-button @click="resetForm(ruleFormRef)">Reset</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@epoint-fe/eui-components';

interface RuleForm {
  name: string;
  desc: string;
}
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: '',
  desc: '',
});

const options = ref([
  {
    label: 'Fuphoenixes',
    value: 'Fuphoenixes',
  },
  {
    label: 'kooriookami',
    value: 'kooriookami',
  },
  {
    label: 'Jeremy',
    value: 'Jeremy',
  },
  {
    label: 'btea',
    value: 'btea',
  },
]);

const rules = reactive<FormRules>({
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  desc: [{ required: true, message: 'Please input desc', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

```

::: tip
由于这个组件是基于 `e-input` 派生的，他们的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

### Attributes

| Name                                 | Description                                                                            | Type                                                                         | Default    |
| ------------------------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------- |
| options                              | 提及选项列表                                                                   | ^[array]`MentionOption[]`                                                    | `[]`       |
| prefix                               | 触发字段的前缀。 字符串长度必须且只能为 1              | ^[string] \| ^[array]`string[]`                                              | `'@'`      |
| split                                | 用于拆分提及的字符。 字符串长度必须且只能为 1                       | ^[string]                                                                    | `' '`      |
| filter-option                        | 定制筛选器选项逻辑                                                          | ^[false] \| ^[Function]`(pattern: string, option: MentionOption) => boolean` | —          |
| placement                            | 设置弹出位置                                                                    | ^[string]`'bottom' \| 'top'`                                                 | `'bottom'` |
| show-arrow                           | 下拉菜单的内容是否有箭头                                                | ^[boolean]                                                                   | `false`    |
| offset                               | 下拉面板偏移量                                                           | ^[number]                                                                    | `0`        |
| whole                                | 当退格键被按下做删除操作时，是否将提及部分作为整体删除 | ^[boolean]                                                                   | `false`    |
| check-is-whole                       | 当退格键被按下做删除操作时，检查是否将提及部分作为整体删除                   | ^[Function]`(pattern: string, prefix: string) => boolean`                    | —          |
| loading                              | 提及的下拉面板是否处于加载状态                           | ^[boolean]                                                                   | `false`    |
| model-value / v-model                | 输入值                                                                            | ^[string]                                                                    | —          |
| popper-class                         | 自定义浮层类名                                                   | ^[string]                                                                    | —          |
| popper-options                       | [popper.js](https://popper.js.org/docs/v2/) 参数                                 | ^[object] refer to [popper.js doc](https://popper.js.org/docs/v2/)           | —          |
| [input props](http://192.168.219.170/docs/vue/latest/component/component/input.html#attributes) | —                                                                                      | —                                                                            | —          |

### Events

| Name                              | Description                         | Type                                                         |
| --------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| search                            | 按下触发字段时触发             | ^[Function]`(pattern: string, prefix: string) => void`       |
| select                            | 当用户选择选项时触发 | ^[Function]`(option: MentionOption, prefix: string) => void` |
| [input events](http://192.168.219.170/docs/vue/latest/component/component/input.html#events) | —                                   | —                                                            |

### Slots

| Name                            | Description                           | Type                                              |
| ------------------------------- | ------------------------------------- | ------------------------------------------------- |
| label                           | 自定义标签内容               | ^[object]`{ item: MentionOption, index: number }` |
| loading                         | 自定义 loading内容             | —                                                 |
| header                          | 下拉列表顶部的内容    | —                                                 |
| footer                          | 下拉列表底部的内容 | —                                                 |
| [input slots](http://192.168.219.170/docs/vue/latest/component/component/input.html#slots) | —                                     | —                                                 |

### Exposes

| Name                     | Description                   | Type                                    |
| ------------------------ | ----------------------------- | --------------------------------------- |
| input                    | e-input 组件实例   | ^[object]`Ref<InputInstance \| null>`   |
| tooltip                  | e-tooltip 组件实例 | ^[object]`Ref<TooltipInstance \| null>` |
| dropdownVisible | tooltip 显示状态        | ^[object]`ComputedRef<boolean>`         |

## Type Declarations

<details>
  <summary>查看类型定义</summary>

```ts
type MentionOption = {
  value: string;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
};
```

</details>