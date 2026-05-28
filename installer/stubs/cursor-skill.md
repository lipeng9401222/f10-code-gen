---
name: epoint-f10code-gen
description: epoint F10 / EUI Vue 页面代码生成 skill（Cursor 入口）。用于 F10 框架、EUI / EUI4.0 / EUI4、EUI Vue、eui-cli 相关任务。
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

- F10：`F10` / `F10 框架` / `epoint F10`
- EUI：`EUI` / `EUI4.0` / `EUI4` / `EUI Vue`
- CLI：`eui-cli`

组件、Hook、业务术语和模板路径不放在入口 metadata；触发后由主体 `SKILL.md` 的路由表处理。

---

## Red Flags STOP（违反立即停下）

| 信号 | 立即处理 |
| --- | --- |
| 用户问 F9 / packages/f9 / fui 老框架 | 告知超出 F10 范围，指向 `packages/f9/README.md` |
| 用户要求绕过 `defineDataModel` 直连接口 | 拒绝，指向 `epoint-f10code-gen/rules/data-model-rules.md` |
| 用户要求内联 `<e-dialog v-model:visible>` 写业务弹窗 | 拒绝，指向 `references/docs/dialog-interaction.md` § 5 |
| 30 秒还没给用户任何输出 | 立即报当前状态（"在跑 pnpm install"） |
| 任务"完成"了但没跑复盘 | 跑完 `workflows/update-rules.md` 30 秒 4 问复盘 |

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
