---
title: 权限使用
originUrl: http://192.168.219.170/docs/vue/latest/frame/guides/advanced/permit/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/guides/advanced/permit/)

框架内封装了一个指令权限，默认和后端配置打通，能简单快速的实现按钮级别(页面任意元素)的权限判断。 服务端的文档参考 [统一权限注解](https://fdoc.epoint.com.cn/onlinedoc/rest/d/m6B7zm) 。

## 使用指令

使用自定义指令 `v-permit` ，值配置为权限字符串进行即可，当配置了多个权限，只要满足其中一个权限即可显示，示例如下：

```vue
<template>
  <e-button-group>
    <e-button v-permit="['system:user:add']">存在权限字符串才能看到</e-button>

    <e-button v-permit="['system:user:edit']">需要二次检查的</e-button>

    <e-button v-permit="['system:user:add', 'system:user:edit']"
      >包含权限字符串才能看到</e-button
    >
    <e-button v-permit="['system:user:admin']">超级管理员才能看</e-button>
  </e-button-group>
</template>
```

如果是使用的我们的开发模板，此指令已经全局注册，代码中直接使用即可。

## 使用提供的方法

在某些情况下，可能无法直接使用 `v-permit`，如元素标签组件，只能通过手动设置 v-if。 可以使用权限字符串提供的 Hooks 函数，用法和指令 `v-permit` 类似，示例如下：

```vue
<template>
  <div>
    <!-- 不能使用指令的情况 可以使用 v-if   -->
    <e-tabs v-model="activedTab">
      <e-tab-pane v-if="addPermit" label="存在权限字符串才能看到" name="first"
        >存在权限字符串才能看到</e-tab-pane
      >
      <e-tab-pane
        v-if="addOrEditPermit"
        label="包含权限字符串才能看到"
        name="second"
        >包含权限字符串才能看到</e-tab-pane
      >
      <e-tab-pane v-if="editPermit" label="包含权限字符串才能看到" name="second"
        >需要编辑权限</e-tab-pane
      >
      <e-tab-pane v-if="adminPermit" label="超级管理员才能看" name="third"
        >超级管理员才能看</e-tab-pane
      >
    </e-tabs>
    <div>
      <div v-if="usePermit(['system:user:add'])" name="first">
        存在权限字符串才能看到
      </div>
      <div
        v-if="usePermit(['system:user:add', 'system:user:edit'])"
        name="second"
      >
        包含权限字符串才能看到
      </div>
      <div v-if="usePermit(['system:user:edit'])" name="second">
        需要编辑权限
      </div>
      <div v-if="usePermit(['system:user:admin'])" name="third">
        超级管理员才能看
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Hooks } from "@epframe/eui-core";

// 可以直接在模板中使用 usePermit 函数
const { usePermit } = Hooks;

const activedTab = ref("first");

// 也可以定义变量获取计算结果，再把变量用在模板中
const addPermit = usePermit(["system:user:add"]);
const addOrEditPermit = usePermit(["system:user:add", "system:user:edit"]);
const editPermit = usePermit(["system:user:edit"]);
const adminPermit = usePermit(["system:user:admin"]);
</script>
```

usePermit 函数是异步返回一个 `Ref`，表示是否具有权限。

:::warning{title="有了这个是否后端的接口上就不用做权限验证了？"}

不可以！

此指令只是为了简化在页面上的代码书写，避免自己根据状态再手动通过代码来控制显示隐藏或相关元素的移除。

只是一个辅助功能来提升用户体现（避免用户点了之后才能告诉它没有权限），对于专业内人员或恶意操作者来说这个限制都是绕过的（虽然有构建和代码混淆，但也只是提高了破解的难度），为保证数据安全以及实际业务的正确性质，无论前端是否进行了权限校验，后端接口都需要对请求进行权限校验！

比如：拦截获取权限字符串的接口，添加更多的权限字符串。或者在打断点在相关判断处进行修改。 都可能在页面页面上绕过这块的配置，所以后端的权限校验是必不可少的。

:::

## 权限字符串数据来源

通过框架提供的 `auth/getAuthExpressions` 接口进行获取，响应数据分为两种类型：

1. 静态的数据，一次获取后就直接使用。
2. 动态的数据，每次渲染调用的时候，会再次向 `auth/accessExpressions` 发起请求获取最新的权限状态。

### auth/getAuthExpressions

请求参数： 无

响应示例：

```json
[
  { "expression": "system:user:add" },
  { "expression": "system:user:edit", "direct": false },
  { "expression": "system:user:admin" }
]
```

其中 `expression` 为权限字符串， `direct` 为是否直接权限，不存在或为 `true` 时，表示直接权限，为 `false` 时，状态不定，会在使用的时候再发起请求获取。

### auth/accessExpressions

当上一个接口返回的 `direct` 为 `false` 时，对应的权限在使用时，会再发起这个接口获取权限字符串的状态。

请求参数： 权限字符串数组, eg:

```json
["system:user:edit", "system:user:delete"]
```

响应示例：

```json
[
  { "expression": "perm:user:edit", "visible": true },
  { "expression": "perm:user:delete", "visible": false }
]
```

## 权限字符串的存储

正常来说页面使用无需关注，如果你有特殊需求，想要拿到前端用于判断的权限字符串，则可以通过 frameuser 这个 store 获取，其中 `state.permissions` 为从接口中获取的所有权限字符串，另外提供一个 getter `permissionMap` 为权限字符串的映射对象。

```ts
import { Store } from "@epframe/eui-core";
const useUserStore = Store.useFrameUserStore();
const permissions = useUserStore().state.permissions;
const permissionMap = useUserStore().state.permissionMap;
```