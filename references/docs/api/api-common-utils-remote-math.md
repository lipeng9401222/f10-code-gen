---
title: Math
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/math/#clamp
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/math/#clamp)

# Math

此模块提供了几个有用的数学计算函数。

## clamp

**作用**

将一个数字限制在一个最小值和最大值之间。

**参数**

- `n` (`number`): 需要被限制的数字。
- `min` (`number`): 允许的最小值。
- `max` (`number`): 允许的最大值。

**返回值**

- (`number`): 限制在 `[min, max]` 范围内的数字。

**示例**

```typescript
import { clamp } from '@epoint-fe/common-utils';

clamp(10, 0, 5);   // 5
clamp(-5, 0, 5);   // 0
clamp(3, 0, 5);    // 3
```

## sum

**作用**

计算所有传入参数的总和。参数可以是一系列数字，也可以是数字数组。

**参数**

- `...args` (`number[] | number[][]`): 要相加的数字或数字数组。

**返回值**

- (`number`): 所有参数的总和。

**示例**

```typescript
import { sum } from '@epoint-fe/common-utils';

sum(1, 2, 3, 4); // 10
sum([1, 2], 3, [4, 5]); // 15
```

## lerp

**作用**

在两个值之间进行线性插值。`lerp` 是 "linear interpolation" 的缩写。

**参数**

- `min` (`number`): 起始值。
- `max` (`number`): 结束值。
- `t` (`number`): 插值因子，一个在 `[0, 1]` 区间内的值。`0` 代表 `min`，`1` 代表 `max`。

**返回值**

- (`number`): 插值结果。

**示例**

```typescript
import { lerp } from '@epoint-fe/common-utils';

lerp(0, 100, 0.5); // 50
lerp(10, 20, 0.2); // 12
```

## remap

**作用**

将一个在输入范围内的值，线性地重新映射到另一个输出范围内。

**参数**

- `n` (`number`): 需要重新映射的值。
- `inMin` (`number`): 输入范围的最小值。
- `inMax` (`number`): 输入范围的最大值。
- `outMin` (`number`): 输出范围的最小值。
- `outMax` (`number`): 输出范围的最大值。

**返回值**

- (`number`): 重新映射后的值。

**示例**

```typescript
import { remap } from '@epoint-fe/common-utils';

// 将 0.5 (在 0-1 范围内) 映射到 200-400 的范围
remap(0.5, 0, 1, 200, 400); // 300

// 将 25 (在 0-100 范围内) 映射到 0-1 的范围
remap(25, 0, 100, 0, 1); // 0.25
```