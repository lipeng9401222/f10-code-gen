<template>
  <div class="programmatic-popconfirm-demo">
    <h3>编程式 Popconfirm</h3>
    <p class="description">使用 createPopconfirm 方法以编程方式创建 Popconfirm</p>

    <div class="demo-section">
      <h4>基础用法</h4>
      <e-button ref="buttonRef1" type="danger" @click="handleDelete"> 删除 </e-button>
    </div>

    <div class="demo-section">
      <h4>自定义配置</h4>
      <e-button ref="buttonRef2" type="primary" @click="handleCustom"> 自定义配置 </e-button>
    </div>

    <div class="demo-section">
      <h4>异步确认</h4>
      <e-button ref="buttonRef3" type="warning" @click="handleAsync"> 异步确认 </e-button>
    </div>

    <div class="demo-section">
      <h4>异步失败处理</h4>
      <p class="description">请求失败时 Popconfirm 不会自动关闭，方便用户重试</p>
      <e-button ref="buttonRef5" type="danger" @click="handleAsyncError"> 模拟失败 </e-button>
    </div>

    <div class="demo-section">
      <h4>手动关闭</h4>
      <e-button ref="buttonRef4" @click="handleManual"> 显示 Popconfirm </e-button>
      <e-button style="margin-left: 16px" @click="closeManual"> 手动关闭 </e-button>
    </div>

    <div class="demo-section">
      <h4>关闭所有</h4>
      <e-button type="info" @click="handleCloseAll"> 关闭所有 Popconfirm </e-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EButton, EMessage, closeAllPopconfirm, createPopconfirm } from '@epoint-fe/eui-components';
import type { PopconfirmHandler } from '@epoint-fe/eui-components';

type ButtonInstance = InstanceType<(typeof import('@epoint-fe/eui-components'))['EButton']>;

const buttonRef1 = ref<ButtonInstance>();
const buttonRef2 = ref<ButtonInstance>();
const buttonRef3 = ref<ButtonInstance>();
const buttonRef4 = ref<ButtonInstance>();
const buttonRef5 = ref<ButtonInstance>();

let manualHandler: PopconfirmHandler | null = null;

/**
 * 关闭所有 Popconfirm
 */
const handleCloseAll = () => {
  closeAllPopconfirm();
  EMessage.info('已关闭所有 Popconfirm');
};

/**
 * 基础删除示例
 */
const handleDelete = () => {
  if (!buttonRef1.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  createPopconfirm({
    virtualRef: buttonRef1.value.$el,
    title: '确认删除这条记录吗？',
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    onConfirm: () => {
      EMessage.success('删除成功');
    },
    onCancel: () => {
      EMessage.info('已取消删除');
    },
  });
};

/**
 * 自定义配置示例
 */
const handleCustom = () => {
  if (!buttonRef2.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  createPopconfirm({
    virtualRef: buttonRef2.value.$el,
    title: '自定义标题内容',
    confirmButtonText: '确定',
    cancelButtonText: '关闭',
    confirmButtonType: 'success',
    cancelButtonType: 'text',
    iconColor: '#67c23a',
    onConfirm: () => {
      EMessage.success('点击了确定');
    },
  });
};

/**
 * 异步确认示例（带加载状态）
 */
const handleAsync = () => {
  if (!buttonRef3.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  createPopconfirm({
    virtualRef: buttonRef3.value.$el,
    title: '确认提交审核吗？',
    confirmButtonText: '提交',
    cancelButtonText: '取消',
    // onConfirm 支持返回 Promise，在异步操作完成前 Popconfirm 会保持打开状态
    // 这天然防止了重复提交的问题
    async onConfirm() {
      // 模拟异步请求（如 API 调用）
      await new Promise((resolve) => setTimeout(resolve, 1000));
      EMessage.success('提交成功');
    },
  });
};

/**
 * 异步失败处理示例
 * 演示 onConfirm reject 时 Popconfirm 保持打开，用户可在 catch 中手动关闭或重试
 */
const handleAsyncError = () => {
  if (!buttonRef5.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  let retryCount = 0;
  createPopconfirm({
    virtualRef: buttonRef5.value.$el,
    title: '模拟请求失败，是否重试？',
    confirmButtonText: '重试',
    cancelButtonText: '取消',
    async onConfirm() {
      retryCount++;
      if (retryCount <= 2) {
        // 前两次模拟失败
        await new Promise((resolve) => setTimeout(resolve, 800));
        EMessage.error(`请求失败（第 ${retryCount} 次），Popconfirm 保持打开，可再次重试`);
        // 返回 void，不关闭
        return;
      }
      // 第三次模拟成功
      await new Promise((resolve) => setTimeout(resolve, 800));
      EMessage.success('请求成功');
      // 正常完成，Popconfirm 自动关闭
    },
  });
};

/**
 * 手动关闭示例
 */
const handleManual = () => {
  if (!buttonRef4.value?.$el) {
    console.warn('Button ref is not ready');
    return;
  }
  manualHandler = createPopconfirm({
    virtualRef: buttonRef4.value.$el,
    title: '这个 Popconfirm 可以手动关闭',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    onConfirm: () => {
      EMessage.success('点击确认');
      manualHandler = null;
    },
    onCancel: () => {
      EMessage.info('点击取消');
      manualHandler = null;
    },
  });
};

const closeManual = () => {
  if (manualHandler) {
    manualHandler.close();
    manualHandler = null;
    EMessage.info('已手动关闭');
  } else {
    EMessage.warning('没有活动的 Popconfirm');
  }
};
</script>

<style scoped>
.programmatic-popconfirm-demo {
  padding: 20px;
}

h3 {
  margin-top: 0;
  color: #303133;
}

h4 {
  margin-top: 0;
  color: #606266;
  font-size: 14px;
  margin-bottom: 12px;
}

.description {
  color: #909399;
  font-size: 14px;
  margin-bottom: 20px;
}

.demo-section {
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f5f7fa;
}

.demo-section:last-child {
  margin-bottom: 0;
}
</style>
