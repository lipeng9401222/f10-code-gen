<template>
  <div class="ellipsis-container">
    <!-- 简单的文本溢出示例 -->
    <div class="ellipsis-item">
      <div class="ellipsis-text" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
        这是一段很长的文本内容，当空间不足时会被截断并显示省略号
      </div>
      <e-tooltip v-model:visible="showTooltip" :content="longText" placement="top" :show-arrow="false">
        <div class="tooltip-target" />
      </e-tooltip>
    </div>

    <!-- 文件名称溢出示例 -->
    <div class="ellipsis-item">
      <div class="ellipsis-text">
        <span>文件名：</span>
        <span class="filename">very_long_filename_example_2023.txt</span>
        <e-tooltip content="very_long_filename_example_2023.txt" placement="top" :show-arrow="false">
          <span class="tooltip-target" />
        </e-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showTooltip = ref(false);
const longText = '这是一段很长的文本内容，当空间不足时会被截断并显示省略号。无箭头提示更加简洁。';
</script>

<style scoped>
.ellipsis-container {
  width: 250px;
}

.ellipsis-item {
  position: relative;
  margin-bottom: 16px;
  border: 1px solid #eee;
  padding: 8px;
  border-radius: 4px;
}

.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filename {
  color: #409eff;
}

.tooltip-target {
  position: absolute;
  inset: 0;
  cursor: pointer;
}
</style>
