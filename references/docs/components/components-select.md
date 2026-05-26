---
title: Select 选择器
originUrl: http://192.168.219.170/docs/vue/latest/component/component/select.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/select.html)

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

> **💡 提示**
>
> 此组件在服务器端渲染 (例如：[Nuxt](https://nuxt.com/v3)) 和静态生成 (例如：[VitePress](https://vitepress.vuejs.org/)) 中使用时，需要包装在 `<client-only></client-only>` 内。

## 基础用法

**Demo 示例**: `select/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <p>组件插槽</p>
  <e-select v-model="value" class="m-2" placeholder="请选择" size="large">
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
  <e-select v-model="value" class="m-2" placeholder="请选择">
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
  <e-select v-model="value" class="m-2" placeholder="请选择" size="small">
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
  <p>Options 数据绑定</p>
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" size="large" />
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" />
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

```

## 自定义内容

**Demo 示例**: `select/custom-render`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <div class="mb-2 flex items-center text-sm">
    <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" :render="customRender" />
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
    gender: 0,
    contentStyle: 'color: red',
  },
  {
    value: 'Option2',
    label: 'Option2',
    gender: 1,
    contentStyle: 'color: blue',
  },
  {
    value: 'Option3',
    label: 'Option3',
    gender: 0,
    contentStyle: 'color: green',
  },
  {
    value: 'Option4',
    label: 'Option4',
    gender: 1,
    contentStyle: 'color: yellow',
  },
  {
    value: 'Option5',
    label: 'Option5',
    gender: 0,
    contentStyle: 'color: purple',
  },
];

type RemoteDataItem = {
  value: string; // value
  label: string; // label
  disable: boolean; // disabled

  gender: 0 | 1; // 性别
  contentStyle: string;
};

const customRender = (itemData: RemoteDataItem) => {
  return h(
    'div',
    {
      style: itemData.contentStyle,
    },
    [h('span', itemData.gender == 0 ? '男' : '女'), h('span', ` ${itemData.label}`)]
  );
};
</script>

```

## 绑定文本

**Demo 示例**: `select/text`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <p>单选</p>
  <e-select
    v-model="value1"
    v-model:text="text1"
    :options="options1"
    :loading="loading1"
    @visible-change="onVisibleChange1"
  />
  <p>多选</p>
  <e-select
    v-model="value2"
    v-model:text="text2"
    :options="options2"
    :loading="loading2"
    multiple
    @visible-change="onVisibleChange2"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const source = [
  {
    value: '1',
    label: 'Option1',
  },
  {
    value: '2',
    label: 'Option2',
  },
  {
    value: '3',
    label: 'Option3',
  },
  {
    value: '4',
    label: 'Option4',
  },
  {
    value: '5',
    label: 'Option5',
  },
];

const value1 = ref('1');
const text1 = ref('Option1');
const options1 = ref([]);
const loading1 = ref(false);
const onVisibleChange1 = (visible: boolean) => {
  if (visible && options1.value.length === 0) {
    loading1.value = true;
    // 模拟懒加载
    setTimeout(() => {
      options1.value = source;
      loading1.value = false;
    }, 500);
  }
};

const value2 = ref(['2']);
const text2 = ref(['Option2']);
const options2 = ref([]);
const loading2 = ref(false);
const onVisibleChange2 = (visible: boolean) => {
  if (visible && options2.value.length === 0) {
    loading2.value = true;
    // 模拟懒加载
    setTimeout(() => {
      options2.value = source;
      loading2.value = false;
    }, 500);
  }
};
</script>

```

## 禁用选项

**Demo 示例**: `select/disabled-option`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <e-select v-model="value" class="m-2" placeholder="请选择">
    <e-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </e-select>
  <e-select v-model="value" :options="options" placeholder="请选择" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

```

## 禁用选择框

禁用整个组件。

**Demo 示例**: `select/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <e-select v-model="value" disabled placeholder="请选择">
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

```

## 单选可清空

您可以使用清空图标来清除选择。

**Demo 示例**: `select/clearable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <e-select v-model="value" class="m-2" placeholder="请选择">
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
  <e-select v-model="value" class="m-2" :options="options" placeholder="请选择" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

```

## 基本多选

多选使用标签显示已选选项。

**Demo 示例**: `select/multiple`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <div class="m-4">
    <p>default</p>
    <e-select v-model="value1" class="m-2" multiple placeholder="请选择" style="width: 240px">
      <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </e-select>
    <e-select v-model="value1" class="m-2" :options="options" multiple placeholder="请选择" style="width: 240px" />
  </div>
  <div class="m-4">
    <p>use collapse-tags</p>
    <e-select v-model="value2" class="m-2" multiple collapse-tags placeholder="请选择" style="width: 240px">
      <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </e-select>
    <e-select
      v-model="value2"
      class="m-2"
      :options="options"
      multiple
      collapse-tags
      placeholder="请选择"
      style="width: 240px"
    />
  </div>
  <div class="m-4">
    <p>use collapse-tags-tooltip</p>
    <e-select
      v-model="value3"
      class="m-2"
      multiple
      collapse-tags
      collapse-tags-tooltip
      placeholder="请选择"
      style="width: 240px"
    >
      <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </e-select>
    <e-select
      v-model="value3"
      :options="options"
      multiple
      collapse-tags
      class="m-2"
      collapse-tags-tooltip
      placeholder="请选择"
      style="width: 240px"
    />
  </div>
  <div class="m-4">
    <p>use max-collapse-tags</p>
    <e-select
      v-model="value4"
      multiple
      collapse-tags
      class="m-2"
      collapse-tags-tooltip
      :max-collapse-tags="3"
      placeholder="请选择"
      style="width: 240px"
    >
      <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </e-select>
    <e-select
      v-model="value4"
      :options="options"
      multiple
      collapse-tags
      class="m-2"
      collapse-tags-tooltip
      :max-collapse-tags="3"
      placeholder="请选择"
      style="width: 240px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref([]);
const value2 = ref([]);
const value3 = ref([]);
const value4 = ref([]);
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

```

## 自定义模板

您可以为选项自定义 HTML 模板。

**Demo 示例**: `select/custom-template`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <e-select v-model="value" placeholder="请选择">
    <e-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: var(--e-text-color-secondary); font-size: 13px">{{ item.value }}</span>
    </e-option>
  </e-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
];
</script>

```

## 分组显示

以组的方式显示选项。

**Demo 示例**: `select/grouping`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <e-select v-model="value" class="m-2" placeholder="请选择">
    <e-option-group v-for="group in options" :key="group.label" :label="group.label">
      <e-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
    </e-option-group>
  </e-select>
  <e-select v-model="value" class="m-2" :options="options" placeholder="请选择" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    label: 'Popular cities',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
    ],
  },
  {
    label: 'City name',
    options: [
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
];
</script>

```

## 选项过滤

您可以过滤出您所需的选项。

**Demo 示例**: `select/filterable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <e-select v-model="value" class="m-2" filterable placeholder="请选择">
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
  <e-select v-model="value" class="m-2" :option="option" filterable placeholder="请选择" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

```

## 远程搜索

输入关键字并从服务器搜索数据。

**Demo 示例**: `select/remote-search`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <div class="flex flex-wrap">
    <div class="m-4">
      <p>default</p>
      <e-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </e-select>
    </div>
    <div class="m-4">
      <p>use remote-show-suffix</p>
      <e-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        remote-show-suffix
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </e-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface ListItem {
  value: string;
  label: string;
}

const list = ref<ListItem[]>([]);
const options = ref<ListItem[]>([]);
const value = ref<string[]>([]);
const loading = ref(false);

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` };
  });
});

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options.value = [];
  }
};

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
</script>

```

## 创建新项目

创建并选择不包含在选项中的新项目

**Demo 示例**: `select/allow-create`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <e-select
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    :reserve-keyword="false"
    placeholder="Choose tags for your article"
  >
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<string[]>([]);
const options = [
  {
    value: 'HTML',
    label: 'HTML',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
];
</script>

```

## 使用 value-key 属性

如果 Select 的绑定值是一个对象，请确保分配 `value-key` 作为其唯一标识键名。

**Demo 示例**: `select/value-key`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <div class="m-4">
    <e-select v-model="value" class="m-2" value-key="id" placeholder="请选择">
      <e-option v-for="item in options" :key="item.id" :label="item.label" :value="item" />
    </e-select>
    <e-select v-model="value" class="m-2" :options="options" value-key="id" placeholder="请选择" />

    <p>
      selected option's description:
      {{ value ? value.desc : 'no select' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Option = {
  id: number;
  label: string;
  desc: string;
};
const value = ref<Option>();
const options = ref([
  { id: 1, label: 'Option A', desc: 'Option A - 230506' },
  { id: 2, label: 'Option B', desc: 'Option B - 230506' },
  { id: 3, label: 'Option C', desc: 'Option C - 230506' },
  { id: 4, label: 'Option A', desc: 'Option A - 230507' },
]);
</script>

```

## 显示标题

当鼠标悬停在选项上时可以显示选项被省略的内容

**Demo 示例**: `select/show-title`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <p>组件插槽</p>
  <e-select v-model="value" class="m-2" placeholder="请选择" size="large" :fit-input-width="true">
    <e-option v-for="item in options" :key="item.value" :title="item.title" :label="item.label" :value="item.value" />
  </e-select>
  <p>Options 数据绑定</p>
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" size="large" :fit-input-width="true" />
  <p>不设置fitInputWidth</p>
  <e-select v-model="value" class="m-2" placeholder="请选择" size="large">
    <e-option v-for="item in options" :key="item.value" :title="item.title" :label="item.label" :value="item.value" />
  </e-select>
  <e-select v-model="value" :options="options" class="m-2" placeholder="请选择" size="large" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');

const options = [
  {
    title:
      'This is a tooltip that provides additional information for the long value when hovered over, helping users understand its significance in the context of their selection.',
    value: 'long-value-example-1234567890',
    label: 'An Example of a Long Label That Demonstrates the Use of Extended Descriptions for Clarity',
  },
  {
    value: 'option-2',
    label: 'A Label That Clearly Defines the Second Choice',
  },
  {
    title:
      'This is the description for the third option, which offers users another selection to consider based on their needs.',
    value: 'option-3',
    label: 'A Label That Clearly Defines the Third Choice',
  },
  {
    title: 'option-4',
    value: 'option-4',
    label: 'option-4',
  },
];
</script>

```

## 自定义面板内容

您可以使用插槽自定义下拉面板的顶部和底部内容。

**Demo 示例**: `select/panel-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/select.html)

```vue
<template>
  <e-select v-model="value" class="demo-select" placeholder="自定义面板内容">
    <template #panel-header>
      <div style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #409eff; text-align: center">
        <e-icon style="margin-right: 6px"><InfoFilled /></e-icon>
        自定义面板顶部内容
      </div>
    </template>
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    <template #panel-footer>
      <div style="padding: 8px 12px; border-top: 1px solid #eee; color: #67c23a; text-align: center">
        <e-button type="primary" size="small" style="width: 100%">添加选项</e-button>
      </div>
    </template>
  </e-select>

  <e-select v-model="value" :options="options" class="demo-select" placeholder="带操作的下拉面板">
    <template #panel-header>
      <div style="padding: 8px">
        <e-input v-model="searchText" placeholder="请输入关键字">
          <template #suffix>
            <e-icon><Search /></e-icon>
          </template>
        </e-input>
      </div>
    </template>
    <template #panel-footer>
      <div style="padding: 8px 12px; border-top: 1px solid var(--e-function-color-line); text-align: right">
        <e-button>重置</e-button>
        <e-button type="primary">确认</e-button>
      </div>
    </template>
  </e-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InfoFilled, Search } from '@epoint-fe/eui-icons';

const value = ref('');
const searchText = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

<style scoped>
.demo-select {
  width: 240px;
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>

```

## API

### select Attributes

| Name                  | Description                                                                                                            | Type                                                                                                                                                                        | Default               |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| model-value / v-model | 绑定的值                                                                                                               | ^[string] / ^[number] / ^[boolean] / ^[object] / ^[array]                                                                                                                   | —                     |
| text / v-model:text   | 绑定的文本                                                                                                             | ^[string] / ^[array]                                                                                                                                                        | —                     |
| multiple              | 是否启用多选模式                                                                                                       | ^[boolean]                                                                                                                                                                  | false                 |
| disabled              | 是否禁用 Select                                                                                                        | ^[boolean]                                                                                                                                                                  | false                 |
| value-key             | 用于值的唯一标识键名，当值为对象时必需                                                                                 | ^[string]                                                                                                                                                                   | value                 |
| size                  | 输入框尺寸                                                                                                             | ^[枚举]`'large' \| 'default' \| 'small'`                                                                                                                                    | default               |
| clearable             | 是否可清空选择                                                                                                         | ^[boolean]                                                                                                                                                                  | true                  |
| collapse-tags         | 在多选情况下是否将标签折叠成文本                                                                                       | ^[boolean]                                                                                                                                                                  | false                 |
| collapse-tags-tooltip | 当鼠标悬停在折叠标签文本上时是否显示所有选中的标签。要使用此功能，`collapse-tags` 必须为 true                          | ^[boolean]                                                                                                                                                                  | false                 |
| multiple-limit        | 用户可以选择的最大选项数（当 `multiple` 为 `true` 时）。设置为 0 表示无限制                                            | ^[number]                                                                                                                                                                   | 0                     |
| name                  | select 输入框的 `name` 属性                                                                                            | ^[string]                                                                                                                                                                   | —                     |
| effect                | Tooltip 主题，内置主题：`dark` / `light` / `danger`                                                                    | ^[枚举]`'light' \| 'dark'\| 'danger'`                                                                                                                                       | light                 |
| autocomplete          | select 输入框的 `autocomplete` 属性                                                                                    | ^[string]                                                                                                                                                                   | off                   |
| placeholder           | 占位符                                                                                                                 | ^[string]                                                                                                                                                                   | Select                |
| filterable            | Select 是否可筛选                                                                                                      | ^[boolean]                                                                                                                                                                  | false                 |
| allow-create          | 是否允许创建新项目。若使用此选项，`filterable` 必须为 true                                                             | ^[boolean]                                                                                                                                                                  | false                 |
| filter-method         | 自定义筛选方法                                                                                                         | ^[Function]`() => void`                                                                                                                                                     | —                     |
| remote                | 选项是否从服务器加载                                                                                                   | ^[boolean]                                                                                                                                                                  | false                 |
| remote-method         | 自定义远程搜索方法                                                                                                     | ^[Function]`() => void`                                                                                                                                                     | —                     |
| remote-show-suffix    | 在远程搜索方法中是否显示后缀图标                                                                                       | ^[boolean]                                                                                                                                                                  | false                 |
| loading               | Select 是否正在从服务器加载数据                                                                                        | ^[boolean]                                                                                                                                                                  | false                 |
| loading-text          | 在加载数据时显示的文本                                                                                                 | ^[string]                                                                                                                                                                   | Loading               |
| render                | 自定义渲染内容，优先级大于 `slot`                                                                                      | ^[Function]`() => VNode`                                                                                                                                                    | —                     |
| no-match-text         | 当没有数据与筛选查询匹配时显示的文本，也可以使用插槽 `empty`                                                           | ^[string]                                                                                                                                                                   | No matching data      |
| no-data-text          | 当没有选项时显示的文本，也可以使用插槽 `empty`                                                                         | ^[string]                                                                                                                                                                   | No data               |
| popper-class          | 自定义 Select 下拉菜单的类名                                                                                           | ^[string]                                                                                                                                                                   | —                     |
| reserve-keyword       | 当 `multiple` 和 `filter` 为 true 时，是否在选择选项后保留当前关键词                                                   | ^[boolean]                                                                                                                                                                  | true                  |
| default-first-option  | 在按 Enter 键时选择第一个匹配的选项。与 `filterable` 或 `remote` 一起使用                                              | ^[boolean]                                                                                                                                                                  | false                 |
| teleported            | 是否将 Select 下拉菜单移动到 body 元素中                                                                               | ^[boolean]                                                                                                                                                                  | true                  |
| persistent            | 当 Select 下拉菜单不活跃且 `persistent` 为 `false` 时，Select 下拉菜单将被销毁                                         | ^[boolean]                                                                                                                                                                  | true                  |
| automatic-dropdown    | 对于不可筛选的 Select，此属性决定选项菜单是否在输入框获得焦点时弹出                                                    | ^[boolean]                                                                                                                                                                  | false                 |
| clear-icon            | 自定义清空图标组件                                                                                                     | ^[string] / ^[object]`Component`                                                                                                                                            | CircleClose           |
| fit-input-width       | 下拉菜单的宽度是否与输入框宽度相同                                                                                     | ^[boolean]                                                                                                                                                                  | false                 |
| suffix-icon           | 自定义后缀图标组件                                                                                                     | ^[string] / ^[object]`Component`                                                                                                                                            | ArrowDown             |
| tag-type              | 标签类型                                                                                                               | ^[枚举]`'' \| 'success' \| 'info' \| 'warning' \| 'danger'`                                                                                                                 | info                  |
| validate-event        | 是否触发表单验证                                                                                                       | ^[boolean]                                                                                                                                                                  | true                  |
| placement             | 下拉菜单的位置                                                                                                         | ^[枚举]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | bottom-start          |
| max-collapse-tags     | 要显示的最大标签数量。要使用此选项，`collapse-tags` 必须为 true                                                        | ^[number]                                                                                                                                                                   | 1                     |
| virtual-list-props    | 传递虚拟列表属性，传入此参数以开启虚拟滚动，[VirtualListProps](#virtuallistprops)                                      | `VirtualListProps`                                                                                                                                                          | —                     |
| options               | 开启虚拟滚动时，需通过该参数来指定数据源                                                                               | `array`                                                                                                                                                                     | —                     |
| empty-values          | 定义哪些值被视为空值。当选择器的值等于这些值时，会被视为未选择状态。                                                   | ^[array]`(string \| number \| null \| undefined)[]`                                                                                                                         | [undefined, null, ''] |
| value-on-clear        | 当点击清除按钮时,选择器的值会被设置为这个值。默认值为 undefined，你可以设置为任意类型的值,比如空字符串、null、数组等。 | ^[union]`string \| number \| array \| boolean \| object \| null \| undefined`                                                                                               | undefined             |

### Events

| Name           | Description                            | Parameters                      |
| -------------- | -------------------------------------- | ------------------------------- |
| change         | 当选定的值发生变化时触发               | 当前选定的值                    |
| visible-change | 当下拉菜单出现/消失时触发              | 当它出现时为 true，否则为 false |
| remove-tag     | 在多选模式下移除标签时触发             | 移除的标签值                    |
| clear          | 在可清除的 Select 中点击清除图标时触发 | —                               |
| blur           | 当输入框失去焦点时触发                 | (event: FocusEvent)             |
| focus          | 当输入框获得焦点时触发                 | (event: FocusEvent)             |

### Slots

| Name             | Description              | Subtags               |
| ---------------- | ------------------------ | --------------------- |
| —                | 选项组件列表             | Option Group / Option |
| prefix           | 作为 Select 前缀的内容   | —                     |
| empty            | 当没有选项时的内容       | —                     |
| option           | 开启虚拟列表时的选项内容 | —                     |
| panel-header     | 下拉面板顶部自定义内容   | —                     |
| panel-footer     | 下拉面板底部自定义内容   | —                     |

### Methods

| Method | Description                  | Parameters |
| ------ | ---------------------------- | ---------- |
| focus  | 聚焦到输入框组件             | -          |
| blur   | 失焦输入框组件，隐藏下拉菜单 | -          |

## Option Group API

### Option Group Attributes

| Name     | Description                | Type    | Default |
| -------- | -------------------------- | ------- | ------- |
| label    | 分组的名称                 | string  | —       |
| disabled | 是否禁用该分组内的所有选项 | boolean | false   |

### Option Group Slots

| Name | Description    | Subtags |
| ---- | -------------- | ------- |
| -    | 自定义默认内容 | Option  |

## Option API

### Option Attributes

| Name     | Description                           | Type                               | Default |
| -------- | ------------------------------------- | ---------------------------------- | ------- |
| value    | 选项的值                              | string / number / boolean / object | —       |
| label    | 选项的标签，如果省略则与 `value` 相同 | string/number                      | —       |
| disabled | 是否禁用该选项                        | boolean                            | false   |

### Option Slots

| Name | Description    |
| ---- | -------------- |
| -    | 自定义默认内容 |

### VirtualListProps

| 参数名        | 描述                                                               | 类型               | 默认值  |
| ------------- | ------------------------------------------------------------------ | ------------------ | :-----: |
| height        | 可视区域高度                                                       | `number \| string` |    —    |
| threshold     | 开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。 | `number`           |    —    |
| fixedSize     | 元素高度是否是固定的。                                             | `boolean`          | `false` |
| estimatedSize | 元素高度不固定时的预估高度。                                       | `number`           |    —    |
| buffer        | 视口边界外提前挂载的元素数量。                                     | `number`           |   `5`   |