---
title: Steps
originUrl: http://192.168.219.170/docs/vue/latest/component/component/steps.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/steps.html)

# 步骤条

引导用户按照流程完成任务。步骤的数量可以根据实际应用场景设置，但不能少于 2 步。

## 基本用法

简单的步骤条。

**Demo 示例**: `steps/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/steps.html)

```vue
<template>
  <e-steps :active="active" finish-status="success">
    <e-step title="Step 1" />
    <e-step title="Step 2" />
    <e-step title="Step 3" />
  </e-steps>

  <e-button style="margin-top: 12px" @click="next">Next step</e-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>

```

## 包含状态的步骤条

显示每个步骤的状态。

**Demo 示例**: `steps/with-status`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/steps.html)

```vue
<template>
  <e-steps :space="200" :active="1" finish-status="success">
    <e-step title="Done" />
    <e-step title="Processing" />
    <e-step title="Step 3" />
  </e-steps>
</template>

```

## 居中

标题和描述可以居中显示。

**Demo 示例**: `steps/centered`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/steps.html)

```vue
<template>
  <e-steps :active="2" align-center>
    <e-step title="Step 1" description="Some description" />
    <e-step title="Step 2" description="Some description" />
    <e-step title="Step 3" description="Some description" />
    <e-step title="Step 4" description="Some description" />
  </e-steps>
</template>

```

## 带有描述的步骤条

每个步骤都有描述。

**Demo 示例**: `steps/with-description`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/steps.html)

```vue
<template>
  <e-steps :active="1">
    <e-step title="Step 1" description="Some description" />
    <e-step title="Step 2" description="Some description" />
    <e-step title="Step 3" description="Some description" />
  </e-steps>
</template>

```

## 带有图标的步骤条

步骤条中可以使用各种自定义图标。

**Demo 示例**: `steps/with-icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/steps.html)

```vue
<template>
  <e-steps :active="1">
    <e-step title="Step 1" :icon="Edit" />
    <e-step title="Step 2" :icon="Upload" />
    <e-step title="Step 3" :icon="Picture" />
  </e-steps>
</template>

<script lang="ts" setup>
import { Edit, Picture, Upload } from '@epoint-fe/eui-icons';
</script>

```

## 竖直步骤条

竖直方向的步骤条。

**Demo 示例**: `steps/vertical`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/steps.html)

```vue
<template>
  <div style="height: 300px">
    <e-steps direction="vertical" :active="1">
      <e-step title="Step 1" />
      <e-step title="Step 2" />
      <e-step title="Step 3" />
    </e-steps>
  </div>
</template>

```

## 简单步骤条

简单的步骤条，`align-center`、`description`、`direction` 和 `space` 将被忽略。

**Demo 示例**: `steps/simple`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/steps.html)

```vue
<template>
  <e-steps :space="200" :active="1" simple>
    <e-step title="Step 1" :icon="Edit" />
    <e-step title="Step 2" :icon="UploadFilled" />
    <e-step title="Step 3" :icon="Picture" />
  </e-steps>

  <e-steps :active="1" finish-status="success" simple style="margin-top: 20px">
    <e-step title="Step 1" />
    <e-step title="Step 2" />
    <e-step title="Step 3" />
  </e-steps>
</template>

<script lang="ts" setup>
import { Edit, Picture, UploadFilled } from '@epoint-fe/eui-icons';
</script>

```

## 节点为小圆点的步骤条

**Demo 示例**: `steps/dot`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/steps.html)

```vue
<template>
  <div class="steps-container-item">
    <e-steps :active="active" finish-status="success" dot align-center>
      <e-step title="Step 1" description="This is a description" />
      <e-step title="Step 2" description="This is a description" />
      <e-step title="Step 3" description="This is a description" />
    </e-steps>
  </div>

  <div class="steps-container-item-vertical">
    <e-steps :active="active" finish-status="success" dot direction="vertical" style="height: 300px" align-center>
      <e-step title="Step 1" status="success" description="This is a description" />
      <e-step title="Step 2" status="error" description="This is a description" />
      <e-step title="Step 3" status="wait" description="This is a description" />
    </e-steps>
  </div>

  <e-button style="margin-top: 12px" @click="next">Next step</e-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>

<style lang="scss" scoped>
.steps-container-item {
  margin-bottom: 40px;
}

.steps-container-item-vertical {
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
}
</style>

```

## Steps API

### Steps Attributes

| Name           | Description                                        | Type                                                             | Default    |
| -------------- | -------------------------------------------------- | ---------------------------------------------------------------- | ---------- |
| space          | 每个步骤之间的间距，如果省略则自适应。支持百分比。 | ^[number] / ^[string]                                            | ''         |
| direction      | 显示方向                                           | ^[enum]`'vertical' \| 'horizontal'`                              | horizontal |
| active         | 当前激活的步骤                                     | ^[number]                                                        | 0          |
| process-status | 当前步骤的状态                                     | ^[enum]`'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | process    |
| finish-status  | 最后一步的状态                                     | ^[enum]`'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | finish     |
| align-center   | 居中显示标题和描述                                 | ^[boolean]                                                       | —          |
| simple         | 是否应用简单主题                                   | ^[boolean]                                                       | —          |
| dot            | 节点为小圆点                                       | ^[boolean]                                                       | —          |

### Steps Slots

| Name    | Description    | Subtags |
| ------- | -------------- | ------- |
| default | 自定义默认内容 | Step    |

## API

### Step Attributes

| Name        | Description                                  | Type                                                                   | Default |
| ----------- | -------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| title       | 步骤标题                                     | ^[string]                                                              | ''      |
| description | 步骤描述                                     | ^[string]                                                              | ''      |
| icon        | 步骤自定义图标。图标也可以通过命名插槽传递。 | ^[string] / ^[Component]                                               | —       |
| status      | 当前状态。如果未配置，将由 Steps 自动设置。  | ^[enum]`'' \| 'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | ''      |

### Step Slots

| Name        | Description |
| ----------- | ----------- |
| icon        | 自定义图标  |
| title       | 步骤标题    |
| description | 步骤描述    |