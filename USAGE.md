# USAGE · 最终用户安装指南

> 给**首次接触 epoint-f10code-gen 的开发者**。装上 + 跑起来不超过 1 分钟。

---

## 一行命令安装

在你的 F10 项目根目录跑：

```bash
npx epoint-f10code-gen init
```

完事。

---

## 这一条命令做了什么

| 步骤 | 动作 |
| --- | --- |
| 1 | 检测你项目下有哪些 IDE 目录（`.cursor` / `.claude` / `.windsurf`） |
| 2 | 把 skill 主体复制到 `<你的项目>/epoint-f10code-gen/`（已有同名目录会自动备份为 `*.bak.<timestamp>/`） |
| 3 | 为存在的 IDE 各生成一个入口文件（路标） |
| 4 | 完成。无需重启 IDE |

## 装完之后怎么用

打开 IDE 的聊天面板，直接说人话：

> "用 epoint-f10code-gen 帮我生成一个标段管理列表页，左边树+右边列表+三个弹窗。"

AI 会自动：
1. 检测环境（Node / pnpm / 私有源 / eui-cli），缺啥提示
2. 跟你做 6 字段对话（应用名 / 模块 / 接口模式 / ...）
3. 匹配最贴近的模板（从 113 个真实 .vue 案例库里挑）
4. 生成 .vue + mock + 路由
5. 浏览器打开预览 + 截图

---

## 常用命令

| 我想… | 命令 |
| --- | --- |
| 安装到当前项目 | `npx epoint-f10code-gen init` |
| 安装时只装 Cursor 的入口 | `npx epoint-f10code-gen init --ide cursor` |
| 安装到三个 IDE（无视检测） | `npx epoint-f10code-gen init --ide all` |
| 看 init 会做什么但不真的写 | `npx epoint-f10code-gen init --dry-run` |
| 检查已装的入口与本包是否一致 | `npx epoint-f10code-gen check` |
| 升级主体（不动入口） | `npx epoint-f10code-gen update` |
| 跑 skill 健康检查 | `npx epoint-f10code-gen smoke` |
| 校验你生成的 .vue 是否合规 | `npx epoint-f10code-gen validate <vue-file>` |
| 看帮助 | `npx epoint-f10code-gen --help` |

---

## 常见问答

### Q1: 我的项目里没有 `.cursor` / `.claude` / `.windsurf` 怎么办？

`init` 默认只为存在的 IDE 安装入口。如果三个都没有，它会**只复制主体不装入口**，并提示你：

```bash
# 显式强制安装到所有 3 个 IDE：
npx epoint-f10code-gen init --ide all

# 或单装某个：
npx epoint-f10code-gen init --ide windsurf
```

### Q2: 我已经装过一次了，主体可以升级吗？

可以：

```bash
# 拉最新版（会自动备份旧主体到 epoint-f10code-gen.bak.<时间戳>/）
npx epoint-f10code-gen@latest update
```

升级**不动**你项目下的 `.cursor/.claude/.windsurf` 入口文件，因为那些是"路标"，老的也能用。

### Q3: 我不小心改了主体里的某个文件，会被覆盖吗？

会。`init` / `update` 都会用最新版完整覆盖 `<你的项目>/epoint-f10code-gen/`（旧的自动备份）。

如果你**想长期保留自己的修改**，正确做法是：在你自己的工程里建一个独立目录（如 `<你的项目>/skills-custom/`）放自定义内容，让 SKILL.md 引用它，而不是直接改 skill 主体。

### Q4: 卸载怎么搞？

```bash
# 删主体
rm -rf epoint-f10code-gen

# 删入口（按你装了哪些 IDE 删）
rm -rf .cursor/skills/epoint-f10code-gen
rm -rf .claude/skills/epoint-f10code-gen
rm .windsurf/rules/epoint-f10code-gen.md
```

### Q5: 不通公网怎么办（私有 nexus）？

公司内网 nexus 一般也支持 npx。在 `.npmrc` 配好 registry 后直接：

```bash
npx --registry=https://nexus.your-company.com/.../ epoint-f10code-gen init
```

或者把 `.npmrc` 中的 registry 永久指向 nexus，npx 自动用。

### Q6: 装完之后 IDE 不识别 skill？

按这个清单检查：

1. **入口文件存在吗**：跑 `npx epoint-f10code-gen check`，看三个 IDE 的入口状态
2. **重启 IDE**：有些 IDE（特别是 Cursor）需要重启加载新 skill
3. **关键字测试**：在聊天里说 "ep-data-grid"、"defineDataModel"、"标段管理" 等关键字，应该触发 skill
4. **主体在不在**：`ls epoint-f10code-gen/SKILL.md`，应该能看到

---

## 想了解更多

| 主题 | 看 |
| --- | --- |
| skill 的设计哲学 | `epoint-f10code-gen/ANTI-TEMPLATES.md` |
| AI 怎么生成代码（流程） | `epoint-f10code-gen/SKILL.md` 与 `workflows/00-orchestrator.md` |
| F10 框架规则全集 | `epoint-f10code-gen/rules/` |
| 已知坑点 | `epoint-f10code-gen/references/gotchas.md` |
| 版本变更 | `epoint-f10code-gen/CHANGELOG.md` |

---

_如果安装时遇到 bug，请把 `npx epoint-f10code-gen smoke` 的完整输出和报错截图反馈给 skill 作者。_
