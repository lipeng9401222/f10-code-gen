<template>
  <div class="utility-demo">
    <h4 class="mb-l">定位类型</h4>
    <div class="flex flex-wrap gap-xl mb-xl">
      <div class="demo-pos-container relative bg-fill-lighter border rounded-mini">
        <div class="p-xs text-sm text-secondary">relative 容器</div>
        <div class="absolute top-0 right-0 bg-primary text-white text-sm px-m py-xs rounded-mini">
          absolute + top-0 right-0
        </div>
        <div class="absolute bottom-0 left-0 bg-primary text-white text-sm px-m py-xs rounded-mini">
          absolute + bottom-0 left-0
        </div>
      </div>
      <div class="demo-pos-container relative bg-fill-lighter border rounded-mini">
        <div class="p-xs text-sm text-secondary">inset-0 铺满</div>
        <div
          class="absolute inset-0 flex items-center justify-center text-sm text-brand fw-md"
          style="background: rgba(35, 112, 239, 0.15)"
        >
          absolute + inset-0
        </div>
      </div>
    </div>

    <h4 class="mb-l">居中定位</h4>
    <div class="flex flex-wrap gap-xl mb-xl">
      <div class="demo-pos-container relative bg-fill-lighter border rounded-mini">
        <div class="p-xs text-sm text-secondary">水平居中</div>
        <div
          class="absolute absolute-center-x bottom-0 bg-primary text-white text-sm px-m py-xs rounded-mini whitespace-nowrap"
        >
          absolute-center-x
        </div>
      </div>
      <div class="demo-pos-container relative bg-fill-lighter border rounded-mini">
        <div class="p-xs text-sm text-secondary">垂直居中</div>
        <div
          class="absolute absolute-center-y left-0 bg-primary text-white text-sm px-m py-xs rounded-mini whitespace-nowrap"
        >
          absolute-center-y
        </div>
      </div>
      <div class="demo-pos-container relative bg-fill-lighter border rounded-mini">
        <div class="p-xs text-sm text-secondary">完全居中</div>
        <div class="absolute absolute-center bg-primary text-white text-sm px-m py-xs rounded-mini whitespace-nowrap">
          absolute-center
        </div>
      </div>
    </div>

    <h4 class="mb-l">Z-Index 层级</h4>
    <div class="flex pl-m mb-xl">
      <div
        class="demo-z-item relative z-0 flex items-center justify-center text-white text-sm fw-md rounded-mini border-2"
        style="border-color: #fff; background: #91d5ff"
      >
        z-0
      </div>
      <div
        class="demo-z-item relative z-10 demo-z-overlap flex items-center justify-center text-white text-sm fw-md rounded-mini border-2"
        style="border-color: #fff; background: #69c0ff"
      >
        z-10
      </div>
      <div
        class="demo-z-item relative z-20 demo-z-overlap flex items-center justify-center text-white text-sm fw-md rounded-mini border-2"
        style="border-color: #fff; background: #40a9ff"
      >
        z-20
      </div>
      <div
        class="demo-z-item relative z-50 demo-z-overlap flex items-center justify-center text-white text-sm fw-md rounded-mini border-2"
        style="border-color: #fff; background: #2370ef"
      >
        z-50
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-pos-container {
  width: 200px;
  height: 140px;
}

.demo-z-item {
  width: 80px;
  height: 60px;
}

.demo-z-overlap {
  margin-left: -16px;
}
</style>
