<template>
  <div class="utility-demo">
    <h4>Flex 布局基础</h4>
    <div class="flex items-center gap-m mb-l">
      <div class="bg-fill-light border rounded p-m flex gap-s items-center" style="min-height: 60px">
        <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">1</div>
        <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">2</div>
        <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">3</div>
      </div>
      <code class="code-tag">.flex .gap-s</code>
    </div>

    <h4>Flex 方向</h4>
    <div class="grid-demo gap-l mb-xl">
      <div class="text-center">
        <div class="bg-fill-light border rounded p-m flex flex-row gap-s items-center" style="min-height: 60px">
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">1</div>
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">2</div>
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">3</div>
        </div>
        <code class="code-tag">.flex-row</code>
      </div>
      <div class="text-center">
        <div class="bg-fill-light border rounded p-m flex flex-col gap-s" style="min-height: 60px">
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">1</div>
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">2</div>
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">3</div>
        </div>
        <code class="code-tag">.flex-col</code>
      </div>
    </div>

    <h4>主轴对齐</h4>
    <div class="grid-demo gap-l mb-xl">
      <div class="text-center">
        <div class="bg-fill-light border rounded p-m flex justify-start gap-s" style="min-height: 60px">
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">1</div>
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">2</div>
        </div>
        <code class="code-tag">.justify-start</code>
      </div>
      <div class="text-center">
        <div class="bg-fill-light border rounded p-m flex justify-center gap-s" style="min-height: 60px">
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">1</div>
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">2</div>
        </div>
        <code class="code-tag">.justify-center</code>
      </div>
      <div class="text-center">
        <div class="bg-fill-light border rounded p-m flex justify-between gap-s" style="min-height: 60px">
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">1</div>
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">2</div>
        </div>
        <code class="code-tag">.justify-between</code>
      </div>
    </div>

    <h4>交叉轴对齐</h4>
    <div class="grid-demo gap-l mb-xl">
      <div class="text-center">
        <div class="bg-fill-light border rounded p-m flex items-start gap-s" style="min-height: 80px">
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">A</div>
          <div class="bg-success text-white rounded text-sm text-center" style="min-width: 40px; padding: 16px 12px">
            B
          </div>
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">C</div>
        </div>
        <code class="code-tag">.items-start</code>
      </div>
      <div class="text-center">
        <div class="bg-fill-light border rounded p-m flex items-center gap-s" style="min-height: 80px">
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">A</div>
          <div class="bg-success text-white rounded text-sm text-center" style="min-width: 40px; padding: 16px 12px">
            B
          </div>
          <div class="bg-primary text-white p-s rounded text-sm text-center" style="min-width: 40px">C</div>
        </div>
        <code class="code-tag">.items-center</code>
      </div>
    </div>

    <h4>浮动布局</h4>
    <div class="border rounded p-m clearfix" style="border: 2px solid #67c23a; background: #f0f9ff">
      <div class="bg-primary text-white p-s rounded text-sm text-center float-left m-xs demo-item-width">
        左浮动 （float-left）
      </div>
      <div class="bg-primary text-white p-s rounded text-sm text-center float-right m-xs demo-item-width">
        右浮动 （float-right）
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 只保留无法用辅助类实现的样式 */
.grid-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.code-tag {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 8px;
  display: inline-block;
}

.demo-item-width {
  min-width: 80px;
}

@media (max-width: 768px) {
  .grid-demo {
    grid-template-columns: 1fr;
  }
}
</style>
