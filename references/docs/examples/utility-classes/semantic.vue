<template>
  <div class="utility-demo">
    <h4 class="mb-l">标题类</h4>
    <div class="mb-xl">
      <div class="page-title">页面标题 page-title（18px / 700）</div>
    </div>

    <h4 class="mb-l">模块容器</h4>
    <div class="mb-xl">
      <div class="mod-wrap">mod-wrap 模块容器（填充背景 + 圆角 + 内边距 + 阴影）</div>
    </div>

    <h4 class="mb-l">文本装饰</h4>
    <div class="flex flex-wrap gap-xl mb-xl text-base">
      <span class="underline">下划线 underline</span>
      <span class="line-through">删除线 line-through</span>
      <span class="no-underline">无装饰 no-underline</span>
    </div>

    <h4 class="mb-l">文本转换</h4>
    <div class="flex flex-wrap gap-xl mb-xl text-base">
      <span class="uppercase">uppercase text</span>
      <span class="lowercase">LOWERCASE TEXT</span>
      <span class="capitalize">capitalize text</span>
    </div>

    <h4 class="mb-l">盒模型</h4>
    <div class="flex flex-wrap gap-xl mb-xl">
      <div class="demo-box box-border border-2 border-primary rounded-mini text-sm text-center bg-fill-lighter">
        box-border（border-box）
      </div>
      <div class="demo-box box-content border-2 border-primary rounded-mini text-sm text-center bg-fill-lighter">
        box-content（content-box）
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-box {
  width: 180px;
  padding: var(--e-space-l);
}
</style>
