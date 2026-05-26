---
title: FloatButton
originUrl: http://192.168.219.170/docs/vue/latest/component/component/float-button.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

# 悬浮按钮

## 常规使用

最简单的用法

**Demo 示例**: `float-button/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-container">
    <e-float-button class="float-button" :icon="ChatDotRound" />
    <e-float-button class="float-button" :icon="Edit" disabled :style="{ right: '100px' }" />
  </div>
</template>
<script setup>
import { ChatDotRound, Edit } from '@epoint-fe/eui-icons';
import EFloatButton from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-container {
  position: relative;
  height: 200px;

  .float-button {
    position: absolute;
  }
}
</style>

```

通过 `type` 改变悬浮按钮的类型
**Demo 示例**: `float-button/type`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-container">
    <e-float-button class="float-button" :icon="ChatDotRound" />
    <e-float-button class="float-button" type="primary" :icon="Edit" :style="{ right: '100px' }" />
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { ChatDotRound, Edit } from '@epoint-fe/eui-icons';
import EFloatButton from '@eui-components/components/float-button';

const tooltip = reactive({
  content: '123',
  placement: 'right',
  effect: 'light',
});
</script>
<style lang="scss" scoped>
.float-button-container {
  height: 150px;
  position: relative;

  .float-button {
    position: absolute;
  }
}
</style>

```

通过 `shape` 设置不同的形状
**Demo 示例**: `float-button/shape`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-container">
    <e-float-button class="float-button" :icon="ChatDotRound" />
    <e-float-button class="float-button" shape="square" type="primary" :icon="Edit" :style="{ right: '100px' }" />
  </div>
</template>
<script setup>
import { ChatDotRound, Edit } from '@epoint-fe/eui-icons';
import EFloatButton from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-container {
  height: 150px;
  position: relative;

  .float-button {
    position: absolute;
  }
}
</style>

```

通过 `href` 和 `target` 设置悬浮按钮的跳转链接
**Demo 示例**: `float-button/link`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-container">
    <e-float-button href="https://www.baidu.com" target="_blank" class="float-button" :icon="ShareFilled" />
  </div>
</template>
<script setup>
import { ShareFilled } from '@epoint-fe/eui-icons';
import EFloatButton from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-container {
  height: 150px;
  position: relative;

  .float-button {
    position: absolute;
  }
}
</style>

```

通过 `description` 设置文字内容（任意 `shape` 均可展示；由于空间较小，推荐使用比较精简的双字。）
**Demo 示例**: `float-button/description`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-container">
    <e-float-button class="float-button" shape="square" description="help" :icon="ChatDotRound" />
    <e-float-button class="float-button" shape="square" type="primary" description="help" :style="{ right: '100px' }" />
    <e-float-button
      class="float-button"
      :icon="Edit"
      shape="square"
      type="primary"
      description="help info"
      :style="{ right: '180px' }"
    />
  </div>
</template>
<script setup>
import { ChatDotRound, Edit } from '@epoint-fe/eui-icons';
import EFloatButton from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-container {
  height: 150px;
  position: relative;

  .float-button {
    position: absolute;
  }
}
</style>

```

含有气泡卡片的悬浮按钮
**Demo 示例**: `float-button/tooltip`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-container">
    <e-float-button class="float-button" :tooltip="tooltip" :icon="ChatDotRound" />
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { ChatDotRound, Edit } from '@epoint-fe/eui-icons';
import EFloatButton from '@eui-components/components/float-button';

const tooltip = reactive({
  content: '这是一个悬浮按钮',
  placement: 'right',
  effect: 'light',
});
</script>
<style lang="scss" scoped>
.float-button-container {
  height: 150px;
  position: relative;

  .float-button {
    position: absolute;
  }
}
</style>

```

## 浮动按钮组
**Demo 示例**: `float-button/group`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-group-container">
    <e-float-button-group class="float-button-group-inner" shape="square">
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
    <e-float-button-group class="float-button-group-inner" :style="{ right: '100px' }">
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-group-container {
  height: 200px;
  position: relative;

  .float-button-group-inner {
    position: absolute;
  }
}
</style>

```

菜单模式
**Demo 示例**: `float-button/trigger`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-group-container">
    <e-float-button-group class="float-button-group-inner" shape="square" trigger="hover" :icon="ArrowUp">
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
    <e-float-button-group class="float-button-group-inner" trigger="click" :icon="ArrowUp" :style="{ right: '100px' }">
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { ArrowUp, ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-group-container {
  height: 300px;
  position: relative;

  .float-button-group-inner {
    position: absolute;
  }
}
</style>

```

受控模式
**Demo 示例**: `float-button/trigger-open`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <e-switch v-model="open" />
  <div class="float-button-group-container">
    <e-float-button-group class="float-button-group-inner" :open="open" shape="square" trigger="hover" :icon="ArrowUp">
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
    <e-float-button-group
      class="float-button-group-inner"
      :open="open"
      trigger="click"
      :icon="ArrowUp"
      :style="{ right: '100px' }"
    >
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { ArrowUp, ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';
const open = ref(true);
</script>
<style lang="scss" scoped>
.float-button-group-container {
  height: 300px;
  position: relative;

  .float-button-group-inner {
    position: absolute;
  }
}
</style>

```

菜单模式下触发按钮的辅助文案
**Demo 示例**: `float-button/trigger-description`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-group-container">
    <e-float-button-group
      class="float-button-group-inner"
      shape="square"
      trigger="hover"
      :icon="ArrowUp"
      description="展开"
      close-description="关闭"
    >
      <e-float-button :icon="ChatDotRound" description="客服" />
      <e-float-button :icon="Edit" description="编辑" />
      <e-float-button :icon="Setting" description="设置" />
    </e-float-button-group>
    <e-float-button-group
      class="float-button-group-inner"
      trigger="click"
      :icon="ArrowUp"
      description="展开"
      close-description="关闭"
      :style="{ right: '100px' }"
    >
      <e-float-button :icon="ChatDotRound" description="客服" />
      <e-float-button :icon="Edit" description="编辑" />
      <e-float-button :icon="Setting" description="设置" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { ArrowUp, ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-group-container {
  height: 300px;
  position: relative;

  .float-button-group-inner {
    position: absolute;
  }
}
</style>

```

弹出方向
**Demo 示例**: `float-button/placement`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-group-wrapper">
    <div class="content">
      <e-float-button-group
        v-for="(config, index) in configs"
        :key="index"
        trigger="click"
        class="float-button-group-inner"
        :style="getStyle(config)"
        :placement="config.placement"
        :icon="config.icon"
      >
        <e-float-button :icon="ChatDotRound" />
        <e-float-button :icon="Edit" />
        <e-float-button :icon="Setting" />
      </e-float-button-group>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';

const configs = ref([
  {
    left: '0',
    bottom: '0',
    placement: 'bottom',
    icon: ArrowUp,
  },
  {
    left: '42px',
    top: '0',
    right: 'auto',
    placement: 'left',
    icon: ArrowRight,
  },
  {
    left: '0',
    top: '42px',
    bottom: 'auto',
    placement: 'top',
    icon: ArrowDown,
  },
  {
    right: '0',
    top: '0',
    placement: 'right',
    icon: ArrowLeft,
  },
]);

const getStyle = (config) => {
  const { placement, ...style } = config;
  return style;
};
</script>
<style lang="scss" scoped>
.float-button-group-wrapper {
  position: relative;
  height: 500px;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;

    .float-button-group-inner {
      position: absolute;
    }
  }
}
</style>

```

## 徽标数
**Demo 示例**: `float-button/badge`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-container">
    <e-float-button class="float-button" :icon="ChatDotRound" :badge="{ isDot: true }" />
    <e-float-button
      class="float-button"
      :icon="ChatDotRound"
      :badge="{ value: 10, type: 'primary' }"
      :style="{ right: '100px' }"
      shape="square"
    />
    <e-float-button-group class="float-button-group" :style="{ right: '180px' }">
      <e-float-button :icon="ChatDotRound" :badge="{ value: 10 }" />
      <e-float-button :icon="ChatDotRound" :badge="{ value: 10, type: 'primary' }" />
    </e-float-button-group>
    <e-float-button-group
      class="float-button-group"
      :style="{ right: '260px' }"
      :icon="ArrowUp"
      :badge="{ value: 'new' }"
      trigger="click"
      open
    >
      <e-float-button :icon="ChatDotRound" :badge="{ value: 10, type: 'primary' }" />
      <e-float-button :icon="ChatDotRound" :badge="{ value: 10, type: 'primary' }" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { ArrowUp, ChatDotRound } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';

const badge = reactive({ value: 10 });
</script>
<style lang="scss" scoped>
.float-button-container {
  position: relative;
  height: 250px;

  .float-button {
    position: absolute;
  }

  .float-button-group {
    position: absolute;
  }
}
</style>

```

## 回到顶部
**Demo 示例**: `float-button/backtop`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/float-button.html)

```vue
<template>
  <div class="float-button-group-container">
    <e-float-button-group class="float-button-group-inner" shape="square">
      <e-backtop />
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
    <e-float-button-group class="float-button-group-inner" :style="{ right: '100px' }">
      <e-backtop />
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-group-container {
  height: 280px;
  position: relative;

  .float-button-group-inner {
    position: absolute;
  }
}
</style>

```

## FloatButton API

### FloatButton Attributes

| Name     | Description                                           | Type                          | Default |
| -------- | ----------------------------------------------------- | ----------------------------- | ------- |
| icon     | 自定义图标                                            | Component                     | —       |
| type     | 类型                                                  | ^[enum]`'primary'\| 'default'` | default |
| tooltip  | 气泡卡片的内容                                        | ^[object]                     | —  |
| shape    | 设置按钮形状                                          | ^[enum]`'circle'\| 'square'`  | circle  |
| description | 按钮辅助说明文案（展示在图标下方）                    | ^[string]                     | ''      |
| href     | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | ^[string]                     | —       |
| target   | 相当于 a 标签的 target 属性，href 存在时生效          | ^[string]                     | —       |
| badge    | 带徽标数字的悬浮按钮                                  | ^[object]                     | —       |
| disabled | 按钮是否为禁用状态                                    | ^[boolean]                    | false   |

## FloatButtonGroup API

### FloatButtonGroup Attributes

| Name       | Description                                  | Type                                         | Default |
| ---------- | -------------------------------------------- | -------------------------------------------- | ------- |
| trigger    | 触发方式（有触发方式为菜单模式）             | ^[enum]`'click'\| 'hover'`                   | —       |
| icon       | 自定义触发按钮图标（菜单模式下生效）         | Component                                    | —       |
| close-icon | 自定义触发按钮的关闭图标（菜单模式下生效）   | Component                                    | Close   |
| description| 菜单收起时触发按钮的辅助文案（菜单模式下生效）  | ^[string]                                    | ''      |
| close-description | 菜单展开时触发按钮的辅助文案（菜单模式下生效） | ^[string]                              | ''      |
| placement  | 菜单的折叠方向                               | ^[enum]`'top'\| 'right'\| 'bottom'\| 'left'` | bottom  |
| open       | 菜单的折叠状态                               | ^[boolean]                                   | false   |
| type       | 类型                                         | ^[enum]`'primary'\| 'default'`               | default |
| tooltip    | 气泡卡片的内容                               | ^[object]                                    | —       |
| shape      | 设置按钮形状                                 | ^[enum]`'circle'\| 'square'`                 | circle  |
| target     | 相当于 a 标签的 target 属性，href 存在时生效 | ^[string]                                    | —       |
| badge      | 带徽标数字的悬浮按钮                         | ^[object]                                    | —       |
| disabled   | 按钮是否为禁用状态                           | ^[boolean]                                   | false   |

### FloatButtonGroup Slots

| Name    | Description          | Subtags     |
| ------- | -------------------- | ----------- |
| default | 自定义悬浮按钮组内容 | FloatButton \| BackTop |