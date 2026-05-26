---
title: Log
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/log/#devlog
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/log/#devlog)

# Log

此模块提供了一系列用于在浏览器控制台中打印带样式的日志信息的函数。

## devLog

**作用**

在控制台打印一条常规的日志信息。

**参数**

- `...args` (`any[]`): 要打印的一个或多个值。

**示例**

```typescript
import { devLog } from '@epoint-fe/common-utils';

devLog('Hello', { a: 1 });
```

## devLogWithTag

**作用**

在控制台打印一条带有蓝色标签的日志信息，方便对日志进行分类和识别。

**参数**

- `tag` (`string`): 显示在日志内容前的标签文本。
- `...args` (`any[]`): 要打印的一个或多个值。

**示例**

```typescript
import { devLogWithTag } from '@epoint-fe/common-utils';

devLogWithTag('User Info', 'User logged in', { id: '123' });
```
*(这会在控制台打印出背景为蓝色的 "User Info" 标签，后面跟着日志内容)*

## warningLog

**作用**

在控制台打印一条带有橙色标签的警告信息。

**参数**

- `tag` (`string`): 显示在警告内容前的标签文本。
- `...args` (`any[]`): 要打印的一个或多个值。

**示例**

```typescript
import { warningLog } from '@epoint-fe/common-utils';

warningLog('API', 'The "getUser" endpoint is deprecated.');
```
*(这会在控制台打印出背景为橙色的 "API" 标签，后面跟着警告内容)*

## errorLog

**作用**

在控制台打印一条带有红色标签的错误信息。

**参数**

- `tag` (`string`): 显示在错误内容前的标签文本。
- `...args` (`any[]`): 要打印的一个或多个值。

**示例**

```typescript
import { errorLog } from '@epoint-fe/common-utils';

errorLog('Validation', 'Email is not valid.', { email: 'test@' });
```
*(这会在控制台打印出背景为红色的 "Validation" 标签，后面跟着错误内容)*