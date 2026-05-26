---
title: Number
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/number/#inrange
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/number/#inrange)

# Number

此模块提供了用于处理和转换数字的函数。

## inRange

**作用**

检查一个数字是否在指定的范围内。范围可以是正数或负数，起始和结束位置可以互换。起始值是包含的，结束值是不包含的。

**参数**

- `number` (`number`): 要检查的数字。
- `start` (`number`): 范围的起始值（包含）。如果只提供一个范围参数，则此值被视为结束值，起始值默认为 `0`。
- `end` (`number`, 可选): 范围的结束值（不包含）。

**返回值**

- (`boolean`): 如果数字在范围内，则返回 `true`，否则返回 `false`。

**示例**

```typescript
import { inRange } from '@epoint-fe/common-utils';

// 两个参数
inRange(2, 5); // true (范围是 [0, 5))
inRange(5, 5); // false
inRange(-2, -5); // true (范围是 [-5, 0))

// 三个参数
inRange(3, 1, 5); // true (范围是 [1, 5))
inRange(1, 1, 5); // true
inRange(5, 1, 5); // false
inRange(3, 5, 1); // true (范围是 [1, 5))
```

## toFloat

**作用**

将一个值转换为浮点数。如果转换失败或输入值为 `null`/`undefined`，则返回一个默认值。

**参数**

- `value` (`any`): 需要转换的值。
- `defaultValue` (`number | null`, 可选): 转换失败时返回的默认值。默认为 `0.0`。

**返回值**

- (`number | null`): 转换后的浮点数或指定的默认值。

**示例**

```typescript
import { toFloat } from '@epoint-fe/common-utils';

toFloat('10.5');      // 10.5
toFloat('abc');       // 0.0
toFloat(null, 99.9);  // 99.9
toFloat('xyz', null); // null
```

## toInt

**作用**

将一个值转换为整数。如果转换失败或输入值为 `null`/`undefined`，则返回一个默认值。

**参数**

- `value` (`any`): 需要转换的值。
- `defaultValue` (`number | null`, 可选): 转换失败时返回的默认值。默认为 `0`。

**返回值**

- (`number | null`): 转换后的整数或指定的默认值。

**示例**

```typescript
import { toInt } from '@epoint-fe/common-utils';

toInt('123');      // 123
toInt('12.9');     // 12 (parseInt 的行为)
toInt('abc');      // 0
toInt(null, 100);  // 100
toInt(undefined, null); // null
```