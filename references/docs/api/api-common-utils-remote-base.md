---
title: Base
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/base/#assert
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/base/#assert)

# Base

此模块提供了一些基础的、通用的工具函数。

## assert

**作用**

断言一个条件是否为真，如果条件为假，则抛出一个带有指定消息的错误。这在 TypeScript 中可以作为类型守卫，帮助进行类型收窄。

**参数**

- `condition` (`boolean`): 需要断言的条件。
- `message` (`string`): 如果断言失败，要抛出的错误消息。

**返回值**

- `void`: 如果条件为真，则无返回值。

**示例**

```typescript
import { assert } from '@epoint-fe/common-utils';

function process(value: string | null) {
  assert(value !== null, 'Value cannot be null');
  // 在这里，TypeScript 会知道 value 是 string 类型
  console.log(value.toUpperCase());
}

process('hello'); // "HELLO"
process(null); // Error: Value cannot be null
```

## toString

**作用**

获取任意值的内部 `[[Class]]` 属性，返回一个类似 `[object Type]` 的字符串。这是一个比 `typeof` 更精确的类型检测方法。

**参数**

- `v` (`any`): 需要检查类型的值。

**返回值**

- (`string`): 表示该值类型的字符串，例如 `[object Array]`。

**示例**

```typescript
import { toString } from '@epoint-fe/common-utils';

toString([]); // "[object Array]"
toString({}); // "[object Object]"
toString(123); // "[object Number]"
```

## getTypeName

**作用**

获取一个值的具体类型名称。对于 `null` 会返回 `'null'`，对于原始类型会返回其类型字符串，对于对象和函数会返回其具体的构造函数名称（小写）。

**参数**

- `v` (`any`): 需要获取类型名称的值。

**返回值**

- (`string`): 值的类型名称字符串。

**示例**

```typescript
import { getTypeName } from '@epoint-fe/common-utils';

getTypeName(null); // "null"
getTypeName([]); // "array"
getTypeName('hello'); // "string"
getTypeName(() => {}); // "function"
```

## noop

**作用**

一个不执行任何操作的空函数。常用作默认的回调函数或占位符。

**参数**

无

**返回值**

- `void`

**示例**

```typescript
import { noop } from '@epoint-fe/common-utils';

// 作为默认参数
function doSomething(callback = noop) {
  callback();
}

doSomething(); // 不会发生任何事
```