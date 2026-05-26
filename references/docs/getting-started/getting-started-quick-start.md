---
title: 快速开始
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/quick-start/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/quick-start/)

## 环境准备

开始之前，请确保你已经安装好了必备的开发环境，如果还没有，请参阅 [开发环境准备](./development-environment.md)

## 技能要求

使用此进行开发，需要开发者掌握必备的前端开发技能，要求如下：

| Name                                       |                                      |
| ------------------------------------------ | ------------------------------------ |
| HTML                                       | <ERate modelValue={3} client:load /> |
| JavaScript                                 | <ERate modelValue={3} client:load /> |
| Css                                        | <ERate modelValue={1} client:load /> |
| [VueJs](https://cn.vuejs.org/)             | <ERate modelValue={3} client:load /> |
| [vue-router](https://router.vuejs.org/zh/) | <ERate modelValue={1} client:load /> |
| [pina](https://pinia.vuejs.org/zh/)        | <ERate modelValue={1} client:load /> |
| [vite](https://cn.vite.dev/guide/)         | <ERate modelValue={1} client:load /> |

## 安装

**从零开始安装运行**，需要以下步骤：

### 第一步：创建 workspace 工作区

为了方便 vue 组件化工程开发和管理，统一编译环境，需要使用到 pnpm 工作空间能力。

通过 `eui-cli workspace` 命令（别名为 `eui-cli ws`）是用来创建一个 pnpm 的 workspace 工作区。

![](./images/start/cli-ws.png)

该命令会在当前目录下创建一个 package.json 和 pnpm-workspace.yaml 文件。

pnpm-workspace.yaml 文件中已配置了通用的工作空间目录，让 pnpm 可以识别到我们工程中的所有前端包。

![](./images/start/ws-category.png)

### 第二步：创建 vue 项目主 web 工程

**如果是现成项目，可直接从 git 仓库拉取，不需要创建。**

组件化的 vue 工程并不能直接运行，需要创建一个主 web。

通过 `eui-cli web` 命令在当前工作区创建一个 web 开发模板。

如下图，按键盘上下键切换选择对应的产品线，按回车；

**注意：一定要选对组织，不同的组织最终 vue 组件发布的仓库不一样，否则容易冲突。**

![web](./images/start/cli-web.png)

- 键盘按上下键选择条线对应的组织，按回车；

- 输入项目名称，建议英文驼峰命名，按回车（此处以 docDemo 为例）；

- 选择设备类型 **PC** 或 **mobile** ，继续回车。

完成后输出如下：

![web](./images/start/cli-web-3.png)

**其他：**

如果执行完成后提示装依赖失败，说明不在 pnpm 工作区内，确保外层目录有工作区的 package.json 和 pnpm-workspace.yaml 文件。

### 第三步：git 拉取相关工程

如下图，在刚才创建的 docDemo 工程中的 package.json 文件里添加项目需要的依赖。

![](./images/start/cli-demo.png)

![](./images/start/cli-demo-2.png)

```json
"@epframe/epoint-demo-vue": "workspace:*",
"@epframe/epoint-epaas": "9.5.6-SNAPSHOT",
"@epframe/epoint-mini": "9.5.4-SNAPSHOT",
"@epframe/epoint-workflow-vue": "9.5.8-SNAPSHOT",
```

**说明：**

- 版本号是 `workspace:*` 的，表示使用当前工作区的版本（即当前项目中还需要拉取对应的子组件工程，见下方步骤）。
- 版本号是 `9.5.6-SNAPSHOT` 这类指定版本的，表示使用该组件已发布版本的 npm 包。

**注意：请根据实际情况修改版本号，各个子组件包中的依赖包版本号尽量保持一致。**

#### 子组件工程拉取示例

以 `@epframe/epoint-demo-vue` 为例，他的版本号是 `workspace:*` 的,故需要放到 pnpm-workspace.yaml 同级目录下。

epoint-demo 所在仓库的地址：

```sh
git@192.168.217.8:epoint-framework/datamodel/epoint-demo.git

http://192.168.217.8/epoint-framework/datamodel/epoint-demo/
```

epoint-demo 组件工程包中存在一些基础示例，后续可能会调整，此处用于演示如何引入开发中的组件工程。

点击 [epoint-demo 的 git 仓库地址](http://192.168.217.8/epoint-framework/datamodel/epoint-demo/) 查看自己是否有权限，没
有权限的话，联系框架的同事开一下权限（其他 git 源码仓库也一样，都需要有权限才能拉取，发版的 npm 包不需要）。

![](./images/start/cli-demo-3.png)

1. **确认有权限的前提下**，执行 `git clone git@192.168.217.8:epoint-framework/datamodel/epoint-demo.git`;

2. **确认需要使用的包的分支**，此示例中是在 `develop` 中，故进入目录 `cd epoint-demo` 后，切换分支
   `git checkout develop`;

**注意：**

如果有不确定的，比如应该使用什么分支，或者哪个版本的包，请联系框架的同事。

### 第四步：主 web 工程依赖子组件配置

在第三步中，添加依赖后，如果需要使用子组件，需要在主 web 工程的 setup.js 注册组件。

![](./images/start/cli-demo-4.png)

代码片段如下：

```javascript
import './style/module/modicons.css';
import './style/menu/menuicons.css';
import './style/pixel/pixelicon.css';
import './style/style.css';

import '@epoint-fe/eui-components/dist/index.css';

import { globalComponents } from './components/global';
import { globalDirectives } from './directive';
import { initRouter } from './router';
import { theme } from './theme';
import { routerMap } from './router/view-map';

import euiCore, { Utils } from '@epframe/eui-core';
import * as locale from './locale';
import pkg from '../package.json';
import { registerDevtools } from '@epoint-fe/devtools-plugin';

import '@epframe/eui-core/style.css';
import '@epoint-fe/eui-icons/fonts/css';

// 导入微内核vue组件样式
import '@epframe/epoint-mini/style.css';
// 导入epaasvue组件样式
import '@epframe/epoint-epaas/style.css';
// 导入epdemo组件样式
import '@epframe/epoint-demo-vue/style.css';
// 导入epWorkflow组件样式
import '@epframe/epoint-workflow-vue/style.css';
// 导入epSform组件样式
import '@epframe/epoint-sform-vue/dist/index.css';
// 导入epaas组件对象
import EpMini from '@epframe/epoint-mini';
// 导入微内核组件对象
import EpEpaas from '@epframe/epoint-epaas';
// 导入案例组件
import EpDemo from '@epframe/epoint-demo-vue';
// 导入Ego组件
// import EpEgo from '@epframe/epoint-lowcode-vue';
// 导入workflow组件
import EpWorkflow from '@epframe/epoint-workflow-vue';
// 导入表单
import EpSform from '@epframe/epoint-sform-vue';

/**
 * 初始化框架提供的能力
 */
export const setup = Utils.defineSetup({
  meta: pkg,
  isWeb: true,
  locale: {
    zh_CN: locale.zhCN,
    en_US: locale.enUS
  },
  routerMap,
  components: globalComponents,
  directives: globalDirectives,
  deps: [euiCore, EpMini, EpEpaas, EpDemo, EpWorkflow, EpSform],
  hooks: {
    beforeSetup(app, options) {
      if (!options.epI18n) {
        options.epI18n = {
          // i18n: null,
          // 组件库的语言模块， 传入此配置项可以实现在切换语言时无需手动干预自动加载组件库的语言包
          euiComponentLocaleModules: import.meta.glob('/node_modules/@epoint-fe/eui-components/dist/locale/*.min.mjs')
        };
      }
      options.theme = theme;
    }
  },
  initRouter,
  setup: (app) => {
    // 设置默认名称
    document.title = process.env.VITE_APP_TITLE || '';
    registerDevtools(app);
  }
});
```

### 第五步： 安装依赖

在工作区根目录下执行 `pnpm install` 安装依赖包。

如下图，则为安装完成，如果报错，见下方报错处理。

![](./images/start/cli-demo-7.png)

**报错处理：**

可能会出现如下图报错，因为目前还在测试阶段，故 demo 工程中 develop 分支的包依赖还是开发工程，后续会发布正式版本，请耐心
等待。

![](./images/start/cli-demo-5.png)

当前这种问题，需要手动改一下 epoint-demo\epoint-demo-vue 中的依赖包，改成和主 web 工程中同版本依赖即可。

![](./images/start/cli-demo-6.png)

### 第六步：启动项目

直接通过源码依赖子组件（指 `workspace:*`这边版本号的组件）必须 build 后才能在主 web 运行，在 pnpm-workspace.yaml 所在目
录下执行 `eui-cli build` 一次将所有组件全部 build。

出现 `所有包build 完成` 后，在 创建的 docDemo 工程根目录下执行 `pnpm run dev` 即可启动项目。

**说明：**

如果依赖的版本有所更新，都需要重新 pnpm install 一次，然后再 build 一次。
