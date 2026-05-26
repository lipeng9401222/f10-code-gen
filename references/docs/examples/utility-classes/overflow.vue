<template>
  <div class="utility-demo">
    <h4 class="mb-l">溢出控制</h4>
    <div class="flex flex-wrap gap-xl mb-xl">
      <div>
        <div class="demo-overflow-item border rounded-mini p-m text-sm overflow-hidden">
          <div class="demo-overflow-content">
            overflow-hidden：超出部分被隐藏，这段文字会被截断不会显示滚动条，内容直接消失在容器边界处。
          </div>
        </div>
        <div class="text-sm text-third mt-xs text-center">overflow-hidden</div>
      </div>
      <div>
        <div class="demo-overflow-item border rounded-mini p-m text-sm overflow-auto">
          <div class="demo-overflow-short">overflow-auto：内容未超出时不显示滚动条。</div>
        </div>
        <div class="text-sm text-third mt-xs text-center">overflow-auto（内容未超出）</div>
      </div>
      <div>
        <div class="demo-overflow-item border rounded-mini p-m text-sm overflow-scroll">
          <div class="demo-overflow-short">overflow-scroll：即使内容未超出，也始终显示滚动条。</div>
        </div>
        <div class="text-sm text-third mt-xs text-center">overflow-scroll（始终显示滚动条）</div>
      </div>
    </div>

    <h4 class="mb-l">单方向溢出</h4>
    <div class="flex flex-wrap gap-xl mb-xl">
      <div>
        <div class="demo-overflow-item border rounded-mini p-m text-sm overflow-x-auto">
          <div class="demo-overflow-wide whitespace-nowrap">
            overflow-x-auto：这段文字不换行，水平方向超出时自动显示横向滚动条。
          </div>
        </div>
        <div class="text-sm text-third mt-xs text-center">overflow-x-auto</div>
      </div>
      <div>
        <div class="demo-overflow-item border rounded-mini p-m text-sm overflow-y-auto">
          <div class="demo-overflow-content">
            overflow-y-auto：垂直方向超出时自动显示纵向滚动条，这段文字需要足够长来触发垂直滚动效果。
          </div>
        </div>
        <div class="text-sm text-third mt-xs text-center">overflow-y-auto</div>
      </div>
    </div>

    <h4 class="mb-l">多行文本截断</h4>
    <div class="flex flex-wrap gap-xl mb-xl">
      <div>
        <div class="demo-clamp-item border rounded-mini p-m">
          <div class="line-clamp-1">
            line-clamp-1：Vue3
            组件库提供了丰富的基础组件，包括按钮、输入框、选择器、表格、弹窗等常用组件，满足日常开发需求。
          </div>
        </div>
        <div class="text-sm text-third mt-xs text-center">line-clamp-1 单行截断</div>
      </div>
      <div>
        <div class="demo-clamp-item border rounded-mini p-m">
          <div class="line-clamp-2">
            line-clamp-2：Vue3
            组件库提供了丰富的基础组件，包括按钮、输入框、选择器、表格、弹窗等常用组件，满足日常开发需求。所有组件均基于
            Composition API 开发，支持 TypeScript，提供完善的类型定义。
          </div>
        </div>
        <div class="text-sm text-third mt-xs text-center">line-clamp-2 两行截断</div>
      </div>
      <div>
        <div class="demo-clamp-item border rounded-mini p-m">
          <div class="line-clamp-3">
            line-clamp-3：Vue3
            组件库提供了丰富的基础组件，包括按钮、输入框、选择器、表格、弹窗等常用组件，满足日常开发需求。所有组件均基于
            Composition API 开发，支持 TypeScript，提供完善的类型定义。同时提供了完整的主题定制能力，通过 CSS
            变量可以轻松实现品牌定制和暗色模式切换。
          </div>
        </div>
        <div class="text-sm text-third mt-xs text-center">line-clamp-3 三行截断</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-overflow-item {
  width: 200px;
  height: 80px;
}

.demo-overflow-content {
  width: 100%;
  height: 150px;
}

.demo-overflow-short {
  width: 100%;
  height: auto;
}

.demo-overflow-wide {
  width: 400px;
}

.demo-clamp-item {
  width: 180px;
  font-size: 13px;
  line-height: 1.6;
  height: 80px;
}
</style>
