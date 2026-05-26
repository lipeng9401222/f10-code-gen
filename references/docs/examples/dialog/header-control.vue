<template>
  <e-button @click="headerVisible = true">隐藏头部</e-button>

  <e-dialog v-model="headerVisible" title="隐藏头部" width="420px" :with-header="false">
    <div class="plain-content">
      <p>设置 <code>with-header</code> 为 <code>false</code> 后，头部区域不会渲染。</p>
      <p>内容区高度会撑满 Dialog，可自行提供关闭按钮或其他操作入口。</p>
      <e-button type="primary" @click="headerVisible = false">关闭</e-button>
    </div>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const headerVisible = ref(false);
</script>

<style scoped>
.plain-content {
  min-height: 180px;
  padding: 24px;
  box-sizing: border-box;
  background: var(--e-bg-color-page);
}

.plain-content p {
  margin: 0 0 12px;
}
</style>
