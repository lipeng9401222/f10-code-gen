---
title: Rand
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/rand/#uuid
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/rand/#uuid)

# Rand

此模块提供了用于生成随机标识符的函数。

## uuid

**作用**

生成一个随机的唯一标识符。
- 如果提供了 `len` 参数，它会生成一个指定长度、由字母和数字组成的随机字符串。
- 如果不提供 `len` 参数，它会生成一个符合 [UUID v4](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)) 格式的字符串。

**参数**

- `len` (`number`, 可选): 要生成的随机字符串的长度。

**返回值**

- (`string`): 生成的随机字符串。

**示例**

```typescript
import { uuid } from '@epoint-fe/common-utils';

// 生成指定长度的 ID
const shortId = uuid(10);
// => "aBcDe12345" (示例)

// 生成 UUID v4
const fullUuid = uuid();
// => "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed" (示例)
```