---
title: 使用编码模型
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/use-data-model/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/use-data-model/)

在统一编码模型中，框架对页面的数据请求写法进行了规范，并进一步封装了表单控件，对接编码模型中表单字段的验证和权限能力。

对于页面中控件数据模型的操作，我们在 `@epframe/eui-core` 包中提供了 `defineDataModel` 方法。该方法参照
[Pinia 的 Setup Store](https://pinia.vuejs.org/zh/core-concepts/#setup-stores) 设计，参数是一个函数，返回一个对象，该对
象包含了数据模型的定义和操作。

## 核心 API

### defineDataModel（页面数据模型）

#### 类型定义

```ts
type FunctionType = (...args: unknown[]) => unknown;
type ObjectType = Record<string, unknown>;
type ArrayType = string[] | number[] | boolean[] | ObjectType[];
type LifecycleHooks = {
  onBeforeInitConfig?: (model: ModelReturn) => void;
  onAfterInitConfig?: (model: ModelReturn) => void;
  onBeforeInitData?: (model: ModelReturn) => void;
  onAfterInitData?: (model: ModelReturn) => void;
};
type PageConfigData<T extends ObjectType = ObjectType> = {
  framevariable?: ObjectType;
  pageConfig?: ObjectType;
  autoTransferToBody?: ObjectType;
  [key: string]: unknown;
} & T;
type SecurityConfigParams = ObjectType;
type State = ObjectType;
type GlobalType<
  TState extends State = State,
  TPageConfig extends ObjectType = ObjectType
> = {
  securityConfig?: SecurityConfigParams;
  pageConfig?: PageConfig<TPageConfig>;
  state?: TState;
};

type ModelsValueType = Ref<string | number | boolean | ObjectType | ArrayType> | ObjectType;
type ModelOptions<
  TState extends State = State,
  TPageConfig extends ObjectType = ObjectType,
  TModels extends Record<string, ModelsValueType> = Record<string, ModelsValueType>,
  TMethods extends Record<string, FunctionType> = Record<string, FunctionType>
> = {
  global?: GlobalType<TState, TPageConfig>;
  hooks?: LifecycleHooks;
  models: TModels;
  methods?: {
    initData?: FunctionType;
  } & TMethods;
};

type ModelReturn<
  TState extends State = State,
  TPageConfig extends ObjectType = ObjectType,
  TModels extends Record<string, ModelsValueType> = Record<string, ModelsValueType>,
  TMethods extends Record<string, FunctionType> = Record<string, FunctionType>
> = {
  models: TModels;
  methods: {
    initData: (...args: unknown[]) => unknown;
    showConfigPanel: () => void;
    getCodeItemConfig: (path: string) => { exclude?: string; include?: string } | undefined;
    registerHook: (hookName: keyof LifecycleHooks, callback: FunctionType) => void;
  } & TMethods;
  global: {
    state: {
      loading: boolean;
      validateOnRuleChange: boolean;
    } & TState;
    pageConfig: {
      pageConfig?: ObjectType;
      framevariable?: ObjectType;
    } & TPageConfig;
    securityConfig?: {
      rules?: ObjectType;
      toolRules?: ObjectType;
      codeItem?: ObjectType;
    };
  };
  data: {
    [key: string]: ObjectType | ObjectType[];
  };
};

type defineDataModel = <
  TState extends State,
  TPageConfig extends ObjectType = ObjectType,
  TModels extends Record<string, ModelsValueType>,
  TMethods extends Record<string, FunctionType>
>(
  options: ModelOptions<TState, TModels, TMethods>
) => ModelReturn<TState, TModels, TMethods>;
```

#### 参数说明

`options` 参数包含以下配置项：

- `global`：全局配置选项
  - `pageConfig`: 用于配置页面请求接口的自定义参数。可以通过以下两种方式使用:
    1. 传入由 [PageConfig 类](#PageConfig 类) 创建的对象：对象中可包含 `variableCategory`、`requestUrl` 等字段，其中 `requestUrl` 用于指定自定义的请求接口地址。若不指定 `requestUrl`，则使用框架默认的配置请求接口
    2. 若不传，则不发送页面配置请求
  - `securityConfig`: 向安全配置请求接口提交的参数，请求会合并 `pageConfig` 和 `securityConfig` 中的参数作为请求参数。若合并后的参数中不包含 `apiUrl` 字段，则不会发送安全配置请求。
  - `state`: 自定义的页面初始化状态
- `hooks`：生命周期钩子函数，用于在关键时机执行自定义逻辑
- `models`：定义页面所需的子数据模型
- `methods`：定义页面所需的方法，其中 `initData` 方法用于实现页面数据的初始化逻辑

#### 返回值说明

该方法返回一个对象，包含：

- `global`：全局配置
  - `state`：包含加载状态、校验状态等页面状态，以及上面参数中自定义的初始化状态
  - `pageConfig`：页面配置请求返回的数据，以及上面参数中自定义的 `pageConfig` 数据
  - `securityConfig`：安全配置请求返回的数据，以及上面参数中自定义的 `securityConfig` 数据
- `models`：包含所有已定义的子数据模型
- `methods`：包含所有已定义的方法，以及以下内置方法：
  - `initData`：用于初始化页面数据，接收组件实例和自定义参数，需要在 `onMounted` 中调用
  - `showConfigPanel`：[打开页面配置面板](./configurable.md#组件使用规范)
  - `registerHook`：动态注册生命周期钩子
  - `getCodeItemConfig`：获取代码项过滤配置
- `data`：用于快速访问数据源，可通过 `data.模型名` 直接获取对应模型中的数据源 `models.模型名.data` 数据

同时为了方便开发者读取 `models` 中的数据模型，我们给返回的对象做了一层代理，可直接通过 `model.模型名` 来访问 `models` 中的数据模型。即 `model.models.模型名` 可简化为 `model.模型名`。

### createSubModel（普通子模型）

#### 类型定义

```ts
type CreateModelOptions<TData> = {
  refresh?: () => TData | Promise<TData> | undefined;
} & ObjectType;

type createSubModel = <TData extends Record<string, unknown>, TOptions extends CreateModelOptions<TData>>(
  data: TData,
  options?: TOptions
) => {
  data: Reactive<TData>;
} & TOptions;
```

#### 参数说明

- `data`：子模型的初始数据对象。该对象会被自动转换为响应式数据返回，以实现数据变更的自动更新。
- `options`：子模型的配置参数对象，包含以下配置项：
  - `refresh`：用于初始化和刷新子模型数据的方法。该方法可以返回一个数据对象，返回的数据会被自动合并到子模型的 `data` 中。支持同步和异步方式返回数据。如果不返回数据，则需要自己在方法内部去更新模型数据。
  - `lazy`：控制子模型初始化时机的标识。默认为 `false`，表示在调用页面模型的 `initData` 方法时会自动执行子模型的 `refresh` 方法进行数据初始化。设置为 `true` 时则需要手动调用 `refresh` 方法来初始化数据。

#### 返回值说明

该方法返回值为子模型对象，包含以下字段：

- `data`：子模型的响应式数据对象
- 参数 `options` 中的所有字段会被合并到子模型对象中

### 特殊子模型（useListModel/useTreeModel/useTableModel）

#### 说明

为了简化下拉列表、树形结构和表格这三种常见数据模型的开发，框架在 `@epoint-fe/eui-hooks` 包中提供了专门的模型定义方法：

- `useListModel`: 用于下拉列表数据模型
- `useTreeModel`: 用于树形结构数据模型
- `useTableModel`: 用于表格数据模型

这三个方法的参数配置与对应的数据源方法（`useDataSource`、`useTreeDataSource` 和 `useTableDataSource`）完全一致。在返回值
方面，除了包含数据源方法的所有功能外，还额外提供了 `lazy` 配置项，用于控制数据初始化的时机。当 `lazy` 设置为 `true` 时，
会变成懒加载，数据在页面模型 `initData` 调用时不会自动调用，而需要自己在合适的时机调用 `loadData` 方法来初始化数据。

与普通数据源方法的主要区别在于初始化时机：这三个特殊模型方法不会立即执行数据加载，而是将数据初始化的时机统一交由页面模型
的 `initData` 方法来控制，以实现更好的数据加载管理。

```js
// model.js
export const modelOptions = () => {
  const userGuid = ref('');

  const formModel = createSubModel({
    sex: '',
    ouGuid: '',
    ouName: '',

  },
  {
    // 自己的初始化方法
    refresh: () => {
      return request({
        url: `/frameuserlist/getFrameUser`,
        data: {
          params: {
            conditions: [
              {
                path: 'userguid',
                type: 'EQ',
                value: userGuid.value
              }
            ]
          }
        }
      });
    }
  });
  const sexModel = Hooks.useListModel('/api/code/getByCodeName?codeName=性别', {
    labelField: 'text',
    lazy: true // 懒加载
  });
  const treeModel = Hooks.useTreeModel('/frameuserlist/getTreeModel', {
    requestType: 'restful'
  });

  return {
    models: {
      formModel,
      sexModel,
      treeModel,
      userGuid
    }
  };
}
```

```vue
<template>
  <ep-form :model="models">
    <!-- e-form-item 需改成 ep-form-item -->
    <ep-form-item label="性别：">
      <!-- e-select 需改成 ep-select -->
      <ep-select
        v-model="models.formModel.data.sex"
        :options="models.sexModel.options"
        :loading="model.sexModel.loading"
        @visible-change="models.sexModel.loadData"
      />
    </ep-form-item>
    <ep-form-item label="部门：">
      <!-- e-tree-select 需改成 ep-tree-select -->
      <ep-tree-select
        v-model="models.formModel.data.ouGuid"
        v-model:text="models.formModel.data.ouName"
        :data="models.treeModel.data"
        :field-names="models.treeModel.fieldNames"
        :load-more="models.treeModel.loadMore"
      />
    </ep-form-item>
  </ep-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';
import { modelOptions } from './model.js';

const model = Utils.definedDataModel(modelOptions);

const models = model.models;

// 数据初始化前准备好模型需要的 userGuid 数据
model.methods.registerHook('onBeforeInitData', () => {
  model.models.userGuid = '123';
});
// 页面初始化时调用
onMounted(() => {
  model.methods.initData();
});
</script>
```

#### 使用注意事项

> **⚠️ 警告**
>
> 由于 [组合式函数只能在 `<script setup>` 或 `setup()` 钩子中被调用](https://cn.vuejs.org/guide/reusability/composables.html#usage-restrictions)，所以若用到了上面三个特殊模型定义方法，我们模型的创建不能直接写在一个 js 文件里。例如下面这种用法是不允许的：
> 
> ```js
> // model.js
> export const model = Utils.defineDataModel(() => {
>   const treeModel = Hooks.useTreeModel('/frameuserlist/getTreeModel', {
>     requestType: 'restful'
>   });
>   return {
>     models: {
>       treeModel
>     }
>   };
> });
> ```
> 
> ```vue
> <script setup lang='ts'>
> import { model } from './model.js';
> </script>
> ```
> 
> 而是必须要在 `<script setup>` 中调用 `defineDataModel` 来创建模型对象，而创建模型对象的参数可以写到一个 js 文件里。例如：
> 
> ```js
> // model.js
> export const modelOptions = () => {
>   const treeModel = Hooks.useTreeModel('/frameuserlist/getTreeModel', {
>     requestType: 'restful'
>   });
>   return {
>     models: {
>       treeModel
>     }
>   };
> };
> ```
> 
> ```vue
> <script setup lang='ts'>
> import { modelOptions } from './model.js';
> 
> const model = Utils.defineDataModel(modelOptions);
> </script>
> ```

### defineFrameModel（框架数据模型）

若页面结构特殊、无需完整的「页面数据模型」，却仍要享用框架的「页面配置」与「安全配置」能力（即自动发起 pageConfig 与 securityConfig 请求），可直接使用 `defineFrameModel`，省去数据模型定义。

#### 类型定义

```ts
type FrameModelLifecycleHooks = {
  onBeforeInitConfig?: (model: ModelReturn) => void;
  onAfterInitConfig?: (model: ModelReturn) => void;
};
type FrameModelOptions<
  TState extends State = State,
  TPageConfig extends ObjectType = ObjectType
> = {
  global?: GlobalType<TState, TPageConfig>;
  hooks?: FrameModelLifecycleHooks;
};

type FrameModelReturn<
  TState extends State = State,
  TPageConfig extends ObjectType = ObjectType
> = {
  global: {
    state: {
      loading: boolean;
      validateOnRuleChange: boolean;
    } & TState;
    pageConfig: {
      pageConfig?: ObjectType;
      framevariable?: ObjectType;
    } & TPageConfig;
    securityConfig?: {
      rules?: ObjectType;
      toolRules?: ObjectType;
      codeItem?: ObjectType;
    };
  };
  methods: {
    initData: (...args: unknown[]) => unknown;
    showConfigPanel: () => void;
    registerHook: (hookName: keyof LifecycleHooks, callback: FunctionType) => void;
    updateState: ((state: State) => void) | ((key: string, value: unknown) => void);
    getCodeItemConfig: (path: string) => { exclude?: string; include?: string } | undefined;
  };
};

type defineFrameModel = <
  TState extends State,
  TPageConfig extends ObjectType = ObjectType
>(
  globalConfig: GlobalType<TState, TPageConfig> & {
    autoLoad?: boolean;
  },
  hooks?: FrameModelLifecycleHooks
) => FrameModelReturn<TState, TModels>;
```

#### 参数说明

- `globalConfig`：全局配置选项。与 [defineDataModel](#defineDataModel（页面数据模型）) 的 `options.global` 参数完全一致。
- `hooks`：生命周期钩子。支持 `onBeforeInitConfig` 和 `onAfterInitConfig` 两个钩子。

#### 返回值说明

该方法返回一个对象，包含：

- `global`：全局配置
  - `state`：包含加载状态、校验状态等页面状态，以及上面参数中自定义的初始化状态
  - `pageConfig`：页面配置请求返回的数据，以及上面参数中自定义的 `pageConfig` 数据
  - `securityConfig`：安全配置请求返回的数据，以及上面参数中自定义的 `securityConfig` 数据
- `methods`：包含所有已定义的方法，以及以下内置方法：
  - `initData`：用于初始化页面数据，接收组件实例和自定义参数，需要在 `onMounted` 中调用
  - `showConfigPanel`：[打开页面配置面板](./configurable.md#组件使用规范)
  - `registerHook`：动态注册生命周期钩子
  - `getCodeItemConfig`：获取代码项过滤配置

### PageConfig 类

为简化“把 pageConfig 中的部分数据随请求回传服务端”这一常见操作，框架提供 PageConfig 类。只需在构造时声明需回传的字段路径，即可一键提取回传数据，无需手动拼装。

#### 类型定义

```ts
class PageConfig<T extends Record<string, unknown>> {
  data: PageConfigData<T>;
  constructor(initialData: T, options: { postBackKeys: string[] }) {};
  /**
   * 获取所有数据
   */
  getAll() => PageConfigData<T>;
  /**
   * 获取标记为 postBack 的数据
   */
  getPostBack() => Partial<PageConfigData<T>>;
  /*
   *  动态添加 postBack 标记
   */
  addPostBackKeys(keys: string[]) => void;
  /*
   * 检查路径是否被标记
   */
  isPostBack(path: string) => boolean;
}
```

#### 构造函数

构造函数包含两个参数：

- `initialData`：pageConfig 的初始配置数据。
- `options.postBackKeys`：需要回传的字段配置。支持直接配字段名路径（'path.field'）, `*` 通配符（'path.*'）和 `!` 排除（'!path.field'） 格式。

#### 方法说明

- `getAll`：获取所有数据。
- `getPostBack`：获取标记为 postBack 的数据。
- `addPostBackKeys`：动态添加 postBack 标记。
- `isPostBack`：检查路径是否被标记为 postBack。

#### 使用实例

```ts
const pageConfig = new PageConfig(
  {
    title: 'Hello World',
    user: {
      name: 'John Doe',
      age: 30
    }
  },
  {
    postBackKeys: ['title', 'user.*', '!user.age']
  }
);

// 获取所有数据
console.log(pageConfig.getAll());
// 输出: { title: 'Hello World', user: { name: 'John Doe', age: 30 } }

// 获取 postBack 数据
console.log(pageConfig.getPostBack());
// 输出: { title: 'Hello World', user: { name: 'John Doe' } }

// 检查路径是否为 postBack
console.log(pageConfig.isPostBack('user.age'));
// 输出: false
```

## 使用指南

### 模型初始化

#### 基础初始化

页面的初始化逻辑需要自己在 `defineDataModel` 的参数函数中实现，并通过 `initData` 这个名字返回给 `defineDataModel`。

```js
const model = Utils.defineDataModel(() => {
  const title = ref('');
  const initData = async () => {
    // 初始化逻辑
    title.value = await getTitle();
  };

  return {
    models: {
      title
    },
    methods: {
      initData
    }
  };
});
```

然后在页面中的 `onMounted` 钩子中调用 `model.methods.initData()` 方法来执行初始化。

```js
// 页面初始化时调用
onMounted(() => {
  model.methods.initData();
});
```

#### 子模型初始化

也可以通过 `createSubModel` 方法创建子模型，并将初始化逻辑直接放到子模型自己的 `refresh` 方法中，在调用
`model.methods.initData()` 方法时，内部会自动执行子模型的 `refresh` 方法来初始化子模型数据。

```js
const modelOptions = () => {
  const titleModel = createSubModel(
    {
      title: ''
    },
    {
      // 子模型的数据初始化逻辑直接定义在 refresh 方法中
      async refresh() {
        return await getTitle();
      }
    }
  );

  return {
    models: {
      titleModel
    }
  };
};
```

#### 初始化流程说明

1. 触发 `onBeforeInitConfig` 事件钩子
2. 发送 `getPageConfig` 和 `getApiSecurityConfig` 请求获取页面配置和安全配置
3. 触发 `onAfterInitConfig` 事件钩子
4. 触发 `onBeforeInitData` 事件钩子
5. 执行模型参数传递过来的 `initData` 方法
6. 遍历子模型，执行所有不为 `lazy` 的子模型的 `refresh` 方法
7. 触发 `onAfterInitData` 事件钩子
8. 初始化页面可配置能力

### 页面配置

`defineDataModel` 返回的初始化方法 `initData` 内部会自动发送两个获取配置信息的请求（框架内置的，不需要开发者自己实现，这
里只是做说明），分别是：

- `getPageConfig` 请求获取页面配置
- `getApiSecurityConfig` 请求获取页面安全配置。

#### getPageConfig 配置

对于 `getPageConfig` 请求，我们可以配置 `variableCategory` 和 `customParams` 两个提交参数，配置方式是在
`defineDataModel` 方法参数函数中定义 `global.pageConfig` 变量，它是一个 [PageConfig](#PageConfig_lei) 实例对象。pageConfig 对象的 `variableCategory` 属性会被赋值给变
量`variableCategory`，其他 pageConfig 中的属性会被赋值给 `customParams`。正常开发情况下不需要关注，当特殊场景需要提交额外参数时才需要配置。

内部实现部分代码如下：

```js
await request({
  url: '/api/v1/framevariable/getPageConfig',
  data: JSON.stringify({
    entities: [
      {
        variableCategory: pageConfig.variableCategory ?? []
      }
    ],
    customParams: omit(pageConfig, ['variableCategory', 'requestUrl'])
  })
});
```

`getPageConfig` 请求返回的数据会自动赋值给 `global.pageConfig` 变量，我们可以通过 `global.pageConfig` 变量来获取页面配置
数据。

```js
const pageConfig = new PageConfig({
  variableCategory: ['soa'],
  taskCode: ''
});
const model = defineDataModel(() => {
  const initData = async () => {
    // 初始化逻辑
  };

  return {
    global: {
      pageConfig
    },
    methods: {
      initData
    }
  };
};

// 可以从 model.pageConfig 获取到页面配置数据
const frameVariable = model.global.pageConfig.framevariable;
```

#### getApiSecurityConfig 配置

对于 `getApiSecurityConfig` 请求，它的提交参数是在 `defineDataModel` 方法参数函数中定义的 `global.pageConfig` 和
`global.securityConfig` 变量合并出来的大对象。当合并出来的大对象中未设置 `apiUrl` 变量时，将不会发送
`getApiSecurityConfig` 请求。

`getApiSecurityConfig` 请求返回的数据会自动赋值给 `global.securityConfig` 变量，我们可以通过 `global.securityConfig` 变
量来获取安全配置数据。

```js
const model = Utils.defineDataModel(() => {
  // 给 getApiSecurityConfig 请求的 customParams 参数
  const securityConfig = {
    apiUrl: 'rest/frameuserlist/addUser'
  };

  const initData = async () => {
    // 初始化逻辑
  };

  return {
    global: {
      securityConfig
    },
    methods: {
      initData
    }
  };
});
// 可以从 model.global.securityConfig 获取到页面安全配置数据
const rules = model.global.securityConfig.rules;
```

### 生命周期钩子

#### 钩子列表

初始化过程中，我们提供了如下事件钩子：

- `onBeforeInitConfig`：获取**页面配置请求发送前**的钩子
- `onAfterInitConfig`：获取页面配置请求**发送后**的钩子
- `onBeforeInitData`：获取**页面数据请求发送前**的钩子
- `onAfterInitData`：获取页面数据请求**发送后**的钩子

#### 使用方式

这些事件钩子可以在 `defineDataModel` 方法参数函数中定义，也可以在页面中通过 `methods.registerHook` 方法动态添加。

```js
const model = Utils.defineDataModel(() => {
  const initData = async () => {
    // 初始化逻辑
  };

  // 可以在 defineDataModel 方法参数函数中定义事件钩子
  const onBeforeInitConfig = () => {
    // 获取页面配置请求发送前的钩子
  };

  return {
    methods: {
      initData
    },
    hooks: {
      onBeforeInitConfig
    }
  };
});
// 也可以在 defineDataModel 方法返回的 registerHook 方法添加事件钩子
// 需要注意的是需要在调用 model.methods.initData() 方法前添加事件钩子
model.methods.registerHook('onAfterInitConfig', (model) => {
  // 获取页面配置请求发送后的钩子
});
```

## HTML 写法区别

在 `@epframe/eui-core` 包中，对 `@epoint-fe/eui-components` 组件库中的组件进行了扩展对接编码模型能力，并将组件 name 更新
为 `ep-xxx` 形式。所以在页面中使用组件时，需要使用 `ep-xxx` 形式的组件 name。

```vue
<template>
  <!-- e-form 需改成 ep-form -->
  <ep-form :model="model">
    <!-- e-form-item 需改成 ep-form-item -->
    <ep-form-item label="标题文字：" prop="title">
      <!-- e-input 需改成 ep-input -->
      <ep-input v-model="model.title" />
    </ep-form-item>
    <ep-form-item label="显示分享按钮：">
      <!-- e-switch 需改成 ep-switch -->
      <ep-switch v-model="model.showShare" />
    </ep-form-item>
  </ep-form>
</template>
```

<details>
<summary>目前支持验证和权限的表单项有</summary>

| 表单项            | ep-xxx 使用写法      |
| ----------------- | -------------------- |
| `EAutocomplete`   | `ep-autocomplete`    |
| `ECascader`       | `ep-cascader`        |
| `ECascaderPanel`  | `ep-cascader-panel`  |
| `ECheckbox`       | `ep-checkbox`        |
| `ECheckboxButton` | `ep-checkbox-button` |
| `ECheckboxGroup`  | `ep-checkbox-group`  |
| `EColorPicker`    | `ep-color-picker`    |
| `EDatePicker`     | `ep-date-picker`     |
| `EInput`          | `ep-input`           |
| `EInputNumber`    | `ep-input-number`    |
| `EInputTag`       | `ep-input-tag`       |
| `EMention`        | `ep-mention`         |
| `ERadio`          | `ep-radio`           |
| `ERadioButton`    | `ep-radio-button`    |
| `ERadioGroup`     | `ep-radio-group`     |
| `ERate`           | `ep-rate`            |
| `ESelect`         | `ep-select`          |
| `ESlider`         | `ep-slider`          |
| `ESwitch`         | `ep-switch`          |
| `ETimePicker`     | `ep-time-picker`     |
| `ETimeSelect`     | `ep-time-select`     |
| `ETransfer`       | `ep-transfer`        |
| `ETreeSelect`     | `ep-tree-select`     |

</details>

## 使用示例

### 列表页面

<details>
<summary>用户管理列表页面 list.vue 案例</summary>

```vue
<template>
  <e-container class="fui-page -scroll-head" v-loading="model.global.state.loading" :class="autoHeight ? 'auto-h' : ''">
    <e-container>
      <!-- 顶部标题区域 -->
      <e-header>
        <e-toolbar>
          <template #button>
            <e-toolbar-btns
              ref="toolbarBtnsRef"
              :items="toolbarBtnList"
              configurable
              :max-display-count="4"
              config-id="toolbar-btns"
            />
          </template>
          <template #filter="{ opened }">
            <e-toolbar-search
              ref="toolbarSearchRef"
              :site-top="toolbarTopRef"
              :site-side="toolbarRightRef"
              :search-list="searchList"
              :is-open="opened"
              @advance-search="onAdvanceSearch"
              configurable
              config-id="toolbar-search"
              config-url="/rest/frameuserlist/getUserPageResult"
            />
          </template>

          <template #actions>
            <e-toolbar-more
              :table-ref="tableRef"
              :model="model"
              :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'"
            >
              <template #tip-content>
                <p>通过'导出'按钮导出的组织架构数据无法通过'模板化导入按钮'导入, 请使用'模板化导出'按钮导出后再导入;</p>
                <p>拖拽排序功能只支持部门内操作,需要打开搜索框勾选直属用户选项</p>
              </template>
            </e-toolbar-more>
          </template>
        </e-toolbar>
      </e-header>
      <!-- 正文区域 -->
      <e-container ref="tableStickyContainerRef">
        <div ref="toolbarTopRef"></div>
        <e-container>
          <!-- 左侧树 -->
          <e-left>
            <e-tree
              ref="treeRef"
              height="100%"
              v-model:expanded-keys="model.ouTree.expandedKeys"
              :data="model.ouTree.data"
              show-filter
              :load-more="model.ouTree.loadMore"
              :filter-method="model.ouTree.filterMethod"
              :field-names="model.ouTree.fieldNames"
              @select="onOuNodeClick"
            />
          </e-left>
          <!-- 右侧内容 -->
          <e-main>
            <e-content>
              <data-grid
                ref="tableRef"
                :sticky-container="tableStickyContainerRef"
                :proxy="proxy"
                :model="model"
                :auto-height="autoHeight"
                show-selection-column
                v-model:selectedRowKeys="model.selectedRowKeys"
                :data="model.userList.data"
                :total="model.userList.total"
                :current="model.userList.current"
                :page-size="model.userList.pageSize"
                :columns="columnList"
                :loading="model.userList.loading"
                :id-field="model.userList.idField"
                @change="model.userList.change"
                @refresh="model.userList.refresh"
                config-panel-name="表格"
                config-id="datagrid"
                configurable
                :key="tableKey"
              >
                <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'zt'">
                    <e-tag :type="text === '启用' ? 'success' : 'danger'" effect="light" round>{{ text }}</e-tag>
                  </template>
                  <template v-else-if="column.dataIndex === 'jzqk'">
                    <e-button
                      link
                      @click="openSecond(record)"
                      :class="`jzqk ${text === '有兼职' ? 'issecond' : 'nosecond'}`"
                      >{{ text }}</e-button
                    >
                  </template>
                </template>
              </data-grid>
            </e-content>
          </e-main>
        </e-container>
      </e-container>
    </e-container>
    <!-- 固定在侧边 -->
    <div ref="toolbarRightRef"></div>
  </e-container>

  <e-dialog
    v-model="dialogVisible"
    :title="subDialogTitle"
    :content-padding="0"
    :width="dialogSize.width"
    :height="dialogSize.height"
  >
    <edit
      v-if="dialogVisible"
      :is-edit="!!curUserGuid && !isCopy"
      :is-copy="isCopy"
      :ou-guid="curOuGuid"
      :ou-name="curOuName"
      :user-guid="curUserGuid"
      @save="updateFrameUser"
      @cancel="dialogVisible = false"
    />
  </e-dialog>

  <e-dialog v-model="importDialogVisible" title="用户导入" :width="dialogSize.width" height="400">
    <import v-if="importDialogVisible" @save="updateFrameUser" @cancel="importDialogVisible = false" />
  </e-dialog>

  <e-dialog destroy-on-close v-model="moveDialogVisible" title="移动用户" :width="400" :height="dialogSize.height">
    <move
      v-if="moveDialogVisible"
      :selected-row-keys="model.selectedRowKeys"
      @save="moveUserCallBack"
      @cancel="moveDialogVisible = false"
    />
  </e-dialog>

  <e-dialog v-model="stepDialogVisible" title="排序步长" :width="600" :height="400">
    <stepSize v-if="stepDialogVisible" @save="stepSizeCallBack" @cancel="stepDialogVisible = false" />
  </e-dialog>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, onActivated, nextTick, ref, watch } from 'vue';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';
import { DataGrid, Utils, Hooks } from '@epframe/eui-core';

import { Refresh, Setting, Sort, SortDown, SortUp } from '@epoint-fe/eui-icons';

import Edit from './components/edit.vue';
import Import from './components/import.vue';
import Move from './components/selectou.vue';
import StepSize from './components/selectstepsize.vue';

const { useTreeModel, useTableModel } = Hooks;
const { createSubModel, getRightUrl, getUrlParams, request, createToolbarList, PageConfig } = Utils;

const pageConfig = new PageConfig({
  variableCategory: ['soa'],
  taskCode: ''
});
const model = Utils.defineDataModel(() => {
  const selectedRowKeys = ref([]); // 表格选中行 id
  const ouGuid = ref(''); // 左侧树选中节点 id
  const ouName = ref('');
  const searchParams = createSubModel(
    {
      logicOperator: 'and',
      conditions: []
    },
    {
      update: (params) => {
        searchParams.data.conditions = params.conditions;
        searchParams.data.logicOperator = params.logicOperator;
      }
    }
  ); // 页面搜索条件
  const sortConfig = ref([]);

  const userList = useTableModel('/frameuserlist/getUserPageResult', {
    idField: 'userguid',
    requestType: 'restful',
    params: computed(() => {
      return {
        ...searchParams.data,
        sortOrders: [...sortConfig.value],
        extendConditions: [
          {
            path: 'ouguid',
            type: ouGuid.value ? 'EQ' : 'NQ',
            value: ouGuid.value
          }
        ]
      };
    })
  }); // 表格数据

  const ouTree = useTreeModel('/frameuserlist/getTreeModel', {
    requestType: 'restful'
  }); // 左侧树数据

  const saveAll = (modifiedData) => {
    return request({
      url: 'frameuserlist/saveAll',
      data: {
        entities: modifiedData
      }
    });
  };

  const deleteSelected = () => {
    return request({
      url: '/frameuserlist/deleteById',
      data: {
        params: {
          ids: selectedRowKeys.value
        }
      }
    });
  };

  const setUserEnable = () => {
    return request({
      url: '/frameuserlist/setUserEnable',
      data: {
        params: {
          ids: selectedRowKeys.value
        }
      }
    });
  };

  const setUserSyncThirdParty = () => {
    return request({
      url: '/frameuserlist/setUserSyncThirdParty',
      data: {
        params: {
          ids: selectedRowKeys.value
        }
      }
    });
  };

  const rePassword = (selected) => {
    return request({
      url: '/frameuserlist/rePassword',
      data: {
        params: {
          ids: [selected.userguid]
        }
      }
    });
  };

  const moveUser = (selected) => {
    return request({
      url: '/frameuserlist/moveUser',
      data: {
        params: {
          ids: selectedRowKeys.value
        },
        customParams: {
          transferOuGuid: selected,
          transferOuName: ''
        }
      }
    });
  };

  return {
    global: {
      pageConfig
    },
    hooks: {
      onAfterInitConfig: (state) => {
        Utils.logger.debug('onAfterInitConfig', state);
        sortConfig.value = state.global.pageConfig?.pageConfig['datagrid-sort']?.sortConfig || [];
      }
    },
    models: {
      userList,
      selectedRowKeys,
      ouGuid,
      ouName,
      searchParams,
      ouTree
    },
    methods: {
      saveAll,
      deleteSelected,
      setUserEnable,
      setUserSyncThirdParty,
      rePassword,
      moveUser
    }
  };
});
// #region 计算属性
// 页面配置
const frameVariable = computed(() => model.global.pageConfig.framevariable ?? {});

const autoHeight = ref(false);
// 表格是否有选中行
const isSelected = computed(() => model.selectedRowKeys.length);

// 弹窗大小
const dialogSize = computed(() => ({
  width: Math.min(window.innerWidth, 960),
  height: Math.min(window.innerHeight, 700)
}));
// #endregion 计算属性

// #region 变量
const isSub = getUrlParams('isSub');
const currentInstance = getCurrentInstance();
const { proxy } = currentInstance;

const treeRef = ref();
const tableRef = ref();
const tableStickyContainerRef = ref(null);

// toolbar 搜索
const toolbarSearchRef = ref(null);
const toolbarTopRef = ref(null);
const toolbarRightRef = ref(null);

const toolbarBtnsRef = ref(null);

const toolbarBtnList = ref([
  {
    type: 'primary',
    onClick: async () => newRow(),
    content: '新增用户'
  },
  {
    control: 'buttonGroup',
    content: '导入导出',
    items: [
      {
        onClick: async () => openImport(),
        content: '导入'
      },
      {
        control: 'dataExport',
        grid: tableRef,
        fileName: '用户列表',
        exportAction: 'frameuserlist/export',
        getColumns: async () => {
          const columns = await request({
            url: '/frameuserlist/getExportModel'
          });
          return columns.data;
        },
        params: computed(() => {
          return {
            leftTreeNodeGuid: model.ouGuid
          };
        }),
        content: '导出'
      }
    ]
  },
  {
    onClick: async () => saveAll(),
    content: '保存'
  },
  {
    type: 'danger',
    plain: true,
    onClick: async () => deleteSelected(),
    disabled: () => !isSelected.value,
    content: '删除选定'
  },
  {
    type: 'primary',
    plain: true,
    onClick: async () => setUserEnable(),
    disabled: () => !isSelected.value,
    content: '启用/禁用'
  },
  {
    type: 'primary',
    plain: true,
    onClick: async () => moveUser(),
    disabled: () => !isSelected.value,
    content: '移动'
  },
  {
    type: 'primary',
    plain: true,
    onClick: async () => addStepSize(),
    disabled: () => !model.ouGuid,
    content: '调整排序步长'
  },
  {
    type: 'primary',
    plain: true,
    onClick: async () => moveUserRole(),
    disabled: () => !isSelected.value,
    content: '转移用户角色'
  },
  {
    type: 'primary',
    plain: true,
    onClick: async () => setUserSyncThirdParty(),
    disabled: () => !isSelected.value,
    content: '授权/取消同步第三方'
  }
]);

const searchList = ref([
  {
    label: '全部',
    field: 'searchField',
    fieldType: 'string',
    type: 'mixSearch', // 复合搜索
    default: true,
    operation: 'LIKE',
    operations: ['EQ', 'NQ', 'LIKE', 'NOTLIKE'],
    data: [
      { label: '用户姓名', value: 'displayname' },
      { label: '用户登录名', value: 'loginid' }
    ]
  },

  {
    label: '用户姓名',
    field: 'displayname',
    fieldType: 'string',
    default: true,
    type: 'input',
    operation: 'LIKE',
    operations: ['EQ', 'NQ', 'LIKE']
  },
  {
    label: '用户登录名',
    field: 'loginid',
    fieldType: 'string',
    type: 'input',
    default: true,
    operation: 'LIKE',
    operations: ['EQ', 'NQ', 'LIKE']
  },
  {
    label: '状态',
    field: 'isenabled',
    fieldType: 'string',
    dataType: 'select',
    type: 'select',
    default: false,
    operation: 'EQ',
    operations: ['EQ', 'NQ'],
    data: [
      {
        label: '启用',
        value: '1'
      },
      {
        label: '禁用',
        value: '0'
      }
    ]
  }
]);

// 表格相关
const curUserGuid = ref();
const operateItems = computed(() =>
  frameVariable.value['soa.enableSOA']
    ? {}
    : {
        dataIndex: 'action',
        title: '操作',
        width: 240,
        key: 'action',
        hidden: false,
        action: {
          asText: true,
          items: [
            {
              icon: 'Edit',
              label: '编辑',
              onClick: (row) => {
                editRow(row);
              }
            },
            {
              icon: 'CopyDocument',
              label: '复制',
              onClick: (row) => {
                copyRow(row);
              }
            },
            {
              icon: 'Refresh',
              label: '初始化密码',
              onClick: (row) => {
                rePassword(row);
              }
            },
            {
              icon: 'Setting',
              label: 'USB设置',
              onClick: (row) => {
                keySet(row);
              }
            },
            {
              icon: 'MessageBox',
              label: '模块订阅',
              onClick: (row) => {
                selectModule(row);
              }
            },
            {
              icon: 'Setting',
              label: '配置角色',
              onClick: (row) => {
                selectRole(row);
              }
            },
            {
              icon: 'ChatDotRound',
              label: '复制用户角色模块关系',
              onClick: (row) => {
                copyRight(row);
              }
            }
          ]
        }
      }
);
const displayNameItems = computed(() =>
  frameVariable.value['soa.enableSOA']
    ? {
        dataIndex: 'displayname',
        title: '用户姓名',
        hidden: false,
        ellipsis: true,
        sorter: true,
        width: 150
      }
    : {
        dataIndex: 'displayname',
        title: '用户姓名',
        width: 150,
        hidden: false,
        ellipsis: true,
        sorter: true,
        editor: {
          type: 'e-input',
          props: {
            maxlength: 50
          }
        }
      }
);
const orderItems = computed(() =>
  frameVariable.value['soa.enableSOA']
    ? {
        dataIndex: 'ordernumber',
        title: '排序',
        width: 100,
        hidden: false,
        sorter: true
      }
    : {
        dataIndex: 'ordernumber',
        title: '排序',
        width: 100,
        hidden: false,
        sorter: true,
        editor: { type: 'e-input-number', props: { min: 0, max: 99999999 } }
      }
);
const columnList = ref([
  displayNameItems.value,
  {
    dataIndex: 'loginid',
    title: '用户登录名',
    width: 150,
    hidden: false,
    ellipsis: true,
    sorter: true,
    resizable: true
  },
  {
    dataIndex: 'ouname',
    title: '所在部门',
    ellipsis: true,
    hidden: false
  },
  {
    dataIndex: 'framemj',
    title: '涉密等级',
    ellipsis: true,
    hidden: false,
    width: 100
  },
  {
    dataIndex: 'jzqk',
    title: '兼职',
    ellipsis: true,
    hidden: false,
    width: 80
  },
  { dataIndex: 'zt', title: '状态', width: 100, hidden: false },
  orderItems.value,
  operateItems.value
]);

// 弹窗
const dialogVisible = ref(false);
const importDialogVisible = ref(false);
const moveDialogVisible = ref(false);
const stepDialogVisible = ref(false);
const subDialogTitle = ref('修改用户');
const isCopy = ref(false);
const curOuName = ref('');
const curOuGuid = ref('');
// #endregion 变量

// #region 监听
// 监听页面配置数据变化
watch(frameVariable, (newVal) => {
  Utils.logger.debug('framevariable change：', newVal);
});
// #endregion 监听

// #region 方法、事件
/**
 * 左侧树部门点击方法 <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button>
 * @param selectedKeys
 */
const onOuNodeClick = (selectedKeys) => {
  const key = selectedKeys[0];
  model.ouGuid = key === 'f9root' ? '' : key;
  model.ouName = key === 'f9root' ? '' : treeRef.value?.getNodes([key])?.[0]?.text;
  if (tableStickyContainerRef.value) {
    tableStickyContainerRef.value.rootEl.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动
    });
  }
};
/**
 * 新增用户
 */
const newRow = () => {
  curUserGuid.value = '';
  curOuGuid.value = model.ouGuid;
  curOuName.value = model.ouName;
  dialogVisible.value = true;
  isCopy.value = false;
  subDialogTitle.value = '新增用户';
};
/**
 * 复制用户
 * @param row
 */
const copyRow = (row) => {
  curUserGuid.value = row.userguid;
  curOuGuid.value = row.ouguid;
  curOuName.value = row.ouname;
  isCopy.value = true;
  subDialogTitle.value = '复制用户';
  dialogVisible.value = true;
};
/**
 * 编辑行
 * @param row 行数据
 */
const editRow = (row) => {
  curUserGuid.value = row.userguid;
  curOuGuid.value = row.ouguid;
  curOuName.value = row.ouname;
  dialogVisible.value = true;
  isCopy.value = false;
  subDialogTitle.value = '修改用户';
};

/**
 * 兼职设定
 */
const openSecond = (row) => {
  const url = getRightUrl(`framemanager/orga/orga/user/framesecondoulist?userGuid=${row.userguid}&isSub=${isSub}`);
  const handler = proxy?.$dialog({
    title: '用户兼职设定',
    url,
    width: 950,
    height: 550
  });
};
/**
 * 初始化密码
 * @param selected
 */
const rePassword = async (selected) => {
  await model.methods.rePassword(selected);
  refreshTable();
};
/**
 * USB设置
 */
const keySet = async (row) => {
  if (row.iscopy === 1) {
    EMessageBox.alert('关联账号不允许这么操作', '提示', { type: 'warning' });
  } else {
    const url = getRightUrl(`framemanager/orga/orga/user/usbkeyset?userGuid=${row.userguid}&isSub=${isSub}`);
    const handler = proxy?.$dialog({
      title: 'USB 设置',
      url,
      width: 600,
      height: 550
    });
  }
};

/**
 * 模块订阅
 * @param row
 */
const selectModule = async (row) => {
  let tUrl = `framemanager/orga/uiset/menu/module/subscribemodule/subscribemoduletree?userGuid=${row.userguid}`;
  if (isSub && isSub == '1') {
    tUrl = `framemanager/orga/uiset/menu/module/sub/subsubscribemoduletree?userGuid=${row.userguid}`;
  }
  const url = getRightUrl(tUrl);
  const handler = proxy?.$dialog({
    title: '订阅模块',
    url,
    width: 1000,
    height: 800
  });
};

/**
 * 配置角色
 * @param row
 */
const selectRole = async (row) => {
  const url = getRightUrl(`framemanager/orga/orga/user/settinguserrole?userGuid=${row.userguid}&isSub=${isSub}`);
  const handler = proxy?.$dialog({
    title: '设置用户角色关系',
    url,
    width: 710,
    height: 490,
    closeCallback: (params) => {
      if (params !== 'close' && params !== '') {
        refreshTable();
      }
    }
  });
};

/**
 * 复制用户角色模块关系
 * @param row
 */
const copyRight = async (row) => {
  const url = getRightUrl(
    `framemanager/orga/orga/user/frameuserroleandmodulecopylist?isSub=${isSub}&userGuid=${row.userguid}`
  );
  const handler = proxy?.$dialog({
    title: '复制用户角色模块权限',
    url,
    width: 1250,
    height: 580,
    closeCallback: (params) => {
      if (params !== 'close' && params !== '') {
        refreshTable();
      }
    }
  });
};

/**
 * 刷新表格
 */
const refreshTable = () => {
  tableRef.value && tableRef.value.refresh();
  // model.userList.refresh();
};

/**
 * 获取表格修改的数据
 */
const getModifiedData = () => {
  return tableRef.value && tableRef.value.getModifiedData();
};

/**
 * 保存所有修改
 */
const saveAll = async () => {
  const modifiedData = getModifiedData();
  await model.methods.saveAll(modifiedData);
  refreshTable();
};
/**
 * 删除选中行
 */
const deleteSelected = (selected) => {
  EMessageBox.confirm('数据删除后不可恢复', '删除提醒', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await model.methods.deleteSelected(selected);
    refreshTable();
  });
};

/**
 * 启用/禁用
 * @param selected
 */
const setUserEnable = async (selected) => {
  await model.methods.setUserEnable(selected);
  refreshTable();
};

/**
 * 授权/取消同步第三方
 */
const setUserSyncThirdParty = async (selected) => {
  await model.methods.setUserSyncThirdParty(selected);
  refreshTable();
};
/**
 * 调整排序步长
 */
const addStepSize = async () => {
  curUserGuid.value = model.selectedRowKeys;
  stepDialogVisible.value = true;
};

/**
 * 打开导入弹窗
 */
const openImport = () => {
  curUserGuid.value = '';
  importDialogVisible.value = true;
};
/**
 * 搜索条件变化
 * @param params 搜索条件
 */
const onAdvanceSearch = (params) => {
  Utils.logger.debug('onAdvanceSearch');
  Utils.logger.debug(params);
  model.searchParams.update(params);
};
/**
 * 编辑弹窗的保存
 */
const updateFrameUser = (res) => {
  //如果没有res.success则当做成功
  if (res && res.success === false) {
    return;
  }
  refreshTable();
  dialogVisible.value = false;
  importDialogVisible.value = false;
};
/**
 * 刷新页面
 */
const refreshTab = () => {
  window.__E_VUE_APP__?.TabsNav ? window.__E_VUE_APP__.TabsNav.refreshTabContent() : window.location.reload();
};
/**
 * 移动用户
 */
const moveUser = async () => {
  curUserGuid.value = model.selectedRowKeys;
  moveDialogVisible.value = true;
};
const moveUserCallBack = () => {
  refreshTable();
  moveDialogVisible.value = false;
};
/**
 * 转移用户角色
 */
const moveUserRole = async () => {
  if (model.selectedRowKeys.length > 1) {
    EMessage.warning('请勿选择多条记录！');
    return;
  }
  const url = getRightUrl(
    `framemanager/orga/orga/role/userroleselect?userGuid=${model.selectedRowKeys}&isSub=${isSub}`
  );
  proxy?.$dialog({
    title: '设置用户角色关系',
    url,
    width: 710,
    height: 490,
    closeCallback: (params) => {
      if (params !== 'close' && params !== '') {
        refreshTable();
      }
    }
  });
};

const stepSizeCallBack = (stepSize) => {
  model.methods.addStepSize(stepSize);
  refreshTable();
  stepDialogVisible.value = false;
};
// #endregion 方法、事件

// #region 生命周期
onMounted(() => {
  model.methods.initData(currentInstance);
});

// 解决第二次进入页面表格样式错乱的问题，根源是 keep-alive缓存列宽不会重新计算导致的
const tableKey = ref(0);

onActivated(() => {
  tableKey.value++;
});

model.methods.registerHook('onAfterInitData', (state) => {
  Utils.logger.debug('onAfterInitData:', state);
});
// #endregion 生命周期
</script>

<style lang="less" scoped>
.zt-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 12px;

  &.success {
    background-color: var(--e-color-success);
  }

  &.error {
    background-color: var(--e-color-error);
  }
}

.jzqk {
  &.issecond {
    color: #e03f3f !important;
  }

  &.nosecond {
    color: #000000 !important;
  }
}

.page-type-select {
  margin-left: 8px;
}
</style>
```

</details>

### 表单场景

在编码模型中，我们提供了服务端控制表单字段的**验证和权限**的能力。要使用该能力，需要在页面中使用 `ep-form` 组件，并将数
据模型 `model` 绑定到 `ep-form` 组件上。

<details>
<summary>用户管理列表编辑页面 edit.vue 案例</summary>

```vue
<template>
  <e-container class="fui-page fui-dialog">
    <e-container>
      <e-main>
        <ep-form
          ref="frameUserFormRef"
          :model="frameUserForm.data"
          :security-config="model.global.securityConfig"
          :rules="model.global.securityConfig.rules.frameuser"
          :tool-rules="model.global.securityConfig.toolRules.frameuser"
          :attach-rules="model.global.securityConfig.attach"
          :validate-on-rule-change="model.global.state.validateOnRuleChange"
          label-width="120px"
        >
          <e-collapse v-model="openedItems" v-loading="model.global.state.loading" class="user-edit" show-index>
            <e-collapse-item name="1" :title="t('userinfo.basicinfo')" opened>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.loginid')" prop="loginid">
                    <ep-input v-model="frameUserForm.data.loginid" :placeholder="t('userinfo.placeholder.loginid')" />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.displayname')" prop="displayname">
                    <ep-input
                      v-model="frameUserForm.data.displayname"
                      :placeholder="t('userinfo.placeholder.displayname')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.belongou')" prop="ouguid">
                    <e-tree-select
                      v-model="frameUserForm.data.ouguid"
                      v-model:text="frameUserForm.data.ouname"
                      v-model:expanded-keys="models.ouTree.expandedKeys"
                      :data="models.ouTree.data"
                      :cache-data="ouTreeCacheData"
                      :field-names="models.ouTree.fieldNames"
                      :load-more="models.ouTree.loadMore"
                      show-filter
                      :placeholder="t('userinfo.placeholder.belongou')"
                      :filter-method="model.ouTree.filterMethod"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.secondou')" prop="otherouguid">
                    <e-tree-select
                      v-model="frameUserForm.data.otherouguid"
                      v-model:expanded-keys="models.partOuTree.expandedKeys"
                      :data="models.partOuTree.data"
                      :cache-data="ouTreeCacheData"
                      :field-names="models.partOuTree.fieldNames"
                      :load-more="models.partOuTree.loadMore"
                      :check-strictly="true"
                      multiple
                      show-filter
                      checkable
                      :filter-method="model.partOuTree.filterMethod"
                      :placeholder="t('userinfo.placeholder.secondou')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.leader')">
                    <e-button-edit
                      clearable
                      v-model="frameUserForm.data.leaderguid"
                      v-model:text="frameUserForm.data.leadername"
                      popup-url="/framemanager/orga/orga/ou/selectouuser"
                      @close="onButtonEditClose"
                      :placeholder="t('userinfo.placeholder.leader')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.job')">
                    <e-button-edit
                      v-model="frameUserForm.data.joblist"
                      v-model:text="frameUserForm.data.jobnames"
                      :popup-url="jobPopupUrl"
                      @close="onButtonEditClose2"
                      :placeholder="t('userinfo.placeholder.job')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.telephoneoffice')" prop="telephoneoffice">
                    <ep-input
                      v-model="frameUserForm.data.telephoneoffice"
                      :placeholder="t('userinfo.placeholder.telephoneoffice')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.shortmobile')" prop="userextendinfo.shortmobile">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.shortmobile"
                      :desensitization-type="DESENDATATYPE_INTELLIGENCE"
                      maxlength="50"
                      clearable
                      :placeholder="t('userinfo.placeholder.shortmobile')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.telephonehome')" prop="telephonehome">
                    <ep-input
                      v-model="frameUserForm.data.telephonehome"
                      :desensitization-type="DESENDATATYPE_MOBILE_PHONE"
                      clearable
                      :placeholder="t('userinfo.placeholder.telephonehome')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.mobile')" prop="mobile">
                    <ep-input
                      v-model="frameUserForm.data.mobile"
                      :desensitization-type="DESENDATATYPE_MOBILE_PHONE"
                      :placeholder="t('userinfo.placeholder.mobile')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.ordernumber')" prop="ordernumber">
                    <e-input-number
                      v-model="frameUserForm.data.ordernumber"
                      :min="0"
                      :max="99999999"
                      :placeholder="t('userinfo.placeholder.ordernumber')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.usbkey')" prop="userextendinfo.usbkey">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.usbkey"
                      maxlength="100"
                      show-word-limit
                      :placeholder="t('userinfo.placeholder.usbkey')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.sex')" prop="sex">
                    <e-radio-group v-model="frameUserForm.data.sex">
                      <e-radio :value="t('userinfo.man')">{{ t('userinfo.man') }}</e-radio>
                      <e-radio :value="t('userinfo.woman')">{{ t('userinfo.woman') }}</e-radio>
                    </e-radio-group>
                  </ep-form-item>
                  <!-- <ep-form-item :label="性别" prop="sex">
              <e-select v-model="frameUserForm.data.sex" placeholder="选择您的性别" :options="model.sexInfo.dataSource" :loading="model.sexInfo.loading" @visible-change="model.sexInfo.loadData" />
            </ep-form-item> -->
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.adloginid')">
                    <ep-input
                      v-model="frameUserForm.data.adloginid"
                      maxlength="200"
                      show-word-limit
                      :placeholder="t('userinfo.placeholder.adloginid')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.hiredate')">
                    <e-date-picker
                      v-model="frameUserForm.data.hiredate"
                      type="date"
                      value-format="YYYY-MM-DD"
                      :placeholder="t('userinfo.placeholder.hiredate')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.expirationtime')">
                    <e-date-picker
                      v-model="frameUserForm.data.expirationtime"
                      :disabled-date="disabledDate"
                      type="date"
                      value-format="YYYY-MM-DD"
                      :placeholder="t('userinfo.placeholder.expirationtime')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.issyncthirdparty')">
                    <e-radio-group v-model="frameUserForm.data.issyncthirdparty">
                      <e-radio :value="1">{{ t('userinfo.yes') }}</e-radio>
                      <e-radio :value="0">{{ t('userinfo.no') }}</e-radio>
                    </e-radio-group>
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.zhiwu')">
                    <ep-input
                      v-model="frameUserForm.data.title"
                      maxlength="200"
                      show-word-limit
                      :placeholder="t('userinfo.placeholder.zhiwu')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <!-- <e-row :gutter="20">
          <e-col :span="12">
            <ep-form-item v-if="isSheMi" :label="密级选择">
              <e-select v-model="frameUserForm.data.framemj" v-model:text="frameUserForm.data.framemj_text" :options="dataSource" :loading="isSelectLoading" @visible-change="loadData" />
            </ep-form-item>
          </e-col>
        </e-row> -->
            </e-collapse-item>
            <e-collapse-item name="2" :title="t('userinfo.extendinfo')" opened>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.birthday')" prop="userextendinfo.birthday">
                    <e-date-picker
                      v-model="frameUserForm.data.userextendinfo.birthday"
                      type="date"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      :placeholder="t('userinfo.placeholder.birthday')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.idcard')" prop="userextendinfo.identitycardnum">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.identitycardnum"
                      :desensitization-type="DESENDATATYPE_ID_CARD"
                      clearable
                      :placeholder="t('userinfo.placeholder.idcard')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.qqnumber')" prop="userextendinfo.qqnumber">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.qqnumber"
                      maxlength="100"
                      show-word-limit
                      :desensitization-type="DESENDATATYPE_INTELLIGENCE"
                      clearable
                      :placeholder="t('userinfo.placeholder.qqnumber')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.description')">
                    <ep-input
                      v-model="frameUserForm.data.description"
                      maxlength="200"
                      show-word-limit
                      :placeholder="t('userinfo.placeholder.description')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.email')" prop="email">
                    <ep-input
                      v-model="frameUserForm.data.email"
                      maxlength="50"
                      show-word-limit
                      :desensitization-type="DESENDATATYPE_EMAIL"
                      @change="onEmailChange"
                      clearable
                      :placeholder="t('userinfo.placeholder.email')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.address')">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.postaladdress"
                      maxlength="200"
                      show-word-limit
                      :desensitization-type="DESENDATATYPE_ADDRESS"
                      @change="onpostalChange"
                      clearable
                      :placeholder="t('userinfo.placeholder.address')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.postalcode')" prop="userextendinfo.postalcode">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.postalcode"
                      :placeholder="t('userinfo.placeholder.postalcode')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.fax')" prop="fax">
                    <ep-input
                      v-model="frameUserForm.data.fax"
                      :desensitization-type="DESENDATATYPE_INTELLIGENCE"
                      clearable
                      :placeholder="t('userinfo.placeholder.fax')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.ntx_extnumber')">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.ntx_extnumber"
                      maxlength="100"
                      show-word-limit
                      :placeholder="t('userinfo.placeholder.ntx_extnumber')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.ntx_pwd')">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.ntx_password"
                      maxlength="100"
                      show-word-limit
                      :placeholder="t('userinfo.placeholder.ntx_pwd')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.officeaddress')">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.officeaddress"
                      maxlength="50"
                      show-word-limit
                      :placeholder="t('userinfo.placeholder.officeaddress')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.officetel')" prop="userextendinfo.officetel">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.officetel"
                      maxlength="50"
                      show-word-limit
                      :desensitization-type="DESENDATATYPE_INTELLIGENCE"
                      clearable
                      :placeholder="t('userinfo.placeholder.officetel')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.loginip')" prop="userextendinfo.loginip">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.loginip"
                      :placeholder="t('userinfo.placeholder.loginip')"
                    />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item :label="t('userinfo.responsibility')">
                    <ep-input
                      v-model="frameUserForm.data.userextendinfo.responsibility"
                      type="textarea"
                      :rows="2"
                      maxlength="50"
                      show-word-limit
                      :placeholder="t('userinfo.placeholder.responsibility')"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="20">
                <e-col>
                  <ep-form-item :label="t('userinfo.photo')">
                    <ep-image-upload-service
                      v-model:image-list="model.imageList"
                      :action="model.uploadUrl"
                      :num-limit="1"
                      :on-success="uploadSuccess"
                    />
                  </ep-form-item>
                </e-col>
              </e-row>
            </e-collapse-item>
            <e-collapse-item name="2" :title="t('userinfo.roleAssignment')" opened>
              <role-select
                ref="roleSelectRef"
                :show-filter="props.showFilter"
                :role-data="roleData"
                :disabled="props.disabled"
              />
            </e-collapse-item>
          </e-collapse>
        </ep-form>
      </e-main>
      <e-footer>
        <e-button @click="onCancel">{{ t('action.cancel') }}</e-button>
        <e-button type="primary" @click="onSubmit">{{ t('action.save') }}</e-button>
      </e-footer>
    </e-container>
  </e-container>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue';
import {
  DESENDATATYPE_ADDRESS,
  DESENDATATYPE_EMAIL,
  DESENDATATYPE_ID_CARD,
  DESENDATATYPE_INTELLIGENCE,
  DESENDATATYPE_MOBILE_PHONE,
  EMessage,
  EMessageBox
} from '@epoint-fe/eui-components';
import { Hooks, EpImageUploadService, Utils, EButtonEdit } from '@epframe/eui-core';

import RoleSelect from '@/components/role-select/index.vue';
import { useI18n } from '@/i18n';

const { useValidation, useTreeModel, useListModel } = Hooks;
const { validate } = useValidation();

const { defineDataModel, createSubModel, getRightUrl, request, uuid } = Utils;

const model = Utils.defineDataModel(() => {
  const userGuid = ref('');
  const isCopy = ref(false);
  const isEdit = ref(false);
  const initUserGuid = ref();
  const imageList = ref([]); // 图片上传
  const ouTree = useTreeModel('/frameuserlist/getTreeModel', {
    requestType: 'restful',
    customParams: {
      selectou: '1'
    }
  });

  const partOuTree = useTreeModel('/frameuserlist/getTreeModel', {
    requestType: 'restful',
    customParams: {
      selectou: '1'
    }
  });
  const partOuTreeCacheData = ref([]);

  const uploadUrl = computed(() => getRightUrl(`rest/frameuserlist/getFileUploadModel?userguid=${userGuid.value}`));

  const sexInfo = useListModel('/api/code/getByCodeName?codeName=性别', {
    lazy: true,
    labelField: 'text'
  });
  const frameUserForm = createSubModel(
    {
      issyncthirdparty: 0,
      userextendinfo: {}
    },
    {
      refresh: async () => {
        const frameUser = await request({
          url: isCopy.value ? `/frameuserlist/copyFrameUser` : `/frameuserlist/getFrameUser`,
          data: {
            params: {
              conditions: [
                {
                  path: 'userguid',
                  type: 'EQ',
                  value: userGuid.value
                }
              ]
            }
          }
        });

        initUserGuid.value = frameUser.userguid;
        if (!isEdit.value) {
          frameUser.userguid = '';
        }

        await initUserPic(initUserGuid.value);
        // model.models.frameUserForm.data = frameUser;
        return frameUser;
      },
      updateFrameUser: ({ userGuid, frameUserForm, roleGuids, otherOuGuids, joblist }) => {
        return request({
          url: `/frameuserlist/updateUser?userGuid=${userGuid}`,
          data: {
            entities: [frameUserForm],
            customParams: {
              imageList: imageList.value,
              roleguids: roleGuids,
              otherouguid: otherOuGuids,
              joblist: joblist
            }
          }
        });
      },
      copyFrameUser: ({ userGuid }) => {
        return request({
          url: `/frameuserlist/copyFrameUser?userGuid=${userGuid}`,
          data: {
            entities: [frameUserForm.data]
          }
        });
      },
      addFrameUser: ({ roleGuids, joblist }) => {
        return request({
          url: '/frameuserlist/addUser',
          data: {
            entities: [frameUserForm.data],

            customParams: {
              userguid: initUserGuid.value,
              roleguids: roleGuids,
              joblist: joblist
            }
          }
        });
      }
    }
  );

  // 给 initSecurityConfig 请求的 securityConfigParams 参数
  const securityConfig = {
    apiUrl: 'rest/frameuserlist/addUser',
    processguid: '',
    processversioninstanceguid: '',
    workitemguid: ''
  };

  const initUserPic = async (userGuid) => {
    imageList.value = await request({
      url: `/frameuserlist/getFileUploadModel?userguid=${userGuid}`
    }).then((response) => {
      return response.data;
    });
  };

  return {
    global: {
      securityConfig
    },
    models: {
      frameUserForm,
      imageList,
      ouTree,
      partOuTree,
      uploadUrl,
      sexInfo,
      userGuid,
      isCopy,
      isEdit
    }
  };
});

const { t } = useI18n();
const { request } = Utils;
const currentInstance = getCurrentInstance();
const { proxy } = currentInstance;
// 定义 props传参
const props = defineProps({
  userGuid: { type: String },
  showFilter: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isCopy: {
    type: Boolean,
    default: false
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  ouGuid: { type: String, default: '' },
  ouName: { type: String, default: '' }
});
const models = model.models;
const frameUserForm = models.frameUserForm;

const frameUserFormRef = ref(null);
// 定义变量
const openedItems = ref(['1', '2']);
const roleSelectRef = ref(null);

const roleData = ref({ list: {} });

const jobPopupUrl = computed(() => {
  const jobList = frameUserForm.data.joblist ? frameUserForm.data.joblist : '';
  return `/framemanager/orga/orga/job/selectuserjob?jobGuids=` + jobList;
});

// 获取角色数据
const getRoleData = (userGuid) => {
  request({
    url: `frameuserlist/getRoleData?userguid=${userGuid}`,
    data: {
      params: {}
    }
  }).then((res) => {
    roleData.value = res;
  });
};

model.methods.registerHook('onAfterInitConfig', () => {
  model.global.securityConfig.toolRules = {
    frameuser: {
      loginid: { disabled: isEdit.value }
      // displayname: { readOnly: isEdit.value },
      // telephoneoffice: { hidden: true },
      // userextendinfo: {
      //   shortmobile: { hidden: true },
      //   loginip: { disabled: true }
      // }
    }
  };

  model.global.securityConfig.attach = {
    toolRules: {
      imageList: {
        uploader: true,
        delete: true,
        download: true,
        edit: true,
        preview: true,
        modify: true
      }
    },
    rules: {
      imageList: [{ required: true, message: '必填' }]
    }
  };
});
model.methods.registerHook('onBeforeInitData', () => {
  model.models.userGuid = props.userGuid;
  model.models.isCopy = props.isCopy;
  model.models.isEdit = props.isEdit;
});
const ouTreeCacheData = ref([]);
model.methods.registerHook('onAfterInitData', () => {
  //如果是新增，没有userGuid,并且传入了ouGuid，则设置默认ouGuidi
  if (!isEdit.value && props.ouGuid) {
    model.models.frameUserForm.data.ouguid = props.ouGuid;
  }
});
// 初始化数据
onMounted(() => {
  model.methods.initData(currentInstance);
  getRoleData(isEdit.value || isCopy.value ? props.userGuid : '');

  ouTreeCacheData.value = [{ id: props.ouGuid, text: props.ouName }];
});

const isEdit = computed(() => props.isEdit);
const isCopy = computed(() => props.isCopy);
// 定义事件
/**
 * save: [frameuser: FrameUserProperty];
 * cancel: [];
 */
const emit = defineEmits(['save', 'cancel']);

// 定义方法
const onSubmit = () => {
  validate(frameUserFormRef, (isValid, firtError, errors) => {
    // 再比如把验证信息全部集中显示
    if (!isValid) {
      EMessageBox.alert(
        errors
          .map((form) => {
            return Object.keys(form)
              .map((field) => `<div>${form[field].map((error) => error.message).join('；')}<div>`)
              .join('');
          })
          .join(''),
        '以下字段未验证通过',
        {
          dangerouslyUseHTMLString: true,
          type: 'error'
        }
      );
    } else {
      // 验证通过
      const roleguids = roleSelectRef.value.getSelectedRoleIds();
      Utils.logger.debug(frameUserFormRef.value.getCleanData());
      if (isEdit.value) {
        frameUserForm
          .updateFrameUser({
            userGuid: props.userGuid,
            frameUserForm: frameUserFormRef.value.getCleanData(),
            roleGuids: roleguids,
            otherOuGuids: frameUserForm.data.otherouguid,
            joblist: frameUserForm.data.joblist
          })
          .then(() => {
            emit('save');
          });
      } else {
        frameUserForm.addFrameUser({ roleGuids: roleguids, joblist: frameUserForm.data.joblist }).then((res) => {
          emit('save', res);
        });
      }
    }
    // 此方法返回false 可以阻止框架的自动弹出验证失败的提示
    return false;
  });
};
const onCancel = () => {
  emit('cancel');
};

const onButtonEditClose = (e) => {
  const pArr = e.params.split(';');
  e.params = {
    text: pArr[0],
    value: pArr[1]
  };
};

const onButtonEditClose2 = (e) => {
  const pArr = e.params.split(':');
  e.params = {
    text: pArr[0],
    value: pArr[1]
  };
};

const uploadSuccess = (res) => {
  if (res.custom) {
    frameUserForm.data.userextendinfo.piccontent = res.custom.picContent;
    frameUserForm.data.userextendinfo.piccontenttype = res.custom.picContentType;
  }
};

const disabledDate = (date) => {
  // 不允许今天及以前的日期被选择
  return date.getTime() < Date.now();
};
</script>
<style lang="less" scoped>
.user-edit {
  .e-date-editor {
    --e-date-editor-width: 100%;
  }

  .e-select {
    width: 100%;
  }
}
</style>
```

</details>
