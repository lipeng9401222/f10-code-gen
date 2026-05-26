---
title: 组件 setup API
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/core/setup/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/core/setup/)

每个 web 工程包和组件工程包都需要定义一个注册方法 `setup`。为了方便定义这个方法，在 `@epframe/eui-core` 包中提供了 `defineSetup` 工具方法。

# 方法定义

`defineSetup` 方法的定义如下：

```ts

type defineSetup = (config: SetupConfig) => SetupFn;

```

## 方法参数

它的参数 `config` 是一个 `SetupConfig` 对象，定义如下：

```ts
type SetupConfig = {
  meta: MetaData; // 包的元数据信息
  deps?: DepsType[]; // 依赖的子组件包
  components?: Component[]; // 需全局注册的控件
  directives?: DirectiveType[]; // 需全局注册的指令
  locale?: {
    [key: string]: EpLocalePackageMessages;
  }; // 语言包
  isWeb?: boolean; // 是否是 web 模板
  theme?: {
    // 主题配置
    module: () => Promise<Component>;
    tag: string;
    config: Record<string, unknown>;
  };
  routerMap: ComponentMap; // views 目录下的页面组件和路径的映射关系
  initRouter?: () => void;
  setup?: (app: App, options: Record<string, unknown>) => Promise<void> | void;
  hooks?: {
    beforeSetup?: HookFn;
    afterSetup?: HookFn;
    beforeDepsSetup?: HookFn;
    afterDepsSetup?: HookFn;
    beforeRegisterRouter?: HookFn;
    afterRegisterRouter?: HookFn;
    beforeRegisterGlobalComponents?: HookFn;
    afterRegisterGlobalComponents?: HookFn;
    beforeRegisterGlobalDirectives?: HookFn;
    afterRegisterGlobalDirectives?: HookFn;
  };
};
```
- `meta`: 组件包的元数据信息，包含包的名称、版本等，一般直接传组件包的 package.json 文件的内容。
- `deps`: 组件包的依赖的子组件包。在注册时，会按数组顺序先执行依赖的子组件包的 setup 方法注册子包，再注册当前组件包。
- `components`: 组件包的需全局注册的控件，一般直接传组件包的 `/src/components/global/index.js` 文件导出的 `globalComponents` 对象。
- `directives`: 组件包的需全局注册的指令，一般直接传组件包的 `/src/directives/index.js` 文件导出的 `globalDirectives` 对象。
- `locale`: 组件包的语言包，一般直接传组件包的 `/src/locale/index.js` 文件导出的各个语言包。
- `isWeb`: 组件包是否是 web 模板，默认是 `false`。 web 包需要将该字段设置成 `true`;
- `theme`: 主题配置，只有 web 模板才需要配置。一般直接传 `src/theme/index.js` 文件中导出的 `theme` 对象。
- `routerMap`: 组件包的所有页面组件和路径的映射关系，一般直接传 `/src/router/view-map.js` 文件导出的 `routerMap` 对象。
- `initRouter`: 组件包的路由初始化方法，一般直接传 `/src/router/index.js` 文件导出的 `initRouter` 方法。
- `setup`: 组件包的自己个性化注册方法。除了上述框架提供的注册功能，若组件包还需要执行自己的个性化注册逻辑，则写到这个方法里。
- `hooks`: 组件包的注册钩子函数。可以在注册过程中插入自己的逻辑。
  - `beforeSetup`: 组件包注册前的钩子函数。
  - `beforeDepsSetup`: 组件包依赖的子组件包注册前的钩子函数。
  - `afterDepsSetup`: 组件包依赖的子组件包注册后的钩子函数。
  - `beforeRegisterRouter`: 组件包路由注册前的钩子函数。
  - `afterRegisterRouter`: 组件包路由注册后的钩子函数。
  - `beforeRegisterGlobalComponents`: 组件包全局控件注册前的钩子函数。
  - `afterRegisterGlobalComponents`: 组件包全局控件注册后的钩子函数。
  - `beforeRegisterGlobalDirectives`: 组件包全局指令注册前的钩子函数。
  - `afterRegisterGlobalDirectives`: 组件包全局指令注册后的钩子函数。
  - `afterSetup`: 组件包注册后的钩子函数。

## 方法返回

它的返回值就是组件库需要的 setup 函数，定义如下：

```ts
type SetupFn = (app: App, options: Record<string, unknown>) => Promise<void> | void;
```

# 使用示例

## web 包示例

```ts
import { globalComponents } from './components/global';
import { globalDirectives } from './directive';
import { initRouter } from './router';
import { theme } from './theme';
import { routerMap } from './router/view-map';

// 导入epaas组件对象
import EpMini from '@epframe/epoint-mini';
// 导入微内核组件对象
import EpEpaas from '@epframe/epoint-epaas';
import euiCore, { Utils } from '@epframe/eui-core';
import { zhCN, enUS } from './locale';
import pkg from '../package.json';

export const setup = Utils.defineSetup({
  meta: pkg,
  isWeb: true,
  theme,
  locale: {
    zh_CN: zhCN,
    en_US: enUS
  },
  routerMap,
  components: globalComponents,
  directives: globalDirectives,
  deps: [euiCore, EpMini, EpEpaas],
  hooks: {
    beforeSetup(app, options) {
      if (!options.epI18n) {
        options.epI18n = {
          // i18n: null,
          // 组件库的语言模块， 传入此配置项可以实现在切换语言时无需手动干预自动加载组件库的语言包
          euiComponentLocaleModules: import.meta.glob('/node_modules/@epoint-fe/eui-components/dist/locale/*.min.mjs')
        };
      }
    }
  },
  initRouter,
  setup: (app) => {
    // 设置默认名称
    document.title = process.env.VITE_APP_TITLE || '';
  }
});
```

## 组件包示例

```ts
import { globalComponents } from './components/global';
import { routerMap } from './router/view-map';
import { Utils } from '@epframe/eui-core';
import { initRouter } from './router';
import { globalDirectives } from './directive';
import { enUS, zhCN } from './locale';
import pkg from '../package.json';

/**
 * 初始化框架提供的能力
 */
export const setup = Utils.defineSetup({
  meta: pkg,
  locale: {
    zh_CN: zhCN,
    en_US: enUS
  },
  initRouter,
  routerMap,
  components: globalComponents,
  directives: globalDirectives
});
```