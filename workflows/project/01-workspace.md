---
phase: project
step: 1-workspace
delegation: B  # 创建 monorepo 通常要交互（选产线/项目名）
---

# project/01-workspace · 创建 pnpm workspace（仅分支 C）

> **B 档**：`eui-cli ws` 会进入交互模式，需要用户在终端选择。

---

## 何时跑

- 当前是分支 C（全新地方）
- 用户明确说"我要从 0 建 monorepo"

---

## 命令

```sh
eui-cli workspace
# 或别名
eui-cli ws
```

来源：`vue-docs/getting-started/getting-started-development-environment.md` § 创建 workspace 工作区。

---

## 交互流程

eui-cli ws 会**在用户终端**问几个问题：

```
1. 工作区目录：./<workspace-name>
2. 是否使用 TypeScript? Y/N
3. 是否包含 docs 子项目? Y/N
```

**你的角色**：
1. 把命令告诉用户
2. 让用户**自己跑** + **自己回答**
3. 等用户回来报告"建好了"

---

## 完成后会生成

```
<workspace-name>/
├── package.json            # 根包，定义 workspaces
├── pnpm-workspace.yaml     # 工作空间配置
└── packages/               # 子包目录（空，待 02-web.md 填充）
```

---

## ✓ 检验句

- [ ] 用户报告"建好了"
- [ ] 检查 `<workspace-name>/pnpm-workspace.yaml` 文件存在
- [ ] 检查 `<workspace-name>/package.json` 含 `"workspaces": [...]` 字段（或 `"name"` + workspace 引用）

---

## 备注：`eui-cli init` 一步到位

如果用户希望"一键建工作区 + web 模板"：

```sh
eui-cli init
```

会同时建 monorepo + 第一个 web 模板（在 `packages/<name>` 下）。可以**跳过 02-web.md**。

---

_完成 → 跳到 `02-web.md` 或直接 `04-register.md`（如果用了 init）。_
