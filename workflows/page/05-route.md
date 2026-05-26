# page/05-route · 路由配置

> **目的**：把生成的页面注册到 web 工程的路由表，让浏览器能通过 URL 访问。

---

## 决策树

```
routeMode == ?
  ├─ static  → 在 router/routes.js 里加一条（默认）
  └─ dynamic → P0 不支持，提示用户用静态路由代替（或手动接后端菜单）
```

---

## 模式 A · 静态路由（默认）

### Step 1 · 定位 routes 文件

| 模式 | 文件位置 |
| --- | --- |
| **examples 包内零成本演示** | `packages/examples/src/router/routes.js` |
| **新建的 web 工程** | `<webApp>/src/router/routes.js` |

如果文件不存在：先 `ls packages/<workspace>/src/router/` 找实际文件名（可能是 `index.js` / `routes.ts`）。

### Step 2 · 添加路由记录

打开 `routes.js`（或对应文件），在合适位置加：

```js
// packages/examples/src/router/routes.js（示例）
{
  path: '/<module>/<appName>',
  name: '<AppName>List',
  component: () => import('@/views/demo/page/<module>/<appName>/<appName>-list.vue'),
  meta: {
    title: '<intent.appName 中文化>',
    keepAlive: true
  }
}
```

#### 路径约定

| 字段 | 取值 |
| --- | --- |
| `path` | `/<module>/<appName>` 全小写连字符 |
| `name` | `<AppName>List` PascalCase（与 .vue 的 `defineOptions({ name })` 一致） |
| `component` | `() => import('@/views/demo/page/<module>/<appName>/<appName>-list.vue')` 用 `@` alias |
| `meta.title` | 中文标题（用于面包屑 / 标签页） |
| `meta.keepAlive` | 默认 `true`（列表页切回保留状态） |

#### 弹窗页面**不需要**注册路由

弹窗通过 `$dialog` API 动态加载，不出现在 URL 中。

### Step 3 · 检查 menu 配置（如果有）

如果 web 工程使用 menu.json / sidebar 配置（如 `packages/examples/src/config.js` 之类）：

```js
// 检查是否需要在菜单里加入口
{
  title: '<intent.appName 中文化>',
  path: '/<module>/<appName>',
  icon: 'Folder'  // 用前查 components-icon.md
}
```

如果没有 menu 配置 → 直接用 URL 访问即可。

---

## 模式 B · 动态路由（P0 不支持）

P0 不实现，输出提示：

```
你选了 dynamic 路由模式，但本 skill v0.1.0 不支持自动生成动态路由代码（需要后端推送菜单 + 前端 addRoute 拉起）。

替代方案：
1. 临时用 static 路由跑通页面 → 后续手动改造
2. 等 P1 版本支持

参考：references/docs/getting-started/getting-started-create-web-project.md § 路由部分
```

---

## Step 4 · alias 检查

确保 `vite.config.js` 已配置 `@` alias：

```js
// vite.config.js
import { fileURLToPath, URL } from 'node:url';

export default {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};
```

如果没有 → 提示用户加（或手动用相对路径 `import('../views/...')`）。

---

## Step 5 · 路由 lazy load 检查

**强制使用** `() => import(...)`（懒加载），**不要**：

```js
// ❌ 错误：直接 import，破坏代码分割
import MyPage from '@/views/.../my-page.vue';
{ path: '/my', component: MyPage }
```

---

## Step 6 · 验证路由生效（不启动服务）

读 routes.js 确认：
- 新加的路由 `path` 唯一（grep 一下不能有重复）
- `component` 路径文件真实存在 (`ls -la <path>`)

如果有重复 path → STOP，告知用户冲突。

---

## 输出契约

```yaml
route_added:
  file: <routes.js 绝对路径>
  entry:
    path: <string>
    name: <string>
    component_path: <string>
    keepAlive: <bool>
menu_updated: <bool>      # 是否更新了 menu 配置
warnings: [<string>]       # 比如"alias 不存在用了相对路径"
```

---

## ✓ 检验句

- [ ] `path` 在 routes.js 内**唯一**
- [ ] `component` 指向的 .vue 文件**真实存在**（用 `ls` 或 `read_file` 验证）
- [ ] `name` 与 .vue 的 `defineOptions.name` 一致
- [ ] 用了 lazy import (`() => import(...)`)
- [ ] 弹窗 .vue 文件**没有**单独路由（违反约定）

---

## Red Flags

| 信号 | 处理 |
| --- | --- |
| routes.js 不存在 | STOP，告知用户工程目录结构异常，需要核实 |
| 用户要求"动态路由" | P0 不支持，引导改 static |
| path 已经存在 | STOP，让用户确认是否覆盖 |
| 用户要求"路径用大写"如 `/BidMgmt` | 拒绝，URL 应小写 + 连字符（前端约定） |

---

_步骤 5 完成 → 进 `06-verify.md`。_
