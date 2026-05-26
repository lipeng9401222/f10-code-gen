---
title: 工具库
maxTocDepth: 3
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/utilities/helpers/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/utilities/helpers/)

## getConfig

#### 作用

获取系统全局配置项的值。

#### 类型定义

```ts
function getConfig<T>(name: string): T | undefined;
```

#### 参数

- `name`：配置项名字

#### 返回值

- 配置项的值，类型为 `T`，如果配置项不存在，则返回 `undefined`。

#### 示例

```ts
import { getConfig } from '@epoint-fe/utils';

// 获取系统全局配置项 `baseURL` 的值
const baseURL = getConfig<string>('baseURL');
```

## getAllElements

#### 作用

获取所有子节点元素。

#### 类型定义

```ts
function getAllElements(children: VNode[], includeText = false): VNode[];
```

#### 参数

- `children`：顶层节点数组
- `includeText`：是否包含文本节点，默认值为 `false`

#### 返回值

- 所有子节点元素的数组。

#### 示例

```ts
import { getAllElements } from '@epoint-fe/utils';
import { useSlots } from 'vue';

const slots = useSlots();
// 获取插槽里的所有子节点元素
const allElements = getAllElements(slots.default?.());
```

## encodeUtf8

#### 作用

将字符串编码为 UTF-8 格式。

#### 类型定义

```ts
function encodeUtf8(str: string): string;
```

#### 参数

- `str`：要编码的字符串

#### 返回值

- 编码后的 UTF-8 字符串

#### 示例

```ts
import { encodeUtf8 } from '@epoint-fe/utils';

// 编码字符串为 UTF-8 格式
const utf8Str = encodeUtf8('你好');
```

## decodeUtf8

#### 作用

将 UTF-8 格式的字符串解码为普通字符串。

#### 类型定义

```ts
function decodeUtf8(str: string): string;
```

#### 参数

- `str`：要解码的 UTF-8 字符串

#### 返回值

- 解码后的普通字符串

#### 示例

```ts
import { decodeUtf8 } from '@epoint-fe/utils';

// 解码 UTF-8 字符串为普通字符串
const str = decodeUtf8(utf8Str);
```

## EventEmitter

#### 作用

事件发射器，用于事件的支持。

#### 类型定义

```ts
class EventEmitter {
  constructor();
  on(type: string, fn: (...args: any[]) => void): EventEmitter;
  off(type: string, fn?: (...args: any[]) => void): EventEmitter;
  emit(type: string, data?: EventFnData, context?: EventHandlerContext): EventEmitter;
  once(type: string, fn: (...args: any[]) => void): EventEmitter;
  static installTo(obj: object): void;
}
```

#### on

##### 作用

监听事件。

##### 参数

- `type`：事件类型
- `fn`：事件回调函数

##### 返回值

- 当前事件发射器实例

#### off

##### 作用

移除事件监听。

##### 参数

- `type`：事件类型
- `fn`：事件回调函数，可选

##### 返回值

- 当前事件发射器实例

#### emit

##### 作用

触发事件。

##### 参数

- `type`：事件类型
- `data`：事件数据，可选
- `context`：事件上下文，可选

##### 返回值

- 当前事件发射器实例

#### once

##### 作用

只触发一次的监听事件，事件触发后会自动移除监听。

##### 参数

- `type`：事件类型
- `fn`：事件回调函数

##### 返回值

- 当前事件发射器实例

#### installTo

##### 作用

将事件发射器实例安装到指定对象上，使该对象具有事件监听和触发的能力。

##### 参数

- `obj`：要安装事件发射器的对象

##### 返回值

- 无

#### 示例

```ts
import { EventEmitter } from '@epoint-fe/utils';

// 创建一个事件发射器实例
const emitter = new EventEmitter();

// 监听事件
emitter.on('event', (arg1, arg2) => {
  console.log(arg1, arg2);
});

// 触发事件
emitter.emit('event', 'hello', 'world');

// 移除事件监听
emitter.off('event');

// 安装事件发射器到对象
EventEmitter.installTo(obj);

// 触发事件
obj.on('event', (arg1, arg2) => {
  console.log(arg1, arg2);
});

// 移除事件监听
obj.emit('event', 'hello', 'world');
```

## getFileSize

#### 作用

格式化文件大小。

#### 类型定义

```ts
function getFileSize(size: number): string;
```

#### 参数

- `size`：文件大小，单位为字节

#### 返回值

- 格式化后的文件大小字符串，例如：`100B`、`1.23KB`、`2.34MB` 等

#### 示例

```ts
import { getFileSize } from '@epoint-fe/utils';

// 格式化文件大小
const fileSize = getFileSize(100); // 100B
const fileSize2 = getFileSize(102400); // 100KB
const fileSize3 = getFileSize(2048000); // 2MB
```

## getFileExtension

#### 作用

获取文件扩展名。

#### 类型定义

```ts
function getFileExtension(filename: string): string;
```

#### 参数

- `filename`：文件名

#### 返回值

- 文件扩展名，例如：`js`、`css`、`html` 等

#### 示例

```ts
import { getFileExtension } from '@epoint-fe/utils';

// 获取文件扩展名
const ext = getFileExtension('index.js'); // js
const ext2 = getFileExtension('style.css'); // css
const ext3 = getFileExtension('page.html'); // html
```

## getFileHashString

#### 作用

根据文件名字、文件大小和最后修改时间来生成 hash Key。

#### 类型定义

```ts
function getFileHashString(file: File): number;
```

#### 参数

- `file`：文件对象

#### 返回值

- 生成的 hash 值，类型为 number

#### 示例

```ts
import { getFileHashString } from '@epoint-fe/utils';

// 生成文件 hash Key
const hash = getFileHashString(file);
```

## timeChunk

#### 作用

分时分批处理数据。

#### 类型定义

```ts
function timeChunk<T>(arr: Array<T>, fn: (it: T) => void, count: number = 1, interval: number = 100, callback?: () => void): (() => void);
```

#### 参数

- `arr`：要处理的数据数组
- `fn`：每个数据项的处理函数
- `count`：每次处理的数据项数量，默认值为 1
- `interval`：每次处理的时间间隔，单位为毫秒，默认值为 100
- `callback`：所有数据处理完成后的回调函数，可选

#### 返回值

- 开始处理函数，调用该函数开始分时分批处理数据

#### 示例

```ts
import { timeChunk } from '@epoint-fe/utils';

// 分时分批处理数据
const start = timeChunk(arr, (item) => {
  console.log(item);
});

// 开始处理数据
start();
```

## loadJs

#### 作用

动态加载 JavaScript 文件。

#### 类型定义

```ts
function loadJs(urls: string | string[], callback?: () => void): void;
```

#### 参数

- `urls`：JavaScript 文件的 URL 地址，多个 URL 地址用数组形式传入
- `callback`：加载完成后的回调函数，可选

#### 返回值

- 无

#### 示例

```ts
import { loadJs } from '@epoint-fe/utils';

// 动态加载 JavaScript 文件
loadJs('https://example.com/script.js', () => {
  console.log('脚本加载完成');
});
```

## loadCss

#### 作用

动态加载 CSS 文件。

#### 类型定义

```ts
type CssInsertPos = 'before' | 'after';
function loadCss(url: string, target?: string | HTMLElement, pos: CssInsertPos = 'after'): void;
```

#### 参数

- `url`：CSS 文件的 URL 地址
- `target`：插入判断的位置元素，可选。默认值为 document.head
- `pos`：相对目标元素的前后位置，可选值 ['before', 'after']，默认值为 'after'

#### 返回值

- 无

#### 示例

```ts
import { loadCss } from '@epoint-fe/utils';

// 动态加载 CSS 文件
loadCss('https://example.com/style.css');
```

## LRU

#### 作用

最近最少使用（Least Recently Used）策略的缓存。

#### 类型定义

```ts
type LRUOptions = {
  size: number;
  maxAge?: number;
};

class LRU {
  constructor(sizeOrOptions?: number | LRUOptions);
  keys: string[]; // 所有缓存项的键名数组
  clear(): void; // 清空所有缓存项
  remove(key: string): unknown; // 移除指定缓存项
  peek(key: string): unknown | undefined; // 获取指定缓存项的值，但不更新最近使用时间
  get(key: string): unknown | undefined; // 获取指定缓存项的值，并更新最近使用时间
  set<T>(key: string, value: T): T; // 设置更新缓存项
  evict(): void; // 移除队列末尾的项
}
```

#### clear

##### 作用

清空所有缓存项。

##### 参数

无

##### 返回值

无

#### remove

##### 作用

移除指定缓存项。

##### 参数

- `key`：缓存项的键名

##### 返回值

- 被移除的项，若不存在则返回 undefined

#### peek

##### 作用

获取指定缓存项的值，但不更新最近使用时间。

##### 参数

- `key`：缓存项的键名

##### 返回值

- 缓存项的值，若不存在则返回 undefined

#### get

##### 作用

获取指定缓存项的值，并更新最近使用时间。

##### 参数

- `key`：缓存项的键名

##### 返回值

- 缓存项的值，若不存在则返回 undefined

#### set

##### 作用

设置缓存项。若缓存项已存在，则更新其值和最近使用时间。

##### 参数

- `key`：缓存项的键名
- `value`：缓存项的值

##### 返回值

- 缓存项的值

#### evict

##### 作用

移除队列末尾的项。

##### 参数

无

##### 返回值

无

#### 示例

```ts
import { LRU } from '@epoint-fe/utils';

// 创建一个 LRU 缓存实例，最大数量为 3
const cache = new LRU(3);

// 设置缓存项
cache.set('key1', 'value1');
cache.set('key2', 'value2');
cache.set('key3', 'value3');

// 获取缓存项
const value1 = cache.get('key1'); // 'value1'
const value2 = cache.get('key2'); // 'value2'
const value3 = cache.get('key3'); // 'value3'

// 设置新的缓存项，超过最大数量时，会自动移除最近最少使用的项
cache.set('key4', 'value4');

// 缓存项数量超过最大数量时，会自动移除最近最少使用的项
console.log(cache.keys); // ['key2', 'key3', 'key4']

// 创建一个最大数量为 3，过期时间为 1000 毫秒的 LRU 缓存实例
const timeLimitedCache = new LRU({ size: 3, maxAge: 1000 });

timeLimitedCache.set('key1', 'value1');

// 等待 1000 毫秒后，缓存项过期
setTimeout(() => {
  // 缓存项过期，无法获取
  const expiredValue = timeLimitedCache.get('key1'); // undefined
}, 1000);
```

## getFrameSysParam

#### 作用

获取系统参数值。

#### 类型定义

```ts
function getFrameSysParam<T = unknown>(name: string): T;
```

#### 参数

- `name`：系统参数的键名

#### 返回值

- 系统参数的值，若不存在则返回 undefined

#### 示例

```ts
import { getFrameSysParam } from '@epoint-fe/utils';

// 获取系统参数 `epoint_local` 的值
const local = getFrameSysParam('epoint_local');
```

## refreshFrameSysParam

#### 作用

刷新系统参数值。

#### 类型定义

```ts
function refreshFrameSysParam(): void;
```

#### 参数

无

#### 返回值

无

#### 示例

```ts
import { refreshFrameSysParam } from '@epoint-fe/utils';

// 刷新系统参数
refreshFrameSysParam();
```

## isAbsoluteURL

#### 作用

判断 URL 是否为绝对路径。

#### 类型定义

```ts
function isAbsoluteURL(url: string): boolean;
```

#### 参数

- `url`：URL 地址

#### 返回值

- 若 URL 为绝对路径则返回 true，否则返回 false

#### 示例

```ts
import { isAbsoluteURL } from '@epoint-fe/utils';

// 判断 URL 是否为绝对路径
const isAbsolute = isAbsoluteURL('https://example.com/path'); // true
const isRelative = isAbsoluteURL('/path'); // false
```

## getRootPath

#### 作用

获取当前工程的根路径。

#### 类型定义

```ts
function getRootPath(): string;
```

#### 参数

无

#### 返回值

- 当前工程的根路径，取值为工程 `config.js` 中配置的 `rootPath` 参数值。

#### 示例

```ts
import { getRootPath } from '@epoint-fe/utils';

// 获取当前工程的根路径
const rootPath = getRootPath(); // 'http://localhost:5173/epoint-web'
```

## getHash

#### 作用

获取当前 URL 的哈希值。

#### 类型定义

```ts
function getHash(url?: string): string;
```

#### 参数

- `url`：URL 地址，不传则默认为当前页面的 URL

#### 返回值

- 当前 URL 的哈希值，若不存在则返回空字符串

#### 示例

```ts
import { getHash } from '@epoint-fe/utils';

// 获取当前 URL 的哈希值
const hash = getHash('https://example.com/path#/hash'); // '#/hash'
```

## removeHash

#### 作用

移除 URL 上的哈希值。

#### 类型定义

```ts
function removeHash(url: string): string;
```

#### 参数

- `url`：URL 地址

#### 返回值

- 移除哈希值后的 URL 地址

#### 示例

```ts
import { removeHash } from '@epoint-fe/utils';

// 移除 URL 上的哈希值
const url = removeHash('https://example.com/path#/hash'); // 'https://example.com/path'
```

## getUrlParams

#### 作用

获取当前页面 URL 上的查询参数。

#### 类型定义

```ts
function getUrlParams(prop?: string): Record<string, string | string[]> | string | string[] | undefined;
```

#### 参数

- `prop`：查询参数的键名，不传则返回所有查询参数

#### 返回值

- 若不传 `prop` 则返回 URL 上的所有查询参数对象，若不存在则返回空对象
- 若 `prop` 为查询参数的键名，则返回该键名对应的值，若不存在则返回 undefined

#### 示例

```ts
import { getUrlParams } from '@epoint-fe/utils';

// 获取当前 URL 上的查询参数
const params = getUrlParams(); // { key1: 'value1', key2: 'value2' }

// 获取当前 URL 上的查询参数 key1 的值
const key1Value = getUrlParams('key1'); // 'value1'
```

## addUrlParams

#### 作用

添加查询参数到 URL 上。

#### 类型定义

```ts
function addUrlParams(url: string, params: Record<string, string | string[]> , mode?: 'normal' | 'replace' | 'ignore'): string;
```

#### 参数

- `url`：要处理的 URL 地址
- `params`：要新增的参数 ，键值对形式
- `mode`：处理模式，可选值为 `normal`、`replace`、`ignore`，默认为 `normal`
  - `normal`：正常模式，即 URLSearchParams 标准规范规则：重名参数构成数组
  - `replace`：替换模式，若 URL 上已存在该查询参数，则替换该参数的值，若不存在则新增一个键值对
  - `ignore`：忽略模式，若 URL 上已存在该查询参数，则不做任何处理，若不存在则新增一个键值对

#### 返回值

- 添加查询参数后的 URL 地址

#### 示例

```ts
import { addUrlParams } from '@epoint-fe/utils';

// 添加查询参数到 URL 上
const url = addUrlParams('https://example.com/path', { key1: 'value1', key2: 'value2' }); // 'https://example.com/path?key1=value1&key2=value2'

// 添加查询参数到 URL 上，若已存在 key1 则替换其值
const url = addUrlParams('https://example.com/path?key1=value1', { key1: 'newValue1' }, 'replace'); // 'https://example.com/path?key1=newValue1'

// 添加查询参数到 URL 上，若已存在 key1 则不做任何处理
const url = addUrlParams('https://example.com/path?key1=value1', { key1: 'newValue1' }, 'ignore'); // 'https://example.com/path?key1=value1'

// 添加查询参数到 URL 上，若已存在 key1 则合并成数组
const url = addUrlParams('https://example.com/path?key1=value1', { key1: 'newValue1' }, 'normal'); // 'https://example.com/path?key1=value1&key1=newValue1'
```

## getRightUrl

#### 作用

获取正确的服务端 URL 地址。

#### 类型定义

```ts
function getRightUrl(url: string): string;
```

#### 参数

- `url`：要处理的 URL 地址

#### 返回值

- 若 URL 为绝对路径则返回原 URL，否则返回根路径（rootPath）拼接后的 URL

#### 示例

```ts
import { getRightUrl } from '@epoint-fe/utils';

// 获取正确的 URL 地址
const rightUrl = getRightUrl('/path'); // 'http://localhost:5173/epoint-web/path'
```

## writeCookie

#### 作用

写入 Cookie。

#### 类型定义

```ts
/**
 * cookie 的配置项
 */
interface CookieOptions {
  /**
   * 可以访问此 cookie 的页面路径
   */
  path?: string;
  /**
   * cookie 超时时间
   */
  expires?: Date | number;
  /**
   * 最大生命周期
   */
  maxAge?: number;
  /**
   * 可以访问此 cookie 的域名
   */
  domain?: string;
  /**
   * 是否只能通过 https 来传递此条 cookie
   */
  secure?: boolean;
}

function writeCookie(key: string, value: string, options?: CookieOptions): string;
```

#### 参数

- `key`：Cookie 名称
- `value`：Cookie 值
- `options`：Cookie 选项，可选值为 `expires`、`path`、`domain`、`secure`、`maxAge`，默认为空对象

#### 返回值

- 写入后的 Cookie 值

#### 示例

```ts
import { writeCookie } from '@epoint-fe/utils';

// 写入 Cookie
writeCookie('key', 'value'); // 写入一个名为 key，值为 value 的 Cookie
```

## readCookie

#### 作用

读取 Cookie。

#### 类型定义

```ts
function readCookie(key?: string): Record<string, string> | string | undefined;
```

#### 参数

- `key`：Cookie 名称，不传则返回所有 Cookie

#### 返回值

- 若不传 `key`， 则返回所有 Cookie 组成的对象，若不存在 Cookie 则返回空对象
- 若传 `key`， 则返回该 `key` 值对应的 Cookie 的值，若不存在则返回 undefined

#### 示例

```ts
import { readCookie } from '@epoint-fe/utils';

// 读取 Cookie
const value = readCookie('key'); // 'value'
```

## removeCookie

#### 作用

移除 Cookie。

#### 类型定义

```ts
function removeCookie(key: string, options?: CookieOptions): boolean;
```

#### 参数

- `key`：要删除的 Cookie 名称
- `options`：Cookie 选项，可选值为 `expires`、`path`、`domain`、`secure`、`maxAge`，默认为空对象

#### 返回值

- 若删除成功则返回 true，否则返回 false

#### 示例

```ts
import { removeCookie } from '@epoint-fe/utils';

// 移除 Cookie
removeCookie('key'); // 移除名为 key 的 Cookie
```

## htmlUnescape

#### 作用

HTML 转义字符解码。

#### 类型定义

```ts
function htmlUnescape(str: string): string;
```

#### 参数

- `str`：要处理的字符串

#### 返回值

- 解码后的字符串

#### 示例

```ts
import { htmlUnescape } from '@epoint-fe/utils';

// HTML 转义字符解码
const str = htmlUnescape('&lt;div&gt;Hello World&lt;/div&gt;'); // '<div>Hello World</div>'
```

## getSafeHtml

#### 作用

HTML 字符串 XSS 过滤。

#### 类型定义

```ts
function getSafeHtml(str: string): string;
```

#### 参数

- `str`：要处理的 HTML 字符串

#### 返回值

- 经过 XSS 安全过滤后的 HTML 字符串

#### 示例

```ts
import { getSafeHtml } from '@epoint-fe/utils';

// 获取经过安全过滤后的 HTML 字符串
const safeHtml = getSafeHtml('<script>Hello World</script>'); // '<noscript>Hello World</noscript>'
```

## isUrlEncrypted

#### 作用

判断 URL 是否已加密。

#### 类型定义

```ts
function isUrlEncrypted(url: string): boolean;
```

#### 参数

- `url`：要判断的 URL 地址

#### 返回值

- 若 URL 已加密则返回 true，否则返回 false

#### 示例

```ts
import { isUrlEncrypted } from '@epoint-fe/utils';

// 判断 URL 是否已加密
isUrlEncrypted('https://example.com/path?key1=value1'); // false
isUrlEncrypted('https://example.com/path?frameUrlSecretParam=aXNDb21tb25kdG8lM0R0cnVl'); // true
```

## needEncrypt

#### 作用

判断 URL 是否需要加密。

#### 类型定义

```ts
function needEncrypt(url: string): boolean;
```

#### 参数

- `url`：要判断的 URL 地址

#### 返回值

- 根据系统是否开启参数加密，和 URL 是否在要跳过的加密列表中，判断是否需要加密。

#### 示例

```ts
import { needEncrypt } from '@epoint-fe/utils';

// 判断 URL 是否需要加密
needEncrypt('https://example.com/path?key1=value1'); // true
```

## getEncryptedUrlParams

#### 作用

获取加密后的 URL 参数值。

#### 类型定义

```ts
function getEncryptedUrlParams(url: string): string;
```

#### 参数

- `url`：要处理的 URL 地址

#### 返回值

- 加密后的 URL 参数值

#### 示例

```ts
import { getEncryptedUrlParams } from '@epoint-fe/utils';

// 获取加密后的 URL 参数
getEncryptedUrlParams('https://example.com/path?frameUrlSecretParam=aXNDb21tb25kdG8lM0R0cnVl'); // 'aXNDb21tb25kdG8lM0R0cnVl'
```

## encrypt

#### 作用

加密字符串。

#### 类型定义

```ts
function encrypt(str: string): string;
```

#### 参数

- `str`：要处理的字符串

#### 返回值

- 加密后的字符串。加密方式会根据系统参数 `security_encrypt_type` 来确定，默认是 `base64`。

#### 示例

```ts
import { encrypt } from '@epoint-fe/utils';

// 加密 URL 参数
encrypt('abc'); // 'YWJj'
```

## decrypt

#### 作用

解密字符串。

#### 类型定义

```ts
function decrypt(str: string): string;
```

#### 参数

- `str`：要处理的加密字符串

#### 返回值

- 解密后的字符串。解密方式会根据系统参数 `security_encrypt_type` 来确定，默认是 `base64`。

#### 示例

```ts
import { decrypt } from '@epoint-fe/utils';

// 解密 URL 参数
decrypt('YWJj'); // 'abc'
```

## encryptAjaxUrlParams

#### 作用

加密 Ajax 请求 URL 参数。

#### 类型定义

```ts
function encryptAjaxUrlParams(url: string): string;
```

#### 参数

- `url`：要处理的 URL 地址

#### 返回值

- 加密后的 URL 参数值。加密方式会根据系统参数 `security_encrypt_type` 来确定，默认是 `base64`。

#### 示例

```ts
import { encryptAjaxUrlParams } from '@epoint-fe/utils';

// 加密 Ajax 请求 URL 参数
encryptAjaxUrlParams('https://example.com/path?key1=abc'); // 'https://example.com/path?frameUrlSecretParam=a2V5MSUzRGFiYw%3D%3D'
```

## encryptAjaxParams

#### 作用

加密 Ajax 请求参数。

#### 类型定义

```ts
function encryptAjaxParams(data: any, url: string): any;
```

#### 参数
- `data`：要处理的 Ajax 请求参数对象
- `url`：要处理的 URL 地址

#### 返回值

- 加密后的 Ajax 请求参数对象。加密方式会根据系统参数 `security_encrypt_type` 来确定，默认是 `base64`。

#### 示例

```ts
import { encryptAjaxParams } from '@epoint-fe/utils';

// 加密 Ajax 请求参数
encryptAjaxParams({ key1: 'abc' }, 'https://example.com/path'); // { frameBodySecretParam: 'a2V5MSUzRGFiYw%3D%3D' }
```

## decryptBodyParams

#### 作用

解密 Ajax 响应数据。

#### 类型定义

```ts
function decryptBodyParams(data: any): any;
```

#### 参数

- `data`：要处理的 Ajax 响应数据对象

#### 返回值

- 解密后的 Ajax 响应数据对象。解密方式会根据系统参数 `security_encrypt_type` 来确定，默认是 `base64`。

#### 示例

```ts
import { decryptBodyParams } from '@epoint-fe/utils';

// 解密 Ajax 响应数据
decryptBodyParams({ frameBodySecretParam: 'a2V5MSUzRGFiYw%3D%3D' }); // { key1: 'abc' }
```

## encryptUrlParams

#### 作用

加密 URL 参数，固定使用 `base64` 加密。

#### 类型定义

```ts
function encryptUrlParams(url?: string): string;
```

#### 参数

- `url`：要处理的 URL 地址。不传则取当前页面 URL。

#### 返回值

- 加密后的 URL 参数值，固定使用 `base64` 方式加密。

#### 示例

```ts
import { encryptUrlParams } from '@epoint-fe/utils';

// 加密 URL 参数
encryptUrlParams('https://example.com/path?key1=abc'); // 'https://example.com/path?frameUrlSecretParam=a2V5MSUzRGFiYw%3D%3D'
```

## decryptUrlParams

#### 作用

解密 URL 参数，固定使用 `base64` 解密。

#### 类型定义

```ts
function decryptUrlParams(url: string): string;
```

#### 参数

- `url`：要处理的 URL 地址。不传则取当前页面 URL。

#### 返回值

- 解密后的 URL，固定使用 `base64` 方式解密。

#### 示例

```ts
import { decryptUrlParams } from '@epoint-fe/utils';

// 解密 URL 参数
decryptUrlParams('https://example.com/path?frameUrlSecretParam=a2V5MSUzRGFiYw%3D%3D'); // 'https://example.com/path?key1=abc'
```

## registerEncryptor

#### 作用

注册加密器。

#### 类型定义

```ts
abstract class AbstractEncryptor {
  public abstract encrypt(str: string, key?: string): string;

  public abstract decrypt(str: string, key?: string): string;
}

function registerEncryptor(name: string, encryptor: AbstractEncryptor): void;
```

#### 参数

- `name`：要注册的加密器名称。
- `encryptor`：要注册的加密器实例。

#### 返回值

- 无

注册自定义加密器后，可通过修改 `security_encrypt_type` 系统参数的值为加密器的 `name` 来让系统使用自定义加密器来处理请求参数的加解密。

#### 示例

```ts
import { registerEncryptor, AbstractEncryptor } from '@epoint-fe/utils';

class CustomEncryptor implements AbstractEncryptor {
  encrypt(str: string): string {
    // 自定义加密逻辑
    return str;
  }

  decrypt(str: string): string {
    // 自定义解密逻辑
    return str;
  }
}
// 注册自定义加密器
registerEncryptor('custom', new CustomEncryptor());
```

## getEncryptor

#### 作用

获取已注册的加密器实例。

#### 类型定义

```ts
function <T extends AbstractEncryptor>getEncryptor(name: string): T | undefined;
```

#### 参数

- `name`：要获取的加密器名称。

#### 返回值

- 已注册的加密器实例。如果未注册，则返回空。

#### 示例

```ts
import { getEncryptor } from '@epoint-fe/utils';

// 获取 base64 加密器
getEncryptor('base64'); // Base64Encryptor

// 获取自定义加密器
getEncryptor('custom'); // CustomEncryptor
```