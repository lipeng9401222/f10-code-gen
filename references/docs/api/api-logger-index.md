---
title: 日志库 Logger
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/logger/index/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/logger/index/)

# 日志记录

前端日志虽然不如后端的日志重要，但是也是我们排查问题的重要手段，框架中提供了 [`@epoint-fe/logger`](http://192.168.217.8/febase/logger) 包，用于记录前端日志。

当在框架中使用的时候，你无需在安装和引入该包，框架已经默认引入了该包，你只需要在代码中使用即可。

```js
import { Utils } from '@epframe/eui-core';
Utils.logger.trace('这是 trace 日志');
Utils.logger.debug('这是 debug 日志');
Utils.logger.info('这是 info 日志');
Utils.logger.warn('这是 warn 日志');
Utils.logger.error('这是 error 日志');

Utils.logger.log('这是 log 日志'); // 别名等同 debug
```

也可以从 `@epoint-fe/utils` 中引入

```js
import { logger } from '@epoint-fe/utils';
logger.trace('这是 trace 日志');
logger.debug('这是 debug 日志');
logger.info('这是 info 日志');
logger.warn('这是 warn 日志');
logger.error('这是 error 日志');

logger.log('这是 log 日志'); // 别名等同 debug
```

## 主要特性

- 支持 TRACE、DEBUG、INFO、WARN、ERROR、SILENT 六级
- 命名子 logger（相互独立，可单独设置级别）
- localStorage 自动持久化用户级别（浏览器）
- 事件 / sink 机制：可插入多个 sink（环形缓冲、采集、过滤等）
- ESM 兼容 & 多 bundle 单例，即使此模块被多次重复打包，也尽可能控制一个单例，方便进行全局日志等级控制
- 全局 / 环境变量 `__LOGGER_LEVEL__` / `process.env.LOGGER_LEVEL` 设置初始默认日志等级
- 支持 Sink 机制，无论日志是否输出，你都可以自行对日志进行处理，比如采集、上报、本地存储等
- 默认内置环形缓冲 Sink，可随时查看最近 N 条日志，解决重要日志回溯问题。

## 日志级别

日志级别从低到高排列，只有等于或高于当前级别的消息才会被输出：

- `TRACE` (0): 最详细的调试信息
- `DEBUG` (1): 调试信息
- `INFO` (2): 一般信息
- `WARN` (3): 警告信息
- `ERROR` (4): 错误信息
- `SILENT` (5): 静默模式，不输出任何日志

## Sink

由于前端日志的特殊性，它产生在客户端， 如果仅仅是打印，作为开发者，我们很难获取到这些日志，因此我们提供了 Sink 机制，用于将日志输出到不同的目的地。

每次日志输出时，日志事件会被分发给已注册的 Sink 实例。库本身不做过滤与变换，Sink 如何处理完全由外部决定（例如：上报服务器、写入本地、打点聚合等）。

### Sink 接口

```ts
interface Sink {
  onEvent(e: LogEvent): void;
  name?: string;
  configure?(cfg: Record<string, unknown>): void;
  dispose?(): void;
}
```

### LogEvent 接口

```ts
interface LogEvent {
  ts: number;    // 当前时间戳
  level: number; // 日志级别
  levelName: string; // 日志级别名称
  logger: string | symbol | undefined;
  args: any[]; // 原始参数数组
  stack?: string; // 可选的捕获堆栈用于 trace/warn/error 级别的日志
}
```

### createSink 工厂



将一个处理函数包装成标准 Sink 实例。

```ts
import logger, { createSink } from '@epoint-fe/logger';

const httpSink = createSink({
  name: 'http',
  onEvent: (evt) => {
    // 示例：最简 Beacon 上报；也可改为批量/重试逻辑
    navigator.sendBeacon('/logs', JSON.stringify(evt));
  }
});

const off = logger.registerSink(httpSink);
// 需要时可取消注册
// off();
```

### 注册 / 注销 / 列出


```ts
// 注册：要求参数为 Sink 实例
const off = logger.registerSink(createSink({ name: 'local', onEvent: (e) => queue.push(e) }));

// 注销
off();

// 列出当前已注册的 Sinks（拷贝数组，修改不影响内部）
const sinks = logger.listSinks();
```

## 环形缓冲 Ring Buffer Sink

这是一个内置的 Sink 实例，当全局设置了 `__LOGGER_BUFFER_CONFIG__` 时，会自动创建并注册。

作用：无论日志是否被输出，都会在内存中位针对特定级别的日志保留最新 N 条，方便回溯。

配置格式：

```ts
{
  length: number;
  level: string | number;
}
```

- `length`：环形缓冲区最大容量，最大值为 10000，建议在 300 以内
- `level`：捕获级别，大于等于该级别的日志才会被捕获

eg:

```html
<script>
  window.__LOGGER_BUFFER_CONFIG__ = { length: 100, level: 'WARN' };
</script>
```

以上的配置会自动创建环形缓冲并挂载到 logger.\_ringBuffer 上，它将轮转存储 `WARN` 和 `ERROR` 级别的日志，你可以通过后面的方法访问到它。

### 访问默认环形缓冲

```ts
import { logger } from '@epoint-fe/logger';

// 若在 import 前设置了 window.__LOGGER_BUFFER_CONFIG__，会自动创建环形缓冲并挂载到 logger._ringBuffer

logger.setLevel('SILENT');
logger.debug('invisible');
logger.error('boom');

const rb = logger._ringBuffer;
if (rb) {
  // 获取所有存储的日志 输出已经按照产生时间排序
  rb.get();
  // 输出到控制台
  rb.print();
}
```

API:

- `rb.get()` 获取当前快照（按时间顺序）
- `rb.print()` 打印当前快照到控制台
- `rb.clear()` 清空
- `rb.configure({ length?, level? })` 动态调整容量或捕获级别
- `rb.getConfig()` 当前配置

### 手动注册环形缓冲

如果没有设置全局配置，则不会自动创建，此时如有使用的需求，可以手动注册。

```ts
import { logger } from '@epoint-fe/logger';

logger.registerRingBufferSink({ length: 100, level: 'WARN' });
```

> 重复调用无效，只允许注册一次。
> 若非必要，建议使用全局配置自动注册。因为缓冲只会在注册后才开始缓存，手动注册的情况下，可能丢失日志初始化到注册期间的日志。

## 全局自动配置

在应用入口、任何 import logger 前：

```html
<script>
  // 设置初始级别 会自动在 logger 初始化时应用
  window.__LOGGER_LEVEL__ = 'WARN';
</script>
```


## 方法说明

### setLevel

- `persist` (`boolean`, 可选): 是否持久化到 localStorage，默认值为 `true`

**示例**

```typescript
import { logger } from '@epoint-fe/logger';

// 设置为 DEBUG 级别
logger.setLevel('DEBUG');

// 设置为 INFO 级别，不持久化
logger.setLevel('INFO', false);

// 使用数字设置
logger.setLevel(2); // INFO 级别
```

### getLevel

**作用**

获取当前日志器的日志级别。

**参数**

无

**返回值**

- `number`: 当前日志级别的数字值

**示例**


```typescript
import { logger } from '@epoint-fe/logger';

const currentLevel = logger.getLevel();
console.log(`Current level: ${currentLevel}`); // Current level: 2
```

### setDefaultLevel

**作用**

设置当前日志器的“默认级别”。当没有显式调用 `setLevel` 且未从 `localStorage` 读取到用户级别时，默认级别会生效。不会写入 `localStorage`。

若当前没有持久化的用户级别，调用后会立即生效（但不持久化）；若存在用户级别，则仅作为回退使用。

**参数**

- `level` (`string | number`): 级别名称或数字，支持 `TRACE/DEBUG/INFO/WARN/ERROR/SILENT` 或 `0..5`

**返回值**

- `void`

**示例**

```typescript
import { logger } from '@epoint-fe/logger';

// 默认级别设为 INFO。若没有用户级别，这将立即生效但不会持久化
logger.setDefaultLevel('INFO');

// 针对命名 logger 也可以设置默认级别
const apiLogger = logger.getLogger('api');
apiLogger.setDefaultLevel('WARN');
```

### resetLevel

**作用**

清除当前日志器的“用户级别”设置并移除对应的本地持久化（若存在），回退到默认级别或继承自根 `logger` 的级别。

适用于撤销之前通过 `setLevel` 的临时调整。

**参数**

无

**返回值**

- `void`

**示例**

```typescript
import { logger } from '@epoint-fe/logger';

// 清除用户级别，回到默认/继承级别
logger.resetLevel();

// 命名 logger 同样适用
const uiLogger = logger.getLogger('ui');
uiLogger.resetLevel();
```

### enableAll

**作用**

启用所有日志级别（设置为 TRACE），输出所有日志消息。

**参数**

- `persist` (`boolean`, 可选): 是否持久化设置，默认值为 `true`

**返回值**

- `void`

**示例**

```typescript
import { logger } from '@epoint-fe/logger';

logger.enableAll();
```

### disableAll

**作用**

禁用所有日志输出（设置为 SILENT）。

**参数**

- `persist` (`boolean`, 可选): 是否持久化设置，默认值为 `true`

**返回值**

- `void`

**示例**

```typescript
import { logger } from '@epoint-fe/logger';

logger.disableAll();
```

### getLogger

**作用**

创建或获取一个命名日志器。每个命名日志器都是独立的，可以有自己的日志级别。

**参数**

- `name` (`string | symbol`): 日志器的名称

**返回值**

- `LoggerLike`: 命名日志器实例

**示例**

```typescript
import { logger } from '@epoint-fe/logger';

const appLogger = logger.getLogger('app');
const apiLogger = logger.getLogger('api');

appLogger.setLevel('DEBUG');
apiLogger.setLevel('ERROR');

appLogger.debug('This is a debug message from app');
apiLogger.debug('This will not be logged'); // 级别不够
apiLogger.error('This is an error from api');
```

### rebuild

**作用**

重建日志示例的日志方法。

在默认 `logger` 上调用会递归刷新所有命名 `logger`。

**参数**： 无

**返回值**： `void`

## 高级功能示例

### 示例一：错误日志上报到后端

```ts
import { logger } from '@epoint-fe/logger';

const httpLogSink = createSink({
  name: 'httpLogSink',
  onEvent: (e) => {
    if (e.level === 4) {
      // 错误日志
      navigator.sendBeacon('/rest/logger/client-error', JSON.stringify(e));
    }
  }
});

logger.registerSink(httpLogSink);
```

### 示例二：客户端日志批量上报到服务端

```ts
import { logger } from '@epoint-fe/logger';

const logQueue = [];
const httpLogSink = createSink({
  name: 'httpLogSink',
  onEvent: (e) => {
    logQueue.push(e);
    if (logQueue.length >= 10) {
      // 批量上报
      const arr = logQueue.splice(0, 10);
      navigator.sendBeacon('/rest/logger/client-error-patch', JSON.stringify(arr));
    }
  }
});

window.addEventListener('beforeunload', () => {
  if (logQueue.length > 0) {
    const arr = logQueue.splice(0, logQueue.length);
    navigator.sendBeacon('/rest/logger/client-error-patch', JSON.stringify(arr));
  }
});

logger.registerSink(httpLogSink);
```