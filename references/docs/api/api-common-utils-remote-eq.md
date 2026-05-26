---
title: Eq
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/eq/#isequal
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/eq/#isequal)

# Eq

此模块提供了用于深度比较两个值是否相等的函数。

## isEqual

**作用**

对两个值进行深度比较，判断它们是否完全相等。这个函数可以处理原始类型、对象、数组、日期、正则表达式，并能正确处理循环引用。

**参数**

- `v1` (`any`): 第一个需要比较的值。
- `v2` (`any`): 第二个需要比较的值。

**返回值**

- (`boolean`): 如果两个值深度相等，则返回 `true`，否则返回 `false`。

**示例**

```typescript
import { isEqual } from '@epoint-fe/common-utils';

// 原始类型
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(1, '1'); // false
isEqual(NaN, NaN); // true

// 数组
isEqual([1, 2, { a: 3 }], [1, 2, { a: 3 }]); // true
isEqual([1, 2], [2, 1]); // false

// 对象
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
isEqual(obj1, obj2); // true

// 循环引用
const a = {};
const b = {};
a.self = a;
b.self = b;
isEqual(a, b); // true

// 日期和正则
isEqual(new Date('2023-01-01'), new Date('2023-01-01')); // true
isEqual(/abc/g, /abc/g); // true
```

### 注意事项

- 对于 `Map` 和 `Set` 的比较，目前只支持键和值为原始类型的简单情况。如果键是对象引用，由于 `isEqual` 无法保证两个不同引用的对象在 `Map` 或 `Set` 中被视为"相等"的键，可能会导致预期之外的结果。