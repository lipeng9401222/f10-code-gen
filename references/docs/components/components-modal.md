---
title: Modal
originUrl: http://192.168.219.170/docs/vue/latest/component/component/modal.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

# Modal 全屏弹窗

用于承载页面级的复杂操作或详情展示。采用全屏布局，左上角提供返回按钮，适合需要用户专注的操作场景。

:::tip 适用场景与区别
- **Modal (全屏弹窗)**：强覆盖整个视窗，适用于需要沉浸式、无干扰体验的复杂操作或大体量数据展示。
- **Dialog (对话框)**：保留当前页面上下文，适用于轻量级的局部交互（如信息确认、简单录入）。
:::

## 基本使用

全屏弹窗默认覆盖整个视窗，头部左侧提供返回按钮。

**Demo 示例**: `modal/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-button @click="visible = true">打开 Modal</e-button>

  <e-modal v-model="visible" title="用户信息">
    <p>这里是内容区域</p>
    <p>Modal 采用全屏布局,提供沉浸式的操作体验</p>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

```

## 嵌入式模式

通过 `mode="embed"` 和 `target` 可以将 Modal 嵌入到指定容器内部，适合在页面局部区域进行编辑或预览操作。

**Demo 示例**: `modal/embed-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <div class="embed-demo">
    <div class="embed-demo__toolbar">
      <e-button type="primary" @click="visible = true">打开嵌入式 Modal</e-button>
      <e-button @click="changeContainerHeight">切换容器高度</e-button>
    </div>

    <div class="embed-demo__target-wrap">
      <div class="embed-demo__target-title">目标容器（Modal 将嵌入到这里）</div>
      <div ref="targetElement" class="embed-demo__target" :style="{ height: `${containerHeight}px` }">
        <e-modal v-model="visible" mode="embed" :target="targetElement" title="嵌入式编辑面板">
          <p>当前为嵌入式模式，不会全屏覆盖页面。</p>
          <p>点击“切换容器高度”可验证弹窗尺寸跟随容器变化。</p>
        </e-modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const containerHeight = ref(320);

const targetElement = ref<HTMLElement | null>(null);

const changeContainerHeight = () => {
  containerHeight.value = containerHeight.value === 320 ? 420 : 320;
};
</script>

<style scoped>
.embed-demo__toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.embed-demo__target-wrap {
  border: 1px solid var(--e-border-color);
  border-radius: 6px;
  padding: 12px;
  background: var(--e-bg-color-page);
}

.embed-demo__target-title {
  margin-bottom: 8px;
  color: var(--e-text-color-secondary);
  font-size: 13px;
}

.embed-demo__target {
  position: relative;
  overflow: auto;
  border: 1px dashed var(--e-border-color);
  border-radius: 4px;
  background: var(--e-bg-color);
  transition: height 0.2s ease;
}
</style>

```

## 无感嵌入

嵌入式模式默认会去除明显的弹窗外观，并以更接近页面片段的方式覆盖目标区域。默认会保留简洁头部；如果需要让内容完全接管顶部区域，可以再显式设置 `with-header=false`。

如果需要在 Modal 打开期间隐藏原目标区域内容，可以通过 `open` 与 `before-close` 自行维护业务 class。

**Demo 示例**: `modal/embed-seamless`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <div class="seamless-demo">
    <div class="seamless-demo__toolbar">
      <e-button type="primary" @click="visible = true">打开无感嵌入 Modal</e-button>
    </div>

    <div ref="targetElement" :class="['seamless-demo__target', { 'is-hidden': targetHidden }]">
      <div class="seamless-demo__target-title">详情卡片</div>
      <p>示例通过 <code>open</code> 与 <code>before-close</code> 维护目标区域状态，并在相同位置展示 Modal 内容。</p>
      <p>适合把页面局部区域临时切换为编辑态或详情态。</p>

      <e-modal
        v-model="visible"
        mode="embed"
        :target="targetElement"
        title="编辑详情卡片"
        :before-close="handleBeforeClose"
        @open="targetHidden = true"
      >
        <template #header-extra>
          <e-button type="primary" @click="visible = false">完成</e-button>
        </template>
        <div class="seamless-demo__content">
          <div class="seamless-demo__content-title">编辑内容</div>
          <p>嵌入式 Modal 会自动弱化弹窗外观，并使用更贴近页面工具栏的简洁头部。</p>
        </div>
      </e-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const targetElement = ref<HTMLElement | null>(null);
const targetHidden = ref(false);

const handleBeforeClose = (done: (cancel?: boolean) => void) => {
  targetHidden.value = false;
  done();
};
</script>

<style scoped>
.seamless-demo__toolbar {
  margin-bottom: 12px;
}

.seamless-demo__target {
  min-height: 220px;
  padding: 20px;
  border: 1px solid var(--e-border-color);
  border-radius: 6px;
  background: var(--e-bg-color-page);
  box-sizing: border-box;
}

.seamless-demo__target.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.seamless-demo__target-title {
  margin-bottom: 12px;
  color: var(--e-text-color-primary);
  font-size: 16px;
  font-weight: 600;
}

.seamless-demo__target p {
  margin: 0 0 8px;
  color: var(--e-text-color-secondary);
}

.seamless-demo__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.seamless-demo__content-title {
  margin-bottom: 12px;
  color: var(--e-text-color-primary);
  font-size: 16px;
  font-weight: 600;
}

.seamless-demo__content p {
  margin: 0;
  color: var(--e-text-color-secondary);
}
</style>

```

> **💡 提示**
>
> 嵌入模式会移除 Modal 外层额外的裁剪容器，避免额外影响内部弹出层。像 Select、Dropdown、DatePicker 这类弹出型组件，建议保持默认的 `teleported=true`；如果显式关闭 teleport，它们仍会受到自身滚动容器的约束。
> 
> 嵌入模式内部会关闭 Dialog 的视窗位置裁剪逻辑，严格跟随 `target` 的实际矩形区域。即使目标区域有一部分超出当前视口，也会保留原始定位。
> 
> 当 `target` 传入 CSS 选择器时，组件仅在初始化时解析一次，不会追踪目标元素的 DOM 生命周期变化。如果目标元素被替换、移除或页面路由切换导致 DOM 重建，需要调用方手动更新 `target` 属性以重新定位。推荐优先传入 HTMLElement 引用以获得更好的响应性。

## 带有标题图标

通过 `icon` 属性可以在标题左侧显示一个图标，增强业务辨识度。`icon` 属性极其灵活，支持以下三种形式：

1. **组件实例**：传入一个 Vue 图标组件实例（需配合局部/全局引入）。
2. **图片 URL**：传入以 `http://`、`https://` 或 `/` 开头的字符串，将被渲染为背景图。
3. **字体图标 Class**：传入普通字符串（如 `"menuicon-collection-filled"`），将渲染为包含此 class 的字体图标。

通过 `icon-bg-color` 和 `icon-color` 属性可以自定义图标的背景色和颜色。

**Demo 示例**: `modal/with-icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-space>
    <e-button @click="openComponentIcon">组件图标</e-button>
    <e-button @click="openStringIcon">字体图标</e-button>
    <e-button @click="openUrlIcon">图片 URL</e-button>
  </e-space>

  <e-modal v-model="visible" :title="title" :icon="currentIcon" :icon-bg-color="bgColor" :icon-color="color">
    <e-card>
      <p><strong>当前渲染方式：</strong>{{ currentType }}</p>
      <e-form :model="formData" label-width="80px" class="mt-l">
        <e-form-item label="用户名">
          <e-input v-model="formData.username" />
        </e-form-item>
        <e-form-item label="邮箱">
          <e-input v-model="formData.email" />
        </e-form-item>
      </e-form>
    </e-card>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import { Edit } from '@epoint-fe/eui-icons';

const visible = ref(false);
const title = ref('');
const currentIcon = shallowRef<any>();
const bgColor = ref('');
const color = ref('');
const currentType = ref('');

const openComponentIcon = () => {
  title.value = '使用 Vue 组件';
  currentIcon.value = Edit;
  bgColor.value = '#fff3e0';
  color.value = '#ff6b00';
  currentType.value = '传入 Vue 图标组件实例 (Component)';
  visible.value = true;
};

const openStringIcon = () => {
  title.value = '使用字体图标';
  currentIcon.value = 'custom-demo-icon';
  bgColor.value = '#e3f2fd';
  color.value = '#1976d2';
  currentType.value = '传入字体图标的 class 字符串';
  visible.value = true;
};

const openUrlIcon = () => {
  title.value = '使用图片 URL';
  // 采用一个公网图片作为演示
  currentIcon.value = 'https://cn.vuejs.org/logo.svg';
  bgColor.value = '#f4f4f5';
  color.value = ''; // 通常图片自身带颜色，不需单独设定 icon-color
  currentType.value = '传入以 http(s):// 或 / 开头的图片地址字符串';
  visible.value = true;
};

const formData = ref({
  username: '张三',
  email: 'zhangsan@example.com',
});
</script>

<style>
/* 本地模拟一个字体图标类以供演示 */
.custom-demo-icon::before {
  content: '★';
  font-family: inherit;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>

```

## 头部右侧自定义内容

通过 `header-extra` 插槽，可以在头部右侧添加操作按钮（如：保存、提交、打印等），同时保留默认的返回按钮和标题。

**Demo 示例**: `modal/header-extra`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-button @click="visible = true">打开带操作按钮的 Modal</e-button>

  <e-modal v-model="visible" title="新增业务数据">
    <template #header-extra>
      <e-button @click="handleSaveDraft">保存草稿</e-button>
      <e-button type="primary" @click="handleSubmit">提交</e-button>
    </template>

    <e-card>
      <e-form ref="formRef" :model="formData" label-width="100px">
        <e-form-item label="业务名称">
          <e-input v-model="formData.name" />
        </e-form-item>
        <e-form-item label="业务类型">
          <e-select v-model="formData.type" placeholder="请选择">
            <e-option label="类型一" value="1" />
            <e-option label="类型二" value="2" />
          </e-select>
        </e-form-item>
        <e-form-item label="描述">
          <e-input v-model="formData.description" type="textarea" :rows="4" />
        </e-form-item>
      </e-form>
    </e-card>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const visible = ref(false);
const formData = ref({
  name: '',
  type: '',
  description: '',
});

const handleSaveDraft = () => {
  EMessage.success('草稿已保存');
};

const handleSubmit = () => {
  EMessage.success('提交成功');
  visible.value = false;
};
</script>

```

## 内容页声明头部操作

当 Modal 内容是独立组件时，可以在内容组件中使用 `<e-popup-header-extra>` 声明头部右侧按钮。按钮会渲染到 Modal 的头部右侧区域，并保留内容组件内部的响应式状态和注入上下文。

**Demo 示例**: `modal/content-header-extra`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-button @click="visible = true">打开内容页声明头部操作的 Modal</e-button>

  <e-modal v-model="visible" title="采购申请">
    <content-page />
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ContentPage from './content-header-extra-content.vue';

const visible = ref(false);
</script>

```

## 完全自定义头部

如果默认的头部布局无法满足需求，可以使用 `header` 插槽**完全替换**整个头部区域。

**Demo 示例**: `modal/custom-header`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-button @click="visible = true">打开自定义头部的 Modal</e-button>

  <e-modal v-model="visible" title="详情展示">
    <template #header="{ close, title }">
      <div class="flex items-center">
        <e-button @click="close">
          <e-icon><ArrowLeft /></e-icon>
          返回
        </e-button>
        <span class="ml-l">{{ title }}</span>
      </div>
    </template>

    <p>这是一个自定义头部示例。</p>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ArrowLeft } from '@epoint-fe/eui-icons';

const visible = ref(false);
</script>

```

## 自定义返回按钮文字

通过 `back-text` 属性可以修改返回按钮的文字。设置为空字符串可以只显示箭头图标。

**Demo 示例**: `modal/back-text`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-space>
    <e-button @click="visible1 = true">自定义返回文字</e-button>
    <e-button @click="visible2 = true">只显示箭头</e-button>
  </e-space>

  <e-modal v-model="visible1" title="自定义返回文字" back-text="关闭">
    <p>返回按钮显示为"关闭"</p>
  </e-modal>

  <e-modal v-model="visible2" title="只显示箭头" back-text="">
    <p>返回按钮只显示箭头图标</p>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible1 = ref(false);
const visible2 = ref(false);
</script>

```

## 关闭前确认

使用 `before-close` 属性可以在关闭前进行确认，防止用户误操作导致数据丢失。

**Demo 示例**: `modal/before-close`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-button @click="visible = true">打开表单 Modal</e-button>

  <e-modal v-model="visible" title="编辑表单" :before-close="handleBeforeClose">
    <e-card>
      <e-form :model="formData" label-width="100px">
        <e-form-item label="标题">
          <e-input v-model="formData.title" @input="hasChanged = true" />
        </e-form-item>
        <e-form-item label="内容">
          <e-input v-model="formData.content" type="textarea" :rows="4" @input="hasChanged = true" />
        </e-form-item>
      </e-form>
    </e-card>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';

const visible = ref(false);
const hasChanged = ref(false);
const formData = ref({
  title: '',
  content: '',
});

const handleBeforeClose = (done: () => void) => {
  if (hasChanged.value) {
    EMessageBox.confirm('表单尚未保存,确定要关闭吗?')
      .then(() => {
        hasChanged.value = false;
        done();
      })
      .catch(() => {
        // 取消关闭
      });
  } else {
    done();
  }
};
</script>

```

## 内容区域 Padding 控制

通过 `content-padding` 属性可以控制 body 区域的内边距。默认行为与 Dialog 组件保持一致，不设置固定 padding，由内容自行控制。

- `content-padding="false"`：内边距设为 0，适合完全自定义布局
- `content-padding="20"`：数字类型，自动添加 px 单位
- `content-padding="20px 40px"`：字符串类型，直接应用 CSS 值
- `content-padding="[10, '20px', 30]"`：数组类型，按 CSS 规则拼接

**Demo 示例**: `modal/content-padding`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-button @click="visible1 = true">默认 Padding</e-button>
  <e-button style="margin-left: 12px" @click="visible2 = true">无 Padding</e-button>
  <e-button style="margin-left: 12px" @click="visible3 = true">自定义 Padding</e-button>

  <e-modal v-model="visible1" title="默认 Padding">
    <p>body 区域使用默认的 padding 间距</p>
    <p>与 Dialog 保持一致的默认表现</p>
  </e-modal>

  <e-modal v-model="visible2" title="无 Padding" :content-padding="false">
    <p class="p-l">需要自行在内容区域添加 padding</p>
    <p class="p-l">适合完全自定义布局的场景</p>
  </e-modal>

  <e-modal v-model="visible3" title="自定义 Padding" content-padding="20px 40px">
    <p>body 区域使用自定义的 padding 值</p>
    <p>支持数字、字符串、数组和 false 四种形式</p>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
</script>

```

## API 方法 - 打开 iframe 页面{#openIframeModal}

如果完全导入，或者调用了 `app.use(EModal)`，它将为 `app.config.globalProperties` 添加 `$modal` 以及 `$iframeModal` 全局方法，通过此方法你可以指定一个 url 用 iframe 打开。

**Demo 示例**: `modal/api-iframe`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-space>
    <e-button @click="openIframe1">简写形式</e-button>
    <e-button @click="openIframe2">配置对象形式</e-button>
  </e-space>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const { proxy } = getCurrentInstance()!;

const openIframe1 = () => {
  proxy?.$modal('页面标题', 'http://192.168.219.170/docs/vue/latest/frame/');
};

const openIframe2 = () => {
  proxy?.$modal({
    title: 'Vue 文档',
    url: 'http://192.168.219.170/docs/vue/latest/frame/',
    width: '80%',
    height: '80%',
    closeCallback: (action) => {
      EMessage.info(`Modal 已关闭: ${action}`);
    },
  });
};
</script>

```

函数支持的签名如下：

- `$modal(options: IframeModalOptions)`
- `$modal(title: string, url: string)`
- `$modal(title: string, url: string, options: IframeModalOptions)`
- `$iframeModal(options: IframeModalOptions)`

其中 `IframeModalOptions` 类型定义如下：

```ts
type IframeModalOptions = Partial<ModalProps> & {
  title: string;
  url: string;
  onOpen?: () => void;
  onOpened?: () => void;
  onClose?: () => void;
  onClosed?: () => void;
  beforeClose?: (done: (cancel?: boolean) => void) => void;
  closeCallback?: (params: any) => void;
  iframeEvents?: {
    onload?: () => void;
    ondestroy?: (action: unknown) => void;
  };
};
```

其中 `IframeModalOptions` 为 Modal 的配置项，具体见下表。`url` 参数为要打开的页面地址，`onOpen`、`onClosed` 等事件回调用于响应弹窗生命周期；如果需要在关闭流程开始前处理状态，可以使用 `beforeClose`；`closeCallback` 为关闭时的回调，此回调会在子页面关闭时触发。

如果打开的是 F9 的页面，可以用 F9 的 API `epoint.closeDialog('回传参数')` 来关闭。

其关闭本质是，通过 postMessage 发送了 type 为 closeDialog 的消息，因此始终可以使用类似下面的代码进行关闭操作。

```ts
// 从 url 上获取 modal 的 id
const urlParams = new URLSearchParams(location.search);
const dialogId = urlParams.get('_dialogId_');

window.parent.postMessage(
  {
    type: 'closeDialog', // 固定值，告诉父页面此消息是用来关闭 modal
    id: dialogId, // modal 的 id，从 url 上获取
    params: {}, // 要传递给 closeCallback 回调方法的参数
  },
  '*'
);
```

## API 方法 - 打开组件页面{#openComponentModal}

如果在页面上要进行组件弹框的操作，直接通过 `<e-modal />` 标签虽然更为灵活，但需要定义较多的控制变量。此时你也可以通过 API 来进行弹窗操作。

如果完全导入，或者调用了 `app.use(EModal)`，则在 `app.config.globalProperties` 会添加 `$componentModal` 和 `$modal` 全局方法，可以打开一个内容为指定组件的弹框页面。

**Demo 示例**: `modal/api-basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-button @click="openModal">通过 API 打开 Modal</e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h } from 'vue';
import { Edit } from '@epoint-fe/eui-icons';
import ModalContent from './modal-content-basic.vue';

const { proxy } = getCurrentInstance()!;

const openModal = () => {
  proxy?.$modal(
    {
      title: '编辑用户信息',
      icon: Edit,
      closeCallback: (action) => {
        console.log('Modal 关闭,回传值:', action);
      },
    },
    () => h(ModalContent)
  );
};
</script>

```

函数支持的几个签名：

- 传入弹窗标题、弹窗配置项、内容渲染函数：<br>`$modal(title: string, modalOptions: ComponentModalOptions, render: () => VNode): ComponentModalApi`;
- 传入弹窗配置项、内容渲染函数：<br>`$modal(modalOptions: ComponentModalOptions, render: () => VNode): ComponentModalApi`;
- 传入弹窗配置项、内容渲染函数：<br>`$componentModal(modalOptions: ComponentModalOptions, render: () => VNode): ComponentModalApi`;

参数说明：

其中 `ComponentModalOptions` 类型是 Modal 本身属性的子集，支持大部分属性，并额外支持生命周期事件回调、`closeCallback` 回调和 `renderHeader`、`renderHeaderExtra` 渲染函数。

```ts
type ComponentModalOptions = Partial<ModalProps> & {
  onOpen?: () => void;
  onOpened?: () => void;
  onClose?: () => void;
  onClosed?: () => void;
  beforeClose?: (done: (cancel?: boolean) => void) => void;
  closeCallback?: (action: any) => void;
  renderHeader?: (props: { close: () => void }) => VNode;
  renderHeaderExtra?: () => VNode;
};
```

`render` 方法是一个渲染函数，用来指定内容区域使用什么组件来渲染，这块的实现可以直接返回对 Vue 提供的 render 函数(即 `h` 方法)的调用。关于此方法详细参阅[渲染函数 API - h](https://cn.vuejs.org/api/render-function.html#h)。

此方法会返回 `ComponentModalApi` 对象，其中包含了必要的对弹窗操作的 API，ts 定义如下：

```ts
type BaseModalApi = {
  // 关闭弹窗并回传参数
  closeModal: (action?: string) => void;
  // 关闭弹窗并回传参数
  close: (action?: string) => void;

  // 设置弹窗标题
  setTitle: (title: string) => void;
  // 设置弹窗配置项
  setOptions: (option: Partial<ModalProps>) => void;
};
type ComponentModalApi = BaseModalApi & {
  // 更新弹窗的内容 传入一个新的渲染函数 即可切换展示的内容组件
  updateContent: (contentRender: () => VNode) => void;
};
```

此 API 对象通过 Vue 的 Provide 提供给了弹窗内部的组件，可以通过 `inject('getCurrentModal')` 的调用来获取此 API。

### 使用 renderHeaderExtra 自定义右侧区域

**Demo 示例**: `modal/api-header-extra`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-button @click="openModal">API 调用 - 自定义右侧区域</e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h } from 'vue';
import { Edit } from '@epoint-fe/eui-icons';
import { EButton, EMessage } from '@epoint-fe/eui-components';
import ModalContent from './modal-content-basic.vue';

const { proxy } = getCurrentInstance()!;

const handleSave = () => {
  EMessage.success('保存草稿');
};

const handleSubmit = () => {
  EMessage.success('提交成功');
};

const openModal = () => {
  proxy?.$modal(
    {
      title: '编辑用户信息',
      icon: Edit,
      renderHeaderExtra: () =>
        h('div', { class: 'flex gap-s' }, [
          h(EButton, { onClick: handleSave }, () => '保存草稿'),
          h(EButton, { type: 'primary', onClick: handleSubmit }, () => '提交'),
        ]),
      closeCallback: (action) => {
        console.log('关闭动作:', action);
      },
    },
    () => h(ModalContent)
  );
};
</script>

```

组件内容页中也可以使用 `<e-popup-header-extra>` 声明头部操作按钮；这类按钮与 `renderHeaderExtra` 可以同时存在。如果传入 `renderHeader` 完全替换头部，默认的右侧操作容器不存在，`<e-popup-header-extra>` 不会显示。

### 使用 renderHeader 完全自定义头部

**Demo 示例**: `modal/api-custom-header`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/modal.html)

```vue
<template>
  <e-button @click="openModal">API 调用 - 完全自定义头部</e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h } from 'vue';
import { ArrowLeft } from '@epoint-fe/eui-icons';
import { EButton, EIcon } from '@epoint-fe/eui-components';
import ModalContent from './modal-content-basic.vue';

const { proxy } = getCurrentInstance()!;

const openModal = () => {
  proxy?.$modal(
    {
      title: '自定义头部',
      renderHeader: ({ close }) => {
        return h(
          'div',
          {
            class: 'flex items-center justify-between px-l text-white',
            style: 'height: 60px; background: linear-gradient(to right, #667eea, #764ba2);',
          },
          [
            h(EButton, { text: true, onClick: close }, () => [h(EIcon, null, () => h(ArrowLeft)), ' 离开']),
            h('h2', { class: 'm-0' }, '自定义标题'),
            h(EButton, { type: 'primary' }, () => '操作'),
          ]
        );
      },
    },
    () => h(ModalContent)
  );
};
</script>

```

> **💡 提示**
>
> `renderHeader` 和 `renderHeaderExtra` 是互斥的。如果同时提供，`renderHeader` 优先级更高，`renderHeaderExtra` 将被忽略。

## API

### Attributes

| Name                  | Description                                           | Type                         | Default |
| --------------------- | ----------------------------------------------------- | ---------------------------- | ------- |
| model-value / v-model | 是否显示 Modal                                        | `boolean`                    | `false` |
| title                 | 标题                                                  | `string`                     | —       |
| icon                  | 标题左侧图标，支持图标组件、字体图标 class 或图片 URL | `Component \| string`        | —       |
| icon-bg-color         | 图标的背景色                                          | `string`                     | —       |
| icon-color            | 图标的颜色                                            | `string`                     | —       |
| back-text             | 返回按钮的文字，设为空字符串则只显示箭头              | `string`                     | `''`    |
| mode                  | 渲染模式，支持全屏和嵌入覆盖                          | `'fullscreen' \| 'embed'`   | `'fullscreen'` |
| target                | 嵌入覆盖目标，仅在 `mode='embed'` 时生效              | `string \| HTMLElement`     | —       |
| with-header           | 是否显示头部，关闭后内容区高度撑满 Modal              | `boolean`                    | `true`  |
| before-close          | 关闭前的回调，可用于阻止关闭                          | `(done: (cancel?: boolean) => void) => void` | —       |
| destroy-on-close      | 关闭时销毁内容                                        | `boolean`                    | `false` |
| close-on-press-escape | 是否可通过 ESC 关闭                                   | `boolean`                    | `true`  |
| lock-scroll           | 当 Modal 显示时，是否禁用 body 的滚动                 | `boolean`                    | `true`  |
| append-to-body        | 是否将 Modal 追加到 body                              | `boolean`                    | `true`  |
| z-index               | Modal 的 z-index                                      | `number`                     | —       |
| modal                 | 是否显示遮罩层                                        | `boolean`                    | `true`  |
| modal-class           | 遮罩层的自定义类名                                    | `string`                     | —       |
| open-delay            | 打开之前的时间（毫秒）                                | `number`                     | `0`     |
| close-delay           | 关闭之前的时间（毫秒）                                | `number`                     | `0`     |
| content-cls           | body 区域额外的 class                                 | `string`                     | —       |
| content-padding       | body 区域的边距控制 false = 0，支持数字、字符串、数组 | `string \| number \| boolean \| array` | `true`  |
| content-style         | body 区域的额外样式                                   | `CSSProperties`              | —       |

### Slots

| Name         | Description            | Parameters                             |
| ------------ | ---------------------- | -------------------------------------- |
| default      | Modal 的主要内容区域   | —                                      |
| header       | 完全自定义整个头部区域 | `{ close: () => void, title: string }` |
| header-extra | 仅自定义头部右侧区域   | —                                      |
| footer       | 底部区域               | —                                      |

### Events

| Name   | Description              | Parameters |
| ------ | ------------------------ | ---------- |
| open   | Modal 打开时触发         | —          |
| opened | Modal 打开动画结束时触发 | —          |
| close  | Modal 关闭时触发         | —          |
| closed | Modal 关闭动画结束时触发 | —          |

### Exposes

| Name      | Description                       | Type                                |
| --------- | --------------------------------- | ----------------------------------- |
| isVisible | 当前 Modal 的可见状态（只读）     | `boolean`                           |
| close     | 关闭 Modal 的方法                 | `() => void`                        |
| dialogRef | 内部 EDialog 组件的引用           | `Ref<InstanceType<typeof EDialog>>` |

## FAQ

### 如何在内容组件中关闭 Modal？

使用 `inject` 获取 Modal 实例：

```typescript
import { inject } from 'vue';

const getCurrentModal = inject('getCurrentModal');
const modal = getCurrentModal?.();

modal?.close('save');
```