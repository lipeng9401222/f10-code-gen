---
title: Checkbox
originUrl: http://192.168.219.170/docs/vue/latest/component/component/checkbox.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

# Checkbox 多选框

一组用于多选的选项。

## 基本用法

复选框可以单独使用，用于在两个状态之间切换。

**Demo 示例**: `checkbox/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <div>
    <e-checkbox v-model="checked1" label="选项 1" size="large" />
    <e-checkbox v-model="checked2" label="选项 2" size="large" />
  </div>
  <div>
    <e-checkbox v-model="checked3" label="选项 1" />
    <e-checkbox v-model="checked4" label="选项 2" />
  </div>
  <div>
    <e-checkbox v-model="checked5" label="选项 1" size="small" />
    <e-checkbox v-model="checked6" label="选项 2" size="small" />
  </div>
  <div>
    <e-checkbox v-model="checked5" label="选项 1" size="small" disabled />
    <e-checkbox v-model="checked6" label="选项 2" size="small" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(false);
const checked4 = ref(false);
const checked5 = ref(false);
const checked6 = ref(false);
</script>

```

## 自定义内容

**Demo 示例**: `checkbox/custom-render`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <div class="mb-2 flex items-center text-sm">
    <e-checkbox-group v-model="checked1" :options="options" :render="customRender" />
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

const checked1 = ref([]);
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

复选框的禁用状态。

**Demo 示例**: `checkbox/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <e-checkbox v-model="checked1" disabled>Disabled</e-checkbox>
  <e-checkbox v-model="checked2">Not disabled</e-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checked1 = ref(false);
const checked2 = ref(true);
</script>

```

## 复选框组

用于多个复选框绑定在一组中，并通过检查是否选中来指示是否选中一个选项。

**Demo 示例**: `checkbox/grouping`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <e-checkbox-group v-model="checkList">
    <e-checkbox value="A" label="选项 A" />
    <e-checkbox value="B" label="选项 B" />
    <e-checkbox value="C" label="选项 C" />
    <e-checkbox value="D" label="禁用的" disabled />
    <e-checkbox value="E" label="禁用的 已被勾选" disabled />
  </e-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkList = ref(['E', 'A']);
</script>

```

## 垂直排布

复选框组可以垂直排布。

**Demo 示例**: `checkbox/vertical`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <div>
    <p class="mb-2">水平排布（默认）：</p>
    <e-checkbox-group v-model="checkList1">
      <e-checkbox value="A" label="选项 A" />
      <e-checkbox value="B" label="选项 B" />
      <e-checkbox value="C" label="选项 C" />
      <e-checkbox value="D" label="禁用的" disabled />
      <e-checkbox value="E" label="禁用的 已被勾选" disabled />
    </e-checkbox-group>

    <p class="mt-4 mb-2">垂直排布：</p>
    <e-checkbox-group v-model="checkList2" direction="vertical">
      <e-checkbox value="A" label="选项 A" />
      <e-checkbox value="B" label="选项 B" />
      <e-checkbox value="C" label="选项 C" />
      <e-checkbox value="D" label="禁用的" disabled />
      <e-checkbox value="E" label="禁用的 已被勾选" disabled />
    </e-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkList1 = ref(['E', 'A']);
const checkList2 = ref(['E', 'A']);
</script>

<style scoped>
.mb-2 {
  margin-bottom: 8px;
}
.mt-4 {
  margin-top: 16px;
}
</style>

```

## 不定状态

`indeterminate` 属性可以帮助您实现“全选”效果。

**Demo 示例**: `checkbox/intermediate`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <e-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check all</e-checkbox>
  <e-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <e-checkbox v-for="city in cities" :key="city" :value="city" :label="city">{{ city }}</e-checkbox>
  </e-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedCities = ref(['Shanghai', 'Beijing']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};
</script>

```

## 最小/最大项已选

`min` 和 `max` 属性可以帮助您限制已选项的数量。

**Demo 示例**: `checkbox/limitation`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <e-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <e-checkbox v-for="city in cities" :key="city" :label="city" :value="city">{{ city }}</e-checkbox>
  </e-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkedCities = ref(['Shanghai', 'Beijing']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
</script>

```

## 按钮样式

带有按钮样式的复选框。

**Demo 示例**: `checkbox/button-style`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <div>
    <e-checkbox-group v-model="checkboxGroup1" size="large">
      <e-checkbox-button v-for="city in cities" :key="city" :value="city" :label="city">
        {{ city }}
      </e-checkbox-button>
    </e-checkbox-group>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group v-model="checkboxGroup2">
      <e-checkbox-button v-for="city in cities" :key="city" :value="city" :label="city">{{ city }}</e-checkbox-button>
    </e-checkbox-group>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group v-model="checkboxGroup3" size="small">
      <e-checkbox-button
        v-for="city in cities"
        :key="city"
        :value="city"
        :label="city"
        :disabled="city === 'Beijing'"
        >{{ city }}</e-checkbox-button
      >
    </e-checkbox-group>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group v-model="checkboxGroup4" size="small" disabled>
      <e-checkbox-button v-for="city in cities" :key="city" :value="city" :label="city">{{ city }}</e-checkbox-button>
    </e-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkboxGroup1 = ref(['Shanghai']);
const checkboxGroup2 = ref(['Shanghai']);
const checkboxGroup3 = ref(['Shanghai']);
const checkboxGroup4 = ref(['Shanghai']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
</style>

```

## 块级显示

设置 `block` 属性可以让复选框组充满父容器的宽度。该属性仅对 `e-checkbox-button` 有效。

**Demo 示例**: `checkbox/block-style`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <div>
    <e-checkbox-group v-model="checkboxGroup1" size="large" block>
      <e-checkbox-button v-for="city in cities" :key="city" :value="city" :label="city">
        {{ city }}
      </e-checkbox-button>
    </e-checkbox-group>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group v-model="checkboxGroup2" block>
      <e-checkbox-button v-for="city in cities" :key="city" :value="city" :label="city">{{ city }}</e-checkbox-button>
    </e-checkbox-group>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group v-model="checkboxGroup3" size="small" block>
      <e-checkbox-button
        v-for="city in cities"
        :key="city"
        :value="city"
        :label="city"
        :disabled="city === 'Beijing'"
        >{{ city }}</e-checkbox-button
      >
    </e-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkboxGroup1 = ref(['Shanghai']);
const checkboxGroup2 = ref(['Shanghai']);
const checkboxGroup3 = ref(['Shanghai']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
</style>

```

## 通过数据创建组

如果有一组数据则可以直接通过数据生成

**Demo 示例**: `checkbox/options`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <div class="demo-checkbox-group-with-data">
    <e-button @click="add">新增选项</e-button>

    <e-form v-model="formData">
      <e-form-item label="选项" props="check">
        <e-checkbox-group v-model="formData.check" :options="data" />
      </e-form-item>
      <e-form-item label="选项(自定义渲染)" props="check">
        <e-checkbox-group v-model="formData.check" class="diy-checkbox-group" :options="data" :render="customRender" />
      </e-form-item>
      <e-form-item label="选项按钮" props="check">
        <e-checkbox-group v-model="formData.check" :options="data" option-type="button" />
      </e-form-item>

      <e-alert type="info" show-icon :closable="false">
        <p>自己写标签时优先级更高,options 不会生效</p>
      </e-alert>
      <e-form-item label="选项" props="check">
        <e-checkbox-group v-model="formData.check" :options="data">
          <e-checkbox value="1">1</e-checkbox>
          <e-checkbox value="2">2</e-checkbox>
          <e-checkbox value="3">3</e-checkbox>
        </e-checkbox-group>
      </e-form-item>
    </e-form>
  </div>
</template>

<script lang="ts" setup>
import { h, reactive } from 'vue';
const _data = Array.from({ length: 5 })
  .fill(0)
  .map((_, i) => ({
    label: `选项${i + 1}`,
    value: `${i + 1}`,
    disabled: false,
    contentStyle: `color: red; font-size: ${20 - i * 2}px; opacity: ${1 - (i + 1) * 0.1}`,
  }));
_data[0].disabled = true;
_data[2].disabled = true;
_data[4].disabled = true;
const data = reactive(_data);

const formData = reactive({
  check: ['1', '2', '3'],
});

const customRender = (itemData) => {
  console.log(itemData);
  return h(
    'div',
    {
      style: itemData.contentStyle,
    },
    [h('span', { class: 'diy-index' }), h('span', ` ${itemData.label}`)]
  );
};

function add() {
  const i = data.length + 1;
  const j = i % 5;
  const contentStyle = `color: red; font-size: ${20 - j * 2}px; opacity: ${1 - (j + 1) * 0.1}`;
  data.push({
    label: `选项${i}`,
    value: `${i}`,
    disabled: false,
    contentStyle,
  });
  console.log(data);
}
</script>

<style lang="scss">
.demo-checkbox-group-with-data {
  .diy-checkbox-group {
    counter-reset: diy-counter;
  }

  .diy-index {
    counter-increment: diy-counter;
  }

  .diy-index::before {
    content: counter(diy-counter) '. ';
    font-weight: bold;
  }
}
</style>

```

## 带边框

**Demo 示例**: `checkbox/with-border`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <div>
    <e-checkbox v-model="checked1" label="Option1" size="large" border />
    <e-checkbox v-model="checked2" label="Option2" size="large" border />
  </div>
  <div class="mt-4">
    <e-checkbox v-model="checked3" label="Option1" border />
    <e-checkbox v-model="checked4" label="Option2" border />
  </div>
  <div class="mt-4">
    <e-checkbox-group v-model="checkboxGroup1" size="small">
      <e-checkbox label="选项1" value="Option1" border />
      <e-checkbox label="选项2" value="Option2" border />
    </e-checkbox-group>
  </div>
  <div class="mt-4">
    <e-checkbox-group v-model="checkboxGroup1" size="small">
      <e-checkbox label="选项1" value="Option1" border disabled />
      <e-checkbox label="选项2" value="Option2" border disabled />
    </e-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(false);
const checked4 = ref(true);
const checkboxGroup1 = ref(['Option1']);
</script>

```

## 跳出组

在 `checkbox-group` 内部的 checkbox 会自动组合成一组，但有时我们需要某个 checkbox 不参与组合。通过设置 `skip-group` 属性可以让 checkbox 跳出组合，作为独立的 checkbox 使用。

**Demo 示例**: `checkbox/skip-group`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/checkbox.html)

```vue
<template>
  <e-checkbox-group v-model="checkList">
    <e-checkbox value="A" label="选项 A" />
    <e-checkbox value="B" label="选项 B" />
    <e-checkbox value="C" label="选项 C" />
    <e-checkbox v-model="independentValue" value="D" label="跳出组" :skip-group="true" />
  </e-checkbox-group>

  <e-button @click="onSubmit">提交</e-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkList = ref([]);

const independentValue = ref(false);

const onSubmit = () => {
  console.log(checkList.value, independentValue.value);
};
</script>

```

## Checkbox API

### Checkbox Attributes

| Name                  | Description                                                                                                                                                   | Type                                           |Default |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ------ |
| model-value / v-model | 绑定值                                                                                                                                                 | ^[string] / ^[number] / ^[boolean] / ^[object] | —      |
| label                 | checkbox 后的文本                                                                                                                                      | string                                         | —      |
| value                 | 在 `checkbox-group` 内使用时的复选框的值                                                                                                               | ^[string] / ^[number] / ^[boolean] / ^[object] | —      |
| true-value            | 复选框选中时的值                                                                                                                                       | ^[string] / ^[number]                          | —      |
| false-value           | 复选框未选中时的值                                                                                                                                     | ^[string] / ^[number]                          | —      |
| disabled              | 复选框是否被禁用                                                                                                                                       | ^[boolean]                                     | false  |
| skip-group            | 在 checkbox-group 内部时，是否跳出组合，作为独立的 checkbox 使用                                                                                        | ^[boolean]                                     | false  |
| border                | 是否在复选框周围添加边框                                                                                                                               | ^[boolean]                                     | false  |
| size                  | 复选框的大小                                                                                                                                           | ^[enum]`'large' \| 'default' \| 'small'`       | —      |
| name                  | 原生 'name' 属性                                                                                                                                       | ^[string]                                      | —      |
| checked               | 复选框是否被选中                                                                                                                                       | ^[boolean]                                     | false  |
| indeterminate         | 设置不定状态，仅负责样式控制                                                                                                                           | ^[boolean]                                     | false  |
| validate-event        | 是否触发表单验证                                                                                                                                       | ^[boolean]                                     | true   |
| tabindex              | 输入的 tabindex                                                                                                                                        | ^[string] / ^[number]                          | —      |
| id                    | 输入的 id                                                                                                                                              | ^[string]                                      | —      |
| render      | 自定义渲染内容，优先级高于 `slot` | ^[Function]`() => VNode`                                     | —      |
| controls ^(a11y)      | 与 [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls) 相同，在 `indeterminate` 为 `true` 时生效 | ^[boolean]                                     | —      |

### Checkbox Events

| Name   | Description             | Type                                                      |
| ------ | ---------------- | --------------------------------------------------------- |
| change | 绑定值更改时触发 | ^[Function]`(value: string \| number \| boolean) => void` |

### Checkbox Slots

| Name    | Description           |
| ------- | -------------- |
| default | 自定义默认内容 |

## CheckboxGroup API

### CheckboxGroup Attributes

| Name                  | Description                               | Type                                     |Default  |
| --------------------- | ---------------------------------- | ---------------------------------------- | ------- |
| model-value / v-model | 绑定值                             | ^[object]`string[] \| number[]`          | []      |
| size                  | 复选框的大小                       | ^[enum]`'large' \| 'default' \| 'small'` | —       |
| disabled              | 是否禁用嵌套的复选框               | ^[boolean]                               | false   |
| min                   | 最小已选复选框数量                 | ^[number]                                | —       |
| max                   | 最大已选复选框数量                 | ^[number]                                | —       |
| label                 | 屏幕阅读器的标签                   | ^[string]                                | —       |
| text-color            | 按钮处于活动状态时的字体颜色       | ^[string]                                | #ffffff |
| fill                  | 按钮处于活动状态时的边框和背景颜色 | ^[string]                                | #409EFF |
| tag                   | 复选框组的元素标签                 | ^[string]                                | div     |
| validate-event        | 是否触发表单验证                   | ^[boolean]                               | true    |
| direction             | 复选框组的排列方向                 | ^[enum]`'horizontal' \| 'vertical'`      | horizontal |
| options               | 用来生成选项的数组                   | ^[Array]`string[] \| number[] \| Array<{ label: string value: string disabled?: boolean }>` | —       |
| option-type          | 用于设置 Checkbox options 类型，仅在使用 options 配置生成时有效 | ^[enum]`'default' \| 'button'`  | default      |
| block                 | 是否将复选框组渲染为块级元素，使其宽度充满父容器 | ^[boolean]                               | false   |

### CheckboxGroup Events

| Name   | Description             | Type                                               |
| ------ | ---------------- | -------------------------------------------------- |
| change | 绑定值更改时触发 | ^[Function]`(value: string[] \| number[]) => void` |

### CheckboxGroup Slots

| Name    | Description           | Subtags              |
| ------- | -------------- | ------------------- |
| default | 自定义默认内容 | 复选框 / 复选框按钮 |

## CheckboxButton API

### CheckboxButton Attributes

| Name        | Description                                     | Type                                           |Default |
| ----------- | ---------------------------------------- | ---------------------------------------------- | ------ |
| value       | 在 `checkbox-group` 内使用时的复选框的值 | ^[string] / ^[number] / ^[boolean] / ^[object] | —      |
| label       | 显示的文本                               | ^[string] | —      |
| true-value  | 复选框选中时的值                         | ^[string] / ^[number]                          | —      |
| false-value | 复选框未选中时的值                       | ^[string] / ^[number]                          | —      |
| disabled    | 复选框是否被禁用                         | ^[boolean]                                     | false  |
| name        | 原生 'name' 属性                         | ^[string]                                      | —      |
| checked     | 复选框是否被选中                         | ^[boolean]                                     | false  |

### CheckboxButton Slots

| Name    | Description           |
| ------- | -------------- |
| default | 自定义默认内容 |