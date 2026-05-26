---
title: Object
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/object/#objectmap
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/object/#objectmap)

# Object

此模块提供了大量用于操作和处理 JavaScript 对象的实用函数。

## objectMap

**作用**

遍历对象的键/值对，并通过一个转换函数生成一个新的对象。可以用来转换、过滤或交换键值。

**参数**

- `obj` (`Record<K, V>`): 要操作的源对象。
- `fn` (`(key: K, value: V) => [NK, NV] | undefined`): 一个映射函数，接收 `key` 和 `value`，返回一个新的 `[key, value]` 对，或者 `undefined` (用于过滤)。

**返回值**

- (`Record<NK, NV>`): 经过映射函数处理后生成的新对象。

**示例**

```typescript
import { objectMap } from '@epoint-fe/common-utils';

// 转换键和值
objectMap({ a: 1, b: 2 }, (k, v) => [k.toUpperCase(), String(v)]);
// => { A: '1', B: '2' }

// 过滤键
objectMap({ a: 1, b: 2 }, (k, v) => (k === 'a' ? undefined : [k, v]));
// => { b: 2 }
```

## objectKeys / objectEntries

**作用**

`Object.keys` 和 `Object.entries` 的严格类型版本，提供了更好的 TypeScript 类型推断。

**参数**

- `obj` (`T`): 要操作的对象。

**返回值**

- `objectKeys`: `(keyof T)[]`
- `objectEntries`: `[keyof T, T[keyof T]][]`

## isKeyOf

**作用**

一个类型守卫，用于检查一个键是否存在于对象中，并相应地收窄该键的类型。

**参数**

- `obj` (`T`): 要检查的对象。
- `k` (`keyof any`): 要检查的键。

**返回值**

- (`boolean`): 如果键存在于对象中，则返回 `true`。

## deepMerge

**作用**

深度合并一个或多个源对象到目标对象。此函数会改变目标对象。如果属性值为对象，则会递归合并；如果为数组或原始类型，则后面的会覆盖前面的。

**参数**

- `target` (`T`): 目标对象，它将被修改。
- `...sources` (`S[]`): 一个或多个源对象。

**返回值**

- (`DeepMerge<T, S>`): 修改后的目标对象。

**示例**

```typescript
import { deepMerge } from '@epoint-fe/common-utils';

const target = { a: 1, b: { c: 2, d: [3] } };
const source = { b: { c: 4, e: 5 }, f: 6 };
deepMerge(target, source);
// target is now { a: 1, b: { c: 4, d: [3], e: 5 }, f: 6 }
```

## deepMergeWithArray

**作用**

与 `deepMerge` 类似，但当遇到数组时，它会合并数组而不是覆盖它们。

## objectPick / omit

**作用**

- `objectPick`: 从一个对象中挑选指定的键，创建一个新的子集对象。
- `omit`: 从一个对象中忽略指定的键，创建一个新的子集对象。

**参数**

- `obj` (`O`): 源对象。
- `keys` (`(keyof O)[]`): 要挑选或忽略的键的数组。
- `omitUndefined` (`boolean`, `objectPick` 可选): 是否忽略值为 `undefined` 的属性。

**返回值**

- (`object`): 新的子集对象。

**示例**

```typescript
import { objectPick, omit } from '@epoint-fe/common-utils';

const user = { id: 1, name: 'John', age: 30, email: undefined };

objectPick(user, ['id', 'name']); // { id: 1, name: 'John' }
objectPick(user, ['id', 'email'], true); // { id: 1 }

omit(user, ['age', 'email']); // { id: 1, name: 'John' }
```

## clone / deepClone

**作用**

- `clone`: 对一个值进行浅克隆。
- `deepClone`: 对一个值进行深克隆，能处理循环引用。

**参数**

- `obj` (`T`): 要克隆的值。

**返回值**

- (`T`): 克隆后的新值。

## get

**作用**

安全地从嵌套对象中获取指定路径的值。如果路径不存在，则返回 `undefined` 或指定的默认值。

**参数**

- `value` (`any`): 要查询的对象。
- `path` (`string | string[]`): 属性路径，可以是点分隔的字符串（如 `'a.b.c'`）或字符串数组（如 `['a', 'b', 'c']`）。
- `defaultValue` (`any`, 可选): 路径不存在时返回的默认值。

**返回值**

- (`any`): 获取到的值或默认值。

**示例**

```typescript
import { get } from '@epoint-fe/common-utils';

const obj = { a: { b: [{ c: 3 }] } };

get(obj, 'a.b[0].c'); // 3
get(obj, 'a.x.y', 'default'); // 'default'
```

## set

**作用**

安全地向嵌套对象中设置指定路径的值。如果路径不存在，会自动创建。

**参数**

- `object` (`T`): 要修改的对象。
- `path` (`string | string[]`): 要设置的属性路径。
- `value` (`K`): 要设置的值。

**返回值**

- (`T`): 修改后的对象。

**示例**

```typescript
import { set } from '@epoint-fe/common-utils';

const obj = {};
set(obj, 'a.b.c', 123);
// obj is now { a: { b: { c: 123 } } }
```