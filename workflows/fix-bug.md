# fix-bug · 修 bug 流程

> **目的**：用户报告 F10 页面 bug 时的标准处置流程。原则：**先查已知坑点 → 不行再走根因**。

---

## 触发关键字

用户的话里出现：
- "报错" / "bug" / "不工作" / "异常"
- "页面打不开" / "白屏" / "loading 不停"
- "Failed to resolve component" / `[Vue warn]`
- "高度跳动" / "样式错乱" / "组件未注册"

---

## Step 1 · 重读 SKILL.md（强制）

不论是否"记得"，先读：
- `epoint-f10code-gen/SKILL.md`
- `epoint-f10code-gen/rules/data-model-rules.md`
- `epoint-f10code-gen/rules/component-usage-rules.md`
- `epoint-f10code-gen/rules/style-rules.md`

避免 stale memory 误诊。

---

## Step 2 · 先查 `references/gotchas.md`

**第一件事**：用关键字搜 `references/gotchas.md`。

```
用户："Tab 切换后表格高度不对"
你：grep "Tab" references/gotchas.md
→ 命中 G003 "Tab 内表格 lazy 与高度问题"
→ 直接给该坑点的解决方案
→ AAR 时记录"复用了 G003"（更新坑点频率）
```

如果**命中** → 跳到 Step 5（直接用解决方案）。

---

## Step 3 · 复现（命中失败时走这里）

向用户索取**最小复现条件**：

```
请告诉我：

1. 报错位置（哪个文件 / 哪一行 / 操作步骤）
2. 报错原文（完整 trace 或 console 截图）
3. 你最近改了什么（如果是新出的）
4. 浏览器 / Node 版本
5. 一段最小复现代码（如果可以）
```

不索取 = 凭猜测修 = 大概率不对。

---

## Step 4 · 根因分析

按以下分类逐一排除：

### 分类 A · 数据相关（看到 ref / 接口 / 数据流时）

可能性：
1. 表格 / 树 / 下拉**没用 defineDataModel**（违反 data-model-rules.md R1）
2. mock 接口 method 是 `'get'` 但模型要 post（违反 R2）
3. 树字段不是 `value` / `label`（违反 R3）
4. mock 返回格式不对（违反 R4）
5. params 不是 `computed`（违反 R7）
6. Dashboard / 看板模板引用 `model.global`，但 script 没有 `defineDataModel`（违反 R11）

### 分类 B · 组件相关（看到 [Vue warn] 时）

可能性：
1. 组件没 import（`Failed to resolve component: ep-data-grid` → 加 `import { EpDataGrid }`）
2. prop 值越界（`Invalid prop: type` → 查文档允许枚举）
3. 错用了其他 UI 框架属性（`type="primary"` 给 `e-tag` → 改 `info`）

### 分类 C · 样式相关（看到布局错乱时）

可能性：
1. Flex 容器没配 `min-h-0` → 表格高度跳动
2. 表格弹窗没配 `box-border` → 表格抖动
3. 用 `!important` 强制覆盖框架样式 → 维护噩梦

### 分类 D · 弹窗相关（看到弹窗不弹 / 关不掉时）

可能性：
1. 用了内联 `<e-dialog v-model:visible>` 而不是 `$dialog` API
2. 弹窗内没 `inject('getCurrentDialog')` 关闭
3. 弹窗 prop 通过 `<DetailDialog v-model:visible>` 传而不是 `h(...)` 第二参数

### 分类 E · 框架配置相关（看到全局错时）

可能性：
1. 业务 mock 全前缀拦截，误拦 `/resourceaction/*` / `/auth/*` / `/themedataaction/*` 等框架端点
2. 路由 alias `@` 不存在（vite.config.js 缺 resolve.alias）
3. 私有源没切对 / 没登录（pnpm install 报 404）
4. 业务 mock 请求体只按 JSON 解析，遇到 form-encoded 的 `viewstate=...&params=...` 报错

---

## Step 5 · 给解决方案

格式：

```
### 根因
<一两句话讲清楚问题>

### 修复
<具体改哪几行 / 加什么 import>

### 为什么以前没出
<时序 / 配置 / 上下文，让用户理解"不只是改这次">

### 防退化
<如何验证修好了 + 加什么 ✓ 检验句到 rules 里>
```

例子：

```
### 根因
你的 useTableModel 配了 `lazy: false`，但表格在 e-tabs 的非默认 Tab 内。
display: none 状态下 ep-data-grid 拿不到容器高度，--table-height 计算错。

### 修复
[contract.vue:25] 把 lazy: false 改为 lazy: true
[contract.vue:38] onTabChange 增加：
  if (model.gridList.data.length === 0) model.gridList.refresh();

### 为什么以前没出
默认 Tab 是可见的，所以默认 Tab 的表格 lazy: false 没问题。问题在非默认 Tab。

### 防退化
1. 给本 fix 加截图到 .demo-screenshots/contract-tab-fix.png
2. references/gotchas.md G003 已有该坑点，本次复用 + 更新频率

### AAR
回到 update-rules.md 跑 30 秒 AAR。
```

---

## Step 6 · 沉淀坑点

如果**新发现的坑**满足 2/3 门槛（可重复 / 代价高 / 代码不可见）：

→ 加到 `references/gotchas.md`：

```markdown
### G0XX · <一句话标题>

#### 现象
（用户能看见的症状）

#### 根因
（为什么）

#### 修复
（怎么改）

#### 关键代码
```vue
<!-- 关键的几行 -->
```

#### 来源
- 任务：<日期 + 任务描述>
- 关联文档：<rules / 其他 gotchas>
```

---

## Step 7 · 必跑 AAR

修完后回到 `workflows/update-rules.md` 跑 30 秒 4 问。

**禁止**："修好了" → 立即结束（违反 SKILL.md Red Flags 第 5 条）。

---

## ✓ 检验句

- [ ] 已查 `references/gotchas.md`
- [ ] 复现条件齐全（用户报告 + 你的复现）
- [ ] 根因清晰（不只是症状）
- [ ] 修复可验证（用户能跑一下确认）
- [ ] 沉淀决策（坑点是不是真坑，要不要进 gotchas.md）
- [ ] AAR 跑了

---

## Red Flags

| 信号 | 处置 |
| --- | --- |
| 没查 gotchas.md 直接改代码 | STOP，回去查 |
| 没复现就改 | STOP，索取复现条件 |
| 改了但用户不能验证 | STOP，让用户跑一下 |
| "我猜可能是 xxx" | STOP，**确认**根因再改 |
| 修了但没跑 AAR | STOP，回去跑 |

---

_本 workflow 是 SKILL.md "Common Tasks 路由表" § B 的具体实现。_
