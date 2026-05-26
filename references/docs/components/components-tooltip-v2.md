---
title: Tooltip V2
originUrl: http://192.168.219.170/docs/vue/latest/component/component/tooltip-v2.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/tooltip-v2.html)

# Tooltip V2

For the existing tooltip, it has too many APIs which is not very intuitive and accessible, so we created this much simpler tooltip, which does only one simple thing - showing tooltip. The structure of having a tooltip is kind of the same, but the API is different. In this version we have provided the components individually, you can compose your own tooltip by using the components.

> **💡 提示**
>
> This component requires the `<client-only></client-only>` wrap when used in SSR (eg: [Nuxt](https://nuxt.com/v3)) and SSG (eg: [VitePress](https://vitepress.vuejs.org/)).

## Basic usage

**Hover** or **tab** on the icon to see the tooltip.

**Demo 示例**: `tooltip-v2/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip-v2.html)

```vue
<template>
  <e-tooltip-v2 aria-label="content" placement="left">
    <template #trigger>
      <e-button circle
        ><e-icon><Plus /></e-icon
      ></e-button>
    </template>
    Basic tooltip
  </e-tooltip-v2>
</template>

<script setup lang="ts">
import { Plus } from '@epoint-fe/eui-icons';
</script>

```

## Accessible tooltip

**Demo 示例**: `tooltip-v2/a11y`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip-v2.html)

```vue
<template>
  <e-tooltip-v2 :aria-label="title">
    <template #trigger>
      <e-button
        ><e-icon><Delete /></e-icon
      ></e-button>
    </template>
    {{ content }}
  </e-tooltip-v2>
</template>

<script setup lang="ts">
import { Delete } from '@epoint-fe/eui-icons';
const content = 'Delete';
const title = 'Delete item';
</script>

```

## Transition / Animation

You may set transition/animation via `CSS` animation/transition or [Transition](https://vuejs.org/guide/built-ins/transition.html#transition) component for your tooltip content when opening.

> **💡 提示**
>
> By default, tooltip v2 ONLY allows a half-way transition/animation which only occurs when the tooltip is shown. This is because the implementation uses `v-if` to show/hide the tooltip. When closing, the content element is removed from DOM, so that the transition / animation will be interrupted.

**Demo 示例**: `tooltip-v2/transition`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip-v2.html)

```vue
<template>
  <!-- eslint-disable vue/require-toggle-inside-transition  -->
  <e-tooltip-v2 aria-label="content" placement="top" content-class="scale-in">
    <template #trigger>
      <e-button circle
        ><e-icon><Plus /></e-icon
      ></e-button>
    </template>
    <div>content</div>
  </e-tooltip-v2>
</template>

<script setup lang="ts">
import { Plus } from '@epoint-fe/eui-icons';
</script>

<style scoped>
@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.e-tooltip-v2__content.scale-in {
  animation: scale-in var(--e-transition-duration) ease-out forwards;
}
</style>

```

### Full transition

Of course, you can have full transition for your tooltip content. But this requires using [Transition](https://vuejs.org/guide/built-ins/transition.html#transition) component, checkout the demo below.

**Demo 示例**: `tooltip-v2/full-transition`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip-v2.html)

```vue
<template>
  <e-tooltip-v2 full-transition :transition-props="transitionProps">
    <template #trigger>
      <e-button circle
        ><e-icon><Plus /></e-icon
      ></e-button>
    </template>
    <div>content</div>
  </e-tooltip-v2>
</template>

<script setup lang="ts">
import { Plus } from '@epoint-fe/eui-icons';

const transitionProps = {
  name: 'el-fade-in-linear',
};
</script>

```

## Render to the root element

By default, unlike [tooltip v1](http://192.168.219.170/docs/vue/latest/component/component/tooltip.html), the tooltip will be rendered to the body element. **tooltip v2** will render to where the trigger/reference element is. But you can still render to to the root element by using `Teleport` component.

**Demo 示例**: `tooltip-v2/render-to-root`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip-v2.html)

```vue
<template>
  <e-tooltip-v2 aria-label="content" teleported to="body">
    <template #trigger>
      <e-button>hover me</e-button>
    </template>
    <div>I am attached to document.body</div>
  </e-tooltip-v2>
</template>

```

## With arrow

**Demo 示例**: `tooltip-v2/arrow`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tooltip-v2.html)

```vue
<template>
  <e-tooltip-v2 aria-label="content" show-arrow always-on placement="top">
    <template #trigger>
      <e-button circle
        ><e-icon><Plus /></e-icon
      ></e-button>
    </template>
    Basic tooltip
  </e-tooltip-v2>
</template>

<script setup lang="ts">
import { Plus } from '@epoint-fe/eui-icons';
</script>

```

<!-- ## Composing your own tooltip -->

## Tooltip V2 APIs

### Tooltip Root

### Tooltip Trigger

### Tooltip Content

### Tooltip Arrow

### Tooltip Reference -->