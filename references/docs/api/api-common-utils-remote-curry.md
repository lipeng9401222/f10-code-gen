---
title: Curry
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/curry/#chain
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/curry/#chain)

# Curry

此模块提供了一系列用于函数式编程的高阶函数，例如函数组合、柯里化、防抖和节流等。

## chain

**作用**

将多个函数链接在一起，形成一个函数调用链。前一个函数的输出将作为后一个函数的输入。

**参数**

- `...funcs` (`Function[]`): 一系列要链接的函数。第一个函数可以接受多个参数，后续的函数都只接受一个参数。

**返回值**

- `Function`: 一个新的函数，调用它时会依次执行链接的函数。

**示例**

```typescript
import { chain } from '@epoint-fe/common-utils';

const add = (a: number, b: number) => a + b;
const square = (n: number) => n * n;
const toString = (n: number) => `Result is: ${n}`;

const calculate = chain(add, square, toString);

calculate(2, 3); // "Result is: 25"
```

## compose

**作用**

从右到左组合多个函数，形成一个新的函数。每个函数接收前一个函数（右边）的返回值作为参数。这在中间件或插件式架构中非常有用。

**参数**

- `...funcs` (`Function[]`): 一系列要组合的函数。

**返回值**

- `Function`: 组合后的新函数。

**示例**

```typescript
import { compose } from '@epoint-fe/common-utils';

const add5 = (next) => (x) => next(x + 5);
const multiply2 = (next) => (x) => next(x * 2);
const final = (x) => x;

const composed = compose(add5, multiply2, final);

composed(10); // 25  (10 * 2) + 5
```

## partial

**作用**

固定函数的一部分参数，返回一个新函数。这也被称为部分应用（Partial Application）。

**参数**

- `fn` (`Function`): 要应用部分参数的原始函数。
- `...args` (`any[]`): 要预先设置的参数。

**返回值**

- `Function`: 一个新函数，它会接收剩余的参数。

**示例**

```typescript
import { partial } from '@epoint-fe/common-utils';

function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const greetHello = partial(greet, 'Hello');

greetHello('World'); // "Hello, World!"
```

## memo

**作用**

记忆一个函数的结果。当使用相同的参数再次调用该函数时，它会立即返回缓存的结果，而不会重新计算。

**参数**

- `func` (`Function`): 需要被记忆的函数。
- `options` (`object`, 可选):
  - `key` (`Function`): 一个函数，用于根据输入参数生成唯一的缓存键。
  - `ttl` (`number`): 缓存的存活时间（毫秒）。

**返回值**

- `Function`: 带有记忆功能的新函数。

**示例**

```typescript
import { memo } from '@epoint-fe/common-utils';

const expensiveCalculation = (a: number, b: number) => {
  console.log('Calculating...');
  return a + b;
};

const memoizedCalc = memo(expensiveCalculation);

memoizedCalc(2, 3); // "Calculating..." -> 5
memoizedCalc(2, 3); // (no log) -> 5
```

## debounce

**作用**

创建一个防抖函数，该函数在一定时间内只会被执行一次。这对于处理用户输入、窗口大小调整等频繁触发的事件非常有用。

**参数**

- `func` (`Function`): 要防抖的函数。
- `delay` (`number`, 可选): 延迟时间（毫秒），默认为 17ms。

**返回值**

- `DebounceFunction`: 一个新的防抖函数，它还附带了 `cancel`, `isPending`, `flush` 等方法。

**示例**

```typescript
import { debounce } from '@epoint-fe/common-utils';

const handleInput = (query: string) => {
  console.log(`Searching for: ${query}`);
};

const debouncedSearch = debounce(handleInput, 300);

// 假设用户快速输入 "hello"
// debouncedSearch('h');
// debouncedSearch('he');
// debouncedSearch('hel');
// debouncedSearch('hell');
// debouncedSearch('hello');

// 最终只会在用户停止输入300ms后打印 "Searching for: hello"
```

## throttle

**作用**

创建一个节流函数，该函数在给定的时间间隔内最多执行一次。这对于控制API调用频率、处理滚动事件等非常有用。

**参数**

- `func` (`Function`): 要节流的函数。
- `options` (`number | ThrottleOptions`, 可选): 可以是一个数字（时间间隔，毫秒），或一个配置对象。
  - `interval` (`number`): 节流的时间间隔。
  - `leading` (`boolean`): 是否在第一次触发时立即执行。
  - `trailing` (`boolean`): 是否在节流结束后执行一次。

**返回值**

- `ThrottledFunction`: 一个新的节流函数，附带 `isThrottled` 方法。

**示例**

```typescript
import { throttle } from '@epoint-fe/common-utils';

const onScroll = () => {
  console.log('Scroll event handled!');
};

const throttledScroll = throttle(onScroll, 1000);

// 在1秒内无论触发多少次滚动事件，"Scroll event handled!" 也只会被打印一次
window.addEventListener('scroll', throttledScroll);
```