---
title: Toolbar 工具栏
originUrl: http://192.168.219.170/docs/vue/latest/component/component/toolbar.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/toolbar.html)

# Toolbar 工具栏

用于数据筛选等功能。

## 基础用法

**Demo 示例**: `toolbar/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/toolbar.html)

```vue
<template>
  <e-toolbar ref="toolbarRef" filter-divider>
    <template #button>
      <e-button type="primary">Primary</e-button>
      <e-button type="success">Success</e-button>
    </template>
    <template #filter>
      <div class="filter-content">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="LayoutCardBold" text />
        <e-button :icon="LayoutTableBold" text />
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LayoutCardBold, LayoutTableBold, MoreFilled } from '@epoint-fe/eui-icons';
</script>

<style lang="scss" scoped>
.e-toolbar {
  .e-form-item {
    margin-bottom: 0;
    flex-shrink: 0;
  }
}
</style>

```

## 重载

**Demo 示例**: `toolbar/overload`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/toolbar.html)

```vue
<template>
  <e-toolbar ref="toolbarRef" filter-divider>
    <template #button>
      <e-button type="primary">Primary</e-button>
      <e-button type="success">Success</e-button>
      <e-button type="info">Info</e-button>
    </template>
    <template #filter="{ overload, opened }">
      <e-form class="filter-content" :class="{ opened: opened }">
        <e-form-item label="是否重载">
          <e-switch :model-value="overload" />
        </e-form-item>
        <e-form-item label="是否展开">
          <e-switch :model-value="opened" />
        </e-form-item>
        <e-form-item label="搜索">
          <e-input />
        </e-form-item>
      </e-form>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="LayoutCardBold" text />
        <e-button :icon="LayoutTableBold" text />
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LayoutCardBold, LayoutTableBold, MoreFilled } from '@epoint-fe/eui-icons';
</script>

<style lang="scss" scoped>
.e-toolbar {
  .filter-content {
    display: flex;
    &.opened {
      flex-wrap: wrap;
    }

    .e-form-item {
      margin-bottom: 0;
      flex-shrink: 0;
    }
  }
}
</style>

```

## 自定义布局

**Demo 示例**: `toolbar/layout`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/toolbar.html)

```vue
<template>
  <e-toolbar filter-divider>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar filter-position="left" button-position="right" button-divider>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />

  <e-toolbar title="页面名称" button-position="right" filter-position="right">
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" button-position="left" filter-position="left">
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" title-block filter-position="left" button-position="right">
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" filter-position="right" filter-block>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" button-position="left" filter-position="left" button-block filter-block>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" button-position="right" filter-position="left" button-block filter-block>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar button-position="left" filter-position="left" filter-block>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';
</script>

<style lang="scss" scoped>
.e-toolbar {
  .e-form-item {
    margin-bottom: 0;
    flex-shrink: 0;
  }

  & ~ .e-toolbar {
    margin-top: 20px;
  }

  .filter {
    height: 32px;
    width: 100px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e5e9f2;
  }
}
</style>

```

## 在弹窗中使用

::: demo

toolbar/dialog

:::

## API

### Toolbar 属性

| Name            | Description                | Type                         | Default |
| --------------- | -------------------------- | ---------------------------- | ------- |
| title           | 用于显示标题               | ^[string]                    | null    |
| title-block     | 控制标题是否单行显示       | ^[boolean]                   | false   |
| button-position | 按钮区域的位置             | ^[string]`'left' \| 'right'` | 'left'  |
| button-block    | 按钮区域是否单行显示       | ^[boolean]                   | false   |
| filter-position | 筛选区域的位置             | ^[string]`'left' \| 'right'` | 'right' |
| filter-block    | 筛选区域是否单行显示       | ^[boolean]                   | false   |
| filter-divider  | 是否显示筛选区域右侧分割线 | ^[boolean]                   | false   |
| space-gap  | 左右布局区域之间的间距，用于计算换行布局 | ^[number]                   | 180px   |

### Toolbar Events

| Name              | Description                              |
| ----------------- | ---------------------------------------- |
| filterSizeRefresh | 刷新筛选区域的尺寸，一般用于刷新超载状态 |

### Toolbar Slots

| Name    | Parameters           | Description        |
| ------- | -------------------- | ------------------ |
| title   | —                    | 标题区域自定义内容 |
| button  | —                    | 按钮区域自定义内容 |
| filter  | `{overload, opened}` | 外置搜索自定义内容 |
| actions | —                    | 辅助区域自定义内容 |