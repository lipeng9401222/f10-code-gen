---
title: Dialog
originUrl: http://192.168.219.170/docs/vue/latest/component/component/dialog.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

> **💡 提示**
>
> 当在 SSR (例如：[Nuxt](https://nuxt.com/v3)) 和 SSG (例如：[VitePress](https://vitepress.vuejs.org/)) 中使用此组件时，需要使用 `<client-only></client-only>` 包裹。

## 基本使用

对话框弹出一个对话框，它是可自定义的。

**Demo 示例**: `dialog/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button text @click="dialogVisible = true"> 点击打开对话框 </e-button>

  <e-dialog v-model="dialogVisible" title="提示" width="30%" :before-close="handleClose">
    <span>这是一条消息</span>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="dialogVisible = false">取消</e-button>
        <e-button type="primary" @click="dialogVisible = false"> 确定 </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  EMessageBox.confirm('Are you sure to close this dialog?')
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
> `before-close` 仅在用户点击关闭图标或背景时有效。如果在名为 `footer` 的槽中有关闭对话框的按钮，您可以在按钮的单击事件处理程序中添加 `before-close` 的操作。

## 全屏和折叠

**Demo 示例**: `dialog/fullscreen-collapse`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button @click="visible = true"> 打开对话框 </e-button>
  <e-dialog v-model="visible" title="提示" show-fullscreen show-collapse> 这是对话框内容。 </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const collapse = ref(false);
const fullscreen = ref(false);
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

```

## 自定义内容

对话框的内容可以是任何内容，甚至是一个表格或表单。此示例显示如何与对话框一起使用表格和表单。

**Demo 示例**: `dialog/customization-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button text @click="dialogTableVisible = true"> 打开嵌套表格的对话框 </e-button>

  <e-dialog v-model="dialogTableVisible" title="送货地址">
    <e-table :data-source="gridData">
      <e-table-column data-index="date" title="日期" width="150" />
      <e-table-column data-index="name" title="姓名" width="200" />
      <e-table-column data-index="address" title="地址" />
    </e-table>
  </e-dialog>

  <!-- 表单 -->
  <e-button text @click="dialogFormVisible = true"> 打开嵌套表单的对话框 </e-button>

  <e-dialog v-model="dialogFormVisible" title="送货地址">
    <e-form :model="form">
      <e-form-item label="促销名称" :label-width="formLabelWidth">
        <e-input v-model="form.name" autocomplete="off" />
      </e-form-item>
      <e-form-item label="区域" :label-width="formLabelWidth">
        <e-select v-model="form.region" placeholder="请选择一个区域">
          <e-option label="区域一" value="shanghai" />
          <e-option label="区域二" value="beijing" />
        </e-select>
      </e-form-item>
    </e-form>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="dialogFormVisible = false">取消</e-button>
        <e-button type="primary" @click="dialogFormVisible = false"> 确认 </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

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
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
];
</script>
<style scoped>
.e-button--text {
  margin-right: 15px;
}
.e-select {
  width: 300px;
}
.e-input {
  width: 300px;
}
</style>

```

## 自定义标题

`header` 插槽用于自定义整个对话框头部区域（标题+按钮）。通过 slot props 可以获取按钮的控制方法和状态。

如果你只需要替换标题文字，可以使用 `title` 插槽。如果你需要在标题和按钮之间插入内容（如操作按钮），可以使用 `header-extra` 插槽。

三个插槽的层级关系：
- `header`：整体覆盖，提供 `actions`/`states` 控制能力
- `title`：仅替换标题文字，slot props 包含 `{ title, titleId }`
- `header-extra`：标题和按钮之间的插入区域

**Demo 示例**: `dialog/customization-header`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button @click="visible = true"> 打开带有自定义标题的对话框 </e-button>
  <e-dialog v-model="visible" :show-close="false">
    <template #header="{ actions, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">这是自定义标题！</h4>
        <e-button type="danger" @click="actions.close">
          <e-icon class="e-icon--left"><CircleCloseFilled /></e-icon>
          关闭
        </e-button>
      </div>
    </template>
    这是对话框内容。
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CircleCloseFilled } from '@epoint-fe/eui-icons';

const visible = ref(false);
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

```

## 自定义标题文字

使用 `title` 插槽仅替换标题区域，不影响默认的关闭按钮。

**Demo 示例**: `dialog/customization-title`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button @click="visible = true">打开带有自定义标题文字的对话框</e-button>
  <e-dialog v-model="visible">
    <template #title="{ titleId, titleClass }">
      <span :id="titleId" :class="titleClass" class="custom-title">
        <e-icon><StarFilled /></e-icon>
        带图标的标题
      </span>
    </template>
    这是对话框内容。
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { StarFilled } from '@epoint-fe/eui-icons';

const visible = ref(false);
</script>

<style scoped>
.custom-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>

```

## Header Extra 区域

使用 `header-extra` 插槽在标题和按钮之间插入内容，例如状态标签、操作按钮等。

**Demo 示例**: `dialog/header-extra-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button @click="visible = true">打开带有额外操作按钮的对话框</e-button>

  <e-button @click="visible2 = true">打开带有额外操作按钮的对话框2</e-button>
  <e-dialog v-model="visible" title="审批详情">
    <template #header-extra>
      <e-tag type="warning">待审批</e-tag>
    </template>
    这是对话框内容。
    <template #footer>
      <e-button>驳回</e-button>
      <e-button type="primary">通过</e-button>
    </template>
  </e-dialog>

  <e-dialog v-model="visible2" title="审批详情" content-class="my-dialog">
    <template #header-extra>
      <div class="flex justify-end gap-m">
        <e-button type="primary">按钮 1</e-button>
        <e-button>按钮 2</e-button>
      </div>
    </template>
    这是对话框内容。
    <template #footer>
      <e-button>驳回</e-button>
      <e-button type="primary">通过</e-button>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const visible2 = ref(false);
</script>

```

## 内容页声明头部操作

当 Dialog 内容由独立组件承载时，可以在内容组件中使用 `<e-popup-header-extra>` 声明头部操作。按钮会自动渲染到默认头部的 `header-extra` 区域，同时仍然保留内容组件的响应式状态和注入上下文。

**Demo 示例**: `dialog/content-header-extra`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button @click="visible = true">打开内容页声明头部操作的 Dialog</e-button>

  <e-dialog v-model="visible" title="编辑项目" width="620px">
    <content-page />
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ContentPage from './content-header-extra-content.vue';

const visible = ref(false);
</script>

```

## 头部控制

通过 `with-header` 可以控制是否渲染 Dialog 头部。隐藏头部后，内容区会撑满 Dialog；此时如果需要关闭入口，需要在内容中自行提供。

**Demo 示例**: `dialog/header-control`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button @click="headerVisible = true">隐藏头部</e-button>

  <e-dialog v-model="headerVisible" title="隐藏头部" width="420px" :with-header="false">
    <div class="plain-content">
      <p>设置 <code>with-header</code> 为 <code>false</code> 后，头部区域不会渲染。</p>
      <p>内容区高度会撑满 Dialog，可自行提供关闭按钮或其他操作入口。</p>
      <e-button type="primary" @click="headerVisible = false">关闭</e-button>
    </div>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const headerVisible = ref(false);
</script>

<style scoped>
.plain-content {
  min-height: 180px;
  padding: 24px;
  box-sizing: border-box;
  background: var(--e-bg-color-page);
}

.plain-content p {
  margin: 0 0 12px;
}
</style>

```

## 嵌套的对话框

如果一个对话框嵌套在另一个对话框中，需要 `append-to-body`。

**Demo 示例**: `dialog/nested-dialog`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button text @click="outerVisible = true"> open the outer Dialog </e-button>

  <e-dialog v-model="outerVisible" title="Outer Dialog">
    <template #default>
      <e-dialog v-model="innerVisible" width="30%" title="Inner Dialog" append-to-body />
    </template>
    <template #footer>
      <div class="dialog-footer">
        <e-button @click="outerVisible = false">Cancel</e-button>
        <e-button type="primary" @click="innerVisible = true"> 打开内部的 Dialog </e-button>
      </div>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const outerVisible = ref(false);
const innerVisible = ref(false);
</script>

```

## 居中的内容

对话框的内容可以居中。

**Demo 示例**: `dialog/centered-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button text @click="centerDialogVisible = true"> 点击打开对话框 </e-button>

  <e-dialog v-model="centerDialogVisible" title="警告" width="30%" center>
    <span> 需要注意，默认情况下内容不会居中对齐 </span>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="centerDialogVisible = false">取消</e-button>
        <e-button type="primary" @click="centerDialogVisible = false"> 确认 </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>

```

> **💡 提示**
>
> 对话框的内容是延迟渲染的，这意味着默认槽在第一次打开之前不会渲染到 DOM 上。因此，如果您需要执行 DOM 操作或使用 `ref` 访问组件，请在 `open` 事件回调中执行。

## 居中对话框

从屏幕中心打开对话框。

**Demo 示例**: `dialog/align-center`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button text @click="centerDialogVisible = true"> 点击打开对话框 </e-button>

  <e-dialog v-model="centerDialogVisible" title="警告" width="30%" align-center>
    <span>从屏幕中心打开对话框</span>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="centerDialogVisible = false">取消</e-button>
        <e-button type="primary" @click="centerDialogVisible = false"> 确认 </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>

```

## 控制打开位置打开

设置 `position` 属性中的 `x` 与 `y` 的值可以控制对话框在置顶位置打开，也可以通过手动使用 `show` 在指定位置打开对话框。

> **💡 提示**
>
> `position` 属性内的值会覆盖 `align-center` 和 `top` 配置。
> 
> 默认情况下，传入的定位坐标会被限制在当前视窗范围内。如果需要严格使用传入坐标，可设置 `clamp-position-to-viewport="false"`。

**Demo 示例**: `dialog/dialog-position`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-form v-model="position1" :inline="true">
    <e-form-item label="x">
      <e-select v-model="position1.x">
        <e-option label="left" value="left" />
        <e-option label="center" value="center" />
        <e-option label="right" value="right" />
      </e-select>
    </e-form-item>
    <e-form-item label="y">
      <e-select v-model="position1.y">
        <e-option label="top" value="top" />
        <e-option label="center" value="center" />
        <e-option label="bottom" value="bottom" />
      </e-select>
    </e-form-item>
    <e-form-item>
      <e-button @click="visible = true">打开对话框</e-button>
    </e-form-item>
  </e-form>
  <e-form v-model="position2" :inline="true">
    <e-form-item label="x">
      <e-select v-model="position2.x">
        <e-option label="left" value="left" />
        <e-option label="center" value="center" />
        <e-option label="right" value="right" />
      </e-select>
    </e-form-item>
    <e-form-item label="y">
      <e-select v-model="position2.y">
        <e-option label="top" value="top" />
        <e-option label="center" value="center" />
        <e-option label="bottom" value="bottom" />
      </e-select>
    </e-form-item>
    <e-form-item>
      <e-button @click="handleClick">打开对话框</e-button>
    </e-form-item>
  </e-form>

  <e-form v-model="position3" :inline="true">
    <e-form-item label="x">
      <e-input-number v-model="position3.x" />
    </e-form-item>
    <e-form-item label="y">
      <e-input-number v-model="position3.y" />
    </e-form-item>
    <e-form-item>
      <e-button @click="visible3 = true">打开对话框</e-button>
    </e-form-item>
  </e-form>

  <e-dialog v-model="visible" :position="position1" title="dialog1" :modal="false" draggable>
    这是对话框内容。
  </e-dialog>
  <e-dialog ref="dialogRef" title="dialog2" :width="500" :modal="false" draggable> 这是对话框内容。 </e-dialog>
  <!-- 测试坐标值， 并且外部可控 -->
  <e-dialog v-model="visible3" :position="position3" title="dialog3" :modal="false" draggable>
    这是对话框内容。
  </e-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const dialogRef = ref();

const visible = ref(false);
const visible3 = ref(false);

const position1 = reactive({
  x: 'center',
  y: 'center',
});

const position2 = reactive({
  x: 'right',
  y: 'bottom',
});

const position3 = reactive({
  x: 100,
  y: 100,
});

const handleClick = () => {
  dialogRef.value.showAtPos(position2);
};
</script>

```

## 关闭时销毁

启用此功能后，将使用 `v-if` 指令销毁默认槽下的内容。当您有性能问题时启用此功能。

**Demo 示例**: `dialog/destroy-on-close`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button text @click="centerDialogVisible = true"> 点击以打开对话框 </e-button>

  <e-dialog v-model="centerDialogVisible" title="通知" width="30%" destroy-on-close center>
    <span> 注意：在首次打开对话框之前，此节点和下面的节点将不会被渲染 </span>
    <div>
      <strong>额外内容（未被渲染）</strong>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="centerDialogVisible = false">取消</e-button>
        <e-button type="primary" @click="centerDialogVisible = false"> 确认 </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>

```

## Draggable Dialog

试着拖动一下 `header` 部分吧

**Demo 示例**: `dialog/draggable-dialog`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button text @click="dialogVisible = true"> Click to open Dialog </e-button>

  <e-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span> 这是可拖拽的 Dialog</span>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="dialogVisible = false">Cancel</e-button>
        <e-button type="primary" @click="dialogVisible = false"> Confirm </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
</script>

```

> **💡 提示**
>
> 当使用 `modal` = false 时，请确保设置了 `append-to-body` 为 **true**，因为 `Dialog` 是由 `position: relative` 定位的。当 `modal` 被移除时，`Dialog` 将根据当前 DOM 中的位置而不是 `Document.Body` 来定位自己，从而导致样式混乱。

## 内容区域样式定义

内容区域默认具备边距，如果是用于展示某些已经有边距的内容，则可能出现预期之外的情况，此时可以自定义边距。

或者当你需要在内容区域上做自己的样式控制，则可以使用下面的几个属性进行定义。

**Demo 示例**: `dialog/content-padding-control`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button text @click="dialogVisible1 = true"> 点击打开对话框1 </e-button>
  <e-button text @click="dialogVisible2 = true"> 点击打开对话框2 </e-button>
  <e-button text @click="dialogVisible3 = true"> 点击打开对话框3 </e-button>
  <e-button text @click="dialogVisible4 = true"> 点击打开对话框4 </e-button>
  <e-button text @click="dialogVisible5 = true"> 点击打开带背景色对话框 </e-button>

  <e-dialog v-model="dialogVisible1" title="没有边距" :content-padding="false">
    <div class="content-demo"><p>没有边距</p></div>
  </e-dialog>
  <e-dialog v-model="dialogVisible2" title="自定义边距" width="30%" :content-padding="[10, 20]">
    <div class="content-demo"><p>自定义边距</p></div>
  </e-dialog>
  <e-dialog v-model="dialogVisible3" title="通过class样式定义" content-cls="my-dialog-content">
    <div class="content-demo"><p>通过class样式定义</p></div>
  </e-dialog>
  <e-dialog v-model="dialogVisible4" title="通过style样式定义" :content-style="myStyle">
    <div class="content-demo"><p>通过style样式定义</p></div>
  </e-dialog>
  <e-dialog v-model="dialogVisible5" title="带背景色的内容区域" width="30%" show-bg>
    <div class="content-demo"><p>内容区域带背景色</p></div>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { CSSProperties } from 'vue';

const dialogVisible1 = ref(false);
const dialogVisible2 = ref(false);
const dialogVisible3 = ref(false);
const dialogVisible4 = ref(false);
const dialogVisible5 = ref(false);

const myStyle = ref<CSSProperties>({
  padding: '50px',
  fontWeight: 'bold',
  textDecoration: 'underline',
});
</script>
<style scoped>
.content-demo {
  background: var(--e-color-primary-light-7);
  height: 300px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
</style>
<style scoped>
.my-dialog-content {
  background-image: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet);
}
</style>

```

## API 方法 - 打开 iframe 页面{#openIframeDialog}

如果完全导入，或者调用了 `app.use(EDialog)`，它将为 `app.config.globalProperties` 添加 `$dialog` 以及 `$iframeDialog` 全局方法， 通过此方法你可以指定一个 url 用 iframe 打开。

**Demo 示例**: `dialog/iframe-dialog`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button text @click="doOpenDialog"> 点击打开对话框 </e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()!;

const doOpenDialog = () => {
  const handler = proxy?.$dialog({
    title: '弹窗',
    url: 'http://192.168.219.170/docs/vue/latest/frame/',
    width: 800,
    height: 600,
    closeCallback: (params) => {
      console.log('close dialog params:', params);
    },
  });

  // setTimeout(() => {
  //   handler.closeDialog()
  // }, 10000);
};
</script>

```

函数支持的签名如下：

- `$dialog(options: IframeDialogOptions)`
- `$dialog(title: string, url: string)`
- `$dialog(title: string, url: string, options: IframeDialogOptions)`
- `$iframeDialog(options: IframeDialogOptions)`

其中 `IframeDialogOptions` 类型定义如下：

```ts
type IframeDialogOptions = Partial<DialogProps> & {
  title: string;
  url: string;
  closeCallback?: (params: any) => void;
  iframeEvents?: {
    onload?: () => void;
    ondestroy?: (action: unknown) => void;
  };
};
```

其中 `IframeDialogOptions` 为 Dialog 的配置项，具体见下表。`url` 参数为要打开的页面地址，`closeCallback` 为关闭时的回调，此回调会在子页面关闭时触发。

如果打开的是 F9 的页面，可以用 F9 的 API `epoint.closeDialog('回传参数')` 来关闭。

其关闭本质是，通过 postMessage 发送了 type 为 closeDialog 的消息，因此始终可以使用类似下面的代码进行关闭操作。

```ts
// 从 url 上获取 dialog 的 id
const urlParams = new URLSearchParams(location.search);
const dialogId = urlParams.get('_dialogId_');

window.parent.postMessage(
  {
    type: 'closeDialog', // 固定值，告诉父页面次消息是用来关闭 dialog
    id: dialogId, // dialog 的 id，从 url 上获取
    params: {}, // 要传递给 closeCallback 回调方法的参数
  },
  '*'
);
```

## API 方法 - 打开组件页面{#openComponentDialog}

如果在页面上要进行组件弹框的操作，直接通过 `<e-dialog />` 标签虽然更为灵活，但需要定义较多的控制变量。此时你也可以通过 API 来进行弹窗操作。

如果完全导入，或者调用了 `app.use(EDialog)`，则在 `app.config.globalProperties` 会添加 `$componentDialog` 和 `$dialog` 全局方法, 可以打开一个内容为指定组件的弹框页面。

**Demo 示例**: `dialog/component-dialog`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/dialog.html)

```vue
<template>
  <e-button @click="openComponentDialog">点击打开组件对话框</e-button>
</template>

<script setup>
import { defineAsyncComponent, getCurrentInstance, h } from 'vue';

const { proxy } = getCurrentInstance();

const openComponentDialog = () => {
  console.log(proxy, proxy.$dialog, proxy.$message);
  proxy?.$dialog(
    {
      title: '快速显示组件的dialog',
      width: 600,
      height: 400,
      closeCallback: (action) => {
        console.log('关闭对话框, 回传值为', action);
        proxy?.$message(`关闭对话框, 回传值为${action}`);
      },
    },
    () => {
      return h(
        // content1,
        defineAsyncComponent(() => import('./component-dialog-content-1.vue')),
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

<<< @/examples/dialog/component-dialog-content-1.vue

:::

:::details 内容组件 2，代码如下：

<<< @/examples/dialog/component-dialog-content-2.vue

:::

函数支持的几个签名:

- 传入弹窗标题、弹窗配置项、内容渲染函数：<br>`$dialog(title: string, dialogOptions: ComponentDialogOptions, render: () => VNode): ComponentDialogApi`;
- 传入弹窗配置项、内容渲染函数：<br>`$dialog(dialogOptions: ComponentDialogOptions, render: () => VNode): ComponentDialogApi`;
- 传入弹窗配置项、内容渲染函数：<br>`$componentDialogdialogOptions: ComponentDialogOptions, render: () => VNode): ComponentDialogApi`;

参数说明：

其中 `ComponentDialogOptions` 类型是 Dialog 本身属性的子集，支持大部分属性，并额外支持 `closeCallback` 回调和头部渲染函数。

```ts
// 组件弹框要求配置
type ComponentDialogOptions = Partial<DialogProps> & {
  closeCallback?: (action: any) => void;
  /** 渲染整个头部区域 */
  renderHeader?: (props: DialogHeaderSlotProps) => VNode;
  /** 渲染标题和按钮之间的插入区域 */
  renderHeaderExtra?: () => VNode;
};

type DialogHeaderActions = {
  close: () => void;
  collapse: () => void;
  fullscreen: () => void;
};

type DialogHeaderStates = {
  collapse: boolean;
  fullscreen: boolean;
};

type DialogHeaderSlotProps = {
  titleId: string;
  titleClass: string;
  actions: DialogHeaderActions;
  states: DialogHeaderStates;
};
```

`render` 方法是一个渲染函数，用来指定内容区域使用什么组件来渲染，这块的实现可以直接返回对 Vue 提供的 render 函数(及即 `h` 方法)的调用。关于此方法详细参阅[渲染函数 API - h](https://cn.vuejs.org/api/render-function.html#h)。：

:::details 一个简单的渲染函数示例

```ts
// 完整参数签名
function h(type: string | Component, props?: object | null, children?: Children | Slot | Slots): VNode;

// 完整的示例 其中 h 从vue 导入
proxy?.$dialog(
  {
    title: '快速显示组件的dialog的API',
    width: 600,
    height: 400,
    closeCallback: (action) => {
      console.log('关闭对话框, 回传值为', action);
      proxy?.$message(`关闭对话框, 回传值为${action}`);
    },
  },
  () => {
    return h(
      /* 第一个参数是要渲染的组件 全局组件可以用字符串 否则应该是导入的组件 */
      content1,
      /* 第二个参数是要渲染的组件的属性，事件的监听使用on开头 */
      {
        title: '属性值1',
        content: '属性值2 ',
      }
      /* 第三个参数是要传递给渲染组件的内容，也就是插槽(一般来说不需要) */
    );
  }
);
```

:::

此方法会返回 `ComponentDialogApi` 对象，其中包含了必要的对弹窗操作的 API，ts 定义如下：

```ts
type BaseDialogApi = {
  // 关闭弹窗并回传参数
  closeDialog: (action?: string) => void;
  // 关闭弹窗并回传参数
  close: (action?: string) => void;

  // 设置弹窗标题
  setTitle: (title: string) => void;
  // 设置弹窗配置项
  setOptions: (option: Partial<DialogProps>) => void;
};
type ComponentDialogApi = BaseDialogApi & {
  // 更新弹窗的内容 传入一个新的渲染函数 即可切换展示的内容组件 详见上方示例代码
  updateContent: (contentRender: ComponentDialogContentRender) => void;
};
```

此 API 对象通过 Vue 的 Provide 提供给了弹窗内部的组件，可以通过 `inject('getCurrentDialog')` 的调用来获取此 API。

组件内容页中也可以使用 `<e-popup-header-extra>` 声明头部操作按钮；这类按钮与 `renderHeaderExtra` 可以同时存在。如果传入 `renderHeader` 完全替换头部，默认的 `header-extra` 容器不存在，`<e-popup-header-extra>` 不会显示。

## API

### Attributes

| Name                  | Description                                                  | Type                                                | Default |
| --------------------- | ------------------------------------------------------------ | --------------------------------------------------- | ------- |
| model-value / v-model | Dialog 的可见性                                              | boolean                                             | —       |
| title                 | Dialog 的标题。也可以通过一个命名槽传递（见下表）            | string                                              | —       |
| width                 | Dialog 的宽度                                                | string / number                                     | 50%     |
| height                | Dialog 的高度                                                | string / number                                     | —       |
| fullscreen            | Dialog 是否全屏显示                                          | boolean                                             | false   |
| top                   | Dialog CSS 的`margin-top`值                                  | string                                              | 15vh    |
| modal                 | 是否显示遮罩层                                               | boolean                                             | true    |
| append-to-body        | 是否将 Dialog 自身追加到 body 中。false 时 dialog 会被限制在父元素中显示 | boolean                                             | true   |
| content-cls           | 内容区域的额外样式类名                                       | string                                              | -       |
| content-padding       | 内容区域的边距，false = 0，字符串直接应用，数字自动加 px，数组按 css 样式规则转换为字符串 | boolean / string / number / `Array<number\|string>` | -       |
| content-style         | 内容区域的额外样式，优先级最高                               | CSSProperties                                       | -       |
| lock-scroll           | 当 Dialog 显示时，是否禁用 body 的滚动                       | boolean                                             | true    |
| show-bg               | 是否为内容区域添加背景色                                     | boolean                                             | false   |
| open-delay            | 打开之前的时间（毫秒）                                       | number                                              | 0       |
| close-delay           | 关闭之前的时间（毫秒）                                       | number                                              | 0       |
| close-on-click-modal  | 是否可以通过点击遮罩层关闭 Dialog                            | boolean                                             | false   |
| close-on-press-escape | 是否可以通过按 ESC 关闭 Dialog                               | boolean                                             | false   |
| show-close            | 是否显示关闭按钮                                             | boolean                                             | true    |
| with-header           | 是否显示头部，关闭后内容区高度撑满 Dialog                    | boolean                                             | true    |
| show-fullscreen       | 是否显示全屏按钮                                             | boolean                                             | false   |
| show-collapse         | 是否显示折叠按钮                                             | boolean                                             | false   |
| before-close          | Dialog 关闭前的回调，它将阻止 Dialog 关闭                    | 函数(done) (done 用于关闭 Dialog)                   | —       |
| draggable             | 为 Dialog 启用拖动功能                                       | boolean                                             | false   |
| center                | 是否将标题和底部对齐到中心                                   | boolean                                             | false   |
| align-center          | 是否在水平和垂直上对齐 Dialog                                | boolean                                             | false   |
| position              | 对话框的打开位置                                             | Position                                            | null    |
| clamp-position-to-viewport | 是否将 `position` 计算后的坐标限制在当前视窗内             | boolean                                             | true    |
| destroy-on-close      | 关闭时销毁 Dialog 中的元素                                   | boolean                                             | false   |
| bringToFrontOnClick   | 多个弹窗时是否开启弹窗点击置顶功能                           | boolean                                             | true    |
| fitViewport           | 弹窗大小超出视窗时是否自动调整大小。对于用 api 打开的弹窗默认值为 true                           | boolean                                             | false    |

### Slots

| Name          | Parameters                                                | Description                                                  |
| ------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| header        | `#header='{ title, titleId, titleClass, actions, states }'` | 对话框整个头部区域的内容；覆盖此插槽将替换默认的标题和按钮。`actions` 包含 `{ close, collapse, fullscreen }` 方法，`states` 包含 `{ collapse, fullscreen }` 状态。 |
| title         | `#title='{ title, titleId, titleClass }'`                 | 对话框标题文字；仅替换标题区域，不影响按钮。                  |
| header-extra  | —                                                         | 标题和按钮之间的插入区域，可用于添加操作按钮等内容。          |
| footer        | —                                                         | Dialog 底部的内容                                            |

### Events

| Name             | Description                 | Parameters |
| ---------------- | --------------------------- | ---------- |
| open             | Dialog 打开时触发           | —          |
| opened           | Dialog 打开动画结束时触发   | —          |
| close            | Dialog 关闭时触发           | —          |
| closed           | Dialog 关闭动画结束时触发   | —          |
| open-auto-focus  | Dialog 打开后内容聚焦时触发 | —          |
| close-auto-focus | Dialog 关闭后内容聚焦时触发 | —          |

### Expose

| Method    | Description          | Parameters |
| :-------- | :------------------- | :--------- |
| showAtPos | 在置顶位置打开对话框 | Position   |

### Option Position Attributes

| Name | Description | Type                                                  | Default |
| ---- | ----------- | ----------------------------------------------------- | ------- |
| x    | X 轴位置    | ^[number] / ^[string]`'left' \| 'center' \| 'right' ` | null    |
| y    | Y 轴位置    | ^[number] / ^[string]`'top' \| 'center' \| 'bottom' ` | null    |

## FAQ

#### 在 SFC 文件中使用对话框，scope 样式不会生效。

典型议题：[#10515](https://github.com/element-plus/element-plus/issues/10515)

PS：既然对话框是使用  `Teleport`  渲染的，建议在全局范围写入根节点的样式。

#### 当对话框被显示及隐藏时，页面元素会来回移动（抖动）。

典型议题：[#10481](https://github.com/element-plus/element-plus/issues/10481)

PS：建议将滚动区域放置在一个挂载的 vue 节点，如  `<div id="app" />`  下，并对 body 使用  `overflow: hidden`  样式。