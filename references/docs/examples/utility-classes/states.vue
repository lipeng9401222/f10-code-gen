<template>
  <div class="utility-demo">
    <h4 class="mb-l">禁用状态</h4>
    <div class="flex gap-l mb-xl flex-wrap">
      <div class="p-m border rounded bg-white text-secondary cursor-pointer text-sm transition-all demo-element">
        正常元素
      </div>
      <div
        class="p-m border rounded bg-white text-secondary cursor-not-allowed text-sm transition-all demo-element disabled"
      >
        禁用元素
      </div>
    </div>

    <h4 class="mb-l">交互状态示例</h4>
    <div class="demo-grid mb-xxl gap-xl">
      <div class="p-l rounded-lg border cursor-pointer transition-all demo-card bg-hover">
        <div class="text-sm text-primary fw-md mb-xs">悬停状态卡片</div>
        <div class="text-sm text-third">使用 .bg-hover 类（鼠标悬停后显示效果）</div>
      </div>
      <div class="p-l rounded-lg border cursor-pointer transition-all demo-card bg-check">
        <div class="text-sm text-primary fw-md mb-xs">勾选状态卡片</div>
        <div class="text-sm text-third">使用 .bg-check 类</div>
      </div>
      <div class="p-l rounded-lg border cursor-pointer transition-all demo-card bg-active">
        <div class="text-sm text-primary fw-md mb-xs">激活状态卡片</div>
        <div class="text-sm text-third">使用 .bg-active 类（鼠标点击后显示效果）</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-element {
  user-select: none;
}

.demo-element:hover:not(.disabled) {
  border-color: var(--e-color-primary);
  color: var(--e-color-primary);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.demo-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--e-shadow-md);
}
</style>
