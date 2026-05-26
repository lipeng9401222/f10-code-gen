---
title: Guards
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/guards/#notnullish
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/guards/#notnullish)

# Guards

此模块提供了一系列类型守卫（Type Guards）函数，它们在 TypeScript 中特别有用，尤其是在数组的 `filter` 方法中，可以帮助缩小值的类型范围。

## notNullish

**作用**

检查一个值是否不是 `null` 或 `undefined`。这是一个非常有用的类型守卫，可以将 `T | null | undefined` 类型缩小为 `T`。

**参数**

- `v` (`T | null | undefined`): 需要检查的值。

**返回值**

- (`boolean`): 如果值不是 `null` 或 `undefined`，则返回 `true`。

**示例**

```typescript
import { notNullish } from '@epoint-fe/common-utils';

const arr = [1, 2, null, undefined, 5];

const filteredArr: number[] = arr.filter(notNullish);
// filteredArr is [1, 2, 5]
// TypeScript 知道 filteredArr 的类型是 number[] 而不是 (number | null | undefined)[]
```

## noNull

**作用**

检查一个值是否不是 `null`。

**参数**

- `v` (`T | null`): 需要检查的值。

**返回值**

- (`boolean`): 如果值不是 `null`，则返回 `true`。

**示例**

```typescript
import { noNull } from '@epoint-fe/common-utils';

const arr: (string | null)[] = ['a', null, 'c'];
const filteredArr: string[] = arr.filter(noNull);
// filteredArr is ['a', 'c']
```

## notUndefined

**作用**

检查一个值是否不是 `undefined`。

**参数**

- `v` (`T | undefined`): 需要检查的值。

**返回值**

- (`boolean`): 如果值不是 `undefined`，则返回 `true`。

**示例**

```typescript
import { notUndefined } from '@epoint-fe/common-utils';

const arr: (number | undefined)[] = [1, undefined, 3];
const filteredArr: number[] = arr.filter(notUndefined);
// filteredArr is [1, 3]
```

## isTruthy

**作用**

检查一个值是否为"真值"（truthy）。在 JavaScript 中，除了 `false`, `0`, `""`, `null`, `undefined`, 和 `NaN` 之外的所有值都是真值。

**参数**

- `v` (`any`): 需要检查的值。

**返回值**

- (`boolean`): 如果值是真值，则返回 `true`。

**示例**

```typescript
import { isTruthy } from '@epoint-fe/common-utils';

const arr = [0, 'hello', '', false, { a: 1 }];

const filteredArr = arr.filter(isTruthy);
// filteredArr is ['hello', { a: 1 }]
```