# page/05-route · 路由配置（v0.3 · 写入组件工程 static.js）

> **目的**：把生成的页面注册到**组件工程**的路由表（不是 Web 工程），让浏览器能通过 URL 访问。
> **v0.3 升级**：
> 1. 文件名修正：**`static.js`**（之前误写为 `routes.js`）
> 2. 写入位置：**组件工程**的 `src/router/static.js`（之前误指 Web 工程）
> 3. 数据结构：写入 `MENU_ROUTES` / `ROOT_ROUTES` **数组**（之前误写为顶层 `export default`）
> 4. path 格式：**不带前导 `/`**（MENU_ROUTES 约定，由 F10 框架自动加挂载点前缀）

> **来源**：`references/docs/getting-started/getting-started-write-page.md` § "配置访问路由" + 当前仓库 `packages/examples/src/router/static.js` 实际写法验证。

---

## 决策树

```
routeMode == ?
  ├─ static  → 写入【组件工程】static.js 的 MENU_ROUTES 数组（默认）
  └─ dynamic → P0 不支持，提示用户用静态路由代替（或手动接后端菜单）
```

---

## 模式 A · 静态路由（默认）

### Step 1 · 定位 static.js 文件（v0.3 路径参数化）

路径**强制取自** `intent_resolved.target_route_file`：

```
target_route_file = <component_package>/src/router/static.js
```

如果文件不存在 → STOP，告知用户：组件工程缺 `src/router/static.js`，需要先用 `eui-cli comp` 生成或手动补一个骨架：

```js
// <component_package>/src/router/static.js 骨架
export const ROOT_ROUTES = [];
export const MENU_ROUTES = [];
```

### Step 2 · 选 ROOT_ROUTES 还是 MENU_ROUTES

| 数组 | 用途 | 路径要求 | `meta.needAuth` |
| --- | --- | --- | --- |
| `ROOT_ROUTES` | 根级页面，**无需授权**（如登录、忘记密码、机器码） | path **必须**以 `/` 开头 | `false` |
| `MENU_ROUTES` | 业务页面，被菜单/主题包裹 | path **不能**以 `/` 开头（由框架自动加挂载点前缀） | `true`（生产）/ `false`（开发） |

**绝大多数业务页面 → `MENU_ROUTES`**。

判定规则：
- `intent.pageType == 'list'` / `'form'` / `'detail'` → **MENU_ROUTES**
- `intent.appName` 含 `login` / `forgot` / `register` → ROOT_ROUTES
- 用户明说"无菜单页"/"游客页" → ROOT_ROUTES

### Step 3 · 追加路由记录（MENU_ROUTES 标准写法）

打开 `target_route_file`，往 `MENU_ROUTES` 数组**追加**一条：

```js
// <component_package>/src/router/static.js
export const MENU_ROUTES = [
  // ... 现有记录保持不变 ...

  // ↓↓↓ skill 新追加 ↓↓↓
  {
    path: '<module>/<appName>',                                       // ⚠️ 不带前导 /
    name: '<AppName>List',                                            // 与 .vue 的 defineOptions.name 一致
    component: () => import('@/views/<module>/<appName>/<appName>-list.vue'),
    meta: {
      title: '<intent.appName 中文化标题>',                            // 用于面包屑 / 标签页
      needAuth: false,                                                // 开发期 false，生产期 true
      keepAlive: true                                                 // 列表页切回保留状态
    }
  }
];
```

ROOT_ROUTES 标准写法（仅适用登录等无授权页）：

```js
export const ROOT_ROUTES = [
  {
    path: '/<module>/<appName>',                                      // ⚠️ 必须带前导 /
    name: '<AppName>',
    component: () => import('@/views/<module>/<appName>/<appName>.vue'),
    meta: {
      isLogin: false,
      needAuth: false
    }
  }
];
```

#### 字段约定（v0.3 修正）

| 字段 | 取值 | 注意 |
| --- | --- | --- |
| `path` | `<module>/<appName>` 全小写连字符 | **MENU_ROUTES 不带前导 `/`**；ROOT_ROUTES 带前导 `/` |
| `name` | `<AppName>List` PascalCase | 与 .vue 的 `defineOptions({ name })` 一致 |
| `component` | `() => import('@/views/<module>/<appName>/<appName>-list.vue')` | 用 `@` alias（每个组件工程 vite.config.js 已配 `@` → `./src`） |
| `meta.title` | 中文标题 | 用于面包屑 / 标签页 |
| `meta.needAuth` | 默认 `false`（开发期，方便直接访问） | 生产期改 `true` |
| `meta.keepAlive` | 默认 `true` | 列表页切回保留状态 |

#### 弹窗页面**不需要**注册路由

弹窗（`<appName>-add.vue` / `<appName>-edit.vue` / `<appName>-detail.vue`）通过 `$dialog` API 动态加载，不出现在 URL 中。

### Step 4 · alias 检查（组件工程的 vite.config.js）

确保**组件工程**的 `vite.config.js` 已配置 `@` alias：

```js
// <component_package>/vite.config.js（参考当前仓库 packages/examples/vite.config.js）
import path from 'path';
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
};
```

如果没有 → 提示用户加（或手动用相对路径 `import('../views/...')`）。

### Step 5 · 路由 lazy load 检查

**强制使用** `() => import(...)`（懒加载），**不要**：

```js
// ❌ 错误：直接 import，破坏代码分割
import MyPage from '@/views/.../my-page.vue';
{ path: '/my', component: MyPage }
```

### Step 6 · 验证路由生效

```sh
# 1. path 在 static.js 全部 ROOT_ROUTES + MENU_ROUTES 内唯一
grep -E "path:\s*['\"]<module>/<appName>['\"]" <target_route_file>
# 应只匹配 1 行（刚追加的）

# 2. component 指向的 .vue 文件真实存在
ls -la <component_package>/src/views/<module>/<appName>/<appName>-list.vue
```

如有重复 path → STOP，告知用户冲突。

### Step 7 · R11 合规校验（v0.3 新增）

```javascript
// 伪代码
function r11Check(intent, routeFile) {
  // 1. 路由文件必须在组件工程下
  assert(routeFile.startsWith(intent.component_package),
         `STOP: 路由文件 ${routeFile} 不在组件工程下，违反 R11`);

  // 2. 路由文件不能是 Web 工程的 static.js
  assert(!routeFile.startsWith(intent.web_package),
         `STOP: 路由文件指向 Web 工程，违反 R11`);

  // 3. component 路径用 @ alias，且解析后位于组件工程下
  const componentPath = path.resolve(intent.component_package, 'src', componentImportPath.replace('@/', ''));
  assert(componentPath.startsWith(intent.component_package),
         `STOP: 路由 component 指向了组件工程之外的文件`);
}
```

任一项 fail → STOP，重定向到 `project/00-detect.md` 重选组件工程。

---

## 模式 B · 动态路由（P0 不支持）

P0 不实现，输出提示：

```
你选了 dynamic 路由模式，但本 skill v0.3 不支持自动生成动态路由代码（需要后端推送菜单 + 前端 addRoute 拉起）。

替代方案：
1. 临时用 static 路由跑通页面 → 后续手动改造
2. 等 P1 版本支持

参考：references/docs/getting-started/getting-started-create-web-project.md § 路由部分
```

---

## 输出契约（v0.3）

```yaml
route_added:
  file: <component_package>/src/router/static.js                # 必须在组件工程下
  array: ROOT_ROUTES | MENU_ROUTES
  entry:
    path: <string>                                              # MENU_ROUTES 不带前导 / 
    name: <string>
    component_path: <string>                                    # @/views/... 形式
    meta:
      title: <string>
      needAuth: <bool>
      keepAlive: <bool>
r11_compliance: <bool>                                          # ★ v0.3 新增
warnings: [<string>]
```

---

## ✓ 检验句

- [ ] **(v0.3)** 路由文件路径以 `<component_package>/src/router/static.js` 结尾，**不**指向 Web 工程
- [ ] **(v0.3)** 文件名是 `static.js`，**不**是 `routes.js`
- [ ] **(v0.3)** 路由记录写在 `MENU_ROUTES` 或 `ROOT_ROUTES` **数组里**，**不**是顶层 export default
- [ ] **(v0.3)** `MENU_ROUTES` 中 `path` 不带前导 `/`；`ROOT_ROUTES` 中带前导 `/`
- [ ] `path` 在 `ROOT_ROUTES + MENU_ROUTES` **全集内唯一**
- [ ] `component` 指向的 .vue 文件**真实存在**（用 `ls` 或 `read_file` 验证）
- [ ] `name` 与 .vue 的 `defineOptions.name` 一致
- [ ] 用了 lazy import (`() => import(...)`)
- [ ] 弹窗 .vue 文件**没有**单独路由（违反约定）
- [ ] **(v0.3)** `meta.needAuth` 显式设置（开发期 false，生产期 true）

---

## Red Flags

| 信号 | 处理 |
| --- | --- |
| `static.js` 不存在 | STOP，让用户先用 `eui-cli comp` 创建组件工程或手动补骨架 |
| **(v0.3)** 用户要求把路由写到 Web 工程的 `static.js` | **拒绝**，引用 R11 + 框架文档原话，重定向到组件工程 |
| 用户要求"动态路由" | P0 不支持，引导改 static |
| path 已经存在 | STOP，让用户确认是否覆盖 |
| 用户要求"路径用大写"如 `/BidMgmt` | 拒绝，URL 应小写 + 连字符（前端约定） |
| **(v0.3)** MENU_ROUTES 写的 path 带了前导 `/` | STOP，去掉前导 `/`（否则路由匹配失败） |

---

_步骤 5 完成 → 进 `06-verify.md`。_
