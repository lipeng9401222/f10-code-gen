---
title: Comment 沟通交流
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-comment/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-comment/)

此组件由 `@epframe/eui-core` 包提供。

`EpComment` 是一个功能完整的评论组件，支持发表评论、回复、点赞、删除、@提及用户、上传附件、分页加载、排序切换等功能，可快速集成到任意业务页面中。

## 效果预览

![EpComment 组件效果](../images/model/ep-comment.jpg)

## 快速接入

`EpComment` 需要对接后端接口才能正常运行，必须配置以下两个属性：

- `httpAction`：后端接口统一入口地址（所有评论操作均通过该地址的 `action` 参数区分）
- `pageId`：当前页面业务标识，用于隔离不同页面的评论数据

```vue
<template>
  <ep-comment
    http-action="/api/comment"
    page-id="your-page-id"
    file-upload-action="/api/file/upload"
  />
</template>

<script setup>
import { EpComment } from '@epframe/eui-core';
</script>
```

## 后端接口协议

组件通过 `POST` 方式请求 `httpAction` 地址，每次请求体中携带 `action` 字段标识操作类型，以及 `pageId` 字段标识当前页面。

| action 值     | 说明                   |
| ------------- | ---------------------- |
| `getUser`     | 获取当前登录用户信息   |
| `commentList` | 获取评论列表           |
| `childCommentList`  | 获取评论子列表   |
| `comment`  | 发表/回复评论          |
| `likeComment` | 点赞/取消点赞评论      |
| `deleteComment` | 删除评论             |
| `deleteCommentFile` | 删除评论文件     |
| `mentionUserList` | 提及人员列表，此接口每次输入@时才会触发      |

## API

### EpComment 属性

| 属性名              | 说明                                                                    | 类型                       | 默认值                                              |
| ------------------- | ----------------------------------------------------------------------- | -------------------------- | --------------------------------------------------- |
| httpAction          | 后端接口统一入口地址（必填）                                            | `string`                   | `/`                                                 |
| pageId              | 页面业务标识，用于隔离不同页面评论数据（必填）                          | `string`                   | —                                                   |
| sortType            | 初始排序方式，`asc` 为最早优先，`desc` 为最新优先                       | ^[enum]`'asc' \| 'desc'`   | `'asc'`                                             |
| pageSize            | 每次加载的根评论条数                                                    | `number`                   | `10`                                                |
| pageIndex           | 初始页码                                                                | `number`                   | `0`                                                 |
| scrollContainer     | 滚动容器元素，用于滚动到底部时自动加载更多评论                          | `HTMLElement \| Window`    | `null`                                              |
| autoFill            | 评论不满一屏时是否自动继续加载直到撑满                                  | `boolean`                  | `false`                                             |
| fileUploadAction    | 附件上传接口地址                                                        | `string`                   | `/`                                                 |
| fileNumLimit        | 最多允许上传的附件数量                                                  | `number`                   | —                                                   |
| fileTypeLimit       | 允许上传的文件类型（逗号分隔后缀名）                                    | `string`                   | `'jpg,jpeg,png,doc,docx,xls,xlsx,ppt,pptx,pdf,txt'` |
| maxFileSize         | 单个附件最大体积，单位 KB                                               | `number`                   | `102400`（100 MB）                                  |
| placeholder         | 输入框占位文字                                                          | `string`                   | —                                                   |
| maxLength           | 输入框最大字符长度                                                      | `number`                   | `5000`                                              |
| useMentionUser      | 是否启用 @ 提及用户功能                                                 | `boolean`                  | `true`                                              |
| showWordLimit       | 是否显示字数统计                                                        | `boolean`                  | `false`                                             |
| showFullScreen      | 是否显示全屏编辑按钮                                                    | `boolean`                  | `false`                                             |

### EpComment 事件

| 事件名        | 说明                                     | 类型                                                              |
| ------------- | ---------------------------------------- | ----------------------------------------------------------------- |
| messageChange | 评论总数或根评论数发生变化时触发         | ^[Function]`(params: { total: number; rootTotal: number }) => void` |