---
title: String
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/string/#slash
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/string/#slash)

# String

此模块提供了用于操作和处理字符串的实用函数。

## slash

**作用**

将字符串中的反斜杠 (`\\`) 替换为正斜杠 (`/`)。这在处理跨平台文件路径时很有用。

**参数**

- `str` (`string`): 要处理的字符串。

**返回值**

- (`string`): 替换后的字符串。

**示例**

```typescript
import { slash } from '@epoint-fe/common-utils';

slash('path\\to\\file'); // "path/to/file"
```

## ensurePrefix / ensureSuffix

**作用**

- `ensurePrefix`: 确保字符串以指定的前缀开头。如果不是，则添加前缀。
- `ensureSuffix`: 确保字符串以指定的后缀结尾。如果不是，则添加后缀。

**参数**

- `prefix`/`suffix` (`string`): 要确保存在的前缀或后缀。
- `str` (`string`): 要检查和处理的字符串。

**返回值**

- (`string`): 处理后的字符串。

**示例**

```typescript
import { ensurePrefix, ensureSuffix } from '@epoint-fe/common-utils';

ensurePrefix('https://', 'example.com'); // "https://example.com"
ensurePrefix('https://', 'https://example.com'); // "https://example.com"

ensureSuffix('.js', 'script'); // "script.js"
ensureSuffix('.js', 'script.js'); // "script.js"
```

## template

**作用**

一个简单的模板引擎，支持通过索引或命名键来格式化字符串。

**参数**

- `str` (`string`): 模板字符串。
- `...args`: 可以是用于替换索引占位符 (`{0}`, `{1}`) 的值列表，也可以是一个用于替换命名占位符 (`{key}`) 的对象。

**返回值**

- (`string`): 格式化后的字符串。

**示例**

```typescript
import { template } from '@epoint-fe/common-utils';

// 索引
template('Hello {0}, welcome to {1}!', 'John', 'our app');
// => "Hello John, welcome to our app!"

// 命名
template('My name is {name}, I am {age}.', { name: 'Jane', age: 25 });
// => "My name is Jane, I am 25."
```

## randomStr

**作用**

生成一个指定长度的随机字符串。

**参数**

- `size` (`number`, 可选): 字符串长度，默认为 `16`。
- `dict` (`string`, 可选): 用于生成字符串的字符集。

**返回值**

- (`string`): 随机字符串。

## capitalize / upperFirst

**作用**

- `capitalize`: 将字符串的第一个字母转换为大写，其余字母转换为小写。
- `upperFirst`: 仅将字符串的第一个字母转换为大写。

**参数**

- `str` (`string`): 要处理的字符串。

**返回值**

- (`string`): 处理后的字符串。

**示例**

```typescript
import { capitalize, upperFirst } from '@epoint-fe/common-utils';

capitalize('hELLo wORLd'); // "Hello world"
upperFirst('hELLo wORLd'); // "HELLo wORLd"
```

## unindent

**作用**

移除模板字符串中每一行公共的前导空白。通常与 [Tagged Templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) 一起使用，以保持代码整洁。

**示例**

```typescript
import { unindent } from '@epoint-fe/common-utils';

const code = unindent`
  function hello() {
    console.log("Hello, world!");
  }
`;
/*
code 的值为:
"function hello() {
  console.log("Hello, world!");
}"
(移除了第一行和最后一行的空行以及每行两个空格的缩进)
*/
```

## camelCase, snakeCase, kebabCase, pascalCase

这组函数用于在不同命名风格之间转换字符串。

### 导入

```typescript
import { camelCase, snakeCase, kebabCase, pascalCase } from '@epoint-fe/common-utils';
```

### 1. camelCase

将字符串转换为小驼峰命名法 (`camelCase`)。

**示例:**
```typescript
camelCase('hello world');      // "helloWorld"
camelCase('foo-bar');          // "fooBar"
camelCase('__FOO_BAR__');      // "fooBar"
camelCase('foo1bar');          // "foo1bar"
camelCase('hello-World');      // "helloWorld"
```

### 2. snakeCase

将字符串转换为蛇形命名法 (`snake_case`)。

**参数:**
- `str` (`string`): 要转换的字符串。
- `options` (`object`, 可选):
  - `splitOnNumber` (`boolean`, 默认 `true`): 是否在数字前添加下划线。

**示例:**
```typescript
// 默认行为
snakeCase('helloWorld');     // "hello_world"
snakeCase('hello2world');    // "hello_2_world"
snakeCase('FOO-BAR');        // "foo_bar"

// splitOnNumber: false
snakeCase('hello2world', { splitOnNumber: false }); // "hello2world"
```

### 3. kebabCase

将字符串转换为烤肉串命名法 (`kebab-case`)。

**参数:**
- `str` (`string`): 要转换的字符串。
- `options` (`object`, 可选):
  - `splitOnNumber` (`boolean`, 默认 `true`): 是否在数字前添加连字符。

**示例:**
```typescript
// 默认行为
kebabCase('helloWorld');     // "hello-world"
kebabCase('hello2world');    // "hello-2-world"
kebabCase('FOO_BAR');        // "foo-bar"

// splitOnNumber: false
kebabCase('hello2world', { splitOnNumber: false }); // "hello2world"
```

### 4. pascalCase

将字符串转换为帕斯卡命名法 (`PascalCase`)。

**示例:**
```typescript
pascalCase('hello world');      // "HelloWorld"
pascalCase('foo-bar');          // "FooBar"
pascalCase('__FOO_BAR__');      // "FooBar"
pascalCase('hello-1-world');    // "Hello1World"
```