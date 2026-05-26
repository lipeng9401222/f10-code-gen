---
phase: project
step: detect
delegation: A
---

# project/00-detect · 工程位置检测

> **目的**：搞清楚当前 pwd 是 monorepo 内 / 已有 web 工程 / 全新地方，决定走 A/B/C 三个分支。

---

## 检测三件事

### 1. 是否在 pnpm workspace 内？

往上找祖先目录的 `pnpm-workspace.yaml`：

```sh
# 从当前目录开始往上找
DIR=$(pwd)
while [ "$DIR" != "/" ]; do
  if [ -f "$DIR/pnpm-workspace.yaml" ]; then
    echo "FOUND: $DIR"
    break
  fi
  DIR=$(dirname "$DIR")
done
```

或用 Node 跨平台：

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

**找到 → 是 monorepo 内**（记下路径）。

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

| 检测到 | 结论 |
| --- | --- |
| pnpm-workspace.yaml + 多个 packages/* | **完整 monorepo**（如 `vue-frame-live-docs`） |
| 单一 package.json + @epframe/eui-core | **独立 web 工程** |
| 都没有 | **空目录 / 全新地方** |

---

## 三种分支

### 分支 A · 完整 monorepo（**默认推荐**）

| 当前情况 | 处置 |
| --- | --- |
| 有 `packages/examples/` | **零成本演示**：跳到 `06-run-dev.md` 直接 `pnpm dev` |
| 没有 examples 但有 web-show / web-eva-plus | 跳到 `04-register.md` 在该工程注册 |
| 有 monorepo 但没 web 工程 | 跑 `02-web.md` 在 monorepo 内加新 web |

**当前仓库（`vue-frame-live-docs`）属于第一种**。

### 分支 B · 独立 web 工程

| 当前情况 | 处置 |
| --- | --- |
| 工程齐全可跑 | 跳到 `04-register.md` |
| 工程缺依赖 | 先跑 `05-install-build.md` |
| 工程结构异常 | STOP，告知用户 |

### 分支 C · 全新地方

需要从 0 开始：
1. 选择是否在新目录建 monorepo（`01-workspace.md`）
2. 创建 web 工程（`02-web.md`）
3. （可选）创建组件包（`03-component.md`）
4. 注册路由（`04-register.md`）
5. 装依赖 + 构建（`05-install-build.md`）
6. 启动（`06-run-dev.md`）

---

## 输出体检报告

```
工程位置体检：
✓ 在 monorepo 内：/Users/juanjuan/.../vue-frame-live-docs
✓ packages/examples 存在
✓ packages/web-show 存在
推荐路径：分支 A · 零成本演示模式
预计耗时：5 秒（直接跳到 06-run-dev.md）

下一步：将在 packages/examples/src/views/demo/page/<module>/<appName>/ 下生成代码
```

---

## 用户偏好覆盖

| 用户说 | 处置 |
| --- | --- |
| "我想新建一个工程" | 强制走分支 C，忽略 monorepo 检测 |
| "在 web-show 里加" | 强制走分支 B，目标设为 web-show |
| "你看着办" | 默认推荐（监测结果） |

---

## ✓ 检验句

- [ ] 已确定走 A / B / C 哪个分支
- [ ] 用户已**默认接受**或**显式确认**了你的选择
- [ ] 接下来要生成代码的**目标目录**已经写在产出里

---

## 输出契约

```yaml
project_detect_result:
  branch: A | B | C
  monorepo_root: <路径或 null>
  target_workspace: <路径>     # 比如 packages/examples
  target_view_dir: <路径>      # 比如 packages/examples/src/views/demo/page/<module>/<appName>
  next_step: <06-run-dev | 04-register | 02-web | ...>
```

---

_完成 → 按 next_step 跳到对应 workflow。_
