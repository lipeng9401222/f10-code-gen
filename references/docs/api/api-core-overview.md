---
title: 框架核心包 @epframe/eui-core
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/core/overview/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/core/overview/)

`@epframe/eui-core` 包为组件化开发的基础包，提供了框架封装的最基础的控件、布局、工具方法、路由、状态管理以及主题管理等能力。

## 控件、布局

在 `@epframe/eui-core` 包中，我们在 [`eui-components` 组件库](http://192.168.219.170/docs/vue/latest/component/) 的基础上，结合框架的特性，封装了一系列更适配框架功能的控件和布局组件。

具体的控件和布局组件，请参考 [框架级组件Core](../components/)。

## 工具方法

在 `@epframe/eui-core` 包中，我们提供了一些框架相关的 [工具方法](api-core-utils.md)，并将 [`@epoint-fe/utils`](api-utilities-helpers.md) 包中的所有工具方法也一起合并进来，作为一个大的 `Utils` 对象导出。

```ts
import { Utils } from '@epframe/eui-core';

Utils.isObject({}); // true
Utils.getFrameSysParam('epoint_local'); // en
```

## Hooks

在 `@epframe/eui-core` 包中，我们提供了一些框架相关的 [Hooks](api-core-hooks.md)，并将 `@epoint-fe/eui-hooks` 包中的所有 Hooks 也一起合并进来，作为一个大的 `Hooks` 对象导出。

```ts
import { Hooks } from '@epframe/eui-core';

const { dataSource } = Hooks.useDataSource('frameaction/getComboboxModel');
```

## 路由

在 `@epframe/eui-core` 中已实现了基础的路由功能，并将相关的功能合并为一个 [Routers](api-core-routers.md) 大对象进行了导出。组件化开发过程中路由相关的功能都需要基于此进行开发。

## 状态管理

在 `@epframe/eui-core` 中已内置了基于 [`Pinia`](https://pinia.vuejs.org/) 的状态管理实现，并结合 [`pinia-plugin-persistedstate`](https://prazdevs.github.io/pinia-plugin-persistedstate/guide/) 插件实现持久化存储。

`@epframe/eui-core` 包中将状态管理相关的功能合并成 [Stores](api-core-stores.md) 大对象进行了导出。

## 主题管理

在 `@epframe/eui-core` 中已实现了基础的主题管理功能，并将主题相关事件的处理能力合并为 [Themes](api-core-themes.md) 大对象进行了导出。