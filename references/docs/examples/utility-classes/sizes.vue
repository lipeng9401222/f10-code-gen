<template>
  <div class="utility-demo">
    <h4 class="mb-l">高度尺寸对比</h4>
    <div class="flex items-end gap-xl mb-xl flex-wrap">
      <div class="text-center">
        <div class="bg-primary text-white flex items-center justify-center rounded text-sm h-xs min-w-80 mb-xs">
          Mini
        </div>
        <div class="text-sm text-third">24px</div>
      </div>
      <div class="text-center">
        <div class="bg-primary text-white flex items-center justify-center rounded text-sm h-sm min-w-80 mb-xs">
          Small
        </div>
        <div class="text-sm text-third">28px</div>
      </div>
      <div class="text-center">
        <div class="bg-primary text-white flex items-center justify-center rounded text-sm h-md min-w-80 mb-xs">
          Base
        </div>
        <div class="text-sm text-third">32px</div>
      </div>
      <div class="text-center">
        <div class="bg-primary text-white flex items-center justify-center rounded text-sm h-lg min-w-80 mb-xs">
          Large
        </div>
        <div class="text-sm text-third">38px</div>
      </div>
    </div>

    <h4 class="mb-l">宽度尺寸</h4>
    <div class="mb-xl">
      <div class="w-full bg-fill-light mb-xs rounded py-s px-l text-sm text-center">w-full（100%）</div>
      <div class="bg-fill-light mb-xs rounded py-s px-l text-sm text-center" style="width: 50%">50% 参考</div>
    </div>

    <h4 class="mb-l">特殊尺寸</h4>
    <div class="flex gap-xl flex-wrap">
      <div class="text-center">
        <div class="h-auto bg-fill-light rounded mb-xs px-xl py-m text-sm">h-auto</div>
      </div>
      <div class="text-center">
        <div class="w-auto bg-fill-light rounded mb-xs px-xl py-m text-sm">w-auto</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-w-80 {
  min-width: 80px;
}
</style>
