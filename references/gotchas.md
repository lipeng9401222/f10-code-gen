# gotchas · 真实坑点清单

> **数据源严限**（防止 skill 漂移）：
> - ✅ 来自 `vue-docs/troubleshooting.md`（官方记录的坑）
> - ✅ 来自 `vue-docs/frontpage.md` ⚠️ 强制段（隐含的坑）
> - ✅ 来自真实 AAR 沉淀（必须满足 2/3 门槛：可重复 / 代价高 / 代码不可见）
>
> **禁止**：凭空想象的坑、第三方文档抄来的坑、"听说会出问题"。

每条坑点格式：`G0XX · 一句话标题`

---

## G001 · Tab 内表格高度问题

### 现象
在 `e-tabs` 组件中使用 `ep-data-grid`，**只有默认激活**的 Tab 页表格高度正常，切换到其他 Tab 后表格高度超出可视区域或显示异常。

### 根因
1. `e-tabs` 用 `v-show`（即 `display: none`）隐藏非激活 Tab
2. 数据模型 `lazy: false` 时所有 Tab 表格在初始化时都渲染
3. 隐藏状态下 `--table-height` CSS 变量计算错误
4. 切换 Tab 后表格不会自动重新计算高度

### 修复

**步骤 1**：非默认 Tab 用 `lazy: true`

```js
// 默认 Tab
const gridList = useTableModel('/api/list', { idField: 'id', lazy: false });

// 其他 Tab
const applyRecords = useTableModel('/api/applyRecords', { idField: 'id', lazy: true });
```

**步骤 2**：`onTabChange` 中触发数据加载

```js
const tabDataMap = { listed: 'gridList', apply: 'applyRecords' };

const onTabChange = (name) => {
  activeTab.value = name;
  const modelName = tabDataMap[name];
  if (model[modelName] && model[modelName].data.length === 0) {
    model[modelName].refresh();
  }
};
```

### 关键点
- 只有**默认激活的 Tab** `lazy: false`
- 其他 Tab `lazy: true`，切换时手动 refresh

### 来源
`vue-docs/troubleshooting.md` § Tab 内表格高度问题

---

## G002 · Flex 容器表格高度跳动

### 现象
页面加载时表格高度先很大再缩小，产生视觉跳动。

### 根因
- Flex 子项默认 `min-height: auto`，会以内容自然高度为最小值
- 表格初始化渲染较大空状态/loading 区域，撑开容器
- 数据加载后内容变小，Flex 重新计算导致收缩

### 修复

```vue
<!-- ❌ 错误 -->
<div class="flex-1 px-xl pb-xl bg-white">
  <ep-data-grid ... />
</div>

<!-- ✅ 正确：加 min-h-0 + overflow-hidden -->
<div class="flex-1 min-h-0 overflow-hidden px-xl pb-xl bg-white">
  <ep-data-grid ... />
</div>
```

### 关键点
`min-h-0` 让容器可收缩到比内容更小，避免被撑开。

### 来源
`vue-docs/troubleshooting.md` § Flex 容器表格高度跳动问题

---

## G003 · 页面组件未导入框架组件

### 现象
控制台报错：
```
[Vue warn]: Failed to resolve component: ep-data-grid
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
```

### 根因
`.vue` 文件用 `ep-data-grid`，但未从 `@epframe/eui-core` 导入。

### 修复

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { EpDataGrid, Utils } from '@epframe/eui-core';   // ✅ 必须显式导入
</script>
```

### 常见框架组件导入清单

| 标签 | 导入 |
| --- | --- |
| `ep-data-grid` | `import { EpDataGrid } from '@epframe/eui-core'` |
| `ep-layout-manager` | `import { EpLayoutManager } from '@epframe/eui-core'` |
| `ep-form` | `import { EpForm } from '@epframe/eui-core'` |
| `ep-form-item` | `import { EpFormItem } from '@epframe/eui-core'` |
| `ep-input` | `import { EpInput } from '@epframe/eui-core'` |
| `ep-select` | `import { EpSelect } from '@epframe/eui-core'` |
| `ep-date-picker` | `import { EpDatePicker } from '@epframe/eui-core'` |

### 来源
`vue-docs/troubleshooting.md` § 页面组件未导入框架组件

---

## G004 · 组件属性值使用错误

### 现象
控制台报错：
```
[Vue warn]: Invalid prop: custom validator check failed for prop "type".
```

### 根因
凭其他 UI 框架（如 Element Plus）的经验使用属性值，未查阅当前框架文档确认有效值范围。

例如：
- Element Plus 的 `el-tag` 支持 `type="primary"`
- F10 的 `e-tag` **只支持** `'success' | 'info' | 'warning' | 'danger' | ''`

### 修复

**使用任何组件属性前必须查阅文档确认有效值**：

| 组件 | 属性 | 有效值 | 文档 |
| --- | --- | --- | --- |
| `e-tag` | type | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `components/components-tag.md` |
| `e-button` | type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `components/components-button.md` |
| `e-message` (EMessage) | type | `'success' \| 'warning' \| 'info' \| 'error'` | `components/components-message.md` |

```vue
<!-- ❌ 凭经验用 primary，但 e-tag 不支持 -->
<e-tag type="primary">申请入库</e-tag>

<!-- ✅ 查阅文档后用 info -->
<e-tag type="info">申请入库</e-tag>
```

### 关键点
- **禁止**凭其他框架经验直接用属性值
- **必须**查阅当前框架组件文档的 Attributes 表
- 重点关注枚举类型属性（type / size / effect）

### 来源
`vue-docs/troubleshooting.md` § 组件属性值使用错误

---

## G005 · 数据模型接口配 method 错误

### 现象
- 表格不刷新 / 不加载
- 接口返回 404 或方法不允许 (405)
- mock 接收不到请求

### 根因（来源：`frontpage.md` ⚠️ 强制段）

> 三种数据模型（useTreeModel、useTableModel、useListModel）**统一使用 POST 请求**
> **禁止**在 Mock 配置中为这些模型接口配置 `method: 'get'`

mock 配 `method: 'get'` 但模型实际发 POST → 不匹配。

### 修复

```ts
// ❌ 错误
{ url: '/api/list', method: 'get', body: { data: [], total: 0 } }

// ✅ 正确：method 必须 post
{ url: '/api/list', method: 'post', response({ body }) { ... } }
```

### 关键点
所有给 `useTableModel` / `useListModel` / `useTreeModel` 用的 mock 接口 **method 必须 'post'**。

### 来源
`vue-docs/frontpage.md` ⚠️ 强制段（数据模型 POST 强制）

---

## G006 · 树数据用错字段名

### 现象
- 树渲染出来但**节点文本不显示**（节点是空白的）
- 子节点不能展开

### 根因（来源：`frontpage.md` 树数据字段段）

> useTreeModel 期望的树节点字段为 **value 和 label**，children 为子节点数组。
> **常见错误**：不要使用 `id/text` 或 `id/name`，否则树文本不会显示。

### 修复

```js
// ❌ 错误的 mock 数据
[
  { id: 'cat-1', name: '设计', children: [...] },  // 用 id/name
  { id: 'cat-2', text: '施工' }                    // 用 id/text
]

// ✅ 正确
[
  { value: 'cat-1', label: '设计', children: [
    { value: 'cat-1-1', label: '电气设计' }
  ]},
  { value: 'cat-2', label: '施工' }
]
```

模板绑定也要同步：

```vue
<e-tree
  :data="model.typeTree.data"
  :field-names="{ value: 'value', label: 'label', children: 'children' }" />
```

### 关键点
mock 数据 + tree field-names + 后端接口字段必须**三者一致**用 `value` / `label`。

### 来源
`vue-docs/frontpage.md` § useTreeModel 树数据字段

---

## G007 · 业务弹窗用了内联 e-dialog

### 现象
弹窗逻辑混乱：
- 主页面 `<e-dialog v-model:visible="dialogVisible">` 嵌套着复杂表单
- 表单数据 / 关闭逻辑都在主页面，主页面变得很臃肿
- 多个弹窗共存时状态打架（dialogVisible1 / dialogVisible2 / ...）
- 表单复用困难

### 根因（来源：`dialog-interaction.md` § 2 强制约束）

> ❌ 内联 `<e-dialog>` 禁止使用：所有业务场景禁止使用此方式

业务弹窗应该是**独立 .vue 文件 + `$dialog` API 动态调用**。

### 修复

把弹窗内容拆到独立 `.vue`：

```js
// 主页面
import { h, defineAsyncComponent, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

const openAddDialog = (title) => {
  proxy?.$dialog(
    {
      title,
      width: 600,
      height: 500,
      closeCallback: (action) => {
        if (action === 'submit') model.gridList.refresh();
      }
    },
    () => h(defineAsyncComponent(() => import('./add.vue')))
  );
};
```

弹窗内 (`add.vue`) 用 `inject` 关闭：

```js
import { inject } from 'vue';
const getCurrentDialog = inject('getCurrentDialog');
const closeDialog = (action = 'close', data) => {
  getCurrentDialog()?.close(action === 'close' ? action : data);
};
```

### 关键点
**禁止**：
- 模板里 `<e-dialog v-model:open|visible>`
- `<DetailDialog v-model:visible>` 直接组件方式

### 来源
`vue-docs/dialog-interaction.md` § 2 + § 5

---

## G008 · 表格弹窗高度抖动

### 现象
表格弹窗（如明细查看）打开时，表格高度先很大再变小，外部出现滚动条。

### 根因（来源：`dialog-interaction.md` § 4.2.3）

`h-full` + `p-xl` 默认 `box-sizing: content-box`，高度计算后再加 padding 导致超出容器。

### 修复

加 `box-border` 类（`box-sizing: border-box`）：

```vue
<!-- ❌ 错误 -->
<ep-layout-manager class="h-full">
  <template #main>
    <div class="h-full p-xl">
      <ep-data-grid ... />
    </div>
  </template>
</ep-layout-manager>

<!-- ✅ 正确 -->
<ep-layout-manager class="h-full">
  <template #main>
    <div class="h-full p-xl box-border">     <!-- 加 box-border -->
      <ep-data-grid ... />
    </div>
  </template>
</ep-layout-manager>
```

### 关键点
表格弹窗 main 区域 padding 必须配 `box-border`，否则高度溢出。

### 来源
`vue-docs/dialog-interaction.md` § 4.2.3

---

## G009 · 表格 / 下拉直连接口（绕过 defineDataModel）

### 现象
- 表格搜索条件变化不刷新
- 翻页 / 排序失效
- 数据初始化时机不对（onMounted 时机错过）

### 根因
违反 `frontpage.md` ⚠️ 强制规范：

> 表格、下拉框、树组件**必须使用 defineDataModel 中的模型 Hook**，**禁止**直接用 `Utils.requestAxios`

```js
// ❌ 错误：手动管理表格数据
const tableData = ref([]);
const loadData = async () => {
  const res = await Utils.requestAxios({ url: '/api/list' });
  tableData.value = res.data;
};
onMounted(loadData);
```

### 修复

```js
// ✅ 表格用 useTableModel
const gridList = useTableModel('/api/list', { idField: 'id' });

// ✅ 下拉/列表用 useListModel
const typeOptions = useListModel('/api/typeOptions', { labelField: 'label' });

// ✅ 树用 useTreeModel
const typeTree = useTreeModel('/api/tree', { lazy: false });
```

### 关键点
**只有**增删改 / 文件流接口才用 `Utils.request` / `Utils.requestAxios`。
表格 / 下拉 / 树的查询接口**必须**走模型 Hook。

### 来源
`vue-docs/frontpage.md` § ⚠️ 强制规范

---

## G010 · params 用 ref 而不是 computed 导致搜索失效

### 现象
搜索条件变了但表格不刷新。

### 根因
`useTableModel` 的 `params` 字段如果不是 `computed`，传进去的是**静态对象**，框架监听不到变化。

### 修复

```js
// ❌ 错误：静态对象
const gridList = useTableModel('/api/list', {
  params: { ...searchParams.data }   // 静态，搜索失效
});

// ❌ 错误：reactive 但断了引用
const gridList = useTableModel('/api/list', {
  params: reactive({ ...searchParams.data })
});

// ✅ 正确：computed 保持响应式
const gridList = useTableModel('/api/list', {
  params: computed(() => ({
    ...searchParams.data,
    category: selectedCategory.value !== 'all' ? selectedCategory.value : undefined
  }))
});
```

### 关键点
`params` 必须是 `computed(() => ({ ... }))` 形式，让框架订阅依赖变化。

### 来源
`vue-docs/frontpage.md` § 搜索场景示例 + 真实任务沉淀

---

## G011 · 弹窗 .vue 没用 inject 关闭，结果按钮点了没反应

### 现象
弹窗"取消"/"确认"按钮点了，弹窗不关闭。

### 根因
弹窗 .vue 直接调 `dialogVisible.value = false`，但 `$dialog` API 动态创建的弹窗**不通过 v-model**控制可见性。

### 修复

```js
// ❌ 错误：本地 ref 控制
const visible = ref(true);
const onCancel = () => { visible.value = false; };

// ✅ 正确：通过 inject 拿到当前弹窗实例
import { inject } from 'vue';

const getCurrentDialog = inject('getCurrentDialog');

const closeDialog = (action = 'close', data) => {
  getCurrentDialog()?.close(action === 'close' ? action : data);
};

const onCancel = () => closeDialog('cancel');           // 父收到 undefined
const onSubmit = async () => {
  // ...
  if (state) closeDialog('submit', formData.value);     // 父收到 formData
};
```

### 关键点
`$dialog` API 动态创建的弹窗**只能通过 inject('getCurrentDialog') 关闭**。
不同 action 决定父页面 closeCallback 收到什么：
- `closeDialog()` 或 `closeDialog('close')` → 父收 `'close'`（直接关闭）
- `closeDialog('cancel')` → 父收 `undefined`（取消，不刷新）
- `closeDialog('submit', data)` → 父收 `data`（刷新触发）

### 来源
`vue-docs/dialog-interaction.md` § 3.3

---

## G012 · selectedRowKeys 散装 ref 导致选中跨页丢失

### 现象
表格翻页后已选择的行丢失。

### 根因
`selectedRowKeys` 在 `defineDataModel` 外面声明（散装 ref），跨页时框架内部状态与外部 ref 不同步。

### 修复

```js
// ❌ 错误：散装
const selectedRowKeys = ref([]);
const model = Utils.defineDataModel(() => {
  // ...
});

// ✅ 正确：在 defineDataModel 内部声明
const model = Utils.defineDataModel(() => {
  const selectedRowKeys = ref([]);
  return { models: { selectedRowKeys, gridList } };
});

// 模板里通过 model 访问
v-model:selectedRowKeys="model.selectedRowKeys"
```

### 关键点
所有跨组件 / 跨生命周期共享的状态都进 `defineDataModel`。

### 来源
真实任务沉淀（在多个 list 页都重现过）

---

## G013 · Dashboard / 看板绕过 defineDataModel 导致 model 未定义

### 现象
页面白屏，控制台报错：
```
TypeError: Cannot read properties of undefined (reading 'global')
```
常见触发点是模板写了 `v-loading="model.global.state.loading"`，但 `<script setup>` 里没有声明 `const model = Utils.defineDataModel(...)`。

### 根因
生成看板 / dashboard / metric 页面时误以为“没有表格就不用数据模型”，于是使用散装 `ref()` + `onMounted()` 请求数据；但 F10 页面骨架和 loading 状态仍依赖 `model.global`。

### 修复

```js
const { createSubModel, PageConfig, request } = Utils;

const model = Utils.defineDataModel(() => {
  const dashboardData = createSubModel({ total: 0, items: [] }, {
    refresh: async () => {
      const res = await request({ url: '/api/demo/dashboard/data', data: { params: {} } });
      if (res) Object.assign(dashboardData.data, res.data || res);
    },
    lazy: false
  });

  return {
    global: { pageConfig: new PageConfig({}) },
    models: { dashboardData }
  };
});

onMounted(() => {
  model.methods.initData();
});
```

### 关键点
所有页面类型都必须产出 `model` 根对象；看板主数据用 `createSubModel`，模板访问 `model.dashboardData.data.xxx`。

> **v0.4 补充**：`Utils.defineFrameModel` 与 `Utils.defineDataModel` 在数据模型规则中**等价合法**。如果页面结构特殊（无业务子模型）但仍需 `getPageConfig` / `getApiSecurityConfig` 自动请求，可用 `defineFrameModel` 替代。详见 `rules/data-model-rules.md` R11 与 `references/docs/getting-started/getting-started-use-data-model.md` § defineFrameModel。

### 来源
真实 AAR · 看板页面绕过 `defineDataModel` 导致白屏

---

## G014 · mockServerPlugin 误拦框架端点导致启动白屏

### 现象
业务页面还没进入业务接口就白屏，终端或网络面板出现框架端点 404，例如：
```
/resourceaction/getSysBoot
/auth/getAuthExpressions
/themedataaction/getThemeConfig
/themedataaction/getVueMenu
/api/v1/framevariable/getPageConfig
/apisecurityconfig/getApiSecurityConfig
```

### 根因
`mockServerPlugin` 按 `apiPrefix` 接管请求后，未匹配的 handler 返回 404，而不是自动放行给 Vite proxy。F10 主题 / 菜单 / 权限等框架端点数据结构复杂，手写简化 mock 容易缺字段。

### 修复

默认使用业务定向 mock 中间件，只拦截当前模块业务接口：

```js
function createBusinessMockMiddleware() {
  return {
    name: 'business-mock-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.includes('/api/<module>/')) return next();
        // 只处理 /api/<module>/，其他框架端点放行给 proxy
      });
    }
  };
}
```

### 关键点
不要为框架端点补简化 mock；默认策略是让框架端点继续走宿主 proxy / 官方 mock 服务。

### 来源
真实 AAR · `mockServerPlugin` 全前缀接管误拦 F10 框架端点

---

## G015 · F10 请求体是 form-encoded 导致 mock 解析失败

### 现象
业务 mock 中间件报解析错误：
```
SyntaxError: Unexpected token 'v', "viewstate=..." is not valid JSON
```

### 根因
F10 的 `Utils.request` / `requestAxios` 场景可能使用 `application/x-www-form-urlencoded`，请求体形如 `viewstate=xxx&params=yyy`，不能直接 `JSON.parse(body)`。

### 修复

```js
function parseBody(body = '') {
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    const data = {};
    for (const pair of body.split('&')) {
      const [rawKey, rawValue = ''] = pair.split('=');
      if (!rawKey) continue;
      const key = decodeURIComponent(rawKey);
      const value = decodeURIComponent(rawValue.replace(/\+/g, ' '));
      data[key] = value;
    }
    if (typeof data.params === 'string') {
      try { data.params = JSON.parse(data.params); } catch { /* keep string */ }
    }
    return data;
  }
}
```

### 关键点
业务 mock 中间件必须同时支持 JSON 与 form-encoded；接口文档也要注明请求体兼容这两种格式。

### 来源
### 来源
真实 AAR · F10 form-encoded 请求体导致 mock 解析失败；`references/docs/api/api-utilities-request.md` 请求方法对比

---

## 模板（新坑点用）

### G0XX · <一句话标题>

#### 现象
（用户能看见的症状）

#### 根因
（为什么）

#### 修复
```vue
<!-- 关键代码 -->
```

#### 关键点
（一两句概括）

#### 来源
- `vue-docs/<file>.md` § <section>
- 或 `任务：<日期 + 描述>`

---

## 维护

- **新增**：跑 `workflows/update-rules.md` AAR 时，**满足 2/3 门槛**才能进
- **修改**：随时改，但要在 CHANGELOG.md 记录原因
- **删除**：相关技术 deprecated 后直接删

> ⚠️ 不要把"会话日志"丢进来（违反 § 17 记录位置判断表）。
