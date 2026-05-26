---
title: Tabs
originUrl: http://192.168.219.170/docs/vue/latest/component/component/tabs.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

# 选项卡

将相关联但属于不同类型的数据集合进行划分。

## 基本用法

简单且简洁的选项卡。

**Demo 示例**: `tabs/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <e-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <e-tab-pane label="User" name="first">User</e-tab-pane>
    <e-tab-pane label="Config" name="second">Config</e-tab-pane>
    <e-tab-pane label="Role" name="third">Role</e-tab-pane>
    <e-tab-pane label="Task" name="fourth">Task</e-tab-pane>
  </e-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@epoint-fe/eui-components';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style scoped>
.demo-tabs > .e-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

```

## Iframe 选项卡

**Demo 示例**: `tabs/iframe`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <e-button type="primary" @click="reload">刷新选项卡</e-button>
  <e-tabs ref="tabs" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <e-tab-pane
      ref="firstRef"
      label="EUI-Vue"
      name="first"
      url="http://192.168.219.170/showcase/eui3/components/"
      lazy
      @load="onload"
    />
    <e-tab-pane
      class="second"
      label="EUI-F9"
      name="second"
      url="http://192.168.219.170/docs/vue/latest/component/component/button.html"
      @load="onload"
    />
  </e-tabs>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { TabsPaneContext } from '@epoint-fe/eui-vue';

const activeName = ref('first');

const firstRef = ref();

let curtTab: TabsPaneContext | null;

const handleClick = (tab: TabsPaneContext, event: Event) => {
  curtTab = tab;
};

const onload = (pane: TabsPaneContext) => {
  console.log(pane);
};

const reload = () => {
  curtTab ? curtTab?.reload() : firstRef.value?.reload;
};
</script>
<style lang="scss">
.demo-tabs > .e-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;

  .e-tab-pane {
    height: 500px;
  }
}
</style>

```

## 卡片风格

具有卡片样式的选项卡。

**Demo 示例**: `tabs/card-style`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <e-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
    <e-tab-pane label="User" name="first">User</e-tab-pane>
    <e-tab-pane label="Config" name="second">Config</e-tab-pane>
    <e-tab-pane label="Role" name="third">Role</e-tab-pane>
    <e-tab-pane label="Task" name="fourth">Task</e-tab-pane>
  </e-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@epoint-fe/eui-components';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style scoped>
.demo-tabs > .e-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

```

## 边框卡片

带边框的卡片选项卡。

**Demo 示例**: `tabs/border-card`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <e-tabs type="border-card">
    <e-tab-pane label="User">User</e-tab-pane>
    <e-tab-pane label="Config">Config</e-tab-pane>
    <e-tab-pane label="Role">Role</e-tab-pane>
    <e-tab-pane label="Task">Task</e-tab-pane>
  </e-tabs>
</template>

```

## 栏目风格

具有栏目样式的选项卡。

**Demo 示例**: `tabs/section-style`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <e-tabs type="section">
    <e-tab-pane label="User">User</e-tab-pane>
    <e-tab-pane label="Config">Config</e-tab-pane>
    <e-tab-pane label="Role">Role</e-tab-pane>
    <e-tab-pane label="Task">Task</e-tab-pane>
  </e-tabs>
</template>

```

## 选项卡位置

您可以使用 `tab-position` 属性设置选项卡的位置。

**Demo 示例**: `tabs/tab-position`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <e-radio-group v-model="tabPosition" style="margin-bottom: 30px">
    <e-radio-button value="top">top</e-radio-button>
    <e-radio-button value="right">right</e-radio-button>
    <e-radio-button value="bottom">bottom</e-radio-button>
    <e-radio-button value="left">left</e-radio-button>
  </e-radio-group>

  <e-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
    <e-tab-pane label="User">User</e-tab-pane>
    <e-tab-pane label="Config">Config</e-tab-pane>
    <e-tab-pane label="Role">Role</e-tab-pane>
    <e-tab-pane label="Task">Task</e-tab-pane>
  </e-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const tabPosition = ref('left');
</script>
<style scoped>
.demo-tabs > .e-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.e-tabs--right .e-tabs__content,
.e-tabs--left .e-tabs__content {
  height: 100%;
}
</style>

```

## 自定义选项卡

您可以使用命名插槽来自定义选项卡标签内容。

**Demo 示例**: `tabs/custom-tab`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <e-tabs type="border-card" class="demo-tabs">
    <e-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <e-icon><calendar /></e-icon>
          <span>Route</span>
        </span>
      </template>
      Route
    </e-tab-pane>
    <e-tab-pane label="Config">Config</e-tab-pane>
    <e-tab-pane label="Role">Role</e-tab-pane>
    <e-tab-pane label="Task">Task</e-tab-pane>
  </e-tabs>
</template>

<script lang="ts" setup>
import { Calendar } from '@epoint-fe/eui-icons';
</script>
<style scoped>
.demo-tabs > .e-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .e-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>

```

## 添加 & 关闭选项卡

仅卡片类型的选项卡支持可添加 & 可关闭。

**Demo 示例**: `tabs/dynamic-tabs`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <e-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" @edit="handleTabsEdit">
    <e-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
      {{ item.content }}
    </e-tab-pane>
  </e-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabPaneName } from '@epoint-fe/eui-components';

let tabIndex = 2;
const editableTabsValue = ref('2');
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
]);

const handleTabsEdit = (targetName: TabPaneName | undefined, action: 'remove' | 'add') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`;
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    });
    editableTabsValue.value = newTabName;
  } else if (action === 'remove') {
    const tabs = editableTabs.value;
    let activeName = editableTabsValue.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }

    editableTabsValue.value = activeName;
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
  }
};
</script>
<style scoped>
.demo-tabs > .e-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

```

## 自定义新选项卡的触发按钮

**Demo 示例**: `tabs/customized-trigger`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <div style="margin-bottom: 20px">
    <e-button size="small" @click="addTab"> add tab </e-button>
  </div>
  <e-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab">
    <e-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
      {{ item.content }}
    </e-tab-pane>
  </e-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

let tabIndex = 2;
const editableTabsValue = ref('2');
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
]);

const addTab = () => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>
<style scoped>
.demo-tabs > .e-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

```

## 头部内容分离

使用 `header-target` 将 Tab 头部 挂载到指定元素。

**Demo 示例**: `tabs/tabs-content-separation`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tabs.html)

```vue
<template>
  <div class="header-area"></div>
  <div class="main-area">
    <e-tabs v-model="activeName" header-target=".header-area">
      <e-tab-pane label="Task1">Task1 - 内容</e-tab-pane>
      <e-tab-pane label="Task2">Task2 - 内容</e-tab-pane>
      <e-tab-pane label="Task3" url="http://192.168.219.170/showcase/eui3/components/" lazy></e-tab-pane>
    </e-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeName = ref('0');
</script>

<style scoped>
.demo-header-target {
  display: block;
}

.header-area {
  min-height: 48px;
  padding: 8px 12px;
  border: 1px dashed #d0d5dd;
  margin-bottom: 8px;
  color: #6b778c;
}

.main-area {
  padding: 12px;
  border: 1px solid #f2f4f7;
  border-radius: 8px;
}
</style>

```

## Tabs API

### Tabs Attributes

| Name                  | Description                                                                      | Type                                                                    | Default            |
| --------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------ |
| model-value / v-model | 绑定值，选中选项卡的名称                                                         | ^[string] / ^[number]                                                   | 第一个选项卡的名称 |
| type                  | 选项卡的类型                                                                     | ^[枚举]`'card' \| 'border-card' \| 'section'`                                        | —                  |
| closable              | 选项卡是否可关闭                                                                 | ^[boolean]                                                              | false              |
| addable               | 选项卡是否可添加                                                                 | ^[boolean]                                                              | false              |
| editable              | 选项卡是否可添加和关闭                                                           | ^[boolean]                                                              | false              |
| tab-position          | 选项卡的位置                                                                     | ^[string]`'top' \| 'right' \| 'bottom' \| 'left'`                       | top                |
| stretch               | 选项卡宽度是否自动适应其容器                                                     | ^[boolean]                                                              | false              |
| full-layout           | 选项卡内容高度是否撑满其容器                                                     | ^[boolean]                                                              | false              |
| header-target         | 将 Tab 头部挂载到指定元素（CSS 选择器）。不填则保持默认渲染位置 | ^[string]                                                               | ''                 |
| before-leave          | 切换选项卡前的钩子函数。如果返回 `false` 或返回 `Promise` 并且被拒绝，将阻止切换 | ^[Function]`(activeName, oldActiveName) => boolean \| Promise<boolean>` | —                  |

### Tabs Events

| Name       | Description                              | Parameters                                                          |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------- |
| tab-click  | 点击选项卡时触发                         | (pane: `TabsPaneContext`, ev: `Event`)                              |
| tab-change | 当前激活的 tab 变更时触发                | (name: `TabPaneName`)                                               |
| tab-remove | 点击选项卡移除按钮时触发                 | (name: `TabPaneName`)                                               |
| tab-add    | 点击选项卡添加按钮时触发                 | —                                                                   |
| edit       | 点击选项卡添加按钮或选项卡移除按钮时触发 | (paneName: `TabPaneName \| undefined`, action: `'remove' \| 'add'`) |

### Tabs Slots

| Name | Description    | Subtags  |
| ---- | -------------- | -------- |
| -    | 自定义默认内容 | Tab-pane |

## Tab-pane API

### Tab-pane Attributes

| Name     | Description                                    | Type                  | Default                                                  |
| -------- | ---------------------------------------------- | --------------------- | -------------------------------------------------------- |
| label    | 选项卡的标题                                   | ^[string]             | —                                                        |
| disabled | 选项卡是否禁用                                 | ^[boolean]            | false                                                    |
| name     | 对应于选项卡名称的标识符，代表选项卡面板的别名 | ^[string] / ^[number] | 选项卡面板在序列中的序数编号，例如第一个选项卡面板为 '0' |
| closable | 选项卡是否可关闭                               | ^[boolean]            | false                                                    |
| lazy     | 选项卡是否懒加载                               | ^[boolean]            | false                                                    |
| url      | iframe 路径地址。                              | ^[string]   | null                                  |

### Tab-pane Slots

| Name  | Description      |
| ----- | ---------------- |
| -     | 选项卡面板的内容 |
| label | 选项卡面板的标签 |

### Tab-pane Events

| Name | Description                            | Parameters                |
| ---- | -------------------------------------- | ------------------------- |
| load | 带有 url 的 pane，iframe加载完成后出发 | (pane: `TabsPaneContext`) |

### Tab-pane Methods

| Method | Description    | Parameters |
| ------ | -------------- | ---------- |
| reload | 刷新iframe页面 | —          |