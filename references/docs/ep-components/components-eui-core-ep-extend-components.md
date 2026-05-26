---
title: EP 框架扩展组件
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-extend-components/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-extend-components/)

# EP 框架扩展组件

框架基于 [@epoint-fe/eui-components](http://192.168.219.170/docs/vue/latest/component/) 组件库进行二次封装，统一提供以 `ep-` 为前缀的组件。

> ✅ **特性**
>
> 作用：对接上框架接口返回的安全配置字段，对控件的状态进行控制。
> 
> 使用：将 `<e-组件名>` 替换为 `<ep-组件名>` 即可，属性、事件、Exposes 等均和原组件保持一致。

## 能力概览

- **安全配置接入**: 读取 `securityConfig`（含 `rules`、`toolRules` 与 `attach` 下同名配置），驱动控件可见性与状态。
- **按列/行联动隐藏**: 与 `ERow`、`ECol`、`EFormItem` 联动；当列内所有 `prop` 对应字段隐藏时，自动隐藏整行。
- **方法透出**: 自动透出内部 `e-form` 的全部实例方法（如 `validate`、`resetFields` 等）。
- **依赖注入**: 通过 `FormToolRulesKey`、`FormAttachConfigKey` 将权限/附件规则注入到子组件，`ep-` 系列控件可按需读取。
- **无痛替换**: `<e-组件名>` → `<ep-组件名>`，对外 API 保持一致。
- **无缝降级**： 当框架没有提供 `<ep-组件名>` 的封装实现时，会自动降级到 `<e-组件名>`。

## 已提供的扩展组件

当前仅提供了 `EpForm` 组件，后续会根据需求逐步提供其他组件。

## EpForm

### 属性 Props（EpForm）

- **model**: 表单模型对象（必填）。
- **securityConfig?**: 安全配置对象，支持：
  - **rules**: 合并到 `e-form` 的校验规则。
  - **toolRules**: 控件权限/状态规则（支持嵌套路径）。
  - **attach.rules**: 追加的校验规则（与 `rules` 合并）。
  - **attach.toolRules**: 追加的控件权限规则（与 `toolRules` 合并）。
- **toolRules?**: 顶层控件权限规则（优先级高于 `securityConfig.toolRules`）。
- **attachRules?**: 附件区域的校验规则（优先级高于 `securityConfig.attach.rules`）。
- **attachToolRules?**: 附件区域的控件权限规则（优先级高于 `securityConfig.attach.toolRules`）。

> 其余传入 `EpForm` 的属性均透传给内部的 `e-form`。

### 规则合并与优先级

- **表单校验 rules**: `rules = securityConfig.rules + securityConfig.attach.rules`（后者叠加前者）。
- **控件权限 toolRules（含附件）**:
  1. `toolRules || securityConfig.toolRules`
  2. `attachToolRules || securityConfig.attach.toolRules`

### 隐藏策略（联动 `ERow` / `ECol` / `EFormItem`）

- **判定来源**: 在合并后的 `toolRulesWithAttach` 中查找任意层级的 `{ hidden: true }` 字段。
- **按列隐藏**: 当某个 `prop` 被标记为隐藏时，包含该 `prop` 的 `ECol` 将被隐藏。
- **按行隐藏**: 若某一行内所有声明了 `prop` 的 `ECol` 都被隐藏，则整行 `ERow` 隐藏。
- **作用范围**: 仅对声明了 `prop` 的 `EFormItem` / `ECol` 生效；支持嵌套与中间虚拟节点。

### 方法透出（Exposes）

`EpForm` 在挂载后会自动将内部 `e-form` 的实例方法透出，常见如：`validate`、`resetFields`、`clearValidate`、`scrollToField` 等，调用方式与原 `e-form` 一致。

```ts
formRef.value?.validate()
formRef.value?.resetFields()
```

### 依赖注入（供子组件读取）

- **FormToolRulesKey**: 注入合并后的控件权限规则（`ComputedRef`）。
- **FormAttachConfigKey**: 注入附件区域的规则/权限配置（`ComputedRef`）。

`ep-` 系列控件可以通过 `inject` 读取对应规则，控制自身可见性/可用性等状态。

## 安全接口响应示例

```ts
const securityConfig = {
  rules: {
    user: {
      name: [{ required: true }],
    },
  },
  toolRules: {
    user: {
      name: { hidden: false },
      mobile: { hidden: true },
    },
  },
  attach: {
    rules: {
      // 附件区域的额外 rules
    },
    toolRules: {
      // 附件区域的额外权限规则
    },
  },
}
```