<template>
  <div class="container">
    <div class="avatar-group">
      <e-avatar shape="square" size="compact" src="https://picsum.photos/200/200/?random=1" alt="用户头像" />
      <e-avatar shape="square" size="small" src="https://picsum.photos/200/200/?random=2" alt="用户头像" />
      <e-avatar shape="square">张三</e-avatar>
      <e-avatar shape="square" size="large" :icon="UserFilled" alt="用户头像" />
    </div>

    <div class="avatar-group">
      <e-avatar shape="circle" size="compact" src="https://picsum.photos/200/200/?random=1" alt="用户头像" />
      <e-avatar shape="circle" size="small" src="https://picsum.photos/200/200/?random=2" alt="用户头像" />
      <e-avatar shape="circle">张三</e-avatar>
      <e-avatar shape="circle" size="large" :icon="UserFilled" alt="用户头像" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserFilled } from '@epoint-fe/eui-icons';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  // gap: 10px;
  justify-content: space-around;
}

.avatar-group {
  display: flex;
  gap: 30px;
}
</style>
