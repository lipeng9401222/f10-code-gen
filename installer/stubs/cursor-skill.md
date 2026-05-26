---
name: epoint-f10code-gen
description: epoint F10 Vue 页面代码生成 skill（Cursor 入口）。当用户提到 F10 / epoint Vue 框架 / 列表页 / 表单页 / 详情页 / ep-data-grid / ep-form / ep-layout-manager / 弹窗 / $dialog / defineDataModel / useTableModel / useTreeModel / useListModel / EpDataGrid / @epframe/eui-core / @epoint-fe/eui-components / eui-cli / 标段管理 / 采购 / 招投标列表 / vue-docs / page-examples / typical / mock 配置 / e-toolbar / e-tree / 主页面+树+三弹窗 / 新建工程 / pnpm 私有源 / nrm epoint 等关键字时必须激活。即使用户没说"F10"，看到 ep-* / e-* / @epframe / @epoint-fe 类标签或包名，都要立刻触发。
primary: true
---

# epoint-f10code-gen · Cursor IDE 入口

> **本文件只是路标**，真正的规则全在 `epoint-f10code-gen/SKILL.md`。
> 本文件由 `npx epoint-f10code-gen init` 生成，**不要手改**。

---

## 第一动作：强制读主体（不允许跳过）

无论用户怎么问，开始任何 F10 任务前：

1. **打开并完整读** `epoint-f10code-gen/SKILL.md`（哪怕你"记得"也要再读，避免 stale memory）
2. 按主体 SKILL.md § "Common Tasks 路由表" 匹配任务类型
3. 按路由读对应的 `rules/*.md` / `workflows/*.md` / `references/*.md`
4. 任务结束跑 `epoint-f10code-gen/workflows/update-rules.md` 的 AAR 30 秒 4 问

---

## Auto-Triggers 摘要（看到任一立即激活）

- 标签：`ep-data-grid` / `ep-layout-manager` / `ep-form` / `e-toolbar` / `e-tree` / `e-tabs`
- Hook：`defineDataModel` / `useTableModel` / `useTreeModel` / `useListModel`
- Import：`@epframe/eui-core` / `@epoint-fe/eui-components`
- CLI：`eui-cli ws` / `eui-cli web` / `eui-cli comp`
- 路径：`vue-docs` / `page-examples` / `typical`
- 业务术语："F10 列表页/表单页/详情页/弹窗"、"标段管理"、"主页面+树+三弹窗"

---

## Red Flags STOP（违反立即停下）

| 信号 | 立即处理 |
| --- | --- |
| 用户问 F9 / packages/f9 / fui 老框架 | 告知超出 F10 范围，指向 `packages/f9/README.md` |
| 用户要求绕过 `defineDataModel` 直连接口 | 拒绝，指向 `epoint-f10code-gen/rules/data-model-rules.md` |
| 用户要求内联 `<e-dialog v-model:visible>` 写业务弹窗 | 拒绝，指向 `references/docs/dialog-interaction.md` § 5 |
| 30 秒还没给用户任何输出 | 立即报当前状态（"在跑 pnpm install"） |
| 任务"完成"了但没跑 AAR | 必须跑完 `workflows/update-rules.md` 30 秒 4 问 |
| 看到 `vue-docs-for-ai-main` 想删 | STOP，那是 skill references 的源数据 |

---

## 主体路径速查

| 想做 | 直接读 |
| --- | --- |
| 生成新页面 | `epoint-f10code-gen/workflows/00-orchestrator.md` |
| 查规则 | `epoint-f10code-gen/rules/*.md` |
| 查文档 | `epoint-f10code-gen/references/docs-index.md` |
| 查模板 | `epoint-f10code-gen/references/examples-index.md` |
| 查坑点 | `epoint-f10code-gen/references/gotchas.md` |
| 修 bug | `epoint-f10code-gen/workflows/fix-bug.md` |
| 改规则 | `epoint-f10code-gen/workflows/update-rules.md` |

---

_本入口由 `epoint-f10code-gen/installer/stubs/cursor-skill.md` 模板生成，**不要直接改这里**。重新生成方式：`npx epoint-f10code-gen init` 或 `node epoint-f10code-gen/bin/cli.mjs init`。_
