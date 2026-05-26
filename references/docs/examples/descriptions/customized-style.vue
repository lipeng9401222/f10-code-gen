<template>
  <e-descriptions title="Customized style list" :column="3" border>
    <e-descriptions-item
      label="用户名"
      label-align="right"
      align="center"
      label-class-name="my-label"
      class-name="my-content"
      width="150px"
      >新点软件 - 中央研究院 - 前端研发部</e-descriptions-item
    >
    <e-descriptions-item label="电话" label-align="right" align="center">18100000000</e-descriptions-item>
    <e-descriptions-item label="地点" label-align="right" align="center">Suzhou</e-descriptions-item>
    <e-descriptions-item label="备注" label-align="right" align="center">
      <e-tag size="small">Company</e-tag>
    </e-descriptions-item>
    <e-descriptions-item label="地址" label-align="right" align="center"
      >江苏省苏州市张家港市杨舍镇江帆路8号</e-descriptions-item
    >
  </e-descriptions>
</template>
<style scoped>
.my-label {
  background: var(--e-color-success-light-9);
}
.my-content {
  background: var(--e-color-danger-light-9);
}
</style>
