<template>
  <div class="demo-message-box">
    <p class="mb-4">不同状态的消息弹窗示例：</p>
    <div class="demo-message-box__buttons">
      <e-button @click="openDefault">默认消息框</e-button>
      <e-button type="success" @click="openSuccess">成功消息框</e-button>
      <e-button type="warning" @click="openWarning">警告消息框</e-button>
      <e-button type="danger" @click="openError">错误消息框</e-button>
    </div>
  </div>
</template>

<script setup>
import { EMessageBox } from '@epoint-fe/eui-components';

const openDefault = () => {
  EMessageBox.alert('这是一条默认消息提示', '提示', {
    confirmButtonText: '确定',
  });
};

const openSuccess = () => {
  EMessageBox.alert('操作已成功完成', '成功', {
    type: 'success',
    confirmButtonText: '确定',
  });
};

const openWarning = () => {
  EMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '警告', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  });
};

const openError = () => {
  EMessageBox.alert('系统检测到错误，请联系管理员', '错误', {
    type: 'error',
    confirmButtonText: '我知道了',
  });
};
</script>

<style scoped>
.demo-message-box__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
