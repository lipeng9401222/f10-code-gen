---
title: InputI18n 多语言输入
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-input-i18n/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-input-i18n/)

此组件由 `@epframe/eui-core` 包提供。

带多语言弹窗的输入框组件。在普通输入框旁边提供一个按钮，点击后可以在弹窗中批量编辑多种语言的内容。自动继承表单的校验规则，支持简繁体互转（可自定义转换规则），能够对接后端接口读取和保存多语言数据。

## 基础使用

需要传三个必填参数标识业务数据：`target-guid`（主键）、`table-field`（字段名）、`identify`（业务标识）。

```vue
<template>
  <ep-input-i18n
    v-model="productName"
    target-guid="demo-product-001"
    table-field="productName"
    identify="product"
    placeholder="请输入产品名称"
    @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue';
import { EpInputI18n } from '@epframe/eui-core';

const productName = ref('手机');

function handleChange(newValue, oldValue) {
  console.log('值变化:', { newValue, oldValue });
}
</script>
```

## 表单集成

在表单中使用会自动继承校验规则。当前语言保持完整校验（包括必填），其他语言会移除必填但保留长度、格式等校验。

```vue
<template>
  <e-form :model="formData" :rules="rules" ref="formRef">
    <e-form-item label="文章标题" prop="title">
      <ep-input-i18n
        v-model="formData.title"
        target-guid="demo-article-001"
        table-field="title"
        identify="article"
        placeholder="请输入标题" />
    </e-form-item>

    <e-form-item label="文章描述" prop="description">
      <ep-input-i18n
        v-model="formData.description"
        target-guid="demo-article-001"
        table-field="description"
        identify="article"
        placeholder="请输入描述" />
    </e-form-item>

    <e-form-item>
      <e-button type="primary" @click="submitForm">提交</e-button>
      <e-button @click="resetForm" style="margin-left: 10px">重置</e-button>
    </e-form-item>
  </e-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';
import { EpInputI18n } from '@epframe/eui-core';

const formRef = ref();
const formData = reactive({
  title: '',
  description: '',
});

const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入描述', trigger: 'blur' },
    { max: 500, message: '最多 500 个字符', trigger: 'blur' },
  ],
};

const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      EMessage.success('表单验证通过！');
    }
  });
};

const resetForm = () => {
  formRef.value?.resetFields();
};
</script>
```

## 输入框配置

### 禁用主输入框

通过 `allow-input` 控制是否允许在主输入框编辑，设为 `false` 时只能通过弹窗维护。

```vue
<ep-input-i18n
  v-model="userName"
  target-guid="demo-user-001"
  table-field="userName"
  identify="user"
  :allow-input="false"
  placeholder="点击地球图标编辑" />
```

### 清空按钮和字数统计

通过 `clearable` 显示清空按钮，`show-word-limit` 和 `maxlength` 配合使用显示字数统计。

```vue
<ep-input-i18n
  v-model="description"
  target-guid="demo-001"
  table-field="description"
  identify="product"
  clearable
  show-word-limit
  maxlength="100"
  placeholder="请输入产品描述" />
```

## 自定义转换规则

通过 `transform-config` 配置转换规则，支持同步和异步函数。

```vue
<template>
  <ep-input-i18n
    v-model="title"
    target-guid="demo-transform-001"
    table-field="title"
    identify="transform"
    :transform-config="transformConfig"
    placeholder="请输入标题" />
</template>

<script setup>
import { ref } from 'vue';
import { EpInputI18n } from '@epframe/eui-core';

const title = ref('');
const { cn2tw, cn2hk } = EpInputI18n.buildInConverters;

const transformConfig = [
  {
    from: 'zh_CN',
    to: 'zh_TW',
    transform: cn2tw,
    override: false, // 不覆盖已有内容
  },
  {
    from: 'zh_CN',
    to: 'zh_HK',
    transform: cn2hk,
    override: true,
  },
];
</script>
```

## 使用内置转换器

组件默认启用简繁转换，基于 `opencc-js` 实现，按需加载。

```ts
import { EpInputI18n } from '@epframe/eui-core';

const { cn2tw, cn2hk } = EpInputI18n.buildInConverters;

const customRules = [
  { from: 'zh_CN', to: 'zh_TW', transform: cn2tw, override: false },
  { from: 'zh_CN', to: 'zh_HK', transform: cn2hk, override: true },
];
```

内置转换器：

- `cn2tw` - 简体 → 台湾繁体
- `cn2hk` - 简体 → 香港繁体

默认不覆盖已有内容，可通过 `override` 调整。

## 引用翻译

通过 `referenceable` 属性开启引用翻译功能。

```vue
<template>
  <ep-input-i18n
    v-model="productName"
    target-guid="demo-product-001"
    table-field="productName"
    identify="product"
    placeholder="请输入产品名称"
    referenceable
    reference-key="product.title"
    @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue';
import { EpInputI18n } from '@epframe/eui-core';

const productName = ref('手机');

function handleChange(newValue, oldValue) {
  console.log('值变化:', { newValue, oldValue });
}
</script>
```

## 方法调用

组件暴露 `save` 方法用于手动保存（一般用不到，弹窗确认时会自动保存）。

```vue
<template>
  <div>
    <ep-input-i18n
      ref="inputI18nRef"
      v-model="title"
      target-guid="demo-methods-001"
      table-field="title"
      identify="methods"
      placeholder="请输入标题" />
    <e-button type="primary" @click="handleSave">手动保存</e-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';
import { EpInputI18n } from '@epframe/eui-core';

const title = ref('示例标题');
const inputI18nRef = ref();

const handleSave = async () => {
  try {
    await inputI18nRef.value?.save();
    EMessage.success('保存成功');
  } catch (error) {
    EMessage.error('保存失败');
  }
};
</script>
```

## 接口约定

### 读取接口

**默认地址：** `multilang/getLanguageData`

**请求参数：**

```ts
{
  targetguid: string; // 业务对象主键
  tablefield: string; // 字段名
  identify: string; // 业务标识
  key?: string; // 引用字段值
}
```

**响应格式：**

```ts
{
  zh_CN: "手机",
  en_US: "Mobile Phone",
  zh_TW: "手機",
  zh_HK: "手機"
}
```

### 保存接口

**默认地址：** `multilang/save`

**请求参数：**

```ts
{
  targetguid: string; // 业务对象主键
  tablefield: string; // 字段名
  identify: string; // 业务标识
  data: string; // JSON.stringify(LanguageDataMap)
}
```

### 获取翻译引用数据列表

**默认地址：** `multilang/searchData`

**请求参数：**

```ts
{
  key: string; // 搜索关键字
  identify: string; // 业务标识
}
```

**响应格式：**

```ts
[{
  key: "abcd",
  text: "某某字段"
},{
  key: "ab.xyz",
  text: "某某某字段"
}]
```

### 一键翻译接口

**默认地址：** `multilang/autoTranslate`

**请求参数：**

```ts
{
  zh_CN: "手机"
}
```

**响应格式：**

```ts
{
  zh_CN: "手机",
  en_US: "Mobile Phone",
  zh_TW: "手機",
  zh_HK: "手機"
}
```

### 系统参数

组件会读取这些系统参数（通过 `getFrameSysParam`）：

- `epoint_local` - 当前语言（如 `zh_CN`）
- `languages` - 启用的语言列表，格式：`zh_CN,中文;en_US,English;zh_TW,繁体中文`

## API

### 属性

### Props

| 名称            | 类型                    | 必填 | 默认值                                                        | 说明                                                          |
| --------------- | ----------------------- | ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| targetGuid      | string                  | 是   | -                                                             | 业务对象主键，用于读写接口标识                                |
| tableField      | string                  | 是   | -                                                             | 字段名，用于读写接口标识                                      |
| identify        | string                  | 是   | -                                                             | 业务标识，用于日志/接口区分                                   |
| type            | string                  | 否   | `'text'`                                                      | 输入类型，可选 `'text'` 或 `'richText'`                       |
| getUrl          | string                  | 否   | `multilang/getLanguageData`                                   | 读取多语言数据接口地址                                        |
| saveUrl         | string                  | 否   | `multilang/save`                                              | 保存多语言数据接口地址                                        |
| getTranslationDataUrl | string            | 否   | `multilang/searchData`                                        | 获取翻译引用数据接口地址                                      |
| autoTranslateUrl | string               | 否   | `multilang/autoTranslate`                                     | 一键翻译接口地址                                              |
| allowInput      | boolean                 | 否   | `true`                                                        | 当为 `false` 且存在多语言配置时，禁用主输入框，仅通过弹窗维护 |
| clearable       | boolean                 | 否   | `false`                                                       | 是否显示清空按钮                                              |
| showWordLimit   | boolean                 | 否   | `false`                                                       | 是否显示字数统计                                              |
| referenceKey    | string                  | 否   | `''`                                                          | 翻译引用键值                                                  |
| referenceable   | boolean                 | 否   | `false`                                                       | 是否启用翻译引用功能                                          |
| dialogOptions   | DialogOptions | 否   | `{ width: '50%', height: '', top: '15vh' }`                   | 透传给 `e-dialog` 的参数                                      |
| formOptions     | FormOptions   | 否   | `{ labelPosition: 'right', labelWidth: 120, bordered: true }` | 透传给 `e-form` 的参数                                        |
| transformConfig | TransformItem[]         | 否   | 见下文                                                        | 自动转换规则列表，默认包含 `zh_CN → zh_TW` 与 `zh_CN → zh_HK` |

**DialogOptions 默认值：**

```ts
{
  width: '50%',
  height: '',
  top: '15vh'
}
```

**FormOptions 默认值：**

```ts
{
  labelPosition: 'right',
  labelWidth: 120,
  bordered: true
}
```

这些选项会透传给 `e-dialog` 和 `e-form` 组件。

### TransformItem 类型

| 字段      | 说明                 | 类型                                                     | 默认值  |
| --------- | -------------------- | -------------------------------------------------------- | ------- |
| from      | 源语言（如 `zh_CN`） | `string`                                                 | —       |
| to        | 目标语言             | `string`                                                 | —       |
| transform | 转换函数             | ^[Function]`(text: string) => string \| Promise<string>` | —       |
| override  | 是否覆盖已有内容     | `boolean`                                                | `false` |

转换在输入框失焦时触发。

### 事件

| 名称              | 描述                             | 类型                                                       |
| ----------------- | -------------------------------- | ---------------------------------------------------------- |
| change            | 主输入框或弹窗保存后值变化时触发 | ^[Function]`(newValue: string, oldValue?: string) => void` |
| update:modelValue | v-model 更新                     | ^[Function]`(value: string) => void`                       |

### 方法

| 名称 | 描述         | 类型                  |
| ---- | ------------ | --------------------- |
| save | 手动保存数据 | `() => Promise<void>` |

## 技术原理

### 数据流转

组件采用"主输入框 + 弹窗批量编辑"的模式。

**初始化**

组件挂载后读取系统参数获取当前语言和已启用的语言列表。点击地球图标时打开弹窗并请求接口，拿到所有语言的数据后为每种语言生成一个输入框。

**编辑与转换**

在弹窗中编辑某个语言后，失焦时会触发转换。组件遍历 `transform-config`，找到对应的转换规则，调用转换函数并填充到目标语言。如果目标语言已有内容且 `override` 为 `false`，会跳过转换。

**校验继承**

弹窗中的表单会继承父级的校验规则。组件识别当前语言后，保持该语言的完整校验（包括必填），其他语言自动移除必填但保留长度、格式等校验。

**保存同步**

点击弹窗确认后，组件将数据序列化成 JSON 提交到保存接口。保存成功后，如果当前语言的值变了，会更新主输入框并触发 `change` 事件。直接在主输入框编辑不会立即保存，要等下次打开弹窗确认时才同步到后端。

### 设计要点

- 弹窗打开时才加载数据，不是每次渲染都请求
- 转换在失焦时触发，避免输入时频繁执行
- 当前语言必填，其他语言选填，降低录入门槛
- 通过 `v-bind="$attrs"` 透传属性给内部 `e-input`

## 常见问题

### 为什么其他语言不是必填？

让用户可以先填主语言，后面再逐步补充翻译，不用一次性填完所有语言。其他语言还是会校验长度和格式。

### change 事件什么时候触发？

两种情况：1）主输入框值变化；2）弹窗保存后当前语言的值变了。

### 怎么控制显示哪些语言？

组件会读系统参数 `epoint_local`（当前语言）和 `languages`（语言列表）。列表格式：`zh_CN,中文;en_US,English;zh_TW,繁体中文`

### 转换不生效？

检查一下：

1. `from` 和 `to` 的语言 key 是否和系统配置一致
2. 是否已经失焦（转换只在 blur 时触发）
3. 目标语言有内容且 `override: false` 时不会覆盖
4. 控制台有没有报错

### 禁用简繁转换

传空数组：

```vue
<ep-input-i18n
  v-model="title"
  target-guid="123"
  table-field="title"
  identify="article"
  :transform-config="[]" />
```

### 支持哪些 Input 属性？

组件会透传属性给内部的 `e-input`，比如 `placeholder`、`maxlength`、`type`、`disabled`、`readonly`、`size` 等。

```vue
<ep-input-i18n
  v-model="content"
  target-guid="123"
  table-field="content"
  identify="article"
  type="textarea"
  :rows="4"
  maxlength="500"
  show-word-limit
  placeholder="请输入内容" />
```