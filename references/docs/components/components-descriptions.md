---
title: Descriptions
originUrl: http://192.168.219.170/docs/vue/latest/component/component/descriptions.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/descriptions.html)

# Descriptions 描述列表

在列表表单中显示多个字段。

## 基本用法

**Demo 示例**: `descriptions/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/descriptions.html)

```vue
<template>
  <e-descriptions title="用户信息">
    <e-descriptions-item label="用户名">新点软件 - 中央研究院 - 前端研发部</e-descriptions-item>
    <e-descriptions-item label="电话">18100000000</e-descriptions-item>
    <e-descriptions-item label="地点">苏州</e-descriptions-item>
    <e-descriptions-item label="备注">
      <e-tag size="small">Company</e-tag>
    </e-descriptions-item>
    <e-descriptions-item label="地址">江苏省苏州市张家港市杨舍镇江帆路8号</e-descriptions-item>
  </e-descriptions>
</template>

```

## 大小

**Demo 示例**: `descriptions/sizes`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/descriptions.html)

```vue
<template>
  <e-radio-group v-model="size">
    <e-radio value="large">大号</e-radio>
    <e-radio value="default">默认</e-radio>
    <e-radio value="small">小号</e-radio>
  </e-radio-group>

  <e-descriptions class="margin-top" title="带边框" :column="3" :size="size" border>
    <template #extra>
      <e-button type="primary">操作</e-button>
    </template>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <user />
          </e-icon>
          用户名
        </div>
      </template>
      新点软件 - 中央研究院 - 前端研发部
    </e-descriptions-item>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <iphone />
          </e-icon>
          电话
        </div>
      </template>
      18100000000
    </e-descriptions-item>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <location />
          </e-icon>
          地点
        </div>
      </template>
      苏州
    </e-descriptions-item>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <tickets />
          </e-icon>
          备注
        </div>
      </template>
      <e-tag size="small">公司</e-tag>
    </e-descriptions-item>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <office-building />
          </e-icon>
          地址
        </div>
      </template>
      江苏省苏州市张家港市杨舍镇江帆路8号
    </e-descriptions-item>
  </e-descriptions>

  <e-descriptions class="margin-top" title="无边框" :column="3" :size="size" :style="blockMargin">
    <template #extra>
      <e-button type="primary">操作</e-button>
    </template>
    <e-descriptions-item label="用户名">新点软件 - 中央研究院 - 前端研发部</e-descriptions-item>
    <e-descriptions-item label="电话">18100000000</e-descriptions-item>
    <e-descriptions-item label="地点">Company</e-descriptions-item>
    <e-descriptions-item label="备注">
      <e-tag size="small">学校</e-tag>
    </e-descriptions-item>
    <e-descriptions-item label="地址">江苏省苏州市张家港市杨舍镇江帆路8号</e-descriptions-item>
  </e-descriptions>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Iphone, Location, OfficeBuilding, Tickets, User } from '@epoint-fe/eui-icons';

const size = ref('');
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});
</script>

<style scoped>
.e-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>

```

## 垂直列表

**Demo 示例**: `descriptions/vertical-list`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/descriptions.html)

```vue
<template>
  <e-radio-group v-model="size">
    <e-radio value="large">大号</e-radio>
    <e-radio value="default">默认</e-radio>
    <e-radio value="small">小号</e-radio>
  </e-radio-group>

  <e-descriptions title="垂直列表带边框" direction="vertical" :column="4" :size="size" border>
    <e-descriptions-item label="用户名">新点软件 - 中央研究院 - 前端研发部</e-descriptions-item>
    <e-descriptions-item label="电话">18100000000</e-descriptions-item>
    <e-descriptions-item label="地点" :span="2">苏州</e-descriptions-item>
    <e-descriptions-item label="备注">
      <e-tag size="small">公司</e-tag>
    </e-descriptions-item>
    <e-descriptions-item label="地址">江苏省苏州市吴中区吴中大道1188号</e-descriptions-item>
  </e-descriptions>

  <e-descriptions title="垂直列表无边框" :column="4" :size="size" direction="vertical" :style="blockMargin">
    <e-descriptions-item label="用户名">新点软件 - 中央研究院 - 前端研发部</e-descriptions-item>
    <e-descriptions-item label="电话">18100000000</e-descriptions-item>
    <e-descriptions-item label="地点" :span="2">苏州</e-descriptions-item>
    <e-descriptions-item label="备注">
      <e-tag size="small">学校</e-tag>
    </e-descriptions-item>
    <e-descriptions-item label="地址">江苏省苏州市张家港市杨舍镇江帆路8号</e-descriptions-item>
  </e-descriptions>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const size = ref('');
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});
</script>

<style scoped>
.e-descriptions {
  margin-top: 20px;
}
</style>

```

## 自定义样式

**Demo 示例**: `descriptions/customized-style`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/descriptions.html)

```vue
<template>
  <e-descriptions title="Customized style list" :column="3" border>
    <e-descriptions-item
      label="用户名"
      label-align="right"
      align="center"
      label-class-name="my-label"
      class-name="my-content"
      width="150px"
      >新点软件 - 中央研究院 - 前端研发部</e-descriptions-item
    >
    <e-descriptions-item label="电话" label-align="right" align="center">18100000000</e-descriptions-item>
    <e-descriptions-item label="地点" label-align="right" align="center">Suzhou</e-descriptions-item>
    <e-descriptions-item label="备注" label-align="right" align="center">
      <e-tag size="small">Company</e-tag>
    </e-descriptions-item>
    <e-descriptions-item label="地址" label-align="right" align="center"
      >江苏省苏州市张家港市杨舍镇江帆路8号</e-descriptions-item
    >
  </e-descriptions>
</template>
<style scoped>
.my-label {
  background: var(--e-color-success-light-9);
}
.my-content {
  background: var(--e-color-danger-light-9);
}
</style>

```

## API

### Descriptions Attributes

| Name      | Description                     | Type    | Default    |
| --------- | ------------------------------- | ------- | ---------- |
| border    | 带边框或不带边框。              | ^[boolean] | false      |
| column    | 一行中的 `Descriptions Item` 数 | ^[number] | 3          |
| direction | 列表的方向。                    | ^[string]`'vertical' \| 'horizontal'` | horizontal |
| size      | 列表的大小。                    | ^[string]`'large' \| 'default' \| 'small'`  | default    |
| title     | 标题文本，显示在左上角。        | ^[string] | —          |
| extra     | 额外文本，显示在右上角。        | ^[string] | —          |

### Descriptions Slots

| Name  | Description                  | Subtags           |
| ----- | ---------------------------- | ----------------- |
| —     | 自定义默认内容               | Descriptions Item |
| title | 自定义标题，显示在左上角     | —                 |
| extra | 自定义额外区域，显示在右上角 | —                 |

### Descriptions Item Attributes

| Name             | Description                                                                                                                       | Type                                   | Default |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------- |
| label            | 标签文本                                                                                                                          | ^[string]                              | —       |
| span             | 列宽度的跨列数                                                                                                                    | ^[number]                              | 1       |
| width            | 列宽度，不同行中相同列的宽度由最大值设置（如果没有 `border`，宽度包含标签和内容）                                                 | ^[string] / ^[number]                  | —       |
| min-width        | 列的最小宽度，带有 `width` 的列具有固定宽度，而带有 `min-width` 的列具有按比例分配的宽度（如果没有 `border`，宽度包含标签和内容） | ^[string] / ^[number]                  | —       |
| align            | 列内容的对齐方式（如果没有 `border`，对标签和内容都有效）                                                                         | ^[枚举]`'left' \| 'center' \| 'right'` | left    |
| label-align      | 列标签的对齐方式，如果省略，将应用上述 `align` 属性的值（如果没有 `border`，请使用 `align` 属性）                                 | ^[枚举]`'left' \| 'center' \| 'right'` | —       |
| class-name       | 列内容的自定义类名                                                                                                                | ^[string]                              | —       |
| label-class-name | 列标签的自定义类名                                                                                                                | ^[string]                              | —       |

### Descriptions Item Slots

| Name  | Description    |
| ----- | -------------- |
| —     | 自定义默认内容 |
| label | 自定义标签内容 |