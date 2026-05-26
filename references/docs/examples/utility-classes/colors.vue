<template>
  <div class="utility-demo">
    <h4 class="mb-l">文字颜色</h4>
    <div class="text-demo mb-xl">
      <p class="text-primary my-xs">主要文字颜色 - text-primary</p>
      <p class="text-secondary my-xs">次要文字颜色 - text-secondary</p>
      <p class="text-third my-xs">第三级文字颜色 - text-third</p>
      <p class="text-disabled my-xs">禁用文字颜色 - text-disabled</p>
      <p class="text-placeholder my-xs">占位符文字颜色 - text-placeholder</p>
      <p class="text-white bg-primary px-m py-xs rounded-mini my-xs">白色文字 - text-white</p>
    </div>

    <h4 class="mb-l">主题文字颜色</h4>
    <div class="text-demo mb-xl">
      <p class="text-brand my-xs">品牌色文字 - text-brand</p>
      <p class="text-success my-xs">成功色文字 - text-success</p>
      <p class="text-warning my-xs">警告色文字 - text-warning</p>
      <p class="text-danger my-xs">危险色文字 - text-danger</p>
      <p class="text-info my-xs">信息色文字 - text-info</p>
    </div>

    <h4 class="mb-l">基础背景色</h4>
    <div class="flex flex-wrap gap-m mb-xl">
      <div class="demo-bg-item bg-page p-m rounded-mini text-center text-sm border">页面背景</div>
      <div class="demo-bg-item bg-fill p-m rounded-mini text-center text-sm border">填充背景</div>
      <div class="demo-bg-item bg-fill-light p-m rounded-mini text-center text-sm border">浅色填充</div>
      <div class="demo-bg-item bg-fill-lighter p-m rounded-mini text-center text-sm border">更浅填充</div>
      <div class="demo-bg-item bg-transparent p-m rounded-mini text-center text-sm border">透明背景</div>
    </div>

    <h4 class="mb-l">主题背景色</h4>
    <div class="flex flex-wrap gap-m mb-xl">
      <div class="demo-bg-item bg-primary text-white p-m rounded-mini text-center text-sm border">主色背景</div>
      <div class="demo-bg-item bg-success text-white p-m rounded-mini text-center text-sm border">成功色背景</div>
      <div class="demo-bg-item bg-warning text-white p-m rounded-mini text-center text-sm border">警告色背景</div>
      <div class="demo-bg-item bg-danger text-white p-m rounded-mini text-center text-sm border">危险色背景</div>
      <div class="demo-bg-item bg-info text-white p-m rounded-mini text-center text-sm border">信息色背景</div>
    </div>

    <h4 class="mb-l">功能背景色</h4>
    <div class="flex flex-wrap gap-m mb-xl">
      <div class="demo-bg-item bg-line p-m rounded-mini text-center text-sm border">分割线背景</div>
      <div class="demo-bg-item bg-check p-m rounded-mini text-center text-sm border">勾选背景</div>
    </div>
  </div>
</template>

<style scoped>
.text-demo p {
  line-height: 1.5;
}

.demo-bg-item {
  min-width: 70px;
}
</style>
