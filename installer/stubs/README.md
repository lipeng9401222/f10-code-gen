# installer/stubs/ · IDE 入口模板

本目录存放 3 份 IDE 入口模板，**仅在 `npx epoint-f10code-gen init` 安装时使用**。

> **如果你是最终用户**：你不需要看本目录，直接跑 `npx epoint-f10code-gen init` 即可。
> **如果你是 skill 维护者**：本 README 解释这 3 份模板的设计与维护规则。

---

## 这是什么

每个 IDE（Cursor / Claude Code / Windsurf）都需要一个**自己格式**的入口文件来识别 skill：

- 文件位置不同：`.cursor/skills/.../SKILL.md` vs `.claude/skills/.../SKILL.md` vs `.windsurf/rules/<name>.md`
- frontmatter 协议不同：Cursor / Claude 用 Anthropic 风格，Windsurf 用 `trigger: model_decision`

所以**不可能用一份文件搞定三家**，必须各自有一个入口文件。这 3 份"入口文件"作用一致：**让 IDE 识别 skill + 把 IDE 导航到主体 `epoint-f10code-gen/SKILL.md`**。

本目录就是这 3 份入口文件的**模板**。`npx ... init` 时按用户工程的实际情况生成。

---

## 三份模板 → 三个安装位置

| 模板 | 用户工程的安装位置 | IDE |
| --- | --- | --- |
| `cursor-skill.md` | `<user-project>/.cursor/skills/epoint-f10code-gen/SKILL.md` | Cursor |
| `claude-skill.md` | `<user-project>/.claude/skills/epoint-f10code-gen/SKILL.md` | Claude Code |
| `windsurf-rule.md` | `<user-project>/.windsurf/rules/epoint-f10code-gen.md` | Windsurf |

`init` 命令默认**自动检测**：只为用户工程下已存在的 `.cursor/.claude/.windsurf/` 目录安装对应入口。

---

## 用户怎么用（最终用户视角）

```bash
# 默认：自动检测用户工程下已有的 IDE 目录，只为存在的安装
npx epoint-f10code-gen init

# 强制三个 IDE 都安装
npx epoint-f10code-gen init --ide all

# 只为 Cursor 装
npx epoint-f10code-gen init --ide cursor

# 看会做什么，但不真写
npx epoint-f10code-gen init --dry-run

# 升级（npm install <pkg>@latest 之后跑这个同步主体）
npx epoint-f10code-gen update
```

---

## 维护规则（skill 作者视角）

1. **改入口模板** → **只能改本目录**下的三个 .md
2. **三份 body 字段必须一致**，只有 frontmatter 适配不同 IDE 协议
3. **改完跑校验**：

   ```bash
   node epoint-f10code-gen/bin/cli.mjs check
   ```

4. **发布新版本**：跑 `npm publish`（或 nexus 私有源），老用户跑 `npx epoint-f10code-gen update` 同步主体。
5. **本目录变动也要走 AAR 闭环**：`workflows/update-rules.md`。

---

## 为什么不直接 symlink

- **Windows 不友好**：symlink 在 Windows 行为不一致
- **frontmatter 必须差异**：硬链接做不到三家协议差异
- **要进 npm tarball**：分发用 npx 时必须是普通文件，symlink 在 tarball 里语义混乱

所以**三份独立文件 + CLI 生成**是最稳的方案。

---

_本目录变更走 `workflows/update-rules.md`。_
