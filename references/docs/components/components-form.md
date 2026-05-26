---
title: Form
originUrl: http://192.168.219.170/docs/vue/latest/component/component/form.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/form.html)

# Form 表单

表单包括 `输入框`、`单选框`、`下拉框`、`复选框` 等等。使用表单，您可以收集、验证和提交数据。

## 基础表单

它包括各种输入项，如 `输入框`、`下拉框`、`单选框` 和 `复选框`。

**Demo 示例**: `form/basic-form`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form :model="form" label-width="120px">
    <e-form-item label="活动名称">
      <e-input v-model="form.name" />
    </e-form-item>
    <e-form-item label="活动区域">
      <e-select v-model="form.region" placeholder="请选择您的区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
    </e-form-item>
    <e-form-item label="活动时间">
      <e-col :span="11">
        <e-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
      </e-col>
      <e-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </e-col>
      <e-col :span="11">
        <e-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%" />
      </e-col>
    </e-form-item>
    <e-form-item label="即时送货">
      <e-switch v-model="form.delivery" />
    </e-form-item>
    <e-form-item label="活动类型">
      <e-checkbox-group v-model="form.type">
        <e-checkbox label="线上活动" value="线上活动" name="type" />
        <e-checkbox label="促销活动" value="促销活动" name="type" />
        <e-checkbox label="线下活动" value="线下活动" name="type" />
        <e-checkbox label="简单品牌曝光" value="简单品牌曝光" name="type" />
      </e-checkbox-group>
    </e-form-item>
    <e-form-item label="资源">
      <e-radio-group v-model="form.resource">
        <e-radio label="赞助商" value="赞助商" />
        <e-radio label="场馆" value="场馆" />
      </e-radio-group>
    </e-form-item>
    <e-form-item label="活动形式">
      <e-input v-model="form.desc" type="textarea" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="onSubmit">创建</e-button>
      <e-button>取消</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>

```

> **💡 提示**
>
> [W3C](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2) 规定
> 
> > <i>当表单中只有一个单行文本输入字段时，用户代理应接受在该字段中按 Enter 键作为提交表单的请求。</i>
> 
> 为了防止这种行为，您可以在 `<e-form>` 上添加 `@submit.prevent`。

## 行内表单

当垂直空间有限且表单相对简单时，您可以将它放在一行内。

**Demo 示例**: `form/inline-form`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form :inline="true" :model="formInline" class="demo-form-inline">
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
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const formInline = reactive({
  user: '',
  region: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>

```

## 表单布局

使用 `e-form-layout` 组件可以简化表单的栅格布局，无需手动为每个表单项添加 `e-row` 和 `e-col` 包装。`e-form-layout` 会自动为内部的表单项添加列容器，并利用 24 列栅格系统实现响应式布局。

**Demo 示例**: `form/form-layout`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form :model="form" label-width="120px">
    <e-form-layout :gutter="20" :item-span="24">
      <e-form-item label="活动名称" :span="12">
        <e-input v-model="form.name" />
      </e-form-item>
      <e-form-item label="活动区域" :span="12">
        <e-select v-model="form.region" placeholder="请选择您的区域">
          <e-option label="区域一" value="shanghai" />
          <e-option label="区域二" value="beijing" />
        </e-select>
      </e-form-item>
      <e-form-item label="开始时间" :span="12">
        <e-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
      </e-form-item>
      <e-form-item label="结束时间" :span="12">
        <e-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%" />
      </e-form-item>
      <e-form-item label="活动类型">
        <e-checkbox-group v-model="form.type">
          <e-checkbox label="线上活动" value="线上活动" name="type" />
          <e-checkbox label="促销活动" value="促销活动" name="type" />
          <e-checkbox label="线下活动" value="线下活动" name="type" />
          <e-checkbox label="简单品牌曝光" value="简单品牌曝光" name="type" />
        </e-checkbox-group>
      </e-form-item>
      <e-form-item label="即时送货" :span="8">
        <e-switch v-model="form.delivery" />
      </e-form-item>
      <e-form-item label="资源" :span="8">
        <e-radio-group v-model="form.resource">
          <e-radio label="赞助商" value="赞助商" />
          <e-radio label="场馆" value="场馆" />
        </e-radio-group>
      </e-form-item>
      <e-form-item label="是否签到" :span="8">
        <e-switch v-model="form.signin" />
      </e-form-item>
      <e-form-item label="活动形式">
        <e-input v-model="form.desc" type="textarea" />
      </e-form-item>
      <e-form-item>
        <e-button type="primary" @click="onSubmit">创建</e-button>
        <e-button>取消</e-button>
      </e-form-item>
    </e-form-layout>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  signin: false,
});

const onSubmit = () => {
  console.log('submit!');
};
</script>

```

## 对齐方式

根据您的设计，有几种不同的方法来对齐标签元素。

**Demo 示例**: `form/alignment`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-radio-group v-model="labelPosition" label="标签位置">
    <e-radio-button value="left">左侧</e-radio-button>
    <e-radio-button value="right">右侧</e-radio-button>
    <e-radio-button value="top">顶部</e-radio-button>
  </e-radio-group>
  <div style="margin: 20px" />
  <e-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
    <e-form-item label="名称">
      <e-input v-model="formLabelAlign.name" />
    </e-form-item>
    <e-form-item label="活动区域">
      <e-input v-model="formLabelAlign.region" />
    </e-form-item>
    <e-form-item label="活动形式">
      <e-input v-model="formLabelAlign.type" />
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const labelPosition = ref('right');

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
});
</script>

```

## 验证

表单组件允许您验证数据，帮助您查找和纠正错误。

**Demo 示例**: `form/validation`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="220px" class="demo-ruleForm" :size="formSize">
    <e-form-item label="活动名称" prop="name">
      <e-input v-model="ruleForm.name" />
    </e-form-item>
    <e-form-item label="活动区域" prop="region">
      <e-select v-model="ruleForm.region" placeholder="选择活动区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
    </e-form-item>
    <e-form-item label="活动次数" prop="count">
      <e-select
        v-model="ruleForm.count"
        placeholder="选择活动次数"
        :options="options"
        :virtual-list-props="{
          height: 200,
        }"
      />
    </e-form-item>
    <e-form-item label="活动时间" required>
      <e-col :span="11">
        <e-form-item prop="date1">
          <e-date-picker
            v-model="ruleForm.date1"
            type="date"
            label="选择日期"
            placeholder="选择日期"
            style="width: 100%"
          />
        </e-form-item>
      </e-col>
      <e-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </e-col>
      <e-col :span="11">
        <e-form-item prop="date2">
          <e-time-picker v-model="ruleForm.date2" label="选择时间" placeholder="选择时间" style="width: 100%" />
        </e-form-item>
      </e-col>
    </e-form-item>
    <e-form-item label="即时交付" prop="delivery">
      <e-switch v-model="ruleForm.delivery" />
    </e-form-item>
    <e-form-item label="活动类型" prop="type">
      <e-checkbox-group v-model="ruleForm.type">
        <e-checkbox value="线上活动" label="线上活动" name="type" />
        <e-checkbox value="促销活动" label="线上活动" name="type" />
        <e-checkbox value="线下活动" label="线上活动" name="type" />
        <e-checkbox value="简单品牌曝光" label="线上活动" name="type" />
      </e-checkbox-group>
    </e-form-item>
    <e-form-item label="资源" prop="resource">
      <e-radio-group v-model="ruleForm.resource">
        <e-radio value="赞助商" label="赞助商" />
        <e-radio value="场馆" label="场馆" />
      </e-radio-group>
    </e-form-item>
    <e-form-item label="活动形式" prop="desc">
      <e-input v-model="ruleForm.desc" type="textarea" />
    </e-form-item>
    <e-form-item label="主办人身份证号码" prop="idCard">
      <e-input v-model="ruleForm.idCard" />
    </e-form-item>
    <e-form-item label="主办人手机号码" prop="phone">
      <e-input v-model="ruleForm.phone" />
    </e-form-item>
    <e-form-item label="地址" prop="address">
      <e-input v-model="ruleForm.address" />
    </e-form-item>
    <e-form-item label="社会信用代码" prop="creditCode">
      <e-input v-model="ruleForm.creditCode" />
    </e-form-item>
    <e-form-item label="邮编" prop="postCode">
      <e-input v-model="ruleForm.postCode" />
    </e-form-item>
    <e-form-item label="爱好" prop="hobby">
      <e-input v-model="ruleForm.hobby" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(ruleFormRef)"> 创建 </e-button>
      <e-tooltip content="验证表单时，遇到第一个错误就立即返回，不再进行后续字段的验证">
        <e-button type="primary" @click="quicklyValidate(ruleFormRef)"> 快速验证 </e-button>
      </e-tooltip>
      <e-button @click="resetForm(ruleFormRef)">重置</e-button>
    </e-form-item>
  </e-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@epoint-fe/eui-components';

const formSize = ref('default'); // 表单尺寸
const ruleFormRef = ref<FormInstance>(); // 表单引用
const ruleForm = reactive({
  name: 'Hello', // 活动名称
  region: '', // 活动区域
  count: '', // 活动次数
  date1: '', // 活动日期
  date2: '', // 活动时间
  delivery: false, // 即时交付
  type: [], // 活动类型
  resource: '', // 资源
  desc: '', // 活动形式
  idCard: '', // 主办人身份证号码
  phone: '', // 主办人身份证号码
  url: 'abc',
  email: '',
  num: 0,
  address: '',
  creditCode: '',
  postCode: '',
  hobby: '',
});

const rules = reactive<FormRules>({
  name: [
    {
      // type: 'string',
      validator: (v, opt) => {
        console.log(v, opt);
        if (v.length >= 3 && v.length <= 5) {
          return true;
        }
        return new Error('长度应为3至5个字符');
      },
      required: false,
      min: 3,
      max: 5,
      // message: '长度应为3至5个字符',
      trigger: 'blur',
    },
  ],
  region: [
    {
      required: true,
      message: '请选择活动区域',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      // message: '请选择活动次数',
      trigger: 'change',
    },
  ],
  date1: [{ required: true, type: 'date', message: '请选择日期', trigger: 'change' }],
  date2: [{ required: true, type: 'date', message: '请选择时间', trigger: 'change' }],
  type: [
    {
      required: true,
      message: '请至少选择一个活动类型',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: '请选择活动资源',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: '请输入活动形式', trigger: 'blur' }],
  idCard: [{ type: 'idCard', required: true, message: '必须是身份证格式', trigger: 'blur' }],
  phone: [{ required: true }, { type: 'phone' }],
  url: [{ type: 'url', required: true, trigger: 'blur' }],
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  num: [
    {
      type: 'number',
      min: 3,
      max: 10,
      message: '人数应在3-10人之间',
      trigger: ['blur', 'change'],
    },
  ],
  address: [{ type: 'string', required: true, min: 10, trigger: 'blur' }],
  creditCode: [{ type: 'creditCode', required: true, min: 10, trigger: 'blur' }],
  postCode: [{ type: 'postCode', required: true, min: 10, trigger: 'blur' }],
  hobby: [{ type: 'enum', enums: ['读书', '音乐', '写代码'], trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('提交成功！');
    } else {
      console.log('提交失败！', fields);
    }
  });
};
const quicklyValidate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.fastValidate((valid, fields) => {
    if (valid) {
      console.log('验证成功！');
    } else {
      console.log('验证失败！', fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>

```

:::details <span class="text-red">控件的 model 必须和表单的 model 一致</span>

表单验证是基于表单的 `model` 进行的，所以表单项的 `model` 必须和表单的 `model` 一致。

也就是说，下面这样的代码是不合法的

```html{3,6}
<e-form v-model="formDataA">
  <e-form-item label="name" prop="name" :rules="[{ required: true, message: '请输入姓名' }, { type: 'string', min: 2, max: 5, message: '长度必须在 2 到 5 个字符之间' }]">
    <e-input v-model="formDataB.name" />
  </e-form-item>
</e-form>
<e-form v-model="formDataB">
  <!-- 代码省略 -->
</e-form>
```

:::

:::details 必填规则提示

必填规则比较常用，因此我们提供了简写的形式，即在内置规则上都可以额外加上 `required` 属性来表示必填。

如： `{type: 'idCard', required: true, message: '请输入身份证号码'}` 。

但是这种情况下，必填验证和内置的格式验证将会使用统一的验证错误信息提示。

如果你需要针对必填和格式验证使用不同的错误信息提示，则不能使用这种简写的形式， 需要将其拆分为单独的验证规则，可参考下面的代码示例或上方的示例中的 `phone` 验证规则。

```js
[
  { type: 'required', message: '请输入身份证号码' }, // 等价 { required: true, message: '请输入身份证号码' },
  { type: 'idCard', message: '请输入正确的身份证号码' },
];
```

:::

## 错误消息显示方式

**Demo 示例**: `form/error-mode`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-button-group>
    <e-button :type="errorMode === 'tooltip' ? 'primary' : ''" @click="errorMode = 'tooltip'">tooltip</e-button>
    <e-button :type="errorMode === 'text' ? 'primary' : ''" @click="errorMode = 'text'">text</e-button>
  </e-button-group>
  <e-text class="mx-1">边框</e-text>
  <e-switch v-model="showBorder" />
  <e-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="220px"
    class="demo-ruleForm mt-m"
    :bordered="showBorder"
    :size="formSize"
    :error-mode="errorMode"
  >
    <e-form-item label="活动名称" prop="name">
      <e-input v-model="ruleForm.name" />
    </e-form-item>
    <e-form-item label="活动区域" prop="region">
      <e-select v-model="ruleForm.region" placeholder="选择活动区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
      <template #error>
        <div class="error-message">
          <span>错误信息</span>
        </div>
      </template>
    </e-form-item>
    <e-form-item label="活动时间" required>
      <e-row>
        <e-col :span="11">
          <e-form-item prop="date1">
            <e-date-picker v-model="ruleForm.date1" type="date" label="选择日期" placeholder="选择日期" />
          </e-form-item>
        </e-col>
        <e-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </e-col>
        <e-col :span="11">
          <e-form-item prop="date2">
            <e-time-picker v-model="ruleForm.date2" label="选择时间" placeholder="选择时间" style="width: 100%" />
          </e-form-item>
        </e-col>
      </e-row>
    </e-form-item>
    <e-form-item label="活动类型" prop="type">
      <e-checkbox-group v-model="ruleForm.type">
        <e-checkbox value="线上活动" label="线上活动" name="type" />
        <e-checkbox value="促销活动" label="线上活动" name="type" />
        <e-checkbox value="线下活动" label="线上活动" name="type" />
        <e-checkbox value="简单品牌曝光" label="线上活动" name="type" />
      </e-checkbox-group>
    </e-form-item>
    <e-form-item label="活动形式" prop="desc">
      <e-input v-model="ruleForm.desc" type="textarea" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(ruleFormRef)"> 创建 </e-button>
      <e-tooltip content="验证表单时，遇到第一个错误就立即返回，不再进行后续字段的验证">
        <e-button type="primary" @click="quicklyValidate(ruleFormRef)"> 快速验证 </e-button>
      </e-tooltip>
      <e-button @click="resetForm(ruleFormRef)">重置</e-button>
    </e-form-item>
  </e-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@epoint-fe/eui-components';

const formSize = ref('default'); // 表单尺寸
const ruleFormRef = ref<FormInstance>(); // 表单引用
const errorMode = ref('tooltip'); // 错误提示模式
const showBorder = ref(false); // 是否显示边框

const ruleForm = reactive({
  name: 'Hello', // 活动名称
  region: '', // 活动区域
  date1: '', // 活动日期
  date2: '', // 活动时间
  type: [], // 活动类型
  desc: '', // 活动形式
});

const rules = reactive<FormRules>({
  name: [
    {
      validator: (v, opt) => {
        console.log(v, opt);
        if (v.length >= 3 && v.length <= 5) {
          return true;
        }
        return new Error('长度应为3至5个字符');
      },
      required: false,
      min: 3,
      max: 5,
      trigger: 'blur',
    },
  ],
  region: [
    {
      required: true,
      message: '请选择活动区域',
      trigger: 'change',
    },
  ],
  date1: [{ required: true, type: 'date', message: '请选择日期', trigger: 'change' }],
  date2: [{ required: true, type: 'date', message: '请选择时间', trigger: 'change' }],
  type: [
    {
      required: true,
      message: '请至少选择一个活动类型',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: '请输入活动形式', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('提交成功！');
    } else {
      console.log('提交失败！', fields);
    }
  });
};

const quicklyValidate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.fastValidate((valid, fields) => {
    if (valid) {
      console.log('验证成功！');
    } else {
      console.log('验证失败！', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 12px;
  background-color: #f0f0f0;
  border-radius: 4px;
}
</style>

```

## 自定义验证规则

此示例演示如何自定义自己的验证规则以完成双因素密码验证。

**Demo 示例**: `form/custom-validation`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <e-form-item label="密码" prop="pass">
      <e-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password />
    </e-form-item>
    <e-form-item label="再次输入密码" prop="checkPass">
      <e-input v-model="ruleForm.checkPass" type="password" autocomplete="off" show-password />
    </e-form-item>
    <e-form-item label="年龄" prop="age">
      <e-input v-model.number="ruleForm.age" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(ruleFormRef)">Submit</e-button>
      <e-button @click="resetForm(ruleFormRef)">Reset</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from '@epoint-fe/eui-components';

const ruleFormRef = ref<FormInstance>();

const checkAge = (value: any, rule: any) => {
  if (!value) {
    return new Error('请输入年龄');
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        resolve(new Error('年龄只能是数字'));
      } else {
        if (value < 18) {
          resolve(new Error('年龄必须大于18'));
        } else {
          resolve(true);
        }
      }
    }, 1000);
  });
};

const validatePwd = (
  pwd: string,
  options: {
    minLength: number;
    requireCombo: number;
    hasNumber: boolean;
    hasLowerCase: boolean;
    hasUpperCase: boolean;
    hasSymbol: boolean;
  }
) => {
  const { minLength, requireCombo, hasNumber, hasLowerCase, hasUpperCase, hasSymbol } = options;
  if (pwd.length < minLength) return false;

  let criteriaMet = 0;
  if (hasNumber && /\d/.test(pwd)) criteriaMet++;
  if (hasLowerCase && /[a-z]/.test(pwd)) criteriaMet++;
  if (hasUpperCase && /[A-Z]/.test(pwd)) criteriaMet++;
  if (hasSymbol && /[^a-zA-Z0-9]/.test(pwd)) criteriaMet++;

  return criteriaMet >= requireCombo;
};

function defaultPwdRule(pwd: string) {
  const ok = validatePwd(pwd, {
    minLength: 8,
    requireCombo: 3,
    hasNumber: true,
    hasLowerCase: true,
    hasUpperCase: true,
    hasSymbol: true,
  });
  return {
    isValid: ok,
    message: ok ? '' : '密码最短需要8个字符, 至少包含 (大写字母, 小写字母, 数字, 符号) 中的3种',
  };
}

const validatePass = (value: any, rule: any) => {
  console.log(value, rule);
  if (value === '') {
    return new Error('请输入密码');
  } else {
    const { isValid, message } = defaultPwdRule(value);
    return isValid ? true : new Error(message);
  }
};

const validatePass2 = (value: any, rule: any, callback: any) => {
  if (value === '') {
    return new Error('请再次输入密码进行确认');
  } else if (value !== ruleForm.pass) {
    return new Error('两次的密码不一致');
  } else {
    return true;
  }
};

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
});

const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

```

你可以在验证规则上通过 `validator` 来自定义验证函数。 **函数必须具有显式返回值**，返回值可以是 `boolean` `Error` `Promise<boolean>` `Promise<Error>` 之一。

异步验证验证返回 `Promise` 的情况下，请始终使用 `resolve` 返回结果，包括验证失败的情况。

:::details 验证函数说明
validator 函数签名为 `ValidateFuncType`：

```ts
type ValidateFuncReturnType = boolean | Promise<boolean> | Error | Promise<Error>;
interface ValidateFuncType {
  (val: any, options?: ValidateOptions): ValidateFuncReturnType;
}
```

第一个参数为当前要验证的值，第二个参数为当前的验证的配置（即 rule 中的配置，如果是内置规则，会自动合并默认规则的配置项）。

**函数必须具有显式返回值**， 返回值说明如下：

- `boolean`: `true` 表示验证通过，`false` 表示验证失败。 验证失败的消息以 rule 上配置的 message 为准，没有设置时获取内置 type 的验证失败消息。
- `Error`: 表示验证失败，错误消息为 `Error.message`。
- `Promise<boolean>`: 表示异步验证通过，`true` 表示验证通过，`false` 表示验证失败。验证失败的消息以 rule 上配置的 message 为准，没有设置时获取内置 type 的验证失败消息。
- `Promise<Error>`: 表示异步验证失败，`Error.message` 为错误消息。

**注意**: 系统只处理 `Promise.resolve` 的值，`Promise.reject` 会被当作代码错误而非验证错误。请始终使用 resolve 返回结果，包括验证失败的情况。

:::

## 添加/删除表单项

**Demo 示例**: `form/form-items`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
    <e-form-item
      prop="email"
      label="电子邮件"
      :rules="[
        {
          required: true,
          message: '请输入电子邮件地址',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的电子邮件地址',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <e-input v-model="dynamicValidateForm.email" />
    </e-form-item>
    <e-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="'域名' + (index + 1)"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true,
        message: '域名不能为空',
        trigger: 'blur',
      }"
    >
      <e-input v-model="domain.value" />
      <e-button class="mt-2" @click.prevent="removeDomain(domain)">删除</e-button>
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(formRef)">提交</e-button>
      <e-button @click="addDomain">新增域名</e-button>
      <e-button @click="resetForm(formRef)">重置</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from '@epoint-fe/eui-components';

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  domains: DomainItem[];
  email: string;
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
});

interface DomainItem {
  key: number;
  value: string;
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  });
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

```

## 数值验证

**Demo 示例**: `form/number-validate`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
    <e-form-item
      label="年龄"
      prop="age"
      :rules="[
        { required: true, message: '年龄是必填项' },
        { type: 'number', message: '年龄必须是数字' },
      ]"
    >
      <e-input v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(formRef)">提交</e-button>
      <e-button @click="resetForm(formRef)">重置</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from '@epoint-fe/eui-components';

const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  age: '',
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

```

> **💡 提示**
>
> 当 `e-form-item` 嵌套在另一个 `e-form-item` 中时，其标签宽度将为 `0`。如果需要，您可以在该 `e-form-item` 上设置 `label-width`。

## 尺寸边框控制

表单中的所有组件都从该表单继承其 `size` 属性。同样，FormItem 也有一个 `size` 属性。

边框的配置可以通过 `bordered` 属性进行设置。

**Demo 示例**: `form/size-control`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <div class="toolbar-box">
    <e-radio-group v-model="size" label="尺寸控制">
      <e-radio-button value="large">大尺寸</e-radio-button>
      <e-radio-button value="default">默认尺寸</e-radio-button>
      <e-radio-button value="small">小尺寸</e-radio-button>
    </e-radio-group>
    <e-radio-group v-model="labelPosition" label="标签位置控制">
      <e-radio-button value="left">左侧</e-radio-button>
      <e-radio-button value="right">右侧</e-radio-button>
      <e-radio-button value="top">顶部</e-radio-button>
    </e-radio-group>
    <e-text class="mx-1">边框</e-text>
    <e-switch v-model="showBorder" />
  </div>
  <br />
  <!-- 在使用表单边框时，请注意 label-width 属性不应设置为 auto。这样可以确保表单的布局和样式保持一致，避免出现意外的显示问题。 -->
  <e-form
    ref="form"
    :model="sizeForm"
    label-width="100px"
    :bordered="showBorder"
    :label-position="labelPosition"
    :size="size"
  >
    <e-form-item label="活动名称">
      <e-input v-model="sizeForm.name" placeholder="请输入活动名称" />
    </e-form-item>
    <!-- 4列布局 -->
    <e-row :gutter="20">
      <e-col :span="12">
        <e-form-item label="4列布局1"> <e-input v-model="sizeForm.name1" disabled /> </e-form-item>
      </e-col>
      <e-col :span="12">
        <e-form-item label="4列布局2"> <e-input v-model="sizeForm.name2" /> </e-form-item>
      </e-col>
    </e-row>
    <!-- 6列布局 -->
    <e-row :gutter="20">
      <e-col :span="8">
        <e-form-item label="6列布局1"> <e-input v-model="sizeForm.name3" /></e-form-item>
      </e-col>
      <e-col :span="8">
        <e-form-item label="6列布局2"> <e-input v-model="sizeForm.name4" /></e-form-item>
      </e-col>
      <e-col :span="8">
        <e-form-item label="6列布局3"> <e-input v-model="sizeForm.name5" /> </e-form-item>
      </e-col>
    </e-row>
    <e-form-item label="活动区域">
      <e-select v-model="sizeForm.region" placeholder="请选择活动区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
    </e-form-item>
    <e-form-item label="活动时间">
      <e-col :span="11">
        <e-date-picker
          v-model="sizeForm.date1"
          type="date"
          label="选择日期"
          placeholder="选择日期"
          style="width: 100%"
        />
      </e-col>
      <e-col class="text-center" :span="1" style="margin: 0 0.5rem">-</e-col>
      <e-col :span="11">
        <e-time-picker v-model="sizeForm.date2" label="选择时间" placeholder="选择时间" style="width: 100%" />
      </e-col>
    </e-form-item>
    <e-form-item label="活动类型">
      <e-checkbox-group v-model="sizeForm.type">
        <e-checkbox value="线上活动" label="线上活动" name="type" />
        <e-checkbox value="促销活动" label="促销活动" name="type" />
      </e-checkbox-group>
    </e-form-item>
    <e-form-item label="资源">
      <e-radio-group v-model="sizeForm.resource">
        <e-radio value="赞助商" label="赞助商" />
        <e-radio value="场馆" label="场馆" />
      </e-radio-group>
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="onSubmit">创建</e-button>
      <e-button>取消</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const size = ref('default');
const labelPosition = ref('right');
const showBorder = ref<boolean>(false);

const sizeForm = reactive({
  name: '',
  name1: '禁用',
  name2: '',
  name3: '',
  name4: '',
  name5: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

function onSubmit() {
  console.log('submit!');
}
</script>

<style scoped>
.e-radio-group {
  margin-right: 12px;
}

.toolbar-box {
  display: flex;
  align-items: center;
}

.e-text {
  margin-right: 6px;
}
</style>

```

> **💡 提示**
>
> 在使用表单边框时，请注意 label-width 属性不应设置为 auto。这样可以确保表单的布局和样式保持一致，避免出现意外的显示问题。

## 帮助提示

**Demo 示例**: `form/help-tip`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form :model="form" label-width="120px">
    <e-form-item label="活动名称" label-tooltip="帮助提示：请输入活动名称">
      <e-input v-model="form.name" placeholder="请输入活动名称" />
    </e-form-item>
    <e-form-item label="活动区域" tooltip="帮助提示：请选择活动区域">
      <e-select v-model="form.region" placeholder="请选择活动区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
    </e-form-item>
    <e-form-item
      label="活动时间"
      :label-tooltip="{
        content: '帮助提示：<span style=\'color:var(--e-color-danger)\'>请选择日期</span>',
        placement: 'left',
        effect: 'light',
        showArrow: false,
        rawContent: true,
      }"
    >
      <e-col :span="11">
        <e-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
      </e-col>
      <e-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </e-col>
      <e-col :span="11">
        <e-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%" />
      </e-col>
    </e-form-item>
    <e-form-item label="活动类型">
      <e-checkbox-group v-model="form.type">
        <e-checkbox value="线上活动" label="线上活动" name="type" />
        <e-checkbox value="促销活动" label="促销活动" name="type" />
      </e-checkbox-group>
    </e-form-item>
    <e-form-item label="资源">
      <e-radio-group v-model="form.resource">
        <e-radio value="赞助商" label="赞助商" />
        <e-radio value="场馆" label="场馆" />
      </e-radio-group>
    </e-form-item>
    <e-form-item label="活动说明">
      <e-input v-model="form.desc" type="textarea" />
      <template #extra>
        <span>请填写活动的详细说明，不少于10个字符</span>
      </template>
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="onSubmit">创建</e-button>
      <e-button>取消</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

function onSubmit() {
  console.log('submit!');
}
</script>

```

## 无障碍

当 `e-form-item` 内部只有一个输入框（或相关控件，如选择框或复选框）时，表单项的标签将自动附加到该输入框上。但是，如果 `e-form-item` 内部有多个输入框，则表单项将被分配 [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) 的 [group](https://www.w3.org/TR/wai-aria/#group) 角色。在这种情况下，您有责任为各个输入框分配辅助标签。

**Demo 示例**: `form/accessibility`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form label-position="left" label-width="150px" style="max-width: 460px">
    <e-space fill>
      <e-alert type="info" show-icon :closable="false">
        <p>“全名”标签会自动附加到输入框：</p>
      </e-alert>
      <e-form-item label="全名">
        <e-input v-model="formAccessibility.fullName" />
      </e-form-item>
    </e-space>
    <e-space fill>
      <e-alert type="info" show-icon :closable="false">
        <p>
          “您的信息”作为输入框组的标签。<br />
          您必须为各个输入框指定标签。占位符不能替代使用“label”属性。
        </p>
      </e-alert>
      <e-form-item label="您的信息">
        <e-row :gutter="20">
          <e-col :span="12">
            <e-input v-model="formAccessibility.firstName" label="名" placeholder="名" />
          </e-col>
          <e-col :span="12">
            <e-input v-model="formAccessibility.lastName" label="姓" placeholder="姓" />
          </e-col>
        </e-row>
      </e-form-item>
    </e-space>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const formAccessibility = reactive({
  fullName: '',
  firstName: '',
  lastName: '',
});
</script>

```

## 数据脱敏的表单提交

由于数据脱敏的特殊性，首次进入编辑时，需要全部重新录入。未保存前，用户在页面的编辑需要脱敏展示的同时需要保留真实值，表单提交时需要对脱敏数据进行处理，也就是脱敏的内容知道当前是否保存过，提供以下两种处理方式：

1. 自己提交数据，手动更新表单状态。
2. 将提交数据的逻辑放在表单内部，表单内进行提交请求的发起，内部会自动处理状态逻辑。

### 外部手动提交

在表单外进行数据提交时，调用 `getCleanData` 获取未设置脱敏、脱敏已修改、未设置只读的数据，在提交成功后需调用 `resetEditStatus` 重置脱敏项的修改状态。

**Demo 示例**: `form/desensitization-submit-manual`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form ref="formRef" :model="formData" :rules="formRules">
    <e-form-item prop="testtext" label="测试" label-width="120px">
      <e-input v-model="formData.testtext" placeholder="请输入" :desensitization-type="''" />
    </e-form-item>
    <e-divider content-position="right">以下为敏感数据,已脱敏</e-divider>
    <e-form-item prop="name" label="姓名" label-width="120px">
      <e-input v-model="formData.name" placeholder="请输入" :desensitization-type="DESENDATATYPE_CHINESE_NAME" />
    </e-form-item>
    <e-form-item prop="address" label="地址(只读)" label-width="120px">
      <e-input v-model="formData.address" placeholder="请输入" readonly />
    </e-form-item>
    <e-row>
      <e-col :span="4" style="margin-left: 131px">
        <e-button type="primary" @click="submit">提交</e-button>
      </e-col>
    </e-row>
  </e-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { DESENDATATYPE_CHINESE_NAME, EMessage } from '@epoint-fe/eui-components';
import axios from 'axios';
import type { FormRules } from '@epoint-fe/eui-components';

const formRef = ref();

const formData = reactive({
  testtext: '测试校验文本',
  name: '张三',
  address: '张家港市港城大道',
});

const formRules = reactive<FormRules>({
  testtext: [
    {
      type: 'string',
      required: true,
      message: '请输入',
      trigger: 'change',
    },
  ],
  name: [
    {
      type: 'string',
      required: true,
      message: '请输入',
      trigger: 'change',
    },
  ],
});

const submit = async () => {
  // 走表单验证
  const validateRes = await formRef.value.validate((valid, fields) => {
    if (!valid) {
      // 处理错误信息
      EMessage.warning(`表单验证失败，错误字段：${Object.keys(fields).join('、')}`);

      return;
    }
  });

  // 验证未通过
  if (!validateRes) {
    return;
  }

  // -- 提交表单请求 --

  // 以axios为例子
  const axiosInstance = axios;

  // 通过getCleanData 获取无需脱敏数据+脱敏已修改数据
  const data = formRef.value.getCleanData();

  EMessage.info(`提交数据： ${JSON.stringify(data)}`);

  // axios为请求例子
  axiosInstance({
    url: location.href,
    data,
    method: 'post',
  })
    .then((res) => {
      EMessage.success('提交成功');

      // 重置表单内脱敏项的已修改情况，避免重复提交
      formRef.value.resetEditState();
    })
    .catch((err) => {
      EMessage.error(`提交失败 ${JSON.stringify(err)}`);
    });
};
</script>

```

### 内部提交

使用表单内部能力进行提交,包含脱敏数据处理。

**Demo 示例**: `form/desensitization-submit-proxy`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/form.html)

```vue
<template>
  <e-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    :submit-url="submitUrl"
    :submit-request-options="submitRequestOptions"
    :submit-http-requeset="submitHttpRequest"
  >
    <e-form-item prop="testtext" label="测试" label-width="120px">
      <e-input v-model="formData.testtext" placeholder="请输入" :desensitization-type="''" />
    </e-form-item>

    <e-divider content-position="right">以下为敏感数据,已脱敏</e-divider>
    <e-form-item prop="name" label="姓名" label-width="120px">
      <e-input v-model="formData.name" placeholder="请输入" :desensitization-type="DESENDATATYPE_CHINESE_NAME" />
    </e-form-item>
    <e-form-item prop="address" label="地址(只读)" label-width="120px">
      <e-input v-model="formData.address" placeholder="请输入" readonly />
    </e-form-item>
    <e-row>
      <e-col :span="6" style="margin-left: 131px">
        <e-button type="primary" @click="submit">提交</e-button>
      </e-col>
    </e-row>
  </e-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { DESENDATATYPE_CHINESE_NAME, EMessage } from '@epoint-fe/eui-components';
import axios from 'axios';
import type { FormRules, SubmitRequestOptions, ValidateFieldsError } from '@epoint-fe/eui-components';

const formRef = ref();

const formData = reactive({
  testtext: '测试必填文本',
  name: '张三',
  address: '张家港市港城大道',
});

const formRules = reactive<FormRules>({
  testtext: [
    {
      type: 'string',
      required: true,
      message: '请输入',
      trigger: 'change',
    },
  ],
  name: [
    {
      type: 'string',
      required: true,
      message: '请输入',
      trigger: 'change',
    },
  ],
});

const submitUrl = ref(location.href);

// 表单请求配置
const submitRequestOptions: Partial<SubmitRequestOptions> = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'with-test-falg': '1',
  },
  withCredentials: false,
  getRequestData: (data: Record<string, any>) => {
    EMessage.info(`提交数据： ${JSON.stringify(data)}`);

    return data;
  },
  validateErrorHandler: (fields: ValidateFieldsError): void => {
    EMessage.warning(`表单验证失败，错误字段：${Object.keys(fields).join('、')}`);
  },
  onSuccess: (response: any): void => {
    EMessage.success('提交成功');
  },
};

// 以axios为例子，也可不穿，使用默认请求
const submitHttpRequest = axios;

// 表单提交
const submit = () => {
  // 表单提交
  formRef.value.submit();
};
</script>

```

## Form API

### Form Attributes

| Name                      | Description                                                                                                                                         | Type                                                                             | Default                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------- |
| model                     | 表单组件的数据。                                                                                                                                    | ^[object]`Record<string, any>`                                                   | —                             |
| rules                     | 表单的验证规则。                                                                                                                                    | ^[object]`FormRules`                                                             | —                             |
| inline                    | 表单是否为行内形式。                                                                                                                                | ^[boolean]                                                                       | false                         |
| label-position            | 标签的位置。如果设置为 `'left'` 或 `'right'`，还需要 `label-width` 属性。                                                                           | ^[enum]`'left' \| 'right' \| 'top'`                                              | right                         |
| label-width               | 标签的宽度，例如 `'50px'`。其所有直接子表单项都将继承此值。支持 `auto`。                                                                            | ^[string] / ^[number]                                                            | —                             |
| label-suffix              | 标签的后缀。如果未设置且 `bordered` 为 `true` 时，默认为空字符串；其他情况下默认为 `'：'`。                                                            | ^[string]                                                                        | —                             |
| hide-required-asterisk    | 是否隐藏标签旁边的红色星号，表示必填字段。                                                                                                          | ^[boolean]                                                                       | false                         |
| require-asterisk-position | 星号的位置。                                                                                                                                        | ^[enum]`'left' \| 'right'`                                                       | left                          |
| show-message              | 是否显示错误消息。                                                                                                                                  | ^[boolean]                                                                       | true                          |
| error-mode                | 错误消息的显示方式。 若需使用 error-mode="text"，请确保关闭表单边框线（bordered 属性为 false）。                                                    | ^[enum]`'text' \| 'tooltip'`                                                     | text                          |
| error-message             | 从表单上按验证类型配置统一的错误提示信息                                                                                                            | ^[object]`Record<string, string>`                                                | null                          |
| inline-message            | 是否在表单项内联显示错误消息。                                                                                                                      | ^[boolean]                                                                       | false                         |
| status-icon               | 是否显示表示验证结果的图标。                                                                                                                        | ^[boolean]                                                                       | false                         |
| validate-on-rule-change   | 当 `rules` 属性更改时，是否触发验证。                                                                                                               | ^[boolean]                                                                       | true                          |
| size                      | 控制此表单中组件的大小。                                                                                                                            | ^[enum]`'large' \| 'default' \| 'small'`                                         | —                             |
| bordered                  | 控制此表单是否显示边框                                                                                                                              | ^[boolean]                                                                       | —                             |
| filled                    | 控制表单项内容区域是否显示背景色。与 `bordered` 互斥，当 `bordered` 为 `true` 时背景色不生效。                                            | ^[boolean]                                                                       | —                             |
| disabled                  | 是否禁用此表单中的所有组件。如果设置为 `true`，它将覆盖内部组件的 `disabled` 属性。                                                                 | ^[boolean]                                                                       | false                         |
| scroll-to-error           | 验证失败时，滚动到第一个错误表单项。                                                                                                                | ^[boolean]                                                                       | true                          |
| scroll-into-view-options  | 验证失败时，根据 scrollIntoView 选项滚动到第一个错误项。[scrollIntoView](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)。 | ^[object] / ^[boolean]                                                           | —                             |
| submit-url                | 请求的 Url 地址                                                                                                                                     | ^[string]                                                                        | #                             |
| submit-request-options    | 请求配置,参考[下面的表格](#SubmitRequestOptions)                                                                                                    | `SubmitRequestOptions`                                                           | -                             |
| submit-http-request       | 覆盖默认的 xhr 行为，允许你实现自己的上传文件请求。[FormRequestOptions](#FormRequestOptions)                                                        | ^[Function]`(options: FormRequestOptions) => XMLHttpRequest \| Promise<unknown>` | ^[ajax]`new XMLHttpRequest()` |

:::details error-message 说明

`error-message` 用于统一配置表单上的错误提示信息，key 为验证类型，value 为错误提示信息，下面是一个示例：

<!-- eslint-skip -->

```js
{
  required: '这是必填字段',
  number: '请输入数字值'
}
```

这个配置将会自动和语言包中的错误提示信息合并，如果有相同的 key，将会覆盖语言包中的错误提示信息。

语言包中默认提示信息如下：

<!-- eslint-skip -->

```js
{
  /**
   * 支持的占位符
   * - name: 文本类型，FormItem 里面的文字，没有时降级为 filed
   * - filed: 文本类型，FormItem 所关联的prop值
   * - value: 任意类型，当前 FormItem 的值
   * - ...: 其他所有来自 验证规则的字段，如 type、min、max、enums 等
   */
  _validateRuntime: '验证过程中出错了：',
  required: '${name}必填',
  whitespace: '${name}不能是空白',
  boolean: '${name}数据类型必须是布尔类型',
  number: '${name}必须是数字',
  string: '${name}必须是字符串',
  enum: '${name}只能是${enums}等',
  date: '请输入正确的${name}，必须是日期',
  url: '请输入正确的${name}，必须是url格式',
  email: '请输入正确的${name}，必须是邮箱格式',
  idCard:
    '输入的身份证号码格式不正确，若最后一位为“X”则只允许输入大写的“X”',
  hkIdCard: '输入的香港身份证号码格式不正确',
  orgCode: '输入的组织机构代码格式不正确',
  creditCode: '输入的统一社会信用代码格式不正确',
  postCode: '输入的邮政编码格式不正确',
  pattern: '请输入正确的${name}',
}
```

:::

### Form Events

| Name     | Description          | Type                                                                         |
| -------- | -------------------- | ---------------------------------------------------------------------------- |
| validate | 在验证表单项后触发。 | ^[Function]`(prop: FormItemProp, isValid: boolean, message: string) => void` |

### Form Exposes

| Name           | Description                                                                    | Type                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| validate       | 验证整个表单。接受回调函数或返回 `Promise`。                                   | ^[Function]`(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>`                                         |
| fastValidate   | 快速验证整个表单(第一个字段验证失败就立即返回)。接受回调函数或返回 `Promise`。 | ^[Function]`(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>`                                         |
| validateField  | 验证指定字段。                                                                 | ^[Function]`(props?: FormItemProp \| FormItemProp[], callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
| resetFields    | 重置指定字段并移除验证结果。                                                   | ^[Function]`(props?: FormItemProp \| FormItemProp[]) => void`                                                                                      |
| scrollToField  | 滚动到指定字段。                                                               | ^[Function]`(prop: FormItemProp) => void`                                                                                                          |
| clearValidate  | 清除指定字段的验证消息。                                                       | ^[Function]`(props?: FormItemProp \| FormItemProp[]) => void`                                                                                      |
| getCleanData   | 获得无需脱敏、脱敏已修改、未设置只读的数据集合。                               | ^[Function]`() => Record<string, any>`                                                                                                             |
| resetEditState | 重置其下脱敏组件的修改状态。                                                   | ^[Function]`() => void`                                                                                                                            |
| submit         | 表单提交。                                                                     | ^[Function]`() => void`                                                                                                                            |

### Form Slots

| Name    | Description    | Subtags  |
| ------- | -------------- | -------- |
| default | 自定义默认内容 | FormItem |

### SubmitRequestOptions {#SubmitRequestOptions}

表单属性，请求入参配置

| Name                 | Description                                     | Type                                                                | Default                                                                                           |
| -------------------- | ----------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| method               | 设置上传请求的方法                              | `string`                                                            | `post`                                                                                            |
| headers              | 请求头部信息                                    | ^[Object]`Headers \| Record<string, any>`                           | `{}`                                                                                              |
| witchCredentials     | 是否发送 cookies                                | `boolean`                                                           | `false`                                                                                           |
| getRequestData       | 获取请求 data 入参,入参为`getCleanData`获取数据 | ^[Function]`(cleanData: Record<string, any) => Record<string, any>` | ^[Function]`(cleanData) => { return { params: JSON.stringify(cleanData) }; }`                     |
| validateErrorHandler | 表单验证错误处理                                | ^[Function]`(fields: ValidateFieldsError) => void`                  | ^[Function]`(fields) => { fields && EMessage.warning('表单校验未通过,请检查表单字段填写情况'); }` |
| onSuccess            | 上传成功时的钩子函数                            | ^[Function]`(response: any) => void`                                | ^[Function]`(res) => { EMessage.error('提交成功'); }`                                             |
| onError              | 发生错误时的钩子函数                            | ^[Function]`(error: Error) => void`                                 | ^[Function]`(err) => { EMessage.error('提交失败'); }`                                             |

### FormRequestOptions {#FormRequestOptions}

请求方法，入参参考

| Name                 | Description          | Type                                               |
| -------------------- | -------------------- | -------------------------------------------------- |
| action               | 请求地址             | `string`                                           |
| method               | 设置上传请求的方法   | `string`                                           |
| headers              | 请求头部信息         | ^[Object]`Headers \| Record<string, any>`          |
| witchCredentials     | 是否发送 cookies     | `boolean`                                          |
| data                 | 请求数据             | ^[Object]`Record<string, any>`                     |
| validateErrorHandler | 表单验证错误处理     | ^[Function]`(fields: ValidateFieldsError) => void` |
| onSuccess            | 上传成功时的钩子函数 | ^[Function]`(response: any) => void`               |
| onError              | 发生错误时的钩子函数 | ^[Function]`(error: Error) => void`                |

## FormLayout API

`e-form-layout` 是表单布局组件，用于简化表单的栅格布局。

### FormLayout Attributes

| Name     | Description                                                                                         | Type   | Default |
| -------- | --------------------------------------------------------------------------------------------------- | ------ | ------- |
| gutter   | 栅格间距                                                                                            | number | 0       |
| item-span | 默认列宽（所有表单项的默认 span）                                                                        | number | 24      |

### FormLayout Slots

| Name    | Description | Subtags   |
| ------- | ----------- | ---------- |
| default | 自定义默认内容 | FormItem |

## FormItem API

### FormItem Attributes

| Name            | Description                                                                                                                   | Type                                                   | Default |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------- |
| prop            | `model` 的键。它可以是一个属性路径的数组（例如 `['a', 'b', 0]`）。在使用 `validate` 和 `resetFields` 方法时，该属性是必需的。 | ^[string] / ^[string[]]                                | —       |
| label           | 标签文本。                                                                                                                    | ^[string]                                              | —       |
| label-position  | 标签的位置。如果设置为 `'left'` 或 `'right'`，还需要 `label-width` 属性。                                                     | ^[enum]`'left' \| 'right' \| 'top'`                    | right   |
| label-width     | 标签宽度，例如 `'50px'`。支持 `'auto'`。                                                                                      | ^[string] / ^[number]                                  | —       |
| required        | 字段是否必填，如果省略，将由验证规则确定。                                                                                    | ^[boolean]                                             | false   |
| rules           | 表单的验证规则，请参考[下面的表格](#formitemrule)                                                                             | ^[object]`FormItemRule \| FormItemRule[]`              | —       |
| error           | 字段错误消息，设置其值，字段将立即验证错误并显示此消息。                                                                      | ^[string]                                              | —       |
| show-message    | 是否显示错误消息。                                                                                                            | ^[boolean]                                             | true    |
| inline-message  | 内联样式验证消息。                                                                                                            | ^[boolean]                                             | false   |
| size            | 控制该表单项中组件的大小。                                                                                                    | ^[enum]`'large' \| 'default' \| 'small'`               | default |
| label-tooltip   | 设置表单项 label 区域的帮助提示                                                                                               | ^[string] / [`ETooltipProps`](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html#attributes) | —       |
| tooltip         | 设置表单项控件区域的帮助提示                                                                                                  | ^[string] / [`ETooltipProps`](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html#attributes) | —       |
| for             | 与原生标签中的 `for` 相同。                                                                                                   | ^[string]                                              | —       |
| validate-status | 表单项的验证状态。                                                                                                            | ^[enum]`'' \| 'error' \| 'validating' \| 'success'`    | —       |
| filled           | 控制该表单项内容区域是否显示背景色。继承自 Form，可单独覆盖。与 `bordered` 互斥，当 `bordered` 为 `true` 时背景色不生效。  | ^[boolean]                                             | —       |
| span             | 栅格占用的列数（以下栅格相关属性只在 FormLayout 中生效）                                                                                                   | ^[number]                                               | —       |
| offset           | 栅格左侧的间隔列数                                                                                                               | ^[number]                                               | 0       |
| push             | 栅格向右移动的列数                                                                                                               | ^[number]                                               | 0       |
| pull             | 栅格向左移动的列数                                                                                                               | ^[number]                                               | 0       |
| xs               | `<768px` 响应式栅格或栅格属性对象                                                                                                | ^[number] / ^[object]`ColSizeObject`                    | —       |
| sm               | `≥768px` 响应式栅格或栅格属性对象                                                                                               | ^[number] / ^[object]`ColSizeObject`                    | —       |
| md               | `≥992px` 响应式栅格或栅格属性对象                                                                                               | ^[number] / ^[object]`ColSizeObject`                    | —       |
| lg               | `≥1200px` 响应式栅格或栅格属性对象                                                                                              | ^[number] / ^[object]`ColSizeObject`                    | —       |
| xl               | `≥1920px` 响应式栅格或栅格属性对象                                                                                              | ^[number] / ^[object]`ColSizeObject`                    | —       |

### FormItem Slots

| Name    | Description                | Type                         |
| ------- | -------------------------- | ---------------------------- |
| default | 表单项的默认内容。         | —                            |
| label   | 自定义标签的显示内容。     | ^[object]`{ label: string }` |
| error   | 自定义验证消息的显示内容。 | ^[object]`{ error: string }` |
| extra   | 用于在表单项下方添加始终可见的辅助说明文本。 | —                            |

### FormItem Exposes

| Name            | Description                  | Type                                                                                                 |
| --------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| size            | 表单项的大小。               | ^[object]`ComputedRef<'' \| 'large' \| 'default' \| 'small'>`                                        |
| validateMessage | 验证消息。                   | ^[object]`Ref<string>`                                                                               |
| validateState   | 验证状态。                   | ^[object]`Ref<'' \| 'error' \| 'validating' \| 'success'>`                                           |
| validate        | 验证表单项。                 | ^[Function]`(trigger: string, callback?: FormValidateCallback \| undefined) => FormValidationResult` |
| resetField      | 重置当前字段并删除验证结果。 | ^[Function]`() => void`                                                                              |
| clearValidate   | 移除字段的验证状态。         | ^[Function]`() => void`                                                                              |

## 验证规则 {#formitemrule}

### 验证规则通用属性

验证规则的通用属性如下表：

| Name      | Description          | Type                                                                                     | Default |
| --------- | -------------------- | ---------------------------------------------------------------------------------------- | ------- |
| type      | 验证的类型           | 详见下表                                                                                 | —       |
| required  | 是否必填             | ^[boolean]                                                                               | —       |
| trigger   | 触发验证的方式。     | ^[enum]`'blur' \| 'change' \| ['blur'] \| ['change'] \| ['blur', 'change']`              | —       |
| message   | 验证失败时的错误消息 | ^[string]                                                                                | —       |
| validator | 自定义的验证函数     | ^[Function]`(val:any, option) => boolean \| Promise<boolean> \| Error \| Promise<Error>` | —       |

内置的验证规则如下表，你可以直接使用 `{type: "某个验证规则"}` 进行配置，但请注意，某些验证规则必须提供配置，如 `type: 'enum'` 则必须提供 `enums`。

常用的内置验证规则都提供了验证失败的消息，并适配了国际化，如果你不需要自定义验证失败的消息，则无需提供 `message`。

### 内置验证规则

| Type              | Options                                                                                           | Description                            |
| ----------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------- |
| required          | --                                                                                                | 必填的验证规则                         |
| boolean           | --                                                                                                | 必须是布尔值，含类型                   |
| number            | ^[IsNumberOptions]`{min?:number; max?:number}`                                                    | 必须是数值，含类型                     |
| string            | ^[LengthOptions]                                                                                  | 必须是字符串                           |
| enum              | ^[IsEnumOptions]                                                                                  | 必须是指定的选项之一                   |
| date              | ^[IsDateOptions]                                                                                  | 必须是日期，含类型                     |
| url               | ^[IsURLOptions]                                                                                   | 必须是 url                             |
| email             | ^[IsEmailOptions]                                                                                 | 必须是 email                           |
| postCode          | --                                                                                                | 是否为邮政编码                         |
| pattern           | ^[PatternValidatoroptions]                                                                        | 是符合给定的正则表达式                 |
| idCard            | ^[IDCardOptions]                                                                                  | 必须是身份证号码                       |
| hkIdCard          | --                                                                                                | 必须是香港的身份证号码                 |
| float             | ^[IsF9FloatOptions]`{min?: number; max?: number; maxDecimalLength?: number; maxLength?: number;}` | 是否是小数（只判断形式不判断类型）     |
| int               | ^[IsF9IntOptions]`{min?:number; max?:number}`                                                     | 是否是 int（只判断形式不判断类型）     |
| creditCode        | --                                                                                                | 是否为统一社会信用代码                 |
| orgCode           | --                                                                                                | 是否为组织机构代码（包含社会信用代码） |
| phone             | --                                                                                                | 是否是电话号码                         |
| mobile            | --                                                                                                | 是否为手机号                           |
| tel               | --                                                                                                | 是否为固定电话号码                     |
| phoneWithShortNum | --                                                                                                | 更弱的电话号码验证                     |
| projectCode       | --                                                                                                | 投资项目统一代码                       |

### 验证规则配置项

部分规则具备更详细的配置项，比如 `number` 类型，可以配置 `min` 和 `max` 来限制数值的范围， 字符串类型可以配置 `min` 和 `max` 来限制字符串的长度。详细配置如下：

:::details Options 说明

各个内置的验证规则的 `options` 类型定义如下。

```ts
interface IsNumberOptions {
  min?: number; // 最小值
  max?: number; // 最大值
}

interface LengthOptions {
  min?: number; // 最小长度
  max?: number; // 最大长度
  asciiDouble?: boolean; // 是否将非ascii字符长度计为2
}

interface IsEnumOptions {
  enums: Array<any>; // 选项列表， eg：['a', 'b', 'c]
  strict?: boolean; // 是否严格匹配
  /**
   * 自定义的比较器，配置了将使用此函数的返回值作为判断依据
   * 第一个参数为 迭代器当前值，第二个参数为当前的验证的值
   *
   * @memberof IsEnumOptions
   */
  compare?: (a: any, b: any) => boolean;
}

interface IsDateOptions {
  /**
   * @default false
   */
  format?: string | undefined;
  /**
   * If strictMode is set to true,
   * the validator will reject inputs different from format.
   *
   * @default false
   */
  strictMode?: boolean | undefined;
  /**
   * `delimiters` is an array of allowed date delimiters
   *
   * @default ['/', '-']
   */
  delimiters?: string[] | undefined;
}
interface IsURLOptions {
  /**
   * @default ['http','https','ftp']
   */
  protocols?: string[] | undefined;
  /**
   * @default true
   */
  require_tld?: boolean | undefined;
  /**
   * @default false
   */
  require_protocol?: boolean | undefined;
  /**
   * @default true
   */
  require_host?: boolean | undefined;
  /**
   * if set as true isURL will check if port is present in the URL
   * @default false
   */
  require_port?: boolean | undefined;
  /**
   * @default true
   */
  require_valid_protocol?: boolean | undefined;
  /**
   * @default false
   */
  allow_underscores?: boolean | undefined;
  /**
   * @default false
   */
  host_whitelist?: Array<string | RegExp> | undefined;
  /**
   * @default false
   */
  host_blacklist?: Array<string | RegExp> | undefined;
  /**
   * @default false
   */
  allow_trailing_dot?: boolean | undefined;
  /**
   * @default false
   */
  allow_protocol_relative_urls?: boolean | undefined;
  /**
   * @default false
   */
  disallow_auth?: boolean | undefined;
  /**
   * @default true
   */
  allow_fragments?: boolean | undefined;
  /**
   * @default true
   */
  allow_query_components?: boolean | undefined;
  /**
   * @default true
   */
  validate_length?: boolean | undefined;
}

interface IsEmailOptions {
  /**
   * If `allow_display_name` is set to `true`, the validator will also match `Display Name <email-address>`.
   *
   * @default false
   */
  allow_display_name?: boolean | undefined;
  /**
   * If `require_display_name` is set to `true`, the validator will reject strings without the format `Display Name <email-address>`.
   *
   * @default false
   */
  require_display_name?: boolean | undefined;
  /**
   * If `allow_utf8_local_part` is set to `false`, the validator will not allow any non-English UTF8 character in email address' local part.
   *
   * @default true
   */
  allow_utf8_local_part?: boolean | undefined;
  /**
   * If `require_tld` is set to `false`, e-mail addresses without having TLD in their domain will also be matched.
   *
   * @default true
   */
  require_tld?: boolean | undefined;
  /**
   * If `ignore_max_length` is set to `true`, the validator will not check for the standard max length of an email.
   *
   * @default false
   */
  ignore_max_length?: boolean | undefined;
  /**
   * If `allow_ip_domain` is set to `true`, the validator will allow IP addresses in the host part.
   *
   * @default false
   */
  allow_ip_domain?: boolean | undefined;
  /**
   * If `domain_specific_validation` is `true`, some additional validation will be enabled,
   * e.g. disallowing certain syntactically valid email addresses that are rejected by GMail.
   *
   * @default false
   */
  domain_specific_validation?: boolean | undefined;
  /**
   *  If host_blacklist is set to an array of strings
   *  and the part of the email after the @ symbol matches one of the strings defined in it,
   *  the validation fails.
   */
  host_blacklist?: string[] | undefined;
  /**
   * If host_whitelist is set to an array of strings
   * and the part of the email after the @ symbol matches none of the strings defined in it,
   * the validation fails.
   */
  host_whitelist?: string[] | undefined;
  /**
   *  If blacklisted_chars receives a string, then the validator will reject emails that include
   *  any of the characters in the string, in the name part.
   */
  blacklisted_chars?: string | undefined;
}

type IDCardOptions = {
  ignoreX: boolean; // 是否忽略X的大小写
};

interface PatternValidatoroptions {
  regexp: RegExp; // 要匹配的正则表达
}

interface IsF9FloatOptions {
  min?: number; // 最小值
  max?: number; // 最大值
  maxDecimalLength?: number; // 小数部分最大长度
  maxLength?: number; // 总的长度限制
}

export interface IsF9IntOptions {
  min?: number; // 最小值
  max?: number; // 最大值
}
```

:::

> **💡 提示**
>
> 如果不想基于输入事件触发验证器，请在相应的输入类型组件（`<e-input>`，`<e-radio>`，`<e-select>`，...）上将 `validate-event` 属性设置为 `false`。