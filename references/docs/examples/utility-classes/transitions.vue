<template>
  <div class="utility-demo">
    <h4>过渡时间</h4>
    <p class="mb-xl text-secondary leading-lg text-sm">悬停查看不同过渡时长的效果差异</p>

    <div class="demo-grid">
      <div class="demo-box bg-primary text-white rounded-lg p-xl text-center cursor-pointer transition">
        <div class="text-lg fw-md mb-s">默认过渡</div>
        <code class="code-tag">.transition</code>
      </div>

      <div class="demo-box bg-primary text-white rounded-lg p-xl text-center cursor-pointer transition-fast">
        <div class="text-lg fw-md mb-s">快速过渡</div>
        <code class="code-tag">.transition-fast</code>
      </div>

      <div class="demo-box bg-primary text-white rounded-lg p-xl text-center cursor-pointer transition-all">
        <div class="text-lg fw-md mb-s">全属性过渡</div>
        <code class="code-tag">.transition-all</code>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.demo-box {
  transform: translateY(0) scale(1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-box:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 24px rgba(64, 158, 255, 0.3);
  background: #337ecc;
}

.code-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
</style>
