---
phase: project
step: detect
delegation: A
---

# project/00-detect · 工程位置检测（v0.3 · 分层扫描版）

> **目的**：搞清楚当前 pwd 是 monorepo 内 / 已有 web 工程 / 全新地方，并在 monorepo 场景下**强制识别出 Web 工程与组件工程的分层**，把页面生成位置锁定到**组件工程**（违反 = 触发 R11）。

> **来源**：`rules/project-rules.md` R11 业务开发分层约束 + `references/docs/getting-started/getting-started-write-page.md` + `references/docs/guides/guides-base-component-system.md`。

---

## 检测三件事

### 1. 是否在 pnpm workspace 内？

往上找祖先目录的 `pnpm-workspace.yaml`：

```sh
node -e "
const fs=require('fs'),path=require('path');
let d=process.cwd();
while(d!==path.dirname(d)){
  if(fs.existsSync(path.join(d,'pnpm-workspace.yaml'))){console.log('FOUND:',d);break}
  d=path.dirname(d);
}
"
```

**找到 → 是 monorepo 内**（记下 `monorepo_root`）。

### 2. 是否在已有 F10 web 工程内？

检查当前目录或祖先有 `package.json` 含 `@epframe/eui-core` 依赖：

```sh
node -e "
const fs=require('fs'),path=require('path');
let d=process.cwd();
while(d!==path.dirname(d)){
  const p=path.join(d,'package.json');
  if(fs.existsSync(p)){
    const pkg=JSON.parse(fs.readFileSync(p,'utf8'));
    const deps={...pkg.dependencies,...pkg.devDependencies};
    if(deps['@epframe/eui-core']){console.log('F10:',d);break}
  }
  d=path.dirname(d);
}
"
```

**找到 → 是已有 F10 web 工程**（记下路径）。

### 3. 当前是哪种工程结构？

| 检测到 | 结论 | 下一步 |
| --- | --- | --- |
| pnpm-workspace.yaml + 多个 packages/* | **完整 monorepo** | **必须**走 § "Monorepo 分层扫描" |
| 单一 package.json + @epframe/eui-core | **独立 web 工程** | 走分支 B，但要先看是否有兄弟组件包 |
| 都没有 | **空目录 / 全新地方** | 走分支 C，强制建 Web + 组件工程 |

---

## ★ Monorepo 分层扫描（v0.3 新增·核心）

> 解决用户痛点：之前 skill 把页面写到了 Web 工程，违反框架文档规定。

### Step 1 · 解析 pnpm-workspace.yaml，列出所有子包

```sh
node -e "
const fs=require('fs'),path=require('path');
const root=process.argv[1];
const yaml=fs.readFileSync(path.join(root,'pnpm-workspace.yaml'),'utf8');
// 简易解析 packages 列表（更复杂场景请用 js-yaml）
const lines=yaml.split(/\r?\n/).map(s=>s.trim()).filter(s=>s.startsWith('-'));
const patterns=lines.map(s=>s.replace(/^-\s*['\"]?/,'').replace(/['\"]?\$/,''));
console.log(JSON.stringify(patterns));
" \"$MONOREPO_ROOT\"
```

或者直接 `ls packages/` 拿到候选包列表。

### Step 2 · 对每个子包逐项打分

对每个 `packages/<name>/package.json` 收集以下特征：

```javascript
// 伪代码：扫描单个包，返回分类信号
function classify(pkgDir) {
  const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));
  const deps = pkg.dependencies || {};
  const peers = pkg.peerDependencies || {};
  const exists = (f) => fs.existsSync(path.join(pkgDir, f));

  const webSignals = {
    hasMainJs: exists('src/main.js'),                          // 强信号
    hasEuiInDeps: !!deps['@epframe/eui-core'],                 // 强信号
    hasMultiWorkspaceDeps: Object.values(deps).filter(v => String(v).startsWith('workspace:')).length >= 1,
    setupHasDeps: exists('src/setup.js') && /deps\s*:\s*\[/.test(fs.readFileSync(path.join(pkgDir,'src/setup.js'),'utf8')),
    hasExtWebPlugin: exists('vite.config.js') && /extWebPlugin|@epframe\/vite-plugin-ext-web/.test(fs.readFileSync(path.join(pkgDir,'vite.config.js'),'utf8'))
  };
  const componentSignals = {
    hasIndexJs: exists('src/index.js') && /export\s*\{[^}]*setup[^}]*\}/.test(fs.readFileSync(path.join(pkgDir,'src/index.js'),'utf8')),
    hasEuiInPeers: !!peers['@epframe/eui-core'],               // 强信号
    hasStaticJsRoutes: exists('src/router/static.js') && /(ROOT_ROUTES|MENU_ROUTES)/.test(fs.readFileSync(path.join(pkgDir,'src/router/static.js'),'utf8')),
    hasLibBuildConfig: exists('vite.config.js') && /build\.lib|lib\s*:\s*\{[^}]*entry/.test(fs.readFileSync(path.join(pkgDir,'vite.config.js'),'utf8')),
    hasExportsField: !!pkg.exports
  };

  return {
    name: pkg.name,
    dir: pkgDir,
    webScore: Object.values(webSignals).filter(Boolean).length,
    componentScore: Object.values(componentSignals).filter(Boolean).length,
    webSignals,
    componentSignals
  };
}
```

### Step 3 · 反向扫描验证（最强信号）

读每个候选 Web 工程的 `src/setup.js`，看里面 `deps: [...]` 数组里 import 了哪些组件包。被 import 的就是**实锤的组件工程**：

```javascript
// 伪代码
function findReverseRefs(webPkgDir, allPackages) {
  const setupSrc = fs.readFileSync(path.join(webPkgDir, 'src/setup.js'), 'utf8');
  // 抓 import xxx from '<pkgName>' 模式
  const importedPkgs = [...setupSrc.matchAll(/import\s+\w+\s+from\s+['"]([^'"]+)['"]/g)]
    .map(m => m[1]);
  return allPackages.filter(p => importedPkgs.includes(p.name));
}
```

### Step 4 · 综合判定

| 工程角色 | 判定规则 |
| --- | --- |
| **Web 工程** | `webScore >= 2` **且** `componentScore <= 1` **且** 是其他子包反向引用的目标宿主 |
| **组件工程** | `componentScore >= 2` **且** `webScore <= 1` **且**（被某个 Web 工程的 setup.js import **或** 自身具备 `peerDependencies + lib build`） |
| **无法判定** | 两个 score 都 ≥ 2 → 让用户手动选 |

### Step 5 · 输出扫描清单 + 让用户确认

```
工程分层扫描结果：

【Web 工程】（启动入口，不写业务代码）：
  ✓ packages/web-show           (webScore=5/5, 含 main.js + setup.deps + workspace 依赖)
  ✓ packages/web-eva-plus       (webScore=4/5)
  ✓ packages/web-mobile         (webScore=4/5)

【组件工程】（业务开发位置，候选）：
  ✓ packages/examples           (componentScore=5/5, peerDeps + lib build + index.js export setup)
                                  被 web-show/src/setup.js 引用 ★
  ✓ packages/admin-components   (componentScore=4/5)
                                  被 web-show/src/setup.js 引用 ★
  ✓ packages/site-tools         (componentScore=4/5)
                                  被 web-show/src/setup.js 引用 ★

我将把生成的页面写入 → 【packages/examples】（默认推荐）
路由同步到 → packages/examples/src/router/static.js
mock 文件落到 → packages/examples/mock/

确认默认选择？还是切到 admin-components / site-tools / 其他？
（回复"默认"或包名，5 秒搞定）
```

### Step 6 · 用户选完 → 写入产出契约

把用户选择的组件工程作为 `component_package`，启动 Web 工程作为 `web_package`，落到下面的输出契约。

---

## 三种分支

### 分支 A · 完整 monorepo（**默认推荐**）

| 当前情况 | 处置 |
| --- | --- |
| 有 ≥ 1 个组件工程被 Web 工程引用 | **零成本演示**：跑完上面的分层扫描 → 跳到 `06-run-dev.md` 启动 Web 工程 |
| 有 monorepo 但**没有**组件工程（罕见） | STOP，强制走 `03-component.md` 先建一个，**禁止**回退到把页面写进 Web 工程 |
| 多个组件工程，无法默认 | 让用户选 |

**当前仓库（`vue-frame-live-docs`）默认 `packages/examples`**（兼容旧版默认行为）。

### 分支 B · 独立 web 工程

| 当前情况 | 处置 |
| --- | --- |
| 工程齐全可跑 + 有兄弟组件包（同级目录 `../<comp-pkg>/`） | 走分层判定（参考 Step 2~5），把页面写到组件包 |
| 工程齐全 + 没有组件包 | 提示用户：**强烈建议**先 `eui-cli comp` 建一个组件工程，否则违反 R11 |
| 工程缺依赖 | 先跑 `05-install-build.md` |
| 工程结构异常 | STOP，告知用户 |

### 分支 C · 全新地方

需要从 0 开始：
1. 选择是否在新目录建 monorepo（`01-workspace.md`）
2. 创建 web 工程（`02-web.md`）
3. **强制**创建组件包（`03-component.md`）← v0.3 由可选改为强制
4. 注册路由（`04-register.md`）
5. 装依赖 + 构建（`05-install-build.md`）
6. 启动（`06-run-dev.md`）

---

## 输出体检报告

```
工程位置体检（v0.3 分层版）：
✓ 在 monorepo 内：/Users/juanjuan/.../vue-frame-live-docs
✓ Web 工程：packages/web-show（webScore=5/5）
✓ 组件工程：packages/examples（componentScore=5/5，被 web-show 引用）
  备选：packages/admin-components, packages/site-tools
推荐路径：分支 A · 零成本演示模式
预计耗时：10 秒（分层扫描 + 用户确认 + 跳 06-run-dev.md）

下一步：将在 packages/examples/src/views/<module>/<appName>/ 下生成代码
        路由写入 packages/examples/src/router/static.js 的 MENU_ROUTES 数组
        mock 文件写入 packages/examples/mock/<module>/<appName>.mock.ts
```

---

## 用户偏好覆盖

| 用户说 | 处置 |
| --- | --- |
| "我想新建一个工程" | 强制走分支 C，忽略 monorepo 检测 |
| "在 admin-components 里加" | 强制把 `component_package` 设为 admin-components |
| "页面写到 web-show 里" | **拒绝**，回 R11 引用 + 让用户重选组件工程（**不可妥协**） |
| "你看着办" | 默认推荐（分层扫描的首选） |

---

## ✓ 检验句

- [ ] 已确定走 A / B / C 哪个分支
- [ ] **`web_package` 与 `component_package` 都已识别出来且非同一目录**（违反 = STOP）
- [ ] 用户已**默认接受**或**显式确认**了 `component_package`
- [ ] 接下来要生成代码的**目标目录** = `<component_package>/src/views/<module>/<appName>/`
- [ ] **`target_view_dir` 路径里不出现 Web 工程的目录名**（违反 R11）

---

## 输出契约（v0.3 · 三字段强制）

```yaml
project_detect_result:
  branch: A | B | C
  monorepo_root: <绝对路径或 null>
  web_package: <Web 工程绝对路径>           # ★ 必填，缺失 = STOP
  component_package: <组件工程绝对路径>     # ★ 必填，缺失 = STOP
  target_view_dir: <component_package>/src/views/<module>/<appName>/
  target_mock_dir: <component_package>/mock/<module>/
  target_route_file: <component_package>/src/router/static.js
  alternative_component_packages: [<其他组件工程>...]  # 可选，让 step3+ 备选
  next_step: <06-run-dev | 04-register | 03-component | ...>
```

示例（当前 vue-frame-live-docs 仓库）：

```yaml
project_detect_result:
  branch: A
  monorepo_root: /Users/juanjuan/.../vue-frame-live-docs
  web_package: /Users/juanjuan/.../vue-frame-live-docs/packages/web-show
  component_package: /Users/juanjuan/.../vue-frame-live-docs/packages/examples
  target_view_dir: /Users/juanjuan/.../vue-frame-live-docs/packages/examples/src/views/<module>/<appName>/
  target_mock_dir: /Users/juanjuan/.../vue-frame-live-docs/packages/examples/mock/<module>/
  target_route_file: /Users/juanjuan/.../vue-frame-live-docs/packages/examples/src/router/static.js
  alternative_component_packages:
    - /Users/juanjuan/.../packages/admin-components
    - /Users/juanjuan/.../packages/site-tools
  next_step: 06-run-dev
```

---

## Red Flags

| 信号 | 处置 |
| --- | --- |
| 用户硬要把页面写到 Web 工程 | **拒绝**，引用 R11 + 框架文档原话："Web 工程是启动入口，不建议在此工程中编写业务代码"，要求重选 |
| 扫描出 0 个组件工程 | 强制走 `03-component.md` 先建一个，不允许妥协 |
| 多个组件工程评分相同且无强信号 | 让用户**显式**选一个，不要默认猜 |
| `pnpm-workspace.yaml` 存在但 packages/* 为空 | 当作分支 C 处理（全新地方） |

---

_完成 → 把产出 `project_detect_result` 传给 Phase 3 → 按 next_step 跳到对应 workflow。_
