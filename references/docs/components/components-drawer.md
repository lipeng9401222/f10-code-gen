---
title: Drawer 抽屉
originUrl: http://192.168.219.170/docs/vue/latest/component/component/drawer.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

# Drawer 抽屉

`Drawer` 组件从屏幕边缘滑出，适合展示表单、详情面板等内容。它提供了与 `Dialog` 几乎一致的 API，但拥有不同的交互体验。

> **💡 提示**
>
> 使用 SSR（例如 [Nuxt](https://nuxt.com/v3)）和 SSG（例如 [VitePress](https://vitepress.vuejs.org/)）时，该组件需要在使用时使用 `<client-only></client-only>` 包装。

## 基本用法

呼出一个临时抽屉，可以从多个方向打开

**Demo 示例**: `drawer/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

```vue
<template>
  <e-radio-group v-model="direction">
    <e-radio value="ltr">left to right</e-radio>
    <e-radio value="rtl">right to left</e-radio>
    <e-radio value="ttb">top to bottom</e-radio>
    <e-radio value="btt">bottom to top</e-radio>
  </e-radio-group>

  <e-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </e-button>
  <e-button type="primary" style="margin-left: 16px" @click="drawer2 = true"> with footer </e-button>

  <e-drawer
    v-model="drawer"
    title="I am the title"
    :direction="direction"
    :before-close="handleClose"
    :close-on-press-escape="true"
    :close-on-click-modal="true"
  >
    <span>Hi, there!</span>
  </e-drawer>
  <e-drawer v-model="drawer2" :direction="direction" :close-on-press-escape="true" :close-on-click-modal="true">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <e-radio v-model="radio1" label="Option 1" size="large">Option 1</e-radio>
        <e-radio v-model="radio1" label="Option 2" size="large">Option 2</e-radio>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <e-button @click="cancelClick">cancel</e-button>
        <e-button type="primary" @click="confirmClick">confirm</e-button>
      </div>
    </template>
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';

const drawer = ref(false);
const drawer2 = ref(false);
const direction = ref('rtl');
const radio1 = ref('Option 1');
const handleClose = (done: () => void) => {
  EMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  EMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false;
    })
    .catch(() => {
      // catch error
    });
}
</script>

```

## 无标题

当您不再需要标题时，可以从抽屉中移除它。

**Demo 示例**: `drawer/no-title`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

```vue
<template>
  <e-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </e-button>

  <e-drawer v-model="drawer" title="I am the title" close-on-click-modal close-on-press-escape :with-header="false">
    <span>Hi there!</span>
    <p>There is no Header, so there is no title. You can click the overlay or press ESC to close this drawer.</p>
    <p>没有顶部，所以没有标题，你可以点击遮罩层，或者按下ESC来关闭此抽屉。</p>
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const drawer = ref(false);
</script>

```

## 自定义内容

与 `Dialog` 一样，`Drawer` 可用于显示多种不同的交互方式。

**Demo 示例**: `drawer/customization-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

```vue
<template>
  <e-button text @click="table = true">Open Drawer with nested table</e-button>
  <e-button text @click="dialog = true">Open Drawer with nested form</e-button>
  <e-drawer v-model="table" title="I have a nested table inside!" direction="rtl" size="50%">
    <e-table :data-source="gridData">
      <e-table-column data-index="date" title="日期" width="150" />
      <e-table-column data-index="name" title="姓名" width="200" />
      <e-table-column data-index="address" title="地址" />
    </e-table>
  </e-drawer>

  <e-drawer
    ref="drawerRef"
    v-model="dialog"
    title="I have a nested form inside!"
    :before-close="handleClose"
    direction="ltr"
    class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <e-form :model="form">
        <e-form-item label="Name" :label-width="formLabelWidth">
          <e-input v-model="form.name" autocomplete="off" />
        </e-form-item>
        <e-form-item label="Area" :label-width="formLabelWidth">
          <e-select v-model="form.region" placeholder="Please select activity area">
            <e-option label="Area1" value="shanghai" />
            <e-option label="Area2" value="beijing" />
          </e-select>
        </e-form-item>
      </e-form>
      <div class="demo-drawer__footer">
        <e-button @click="cancelForm">Cancel</e-button>
        <e-button type="primary" :loading="loading" @click="onClick">{{
          loading ? 'Submitting ...' : 'Submit'
        }}</e-button>
      </div>
    </div>
  </e-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { EDrawer, EMessageBox } from '@epoint-fe/eui-components';

const formLabelWidth = '80px';
let timer;

const table = ref(false);
const dialog = ref(false);
const loading = ref(false);

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const gridData = [
  {
    date: '2016-05-02',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-04',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-01',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-03',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
];

const drawerRef = ref<InstanceType<typeof EDrawer>>();
const onClick = () => {
  drawerRef.value!.close();
};

const handleClose = (done) => {
  if (loading.value) {
    return;
  }
  EMessageBox.confirm('Do you want to submit?')
    .then(() => {
      loading.value = true;
      timer = setTimeout(() => {
        done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false;
        }, 400);
      }, 2000);
    })
    .catch(() => {
      // catch error
    });
};

const cancelForm = () => {
  loading.value = false;
  dialog.value = false;
  clearTimeout(timer);
};
</script>

```

## 自定义标题

`header` 插槽可用于自定义整个抽屉头部区域（标题+关闭按钮）。通过 slot props 可以获取 `actions` 控制方法和 `title`、`titleId`、`titleClass` 属性。

如果你只需要替换标题文字，可以使用 `title` 插槽。如果你需要在标题和按钮之间插入内容，可以使用 `header-extra` 插槽。

**Demo 示例**: `drawer/customization-header`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

```vue
<template>
  <e-button @click="visible = true"> 打开自定义头部抽屉 </e-button>
  <e-drawer v-model="visible" :show-close="false">
    <template #header="{ actions, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">这是自定义头部！</h4>
      <e-button type="danger" @click="actions.close">
        <e-icon class="e-icon--left"><CircleCloseFilled /></e-icon>
        关闭
      </e-button>
    </template>
    This is drawer content.
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EButton, EDrawer } from '@epoint-fe/eui-components';
import { CircleCloseFilled } from '@epoint-fe/eui-icons';

const visible = ref(false);
</script>

```

## 额外头部操作区

在标题和关闭按钮之间显示额外的内容，例如标签、状态指示等。

**Demo 示例**: `drawer/header-extra-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

```vue
<template>
  <e-button @click="visible = true">打开带有额外操作的抽屉</e-button>
  <e-drawer v-model="visible" title="审批详情">
    <template #header-extra>
      <e-tag type="warning">待审批</e-tag>
    </template>
    这是抽屉内容。
    <template #footer>
      <e-button>驳回</e-button>
      <e-button type="primary">通过</e-button>
    </template>
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

```

## 内容页声明头部操作

当 Drawer 内容由独立组件承载时，可以在内容组件中使用 `<e-popup-header-extra>` 声明头部操作。按钮会自动渲染到抽屉默认头部的 `header-extra` 区域，同时仍然可以直接访问内容组件自己的状态。

**Demo 示例**: `drawer/content-header-extra`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

```vue
<template>
  <e-button @click="visible = true">打开内容页声明头部操作的 Drawer</e-button>

  <e-drawer v-model="visible" title="筛选条件" size="420px">
    <content-page />
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ContentPage from './content-header-extra-content.vue';

const visible = ref(false);
</script>

```

## 嵌套的抽屉

您还可以像 `Dialog` 一样拥有多层抽屉。

**Demo 示例**: `drawer/nested-drawer`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

```vue
<template>
  <e-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </e-button>

  <e-drawer v-model="drawer" title="I'm outer Drawer" size="50%">
    <div>
      <e-button @click="innerDrawer = true">Click me!</e-button>
      <e-drawer v-model="innerDrawer" title="I'm inner Drawer" :append-to-body="true" :before-close="handleClose">
        <p>_(:зゝ∠)_</p>
      </e-drawer>
    </div>
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';

const drawer = ref(false);
const innerDrawer = ref(false);

const handleClose = (done: () => void) => {
  EMessageBox.confirm('You still have unsaved data, proceed?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

```

> **💡 提示**
>
> 抽屉内的内容应该是惰性渲染的，这意味着抽屉内的内容不会影响初始渲染性能，因此任何 DOM 操作都应该通过 `ref` 或在 `open` 事件触发后执行。

> **💡 提示**
>
> 抽屉提供了一个名为 `destroyOnClose` 的 API，它是一个标志变量，指示抽屉关闭后是否应销毁抽屉内的子内容。您可以在需要每次抽屉打开时调用 `mounted` 生命周期时使用此 API。

## API 方法 - 打开 iframe 页面{#openIframeDrawer}

如果完全导入，或者调用了 `app.use(EDrawer)`，它将为 `app.config.globalProperties` 添加 `$drawer` 以及 `$iframeDrawer` 全局方法， 通过此方法你可以指定一个 url 用 iframe 打开。

**Demo 示例**: `drawer/iframe-drawer`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

```vue
<template>
  <e-button text @click="doOpenDrawer"> 点击打开抽屉 </e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()!;

const doOpenDrawer = () => {
  const handler = proxy?.$drawer({
    title: '抽屉',
    url: 'http://192.168.219.170/docs/vue/latest/frame/',
    size: '60%',
    direction: 'rtl',
    closeCallback: (params) => {
      console.log('close drawer params:', params);
    },
  });

  // setTimeout(() => {
  //   handler.closeDrawer()
  // }, 10000);
};
</script>

```

函数支持的签名如下：

- `$drawer(options: IframeDrawerOptions)`
- `$drawer(title: string, url: string)`
- `$drawer(title: string, url: string, options: IframeDrawerOptions)`
- `$iframeDrawer(options: IframeDrawerOptions)`

其中 `IframeDrawerOptions` 类型定义如下：

```ts
type IframeDrawerOptions = Partial<DrawerProps> & {
  title: string;
  url: string;
  closeCallback?: (params: any) => void;
  iframeEvents?: {
    onload?: () => void;
    ondestroy?: (action: unknown) => void;
  };
};
```

其中 `IframeDrawerOptions` 为 Drawer 的配置项，具体见下表。`url` 参数为要打开的页面地址，`closeCallback` 为关闭时的回调，此回调会在子页面关闭时触发。

如果打开的是 F9 的页面，可以用 F9 的 API `epoint.closeDialog('回传参数')` 来关闭。

其关闭本质是，通过 postMessage 发送了 type 为 closeDialog 的消息，因此始终可以使用类似下面的代码进行关闭操作。

```ts
// 从 url 上获取 drawer 的 id
const urlParams = new URLSearchParams(location.search);
const dialogId = urlParams.get('_dialogId_');

window.parent.postMessage(
  {
    type: 'closeDialog', // 固定值，告诉父页面此消息是用来关闭抽屉
    id: dialogId, // drawer 的 id，从 url 上获取
    params: {}, // 要传递给 closeCallback 回调方法的参数
  },
  '*'
);
```

## API 方法 - 打开组件页面{#openComponentDrawer}

如果在页面上要进行组件弹框的操作，直接通过 `<e-drawer />` 标签虽然更为灵活，但需要定义较多的控制变量。此时你也可以通过 API 来进行弹窗操作。

如果完全导入，或者调用了 `app.use(EDrawer)`，则在 `app.config.globalProperties` 会添加 `$componentDrawer` 和 `$drawer` 全局方法, 可以打开一个内容为指定组件的抽屉页面。

**Demo 示例**: `drawer/component-drawer`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/drawer.html)

```vue
<template>
  <e-button @click="openComponentDrawer">点击打开组件抽屉</e-button>
</template>

<script setup>
import { defineAsyncComponent, getCurrentInstance, h } from 'vue';

const { proxy } = getCurrentInstance();

const openComponentDrawer = () => {
  console.log(proxy, proxy.$drawer, proxy.$message);
  proxy?.$drawer(
    {
      title: '快速显示组件的抽屉',
      size: '500px',
      direction: 'rtl',
      closeCallback: (action) => {
        console.log('关闭抽屉, 回传值为', action);
        proxy?.$message(`关闭抽屉, 回传值为${action}`);
      },
    },
    () => {
      return h(
        defineAsyncComponent(() => import('./component-drawer-content-1.vue')),
        {
          title: '属性值1',
          content: '属性值2 ',
        }
      );
    }
  );
};
</script>

<style lang="scss" scoped></style>

```

:::details 内容组件 1，代码如下：

<<< @/examples/drawer/component-drawer-content-1.vue

:::

:::details 内容组件 2，代码如下：

<<< @/examples/drawer/component-drawer-content-2.vue

:::

函数支持的几个签名:

- 传入弹窗标题、弹窗配置项、内容渲染函数：<br>`$drawer(title: string, drawerOptions: ComponentDrawerOptions, render: () => VNode): ComponentDrawerApi`;
- 传入弹窗配置项、内容渲染函数：<br>`$drawer(drawerOptions: ComponentDrawerOptions, render: () => VNode): ComponentDrawerApi`;
- 传入弹窗配置项、内容渲染函数：<br>`$componentDrawer(drawerOptions: ComponentDrawerOptions, render: () => VNode): ComponentDrawerApi`;

参数说明：

其中 `ComponentDrawerOptions` 类型是 Drawer 本身属性的子集，支持大部分属性，并额外支持 `closeCallback` 回调和 `renderHeaderExtra` 渲染函数。

```ts
// 组件弹框要求配置
type ComponentDrawerOptions = Partial<DrawerProps> & {
  closeCallback?: (action: any) => void;
  renderHeaderExtra?: () => VNode;
};
```

`render` 方法是一个渲染函数，用来指定内容区域使用什么组件来渲染，这块的实现可以直接返回对 Vue 提供的 render 函数(即 `h` 方法)的调用。关于此方法详细参阅[渲染函数 API - h](https://cn.vuejs.org/api/render-function.html#h)。

此方法会返回 `ComponentDrawerApi` 对象，其中包含了必要的对抽屉操作的 API，ts 定义如下：

```ts
type BaseDrawerApi = {
  // 关闭抽屉并回传参数
  closeDrawer: (action?: string) => void;
  // 关闭抽屉并回传参数
  close: (action?: string) => void;

  // 设置抽屉标题
  setTitle: (title: string) => void;
  // 设置抽屉配置项
  setOptions: (option: Partial<DrawerProps>) => void;
};
type ComponentDrawerApi = BaseDrawerApi & {
  // 更新抽屉的内容 传入一个新的渲染函数 即可切换展示的内容组件 详见上方示例代码
  updateContent: (contentRender: ComponentDrawerContentRender) => void;
};
```

此 API 对象通过 Vue 的 Provide 提供给了抽屉内部的组件，可以通过 `inject('getCurrentDrawer')` 的调用来获取此 API。

组件内容页中也可以使用 `<e-popup-header-extra>` 声明头部操作按钮；这类按钮与 `renderHeaderExtra` 可以同时存在。如果传入 `header` 插槽完全替换头部，默认的 `header-extra` 容器不存在，`<e-popup-header-extra>` 不会显示。

## Drawer Attributes

| Name                  | Description                                                                                                                                                                                        | Type                                                                                          | Acceptable Values     | Default |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------- | ------- |
| model-value / v-model | 抽屉是否应显示                                                                                                                                                                                     | boolean                                                                                          | —                     | false   |
| append-to-body        | 控制抽屉是否应插入到 DocumentBody 元素中，嵌套抽屉必须将此参数分配为 **true**                                                                                                                      | boolean                                                                                          | —                     | true   |
| lock-scroll           | 在显示抽屉时是否禁用 body 滚动                                                                                                                                                                     | boolean                                                                                          | —                     | true    |
| before-close          | 如果设置，将停止关闭过程                                                                                                                                                                           | 函数(done) (done 用于关闭 Dialog)  | —                     | —       |
| close-on-click-modal  | 是否可以通过单击遮罩关闭抽屉                                                                                                                                                                       | boolean                                                                                          | —                     | false    |
| close-on-press-escape | 指示是否可以通过按 ESC 键关闭抽屉                                                                                                                                                                  | boolean                                                                                          | —                     | false    |
| open-delay            | 打开之前的时间（毫秒）                                                                                                                                                                             | number                                                                                          | —                     | 0       |
| close-delay           | 关闭之前的时间（毫秒）                                                                                                                                                                             | number                                                                                          | —                     | 0       |
| destroy-on-close      | 指示抽屉关闭后是否应销毁子元素                                                                                                                                                                     | boolean                                                                                          | -                     | false   |
| modal                 | 是否显示阴影层                                                                                                                                                                                     | boolean                                                                                          | —                     | true    |
| direction             | 抽屉的打开方向                                                                                                                                                                                     | 方向                                                                                          | rtl / ltr / ttb / btt | rtl     |
| show-close            | 是否在抽屉的右上角显示关闭按钮                                                                                                                                                                     | boolean                                                                                          | —                     | true    |
| size                  | 抽屉的尺寸，如果抽屉为水平模式，它将影响宽度属性，否则将影响高度属性，当尺寸为 `number` 类型时，它以像素为单位描述尺寸；当尺寸为 `string` 类型时，它应与 `x%` 符号一起使用，否则将被解释为像素单位 |  number / string | -                     | '30%'   |
| title                 | 抽屉的标题，也可以通过命名插槽设置，有关详细说明，请参阅插槽形式                                                                                                                                   | string                                                                                        | —                     | —       |
| withHeader            | 控制标题部分的存在的标志，默认为 true，当 withHeader 设置为 false 时，`title 属性` 和 `title 插槽` 都不起作用                                                                                      | boolean                                                                                          | -                     | true    |
| modal-class           | 阴影层的额外类名                                                                                                                                                                                   | string                                                                                        | -                     | -       |
| z-index               | 设置 z-index                                                                                                                                                                                       | number                                                                                          | -                     | -       |
| content-cls           | body 区域额外的 class                                                                                                                                                                              | string                                                                                        | -                     | -       |
| content-padding       | body 区域的边距控制 false = 0，字符串直接应用，数字自动加px，数组按css样式规则转换为字符串                                                                                                         | string / number / boolean / array                                                             | -                     | true    |
| content-style         | body 区域的额外样式                                                                                                                                                                                | CSSProperties                                                                                 | -                     | -       |

## Drawer Slots

| Name          | Parameters                                       | Description                                                                                                    |
| ------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| —             | —                                                | Drawer 的内容                                                                                                  |
| header        | `#header='{ title, titleId, titleClass, actions }'` | 抽屉整个头部区域的内容；覆盖此插槽将替换默认的标题和关闭按钮。`actions` 包含 `{ close }` 方法。                |
| title         | `#title='{ title, titleId, titleClass }'`        | 抽屉标题文字；仅替换标题区域，不影响关闭按钮。当提供 `header` 插槽时此插槽无效。                                |
| header-extra  | —                                                | 标题和关闭按钮之间的插入区域，可用于添加操作按钮等内容。当提供 `header` 插槽时此插槽无效。                      |
| footer        | —                                                | 抽屉的页脚部分                                                                                                 |

## Drawer Methods

| Name        | Description                                 |
| ----------- | ------------------------------------------- |
| handleClose | 用于关闭抽屉，此方法将调用 `before-close`。 |

## Drawer Events

| Name   | Description            | Parameter |
| ------ | ---------------------- | --------- |
| open   | 抽屉打开动画开始前触发 | —         |
| opened | 抽屉打开动画结束后触发 | —         |
| close  | 抽屉关闭动画开始前触发 | —         |
| closed | 抽屉关闭动画结束后触发 | —         |