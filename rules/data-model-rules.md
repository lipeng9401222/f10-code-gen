# data-model-rules · ★ defineDataModel 强制规范

> **F10 数据请求强制规范**。来源：`vue-docs/frontpage.md` § ⚠️ 强制规范 + `vue-docs/api/api-hooks-data-fetch-hooks.md` + 真实坑点。
> **每条带 ✓ 检验句**。**违反任意一条 = 必出 bug**。

---

## R1 · 表格 / 下拉 / 树**必须**用 defineDataModel + 模型 Hook

| 场景 | 必须 | 禁止 |
| --- | --- | --- |
| 表格数据 | `useTableModel(url, { idField, lazy, params })` | ❌ `ref([])` + `Utils.requestAxios` 手动赋值 |
| 下拉 / 列表选项 | `useListModel(url, { labelField })` | ❌ 同上 |
| 树形数据 | `useTreeModel(url, { lazy })` | ❌ 同上 |
| 子模型 / 自定义状态 | `createSubModel(initialData, methods)` | ❌ 散装 ref |

**正确模式**：

```js
const model = Utils.defineDataModel(() => {
  const searchParams = createSubModel({ logicOperator: 'and', conditions: [] }, {
    update: (params) => { /* ... */ }
  });

  const gridList = useTableModel('/api/list', {
    idField: 'id',
    lazy: false,
    params: computed(() => ({ ...searchParams.data }))
  });

  const typeOptions = useListModel('/api/typeOptions', { labelField: 'label', lazy: false });
  const typeTree = useTreeModel('/api/tree', { lazy: false });

  return {
    global: { pageConfig: new PageConfig({}) },
    models: { searchParams, gridList, typeOptions, typeTree }
  };
});
```

✓ 检验句：grep 搜你的 .vue 文件里 `Utils.requestAxios.*list|requestAxios.*options|requestAxios.*tree` 没匹配才算过。

---

## R2 · 三种模型**统一 POST**（不允许 GET）

来源：`vue-docs/frontpage.md`：
> 三种数据模型（useTreeModel、useTableModel、useListModel）**统一使用 POST 请求**
> **禁止**在 Mock 配置中为这些模型接口配置 `method: 'get'`

| 接口类型 | mock 必须写 | 禁止写 |
| --- | --- | --- |
| 表格 / 树 / 下拉模型接口 | `method: 'post'` | ❌ `method: 'get'` |
| 增删改 (Utils.requestAxios) | 与代码一致（post / put / delete） | — |

✓ 检验句：mock 文件中所有给模型用的接口 `method` 都是 `'post'` 才算过。

---

## R3 · 树数据**必须**用 `value` / `label` 字段

来源：`vue-docs/frontpage.md`：
> useTreeModel 期望的树节点字段为 `value` 和 `label`，children 为子节点数组。
> **常见错误**：不要使用 `id/text` 或 `id/name`，否则树文本不会显示。

**正确 mock 数据**：

```ts
[
  { value: 'cat-1', label: '设计', children: [
    { value: 'cat-1-1', label: '电气设计' },
    { value: 'cat-1-2', label: '结构设计' }
  ]},
  { value: 'cat-2', label: '施工' }
]
```

**模板绑定也用同名字段**：

```vue
<e-tree
  v-model:selected-keys="selectedKeys"
  :data="model.typeTree.data"
  :field-names="{ value: 'value', label: 'label', children: 'children', icon: 'customIcon' }"
  @select="handleSelect" />
```

✓ 检验句：你的 mock 数据 + tree 绑定都用 `value` / `label` / `children` 才算过。

---

## R4 · Mock 返回格式**严格**对应模型

| Hook | 接口返回必须是 |
| --- | --- |
| `useTableModel` | `{ data: [...], total: number }` |
| `useListModel` | `{ data: [{ label: 'xxx', value: 'xxx' }] }` |
| `useTreeModel` | `[{ value, label, children: [...] }]` （直接数组，不嵌 data） |

**错误示例**：
```ts
// ❌ 表格接口返回 { list: [...], totalCount: number } —— 模型读不到 data 和 total
// ❌ 列表接口返回 [...]（应该包一层 data）
```

✓ 检验句：你的 mock response 格式与上表完全对得上才算过。

---

## R5 · 模型方法挂在 `model.<modelName>.xxx`

```js
// 表格分页 / 排序 / 刷新
@change="model.gridList.change"
@refresh="model.gridList.refresh"

// 手动刷新
model.gridList.refresh();

// 重置 + 刷新
model.gridList.reset();

// 子模型方法
model.searchParams.update(newParams);  // 调用 createSubModel 注册的 methods
```

✓ 检验句：`v-on` 事件绑定都是 `model.<name>.<method>` 形式，**没有**直接调散装函数才算过。

---

## R6 · 初始化必须显式调 `model.methods.initData()`

```js
onMounted(() => {
  model.methods.initData();  // 触发所有 lazy:false 的模型初次加载
});
```

✓ 检验句：`onMounted` 里有 `model.methods.initData()` 调用才算过（除非整个页面所有模型 `lazy:true` 手动控制）。

---

## R7 · `params` 必须是 `computed`（不是 ref / reactive）

来源：`vue-docs/frontpage.md` 列表搜索示例。

```js
const gridList = useTableModel('/api/list', {
  idField: 'id',
  params: computed(() => ({          // ✅ computed 才能让 params 变化触发自动刷新
    ...searchParams.data,
    category: selectedCategory.value !== 'all' ? selectedCategory.value : undefined
  }))
});
```

**错误**：
```js
params: { ...searchParams.data }                  // ❌ 静态对象，搜索不刷新
params: reactive({ ...searchParams.data })        // ❌ reactive 但断了引用
```

✓ 检验句：所有 `useTableModel` 的 `params` 字段都是 `computed(() => ...)` 才算过。

---

## R8 · Tab 内表格的 `lazy` 必须分场景设置

来源：`vue-docs/troubleshooting.md` "Tab 内表格高度问题"。

| Tab | 设置 | 原因 |
| --- | --- | --- |
| 默认激活的 Tab 内表格 | `lazy: false` | 页面初始化时已渲染，能正确算高度 |
| 非默认 Tab 内表格 | `lazy: true` | 隐藏状态算高度会错，等切到才加载 |

切 Tab 时手动触发：

```js
const tabDataMap = { listed: 'gridList', apply: 'applyRecords', invite: 'inviteRecords' };

const onTabChange = (name) => {
  activeTab.value = name;
  const modelName = tabDataMap[name];
  if (model[modelName] && model[modelName].data.length === 0) {
    model[modelName].refresh();
  }
};
```

✓ 检验句：Tab 内多表格场景下，**只有默认 Tab** 的模型 `lazy: false`，其他都是 `true`，且 `onTabChange` 里手动触发刷新。

---

## R9 · selectedRowKeys 放进 model 而非散装 ref

```js
const model = Utils.defineDataModel(() => {
  const selectedRowKeys = ref([]);  // ✅ 在 defineDataModel 内部声明
  // ...
  return { models: { selectedRowKeys, gridList } };
});

// 模板里
v-model:selectedRowKeys="model.selectedRowKeys"
```

✓ 检验句：`selectedRowKeys` 通过 `model.selectedRowKeys` 访问才算过。

---

## R10 · 增删改用 `Utils.request` 或 `Utils.requestAxios`（不要混用）

| 用途 | 推荐 API |
| --- | --- |
| 业务操作（删除 / 提交） | `Utils.request({ url, data: { params: { ... } } })` |
| 旧式 axios 配置（method/headers） | `Utils.requestAxios({ url, method, data })` |

**请求体格式**：
```js
{ params: { ...formData } }   // ✅ F10 约定，包一层 params
```

**响应体格式**：
```js
{ state: true, message: '操作成功' }  // ✅ state + message 双字段
```

✓ 检验句：所有非模型请求都包了 `data: { params: {...} }` 一层才算过。

---

## R11 · 所有页面类型都必须产出 `model` 根对象（v0.4 全页面通用化）

来源：真实 AAR · 看板页面白屏（详见 `references/gotchas.md` G013）。看板、指标卡、统计页、dashboard、kanban、metric 等页面即使没有表格 / 树 / 下拉，也必须使用 `Utils.defineDataModel`（或 `Utils.defineFrameModel`）统一声明页面数据与加载状态。

> **v0.4 升级**：本规则从 dashboard 专属约束扩展为全页面通用约束，并配套 `scripts/validate-page.mjs` 的 4 条静态校验（DM-R11.1 ~ DM-R11.4）。文档依据：`references/docs/getting-started/getting-started-use-data-model.md`。

### `defineDataModel` 与 `defineFrameModel` 的区分

两者在 R11 校验中**等价合法**：

| API | 何时用 | 区别 |
| --- | --- | --- |
| `Utils.defineDataModel` | 主流页面（含表格 / 表单 / 树 / 看板） | 完整数据模型，可声明 `models: {}` 子模型 |
| `Utils.defineFrameModel` | 页面结构特殊不需要子模型，但仍要享用框架的 `getPageConfig` / `getApiSecurityConfig` 自动请求 | 省去 `models`；同样返回 `global.state` / `global.pageConfig` |

### 必须（其一）

```js
const { createSubModel, PageConfig, request } = Utils;

const model = Utils.defineDataModel(() => {
  const dashboardData = createSubModel(
    { total: 0, items: [] },
    {
      refresh: async () => {
        const res = await request({ url: '/api/demo/dashboard/data', data: { params: {} } });
        if (res) Object.assign(dashboardData.data, res.data || res);
      },
      lazy: false
    }
  );

  return {
    global: { pageConfig: new PageConfig({}) },
    models: { dashboardData }
  };
});

onMounted(() => {
  model.methods.initData();
});
```

或（页面结构特殊，无业务子模型时）：

```js
const model = Utils.defineFrameModel({
  pageConfig: new PageConfig({})
});

onMounted(() => {
  model.methods.initData();
});
```

### 禁止

```js
// ❌ 主数据散装 ref + onMounted 手动 request，template 又引用 model.xxx
const dashboardData = ref({});
const loadDashboard = async () => {
  const res = await Utils.request({ url: '/api/dashboard/data' });
  dashboardData.value = res;
};
onMounted(loadDashboard);
// 模板里写 v-loading="model.global.state.loading" → model 未定义 → 白屏
```

### R11 静态校验子规则（由 `scripts/validate-page.mjs` 强制执行）

| 子规则 | 触发条件 | 类型 | 失败修复 |
| --- | --- | --- | --- |
| **DM-R11.1** 模板 `model.` 引用必须有数据模型声明 | 模板含 `\bmodel\.[a-zA-Z_$]` 且**非** `:model="..."` 形式 | error | script 必须有 `Utils.(defineDataModel\|defineFrameModel)(...)` |
| **DM-R11.2** 数据模型必须 onMounted 初始化 | script 含 `defineDataModel` 或 `defineFrameModel` | error | 必须有 `model.methods.initData(`（带/不带参数皆可） |
| **DM-R11.3** 主数据禁止散装 ref + onMounted request | 三特征同时命中：① 顶层 `ref({...})` / `ref([...])`，② `onMounted` 内直接 `request/requestAxios/restfulAxios`，③ **没有** `defineDataModel`/`defineFrameModel` | error | 主数据加载必须走 `useTableModel` / `useListModel` / `useTreeModel` / `createSubModel` |
| **DM-R11.4** 引用 `pageConfig` 字段时必须实例化 | 模板或 script 含 `model.global.pageConfig.` 或 `model.pageConfig.`（仅 `model.global.state.loading` **不**触发） | error | `defineDataModel` 的 `global` 中必须有 `pageConfig: new PageConfig({...})`，否则字段为 `undefined` |

### 关键修正（v0.3 → v0.4）

| 旧版 | 新版 |
| --- | --- |
| ❌ 出现 `v-loading="model.global..."` 必须有 `global.pageConfig`（错，pageConfig 是可选项） | ✅ DM-R11.4 改为：仅当真正读取 `model.global.pageConfig.xxx` 时才校验 |
| ❌ 仅 dashboard / kanban / metric 触发检查 | ✅ 全页面通用，凡模板用 `model.` 即触发 |
| ❌ 仅识别 `defineDataModel` | ✅ `defineDataModel` 与 `defineFrameModel` 等价合法 |
| ❌ `<el-form :model="formData">` 也会触发误报 | ✅ 正则用 `\bmodel\.` 区分，避免误命中 prop |

### ✓ 检验句

模板中出现 `model.` 时，script 中必须有 `const model = Utils.defineDataModel(...)` 或 `const model = Utils.defineFrameModel(...)`，且必须在 `onMounted` 中调用 `model.methods.initData()`。主数据加载（表格 / 树 / 下拉 / 看板主体数据）禁止用散装 `ref + onMounted + request` 三件套。

---

_违反 R1~R11 任一 → 必出"表格不刷新 / 树不显示 / 搜索失效 / 页面白屏"等典型 bug。_
_遇到这些症状先回查本文件而不是改组件代码。_
