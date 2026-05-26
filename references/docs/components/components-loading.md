---
title: Loading 加载
originUrl: http://192.168.219.170/docs/vue/latest/component/component/loading.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/loading.html)

# Loading 加载

加载数据时显示动效。

## 区域加载

在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如表格）。

**Demo 示例**: `loading/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/loading.html)

```vue
<template>
  <e-table v-loading="true" :data-source="tableData" :columns="columns" />
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 180,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const tableData = [
  {
    date: '2016-05-03',
    name: '张三',
    address: '北京市朝阳区建国路189号',
  },
  {
    date: '2016-05-02',
    name: '李四',
    address: '上海市浦东新区世纪大道200号',
  },
  {
    date: '2016-05-04',
    name: '王五',
    address: '广州市天河区珠江新城88号',
  },
];
</script>

<style scoped>
body {
  margin: 0;
}
.example-showcase .e-loading-mask {
  z-index: 9;
}
</style>

```

## 自定义加载中组件内容

你可以自定义加载中组件的文字，图标，以及背景颜色。

**Demo 示例**: `loading/customization`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/loading.html)

```vue
<template>
  <e-table
    v-loading="loading"
    loading-text="正在加载..."
    :loading-spinner="svg"
    loading-svg-view-box="0 0 400 400"
    loading-background="rgba(122, 122, 122, 0.8)"
    :data-source="tableData"
    :columns="columns"
    style="width: 100%"
  />

  <e-table
    v-loading="loading"
    :loading-svg="svg"
    class="custom-loading-svg"
    loading-svg-view-box="0 0 400 400"
    :data-source="tableData"
    :columns="columns"
    style="width: 100%"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(true);
const svg = `
<g><path fill="#3472d7" d="M219.91,190.42v119.54h-39.99V190.42h20H219.91z" /><path fill="#3472d7" d="M143.44,237.17L228.28,322L200,350.28l-84.83-84.83l14.14-14.14L143.44,237.17z" /><path fill="#3472d7" d="M284.83,265.45L200,350.28L171.72,322l84.83-84.83l14.14,14.14L284.83,265.45z" /><path fill="#4E5463" d="M342.36,171.17c-12.12-12.58-27.07-21.57-43.46-26.33c0.29-2.88,0.44-5.79,0.44-8.71 c0-47.24-38.43-85.67-85.68-85.67c-43.92,0-80.23,33.22-85.11,75.85c-54.97,3.95-98.49,49.94-98.49,105.9 c0,56.45,44.29,102.75,99.94,105.99v-40.11c-33.58-3.15-59.94-31.49-59.94-65.87c0-36.49,29.69-66.18,66.18-66.18 c3.22,0,6.5,0.24,9.75,0.72l27.14,4l-4.49-27.06c-0.42-2.54-0.63-5.08-0.63-7.56c0-25.19,20.49-45.67,45.67-45.67 c25.19,0,45.68,20.49,45.68,45.67c0,5.97-1.14,11.78-3.39,17.27l-10.8,26.4l28.5,1.16c31.58,1.28,56.31,27.05,56.31,58.67 c0,32.39-26.35,58.74-58.74,58.74c-0.41,0-0.81-0.01-1.22-0.02v39.99c0.41,0,0.81,0.03,1.22,0.03 c54.45,0,98.74-44.29,98.74-98.74C369.96,213.97,360.16,189.66,342.36,171.17z" /></g>`;
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 180,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const tableData = [
  {
    date: '2016-05-02',
    name: '张三',
    address: '上海市普陀区金沙江路 1518 号',
  },
  {
    date: '2016-05-04',
    name: '李四',
    address: '上海市徐汇区淮海中路 999 号',
  },
  {
    date: '2016-05-01',
    name: '王五',
    address: '上海市浦东新区陆家嘴环路 1000 号',
  },
];
</script>
<style scoped>
.example-showcase .e-loading-mask {
  z-index: 9;
}
</style>

```

> **⚠️ 警告**
>
> 虽然 `loading-spinner` / `loading-svg` 属性支持传入的 HTML 片段，但是动态在网站上渲染任意的 HTML 是非常危险的，因为很容易导致 [ XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting). 请确保 `loading-spinner` / `loading-svg` 的内容是可信的， **不要**将用户提交的内容赋值给 `loading-spinner` / `loading-svg` 属性。

## 让加载组件铺满整个屏幕

加载数据时显示全屏动画。

**Demo 示例**: `loading/fullscreen`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/loading.html)

```vue
<template>
  <e-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="openFullScreen1">
    As a directive
  </e-button>
  <e-button type="primary" @click="openFullScreen2"> As a service </e-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ELoading } from '@epoint-fe/eui-components';

const fullscreenLoading = ref(false);
const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    fullscreenLoading.value = false;
  }, 2000);
};

const openFullScreen2 = () => {
  const loading = ELoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  setTimeout(() => {
    loading.close();
  }, 2000);
};
</script>

```

## 以服务的方式来调用

Loading 还可以以服务的方式调用。 你可以像这样引入 Loading 服务：

```ts
import { ELoading } from '@epoint-fe/eui-components';
```

在你需要的时候通过下面的方式调用：

```ts
ELoading.service(options);
```

其中 `options` 参数为 Loading 的配置项，具体见下表。 `LoadingService` 会返回一个 `Loading` 实例，可通过调用该实例的 `close` 方法来关闭它：

```ts
const loadingInstance = ELoading.service(options);
nextTick(() => {
  // 这里只是一个模拟 实际上你可以在数据加载完成后调用 loadingInstance.close() 来关闭 Loading
  loadingInstance.close();
});
```

需要注意的是，以服务的方式调用的全屏 `Loading` 是单例的。 若在前一个全屏 `Loading` 关闭前再次调用全屏 `Loading`，并不会创建一个新的 `Loading` 实例，而是返回现有全屏 `Loading` 的实例：

```ts
const loadingInstance1 = ELoading.service({ fullscreen: true });
const loadingInstance2 = ELoading.service({ fullscreen: true });
console.log(loadingInstance1 === loadingInstance2); // true
```

此时调用它们中任意一个的 `close` 方法都能关闭这个全屏 `Loading` 。

如果完整引入了 EUI VUE，那么 `app.config.globalProperties` 上会有一个全局方法 `$loading`， 它的调用方式为：`this.$loading(options)`，同样会返回一个 `Loading` 实例。

## API

### Options

| Name        | Description                                                                                                                                   | Type                       | Default       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| target      | Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串； 若传入字符串，则会将其作为参数传入 `document.querySelector` 以获取到对应 DOM 节点 | ^[string] / ^[HTMLElement] | document.body |
| body        | 同 `v-loading` 指令中的 `body` 修饰符                                                                                                         | ^[boolean]                 | false         |
| fullscreen  | 同 `v-loading` 指令中的 `fullscreen` 修饰符                                                                                                   | ^[boolean]                 | true          |
| lock        | 同 `v-loading` 指令中的 `lock` 修饰符                                                                                                         | ^[boolean]                 | false         |
| text        | 显示在加载图标下方的加载文案                                                                                                                  | ^[string]                  | —             |
| spinner     | 自定义加载图标类名                                                                                                                            | ^[string]                  | —             |
| background  | 遮罩背景色                                                                                                                                    | ^[string]                  | —             |
| customClass | Loading 的自定义类名                                                                                                                          | ^[string]                  | —             |

### Directives

| Name               | Description                              | Type                    |
| ------------------ | ---------------------------------------- | ----------------------- |
| v-loading          | 是否显示动画                             | ^[boolean] / ^[Options] |
| loading-text       | 显示在加载图标下方的加载文案             | ^[string]               |
| loading-spinner    | 自定义加载图标                           | ^[string]               |
| loading-svg        | 自定义加载图标 (与 loading-spinner 相同) | ^[string]               |
| loading-background | 背景遮罩的颜色                           | ^[string]               |