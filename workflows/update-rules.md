# update-rules · ★ skill 自维护中枢（AAR + Rationalizations + Red Flags + 记录位置判断表）

> **每个任务结束**必跑 30 秒 4 问。**所有规则修改 / 新坑点沉淀**也走本文件。
> 本文件合并了"如何写一个好的 skill.md" § 5（AAR）+ § 8（Rationalizations）+ § 9（Red Flags）+ § 17（记录位置）。

---

## 一、Task Closure Protocol（30 秒 4 问 AAR）

### 何时跑

任务"看起来"完成时（页面生成完毕 / bug 修好 / 用户表示满意）**强制**跑。

**禁止**省略，理由："如何写一个好的 skill.md" § 5：
> 任务结束没跑 update-rules.md 的 AAR → STOP，必须跑完 30 秒 4 问才算真完成

### 4 问

#### Q1. 这次任务漏了什么规则？

逐项扫描：
- [ ] `rules/project-rules.md` R1~R11 都被尊重了吗？
- [ ] `rules/data-model-rules.md` 表格 / 树 / 下拉**都用 defineDataModel** 了吗？
- [ ] `rules/component-usage-rules.md` 弹窗都用 `$dialog` API 了吗？没用内联 `<e-dialog>` 吗？
- [ ] `rules/coding-standards.md` 用 `<script setup>` 了吗？import 在顶部了吗？
- [ ] `rules/style-rules.md` Flex 容器配 `min-h-0` 了吗？

如果**有**违反 → 写下来：
```
违规清单：
1. [文件:行] 用了 ref([]) + requestAxios 直连接口（违反 data-model-rules.md R1）
2. ...
```

#### Q2. 哪条规则被忽略了 / 不够醒目？

如果发现 Q1 中的违规是因为"规则没看到 / 看到没听 / 太晚看到"：

| 现象 | 可能原因 | 处置 |
| --- | --- | --- |
| 我"知道"规则但没遵守 | Auto-Triggers 没触发 | 在 SKILL.md frontmatter 加触发短语 |
| 我没读到这条规则 | rules/ 文件结构混乱 | 把这条上浮到 SKILL.md "Always Read" 段 |
| 这条规则在 references 里太深 | 应该在 rules/ | 上浮 |
| 规则原文太抽象 | 缺 ✓ 检验句 | 补 ✓ 检验句 |

#### Q3. 新发现的坑有没有？

判断**是不是真坑**（"如何写一个好的 skill.md" § 17 三条门槛）：

| 门槛 | 含义 |
| --- | --- |
| ① 可重复 | 下次同类任务**还会**遇到 |
| ② 代价高 | 调试 ≥30 分钟 / 出现在生产 / 影响用户体验 |
| ③ 代码不可见 | 看代码看不出问题（必须有上下文 / 时序 / 配置） |

**至少满足 2/3** 才算真坑，进 `references/gotchas.md`。

否则 → 不要写（违反 ANTI-TEMPLATES.md "凭空想坑点"）。

#### Q4. 下一次同类任务怎么改进？

写一句**可执行**的改进：

```
✗ 模糊："以后注意不要直连接口"
✓ 具体："page/03-generate.md Step 6 自检清单加一条：grep `requestAxios.*list|tree|options` 没匹配才算过"
```

### 输出

每个任务结束输出：

```
🔄 Task Closure Protocol（30 秒 AAR）

Q1. 漏了什么规则：（无 / 列举）
Q2. 哪条规则被忽略：（无 / 描述）
Q3. 新坑：（无 / 写到 gotchas.md）
Q4. 改进：（无 / 具体行动项）

更新清单：
- [ ] gotchas.md 加入 #15 "Tab 内表格 lazy 配错"
- [ ] page/04-mock.md 加 ✓ 检验句"业务中间件只拦截 /api/<module>/ 且 parseBody 兼容 form-encoded"
```

如果 4 问全部"无" → 一句话也行：`AAR：本次无新发现，规则全遵守`。

---

## 二、Rationalizations 借口表（自我识别）

> 来源："如何写一个好的 skill.md" § 8。
> **自己骗自己的话** —— 当 Agent 想跳过流程时**最容易冒出来的 6 句**。看到这些**立即停下**。

| 借口 | 真实含义 | 应对 |
| --- | --- | --- |
| "这个简单不用读 SKILL.md" | 我懒得再读 | 必读，stale memory 是 80% 错误的根源 |
| "用户没说要这条规则我就不管了" | 我想偷懒 | 用户**默认期望**你按规则来，没说 ≠ 不要 |
| "这次特殊，下次再补规则" | 我想破例 | 规则破一次就破第二次，**不允许** |
| "改起来麻烦先 work around" | 我想绕过 | 根因 > 症状，先解决根因 |
| "AAR 太烦每次跑很慢" | 我想省时间 | AAR 防止下次重复犯错，省的更多 |
| "用户没问就不主动汇报" | 我怕烦 | 30 秒不汇报 = 用户开始焦虑 = 用户体验差 |

> **新增借口**：每次发现新的"自欺话"，更新到本表（**只能从真实失败抄**，不能凭空扩写）。

### 已沉淀（来自真实失败）

_（v0.1.0 暂未沉淀，等真实任务后补充）_

---

## 三、Red Flags STOP（违反任意一条立即停下）

> 这些是 SKILL.md 已声明的**最高优先级**信号。本文件作为路由把它们指回 SKILL.md frontmatter 中的 `red-flags-stop`。

### 全局 Red Flags

1. 用户问 F9 / packages/f9 / fui 老框架问题 → 立即停下
2. 用户要求内联 `<e-dialog v-model:visible>` 写业务弹窗 → STOP
3. 用户要求 `ref([])` + `Utils.requestAxios` 给表格 → STOP
4. 30 秒内没给用户输出还在等 → STOP，先报状态
5. 任务结束没跑 AAR → STOP

### 规则相关 Red Flags

| 信号 | 触发的规则 | 处置 |
| --- | --- | --- |
| `getoptions` / `gettypeOptions` 接口配 `method: 'get'` | data-model-rules.md R2 | STOP，改 post |
| 弹窗 .vue 没有 `inject('getCurrentDialog')` | component-usage-rules.md R5 | STOP，加 inject |
| `<div class="flex-1">` 包 `<ep-data-grid>` 没配 `min-h-0` | style-rules.md R3 | STOP，加 min-h-0 |
| 树 mock 用了 `id`/`text` 不是 `value`/`label` | data-model-rules.md R3 | STOP，改字段 |

---

## 四、记录位置判断表

> 来源："如何写一个好的 skill.md" § 17。
> **不同内容应该放不同位置**，混淆 = skill 漂移。

| 内容类型 | 目标位置 | 例子 |
| --- | --- | --- |
| 稳定约束 / 通用原则 | `rules/` | "表格必须用 useTableModel" |
| 陷阱 / 架构笔记 / 生命周期坑 | `references/gotchas.md` | "Tab 内表格 lazy: false 时只默认 Tab 高度对" |
| 有序步骤 / 完成检查清单 | `workflows/*.md` | "环境体检 5 项" / "page 生成 6 步" |
| 浏览参考资料 | `references/docs/` 或 `references/examples-index.md` | 198 篇 .md / 1352 个 .vue 索引 |
| 会话历史 / 调试过程 | **不要写进 skill** | 用 git commit + CHANGELOG.md 替代 |
| 偶发用户偏好 | **不要写进 skill** | 团队级决策放 `.epoint-skill-preferences.json` |

### 错误归属示例

❌ 把"今天调了 30 分钟才发现 webpack 缓存的事"写到 `references/2026-04-14-session-notes.md`
- 错位：会话日志 ≠ 规则
- 正确：把根因抽出来写到 `references/gotchas.md`，然后 git commit

❌ 把"我们团队约定 commit 用 feat/fix"写到 `references/conventions.md`
- 错位：本仓库已有 CLAUDE.md 写过
- 正确：在 `rules/project-rules.md` R5 引用项目根 CLAUDE.md，不重复

---

## 五、规则的"新增 / 修改 / 删除"流程

### 新增（添加新规则）

1. **先搜索**：grep 该主题在 `rules/` / `references/` 是否已有 → **避免重复**
2. **判断位置**：用第四节"记录位置判断表"
3. **写规则**：必须包含
   - 一句话原则
   - 1 个具体例子（正确写法）
   - 1 个反例（错误写法 + 错在哪）
   - **✓ 检验句**（这条原则后面）
4. **测试**：在下个真实任务里跑一遍，确认不冲突
5. 跑 `scripts/smoke-test.mjs` 确保 SKILL.md / 路由没破

### 修改（更新已存在规则）

1. **不需要门槛**（过时规则比缺失规则更有害）
2. 但要**记录原因**：在 CHANGELOG.md 写"v0.1.x: 修改 R3，原因 xxx"

### 删除（清退规则）

| 触发 | 处置 |
| --- | --- |
| 相关技术已移除 | 直接删 |
| 正在迁移中 | 加作用域标注（"仅适用于 9.5.x"） |
| 不确定还有没有用 | 加 `<!-- DEPRECATED -->` 注释保留 1 个迭代周期再删 |

---

## 六、漂移检查（季度任务）

### Drift 检查清单

详见 `ANTI-TEMPLATES.md` § Drift Log。

### 自动化检查

```sh
# 跑 smoke-test 检查 skill 自身完整性
node epoint-f10code-gen/scripts/smoke-test.mjs

# 检查最近生成的 .vue 是否合规
node epoint-f10code-gen/scripts/validate-page.mjs <最近生成的 .vue 路径>
```

---

## ✓ 检验句（本 workflow 自身）

- [ ] 任务结束**强制**跑 30 秒 AAR
- [ ] AAR 4 问**逐条回答**（不允许"无"应付，要么真无要么列举）
- [ ] 新坑点**先过 2/3 门槛**才进 gotchas.md
- [ ] 新增 / 修改的规则跑过 smoke-test 才合入
- [ ] 重大修改在 CHANGELOG.md 记录

---

_skill 自维护的总入口。所有"我想改 skill"都从这里开始。_
