# page/03-generate · 生成 .vue + 数据模型（v0.3 · 强制写入组件工程）

> **目的**：基于步骤 2 的 `template_picked`，把模板骨架"穿上"用户的 intent 字段，产出可运行的 .vue 文件。
> **v0.3 升级**：产出路径**强制**取自 `intent_resolved.target_view_dir`（来自 Phase 2 的组件工程），违反 = 触发 R11。

---

## 输入

- `intent_resolved`（来自步骤 1，**含 `target_view_dir` / `component_package`**）
- `template_picked`（来自步骤 2）

---

## 产出位置（v0.3 · 强制取自 intent_resolved.target_view_dir）

### 唯一路径来源

```
target_view_dir = <intent_resolved.component_package>/src/views/<module>/<appName>/
```

**禁止**：
- ❌ 硬编码到 `packages/examples/src/views/demo/page/...`（旧默认路径，违反组件包通用性）
- ❌ 写到 Web 工程的 `src/views/`（违反 R11，框架文档明确禁止）

### 文件清单

| 角色 | 路径 | 何时生成 |
| --- | --- | --- |
| 主列表 | `<target_view_dir><appName>-list.vue` | 总是生成 |
| 新增弹窗 | `<target_view_dir><appName>-add.vue` | `intent.hasFormDialog` |
| 编辑弹窗 | `<target_view_dir><appName>-edit.vue` | `intent.hasEditDialog` |
| 详情弹窗 | `<target_view_dir><appName>-detail.vue` | `intent.hasDetailDialog` |

### 写入前的强制校验

写入任何 `.vue` 之前，必须执行：

```javascript
// 伪代码
function preWriteCheck(intent) {
  // 1. component_package 不能为空
  assert(intent.component_package, 'STOP: project/00-detect.md 没有产出 component_package');

  // 2. target_view_dir 必须在 component_package 之下
  assert(intent.target_view_dir.startsWith(intent.component_package),
         'STOP: 目标目录不在组件工程之下，违反 R11');

  // 3. target_view_dir 不能含 Web 工程目录名
  const webPkgName = path.basename(intent.web_package || '');
  assert(!intent.target_view_dir.includes(webPkgName),
         `STOP: 目标目录包含 Web 工程名 ${webPkgName}，违反 R11`);

  // 4. Mock 门控：apiMode=mock 必须先看 mock 文件路径已规划
  if (intent.apiMode === 'mock') {
    assert(intent.target_mock_dir, 'STOP: apiMode=mock 但 target_mock_dir 未规划');
  }
}
```

任一项 fail → STOP，提示用户回到 `project/00-detect.md` 重选组件工程。

---

## 生成步骤（**严格按序**）

### Step 1 · 准备 import 清单

根据 intent 决定要 import 什么：

```js
// 必备
import { ref, computed, onMounted, onActivated, h, defineAsyncComponent, getCurrentInstance } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

// 按需（intent 命中才加）
import { Add, Delete, Edit, Search, Refresh, Setting, Upload, Download } from '@epoint-fe/eui-icons';  // 用前查 components-icon.md
```

**禁止**：
- ❌ import 不会用的图标 / 组件（lint 会报 unused）
- ❌ import 路径写绝对路径（`'/Users/.../eui-core'`）

### Step 2 · 拼装 `defineDataModel`

参考 `rules/data-model-rules.md` R1/R11。**所有页面类型都必须**声明 `const model = Utils.defineDataModel(...)`，包括 dashboard / kanban / metric / 看板页；按 intent 决定使用 `useTableModel` / `useListModel` / `useTreeModel` 或 `createSubModel`。

```js
const { useTreeModel, useTableModel, useListModel } = Hooks;
const { createSubModel, PageConfig, request } = Utils;

const pageConfig = new PageConfig({});

const model = Utils.defineDataModel(() => {
  const selectedRowKeys = ref([]);

  // 搜索条件子模型
  const searchParams = createSubModel(
    { logicOperator: 'and', conditions: [] },
    {
      update: (params) => {
        searchParams.data.conditions = params.conditions;
        searchParams.data.logicOperator = params.logicOperator;
      }
    }
  );

  // 选项列表（每个枚举字段一个）
  const reviewStateList = useListModel(`/api/${module}/${appName}/reviewStateOptions`, {
    labelField: 'label',
    lazy: false
  });

  // 主列表
  const gridList = useTableModel(`/api/${module}/${appName}/list`, {
    idField: 'id',
    lazy: false,
    params: computed(() => ({ ...searchParams.data }))
  });

  // 树（仅 hasTree 时加）
  const typeTree = useTreeModel(`/api/${module}/${appName}/tree`, {
    lazy: false
  });

  return {
    global: { pageConfig },
    models: { searchParams, reviewStateList, gridList, typeTree, selectedRowKeys }
  };
});
```

> URL 路径基于 `apiMode` 调整（详见 `04-mock.md` 接口路径表）。

#### 2.1 Dashboard / 看板页

没有表格时也必须使用数据模型：

```js
const { createSubModel, PageConfig, request } = Utils;

const model = Utils.defineDataModel(() => {
  const dashboardData = createSubModel(
    { cards: [], charts: [] },
    {
      refresh: async () => {
        const res = await request({ url: `/api/${module}/${appName}/dashboard`, data: { params: {} } });
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

### Step 3 · 拼装模板（template）

#### 3.1 单一列表（无树）

```vue
<template>
  <ep-layout-manager class="fui-page" v-loading="model.global.state.loading">
    <template #top>
      <e-toolbar title-block>
        <template #title>
          <e-toolbar-title :title="<intent.appName 中文化的标题>" />
        </template>
        <template #button>
          <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="4" config-id="toolbar-btns" />
        </template>
        <template #actions>
          <e-toolbar-more :table-ref="tableRef" :model="model" />
        </template>
        <template #filter="{ opened }">
          <e-toolbar-search
            ref="toolbarSearchRef"
            :search-list="searchList"
            :is-open="opened"
            @advance-search="onAdvanceSearch"
            configurable
            config-id="toolbar-search" />
        </template>
      </e-toolbar>
    </template>

    <template #main>
      <div class="h-full pb-xl bg-white">
        <ep-data-grid
          ref="tableRef"
          :id-field="model.gridList.idField"
          :data="model.gridList.data"
          :total="model.gridList.total"
          :current="model.gridList.current"
          :page-size="model.gridList.pageSize"
          :columns="columnList"
          :loading="model.gridList.loading"
          v-model:selectedRowKeys="model.selectedRowKeys"
          :show-index-column="true"
          :show-selection-column="true"
          :default-show-index="true"
          @change="model.gridList.change"
          @refresh="model.gridList.refresh"
          configurable
          config-id="datagrid"
          :key="tableKey">
          <template #bodyCell="{ column, text, record }">
            <!-- 自定义单元格根据 intent.fields 决定 -->
          </template>
        </ep-data-grid>
      </div>
    </template>
  </ep-layout-manager>
</template>
```

#### 3.2 列表 + 树

把上面的 `<ep-layout-manager>` 加一个 `:left-config` 与 `<template #left>`：

```vue
<ep-layout-manager class="fui-page" :left-config="leftConfig" v-loading="model.global.state.loading">
  <template #left>
    <div class="eui-list-side-tree">
      <div class="tree-header">
        <div class="tree-title">分类</div>
      </div>
      <e-scrollbar class="tree-content">
        <e-tree
          ref="treeRef"
          v-model:selected-keys="selectedKeys"
          :data="model.typeTree.data"
          :field-names="{ value: 'value', label: 'label', children: 'children' }"
          show-filter
          filter-placeholder="搜索"
          @select="onTreeSelect" />
      </e-scrollbar>
    </div>
  </template>

  <template #top>...</template>
  <template #main>...</template>
</ep-layout-manager>
```

`leftConfig`：
```js
const leftConfig = {
  enabled: true,
  defaultWidth: '240px',
  minWidth: '180px',
  maxWidth: '480px',
  toggle: true,
  resize: true
};
```

### Step 4 · 拼装弹窗调用

仅当 `hasFormDialog` / `hasEditDialog` / `hasDetailDialog` 为真时加：

```js
import { h, defineAsyncComponent, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

const openAddDialog = (title) => {
  proxy?.$dialog(
    {
      title,
      width: 600,
      height: 500,
      contentPadding: false,
      closeCallback: (action) => {
        if (action === 'submit') model.gridList.refresh();
      }
    },
    () => h(defineAsyncComponent(() => import(`./${appName}-add.vue`)))
  );
};

const openEditDialog = (title, rowGuid) => {
  proxy?.$dialog(
    { title, width: 600, height: 500, contentPadding: false,
      closeCallback: (action) => { if (action === 'submit') model.gridList.refresh(); } },
    () => h(defineAsyncComponent(() => import(`./${appName}-edit.vue`)), { rowGuid })
  );
};

const openDetailDialog = (title, rowGuid) => {
  proxy?.$dialog(
    { title, width: 600, height: 400, contentPadding: false },
    () => h(defineAsyncComponent(() => import(`./${appName}-detail.vue`)), { rowGuid })
  );
};
```

### Step 5 · 生成弹窗 .vue 文件（独立）

#### add.vue 骨架

```vue
<template>
  <ep-layout-manager class="h-full">
    <template #main>
      <e-scrollbar class="flex-1">
        <ep-form ref="formRef" class="p-xl" :model="formData" :rules="rules" label-position="top">
          <!-- 根据 intent.fields 生成 ep-form-item -->
          <ep-form-item label="名称" prop="name">
            <ep-input v-model="formData.name" placeholder="请输入" maxlength="50" show-word-limit />
          </ep-form-item>
        </ep-form>
      </e-scrollbar>
    </template>
    <template #bottom>
      <div class="flex justify-end px-xl py-m" style="border-top: 1px dashed var(--e-border-color-brand-light)">
        <e-button @click="onCancel">取消</e-button>
        <e-button type="primary" class="ml-m" :loading="submitting" @click="onSubmit">确认</e-button>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

defineOptions({ name: '<AppName>Add' });

const getCurrentDialog = inject('getCurrentDialog');
const closeDialog = (action = 'close', data) => {
  getCurrentDialog()?.close(action === 'close' ? action : data);
};

const formRef = ref(null);
const formData = ref({ /* 根据 intent.fields */ });
const rules = { /* 根据 intent.fields */ };
const submitting = ref(false);

const onCancel = () => closeDialog('cancel');
const onSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) return;
  submitting.value = true;
  try {
    const { state, message } = await Utils.request({
      url: '/api/<module>/<appName>/add',
      data: { params: { ...formData.value } }
    });
    EMessage({ message, type: state ? 'success' : 'error' });
    if (state) closeDialog('submit', formData.value);
  } finally {
    submitting.value = false;
  }
};
</script>
```

#### edit.vue / detail.vue 类似 add.vue，只是：
- edit 多 `props: rowGuid` + `onMounted` 拉数据填充
- detail 移除提交按钮，所有 form-item 用 `disabled`

### Step 6 · 写完后逐条自检（v0.4 加 validate-page.mjs 强制 gate）

#### 6.0 · 静态校验强制 gate（v0.4 新增 · 跳过 = STOP）

**生成 .vue 完成后第一动作**：对每个写入的 `.vue` 跑：

```bash
node epoint-f10code-gen/scripts/validate-page.mjs <生成的 .vue 绝对路径>
```

退出码处理：

| 退出码 | 含义 | 处置 |
| --- | --- | --- |
| 0 | 完全合规（含仅 warning 的情况） | 通过，进 6.1 |
| 1 | 有 violations | **STOP**，按 violations 提示回头修；通常需要回 02-match-template.md 重选模板，或对照 `rules/data-model-rules.md` R11 修正 |

校验项覆盖：CS-R1/R5/R9/R10、DM-R1、DM-R11.1~R11.4（数据模型全页面通用约束）、CU-R2/R4、ST-R2/R10。

#### 6.1 · 通用规则清单

- [ ] R1~R10 (`rules/coding-standards.md`)
- [ ] R1~R11 (`rules/data-model-rules.md`)
- [ ] R1~R10 (`rules/component-usage-rules.md`)
- [ ] R1~R10 (`rules/style-rules.md`)
- [ ] **R11** (`rules/project-rules.md`) · 业务分层约束：
  - [ ] 所有写入的 `.vue` 文件绝对路径以 `<component_package>/src/views/` 开头
  - [ ] 绝对路径**不含** Web 工程目录名（如 `web-show` / `demo-web`）
  - [ ] 路径里的 `<appName>` 部分和 `intent_resolved.appName` 一致
- [ ] **Mock 门控**（apiMode=mock 时）：
  - [ ] 已规划 `target_mock_dir` 且 step4 即将跑（或已跑）
  - [ ] `.vue` 中 `useTableModel` / `useListModel` / `useTreeModel` / `Utils.request` 的 URL 都列入了 mock 接口清单
- [ ] **接口一致性预声明**（给 step4 用）：把本步骤产出的所有 URL 收集到 `generated_urls` 列表中
- [ ] **数据模型全页面通用门控**（v0.4 由 validate-page.mjs 自动校验，此处人工复核）：
  - [ ] 模板出现 `model.` 时，script 中有 `const model = Utils.defineDataModel(...)` 或 `Utils.defineFrameModel(...)`（DM-R11.1）
  - [ ] 使用数据模型的页面，`onMounted` 中必须调用 `model.methods.initData()`（DM-R11.2）
  - [ ] 主数据加载（表格 / 树 / 下拉 / 看板主体）禁止用散装 `ref + onMounted + request`（DM-R11.3）
  - [ ] 引用 `model.global.pageConfig.xxx` 或 `model.pageConfig.xxx` 时，必须有 `pageConfig: new PageConfig({...})`（DM-R11.4）

任一失败 → 回头修，**不要放过让用户自己发现**。

### Step 7 · 产出接口 URL 清单（v0.3 新增 · 给 04-mock.md 校验用）

写完 .vue 后，扫描所有 `useTableModel`/`useListModel`/`useTreeModel`/`Utils.request` 调用，提取 URL 列入：

```yaml
generated_urls:
  - { url: '/api/<m>/<a>/list', usedBy: useTableModel, file: <list.vue 绝对路径>, line: <行号> }
  - { url: '/api/<m>/<a>/info', usedBy: Utils.request, file: <edit.vue 绝对路径>, line: <行号> }
  - { url: '/api/<m>/<a>/<field>Options', usedBy: useListModel, file: <list.vue 绝对路径>, line: <行号> }
  - { url: '/api/<m>/<a>/tree', usedBy: useTreeModel, file: <list.vue 绝对路径>, line: <行号> }
  - { url: '/api/<m>/<a>/add', usedBy: Utils.request, file: <add.vue 绝对路径>, line: <行号> }
  - { url: '/api/<m>/<a>/update', usedBy: Utils.request, file: <edit.vue 绝对路径>, line: <行号> }
  - { url: '/api/<m>/<a>/delete', usedBy: Utils.request, file: <list.vue 绝对路径>, line: <行号> }
```

这份清单**逐字传给** `04-mock.md` 做接口一致性校验。

---

## 输出契约（v0.3 加 generated_urls）

```yaml
generated_files:
  - path: <绝对路径>                     # 必须在 component_package 下
    role: list | add | edit | detail
    template_source: <来源模板路径>
    intent_fields_mapped: [<哪些 intent 字段被映射到了哪里>]
generated_urls:                          # ★ v0.3 新增
  - { url: <string>, usedBy: <string>, file: <string>, line: <int> }
self_check_passed: <bool>
r11_compliance: <bool>                   # ★ v0.3 新增·R11 业务分层校验
```

---

## ✓ 检验句

- [ ] 每个生成的 .vue 都有 `defineOptions({ name: ... })`
- [ ] 主页面**最外层**是 `<ep-layout-manager>`
- [ ] 弹窗 .vue 用 `inject('getCurrentDialog')` 关闭
- [ ] 表格 / 树 / 下拉**全部**通过 `model.<name>.data` 取数据，**没有**散装 `ref([])` + `requestAxios`
- [ ] Dashboard / 看板 / 指标页主数据也通过 `createSubModel` 进入 `model`，没有散装 `ref + onMounted request`
- [ ] 没有 `<el-` 前缀（Element 残留）
- [ ] 没有 `v-model:visible` / `v-model:open` 控制业务弹窗
- [ ] **(v0.3)** 所有 .vue 绝对路径以 `<component_package>/src/views/` 开头，**不含** Web 工程目录名
- [ ] **(v0.3)** apiMode=mock 时已产出 `generated_urls` 清单
- [ ] **(v0.3)** 路径里的 `<appName>` 与 `intent_resolved.appName` 一致

---

_步骤 3 完成 → 进 `04-mock.md`（apiMode=mock 必跑；apiMode=restful/proxy 跳过 mock 但仍要校验）。_
