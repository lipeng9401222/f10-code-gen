---
title: Is
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/is/#isdef
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/is/#isdef)

# Is

此模块提供了一系列用于检查 JavaScript 值的类型的函数（类型守卫）。

## isDef

- **作用**: 检查值是否已定义 (不是 `undefined`)。
- **示例**: `isDef(0)` 返回 `true`, `isDef(undefined)` 返回 `false`。

## isBoolean

- **作用**: 检查值是否为布尔类型。
- **示例**: `isBoolean(true)` 返回 `true`, `isBoolean('true')` 返回 `false`。

## isFunction

- **作用**: 检查值是否为函数。
- **示例**: `isFunction(() => {})` 返回 `true`。

## isNumber

- **作用**: 检查值是否为数字。
- **示例**: `isNumber(123)` 返回 `true`。

## isString

- **作用**: 检查值是否为字符串。
- **示例**: `isString('hello')` 返回 `true`。

## isObject

- **作用**: 检查值是否为普通对象 (不是数组，也不是 `null`)。
- **示例**: `isObject({})` 返回 `true`, `isObject([])` 返回 `false`。

## isUndefined

- **作用**: 检查值是否为 `undefined`。
- **示例**: `isUndefined(undefined)` 返回 `true`。

## isNull

- **作用**: 检查值是否为 `null`。
- **示例**: `isNull(null)` 返回 `true`。

## isNil

- **作用**: 检查值是否为 `null` 或 `undefined`。
- **示例**: `isNil(null)` 和 `isNil(undefined)` 都返回 `true`。

## isRegExp

- **作用**: 检查值是否为正则表达式。
- **示例**: `isRegExp(/a/)` 返回 `true`。

## isDate

- **作用**: 检查值是否为日期对象。
- **示例**: `isDate(new Date())` 返回 `true`。

## isSymbol

- **作用**: 检查值是否为 Symbol。
- **示例**: `isSymbol(Symbol('id'))` 返回 `true`。

## isInt

- **作用**: 检查值是否为整数。
- **示例**: `isInt(10)` 返回 `true`, `isInt(10.5)` 返回 `false`。

## isPromise

- **作用**: 检查值是否为 Promise。
- **示例**: `isPromise(new Promise(() => {}))` 返回 `true`。

## isFloat

- **作用**: 检查值是否为浮点数。
- **示例**: `isFloat(10.5)` 返回 `true`, `isFloat(10)` 返回 `false`。

## isArray

- **作用**: 检查值是否为数组。
- **示例**: `isArray([])` 返回 `true`。

## isPrimitive

- **作用**: 检查值是否为原始类型 (`undefined`, `null`, `boolean`, `number`, `string`, `symbol`)。
- **示例**: `isPrimitive(123)` 返回 `true`, `isPrimitive({})` 返回 `false`。

## isWindow

- **作用**: 检查值是否为 `window` 对象。
- **示例**: `isWindow(window)` 返回 `true` (在浏览器环境中)。

## isBrowser

- **作用**: 检查当前环境是否为浏览器。
- **示例**: 在浏览器中 `isBrowser` 为 `true`。

## isEmpty

- **作用**: 检查值是否为空。空值的定义包括：
  - falsy 值 (除了 `0`)
  - 空数组
  - 没有可枚举属性的空对象
- **示例**: `isEmpty(null)`, `isEmpty('')`, `isEmpty([])`, `isEmpty({})` 都返回 `true`。`isEmpty(0)` 返回 `false`。