---
title: Collapse 折叠面板
originUrl: http://192.168.219.170/docs/vue/latest/component/component/collapse.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

**Demo 示例**: `collapse/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="demo-collapse">
    <e-collapse v-model="activeItems" @change="handleChange">
      <e-collapse-item id="1" title="一致性">
        <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <div>操作反馈：通过样式更新和交互效果使用户清晰感知其操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3" title="效率">
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确和清晰：明确表达您的意图，以便用户能够迅速理解并做出决策；</div>
        <div>易于识别：界面应该直截了当，帮助用户辨识，并让他们免于记忆和回忆。</div>
      </e-collapse-item>
      <e-collapse-item id="4" title="可控性">
        <div>决策制定：提供关于操作的建议是可以接受的，但不要代替用户做决策；</div>
        <div>可控的后果：用户应该获得自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeItems = ref(['1']);
const handleChange = (val: string[]) => {
  console.log(val);
};
</script>

```

## 不同大小

可同时展开多个面板，面板之间不影响

**Demo 示例**: `collapse/size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="demo-collapse">
    <e-select v-model="size">
      <e-option v-for="option in sizeOptions" :key="option" :value="option" />
    </e-select>
    <e-divider />
    <e-collapse :size="size">
      <e-collapse-item id="1" title="这是一个 size 为 small 的标题" size="small" tooltip="tooltip" />
      <e-collapse-item id="2" title="这是一个 size 为 large 的标题" size="large" tooltip="tooltip" />
      <e-collapse-item id="3" :title="`这是一个 size 为 ${size} 的标题`" tooltip="tooltip" />
      <e-collapse-item id="4" :title="`这是一个 size 为 ${size} 的标题`" tooltip="tooltip" tooltip-mode="text" />
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const sizeOptions = ['small', 'default', 'large'];

const size = ref('default');
</script>

```

## 显示导航栏

**Demo 示例**: `collapse/nav`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="demo-collapse">
    <e-checkbox v-model="showNav">显示导航栏</e-checkbox>
    <e-collapse v-model="activeItem" :show-nav="showNav" nav-affix :nav-offset="55" :nav-affix-offset="55">
      <e-collapse-item id="1" title="一致性">
        <div>与现实生活保持一致：与现实生活的过程和逻辑一致，并符合用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应保持一致，如设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <div>操作反馈：通过样式更新和交互效果使用户清晰地感知其操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3" title="效率">
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确清晰：明确表达您的意图，以便用户能够快速理解并做出决策；</div>
        <div>易于识别：界面应该直接，有助于用户识别，避免他们记忆和回想。</div>
      </e-collapse-item>
      <e-collapse-item id="6" title="可控性">
        <div>决策制定：提供操作建议是可以接受的，但不要为用户做决策；</div>
        <div>可控的后果：用户应该被授予自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
      <e-collapse-item id="5" :title="itemTitle">
        <div>
          <e-input v-model="textValue" style="width: 150px; margin-right: 5px" />
          <e-button type="primary" @click="itemTitle = textValue">更新标题</e-button>
        </div>
        <div>可控的后果：用户应该被授予自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeItem = ref('1');
const showNav = ref(true);

const itemTitle = ref('可编辑名称');
const textValue = ref('可编辑名称');
</script>

```

## 显示序号

**Demo 示例**: `collapse/index`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="demo-collapse">
    <e-checkbox v-model="showIndex">显示索引</e-checkbox>
    <e-collapse v-model="activeItem" :show-index="showIndex" class="collapse">
      <e-collapse-item id="1" title="一致性">
        <div>与现实生活保持一致：与现实生活的过程和逻辑一致，并符合用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应保持一致，如设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <div>操作反馈：通过样式更新和交互效果使用户清晰地感知其操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3" title="效率">
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确清晰：明确表达您的意图，以便用户能够快速理解并做出决策；</div>
        <div>易于识别：界面应该直接，有助于用户识别，避免他们记忆和回想。</div>
      </e-collapse-item>
      <e-collapse-item title="可控性">
        <div>决策制定：提供操作建议是可以接受的，但不要为用户做决策；</div>
        <div>可控的后果：用户应该被授予自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showIndex = ref(true);
const activeItem = ref('1');
</script>

```

## 隐藏标题前色块

**Demo 示例**: `collapse/header-prefix`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="demo-collapse">
    <e-collapse v-model="activeItems" header-prefix="none">
      <e-collapse-item id="1" title="一致性">
        <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <div>操作反馈：通过样式更新和交互效果使用户清晰感知其操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3" title="效率">
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确和清晰：明确表达您的意图，以便用户能够迅速理解并做出决策；</div>
        <div>易于识别：界面应该直截了当，帮助用户辨识，并让他们免于记忆和回忆。</div>
      </e-collapse-item>
      <e-collapse-item id="4" title="可控性">
        <div>决策制定：提供关于操作的建议是可以接受的，但不要代替用户做决策；</div>
        <div>可控的后果：用户应该获得自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeItems = ref(['1']);
</script>

```

## 设置箭头样式

**Demo 示例**: `collapse/arrow-type`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="demo-collapse">
    <e-collapse v-model="activeItems" :arrow-type="'icon'">
      <e-collapse-item id="1" title="一致性">
        <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <div>操作反馈：通过样式更新和交互效果使用户清晰感知其操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3" title="效率">
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确和清晰：明确表达您的意图，以便用户能够迅速理解并做出决策；</div>
        <div>易于识别：界面应该直截了当，帮助用户辨识，并让他们免于记忆和回忆。</div>
        <template #arrow="{ isActive }">
          <span>{{ isActive ? '收起' : '展开' }}</span>
        </template>
      </e-collapse-item>
      <e-collapse-item id="4" title="可控性">
        <div>决策制定：提供关于操作的建议是可以接受的，但不要代替用户做决策；</div>
        <div>可控的后果：用户应该获得自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeItems = ref(['1']);
</script>

```

## 帮助提示

**Demo 示例**: `collapse/collapse-item-help-tooltip`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="collapse-help-tip-demo">
    <e-collapse v-model="activeItems">
      <e-collapse-item id="basic" title="基础帮助提示" tooltip="这一项用于说明标题旁的补充信息。">
        <div>字符串会作为 Tooltip 的 content 展示。</div>
      </e-collapse-item>

      <e-collapse-item id="object" title="对象配置提示" :tooltip="objectTooltip">
        <div>对象形式可继续传入 content、placement、effect、showArrow 等 Tooltip 配置。</div>
      </e-collapse-item>

      <e-collapse-item
        id="text"
        title="纯文本提示"
        tooltip="这一段内容直接展示在标题右侧。"
        tooltip-mode="text"
        tooltip-status="warning"
      >
        <div>纯文本模式由 CollapseItem 自己渲染，不创建帮助提示图标。</div>
      </e-collapse-item>

      <e-collapse-item id="slot" title="插槽内容提示" :tooltip="slotTooltip">
        <template #tooltip-content>
          <div class="collapse-help-tip-demo__tooltip-content">
            <div class="collapse-help-tip-demo__tooltip-title">高级配置说明</div>
            <div>提示内容可以通过 tooltip-content 插槽自定义。</div>
            <div>placement、effect 等配置仍然从 tooltip 属性透传。</div>
          </div>
        </template>
        <div>当 tooltip-content 插槽存在时，帮助提示内容使用插槽渲染。</div>
      </e-collapse-item>

      <e-collapse-item
        id="custom-icon"
        title="自定义图标"
        tooltip="可以通过 tooltip-icon 替换默认帮助图标。"
        :tooltip-icon="InfoFilled"
      >
        <div>自定义图标仍然复用 Tooltip 的触发能力。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InfoFilled } from '@epoint-fe/eui-icons';

const activeItems = ref(['basic', 'object', 'text', 'slot', 'custom-icon']);

const objectTooltip = {
  content: '对象模式：提示显示在右侧，使用 dark 主题，并且关闭箭头。',
  placement: 'right',
  effect: 'dark',
  showArrow: false,
} as const;

const slotTooltip = {
  placement: 'right',
  effect: 'light',
  showArrow: true,
} as const;
</script>

<style lang="scss" scoped>
.collapse-help-tip-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__tooltip-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 260px;
    line-height: 20px;
  }

  &__tooltip-title {
    font-weight: 600;
    color: var(--e-text-color-primary);
  }
}
</style>

```

## 隐藏展开收起按钮

**Demo 示例**: `collapse/show-arrow`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="demo-collapse">
    <e-collapse v-model="activeItems" :show-arrow="false">
      <e-collapse-item id="1" title="一致性">
        <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <div>操作反馈：通过样式更新和交互效果使用户清晰感知其操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3" title="效率">
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确和清晰：明确表达您的意图，以便用户能够迅速理解并做出决策；</div>
      </e-collapse-item>
      <e-collapse-item id="4" title="可控性（单项隐藏）" :show-arrow="true">
        <div>决策制定：提供关于操作的建议是可以接受的，但不要代替用户做决策；</div>
        <div>可控的后果：用户应该获得自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeItems = ref(['1', '2', '3', '4']);
</script>

```

## 手风琴效果

每次只能展开一个面板

**Demo 示例**: `collapse/accordion`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="demo-collapse">
    <e-collapse v-model="activeItem" accordion>
      <e-collapse-item id="1" title="一致性">
        <div>与现实生活保持一致：与现实生活的过程和逻辑一致，并符合用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应保持一致，如设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <div>操作反馈：通过样式更新和交互效果使用户清晰地感知其操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3" title="效率">
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确清晰：明确表达您的意图，以便用户能够快速理解并做出决策；</div>
        <div>易于识别：界面应该直接，有助于用户识别，避免他们记忆和回想。</div>
      </e-collapse-item>
      <e-collapse-item id="4" title="可控性">
        <div>决策制定：提供操作建议是可以接受的，但不要为用户做决策；</div>
        <div>可控的后果：用户应该被授予自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeItem = ref('1');
</script>

```

## 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。

**Demo 示例**: `collapse/customization`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/collapse.html)

```vue
<template>
  <div class="demo-collapse">
    <e-collapse accordion>
      <e-collapse-item id="1" title="一致性">
        <template #index="{ index, formattedIndex }">
          <span class="index" style="color: red">
            程序员中默认认为起始是 {{ index }} 但是人更习惯认为是 {{ formattedIndex }}
          </span>
        </template>
        <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
      </e-collapse-item>
      <e-collapse-item id="2" title="反馈">
        <template #index>
          <span class="index">2</span>
        </template>
        <div>操作反馈：通过样式更新和交互效果使用户能够清晰地感知他们的操作；</div>
        <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
      </e-collapse-item>
      <e-collapse-item id="3">
        <template #title>
          效率<e-icon class="header-icon">
            <info-filled />
          </e-icon>
        </template>
        <div>简化流程：保持操作流程简单和直观；</div>
        <div>明确和清晰：明确表达您的意图，以便用户能够迅速理解并做出决策；</div>
        <div>易于识别：界面应该直截了当，帮助用户辨识，避免他们记忆和回忆。</div>
      </e-collapse-item>
      <e-collapse-item id="4" title="可控性">
        <div>决策制定：提供关于操作的建议是可以接受的，但不要代替用户做决策；</div>
        <div>可控的后果：用户应该被赋予自由操作的权利，包括取消、中止或终止当前操作。</div>
      </e-collapse-item>
    </e-collapse>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from '@epoint-fe/eui-icons';
</script>
<style scoped lang="scss">
.index {
  color: #f00;
  font-weight: bold;
  margin-right: 6px;
}
</style>

```

## API

### Collapse Attributes

| Name                  | Description                                                                   | Type                                       | Default |
| --------------------- | ----------------------------------------------------------------------------- | ------------------------------------------ | ------- |
| model-value / v-model | model 当前激活的面板(如果是手风琴模式，绑定值类型需要为 string，否则为 array) | string (手风琴模式) / array (非手风琴模式) | —       |
| accordion             | 是否手风琴模式                                                                | ^[boolean]                                 | false   |
| show-nav              | 是否显示导航栏                                                                | ^[boolean]                                 | false   |
| show-index            | 是否显示序号                                                                  | ^[boolean]                                 | false   |
| nav-affix             | 导航栏是否开启固钉                                                            | ^[boolean]                                 | true    |
| nav-affix-offset      | 导航栏固定偏移位置                                                            | ^[number]                                  | 0       |
| nav-offset            | 滚动条偏移距离                                                                | ^[number]                                  | 0       |
| header-prefix         | 标题前色块                                                                    | ^[string]`'none' \| 'block'`               | 'block' |
| arrow-type            | 折叠箭头类型                                                                  | ^[string]`'icon' \| 'text'`                | 'text'  |
| show-arrow            | 是否显示展开收起箭头按钮                                                      | ^[boolean]                                 | true    |
| size                  | 统一设置所有子面板标题区尺寸，可被 CollapseItem 的 `size` 属性覆盖            | ^[enum]`'default' \| 'large' \| 'small'`   | —       |
| scrollbar-option      | 折叠面板内容的滚动条配置                                                      | ^[object]                                  |         |

### Collapse Events

| Name   | Description                                                                            | Parameters                                                |
| ------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| change | 当前激活面板改变时触发(如果是手风琴模式，参数 activeNames 类型为 string，否则为 array) | (activeNames: array (非手风琴模式) / string (手风琴模式)) |

### Collapse Slots

| Name | Description    | Subtags       |
| ---- | -------------- | ------------- |
| -    | 自定义默认内容 | Collapse Item |

### Collapse Item Attributes

| Name              | Description                                                                               | Type                                                               | Default |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| name^(deprecated) | 唯一标志符,弃用，下版本删除，请使用`id`                                                   | ^[string] / ^[boolean]                                             | —       |
| id                | 唯一标志符                                                                                | ^[string] / ^[boolean]                                             | —       |
| title             | 面板标题                                                                                  | ^[string]                                                          | —       |
| disabled          | 是否禁用                                                                                  | ^[boolean]                                                         | —       |
| size              | 面板标题区尺寸，会影响标题字号、帮助提示间距和箭头文案字号，优先级高于 Collapse 的 `size` | ^[enum]`'default' \| 'large' \| 'small'`                           | —       |
| show-arrow        | 是否显示展开收起箭头按钮，优先级高于 Collapse 的 `show-arrow`                             | ^[boolean]                                                         | —       |
| tooltip           | 标题右侧的帮助提示内容。支持字符串，或 Tooltip 配置对象                                   | ^[string] / ^[object]`Partial<ETooltipProps>`                      | ''      |
| tooltip-icon      | 自定义帮助提示图标                                                                        | ^[Component]                                                       | —       |
| tooltip-mode      | 帮助提示展示形式，`text` 时直接在标题右侧渲染纯文本                                       | ^[enum]`'tooltip' \| 'text'`                                       | tooltip |
| tooltip-status    | 纯文本模式下的文字状态                                                                    | ^[enum]`'default' \| 'warning' \| 'danger' \| 'success' \| 'info'` | default |

### Collapse Item Slot

| Name            | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| —               | Collapse Item 的内容                                              |
| title           | Collapse Item title 的内容                                        |
| index           | Collapse Item index 的内容 v-slot:index="{index, formattedIndex}" |
| tooltip-content | 自定义帮助提示浮层内容                                            |
| extra           | Collapse Item 标题区的扩展内容，位于帮助提示之后、箭头之前        |
| arrow           | Collapse Item arrow 箭头自定义内容 v-slot:arrow="{isActive}"      |