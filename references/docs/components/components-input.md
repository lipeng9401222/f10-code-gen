---
title: Input 输入框
originUrl: http://192.168.219.170/docs/vue/latest/component/component/input.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/input.html)

# Input 输入框

通过鼠标或键盘输入字符

> **⚠️ 警告**
>
> Input 为受控组件，它 **总会显示 Vue 绑定值**。
> 
> 在正常情况下，`input` 的输入事件应该被正常响应。 它的处理程序应该更新组件的绑定值 (或使用 `v-model`)。 否则，输入框的值将不会改变。
> 
> 不支持 `v-model` 修饰符。

## 基础用法

**Demo 示例**: `input/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-input v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>

```

## 禁用状态

**Demo 示例**: `input/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-input v-model="input" disabled placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>

```

## 一键清空

**Demo 示例**: `input/clearable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-input v-model="input" placeholder="Please input" clearable />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>

```

## 格式化

在 `formatter` 的情况下显示值，我们通常同时使用 `parser`

**Demo 示例**: `input/formatter`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-input
    v-model="input"
    placeholder="Please input"
    :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>

```

## 密码框

**Demo 示例**: `input/password`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-input v-model="input" type="password" placeholder="Please input password" show-password />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>

```

## 带图标的输入框

带有图标标记输入类型

**Demo 示例**: `input/with-icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <div class="demo-input-suffix">
    <e-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center">Using attributes</span>
      <e-input v-model="input1" class="w-50 m-2" placeholder="Pick a date" :suffix-icon="Calendar" />
      <e-input v-model="input2" class="w-50 m-2" placeholder="Type something" :prefix-icon="Search" />
    </e-row>
  </div>
  <div class="demo-input-suffix">
    <e-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center">Using slots</span>
      <e-input v-model="input3" class="w-50 m-2" placeholder="Pick a date">
        <template #suffix>
          <e-icon class="e-input__icon"><calendar /></e-icon>
        </template>
      </e-input>
      <e-input v-model="input4" class="w-50 m-2" placeholder="Type something">
        <template #prefix>
          <e-icon class="e-input__icon"><search /></e-icon>
        </template>
      </e-input>
    </e-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Calendar, Search } from '@epoint-fe/eui-icons';
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');
</script>

```

## 文本域

用于输入多行文本信息可缩放的输入框。 添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

**Demo 示例**: `input/textarea`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const textarea = ref('');
</script>

```

## 自适应文本域

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。 你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。

**Demo 示例**: `input/auto-sizing-textarea`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-input v-model="textarea1" autosize type="textarea" placeholder="Please input" />
  <div style="margin: 20px 0" />
  <e-input v-model="textarea2" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const textarea1 = ref('');
const textarea2 = ref('');
</script>

```

## 复合型输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮。

**Demo 示例**: `input/mixed-input`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <div>
    <e-input v-model="input1" placeholder="Please input">
      <template #prepend>Http://</template>
    </e-input>
  </div>
  <div class="mt-4">
    <e-input v-model="input2" placeholder="Please input">
      <template #append>.com</template>
    </e-input>
  </div>
  <div class="mt-4">
    <e-input v-model="input3" placeholder="Please input" class="input-with-select">
      <template #prepend>
        <e-select v-model="select" placeholder="请选择" style="width: 115px">
          <e-option label="Restaurant" value="1" />
          <e-option label="Order No." value="2" />
          <e-option label="Tel" value="3" />
        </e-select>
      </template>
      <template #append>
        <e-button :icon="Search" />
      </template>
    </e-input>
  </div>
  <div class="mt-4">
    <e-input v-model="input3" placeholder="Please input" class="input-with-select">
      <template #prepend>
        <e-button :icon="Search" />
      </template>
      <template #append>
        <e-select v-model="select" placeholder="请选择" style="width: 115px">
          <e-option label="Restaurant" value="1" />
          <e-option label="Order No." value="2" />
          <e-option label="Tel" value="3" />
        </e-select>
      </template>
    </e-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@epoint-fe/eui-icons';
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const select = ref('');
</script>

<style scoped>
.input-with-select .e-input-group__prepend {
  background-color: var(--e-fill-color-blank);
}
</style>

```

## 尺寸大小{#Size}

**Demo 示例**: `input/various-size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <div class="demo-input-size">
    <e-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" />
    <e-input v-model="input2" class="w-50 m-2" placeholder="Please Input" />
    <e-input v-model="input3" class="w-50 m-2" size="small" placeholder="Please Input" />
  </div>
  <div class="demo-input-size">
    <e-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :suffix-icon="Search" />
    <e-input v-model="input2" class="w-50 m-2" placeholder="Please Input" :suffix-icon="Search" />
    <e-input v-model="input3" class="w-50 m-2" size="small" placeholder="Please Input" :suffix-icon="Search" />
  </div>
  <div class="demo-input-size">
    <e-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :prefix-icon="Search" />
    <e-input v-model="input2" class="w-50 m-2" placeholder="Please Input" :prefix-icon="Search" />
    <e-input v-model="input3" class="w-50 m-2" size="small" placeholder="Please Input" :prefix-icon="Search" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@epoint-fe/eui-icons';
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
</script>

```

## 输入长度限制

**Demo 示例**: `input/length-limiting`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-input v-model="text" maxlength="10" placeholder="Please input" show-word-limit type="text" />
  <div style="margin: 20px 0" />
  <e-input v-model="textarea" maxlength="30" placeholder="Please input" show-word-limit type="textarea" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const text = ref('');
const textarea = ref('');
</script>

```

## 脱敏

文本输入框内置的脱敏和防窥屏的能力，可以对输入内容进行脱敏处理。用户在输入框聚焦时展示实际内容值，取消聚焦时展示脱敏信息。首次进入编辑时，由于没有真实值，值会清空要求全部重新输入

**Demo 示例**: `input/desensitization`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-form label-width="120px">
    <e-form-item label="手机号">
      <e-input v-model="input" placeholder="Please input" :desensitization-type="DESENDATATYPE_MOBILE_PHONE" />
    </e-form-item>

    <e-form-item label="身份证号">
      <e-input v-model="input2" placeholder="Please input" desensitization-type="ID_CARD" />
    </e-form-item>

    <e-button type="primary" @click="getInputValue">获取输入值</e-button>
  </e-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DESENDATATYPE_MOBILE_PHONE, EMessage } from '@epoint-fe/eui-components';

const input = ref('17215683972');
const input2 = ref('612300190001010000');

const getInputValue = () => {
  EMessage.success(`手机号:${input.value}`);
  EMessage.success(`身份证号:${input2.value}`);
};
</script>

```

## 自定义脱敏

**Demo 示例**: `input/desensitization-custom`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input.html)

```vue
<template>
  <e-form label-width="120px">
    <e-form-item label="自定义脱敏">
      <e-input
        v-model="input"
        placeholder="Please input"
        :desensitization-type="DESENDATATYPE_CUSTOM"
        :desensitizer="desensitizer"
      />
    </e-form-item>
    <e-button type="primary" @click="getInputValue">获取输入值</e-button>
  </e-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DESENDATATYPE_CUSTOM, EMessage } from '@epoint-fe/eui-components';

const input = ref('epoint@epoint.com.cn');

const desensitizer = (val) => {
  const index = val.indexOf('@');
  return `****${val.slice(index)}`;
};

const getInputValue = () => {
  EMessage(`输入框值：${input.value}`);
};
</script>

```

## API

### Attributes

| Name                  | Description                                                                                                  | Type                                                                                                                                                | Default |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| type                  | 类型                                                                                                         | ^[string]`'text' \| 'textarea' \| ...` [native input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text    |
| model-value / v-model | 绑定值                                                                                                       | ^[string] / ^[number]                                                                                                                               | —       |
| maxlength             | 最大输入长度                                                                                                 | ^[string] / ^[number]                                                                                                                               | 5000       |
| minlength             | 原生属性，最小输入长度                                                                                       | ^[number]                                                                                                                                           | —       |
| show-word-limit       | 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效                                               | ^[boolean]                                                                                                                                          | false   |
| placeholder           | 输入框占位文本                                                                                               | ^[string]                                                                                                                                           | —       |
| clearable             | 是否显示清除按钮，只有当 type 不是 textarea 时生效                                                           | ^[boolean]                                                                                                                                          | false   |
| formatter             | 指定输入值的格式。(只有当 type 是"text"时才能工作)                                                           | ^[Function]`(value: string \| number) => string`                                                                                                    | —       |
| parser                | 指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)                                                 | ^[Function]`(value: string) => string`                                                                                                              | —       |
| show-password         | 是否显示切换密码图标                                                                                         | ^[boolean]                                                                                                                                          | false   |
| disabled              | 是否禁用                                                                                                     | ^[boolean]                                                                                                                                          | false   |
| size                  | 输入框尺寸，只在 type 不为 'textarea' 时有效                                                                 | ^[enum]`'large' \| 'default' \| 'small'`                                                                                                            | —       |
| prefix-icon           | 自定义前缀图标                                                                                               | ^[string] / ^[Component]                                                                                                                            | —       |
| suffix-icon           | 自定义后缀图标                                                                                               | ^[string] / ^[Component]                                                                                                                            | —       |
| rows                  | 输入框行数，仅 type 为 'textarea' 时有效                                                                     | ^[number]                                                                                                                                           | 2       |
| autosize              | textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: `{ minRows: 2, maxRows: 6 }` | ^[boolean] / ^[object]`{ minRows?: number, maxRows?: number }`                                                                                      | false   |
| autocomplete          | 原生 autocomplete 属性                                                                                       | ^[string]                                                                                                                                           | off     |
| name                  | 等价于原生 input name 属性                                                                                   | ^[string]                                                                                                                                           | —       |
| readonly              | 原生 readonly 属性，是否只读                                                                                 | ^[boolean]                                                                                                                                          | false   |
| max                   | 原生 max 属性，设置最大值                                                                                    | —                                                                                                                                                   | —       |
| min                   | 原生属性，设置最小值                                                                                         | —                                                                                                                                                   | —       |
| step                  | 原生属性，设置输入字段的合法数字间隔                                                                         | —                                                                                                                                                   | —       |
| resize                | 控制是否能被用户缩放                                                                                         | ^[enum]`'none' \| 'both' \| 'horizontal' \| 'vertical'`                                                                                             | —       |
| autofocus             | 原生属性，自动获取焦点                                                                                       | ^[boolean]                                                                                                                                          | false   |
| form                  | 原生属性                                                                                                     | `string`                                                                                                                                            | —       |
| label ^(a11y)         | 等价于原生 input `aria-label` 属性                                                                           | ^[string]                                                                                                                                           | —       |
| tabindex              | 输入框的 tabindex                                                                                            | ^[string] / ^[number]                                                                                                                               | —       |
| validate-event        | 输入时是否触发表单的校验                                                                                     | ^[boolean]                                                                                                                                          | true    |
| input-style           | input 元素或 textarea 元素的 style                                                                           | ^[string] / ^[object]`CSSProperties \| CSSProperties[] \| string[]`                                                                                 | {}      |
| desensitization-type  | 脱敏的数据类型，参考[下面的表格](#desensitizationType)                                                        | ^[enum]`ID_CARD \| MOBILE_PHONE \| CHINESE_NAME \| ……`                                                                                               | -        |
| desensitizer          | 自定义脱敏数据处理方法                                                                                       | ^[Function]`(value: string) => string`                                                                                                               | -        |
| desensitize-reg       | 自定义脱敏正则表达式                                                                                         | `RegExp`                                                                                                                                             | `/(?:)/` |

### Events

| Name   | Description                                                   | Type                                           |
| ------ | ------------------------------------------------------------- | ---------------------------------------------- |
| blur   | 当选择器的输入框失去焦点时触发                                | ^[Function]`(event: FocusEvent) => void`       |
| focus  | 当选择器的输入框获得焦点时触发                                | ^[Function]`(event: FocusEvent) => void`       |
| change | 仅当 modelValue 改变时，当输入框失去焦点或用户按 Enter 时触发 | ^[Function]`(value: string \| number) => void` |
| input  | 在 Input 值改变时触发                                         | ^[Function]`(value: string \| number) => void` |
| clear  | 在点击由 clearable 属性生成的清空按钮时触发                   | ^[Function]`() => void`                        |

### Slots

| Name    | Description                                   |
| ------- | --------------------------------------------- |
| prefix  | 输入框头部内容，只对非 `type="textarea"` 有效 |
| suffix  | 输入框尾部内容，只对非 `type="textarea"` 有效 |
| prepend | 输入框前置内容，只对非 `type="textarea"` 有效 |
| append  | 输入框后置内容，只对非 `type="textarea"` 有效 |

### Exposes

| Name           | Description                 | Type                                                    |
| -------------- | --------------------------- | ------------------------------------------------------- |
| blur           | 使 input 失去焦点           | ^[Function]`() => void`                                 |
| clear          | 清除 input 值               | ^[Function]`() => void`                                 |
| focus          | 使 input 获取焦点           | ^[Function]`() => void`                                 |
| input          | Input HTML 元素             | ^[object]`Ref<HTMLInputElement>`                        |
| ref            | HTML 元素 input 或 textarea | ^[object]`Ref<HTMLInputElement \| HTMLTextAreaElement>` |
| resizeTextarea | 改变 textarea 大小          | ^[Function]`() => void`                                 |
| select         | 选中 input 中的文字         | ^[Function]`() => void`                                 |
| textarea       | HTML textarea 元素          | ^[object]`Ref<HTMLTextAreaElement>`                     |
| textareaStyle  | textarea 的样式             | ^[object]`Ref<StyleValue>`                              |

### 脱敏数据类型 {#desensitizationType}

脱敏数据类型入参如下：

| Export Const                    | ^[Value]`string`        | Description    | Desensitization Rules                                        |
| ------------------------------- | ----------------------- | ------------------       | ------------------------------------------------------------ |
| `DESENDATATYPE_ID_CARD`         |   ID_CARD               |  身份证号脱敏             | 保留后4位                                                     |
| `DESENDATATYPE_MOBILE_PHONE`    |   MOBILE_PHONE          |  手机号脱敏               | 保留前3位和后4位，如果手机号不足11位，则保留前2位和后2位          |
| `DESENDATATYPE_CHINESE_NAME`    |   CHINESE_NAME          |  人名脱敏                 | 保留后1位                                                     |
| `DESENDATATYPE_FIXED_PHONE`     |   FIXED_PHONE           |  固定电话脱敏             | 保留后4位                                                      |
| `DESENDATATYPE_LOGINID`         |   LOGINID               |  登录名脱敏               | 保留后1位                                                     |
| `DESENDATATYPE_BANK_CARD`       |   BANK_CARD             |  银行卡脱敏               | 保留前5位和后4位                                               |
| `DESENDATATYPE_EMAIL`           |   EMAIL                 |  电子邮箱脱敏             | 保留@及之后的信息                                              |
| `DESENDATATYPE_PASSWORD`        |   PASSWORD              |  密码脱敏                 | 全部隐藏                                                      |
| `DESENDATATYPE_ADDRESS`         |   ADDRESS               |  地址脱敏                 | 不足12位保留前面不超过50%，大于12位只保留前6位                  |
| `DESENDATATYPE_CREDENTIAL_DATE` |   CREDENTIAL_DATE       |  证件日期脱敏             | 保留后4位                                                     |
| `DESENDATATYPE_INTELLIGENCE`    |   INTELLIGENCE          |  智能脱敏                 | 小于4位的全脱，否则保留前后各2位                                |
| `DESENDATATYPE_REGEXP`          |   REGEXP                |  自定义脱敏正则           | 自定义脱敏正则,使用`desensitize-reg`入参值进行匹配               |
| `DESENDATATYPE_CUSTOM`          |   CUSTOM                |  自定义脱敏数据处理方法    | 自定义脱敏数据处理方法,使用`desensitizer`入参方法处理原始数据     |