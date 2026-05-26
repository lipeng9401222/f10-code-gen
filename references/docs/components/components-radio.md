---
title: Radio 单选框
originUrl: http://192.168.219.170/docs/vue/latest/component/component/radio.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

# Radio 单选框

单选组件，用于在多个选项中进行单选选择。

## 基本用法

单选框不应该有太多的选项。否则，请使用 Select 组件。

**Demo 示例**: `radio/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

```vue
<template>
  <div class="mb-2 flex items-center text-sm">
    <e-radio-group v-model="radio1" class="ml-4">
      <e-radio value="1" size="large">Option 1</e-radio>
      <e-radio value="2" size="large">Option 2</e-radio>
    </e-radio-group>
  </div>
  <div class="my-2 flex items-center text-sm">
    <e-radio-group v-model="radio2" class="ml-4">
      <e-radio value="1">Option 1</e-radio>
      <e-radio value="2">Option 2</e-radio>
    </e-radio-group>
  </div>
  <div class="my-4 flex items-center text-sm">
    <e-radio-group v-model="radio3" class="ml-4">
      <e-radio value="1" size="small">Option 1</e-radio>
      <e-radio value="2" size="small">Option 2</e-radio>
    </e-radio-group>
  </div>
  <div class="mb-2 flex items-center text-sm">
    <e-radio-group v-model="radio3" disabled class="ml-4">
      <e-radio value="1" size="small">Option 1</e-radio>
      <e-radio value="2" size="small">Option 2</e-radio>
    </e-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('1');
const radio2 = ref('1');
const radio3 = ref('1');
</script>

```

## 自定义渲染内容

**Demo 示例**: `radio/custom-render`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

```vue
<template>
  <div class="mb-2 flex items-center text-sm">
    <e-radio-group v-model="checked2" :options="options" :render="customRender" />
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

const checked2 = ref([]);
const options = ref([
  {
    value: 1,
    label: '农业银行',
    contentStyle: 'color: #009C96;display:flex;line-height:22px',
    svg: `<svg t="1750731290595" class="icon" viewBox="0 0 1325 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1387" width="22" height="22"><path d="M635.482353 349.364706c-9.035294 0-16.564706-6.023529-18.070588-15.058824-3.011765-28.611765 0-58.729412 0-88.847058V120.470588c0-4.517647-1.505882-30.117647 1.505882-30.117647h91.858824c3.011765 0 1.505882 54.211765 1.505882 60.235294v156.611765c0 6.023529 3.011765 18.070588 0 22.588235 0 3.011765-1.505882 7.529412-3.011765 10.541177-4.517647 9.035294-19.576471 7.529412-27.105882 7.529412-16.564706 1.505882-30.117647 1.505882-46.682353 1.505882z m134.023529-249.976471C944.188235 144.564706 1076.705882 301.176471 1084.235294 486.4c13.552941 218.352941-149.082353 414.117647-364.423529 444.235294-237.929412 31.623529-462.305882-149.082353-477.364706-391.529412-13.552941-201.788235 121.976471-390.023529 317.741176-438.211764v231.905882c0 25.6-1.505882 39.152941 27.105883 39.152941 15.058824 0 30.117647-1.505882 45.17647 0 25.6 1.505882 21.082353 24.094118 21.082353 45.176471v96.37647c-9.035294-18.070588-42.164706-10.541176-57.223529-10.541176H542.117647c-12.047059-1.505882-16.564706-7.529412-18.070588-18.070588v-60.235294V210.823529C406.588235 263.529412 329.788235 384 329.788235 513.505882c0 164.141176 124.988235 310.211765 289.129412 332.8V670.117647c0-7.529412 3.011765-16.564706-6.023529-16.564706h-45.176471c-13.552941 0-40.658824 4.517647-43.670588-15.058823-1.505882-10.541176 0-22.588235 0-33.129412v-99.388235c0 7.529412 3.011765 15.058824 12.047059 16.564705 21.082353 4.517647 48.188235 0 69.270588 0 15.058824 0 46.682353-7.529412 51.2 13.552942 3.011765 13.552941 0 27.105882 0 40.658823v66.258824c0 6.023529 0 6.023529 4.517647 9.035294 3.011765 1.505882 10.541176 0 15.058823 0v-85.835294c0-15.058824-6.023529-45.176471 18.070589-45.176471 22.588235-3.011765 48.188235 0 70.77647 0 15.058824 0 43.670588 6.023529 42.164706-18.070588v88.847059c0 10.541176-4.517647 33.129412 0 42.164706 13.552941 30.117647-79.811765 15.058824-88.847059 18.070588-6.023529 1.505882-3.011765-1.505882-4.517647 6.023529-1.505882 3.011765 0 9.035294 0 12.047059V844.8C873.411765 822.211765 999.905882 677.647059 999.905882 512c0-129.505882-76.8-249.976471-192.752941-304.188235v240.941176c0 4.517647-3.011765 30.117647 0 33.129412 0 9.035294-4.517647 18.070588-15.058823 18.070588-22.588235 4.517647-51.2 0-73.788236 0-15.058824 0-36.141176-6.023529-43.670588 10.541177v-85.835294c0-15.058824-7.529412-49.694118 12.047059-54.211765 18.070588-6.023529 79.811765 12.047059 82.823529-15.058824 4.517647-39.152941 0-84.329412 0-124.988235V99.388235z" fill="#009C96" p-id="1388"></path></svg>`,
  },
  {
    value: 2,
    label: '建设银行',
    contentStyle: 'color: #004F9C; display:flex;line-height:22px',
    svg: `<svg t="1750731719388" class="icon" viewBox="0 0 1325 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1653" width="22" height="22"><path d="M1043.576471 537.6s10.541176-1.505882 15.058823 1.505882c6.023529 3.011765 4.517647 4.517647 4.517647 7.529412C1055.623529 761.976471 874.917647 933.647059 659.576471 933.647059 441.223529 933.647059 256 755.952941 256 533.082353c0-197.270588 143.058824-362.917647 337.317647-396.047059 21.082353-3.011765 78.305882-7.529412 129.505882 43.670588l242.447059 239.435294-84.329412 84.329412s-12.047059 9.035294-19.57647 7.529412c-7.529412-1.505882-15.058824-10.541176-15.058824-10.541176l-180.705882-179.2c-3.011765-3.011765-7.529412-3.011765-10.541176 0L450.258824 525.552941c-3.011765 3.011765-3.011765 7.529412 0 10.541177L656.564706 737.882353c3.011765 3.011765 7.529412 3.011765 10.541176 0l194.258824-189.741177s9.035294-7.529412 12.047059-9.035294c4.517647-1.505882 15.058824-1.505882 15.058823-1.505882h155.105883z m-256-364.423529c-60.235294-67.764706-115.952941-69.270588-115.952942-69.270589s138.541176-58.729412 260.517647 63.247059l129.505883 129.505883s9.035294 7.529412 7.529412 12.047058c-3.011765 9.035294-7.529412 18.070588-7.529412 18.070589l-60.235294 57.223529-213.835294-210.823529z" fill="#004F9C" p-id="1654"></path></svg>`,
  },
  {
    value: 3,
    label: '招商银行',
    contentStyle: 'color: #E50012; display:flex;line-height:22px',
    svg: `<svg t="1750731733335" class="icon" viewBox="0 0 1325 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1805" width="22" height="22"><path d="M999.905882 688.188235l-9.035294-33.129411h75.294118C1005.929412 814.682353 847.811765 933.647059 665.6 933.647059 432.188235 933.647059 240.941176 746.917647 240.941176 513.505882S432.188235 93.364706 671.623529 90.352941c191.247059 0 352.376471 126.494118 406.588236 301.176471H889.976471L787.576471 137.035294 662.588235 427.670588 543.623529 137.035294 319.247059 682.164706l90.352941 129.505882h502.964706l87.341176-123.482353zM902.023529 436.705882l-6.023529-21.082353h182.211765c0 9.035294 3.011765 12.047059 3.011764 21.082353H902.023529zM623.435294 679.152941L737.882353 391.529412l118.964706 295.152941-472.847059-6.023529L501.458824 391.529412l121.97647 287.623529z m290.635294-201.788235l-9.035294-21.082353h176.188235c3.011765 10.541176 3.011765 13.552941 3.011765 21.082353H914.070588z m33.129412 79.811765l-9.035294-21.082353H1084.235294V557.176471h-137.035294z m137.035294-58.729412v21.082353H929.129412l-9.035294-21.082353H1084.235294z m-105.411765 137.035294l-9.035294-21.082353h102.4c0 9.035294-3.011765 12.047059-3.011764 21.082353h-90.352942z m-16.564705-42.164706l-9.035295-21.082353h124.988236c0 9.035294-3.011765 12.047059-3.011765 21.082353h-112.941176z" fill="#E50012" p-id="1806"></path></svg>`,
  },
]);

type BankItem = {
  value: string | number; // value
  label: string; // label
  disable?: boolean; // disabled
  contentStyle: string;
  svg: string; // SVG图标
};

const customRender = (itemData: BankItem) => {
  return h(
    'div',
    {
      style: itemData.contentStyle,
    },
    [
      // 使用innerHTML渲染SVG
      h('div', { innerHTML: itemData.svg, style: 'display: flex; align-items: center;' }),
      h('span', ` ${itemData.label}`),
    ]
  );
};
</script>

```

## 禁用状态

`disabled` 属性用于禁用单选框。

**Demo 示例**: `radio/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

```vue
<template>
  <e-radio v-model="radio" disabled value="disabled">Option A</e-radio>
  <e-radio v-model="radio" disabled value="selected and disabled">Option B</e-radio>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref('selected and disabled');
</script>

```

## 单选按钮组

适用于从一些互斥的选项中进行选择。

**Demo 示例**: `radio/radio-button-group`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

```vue
<template>
  <e-radio-group v-model="radio">
    <e-radio :value="3">Option A</e-radio>
    <e-radio :value="6">Option B</e-radio>
    <e-radio :value="9">Option C</e-radio>
  </e-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref(3);
</script>

```

## 按钮样式

单选框的按钮样式。

**Demo 示例**: `radio/button-style`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

```vue
<template>
  <div>
    <e-radio-group v-model="radio1" size="large">
      <e-radio-button label="New York" value="New York" />
      <e-radio-button label="Washington" value="Washington" />
      <e-radio-button label="Los Angeles" value="Los Angeles" />
      <e-radio-button label="Chicago" value="Chicago" />
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio2">
      <e-radio-button label="New York" value="New York" />
      <e-radio-button label="Washington" value="Washington" />
      <e-radio-button label="Los Angeles" value="Los Angeles" />
      <e-radio-button label="Chicago" value="Chicago" />
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio3" size="small">
      <e-radio-button label="New York" value="New York" />
      <e-radio-button label="Washington" value="Washington" />
      <e-radio-button label="Los Angeles" value="Los Angeles" />
      <e-radio-button label="Chicago" value="Chicago" />
    </e-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('New York');
const radio2 = ref('New York');
const radio3 = ref('New York');
</script>

```

## 块级样式

当设置 `block` 属性为 `true` 时，单选按钮组的宽度将充满父容器。该属性仅对 `e-radio-button` 有效。

**Demo 示例**: `radio/block-style`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

```vue
<template>
  <div>
    <p>普通按钮组：</p>
    <e-radio-group v-model="radio1">
      <e-radio-button label="上海" value="Shanghai" />
      <e-radio-button label="北京" value="Beijing" />
      <e-radio-button label="广州" value="Guangzhou" />
      <e-radio-button label="深圳" value="Shenzhen" />
    </e-radio-group>

    <p>块级按钮组（宽度充满父容器）：</p>
    <e-radio-group v-model="radio2" block>
      <e-radio-button label="上海" value="Shanghai" />
      <e-radio-button label="北京" value="Beijing" />
      <e-radio-button label="广州" value="Guangzhou" />
      <e-radio-button label="深圳" value="Shenzhen" />
    </e-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('Shanghai');
const radio2 = ref('Shanghai');
</script>

```

## 通过数据创建组

如果有一组数据则可以直接通过数据生成

**Demo 示例**: `radio/options`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

```vue
<template>
  <div>
    <e-button @click="add">新增选项</e-button>

    <e-form v-model="formData">
      <e-form-item label="选项" props="radio">
        <e-radio-group v-model="formData.radio" :options="data" />
      </e-form-item>
      <e-form-item label="选项" props="radio">
        <e-radio-group v-model="formData.radio" :options="data" option-type="button" />
      </e-form-item>

      <e-alert type="info" show-icon :closable="false">
        <p>自己写标签时优先级更高,options 不会生效</p>
      </e-alert>
      <e-form-item label="选项" props="radio">
        <e-radio-group v-model="formData.radio" :options="data">
          <e-radio value="1">1</e-radio>
          <e-radio value="2">2</e-radio>
          <e-radio value="3">3</e-radio>
        </e-radio-group>
      </e-form-item>
    </e-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const _data = Array.from({ length: 10 })
  .fill(0)
  .map((_, i) => ({
    label: `选项${i + 1}`,
    value: `${i + 1}`,
    disabled: false,
  }));
_data[0].disabled = true;
_data[2].disabled = true;
_data[4].disabled = true;
const data = reactive(_data);

const formData = reactive({
  radio: '1',
  check: ['1', '2', '3'],
});

function add() {
  const i = data.length + 1;
  data.push({
    label: `选项${i}`,
    value: `${i}`,
    disabled: false,
  });
  console.log(data);
}
</script>

```

## 垂直排列

通过设置 `direction` 属性为 `vertical` 可以实现垂直排列的单选框组。

**Demo 示例**: `radio/vertical-direction`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

```vue
<template>
  <div>
    <p>水平排列（默认）：</p>
    <e-radio-group v-model="radio1">
      <e-radio :value="1">选项 A</e-radio>
      <e-radio :value="2">选项 B</e-radio>
      <e-radio :value="3">选项 C</e-radio>
    </e-radio-group>

    <p>垂直排列：</p>
    <e-radio-group v-model="radio2" direction="vertical">
      <e-radio :value="1">选项 A</e-radio>
      <e-radio :value="2">选项 B</e-radio>
      <e-radio :value="3">选项 C</e-radio>
    </e-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref(1);
const radio2 = ref(1);
</script>

```

## 带边框

**Demo 示例**: `radio/with-borders`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/radio.html)

```vue
<template>
  <div>
    <e-radio-group v-model="radio1">
      <e-radio value="1" size="large" border>Option A</e-radio>
      <e-radio value="2" size="large" border>Option B</e-radio>
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio2">
      <e-radio value="1" border>Option A</e-radio>
      <e-radio value="2" border>Option B</e-radio>
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio3" size="small">
      <e-radio value="1" border>Option A</e-radio>
      <e-radio value="2" border disabled>Option B</e-radio>
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio4" size="small" disabled>
      <e-radio value="1" border>Option A</e-radio>
      <e-radio value="2" border>Option B</e-radio>
    </e-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('1');
const radio2 = ref('1');
const radio3 = ref('1');
const radio4 = ref('1');
</script>

```

## Radio API

### Radio Attributes

| Name                  | Description              | Type                                     | Default |
| --------------------- | ------------------------ | ---------------------------------------- | ------- |
| model-value / v-model | 绑定的值                 | ^[string] / ^[number] / ^[boolean]       | —       |
| value                 | 单选框的值               | ^[string] / ^[number] / ^[boolean]       | —       |
| label                 | 单选框的值               | string                                   | —       |
| disabled              | 单选框是否禁用           | ^[boolean]                               | false   |
| border                | 是否在单选框周围添加边框 | ^[boolean]                               | false   |
| size                  | 单选框的尺寸             | ^[enum]`'large' \| 'default' \| 'small'` | —       |
| name                  | 原生 `name` 属性         | ^[string]                                | —       |

### Radio Events

| Name   | Description          | Type                                                      |
| ------ | -------------------- | --------------------------------------------------------- |
| change | 绑定值发生变化时触发 | ^[Function]`(value: string \| number \| boolean) => void` |

### Radio Slots

| Name    | Description    |
| ------- | -------------- |
| default | 自定义默认内容 |

## RadioGroup API

### RadioGroup Attributes

| Name                  | Description                          | Type                                | Default |
| --------------------- | ------------------------------------ | ----------------------------------- | ------- |
| model-value / v-model | 绑定的值                             | ^[string] / ^[number] / ^[boolean]  | —       |
| size                  | 单选按钮或带边框的单选框的尺寸       | ^[string]                           | default |
| disabled              | 是否禁用嵌套的单选框                 | ^[boolean]                          | false   |
| text-color            | 按钮激活时的字体颜色                 | ^[string]                           | #ffffff |
| fill                  | 按钮激活时的边框和背景颜色           | ^[string]                           | #409EFF |
| validate-event        | 是否触发表单验证                     | ^[boolean]                          | true    |
| label ^(a11y)         | 与 RadioGroup 中的 `aria-label` 相同 | ^[string]                           | —       |
| name                  | 原生 `name` 属性                     | ^[string]                           | —       |
| id                    | 原生 `id` 属性                       | ^[string]                           | —       |
| options               | 用来生成选项的数组                   | ^[Array]`string[] \| number[] \| Array<{ label: string value: string disabled?: boolean }>` | —       |
| render        | 自定义渲染内容，优先级大于 `slot`   | ^[Function]`() => VNode`                        | —       |
| option-type      | 用于设置 Radio options 类型，仅在使用 options 配置生成时有效 | ^[enum]`'default' \| 'button'`  | default      |
| direction | 设置 Radio 的排列方向 | ^[enum]`'horizontal' \| 'vertical'` | horizontal |
| block | 当设置为 true 时，宽度将充满父容器 | ^[boolean] | false |

### RadioGroup Events

| Name   | Description          | Type                                                      |
| ------ | -------------------- | --------------------------------------------------------- |
| change | 绑定值发生变化时触发 | ^[Function]`(value: string \| number \| boolean) => void` |

### RadioGroup Slots

| Name    | Description    | Subtags             |
| ------- | -------------- | ------------------- |
| default | 自定义默认内容 | Radio / RadioButton |

## RadioButton API

### RadioButton Attributes

| Name     | Description      | Type                               | Default |
| -------- | ---------------- | ---------------------------------- | ------- |
| value    | 单选框的值       | ^[string] / ^[number] / ^[boolean] | —       |
| label    | 单选框的文本     | string                             | —       |
| disabled | 单选框是否禁用   | ^[boolean]                         | false   |
| name     | 原生 'name' 属性 | ^[string]                          | —       |

### RadioButton Slots

| Name    | Description    |
| ------- | -------------- |
| default | 自定义默认内容 |