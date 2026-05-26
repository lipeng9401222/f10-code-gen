---
title: Validator
---

# Validator 验证

为方便验证数据，组件库将验证规则做了封装，除了通过表单上配置 `rules` 属性来验证数据外，您还可以直接调用方法来验证数据。

## 使用说明

我们在组件库中将验证相关的能力进行了暴露，您可以导入后使用。

```ts
import { validator } from '@epoint-fe/eui-components';

const { validateWithRules, validateOneRule, _validator, createNewValidator } = validator;
```

## 调用验证方法

:::demo 可使用 `validateWithRules` 方法验证多个规则，也可以使用 `validateOneRule` 方法验证单个规则。
validator/fun-use
:::

## 扩展内置的规则

`_validator` 是组件内统一使用的验证器，内部已经注册了一些常用的验证规则，如果你需要扩展内置的规则，可以通过 `_validator.register` 方法注册新的规则。

:::demo 此示例展示注册两个新的全局规则，然后就可以直接配置使用了。
validator/extend-rule
:::

:::warning 注意

通过 `_validator.register` 方法注册新的规则是全局的，也就是说你一旦注册后，整个项目中都可以使用这个规则。

如果你是局部需求，务必不要使用这个方法。 应该通过传入自定义的验证方法来实现，或者通过 `createNewValidator` 创建一个新的验证器实例，在这个实例上注册新的规则。

:::

## 方法签名

具体的方法签名如下：

```ts
// 针对值验证多个规则
function validateWithRules(value: ValueType, rules: Array<ValidatorRule>): Promise<ValidateResultType[]>;

// 针对值验证单个规则
function validateOneRule(value: ValueType, rule: ValidatorRule): Promise<ValidateResultType>;

// validator 是框架内置的验证器，内部注册好了框架内置的验证规则
// 如果你需要全局扩展规则，则可以通过默认实例的 register 方法注册添加新的规则
declare const _validator: Validator;

// 创建新的验证器 (没有内置的规则，你可以注册加入自己的)
function createNewValidator(): Validator;

// 验证器类的核心定义如下：
class Validator {
  /**
   * 注册一个验证规则
   *
   * @param {ValidatorRule | string} ruleType
   * @param {ValidateFuncType} validateFn
   * @return {*}
   * @memberof Validator
   */
  register(rule: ValidatorRule | string, validateFn: ValidateFuncType): void;

  /**
   * 对值进行某个规则的校验
   *
   * @param {ValueType} val 要校验的值
   * @param {(ValidatorRule | string)} rule 用什么规则进行校验
   * @return {boolean | Promise<boolean>}  {(boolean | Promise<boolean>)} 是否通过
   * @memberof Validator
   */
  async validate(val: ValueType, rule: ValidatorRule | string): Promise<boolean | Error>;
}

// 其他类型定义如下：
interface ValidateFuncType {
  (val: ValueType, options?: ValidateOptions): ValidateFuncReturnType;
}

interface ValidatorRule {
  type?: string;
  required?: boolean;
  message?: string;
  validator?: ValidateFuncType;
  // 此规则的其他配置选项 已经枚举了全部的
  // [optionKey: string]: any;
}
```


## 内置规则

验证的大部分使用场景是表单，请参阅 [Form 表单 - 验证规则章节](../component/form.md#formitemrule) 了解更多。