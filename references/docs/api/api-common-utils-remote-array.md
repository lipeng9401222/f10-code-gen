---
title: Array
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/array/#toarray
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/array/#toarray)

# Array

此模块提供了一系列用于处理数组的实用函数。

## toArray

**作用**

将 `Arrayable<T>` 类型转换为 `Array<T>`。如果输入值为 `null` 或 `undefined`，则返回一个空数组。如果输入值已经是数组，则直接返回该数组。否则，将输入值包装在一个新数组中返回。

**参数**

- `array` (`Nullable<Arrayable<T>>`)：需要被转换的值。

**返回值**

- (`Array<T>`)：转换后的数组。

**示例**

```typescript
import { toArray } from '@epoint-fe/common-utils';

toArray(1); // [1]
toArray([1, 2]); // [1, 2]
toArray(null); // []
toArray(undefined); // []
```

## flattenArrayable

**作用**

将 `Arrayable<T>` 转换为 `Array<T>` 并将其展平一层。

**参数**

- `array` (`Nullable<Arrayable<T | Array<T>>>`)：需要被转换和展平的值。

**返回值**

- (`Array<T>`)：转换并展平后的数组。

**示例**

```typescript
import { flattenArrayable } from '@epoint-fe/common-utils';

flattenArrayable(1); // [1]
flattenArrayable([1, [2, 3]]); // [1, 2, 3]
flattenArrayable([[1, 2], [3, 4]]); // [1, 2, 3, 4]
```

## mergeArrayable

**作用**

使用 rest 参数合并多个 `Arrayable<T>` 类型的值。

**参数**

- `...args` (`Nullable<Arrayable<T>>[]`)：一个或多个需要被合并的值。

**返回值**

- (`Array<T>`)：合并后的新数组。

**示例**

```typescript
import { mergeArrayable } from '@epoint-fe/common-utils';

mergeArrayable(1, [2, 3], [4, 5]); // [1, 2, 3, 4, 5]
mergeArrayable([1, 2], 3); // [1, 2, 3]
```

## partition

**作用**

根据一个或多个筛选函数将一个数组分割成多个部分。

**参数**

- `array` (`readonly T[]`)：要分割的源数组。
- `...filters` (`PartitionFilter<T>[]`)：一个或多个筛选函数。

**返回值**

- (`T[][]`)：一个包含分割后数组的数组。

**示例**

```typescript
import { partition } from '@epoint-fe/common-utils';

const [odd, even] = partition([1, 2, 3, 4], (i) => i % 2 !== 0);
// odd: [1, 3]
// even: [2, 4]

const [positive, zero, negative] = partition([-1, 0, 1, -2, 2], (i) => i > 0, (i) => i === 0);
// positive: [1, 2]
// zero: [0]
// negative: [-1, -2]
```

## uniq

**作用**

对数组进行去重。

**参数**

- `array` (`readonly T[]`)：要去重的数组。

**返回值**

- (`T[]`)：去重后的新数组。

**示例**

```typescript
import { uniq } from '@epoint-fe/common-utils';

uniq([1, 2, 2, 3, 1]); // [1, 2, 3]
```

## uniqueBy

**作用**

根据自定义的相等函数对数组进行去重。

**参数**

- `array` (`readonly T[]`)：要去重的数组。
- `equalFn` (`(a: any, b: any) => boolean`)：用于比较两个元素是否相等的函数。

**返回值**

- (`T[]`)：去重后的新数组。

**示例**

```typescript
import { uniqueBy } from '@epoint-fe/common-utils';

const users = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 1, name: 'C' },
];

uniqueBy(users, (a, b) => a.id === b.id);
// [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]
```

## last

**作用**

获取数组的最后一个元素。

**参数**

- `array` (`readonly T[]`)：源数组。

**返回值**

- (`T | undefined`)：数组的最后一个元素，如果数组为空则返回 `undefined`。

**示例**

```typescript
import { last } from '@epoint-fe/common-utils';

last([1, 2, 3]); // 3
last([]); // undefined
```

## remove

**作用**

从数组中移除指定的元素。

**参数**

- `array` (`T[]`)：源数组。
- `value` (`T`)：要移除的元素。

**返回值**

- (`boolean`)：如果成功移除元素则返回 `true`，否则返回 `false`。

**示例**

```typescript
import { remove } from '@epoint-fe/common-utils';

const arr = [1, 2, 3];
remove(arr, 2); // true
// arr is now [1, 3]
```

## at

**作用**

获取数组中指定索引的元素。支持负数索引，从后往前计数。

**参数**

- `array` (`readonly T[]`)：源数组。
- `index` (`number`)：要获取的元素的索引。

**返回值**

- (`T | undefined`)：指定索引的元素，如果索引越界则返回 `undefined`。

**示例**

```typescript
import { at } from '@epoint-fe/common-utils';

at([1, 2, 3], 1); // 2
at([1, 2, 3], -1); // 3
at([], 0); // undefined
```

## range

**作用**

生成一个数字范围的数组。

**参数**

- `stop` (`number`)：结束值（不包含）。
- `start` (`number`, 可选)：起始值，默认为 `0`。
- `step` (`number`, 可选)：步长，默认为 `1`。

**返回值**

- (`number[]`)：生成的数字数组。

**示例**

```typescript
import { range } from '@epoint-fe/common-utils';

range(5); // [0, 1, 2, 3, 4]
range(2, 5); // [2, 3, 4]
range(0, 10, 2); // [0, 2, 4, 6, 8]
```

## move

**作用**

在数组内移动元素的位置。此函数会改变原数组。

**参数**

- `arr` (`T[]`)：要操作的数组。
- `from` (`number`)：要移动的元素的起始索引。
- `to` (`number`)：目标索引。

**返回值**

- (`T[]`)：移动元素后的数组。

**示例**

```typescript
import { move } from '@epoint-fe/common-utils';

const arr = ['a', 'b', 'c', 'd'];
move(arr, 1, 3); // ['a', 'c', 'd', 'b']
```

## clampArrayRange

**作用**

将一个数字限制在数组的索引范围内。

**参数**

- `n` (`number`)：要限制的数字。
- `arr` (`readonly unknown[]`)：用于确定范围的数组。

**返回值**

- (`number`)：限制后的数字。

**示例**

```typescript
import { clampArrayRange } from '@epoint-fe/common-utils';

clampArrayRange(5, [0, 1, 2]); // 2
clampArrayRange(-1, [0, 1, 2]); // 0
clampArrayRange(1, [0, 1, 2]); // 1
```

## sample

**作用**

从数组中随机获取一个或多个元素。

**参数**

- `arr` (`T[]`)：源数组。
- `quantity` (`number`)：要获取的随机元素的数量。

**返回值**

- (`T[]`)：包含随机获取的元素的数组。

**示例**

```typescript
import { sample } from '@epoint-fe/common-utils';

sample([1, 2, 3, 4, 5], 2); // e.g., [3, 1]
```

## shuffle

**作用**

对数组进行洗牌（随机打乱顺序）。此函数会改变原数组。

**参数**

- `array` (`T[]`)：要洗牌的数组。

**返回值**

- (`T[]`)：洗牌后的数组。

**示例**

```typescript
import { shuffle } from '@epoint-fe/common-utils';

const arr = [1, 2, 3, 4, 5];
shuffle(arr); // e.g., [3, 1, 5, 2, 4]
```

## union

**作用**

计算多个数组的并集，并消除重复项。

**参数**

- `...arrays` (`Array<T[]>`)：一个或多个数组。

**返回值**

- (`T[]`)：包含所有唯一元素的新的数组。

**示例**

```typescript
import { union } from '@epoint-fe/common-utils';

union([1, 2], [2, 3], [3, 4]); // [1, 2, 3, 4]
```

## objectify

**作用**

将数组转换为一个对象（字典），通过将每个元素映射为对象的键和值。

**参数**

- `array` (`readonly T[]`)：源数组。
- `getKey` (`(item: T) => Key`)：一个函数，用于从数组元素中提取键。
- `getValue` (`(item: T) => Value`, 可选)：一个函数，用于从数组元素中提取值，默认为元素本身。

**返回值**

- (`Record<Key, Value>`)：转换后的对象。

**示例**

```typescript
import { objectify } from '@epoint-fe/common-utils';

const users = [
  { id: 'a', name: 'Alice' },
  { id: 'b', name: 'Bob' },
];

objectify(users, (user) => user.id);
// { a: { id: 'a', name: 'Alice' }, b: { id: 'b', name: 'Bob' } }

objectify(users, (user) => user.id, (user) => user.name);
// { a: 'Alice', b: 'Bob' }
```