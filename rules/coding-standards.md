# coding-standards · Vue 3 + Composition API

> 来源：`vue-docs/frontpage.md` + `vue-docs/troubleshooting.md` + `packages/examples/src/views/demo/page/typical/**`。
> **每条带 ✓ 检验句**，写完代码逐条自检。

---

## R1 · 一律 Vue 3 + `<script setup>`

- F10 框架是 Vue 3，**禁止** Options API（`data()` / `methods` / `computed` 对象写法）
- **禁止** Vue 2 风格 `Vue.component('xxx', {...})`
- 必须用 `<script setup>` 单文件组件 + Composition API
- `defineOptions({ name: 'XxxYyy' })` 给组件命名（路由 keep-alive 必需）

✓ 检验句：你的 .vue 文件 `<script>` 标签上有 `setup` 属性，且组件内**没有** `data()` 或 `methods` 对象。

---

## R2 · 三种数据请求模式（强制走对应 API）

| 场景 | 必须用 | 禁止用 |
| --- | --- | --- |
| 表格 / 树 / 下拉框数据 | `defineDataModel` 内的 `useTableModel` / `useTreeModel` / `useListModel` | ❌ `Utils.requestAxios` 直接调 |
| 增 / 删 / 改 操作 | `Utils.requestAxios` | ❌ 自己写 `fetch` / `axios` 实例 |
| 文件下载 / 流接口 | `Utils.requestAxios` 配合 `responseType: 'blob'` | ❌ `XMLHttpRequest` |

详情：见 `rules/data-model-rules.md` § R1~R5。

✓ 检验句：grep 搜 `requestAxios.*list|requestAxios.*tree|requestAxios.*options` 在你新增的代码里**没有匹配**才算过。

---

## R3 · import 规范

- 框架核心：`import { Utils, Hooks, EpDataGrid } from '@epframe/eui-core'`
- UI 组件：`import { EMessage, EMessageBox } from '@epoint-fe/eui-components'`
- 图标：`import { Add, Delete, Edit } from '@epoint-fe/eui-icons'`（用前**必须**查 `references/docs/components/components-icon.md`）
- **禁止**写相对路径绕过框架包名（`import EpDataGrid from '../../node_modules/...'`）

✓ 检验句：所有 `import` 行的来源包都在 `package.json:dependencies` 里能找到。

---

## R4 · 顶层 import 一律放文件最顶部

- import 必须**全部**位于 `<script setup>` 第一行往下的连续行
- **禁止**在函数体里 `import()`（动态 import 例外，如 `defineAsyncComponent(() => import('./detail.vue'))`）
- 类型 import 用 `import type` 显式标注（TS 项目）

✓ 检验句：将 import 全部剪切到顶部后代码功能等价才算过。

---

## R5 · 响应式 / 副作用规范

- 用 `ref` / `reactive` / `computed`，**不要**手动写 watcher 来"模拟" computed
- `watch` 默认 `{ deep: false }`，**确实需要深度监听**才加 `deep: true`（性能开销）
- `onMounted` 里只放**初始化**代码，业务逻辑不要塞进去
- `onActivated` 用于 keep-alive 回到此页时的刷新逻辑

✓ 检验句：随机抽你写的 1 个 `watch`，能说清楚为什么要 deep / 不 deep 才算过。

---

## R6 · 空值与默认值

- props 必须有 default：`defineProps({ rowGuid: { type: String, default: '' } })`
- 解构时用默认值：`const { state = false, message = '' } = await request(...)`
- ref 初始值用 **明确类型**（不要 `ref()` 不带值）：`ref('')` / `ref(0)` / `ref([])` / `ref(null)`

✓ 检验句：你新增的代码里**没有** `ref()` 不带初始值的写法才算过。

---

## R7 · 错误处理

- `Utils.requestAxios` 用 try/catch 包裹（见 `references/docs/frontpage.md` 删除示例）
- 用 `EMessage({ type: 'error', message: '...' })` 提示用户
- **禁止**直接 `console.error()` 不告诉用户（用户看不到 console）

✓ 检验句：所有 `await request*` / `await Utils.requestAxios` 都被 try/catch 或 `.catch()` 包了。

---

## R8 · 命名约定

| 对象 | 约定 | 示例 |
| --- | --- | --- |
| 组件文件 | kebab-case `.vue` | `list-page.vue` / `add-dialog.vue` |
| 组件名 (defineOptions) | PascalCase | `name: 'ListPage'` |
| 数据模型字段 | camelCase | `gridList` / `searchParams` / `treeData` |
| event 名 | kebab-case | `@advance-search` / `@row-click` |
| 路由 path | kebab-case | `/bid-mgmt/list` |

✓ 检验句：你新增的命名能在以上表里找到对应规则才算过。

---

## R9 · v-for 必须有 :key

- v-for 必须配 `:key="item.id"` 或 `:key="item.value"`，**禁止**用 `:key="index"`（除非数据完全静态）
- 在 ep-data-grid 里，**避免**手动渲染行 .vue（用 columns 配置，不要用 `<template #bodyCell>` 套整行）

✓ 检验句：grep 搜 `:key="index"` 没有命中才算过。

---

## R10 · 不要凭其他 UI 框架经验

| 易混淆点 | F10 写法 | 不能用 |
| --- | --- | --- |
| 标签类型 | `<e-tag type="info">`（仅 success/info/warning/danger/''） | ❌ `type="primary"`（Element 写法） |
| 弹窗 | `$dialog` API + 独立 .vue | ❌ `<el-dialog v-model:visible>`（Element 写法） |
| 表格分页 | `:current` + `:page-size` | ❌ `:current-page`（Element 写法） |
| 消息提示 | `EMessage({ message, type })` | ❌ `this.$message(...)`（Vue2 / Element） |

✓ 检验句：使用任何组件属性前先查 `references/docs/components/components-<name>.md` 确认有效值才算过。

---

_违反任何一条 → 跑 `workflows/update-rules.md` 闭环（是规则缺失？还是被 Agent 忽略了？）_
