---
title: Dropdown
originUrl: http://192.168.219.170/docs/vue/latest/component/component/dropdown.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/dropdown.html)

# Dropdown 下拉菜单

可切换的菜单，用于显示链接和操作列表。

> **💡 提示**
>
> 在 SSR（例如：[Nuxt](https://nuxt.com/v3)）和 SSG（例如：[VitePress](https://vitepress.vuejs.org/)）中使用此组件时，需要使用`<client-only></client-only>`包装。

## 基本使用

将鼠标悬停在下拉菜单上以展开更多操作。

**Demo 示例**: `dropdown/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dropdown.html)

```vue
<template>
  <e-dropdown>
    <span class="e-dropdown-link">
      Dropdown List
      <e-icon class="e-icon--right">
        <arrow-down />
      </e-icon>
    </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item disabled>Action 4</e-dropdown-item>
        <e-dropdown-item divided>Action 5</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@epoint-fe/eui-icons';
</script>
<style scoped>
.example-showcase .e-dropdown-link {
  cursor: pointer;
  color: var(--e-color-primary);
  display: flex;
  align-items: center;
}
</style>

```

## 子菜单

**Demo 示例**: `dropdown/sub-menu`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dropdown.html)

```vue
<template>
  <e-dropdown>
    <span class="e-dropdown-link">
      Dropdown List
      <e-icon class="e-icon--right">
        <arrow-down />
      </e-icon>
    </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-sub-menu title="Action 4">
          <e-dropdown-item>Action 4-1</e-dropdown-item>
          <e-dropdown-item>Action 4-2</e-dropdown-item>
          <e-dropdown-item>Action 4-3</e-dropdown-item>
          <e-dropdown-sub-menu title="Action 4-4">
            <e-dropdown-item>Action 4-4-1</e-dropdown-item>
            <e-dropdown-item>Action 4-4-2</e-dropdown-item>
            <e-dropdown-item>Action 4-4-3</e-dropdown-item>
          </e-dropdown-sub-menu>
        </e-dropdown-sub-menu>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@epoint-fe/eui-icons';
</script>
<style scoped>
.example-showcase .e-dropdown + .e-dropdown {
  margin-left: 15px;
}
.example-showcase .e-dropdown-link {
  cursor: pointer;
  color: var(--e-color-primary);
  display: flex;
  align-items: center;
}
</style>

```

## 触发元素

使用按钮触发下拉列表。

**Demo 示例**: `dropdown/triggering-element`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dropdown.html)

```vue
<template>
  <div class="flex flex-wrap items-center">
    <e-dropdown>
      <e-button type="primary">
        Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
      </e-button>
      <template #dropdown>
        <e-dropdown-menu>
          <e-dropdown-item>Action 1</e-dropdown-item>
          <e-dropdown-item>Action 2</e-dropdown-item>
          <e-dropdown-item>Action 3</e-dropdown-item>
          <e-dropdown-item>Action 4</e-dropdown-item>
          <e-dropdown-item>Action 5</e-dropdown-item>
        </e-dropdown-menu>
      </template>
    </e-dropdown>
    <e-dropdown split-button type="primary" @click="handleClick">
      Dropdown List
      <template #dropdown>
        <e-dropdown-menu>
          <e-dropdown-item>Action 1</e-dropdown-item>
          <e-dropdown-item>Action 2</e-dropdown-item>
          <e-dropdown-item>Action 3</e-dropdown-item>
          <e-dropdown-item>Action 4</e-dropdown-item>
          <e-dropdown-item>Action 5</e-dropdown-item>
        </e-dropdown-menu>
      </template>
    </e-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@epoint-fe/eui-icons';

const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click');
};
</script>
<style scoped>
.example-showcase .e-dropdown + .e-dropdown {
  margin-left: 15px;
}
.example-showcase .e-dropdown-link {
  cursor: pointer;
  color: var(--e-color-primary);
  display: flex;
  align-items: center;
}
</style>

```

## 如何触发

点击触发元素或将鼠标悬停在其上。

**Demo 示例**: `dropdown/how-to-trigger`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dropdown.html)

```vue
<template>
  <e-row class="block-col-2">
    <e-col :span="8">
      <span class="demonstration">hover to trigger</span>
      <e-dropdown>
        <span class="e-dropdown-link">
          Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
        </span>
        <template #dropdown>
          <e-dropdown-menu>
            <e-dropdown-item :icon="Plus">Action 1</e-dropdown-item>
            <e-dropdown-item :icon="CirclePlusFilled"> Action 2 </e-dropdown-item>
            <e-dropdown-item :icon="CirclePlus">Action 3</e-dropdown-item>
            <e-dropdown-item :icon="Check">Action 4</e-dropdown-item>
            <e-dropdown-item :icon="CircleCheck">Action 5</e-dropdown-item>
          </e-dropdown-menu>
        </template>
      </e-dropdown>
    </e-col>
    <e-col :span="8">
      <span class="demonstration">click to trigger</span>
      <e-dropdown trigger="click">
        <span class="e-dropdown-link">
          Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
        </span>
        <template #dropdown>
          <e-dropdown-menu>
            <e-dropdown-item :icon="Plus">Action 1</e-dropdown-item>
            <e-dropdown-item :icon="CirclePlusFilled"> Action 2 </e-dropdown-item>
            <e-dropdown-item :icon="CirclePlus">Action 3</e-dropdown-item>
            <e-dropdown-item :icon="Check">Action 4</e-dropdown-item>
            <e-dropdown-item :icon="CircleCheck">Action 5</e-dropdown-item>
          </e-dropdown-menu>
        </template>
      </e-dropdown>
    </e-col>
    <e-col :span="8">
      <span class="demonstration">right click to trigger</span>
      <e-dropdown trigger="contextmenu">
        <span class="e-dropdown-link">
          Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
        </span>
        <template #dropdown>
          <e-dropdown-menu>
            <e-dropdown-item :icon="Plus">Action 1</e-dropdown-item>
            <e-dropdown-item :icon="CirclePlusFilled"> Action 2 </e-dropdown-item>
            <e-dropdown-item :icon="CirclePlus">Action 3</e-dropdown-item>
            <e-dropdown-item :icon="Check">Action 4</e-dropdown-item>
            <e-dropdown-item :icon="CircleCheck">Action 5</e-dropdown-item>
          </e-dropdown-menu>
        </template>
      </e-dropdown>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { ArrowDown, Check, CircleCheck, CirclePlus, CirclePlusFilled, Plus } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.block-col-2 .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 菜单隐藏行为

使用`hide-on-click`定义点击时是否关闭菜单。

**Demo 示例**: `dropdown/menu-hiding-behavior`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dropdown.html)

```vue
<template>
  <e-dropdown :hide-on-click="false">
    <span class="e-dropdown-link">
      Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
    </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item disabled>Action 4</e-dropdown-item>
        <e-dropdown-item divided>Action 5</e-dropdown-item>
        <e-dropdown-item divided>Action 6</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@epoint-fe/eui-icons';
</script>
<style scoped>
.example-showcase .e-dropdown + .e-dropdown {
  margin-left: 15px;
}
.example-showcase .e-dropdown-link {
  cursor: pointer;
  color: var(--e-color-primary);
  display: flex;
  align-items: center;
}
</style>

```

## 命令事件

单击每个下拉项会触发一个事件，参数由每个项分配。

**Demo 示例**: `dropdown/command-event`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dropdown.html)

```vue
<template>
  <e-dropdown @command="handleCommand">
    <span class="e-dropdown-link">
      Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
    </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item command="a">Action 1</e-dropdown-item>
        <e-dropdown-item command="b">Action 2</e-dropdown-item>
        <e-dropdown-item command="c">Action 3</e-dropdown-item>
        <e-dropdown-item command="d" disabled>Action 4</e-dropdown-item>
        <e-dropdown-item command="e" divided>Action 5</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>

<script lang="ts" setup>
import { EMessage } from '@epoint-fe/eui-components';
import { ArrowDown } from '@epoint-fe/eui-icons';

const handleCommand = (command: string | number | object) => {
  EMessage(`click on item ${command}`);
};
</script>
<style scoped>
.example-showcase .e-dropdown-link {
  cursor: pointer;
  color: var(--e-color-primary);
  display: flex;
  align-items: center;
}
</style>

```

## 下拉方法

您可以通过手动使用`handleOpen`或`handleClose`打开或关闭下拉菜单。

**Demo 示例**: `dropdown/dropdown-methods`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dropdown.html)

```vue
<template>
  <div style="font-size: 14px">
    <p>右键打开（关闭）下拉菜单2将关闭（打开）下拉菜单1。</p>
  </div>
  <div style="margin: 15px">
    <e-button @click="showClick">show</e-button>
  </div>
  <e-dropdown ref="dropdown1" trigger="contextmenu" style="margin-right: 30px">
    <span class="e-dropdown-link"> Dropdown List1 </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item disabled>Action 4</e-dropdown-item>
        <e-dropdown-item divided>Action 5</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>

  <e-dropdown trigger="contextmenu" @visible-change="handleVisible2">
    <span class="e-dropdown-link"> Dropdown List2 </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item disabled>Action 4</e-dropdown-item>
        <e-dropdown-item divided>Action 5</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DropdownInstance } from '@epoint-fe/eui-components';

const dropdown1 = ref<DropdownInstance>();
function handleVisible2(visible: any) {
  if (!dropdown1.value) return;
  if (visible) {
    dropdown1.value.handleClose();
  } else {
    dropdown1.value.handleOpen();
  }
}
function showClick() {
  if (!dropdown1.value) return;
  dropdown1.value.handleOpen();
}
</script>
<style scoped>
.example-showcase .e-dropdown-link {
  cursor: pointer;
  color: var(--e-color-primary);
  display: flex;
  align-items: center;
}
</style>

```

## 尺寸

除了默认大小，下拉组件还为您提供了三种附加大小，供您在不同的场景中选择。

**Demo 示例**: `dropdown/sizes`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dropdown.html)

```vue
<template>
  <e-dropdown size="large" split-button type="primary">
    Large
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item>Action 4</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>

  <e-dropdown split-button type="primary">
    Default
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item>Action 4</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>

  <e-dropdown size="small" split-button type="primary">
    Small
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item>Action 4</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>
<style scoped>
.example-showcase .e-dropdown + .e-dropdown {
  margin-left: 15px;
}
</style>

```

## Dropdown API

### Dropdown Attributes

| Name                | Description                                                                                          | Type                                                                                     | Default                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| type                | 菜单按钮类型，参考 `Button` 组件，仅在 `split-button` 为 true 时工作                                 | ^[string]                                                                                | —                                                                          |
| size                | 菜单大小，也适用于分割按钮                                                                           | ^[枚举]`'large' \| 'default' \| 'small'`                                                 | default                                                                    |
| max-height          | 菜单的最大高度                                                                                       | ^[string] / ^[number]                                                                    | —                                                                          |
| split-button        | 是否显示按钮组                                                                                       | ^[boolean]                                                                               | false                                                                      |
| disabled            | 是否禁用                                                                                             | ^[boolean]                                                                               | false                                                                      |
| placement           | 弹出菜单的位置                                                                                       | ^[枚举]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'` | bottom                                                                     |
| trigger             | 如何触发                                                                                             | ^[枚举]`'hover' \| 'click' \| 'contextmenu'`                                             | hover                                                                      |
| hide-on-click       | 在点击菜单项后是否隐藏菜单                                                                           | ^[boolean]                                                                               | true                                                                       |
| show-timeout        | 显示下拉菜单前的延迟时间（仅当触发为 `hover` 时有效）                                                | ^[number]                                                                                | 250                                                                        |
| hide-timeout        | 隐藏下拉菜单前的延迟时间（仅当触发为 `hover` 时有效）                                                | ^[number]                                                                                | 150                                                                        |
| role                | 下拉菜单的 ARIA 角色属性。根据使用场景，您可能希望将其更改为 'navigation'                            | ^[string]                                                                                | 'menu'                                                                     |
| tabindex            | Dropdown 的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | ^[number]                                                                                | 0                                                                          |
| popper-class        | Dropdown 的下拉自定义类名                                                                            | ^[string]                                                                                | —                                                                          |
| popper-options      | [popper.js](https://popper.js.org/docs/v2/) 参数                                                     | `Object` 参考 [popper.js](https://popper.js.org/docs/v2/) 文档                           | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| teleported          | 是否将下拉列表插入至 body 元素                                                                       | ^[boolean]                                                                               | true                                                                       |
| close-on-click-body | 是否在点击body空白位置时关闭下拉                                                                     | ^[boolean]                                                                               | true                                                                       |
| before-close        | 下拉菜单关闭前的回调，它将阻止下拉关闭                                                               | 函数(done) (done 用于关闭 Dialog)，Element(Element 为当前事件DOOM)                       | —                                                                          |
| visible             | 控制下拉菜单显隐，配置后下拉菜单的显隐只能通过此属性控制                                             | ^[boolean]                                                                               | undefined                                                                  |

### Dropdown Slots

| Name     | Description                                                                                                               | Subtags       |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | ------------- |
| —        | 触发下拉菜单的元素，必须是一个 dom 元素 (ex. `<span>, <button> etc.`) 或者 `e-component`, 将在这个元素/组件上监听触发事件 | —             |
| dropdown | Dropdown 菜单的内容，通常是一个 `<e-dropdown-menu>` 元素                                                                  | Dropdown-Menu |

### Dropdown Events

| Name           | Description                                         | Parameters                  |
| -------------- | --------------------------------------------------- | --------------------------- |
| click          | 如果 `split-button` 为 `true`，则在单击左按钮时触发 | —                           |
| command        | 当单击下拉项时触发                                  | 从下拉项派发的命令          |
| visible-change | 当下拉菜单出现/消失时触发                           | 出现时为 true，否则为 false |
| after-hide     | 当下拉菜单消失动画结束后触发                        | —                           |

### Dropdown Methods

| Method      | Description  | Parameters |
| ----------- | ------------ | ---------- |
| handleOpen  | 打开下拉菜单 | —          |
| handleClose | 关闭下拉菜单 | —          |

### Dropdown-Menu Slots

| Name | Description         | Subtags                         |
| ---- | ------------------- | ------------------------------- |
| —    | Dropdown 菜单的内容 | Dropdown-Item/Dropdown-Sub-Menu |

## Dropdown-Sub-Menu API

### Dropdown-Sub-Menu Attributes

| Name     | Description  | Type          | Default |
| -------- | ------------ | ------------- | ------- |
| title    | 子菜单标题   | string/number | —       |
| disabled | 项是否已禁用 | boolean       | false   |

### Dropdown-Sub-Menu Slots

| Name | Description           | Subtags                         |
| ---- | --------------------- | ------------------------------- |
| —    | Dropdown 子菜单的内容 | Dropdown-Item/Dropdown-Sub-Menu |

## Dropdown-Item API

### Dropdown-Item Attributes

| Name     | Description                               | Type                  | Default |
| -------- | ----------------------------------------- | --------------------- | ------- |
| command  | 要派发到 Dropdown 的 `command` 回调的命令 | string/number/object  | —       |
| disabled | 项是否已禁用                              | boolean               | false   |
| divided  | 是否显示分隔符                            | boolean               | false   |
| icon     | 自定义图标                                | `string \| Component` | —       |

### Dropdown-Item Slots

| Name | Description        |
| ---- | ------------------ |
| —    | 自定义 Dropdown 项 |