---
title: Timeline
originUrl: http://192.168.219.170/docs/vue/latest/component/component/timeline.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/timeline.html)

# Timeline 时间轴

直观地展示时间线。

## 基本用法

时间轴可以分为多个活动。时间戳是区别于其他组件的重要特征。请注意与步骤组件的区别。

**Demo 示例**: `timeline/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/timeline.html)

```vue
<template>
  <e-timeline>
    <e-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
      {{ activity.content }}
    </e-timeline-item>
  </e-timeline>
</template>

<script lang="ts" setup>
const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
];
</script>

```

## 自定义节点

节点的大小、颜色和图标可以自定义。

**Demo 示例**: `timeline/custom-node`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/timeline.html)

```vue
<template>
  <e-timeline>
    <e-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :hollow="activity.hollow"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </e-timeline-item>
  </e-timeline>
</template>

<script lang="ts" setup>
import { MoreFilled } from '@epoint-fe/eui-icons';

const activities = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: MoreFilled,
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true,
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46',
  },
];
</script>

```

## 自定义时间戳

当内容太高时，时间戳可以放置在内容上方。

**Demo 示例**: `timeline/custom-timestamp`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/timeline.html)

```vue
<template>
  <e-timeline>
    <e-timeline-item timestamp="2018/4/12" placement="top">
      <e-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </e-card>
    </e-timeline-item>
    <e-timeline-item timestamp="2018/4/3" placement="top">
      <e-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </e-card>
    </e-timeline-item>
    <e-timeline-item timestamp="2018/4/2" placement="top">
      <e-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </e-card>
    </e-timeline-item>
  </e-timeline>
</template>

```

## 垂直居中

时间轴项垂直居中。

**Demo 示例**: `timeline/center`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/timeline.html)

```vue
<template>
  <e-timeline>
    <e-timeline-item center timestamp="2018/4/12" placement="top">
      <e-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </e-card>
    </e-timeline-item>
    <e-timeline-item timestamp="2018/4/3" placement="top">
      <e-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </e-card>
    </e-timeline-item>
    <e-timeline-item center timestamp="2018/4/2" placement="top"> Event start </e-timeline-item>
    <e-timeline-item timestamp="2018/4/2" placement="top"> Event end </e-timeline-item>
  </e-timeline>
</template>

```

## API

### Timeline Slots

| Name    | Description            | Subtags       |
| ------- | ---------------------- | ------------- |
| default | 自定义时间轴的默认内容 | Timeline-Item |

## Timeline-Item API

### Timeline-Item Attributes

| Name           | Description    | Type                                                               | Default |
| -------------- | -------------- | ------------------------------------------------------------------ | ------- |
| timestamp      | 时间戳内容     | ^[string]                                                          | ''      |
| hide-timestamp | 是否显示时间戳 | ^[boolean]                                                         | false   |
| center         | 是否垂直居中   | ^[boolean]                                                         | false   |
| placement      | 时间戳位置     | ^[enum]`'top' \| 'bottom'`                                         | bottom  |
| type           | 节点类型       | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | ''      |
| color          | 节点背景颜色   | ^[enum]`'hsl' \| 'hsv' \| 'hex' \| 'rgb'`                          | ''      |
| size           | 节点大小       | ^[enum]`'normal' \| 'large'`                                       | normal  |
| icon           | 图标组件       | ^[string] / ^[Component]                                           | —       |
| hollow         | 图标是否为空心 | ^[boolean]                                                         | false   |

### Timeline-Item Slots

| Name    | Description              |
| ------- | ------------------------ |
| default | 自定义时间轴项的默认内容 |
| dot     | 自定义时间轴项的定义节点 |