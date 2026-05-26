<template>
  <div class="utility-demo">
    <h4>阴影层级</h4>
    <div class="demo-grid">
      <div class="bg-white p-xl rounded-lg text-center border demo-border shadow-sm">
        <p class="text-secondary text-sm mb-s">小阴影</p>
        <code class="code-tag">.shadow-sm</code>
      </div>
      <div class="bg-white p-xl rounded-lg text-center border demo-border shadow">
        <p class="text-secondary text-sm mb-s">中等阴影</p>
        <code class="code-tag">.shadow</code>
      </div>
      <div class="bg-white p-xl rounded-lg text-center border demo-border shadow-lg">
        <p class="text-secondary text-sm mb-s">大阴影</p>
        <code class="code-tag">.shadow-lg</code>
      </div>
      <div class="bg-white p-xl rounded-lg text-center border demo-border shadow-xl">
        <p class="text-secondary text-sm mb-s">超大阴影</p>
        <code class="code-tag">.shadow-xl</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 只保留无法用辅助类实现的样式 */
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.demo-border {
  border-color: #f0f0f0;
}

.code-tag {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
