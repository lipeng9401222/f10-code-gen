---
title: Hooks API
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/core/hooks/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/core/hooks/)

在 `@epframe/eui-core` 包中导出的 `Hooks` 对象中包含了 [`@epoint-fe/eui-hooks`](api-hooks-data-fetch-hooks.md) 包中的所有 Hooks 方法和下文列出的框架相关 Hooks 方法。

## usePermit

### 作用

对接权限字符串的功能，具体用法可参考 [权限使用](../guides/guides-advanced-permit.md) 文档。

### 类型定义

```ts
function usePermit(value: string[]): Promise<Ref<boolean, boolean>>
```

### 参数

- `value`：权限字符串数组。

### 返回值

- 有权限则返回 `true`，否则返回 `false`。

### 示例

```ts
import { Hooks } from '@epframe/eui-core';

const addPermit = Hooks.usePermit(['system:user:add']); // false
const addOrEditPermit = Hooks.usePermit(['system:user:add', 'system:user:edit']); // true
```