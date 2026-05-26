<template>
  <div class="utility-demo">
    <h4 class="mb-l">Display 显示类型</h4>
    <div class="p-m border-default rounded-mini mb-xl" style="border: 1px dashed var(--e-border-color)">
      <span class="block bg-fill-light mb-xs px-l py-xs rounded-mini text-sm">block - 块级元素</span>
      <span class="inline bg-fill-light px-l py-xs rounded-mini text-sm">inline - 行内元素</span>
      <span class="inline-block bg-fill-light ml-xs px-l py-xs rounded-mini text-sm">inline-block - 行内块元素</span>
    </div>

    <h4 class="mb-l">可见性控制</h4>
    <div class="flex flex-wrap gap-l mb-xl">
      <div class="demo-vis-item bg-primary text-white rounded-mini text-sm px-xl py-m visible">visible - 可见</div>
      <div class="demo-vis-item bg-primary text-white rounded-mini text-sm px-xl py-m invisible">
        invisible - 不可见（占位）
      </div>
      <div class="demo-vis-item bg-primary text-white rounded-mini text-sm px-xl py-m visible">visible - 可见</div>
    </div>

    <h4 class="mb-l">透明度</h4>
    <div class="flex flex-wrap gap-l mb-xl">
      <div class="bg-primary text-white rounded-mini text-sm px-xl py-m opacity-100">opacity-100</div>
      <div class="bg-primary text-white rounded-mini text-sm px-xl py-m opacity-50">opacity-50</div>
      <div class="bg-primary text-white rounded-mini text-sm px-xl py-m opacity-0">opacity-0</div>
    </div>
  </div>
</template>
