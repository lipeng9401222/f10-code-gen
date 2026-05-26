---
title: 可配置组件开发
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/development/configurable/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/development/configurable/)

![](http://192.168.219.170/docs/vue/latest/frame/_astro/config-2.DHzM0rvK_2pcJfJ.webp)

## 组件配置

组件配置面板可以帮助用户快速、直观地调整组件的属性。

| 页面偏好                                         | 快捷配置                                         |
| ------------------------------------------------ | ------------------------------------------------ |
| ![](http://192.168.219.170/docs/vue/latest/frame/_astro/configuration-1-1.HD1u4UUp_ypOO8.webp) | ![](http://192.168.219.170/docs/vue/latest/frame/_astro/configuration-2-1.DJddlGUw_Zl7O1m.webp) |

如上表格，左侧显示列、数据排序、表格样式、间距都是表格的可视化配置面板（部分需要页面刷新后生效），右侧数据排序、显示列、
间距是表格的快捷配置（即时生效）。

此文介绍如何实现 DataGrid 组件的**间距配置**面板。

## 组件规范

通过制定组件的开发和使用规范，来实现在页面运行时自动扫描出可配置组件，并自动生成配置界面，从而实现页面组件的可配置功能。

### 开发规范

相对于常规的组件开发，需要额外再做两件事：添加开发配置组件和添加配置属性。

#### 开发配置组件

为了给 `datagrid` 提供配置能力，需要自己开发一个供支持的配置组件，我们约定配置组件就近放置在组件自己的同级目录中，现在以
间距配置组件 为例。

##### 页面偏好组件

![](http://192.168.219.170/docs/vue/latest/frame/_astro/configuration-1-1.HD1u4UUp_ypOO8.webp)

在 `datagrid.vue` 的同级添加 `datagrid-edit-space.vue` 文件，如下图：

**页面偏好组件-命名规范**：组件名-edit-配置名.vue

![](http://192.168.219.170/docs/vue/latest/frame/_astro/configuration-5.BUus-10-_6EM5Q.webp)

<details>
<summary>datagrid-edit-space.vue</summary>

```vue
<template>
  <transition-group tag="ul" class="btn-list-config">
    <div class="btn-title">
      <span class="title-text"> {{ t('preferences.dataGrid.space.title') }} </span>
    </div>

    <e-radio-group key="datagrid-edit-space" class="fixed-radio-group" v-model="modelConfig.space">
      <e-radio :value="item.value" size="large" border v-for="(item, index) in spaceList" :key="index">
        {{ item.name }}

        <div class="icon-right-btn">
          <img :src="item.icon" alt="" />
        </div>
      </e-radio>
    </e-radio-group>
  </transition-group>
</template>
<script setup>
import { ERadio, ERadioGroup } from '@epoint-fe/eui-components';
import { ref } from 'vue';
import SpaceDefault from './images/space-default.svg';
import SpaceLoose from './images/space-loose.svg';
import SpaceNormal from './images/space-normal.svg';
import SpaceTight from './images/space-tight.svg';

import { restoreSpaceConfig } from './util';

import { useI18n } from '@/i18n';

const { t } = useI18n();

const props = defineProps({
  config: {
    type: [Object, String]
  },
  originalConfig: {
    type: Object
  }
});

const modelConfig = ref(restoreSpaceConfig(props.originalConfig, props.config));

const spaceList = [
  {
    name: t('preferences.dataGrid.space.default'),
    value: 'default',
    icon: SpaceDefault
  },
  {
    name: t('preferences.dataGrid.space.tight'),
    value: 'tight',
    icon: SpaceTight
  },
  {
    name: t('preferences.dataGrid.space.normal'),
    value: 'normal',
    icon: SpaceNormal
  },
  {
    name: t('preferences.dataGrid.space.loose'),
    value: 'loose',
    icon: SpaceLoose
  }
];

const getChangedData = () => {
  return {
    space: modelConfig.value.space
  };
};

const resetConfig = () => {
  modelConfig.value = restoreSpaceConfig(props.originalConfig, '');
};

defineExpose({
  resetConfig,
  getConfig: () => getChangedData(),
  getOriginalConfig: () => props.originalConfig
});
</script>

<style lang="less" scoped>
@import '../../style/use-configurable.less';

.icon-right-btn {
  font-size: 26px;
  width: 40px;
  height: 40px;
  background: var(--e-fill-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--e-border-radius-small);
}

.btn-list-config {
  padding-right: var(--e-space-xxl);
}

.fixed-radio-group {
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;
  align-items: flex-start;

  .e-radio {
    height: 64px;
    width: 100%;
    :deep(.e-radio__label) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
    }
  }
}
</style>
```

</details>

<details>
<summary>util.js</summary>

```js
import { deepClone } from '@/utils';

export const restoreSpaceConfig = (originalConfig, config) => {
  const _originalConfig = deepClone({ space: originalConfig.space });

  let space = _originalConfig.space;

  if (config) {
    if (config.space) {
      space = config.space;
    }
  }

  return {
    space
  };
};
```

</details>

约定在配置组件中需要对外暴露三个方法，如下：

```js
defineExpose({
  resetConfig,
  getConfig: () => getChangedData(),
  getOriginalConfig: () => props.originalConfig
});
```

配置说明：

- `resetConfig` 用于重置功能
- `getConfig` 用于获取当前配置的数据
- `getOriginalConfig` 用于获取原始数据

> **💡 提示**
>
> 由于我们内部使用 h 函数来创建配置面板，它无法识别出上下文环境中注册的全局组件（`eui-components` 中的组件和框架的布局组件
> ）。所以我们在开发配置组件时，所有使用的子组件都需要手动引入。
> 
> 比如： `import { ERadio, ERadioGroup } from '@epoint-fe/eui-components';`

##### 快捷配置组件

![](http://192.168.219.170/docs/vue/latest/frame/_astro/configuration-2-1.DJddlGUw_Zl7O1m.webp)

在 `datagrid.vue` 的同级添加 `internal-space.vue` 文件，如下图：

**页面偏好组件-命名规范**：internal-配置名.vue

![](http://192.168.219.170/docs/vue/latest/frame/_astro/configuration-5-1.BGycrMvQ_ZgdJgk.webp)

<details>
<summary>internal-space.vue</summary>

```vue
<template>
  <e-dropdown-item v-for="(item, index) in spaceList" :key="index">
    <div class="space-item" :class="{ active: currentSpace === item.value }" @click="selectSpace(item)">
      <div class="space-item-content">
        <div class="space-icon">
          <img :src="item.icon" alt="" />
        </div>
        <span>{{ item.name }}</span>
      </div>
      <e-icon v-if="currentSpace === item.value"><Check /></e-icon>
    </div>
  </e-dropdown-item>
</template>

<script setup>
import { useI18n } from '@/i18n';
import { Check } from '@epoint-fe/eui-icons';
import { ref } from 'vue';
import SpaceDefault from './images/space-default.svg';
import SpaceLoose from './images/space-loose.svg';
import SpaceNormal from './images/space-normal.svg';
import SpaceTight from './images/space-tight.svg';

const { t } = useI18n();

const emit = defineEmits(['update', 'openSortPreference']);

const props = defineProps({
  space: {
    type: String,
    default: () => 'default'
  }
});

const currentSpace = ref(props.space);

const spaceList = [
  {
    name: t('preferences.dataGrid.space.theme'),
    value: 'default',
    icon: SpaceDefault
  },
  {
    name: t('preferences.dataGrid.space.tight'),
    value: 'tight',
    icon: SpaceTight
  },
  {
    name: t('preferences.dataGrid.space.normal'),
    value: 'normal',
    icon: SpaceNormal
  },
  {
    name: t('preferences.dataGrid.space.loose'),
    value: 'loose',
    icon: SpaceLoose
  }
];

const selectSpace = (item) => {
  currentSpace.value = item.value;
  emit('update', item.value);
};
</script>

<style lang="less" scoped>
.default-sort {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  .default-sort-title {
    flex: 1;
  }
}
.space-item {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  width: 96px;

  .space-item-content {
    display: flex;
    align-items: center;
  }

  &.active {
    color: var(--e-color-primary);
  }

  .space-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 20px;
    margin-right: 8px;
    img {
      max-width: 100%;
    }
  }
}
</style>
```

</details>

#### 添加配置属性

为了能让页面开发人员可以自己决定组件是否需要开启配置功能，需要对外提供一个可配置属性，我们约定该属性名字为
`configurable`，类型为 `boolean`。

为了在生成配置面板的时候，给每个组件的配置面板设置个名字方便识别，并且也需要开发人员可配置，我们约定该属性名字为
`configPanelName`, 类型为 `string`，可以给一个默认值，但是如果页面中使用多个表格时必须添加该属性且值不同，保证每个 组件
的配置面板不冲突。

为了在生成页面配置数据时，能够区分数据是属于页面中的哪个组件的，需要给组件提供一个唯一的配置标识，我们约定该属性名字为
`configId`，类型为 `string`,可以给一个默认值，但是如果页面中使用多个表格时必须添加该属性且值不同，保证每个 组件的配置面
板不冲突。

```js
const props = defineProps({
  configurable: Boolean, // 是否开启配置功能
  configPanelName: {
    // 配置面板名称
    type: String,
    default: ''
  },
  configId: {
    type: String,
    default: 'datagrid'
  } // 配置标识
});
```

在上一步开发好配置组件后，需要在 `datagrid.vue` 中引入该配置组件，同时需要在 `datagrid.vue` 中通过 `defineExpose` 宏暴露
出一些方法，如下：

```js

// 个性化配置-字段名-默认值映射
const configurableProps = { columns: '', sortConfig: '', borderStyle: undefined, stripe: undefined, space: 'default' };

const extractProps = (source) => {
  const result: Record<string, any> = {};

  for (const prop in configurableProps) {
    const defaultValue = configurableProps[prop];
    result[prop] = source[prop] ?? defaultValue;
  }
  return result;
};

let originalConfig = JSON.parse(JSON.stringify(extractProps(props)));

const editorMap: { id: string; title: string; editor: Component; fields?: string[] }[] = [];
const internalEditorMap: { id: string; title: string; editor?: Component; onClick?: () => void }[] = [];

const initConfig = async (pageConfig) => {}

defineExpose({
  getConfigPanelName: () => {
    return props.configPanelName || t('preferences.dataGrid.configPanelName'); // 此处为了国际化， props.configPanelName 是空的，直接从国际化那边获取
  },
  // 获取页面偏好中配置组件的方法
  getEditor: () => editorMap,
  // 获取快捷配置中配置组件的方法
  getInternalEditor: () => internalEditorMap,
  // 更新配置的方法
  updateConfig: (id, cfg) => {
  },
  // 获取当前生效的完整配置
  getConfig: (id) => {
  }
  getOriginalConfig: () => originalConfig,
  initConfig
});

```

`defineExpose` 中配置说明：

- `getConfigPanelName` ：获取 `datagrid` 组件的名称
- `getEditor` ：获取页面偏好中配置组件列表
- `getInternalEditor` ：获取快捷配置中配置组件列表
- `updateConfig` ：更新配置数据的方法
- `getConfig` ：获取当前生效的完整配置的方法
- `getOriginalConfig` ：获取当前原始完整配置的方法
- `initConfig` ：拿到配置数据后进行整合初始化的方法

`editorMap` 中配置说明：

- `id`: 配置 id，建议与页面偏好组件-命名规范中 `配置名` 一致
- `title`: 配置名称，显示在页面偏好左侧 tab 中的名称
- `editor`: 引入的组件
- `fields`: 该组件需要用到的字段，可传到 updateConfig 中第三位参数，根据实际情况看是否需要用

`internalEditorMap` 中配置说明：

- `id`: 配置 id，建议与页面偏好组件-命名规范中 `配置名` 一致
- `title`: 配置名称，显示在页面偏好左侧 tab 中的名称
- `editor`: 引入的组件，这里要用 `h` 方法来渲染组件，非必须
- `onClick`: 配置的点击事件，可参考 表格中显示列的功能，点击后直接打开弹窗，非必须

以当前间距配置组件为例，部分代码如下：

<details>
<summary>datagird.vue</summary>

```vue
<script setup lang="ts">
import EditorSpace from './datagrid-edit-space.vue';
import InternalSpacePanel from './internal-space.vue';
import { restoreSpaceConfig } from './util';

const props = defineProps({
  space: { type: String, default: 'default' }, // 间距
  configurable: Boolean,
  configId: {
    type: String,
    default: 'datagrid'
  },
  configPanelName: {
    type: String,
    default: '' // 表格配置
  }
});

// 个性化配置-字段名-默认值映射
const configurableProps = { space: 'default' };

// 初始化配置，用于保存初始化配置
const initPageConfig = ref({});

const extractProps = (source) => {
  const result: Record<string, any> = {};

  for (const prop in configurableProps) {
    const defaultValue = configurableProps[prop];
    result[prop] = source[prop] ?? defaultValue;
  }
  return result;
};

const config = ref(extractProps(props));
let originalConfig = JSON.parse(JSON.stringify(extractProps(props)));

const editorMap: { id: string; title: string; editor: Component; fields?: string[] }[] = [
  {
    id: 'space',
    title: t('preferences.dataGrid.spaceName'),
    editor: EditorSpace,
    fields: ['space']
  }
];

const internalEditorMap = [
  {
    id: 'space',
    title: t('preferences.dataGrid.spaceName'),
    editor: () =>
      h(InternalSpacePanel, {
        space: config.value.space,
        onUpdate: (space) => {
          setSpace(space);
        }
      })
  }
];

const initConfig = async (pageConfig) => {
  // 保存初始化配置
  initPageConfig.value = pageConfig;

  const spaceConfig = restoreSpaceConfig(props, pageConfig[`${props.configId}-space`]);

  const currentMd5 = await generateCryptoSignature(originalConfig);

  if (pageConfig) {
    editorMap.forEach((item) => {
      if (pageConfig[`${props.configId}-${item.id}`]) {
        if (currentMd5 !== pageConfig[`${props.configId}-${item.id}`].md5) {
          // TODO: 得约定哪些配置修改需要提示
          // logger.debug(`【${props.configId}-${item.id}】配置已修改`);
        }
      }
    });
  }

  const space = spaceConfig.space;
  setSpace(space);
};

// 设置间距
const setSpace = (space) => {
  const tableEl = tableRef.value.$el;
  let currentPageEl = tableEl.closest('.vue-content-container');
  if (!currentPageEl) {
    return;
  }
  currentPageEl = currentPageEl.children && currentPageEl.children[0];
  currentPageEl.classList.remove('e-scale-loose', 'e-scale-tight');

  config.value.space = space;

  if (currentPageEl) {
    const scaleClass = space === 'default' ? '' : `e-scale-${space}`;
    // 移除 e-scale-loose，e-scale-normal,e-scale-tight
    currentPageEl.classList.remove('e-scale-loose', 'e-scale-normal', 'e-scale-tight');
    scaleClass && currentPageEl.classList.add(scaleClass);
  }
};

defineExpose({
  getConfigPanelName: () => {
    return props.configPanelName || t('preferences.dataGrid.configPanelName');
  },
  // 获取配置组件的方法
  getEditor: () => editorMap,
  getInternalEditor: () => internalEditorMap,
  // 更新配置的方法
  updateConfig: (id, cfg) => {
    const newPageConfig = Object.assign({}, initPageConfig.value, {
      [id]: cfg
    });

    initConfig(newPageConfig);
  },
  // 获取配置的方法
  getConfig: (id) => {
    if (id) {
      return initPageConfig.value[id] || '';
    } else {
      return initPageConfig.value || '';
    }
  },

  getOriginalConfig: () => originalConfig,
  initConfig
});
</script>
```

</details>

> **💡 提示**
>
> 因当前 space 间距没有在表格上配置，所以有个问题没有暴露出来，实际上，当其他属性需要在表格上进行配置时，虽然是从 props 传
> 进来的，但是不能直接使用，而是要通过 config 来调用。
> 
> 举例：
> 
> 应该是
> 
> ```vue
> <template>
>   <e-table :stripe="config.stripe"></e-table>
> </template>
> 
> <script setup lang="ts">
> const props = defineProps({
>   stripe: { type: Boolean, default: undefined } // 表格样式 - 斑马纹间隔
> });
> 
> // 个性化配置-字段名-默认值映射
> const configurableProps = { columns: '', sortConfig: '', borderStyle: undefined, stripe: undefined, space: 'default' };
> 
> // 初始化配置，用于保存初始化配置
> const initPageConfig = ref({});
> 
> const extractProps = (source) => {
>   const result: Record<string, any> = {};
> 
>   for (const prop in configurableProps) {
>     const defaultValue = configurableProps[prop];
>     result[prop] = source[prop] ?? defaultValue;
>   }
>   return result;
> };
> 
> const config = ref(extractProps(props));
> </script>
> ```
> 
> 而不是
> 
> ```vue
> <template>
>   <e-table :stripe="stripe"></e-table>
> </template>
> 
> <script setup lang="ts">
> const props = defineProps({
>   stripe: { type: Boolean, default: undefined } // 表格样式 - 斑马纹间隔
> });
> </script>
> ```
> 
> 因为部分属性会在 initConfig 方法中拿到配置数据后重新赋值。

## 使用

如上面文中所述，需要在使用的组件上配置 `configPanelName`、'configId'、`configurable`

```vue
<template>
  <data-grid config-panel-name="表格" config-id="datagrid" configurable> </data-grid>
</template>
```

> **⚠️ 警告**
>
> 如果页面中有多个 `data-grid` 组件，那当 configurable 启用时，`configPanelName`、'configId'是必传的，且不能冲突，比如：
> 
> ```vue
> <template>
>   <data-grid config-panel-name="部门表格" config-id="department" configurable> </data-grid>
> 
>   <data-grid config-panel-name="人员表格" config-id="personnel" configurable> </data-grid>
> </template>
> ```

框架数据模型中提供了一个专门用于显示配置面板的方法 `showConfigPanel`，如需单独调用打开页面偏好面板，调用方法
`model.methods.showConfigPanel();`。