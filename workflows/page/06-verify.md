# page/06-verify · 浏览器验证

> **目的**：把生成的页面在浏览器里**实际打开**，确认能跑、看起来对、功能正常。
> 这是任务"完成"的最终判定，**不验证 = 不算完成**。

---

## Step 1 · 启动 dev server（如果没启动）

启动前先确认 `page/07-api-doc.md` 已完成：

- [ ] `api_doc_generated.markdown` 存在
- [ ] `api_doc_generated.json` 存在
- [ ] `api_doc_generated.interface_count` 与 `generated_urls` 对齐

### 模式 A · examples 包内

```sh
# 在仓库根
pnpm -C packages/examples run dev
# 或主 web-show:
pnpm dev
```

### 模式 B · 新工程

```sh
pnpm -C <webApp 路径> run dev
```

启动期间观察输出：

| 输出关键字 | 含义 | 处理 |
| --- | --- | --- |
| `ready in <ms>` | 启动成功 | 进 Step 2 |
| `Port 3000 is in use` | 端口冲突 | 给用户选择：杀进程 / 改端口 |
| `Cannot find module 'xxx'` | 缺依赖 | 跑 `pnpm install` |
| `Mock server started` | mock 接管成功 | OK |

**Agent 注意**：dev server 是**长时运行**进程，必须用 `Blocking: false` + `WaitMsBeforeAsync: 5000` 启动，5 秒后转后台继续。

---

## Step 2 · 用浏览器预览（browser_preview 工具）

调用 `browser_preview`：

```yaml
Url: http://localhost:<端口>/#/<module>/<appName>
Name: <appName 中文化> 预览
```

端口约定：
- examples 默认 5174 / 5175 / 5176（按启动时实际输出）
- web-show 默认 5173

如果是 hash 路由（`createWebHashHistory`）→ URL 用 `#/...`
如果是 history 路由 → 直接 `/...`

---

## Step 3 · 6 项基础体检（看截图判断）

打开浏览器后，**逐项检查**：

| # | 检查项 | 通过标准 |
| --- | --- | --- |
| 1 | 页面整体布局 | `ep-layout-manager` 五区块（top/left/main/right/bottom）按 intent 显示 |
| 2 | 工具栏 | 标题 / 按钮 / 搜索都看到 |
| 3 | 表格 | 有数据（来自 mock）+ 列名对得上 |
| 4 | 树（如果有） | 节点出来了 + 文本不是空 |
| 5 | 弹窗（如果有） | 点新增按钮 → 弹窗弹出 + 表单看到 |
| 6 | 控制台（F12） | 没有 ❌ Vue warn / 红色 error |

如果**任一项 fail** → 回头修，**别说"完成了"**。

---

## Step 4 · 6 项功能体检（手动操作 / 描述步骤）

如果 Agent 不能直接操作浏览器，**写出操作步骤**让用户测：

```
请你在浏览器里依次操作并告诉我结果：

1. 表格能看到 5+ 条数据吗？
2. 切换分页能用吗？
3. 搜索框输入"测试"，能筛选吗？
4. 点"新增"，弹窗能弹吗？必填字段验证生效吗？
5. 点表格第一行"详情"，能看到详情吗？
6. 点"删除"，确认后表格能刷新吗？

任意一项失败请告诉我具体现象（截图最好）。
```

---

## Step 5 · 控制台错误专项

打开 F12 / DevTools，看：

| 错误类型 | 含义 | 处理 |
| --- | --- | --- |
| `[Vue warn]: Failed to resolve component: ep-data-grid` | 组件没 import | 回去加 `import { EpDataGrid } from '@epframe/eui-core'` |
| `[Vue warn]: Invalid prop: type` | prop 值错 | 回去查文档允许的枚举 |
| `404 /api/...` | mock 没注册或 URL 不对 | 回去对 04-mock.md 检查 |
| `Network Error` | dev server 挂了 | 重启 |
| 红色 stack trace | 业务报错 | 给用户看具体 trace 决定 |

---

## Step 6 · 截图（推荐）

如果工具支持（chrome-devtools-mcp / browser_preview 提示截图），**保存一张截图**作为完成证据：

- 路径：`epoint-f10code-gen/.demo-screenshots/<appName>-<timestamp>.png`
- 命名：`<appName>-list.png` / `<appName>-add-dialog.png`
- 用途：将来 drift 检查 / 用户回看

如果不能截图 → 让用户截一张发给你确认（B 档协作）。

---

## 输出契约

```yaml
verification_result:
  dev_server_started: <bool>
  url_accessed: <string>
  basic_checks:
    layout_ok: <bool>
    toolbar_ok: <bool>
    grid_ok: <bool>
    tree_ok: <bool>            # null 如果没有树
    dialog_ok: <bool>          # null 如果没有弹窗
    console_clean: <bool>
  functional_checks_user_confirmed: <bool>   # 用户确认了 6 项功能体检
  screenshot_path: <string | null>
  issues_found: [<string>]      # 列举发现的问题
```

---

## ✓ 检验句（任务完成的最终标志）

- [ ] 浏览器能打开页面（不是 404 / blank）
- [ ] 接口文档 Markdown + JSON 已生成
- [ ] 6 项基础体检**全过**
- [ ] 控制台**无红色 error**
- [ ] 用户**已确认**功能可用（B 档场景）
- [ ] **任一**没过 → 不算完成，回头修

---

## Red Flags

| 信号 | 处理 |
| --- | --- |
| Agent 说"代码生成完成"但**没启动 dev server** | STOP，必须启动 + 验证 |
| Agent 截图显示页面空白 / 报错但说"OK" | STOP，纠正后再确认 |
| 用户说"看起来不对，但我懒得描述具体问题" | 给 6 项功能体检 checklist 让用户逐条勾 |
| 30 秒还没浏览器输出 | 报当前状态："dev server 启动中，预计还要 X 秒" |

---

## 完成后必跑：闭环

任务"看起来"完成后，**强制跑** `workflows/update-rules.md` 的 30 秒 4 问 AAR：

1. 这次任务**漏了什么规则**？
2. **哪条规则被忽略了**？
3. **新发现的坑**有没有？
4. **下一次同类任务**怎么改进？

不跑 = 任务没完成（违反 SKILL.md Red Flags 第 5 条）。

---

_步骤 6 完成 → 跑 `update-rules.md` 闭环 → 任务真正结束。_
