<template>
  <div class="utility-demo">
    <h4 class="mb-l">边框与交互效果</h4>
    <div class="flex flex-wrap items-center gap-xl mb-xl">
      <div class="demo-border-item border p-m text-base text-center cursor-pointer border-hover border-active">
        完整交互边框
      </div>
      <div class="demo-border-item border-box p-m text-base text-center cursor-pointer">盒子边框</div>
      <div class="demo-border-item border-none bg-fill-light p-m text-base text-center">无边框</div>
    </div>

    <h4 class="mb-l">单边边框</h4>
    <div class="flex flex-wrap items-center gap-xl mb-xl">
      <div class="demo-border-item border-t p-m text-base text-center">上边框</div>
      <div class="demo-border-item border-r p-m text-base text-center">右边框</div>
      <div class="demo-border-item border-b p-m text-base text-center">下边框</div>
      <div class="demo-border-item border-l p-m text-base text-center">左边框</div>
    </div>

    <h4 class="mb-l">边框颜色</h4>
    <div class="flex flex-wrap items-center gap-xl mb-xl">
      <div class="demo-border-item border border-primary p-m text-base text-center">主色边框</div>
      <div class="demo-border-item border border-success p-m text-base text-center">成功色边框</div>
      <div class="demo-border-item border border-warning p-m text-base text-center">警告色边框</div>
      <div class="demo-border-item border border-danger p-m text-base text-center">危险色边框</div>
    </div>

    <h4 class="mb-l">圆角</h4>
    <div class="flex flex-wrap items-center gap-xl mb-xl">
      <div class="demo-radius-item rounded-sm p-m text-base text-center">小圆角</div>
      <div class="demo-radius-item rounded p-m text-base text-center">基础圆角</div>
      <div class="demo-radius-item rounded-lg p-m text-base text-center">大圆角</div>
      <div class="demo-radius-circle rounded-full flex items-center justify-center text-base text-center">圆形</div>
    </div>

    <h4 class="mb-l">单边圆角</h4>
    <div class="flex flex-wrap items-center gap-xl mb-xl">
      <div class="demo-radius-item rounded rounded-t p-m text-base text-center">上圆角</div>
      <div class="demo-radius-item rounded rounded-r p-m text-base text-center">右圆角</div>
      <div class="demo-radius-item rounded rounded-b p-m text-base text-center">下圆角</div>
      <div class="demo-radius-item rounded rounded-l p-m text-base text-center">左圆角</div>
    </div>
  </div>
</template>

<style scoped>
.demo-border-item {
  min-width: 100px;
}

.demo-radius-item {
  background: #e1f3d8;
  min-width: 80px;
}

.demo-radius-circle {
  width: 100px;
  height: 100px;
  background: #e1f3d8;
}
</style>
