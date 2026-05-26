---
title: Result 结果
originUrl: http://192.168.219.170/docs/vue/latest/component/component/result.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/result.html)

# Result 结果

用于对用户的操作结果或者异常状态做反馈。

## 基本用法

**Demo 示例**: `result/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/result.html)

```vue
<template>
  <e-row>
    <e-col :sm="12" :lg="6">
      <e-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
        <template #extra>
          <e-button type="primary">Back</e-button>
        </template>
      </e-result>
    </e-col>
    <e-col :sm="12" :lg="6">
      <e-result icon="warning" title="Warning Tip" sub-title="Please follow the instructions">
        <template #extra>
          <e-button type="primary">Back</e-button>
        </template>
      </e-result>
    </e-col>
    <e-col :sm="12" :lg="6">
      <e-result icon="error" title="Error Tip" sub-title="Please follow the instructions">
        <template #extra>
          <e-button type="primary">Back</e-button>
        </template>
      </e-result>
    </e-col>
    <e-col :sm="12" :lg="6">
      <e-result icon="info" title="Info Tip">
        <template #sub-title>
          <p>Using slot as subtitle</p>
        </template>
        <template #extra>
          <e-button type="primary">Back</e-button>
        </template>
      </e-result>
    </e-col>
  </e-row>
</template>

```

## 自定义内容

**Demo 示例**: `result/customized-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/result.html)

```vue
<template>
  <e-result title="404" sub-title="Sorry, request error">
    <template #icon>
      <e-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
    </template>
    <template #extra>
      <e-button type="primary">Back</e-button>
    </template>
  </e-result>
</template>

```

## API

### Attributes

| Name      | Description    | Type                                                 | Default |
| --------- | -------------- | ---------------------------------------------------- | ------- |
| title     | 结果的标题     | ^[string]                                            | ''      |
| sub-title | 结果的副标题   | ^[string]                                            | ''      |
| icon      | 结果的图标类型 | ^[enum]`'success' \| 'warning' \| 'info' \| 'error'` | info    |

### Slots

| Name      | Description            |
| --------- | ---------------------- |
| icon      | 作为结果图标的内容     |
| title     | 作为结果标题的内容     |
| sub-title | 作为结果副标题的内容   |
| extra     | 作为结果额外区域的内容 |