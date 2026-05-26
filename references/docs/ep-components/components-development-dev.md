---
title: 组件开发指南
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/development/dev/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/development/dev/)

在 Vue 中，一个 `.vue` 文件天然就是一个组件。所以我们编写自定义组件的体验就和编写一个 Vue 页面一样。只不过编写自定义组件需要额外处理一下组件的属性和事件。

## 技术规范
### 工程组织

为了更好地管理和维护组件，我们建议按以下方式组织组件代码：

- 通用组件：将可复用的通用组件放置在独立的前端工程中，如 `ztb-components-vue`
- 业务组件：将特定业务相关的组件放置在对应的业务工程中，如 `ztb-qy-trade-process-vue`

所有组件的实现代码都应统一存放在工程的 `src\components` 目录下。例如：`ztb-components-vue\src\components`

### 组件命名规范

为保持命名的一致性和可读性，我们制定了以下命名规则：

- 框架基础组件：统一使用 `ep-xxx` 格式
- 业务组件：使用对应业务线的标识，如交易组件使用 `ztb-xxx`
- 特定组件包的组件：在业务标识后附加组件包名称，如 `ztb-trade-process-xxx`

### 组件导出规范

组件在导出时需要遵循以下规则：

- 移除组件名称中的连字符 `-`
- 采用大驼峰命名法

示例：`ztb-list-button` 组件导出为 `ZtbListButton`

## 组件开发

### 新建组件文件

在要新增组件的工程内，在 `src/components` 目录下，新建一个组件文件，文件名使用纯小写短横线命名即 kebab-case 命名规范，文件后缀为 `.vue`。

如果你的组件较为复杂，可以考虑在 `src/components` 目录下，新建一个组件目录，在目录下实现组件的逻辑。

<details>
<summary>组件目录结构</summary>

几种可能的情况如下：

```text

src/components/
  ├── ztb-super-button.vue    # 形式 1 单文件实现组件全部逻辑
  ├── ztb-list-button/        # 形式 2 组件目录为一个目录，其他子目录自行拆分组织
  │   ├── widget1
  │   ├── widget2
  │   └── ztb-list-button.vue  # 最终 同名.vue 作为组件的入口文件导出
  ├── ztb-plan-select/         # 形式 3
  │   ├── plan-select.vue
  │   ├── plan-select-item.vue
  │   └── plan-select-item-list.vue
  │   └── index.ts             # 最终 index.ts 作为入口导出组件

```

- 场景 1 适用于非常简单的组件。
- 场景 2、3 适用于组件较为复杂的组件，内部需要再次拆分子组件，或者拆分逻辑。
- 场景 3 和 2 的区别在于，使用 index.ts 作为入口导出，可以提供比单个 vue 文件更多的特性，比如复杂组件可能有配套的多个类型导出，或者希望在导出的组件的 Static 级别挂载更多功能等。

**框架最推荐使用第二种方式。**， 因为一般来说外部封装组件不需要用到场景 3 的特性。而且以固定的目录和固定的出口来组织组件，更容易维护（业务方可以更方便的通过约定知道组件的结构和导出，而且即使组件内部有变化，也不会影响到外部）。

即使是简单组件也推荐使用方式二进行组织，即可以对外一致，也可以为未来扩展留下可能性（内部组件的拆分重构，不需要外部调整导入）。

</details>

### 组件 html 模板

在 F9 中，我们需要专门编写一个 [tpl 文件](http://192.168.219.170/showcase/eui3/frame/usercontrol/#tpl-%E6%96%87%E4%BB%B6%E7%9A%84%E7%BC%96%E5%86%99) 来放置组件的 html 模板。

```html
<div id ="{{controlId}}_btnlock">
  <a class="mini-button" onclick="beforeUnlock();" name="unlock">解除锁定</a>
</div>
<div id ="{{controlId}}_lockpart">
  {{lockdttm}}
</div>
<div id="{{controlId}}_trackpart">
  <a class="mini-button" onclick="ShowFlowChart();" name="unlock">流程追踪</a>
  当前处理步骤：<span class="text-special"></span>
</div>
```

在 Vue 中，我们直接把组件的 html 模板放置在 `<template>` 元素块里。

```vue
<template>
  <div>
    <e-button onclick="beforeUnlock()" name="unlock">解除锁定</e-button>
  </div>
  <div>
    {{ lockDttm }}
  </div>
  <div>
    <e-button onclick="ShowFlowChart()" name="unlock">流程追踪</e-button>
    当前处理步骤：<span class="text-special">{{ currentStep }}</span>
  </div>
</template>
```

### 组件属性

在 F9 中我们要定义组件的属性并让它能通过 html 标签配置，需要在组件中先定义该属性，然后通过 `getAttrs` 方法让改属性可配置。

```js
mini.extend(mini.ExcelImport, mini.UserControl, {
  uploadUrl: '',
  limitType: '.xlsx',

  getAttrs: function (el) {
      var attrs = mini.ExcelImport.superclass.getAttrs.call(this, el);
      mini._ParseString(el, attrs, ['uploadUrl', 'limitType']);
      return attrs;
  }
});
```

在 Vue 中我们通过 [`defineProps` 宏](https://cn.vuejs.org/guide/essentials/component-basics.html#passing-props) 来定义属性。

```vue
<script setup>
const props = defineProps({
  uploadUrl: {
    type: String
  },
  limitType: {
    type: String,
    default: '.xlsx'
  }
})
</script>
```

### 组件标识

为了便于识别和管理组件，我们规定需要在组件中显式定义组件名称，并采用大驼峰命名规范（PascalCase）。

```vue
<script setup lang="ts">
defineOptions({
  name: 'ZtbListButton'
});
</script>
```

### 组件事件

在 F9 中我们直接通过 `fire` 方法来触发组件的自定义事件。

```js
mini.extend(mini.ExcelImport, mini.UserControl, {
  // 当某个文件开始导入时触发
  __OnImportStart: function (file) {
    this.fire('importstart', {
      file: file
    });
  },
  // 当导入结束时触发
  __OnImportFinished: function () {
    this.fire('importfinished');
  },
  getAttrs: function (el) {
      var attrs = mini.ExcelImport.superclass.getAttrs.call(this, el);
      mini._ParseString(el, attrs, ['onimportstart', 'onimportfinished']);
      return attrs;
  }
});
```

在 Vue 中我们通过 [`defineEmits` 宏](https://cn.vuejs.org/guide/components/events.html#declaring-emitted-events) 来声明和触发自定义事件。

```vue
<script setup>
const emit = defineEmits(['import-start', 'import-finished']);

const __OnImportStart = (file) => {
  emit('import-start', { file: file });
};
const __OnImportFinished = () => {
  emit('import-finished');
};
</script>
```

### 组件方法

F9 中我们直接将组件方法定义在组件 js 中即可。

```js
mini.extend(mini.ExcelImport, mini.UserControl, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAttachLength: function (file) {
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFile: function (file) {
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addFile: function (file) {
  }
});
```

在 Vue 中我们也是直接在组件的 js 中定义方法。需要注意的是默认组件内部定义的方法是私有的，如果想要将方法开放给父组件调用，需要用到 [`defineExpose` 宏](https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose)。

```vue
<script setup>
const getAttachLength = (file) => {
};
const removeFile = (file) => {
};
const addFile = (file) => {
};

// 将需要给外部调用的方法开放出去
defineExpose({
  removeFile,
  addFile
})
</script>
```

### 组件样式

在 F9 中我们将组件样式写在一个单独的 css 文件里，并通过 `cssUrl` 属性关联。

在 Vue 中我们可以直接将 css 写在 `<style>` 元素块内。

```vue
<style lang="less" scoped>
.ztb-list-btn {
  margin: 0 8px;
  color: #499fff;
}
</style>
```

在我们 Vue 框架中已默认支持了用 `less` 来写样式。

### 组件导出

为了统一管理和导出组件，需要在 `src\components` 目录下创建 `index.ts` 文件。该文件作为组件的统一出口，方便其他模块引用。

```ts
import ZtbBdList from './ztb-bd-list/ztb-bd-list.vue';
import ZtbHandleControls2 from './ztb-handle-controls/ztb-handle-controls2.vue';
import ZtbLeftButton2 from './ztb-left-button/ztb-left-button2.vue';
import ZtbListButton from './ztb-list-button/ztb-list-button.vue';

export {
  ZtbBdList,
  ZtbHandleControls2,
  ZtbLeftButton2,
  ZtbListButton
};
```

## 组件使用

### 导入组件

要使用我们自定义组件，我们只需要在父组件中导入它即可。

```vue
<script setup>
// 导入自己工程中的组件
import { MyCustomComp } from '@/components';
// 导入通用组件包的组件
import { ZtbListButton } from '@epdzjy/ztb-components-vue';
</script>
```

### 模板中使用组件

在模板中我们将组件名字转化为 `kebab-case` 模式进行使用

```vue
<template>
    <ztb-list-button />
</template>
```

### 传递属性

在页面中，我们通过 Vue 的 [`v-bind`](https://cn.vuejs.org/api/built-in-directives.html#v-bind) 指令向自定义组件设置属性。

```vue
<template>
  <ztb-list-button v-bind:page-name="pageName" />
  <!-- 推荐采用简写模式 -->
  <ztb-list-button :page-name="pageName" />
</template>
<script setup>
import { ref } from 'vue';
import { ZtbListButton } from '@epdzjy/ztb-components-vue';

const pageName = ref('用户');
</script>
```

也可直接利用绑定对象形式的方式一次性绑定多个属性：

```vue
<template>
  <ztb-list-button v-bind="listBtnProps" />
</template>
<script setup>
import { ZtbListButton } from '@epdzjy/ztb-components-vue';

const listBtnProps = {
  showAdd: true,
  showDel: true,
  showReset: false,
  pageName: '用户'
};
</script>
```
### 监听事件

在页面中，我们通过 Vue 的 [`v-on`](https://cn.vuejs.org/api/built-in-directives.html#v-on) 指令来监听自定义组件抛出的事件。

```vue
<template>
  <ztb-list-button v-on:click="onClick" />
  <!-- 推荐采用简写模式 -->
  <ztb-list-button @click="onClick" />
</template>
<script setup>
import { ZtbListButton } from '@epdzjy/ztb-components-vue';

const onClick = () => {
  logger.info('onClick');
};
</script>
```

### 方法调用

在页面中，我们通过 Vue 的 [模板引用](https://cn.vuejs.org/guide/essentials/template-refs.html) 获取到自定义组件对象，然后通过该自定义组件对象调用它内部开放的方法。

```vue
<template>
  <ztb-list-button ref="ztbListButtonRef" />
</template>
<script setup>
import { ref } from 'vue';
import { ZtbListButton } from '@epdzjy/ztb-components-vue';

const ztbListButtonRef = ref(null);

// 需要等子组件实例被挂载后才会有值
ztbListButtonRef.value?.addRow();

</script>
```

## 完整案例

### 组件代码

```vue
<template>
  <e-button class="ztb-list-button" v-show="showAdd" type="primary" @click="addRow">新增{{ pageName }}</e-button>
  <e-button class="ztb-list-button" v-show="showDel" type="danger" plain ghost :disabled="!selectedRows.length" @click="deleteSelect">删除{{ pageName }} </e-button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Utils } from '@epframe/eui-core';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

defineOptions({
  name: 'ZtbListButton'
})

// 定义属性
const props = defineProps({
  tableRef: { type: Object },
  showAdd: { type: Boolean, default: true },
  showDel: { type: Boolean, default: true },
  pageName: { type: String },
  workflowPath: { type: String}
});
// 定义事件
const emits = defineEmits(['add']);

const selectedRows = computed(() => {
  return props.tableRef?.getSelectionRows() || [];
});

// 定义删除项目按钮
const deleteSelect = () => {
  const selectRows = props.tableRef?.getSelectionRows();
  if (selectRows.length > 0) {
    // 选中行
    EMessageBox.confirm('确认删除?', '删除提醒', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      // 执行删除逻辑
    });
  } else {
    EMessage.warning('请选择要删除的记录!');
  }
};

// 定义新增按钮
const addRow = () => {
  Utils.openDialog(`新增${props.pageName}`, props.workflowPath, {
    isTop: true,
    fullscreen: true,
    closeCallback: (params: any) => {
      // 触发 add 事件
      emit('add', params)
    }
  });
};

// 将需要给外部调用的方法开放出去
defineExpose({
  addRow,
  deleteSelect
})
</script>

<style lang="less" scoped>
.ztb-button-list {
  margin-right: 4px;
}
</style>
```

### 使用示例

```vue
<template>
  <ztb-list-button ref="ztbListButtonRef" v-bind="listBtnProps" @add="onAdd"/>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { ZtbListButton } from '@epdzjy/ztb-components-vue';

const ztbListButtonRef = ref(null);

const listBtnProps = {
  showAdd: true,
  showDel: true,
  pageName: '用户'
};

// 定义组件事件处理函数
const onAdd = (user) => {
  logger.info('新增用户：', user);
}

onMounted(() => {
  // 调用组件方法
  ztbListButtonRef.value?.addRow();
})
</script>
```