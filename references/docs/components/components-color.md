---
title: Color
originUrl: http://192.168.219.170/docs/vue/latest/component/component/color.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/color.html)

# Color 色彩

EUI 使用一组特定的调色板来指定颜色，以提供您构建的产品的一致外观和感觉。

<style lang="scss">
.demo-color-box {
  position: relative;
  border-radius: 4px;
  padding: 0;
  height: 120px;
  box-sizing: border-box;
  color: var(--e-color-white);
  font-size: 14px;

  &-sm {
    height:128px;
    box-shadow: var(--e-shadow-m);
    border: 1px solid var(--e-border-color);
    border-radius: var(--e-border-radius-large);
    overflow: hidden;

    &-box {
      height: 80px;
      box-sizing: border-box;
      padding: 20px 12px;
    }

    .value {
      height: 48px;
      line-height: 48px;
      padding: 0 12px;
    }
  }

  .bg-color-main {
    padding: 20px;
    height: 80px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bg-color-sub {
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    position: absolute;

    .bg-blue-sub-item {
      height: 100%;
      display: inline-block;

      &:first-child {
        border-radius: 0 0 0 var(--e-border-radius-base);
      }
    }

    .bg-secondary-sub-item {
      height: 100%;
      display: inline-block;
      &:first-child {
        border-radius: 0 0 0 var(--e-border-radius-base);
      }
    }
  }

  .value {
    margin-top: 2px;
  }
}

.demo-color-box-lite {
  color: var(--e-text-color-primary);
}
</style>

## 主要颜色

EUI 的主要颜色是明亮友好的蓝色。

<MainColor />

## 次要颜色

除了主要颜色，您需要在不同的场景中使用不同的颜色（例如，危险的颜色表示危险操作）。

<SecondaryColors />

## 文本色

文本色用于文本颜色。

<itemColor :type="'text'" :typeArray="['primary', 'icon', 'secondary', 'third', 'disable', 'placeholder', 'watermark', 'primary-click']"/>

## 边框色

边框色用于边框颜色。

<itemColor :type="'border'" :typeArray="['','hover','click','box']"/>

## 功能色

适用于分割线、滚动条、提示等功能。

<itemColor :type="'function'" :typeArray="['line','remind','scroll','hover','check','click']"/>

## 图标色

图标相关颜色

<itemColor :type="'icon'" :typeArray="['1','2','3','4']"/>

## 填充色

填充色用于背景颜色。

<itemColor :type="'fill'" :typeArray="['','lighter','light','dark-box']"/>

## 自定义主题色

EUI 提供了一套用于主题色计算的 API —— `generateThemeColors`，它能够根据输入的基准颜色生成一套完整的 UI 色板，包括主色、不同亮度的变体以及相关的派生颜色。

### 基本使用

`generateThemeColors` 接受一个颜色值（如 HEX 格式的字符串）作为参数，并返回一个包含所有计算结果的对象，你需要自行将这些结果应用到你的应用中。

```js
import { utils } from '@epoint-fe/eui-components';

const { generateThemeColors } = utils;

const themeResult = generateThemeColors('#1890ff');
```

当你计算新的主题色后，系统会生成多个色阶变体：

- 主色: `--e-color-primary`
- 浅色变体: `--e-color-primary-light-2`、`--e-color-primary-light-7`、`--e-color-primary-light-8`、`--e-color-primary-light-9`
- 深色变体: `--e-color-primary-dark-2`

此外，还会自动计算以下与主题色相关的颜色变量：

- 链接颜色: `--e-text-color-link`
- 字体点击颜色: `--e-text-color-primary-click`
- 边框点击颜色: `--e-border-color-click`
- 功能色点击背景: `--e-function-color-click`

**Demo 示例**: `color/diy-color`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color.html)

```vue
<template>
  <div>
    <e-form class="mb-4" label-width="100px" label-position="left">
      <e-form-item label="快速测试">
        <span class="color-buttons">
          <e-tag
            v-for="item in presetColors"
            :key="item.value"
            class="mr-2"
            :color="item.value"
            @click="setColor(item.value)"
          >
            {{ item.name }}
          </e-tag>
        </span>
      </e-form-item>

      <e-form-item label="自选颜色">
        <e-color-picker v-model="color" :show-alpha="false" @change="setColor" />
        <span class="ml-2 text-gray-500">{{ color }}</span>
      </e-form-item>
    </e-form>

    <div ref="demoContainer" class="demo-container">
      <e-row class="mb-4">
        <e-button>Default</e-button>
        <e-button type="primary">Primary</e-button>
        <e-button type="success">Success</e-button>
        <e-button type="info">Info</e-button>
        <e-button type="warning">Warning</e-button>
        <e-button type="danger">Danger</e-button>
      </e-row>

      <e-row class="mb-4">
        <e-button plain>Plain</e-button>
        <e-button type="primary" plain>Primary</e-button>
        <e-button type="success" plain>Success</e-button>
        <e-button type="info" plain>Info</e-button>
        <e-button type="warning" plain>Warning</e-button>
        <e-button type="danger" plain>Danger</e-button>
      </e-row>

      <e-row class="mb-4">
        <e-button round>Round</e-button>
        <e-button type="primary" round>Primary</e-button>
        <e-button type="success" round>Success</e-button>
        <e-button type="info" round>Info</e-button>
        <e-button type="warning" round>Warning</e-button>
        <e-button type="danger" round>Danger</e-button>
      </e-row>

      <e-row class="mb-4">
        <e-button type="primary" plain>朴素按钮</e-button>
        <e-button type="primary" link class="ml-2">链接按钮</e-button>
        <e-switch class="ml-2" :model-value="true" />
        <e-radio label="1" class="ml-2">选项1</e-radio>
        <e-checkbox class="ml-2">复选框</e-checkbox>
      </e-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { EMessageBox, utils } from '@epoint-fe/eui-components';

const color = ref('#2370ef');

const presetColors = [
  { name: '蓝色', value: '#2370ef' },
  { name: '绿色', value: '#18a058' },
  { name: '橙色', value: '#f0883a' },
  { name: '红色', value: '#d03050' },
  { name: '紫色', value: '#8a2be2' },
  { name: '青色', value: '#0e7a8a' },
  { name: '粉色', value: '#ee3f86' },
];

const demoContainer = ref(null);
let globalStyle;

const createGlobalStyle = () => {
  if (globalStyle) {
    return;
  }

  globalStyle = document.createElement('style');
  globalStyle.id = 'demo-test-set-color';
  document.head.appendChild(globalStyle);
};

const setColor = (value) => {
  console.log(value);
  const result = utils.generateThemeColors(value);
  console.log(result);
  console.log(result.cssVars.delta);
  console.log(result.cssVars.full);

  // 全局生效 or 仅 demo 生效
  EMessageBox.confirm('你想应用到全局还是下面的 demo 区域', '请选择应用范围', {
    confirmButtonText: '全局',
    cancelButtonText: 'demo 区域',
  })
    .then(() => {
      createGlobalStyle();
      globalStyle.textContent = `:root { ${result.cssVars.deltaString} }`;
    })
    .catch(() => {
      console.log('cancel');
      // demoContainer.value.style.cssText = result.cssVars.delta;
      result.cssVars.delta.forEach(([key, value]) => {
        demoContainer.value.style.setProperty(key, value);
      });
    });
};
</script>
<style lang="scss" scoped>
:deep(.color-buttons .e-tag__content) {
  color: #fff;
}
</style>

```

### 自定义其他颜色类型

`generateThemeColors` 函数不仅可以计算单一的主题色，还可以同时批量计算多种颜色类型。你只需要传入一个对象，其中包含不同类型的颜色值：

```js
// 批量计算多种颜色类型
const themeResult = generateThemeColors({
  primary: '#1890ff', // 主色
  success: '#52c41a', // 成功色
  warning: '#faad14', // 警告色
  danger: '#f5222d', // 危险色
  info: '#1890ff', // 信息色
});
```

### 获取色阶变体

`generateThemeColors` 函数返回的结果中包含详细的色板信息，每种颜色类型都会有一个对应的 `ColorPalette` 对象，它包含了主色及其所有变体：

```js
const themeResult = generateThemeColors('#1890ff');

if (themeResult) {
  const { palettes } = themeResult;

  // 获取主色（十六进制格式）
  console.log('Primary main:', palettes.primary.main); // '#1890ff'

  // 获取主色的RGB值，可用于创建透明色
  console.log('Primary RGB:', palettes.primary.rgb); // {r: 24, g: 144, b: 255, a: 1}

  // 获取浅色变体
  console.log('Light-2:', palettes.primary.light['light-2']); // 较浅的变体
  console.log('Light-7:', palettes.primary.light['light-7']); // 中等浅的变体

  // 获取深色变体
  console.log('Dark-2:', palettes.primary.dark['dark-2']); // 较深的变体

  // 检查生成了哪些CSS变量
  console.log('生成的所有CSS变量:', Object.keys(themeResult.cssVars.delta));
}
```

每个 `ColorPalette` 对象包含以下属性：

- `main`: 主色（十六进制格式）
- `rgb`: 主色的 RGB 对象，包含 r、g、b、a 属性
- `light`: 所有浅色变体的集合，如 `{'light-2': '#e6f7ff', 'light-7': '#91d5ff'}`
- `dark`: 所有深色变体的集合，如 `{'dark-2': '#096dd9'}`

### 高级配置选项

> **⚠️ 警告**
>
> 除非你清楚的知道高阶配置的含义，否则你不应该设置任何配置。

`generateThemeColors` 函数支持通过第二个参数来自定义色板生成规则。这个配置对象提供了极大的灵活性，让你可以控制每种颜色类型的色阶生成方式：

:::details 高级配置选项

```js
const themeResult = generateThemeColors('#1890ff', {
  // 当传入单个颜色字符串时使用的默认颜色类型
  defaultType: 'primary',

  // 全局色阶配置，应用于所有颜色类型
  globalLevel: {
    // 要生成的浅色等级数组
    lightLevels: [2, 7, 8, 9],
    // 要生成的深色等级数组
    darkLevels: [2],
    // 浅色混合的基准色
    lightMixBase: '#ffffff',
    // 深色混合的基准色
    darkMixBase: '#000000',
    // 色阶混合比例计算函数
    mixRatio: (level) => level * 10, // 例如level=3时，混合比例为30%
  },

  // 特定颜色类型的专属配置（优先级高于全局配置）
  typeLevel: {
    success: {
      // 为success类型使用特定的浅色等级
      lightLevels: [3, 5, 7],
    },
    danger: {
      // 为danger类型定制化深色等级
      darkLevels: [1, 3, 5],
    },
  },

  // 自定义关联变量的生成规则
  relatedVarsRules: {
    // 自定义链接文本颜色的生成
    textColorLink: (mainColor) => new TinyColor(mainColor).darken(5).toHexString(),
    // 自定义点击态边框颜色的生成
    borderColorClick: (mainColor) => mainColor,
    // 自定义点击态背景色的生成（使用RGBA对象）
    functionColorClick: ({ r, g, b }) => `rgba(${r}, ${g}, ${b}, 0.1)`,
  },
});
```

:::

## API 参考

#### 参数

| Name           | Type                               | Description                                                                                                                                                                                                                                                                                                              |
| :------------- | :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sourceColors` | `string \| Record<string, string>` | **必需**。输入的基准颜色。<ul><li>**字符串**: 当传入单个颜色字符串时（如 `'#1890ff'`），函数将仅计算 `primary` 类型的颜色。可以通过 `options.defaultType` 修改默认类型。</li><li>**对象**: 当传入一个对象时（如 `{ primary: '#1890ff', success: '#52c41a' }`），函数会批量计算对象中每个键值对对应的颜色类型。</li></ul> |
| `userOptions`  | `GenerateThemeOptions`             | **可选**。用于自定义颜色计算规则和行为的配置对象。此对象会与内部的默认配置进行深度合并。                                                                                                                                                                                                                                 |

### 配置项 (GenerateThemeOptions)

这是用于自定义生成规则的配置对象。

| Attribute          | Type                                            | Description                                                    | Default                |
| :----------------- | :---------------------------------------------- | :------------------------------------------------------------- | :--------------------- |
| `defaultType`      | `ColorType`                                     | 当 `sourceColors` 为字符串时，所使用的默认颜色类型。           | `'primary'`            |
| `globalLevel`      | `ColorLevelOptions`                             | 全局的色阶配置，对所有未特殊指定的颜色类型生效。               | 见 `ColorLevelOptions` |
| `typeLevel`        | `Partial<Record<ColorType, ColorLevelOptions>>` | 为特定颜色类型指定独立的色阶配置，其优先级高于 `globalLevel`。 | `{}`                   |
| `relatedVarsRules` | `object`                                        | 自定义关联变量的生成规则，通常基于 `primary` 主色。            | 见 `relatedVarsRules`  |

#### ColorLevelOptions 详解

用于定义一套颜色的深浅色阶生成规则。

| Attribute      | Type                        | Description                                                                                       | Default                 |
| :------------- | :-------------------------- | :------------------------------------------------------------------------------------------------ | :---------------------- |
| `lightLevels`  | `number[]`                  | 定义浅色变体的等级。例如 `[3, 5, 7]` 会生成 `--e-color-*-light-3`、`--e-color-*-light-5` 等变量。 | `[2, 7, 8, 9]`          |
| `darkLevels`   | `number[]`                  | 定义深色变体的等级。例如 `[2]` 会生成 `--e-color-*-dark-2`。                                      | `[2]`                   |
| `lightMixBase` | `string`                    | 与主色混合以生成浅色系的基准色。                                                                  | `'#ffffff'`             |
| `darkMixBase`  | `string`                    | 与主色混合以生成深色系的基准色。                                                                  | `'#000000'`             |
| `mixRatio`     | `(level: number) => number` | 一个函数，根据色阶 `level` 计算出混合比例（0-100）。                                              | `(level) => level * 10` |

#### relatedVarsRules 详解

用于根据 `primary` 颜色派生出一些全局的、有关联的 CSS 变量。

| Attribute            | Type                            | Description                                                 | Default                             |
| :------------------- | :------------------------------ | :---------------------------------------------------------- | :---------------------------------- |
| `textColorLink`      | `(mainColor: string) => string` | 生成链接文本颜色 (`--e-text-color-link`)。                  | 返回主色本身。                      |
| `borderColorClick`   | `(mainColor: string) => string` | 生成点击态边框颜色 (`--e-border-color-click`)。             | 返回主色本身。                      |
| `functionColorClick` | `(rgb: RGBA) => string`         | 生成功能性组件的点击态背景色 (`--e-function-color-click`)。 | 返回主色的 10% 透明度 `rgba` 颜色。 |

### 返回值 (ThemeResult)

函数返回一个包含所有计算结果的结构化对象。

| Property        | Type                              | Description                                                                        |
| :-------------- | :-------------------------------- | :--------------------------------------------------------------------------------- |
| `source`        | `Record<ColorType, string>`       | 经过规范化后的原始输入颜色，如 `{ primary: '#1890ff' }`。                          |
| `palettes`      | `Record<ColorType, ColorPalette>` | 所有颜色类型的完整色板集合。`key` 是颜色类型，`value` 是一个 `ColorPalette` 对象。 |
| `relatedVars`   | `Record<string, string>`          | 根据 `relatedVarsRules` 生成的关联 CSS 变量键值对。                                |
| `cssVars`       | `object`                          | CSS 变量（包含完整和增量）                                                         |
| `cssVars.full`  | `Array<[string, string]>`         | 完整的 CSS 变量数组(所有色阶+关联变量),^[eg]`[['--e-color-primary', '#2370EF'],['--e-color-primary-light-2','#46b379'], ...]`                                           |
| `cssVars.fullString`  | `string`                    | 完整的 CSS 变量字符串(所有色阶+关联变量)                                           |
| `cssVars.delta` | `Array<[string, string]>`         | 增量的 CSS 变量数组(仅本次计算的变量)                                            |
| `cssVars.deltaString` | `string`                    | 增量的 CSS 变量字符串(仅本次计算的变量)                                            |
| `meta`          | `object`                          | 包含本次计算元信息的对象。                                                         |
| `meta.options`  | `GenerateThemeOptions`            | 本次计算最终使用的完整配置项（用户配置与默认配置合并后），便于调试和追溯。         |
| `meta.version`  | `string`                          | 变量体系版本                                                                       |
| `meta.time`     | `string`                          | 生成时间                                                                       |

#### ColorPalette 详解

描述一种颜色类型的完整色板。

| Property | Type                     | Description                          | Example                                          |
| :------- | :----------------------- | :----------------------------------- | :----------------------------------------------- |
| `main`   | `string`                 | 主色（十六进制格式）。               | `'#1890ff'`                                      |
| `rgb`    | `RGBA`                   | 主色的 RGB 对象 (`{ r, g, b, a }`)。 | `{ r: 24, g: 144, b: 255, a: 1 }`                |
| `light`  | `Record<string, string>` | 浅色变体集合。                       | `{ 'light-3': '#e6f7ff', 'light-5': '#91d5ff' }` |
| `dark`   | `Record<string, string>` | 深色变体集合。                       | `{ 'dark-2': '#096dd9' }`                        |