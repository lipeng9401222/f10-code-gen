<template>
  <div class="utility-demo">
    <h4 class="mb-s">字体大小</h4>
    <div class="mb-l">
      <div class="text-sm p-s bg-fill-light rounded mb-s">小字体 (text-sm)</div>
      <div class="text-base p-s bg-fill-light rounded mb-s">基础字体 (text-base)</div>
      <div class="text-lg p-s bg-fill-light rounded mb-s">大字体 (text-lg)</div>
      <div class="text-xxxl p-s bg-fill-light rounded mb-s">巨大字体 (text-xxxl)</div>
    </div>

    <h4 class="mb-s">字体粗细</h4>
    <div class="mb-l">
      <div class="fw-normal p-s bg-fill-light rounded mb-s">常规粗细 (fw-normal)</div>
      <div class="fw-md p-s bg-fill-light rounded mb-s">中等粗细 (fw-md)</div>
      <div class="fw-bold p-s bg-fill-light rounded mb-s">粗体 (fw-bold)</div>
    </div>

    <h4 class="mb-s">文本对齐</h4>
    <div class="mb-l">
      <div class="text-left p-s border rounded mb-s demo-align-width">左对齐 (text-left)</div>
      <div class="text-center p-s border rounded mb-s demo-align-width">居中对齐 (text-center)</div>
      <div class="text-right p-s border rounded mb-s demo-align-width">右对齐 (text-right)</div>
    </div>

    <h4 class="mb-s">文本处理</h4>
    <div class="mb-l">
      <div class="p-s border rounded mb-s demo-text-width">
        <div class="ellipsis">
          (ellipsis 可以让文本溢出显示...)省略号处理文本省略号处理文本省略号处理文本省略号处理文本
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-text-width {
  width: 400px;
}
</style>
