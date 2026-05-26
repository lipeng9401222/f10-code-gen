# page/02-match-template · 模板匹配

> **目的**：根据步骤 1 的 `intent_resolved`，从 references 中找到最贴合的 typical/* .vue 文件，作为步骤 3 生成代码的**骨架来源**。

---

## 强制流程（来源：vue-docs/page-examples/page-template-index.md）

> **⚠️ 开发前必须按流程完整执行，禁止跳过任何步骤**
> **禁止**只读基础模板不查场景模板，也**禁止**只查场景模板不读基础模板

### Step 1 · 读基础模板（5 个，**必读**）

无论生成什么页面，先读骨架：

| 功能 | 路径 |
| --- | --- |
| 列表页 | `references/docs/page-examples/base/list.vue` |
| 左右布局 | `references/docs/page-examples/base/side-tree-list.vue` |
| 新增页 | `references/docs/page-examples/base/add.vue` |
| 编辑页 | `references/docs/page-examples/base/edit.vue` |
| 详情页 | `references/docs/page-examples/base/detail.vue` |

**根据 intent 选 1~3 个读**：

- `pageType: list` 且 `hasTree: false` → 读 `base/list.vue`
- `pageType: list` 且 `hasTree: true` → 读 `base/side-tree-list.vue`
- `hasFormDialog` → 加读 `base/add.vue` + `base/edit.vue`
- `hasDetailDialog` → 加读 `base/detail.vue`

### Step 2 · 匹配场景模板（**必查**）

读 `references/docs/page-examples/page-template-index.md` 索引，按"页面类型 + 布局/功能特征"找匹配。

#### 高频场景速查表

| 用户 intent 信号 | 匹配模板 |
| --- | --- |
| 列表 + 树 | `references/docs/page-examples/demo/page/typical/list/navigation/side-tree.vue` |
| 列表 + Tab 顶部导航 | `references/docs/page-examples/demo/page/typical/list/navigation/top-nav.vue` |
| 列表 + 树状表格 | `references/docs/page-examples/demo/page/typical/list/content/tree-grid.vue` |
| 列表 + 嵌套表格 | `references/docs/page-examples/demo/page/typical/list/content/inline-detail-grid.vue` |
| 列表 + 卡片宫格 | `references/docs/page-examples/demo/page/typical/list/card/grid.vue` |
| 表单 + 侧边目录 | `references/docs/page-examples/demo/page/typical/form/navigation/side-directory.vue` |
| 表单 + 步骤导航 | `references/docs/page-examples/demo/page/typical/form/navigation/step-navigation.vue` |
| 表单 + 分组(折叠) | `references/docs/page-examples/demo/page/typical/form/content/group-accordion.vue` |
| 表单 + 子表单(行编辑) | `references/docs/page-examples/demo/page/typical/form/subform/datagrid-edit.vue` |
| 详情 + 表格形式 | `references/docs/page-examples/demo/page/typical/detail/layout/table.vue` |
| 选人/部门 | `references/docs/page-examples/demo/page/typical/chosen/person-depart.vue` |
| 抽屉弹窗 | `references/docs/page-examples/demo/page/typical/dialog/drawer-dialog.vue` |
| 全屏弹窗 | `references/docs/page-examples/demo/page/typical/dialog/full-screen-dialog.vue` |
| 状态页 404 | `references/docs/page-examples/demo/page/typical/status/error/error-404.vue` |
| 缺省引导 | `references/docs/page-examples/demo/page/typical/status/empty/datagrid-empty-withbtn.vue` |

完整索引看 `references/examples-index.md`。

### Step 3 · 综合判断

最终页面 = **基础骨架 (Step 1) + 场景功能细节 (Step 2)**。

| 模板类型 | 提供 | 使用方式 |
| --- | --- | --- |
| 基础模板 | 骨架结构、数据模型 | 作为页面框架基础 |
| 场景模板 | 功能细节、组件配置 | 在骨架基础上叠加具体功能 |

---

## 匹配规则

| intent 命中 | 必读基础 | 必读场景 |
| --- | --- | --- |
| 单一列表（最常见） | `base/list.vue` | 无 → 直接用基础 |
| 列表 + 树（如标段管理） | `base/side-tree-list.vue` | `typical/list/navigation/side-tree.vue` |
| 列表 + 弹窗 | `base/list.vue` + `base/add.vue` + `base/edit.vue` + `base/detail.vue` | 无（弹窗是基础模板自带） |
| 列表 + 树 + 弹窗 | `base/side-tree-list.vue` + `base/add.vue` + `base/edit.vue` + `base/detail.vue` | `typical/list/navigation/side-tree.vue` |
| Tab 切多列表 | `base/list.vue` | `typical/list/navigation/top-nav.vue` |
| 复杂表单 | `base/add.vue` | `typical/form/navigation/side-directory.vue` 或 `typical/form/navigation/step-navigation.vue` |
| 子表单（主从） | `base/add.vue` | `typical/form/subform/datagrid-edit.vue` |

---

## 多模板组合的处理

如果一个 intent 同时命中多个场景模板（如"列表 + Tab + 树状表格"），按以下顺序合并：

1. **结构层**：列表基础 → 选 `base/list.vue`
2. **导航层**：Tab 顶部 → 在结构外包 e-tabs（参考 `typical/list/navigation/top-nav.vue`）
3. **内容层**：树状表格 → 主表格替换为 tree-grid（参考 `typical/list/content/tree-grid.vue`）

**不允许**简单"全部 import"再拼凑（容易 import 名字冲突）。

---

## 输出契约

本步骤产出：

```yaml
template_picked:
  base: <路径列表>            # 至少 1 个
  scenarios: <路径列表>       # 0~N 个
  rationale: <为什么这么选>   # 一两句话
  combine_strategy: <如何组合>  # 一两句话
```

示例（标段管理 = 列表 + 树 + 三弹窗）：

```yaml
template_picked:
  base:
    - references/docs/page-examples/base/side-tree-list.vue
    - references/docs/page-examples/base/add.vue
    - references/docs/page-examples/base/edit.vue
    - references/docs/page-examples/base/detail.vue
  scenarios:
    - references/docs/page-examples/demo/page/typical/list/navigation/side-tree.vue
  rationale: |
    intent 含 hasTree=true → 选 side-tree-list 作为骨架；
    含 hasFormDialog/hasDetailDialog/hasEditDialog → 加 add/edit/detail；
    场景模板 side-tree.vue 作为左树具体配置参考。
  combine_strategy: |
    主页面用 side-tree-list.vue 骨架，左树参考 side-tree.vue 的 Setting/AddRectangle 下拉菜单；
    三个弹窗各自独立 .vue（add/edit/detail），主页面用 $dialog API 调用。
```

---

## ✓ 检验句

- [ ] **至少读了 1 个基础模板**（不读 = 出错）
- [ ] 给出的场景路径**真实存在**（grep `ls references/docs/page-examples/...`）
- [ ] `rationale` 写明了"为什么选这个"
- [ ] `combine_strategy` 说清了"骨架 + 场景细节如何融合"

---

## Red Flags

| 信号 | 处理 |
| --- | --- |
| 我"凭印象"知道哪个模板，不读了 | STOP，必须读 |
| 索引里没匹配项 | STOP，回头问用户更多细节 / 用 base 兜底 |
| 想自己造结构 | STOP，违反"内容不预制"原则，必须基于现有模板 |

---

_步骤 2 完成 → 进 `03-generate.md`。_
