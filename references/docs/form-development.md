# 表单开发规范

> epoint Vue 表单开发规范，所有前端开发**必须遵守**。
>
> 详细文档： [components/components-form.md](components/components-form.md)

---

## 1. 快速开始

### 1.1 标准表单模板

```vue
<template>
    <e-form ref="formRef" :model="formState" :rules="rules" label-width="120px">
        <e-form-item label="字段名" prop="fieldName">
            <e-input v-model="formState.fieldName" placeholder="请输入" />
        </e-form-item>

        <e-form-item>
            <e-button type="primary" @click="onSubmit">提交</e-button>
            <e-button @click="onReset">重置</e-button>
        </e-form-item>
    </e-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@epoint-fe/eui-components';

const formRef = ref<FormInstance>();

const formState = reactive({
    fieldName: ''
});

const rules = reactive<FormRules>({
    fieldName: [{ required: true, message: '请输入字段名', trigger: 'blur' }]
});

const onSubmit = async () => {
    const valid = await formRef.value?.validate();
    if (valid) {
        // 提交逻辑
    }
};

const onReset = () => {
    formRef.value?.resetFields();
};
</script>
```

### 1.2 表单布局

| 属性             | 值                            | 说明         |
| ---------------- | ----------------------------- | ------------ |
| `label-position` | `left` / `right` / `top`      | 标签对齐方式 |
| `label-width`    | 如 `120px`                    | 标签宽度     |
| `inline`         | `true`                        | 行内表单     |
| `size`           | `large` / `default` / `small` | 表单尺寸     |
| `bordered`       | `true`                        | 是否显示边框 |

### 1.3 行内表单

```vue
<e-form :inline="true" :model="formInline">
    <e-form-item label="审批人">
        <e-input v-model="formInline.user" placeholder="审批人" />
    </e-form-item>
    <e-form-item label="活动区域">
        <e-select v-model="formInline.region" placeholder="选择活动区域">
            <e-option label="区域一" value="shanghai" />
            <e-option label="区域二" value="beijing" />
        </e-select>
    </e-form-item>
    <e-form-item>
        <e-button type="primary" @click="onSubmit">查询</e-button>
    </e-form-item>
</e-form>
```

---

## 2. 验证与绑定

### 2.1 验证规则配置

```ts
const rules = reactive<FormRules>({
    // 必填验证
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],

    // 选择框必填
    region: [{ required: true, message: '请选择区域', trigger: 'change' }],

    // 长度验证
    description: [
        { required: true, message: '请输入描述', trigger: 'blur' },
        { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
    ],

    // 类型验证
    email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],

    // 数字范围
    age: [{ type: 'number', min: 18, max: 100, message: '年龄必须在 18-100 之间', trigger: 'blur' }]
});
```

### 2.2 内置验证类型

| 类型         | 说明         |
| ------------ | ------------ |
| `string`     | 字符串       |
| `number`     | 数字         |
| `boolean`    | 布尔值       |
| `email`      | 邮箱         |
| `url`        | URL          |
| `phone`      | 手机号       |
| `idCard`     | 身份证号     |
| `creditCode` | 社会信用代码 |
| `postCode`   | 邮编         |
| `enum`       | 枚举值       |
| `date`       | 日期         |

### 2.3 自定义验证函数

```ts
const validatePass = (value: any, rule: any) => {
    if (value === '') {
        return new Error('请输入密码');
    }
    if (value.length < 8) {
        return new Error('密码长度不能少于 8 位');
    }
    return true;
};

const rules = reactive<FormRules>({
    password: [{ validator: validatePass, trigger: 'blur' }]
});
```

> 注意：验证函数必须显式返回值，返回类型可为 `boolean`、`Error`、`Promise<boolean>`、`Promise<Error>`。

### 2.4 常用验证方法

```ts
// 完整验证（验证所有字段）
await formRef.value?.validate((valid, fields) => {
    if (valid) {
        console.log('验证通过');
    } else {
        console.log('验证失败', fields);
    }
});

// 快速验证（遇到第一个错误即返回）
await formRef.value?.fastValidate((valid, fields) => {
    // ...
});

// 重置表单
formRef.value?.resetFields();

// 清除验证
formRef.value?.clearValidate();
```

### 2.5 数据绑定规范

使用 `v-model` 进行双向绑定：

```vue
<e-input v-model="formState.name" />
<e-select v-model="formState.region" />
<e-date-picker v-model="formState.date" />
```

表单数据建议使用 `reactive`：

```ts
const formState = reactive({
    name: '',
    region: '',
    date: '',
    type: [],
    delivery: false
});
```

远程数据源建议使用框架 Hook：

```ts
import { Hooks } from '@epoint-fe/eui-core';

const { useDataSource } = Hooks;
const { dataSource } = useDataSource('action/getUrl');
```

---

## 3. 常用输入组件速查

### 3.1 Input 输入框

```vue
<!-- 基础输入 -->
<e-input v-model="value" placeholder="请输入" />

<!-- 密码框 -->
<e-input v-model="password" type="password" show-password />

<!-- 文本域 -->
<e-input v-model="content" type="textarea" :rows="3" />

<!-- 可清空 -->
<e-input v-model="value" clearable />

<!-- 长度限制 -->
<e-input v-model="value" maxlength="50" show-word-limit />

<!-- 格式化 -->
<e-input v-model="value" :formatter="(v) => `$ ${v}`" :parser="(v) => v.replace(/\$\s?/g, '')" />
```

### 3.2 InputNumber 数字输入框

```vue
<e-input-number v-model="num" :min="1" :max="100" :step="1" />

<!-- 带精度 -->
<e-input-number v-model="price" :precision="2" :step="0.1" />

<!-- 按钮位置 -->
<e-input-number v-model="num" controls-position="both" />
```

### 3.3 Select 选择器

```vue
<!-- 基础用法 -->
<e-select v-model="value" placeholder="请选择">
    <e-option label="选项一" value="1" />
    <e-option label="选项二" value="2" />
</e-select>

<!-- 使用 options -->
<e-select v-model="value" :options="options" />

<!-- 多选 -->
<e-select v-model="values" multiple collapse-tags />

<!-- 可搜索 -->
<e-select v-model="value" filterable />

<!-- 远程搜索 -->
<e-select v-model="value" filterable remote :remote-method="remoteMethod" :loading="loading" />

<!-- 虚拟滚动（大数据量） -->
<e-select v-model="value" :options="options" :virtual-list-props="{ height: 200 }" />
```

### 3.4 DatePicker 日期选择器

```vue
<!-- 日期选择 -->
<e-date-picker v-model="date" type="date" placeholder="选择日期" />

<!-- 日期范围 -->
<e-date-picker v-model="dateRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />

<!-- 日期时间 -->
<e-date-picker v-model="datetime" type="datetime" />

<!-- 快捷选项 -->
<e-date-picker v-model="date" :shortcuts="shortcuts" />

<!-- 禁用日期 -->
<e-date-picker v-model="date" :disabled-date="disabledDate" />
```

### 3.5 Radio 单选框

```vue
<!-- 单选组 -->
<e-radio-group v-model="value">
    <e-radio value="1">选项一</e-radio>
    <e-radio value="2">选项二</e-radio>
</e-radio-group>

<!-- 按钮样式 -->
<e-radio-group v-model="value">
    <e-radio-button value="1">选项一</e-radio-button>
    <e-radio-button value="2">选项二</e-radio-button>
</e-radio-group>

<!-- 使用 options -->
<e-radio-group v-model="value" :options="options" />
```

### 3.6 Checkbox 多选框

```vue
<!-- 多选组 -->
<e-checkbox-group v-model="values">
    <e-checkbox value="1">选项一</e-checkbox>
    <e-checkbox value="2">选项二</e-checkbox>
</e-checkbox-group>

<!-- 按钮样式 -->
<e-checkbox-group v-model="values" option-type="button" :options="options" />

<!-- 全选 -->
<e-checkbox v-model="checkAll" :indeterminate="isIndeterminate">全选</e-checkbox>
```

### 3.7 Switch 开关

```vue
<e-switch v-model="value" />

<!-- 带文字 -->
<e-switch v-model="value" active-text="开启" inactive-text="关闭" />

<!-- 自定义值 -->
<e-switch v-model="value" active-value="1" inactive-value="0" />

<!-- 加载状态 -->
<e-switch v-model="value" :loading="loading" />
```

---

## 4. 动态表单

### 4.1 添加/删除表单项

```vue
<template>
    <e-form ref="formRef" :model="dynamicForm">
        <e-form-item
            v-for="(item, index) in dynamicForm.items"
            :key="item.key"
            :label="`项目${index + 1}`"
            :prop="`items.${index}.value`"
            :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
            <e-input v-model="item.value" />
            <e-button @click="removeItem(item)">删除</e-button>
        </e-form-item>

        <e-form-item>
            <e-button type="primary" @click="submitForm">提交</e-button>
            <e-button @click="addItem">新增</e-button>
        </e-form-item>
    </e-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

interface Item {
    key: number;
    value: string;
}

const formRef = ref();
const dynamicForm = reactive<{ items: Item[] }>({
    items: [{ key: 1, value: '' }]
});

const addItem = () => {
    dynamicForm.items.push({ key: Date.now(), value: '' });
};

const removeItem = (item: Item) => {
    const index = dynamicForm.items.indexOf(item);
    if (index > -1) {
        dynamicForm.items.splice(index, 1);
    }
};
</script>
```

---

## 5. 错误消息显示

### 5.1 显示模式

| 模式      | 说明             |
| --------- | ---------------- |
| `text`    | 文本显示（默认） |
| `tooltip` | 气泡提示         |

```vue
<e-form error-mode="tooltip" :model="form" :rules="rules">
    <!-- ... -->
</e-form>
```

### 5.2 自定义错误显示

```vue
<e-form-item prop="field">
    <e-input v-model="form.field" />
    <template #error="{ error }">
        <div class="custom-error">{{ error }}</div>
    </template>
</e-form-item>
```

---

## 6. 规范红线（必须遵守）

1. 禁止使用框架中不存在的组件，只能使用官方文档列出的组件。

```vue
<!-- 错误 -->
<e-input-password v-model="password" />
<e-textarea v-model="content" />

<!-- 正确 -->
<e-input v-model="password" type="password" show-password />
<e-input v-model="content" type="textarea" :rows="3" />
```

1. `e-form-item` 的 `v-model` 必须与 `e-form` 的 `:model` 指向同一对象。

```vue
<!-- 错误 -->
<e-form :model="formDataA">
    <e-form-item prop="name">
        <e-input v-model="formDataB.name" />
    </e-form-item>
</e-form>

<!-- 正确 -->
<e-form :model="formDataA">
    <e-form-item prop="name">
        <e-input v-model="formDataA.name" />
    </e-form-item>
</e-form>
```

1. `prop` 必须与 `model` 字段一致，否则验证和回填会失效。

2. 自定义验证器必须有明确返回值（`boolean` / `Error` / `Promise`）。

3. 需要调用 `validate`、`resetFields`、`clearValidate` 时，必须通过 `ref` 获取表单实例。

4. 仅一个输入框时建议阻止默认提交，避免误触回车提交。

```vue
<e-form @submit.prevent>
    <!-- ... -->
</e-form>
```

---

## 7. 组件文档索引

| 组件        | 文档                                                                |
| ----------- | ------------------------------------------------------------------- |
| Form        | [components-form.md](components/components-form.md)                 |
| Input       | [components-input.md](components/components-input.md)               |
| InputNumber | [components-input-number.md](components/components-input-number.md) |
| Select      | [components-select.md](components/components-select.md)             |
| DatePicker  | [components-date-picker.md](components/components-date-picker.md)   |
| Radio       | [components-radio.md](components/components-radio.md)               |
| Checkbox    | [components-checkbox.md](components/components-checkbox.md)         |
| Switch      | [components-switch.md](components/components-switch.md)             |
| Upload      | [components-file-upload.md](components/components-file-upload.md)   |

---

_epoint 框架前端开发规范（Vue 版）_
