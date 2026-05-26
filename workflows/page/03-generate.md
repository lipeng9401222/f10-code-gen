# page/03-generate · 生成 .vue + 数据模型

> **目的**：基于步骤 2 的 `template_picked`，把模板骨架"穿上"用户的 intent 字段，产出可运行的 .vue 文件。

---

## 输入

- `intent_resolved`（来自步骤 1）
- `template_picked`（来自步骤 2）

---

## 产出位置（监控当前模式）

### 模式 A · examples 包内零成本演示（**默认**）

监控目录：`packages/examples/src/views/demo/page/<module>/<appName>/`

文件清单：
- `<appName>-list.vue`（主列表）
- `<appName>-add.vue`（如果 `hasFormDialog`）
- `<appName>-edit.vue`（如果 `hasEditDialog`）
- `<appName>-detail.vue`（如果 `hasDetailDialog`）

### 模式 B · 已有 web 工程内

目录：`<workspace>/<webApp>/src/views/<module>/<appName>/`（同上文件结构）

### 模式 C · 全新工程

`eui-cli ws/web` 完毕后回到模式 B。

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

参考 `rules/data-model-rules.md` R1。**强制**包含以下 Hook（按 intent 决定个数）：

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

### Step 6 · 写完后逐条自检

- [ ] R1~R10 (`rules/coding-standards.md`)
- [ ] R1~R10 (`rules/data-model-rules.md`)
- [ ] R1~R10 (`rules/component-usage-rules.md`)
- [ ] R1~R10 (`rules/style-rules.md`)

任一失败 → 回头修，**不要放过让用户自己发现**。

---

## 输出契约

```yaml
generated_files:
  - path: <绝对路径>
    role: list | add | edit | detail
    template_source: <来源模板路径>
    intent_fields_mapped: [<哪些 intent 字段被映射到了哪里>]
self_check_passed: <bool>
```

---

## ✓ 检验句

- [ ] 每个生成的 .vue 都有 `defineOptions({ name: ... })`
- [ ] 主页面**最外层**是 `<ep-layout-manager>`
- [ ] 弹窗 .vue 用 `inject('getCurrentDialog')` 关闭
- [ ] 表格 / 树 / 下拉**全部**通过 `model.<name>.data` 取数据，**没有**散装 `ref([])` + `requestAxios`
- [ ] 没有 `<el-` 前缀（Element 残留）
- [ ] 没有 `v-model:visible` / `v-model:open` 控制业务弹窗

---

_步骤 3 完成 → 进 `04-mock.md`。_
