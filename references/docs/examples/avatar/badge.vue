<template>
  <div class="container">
    <div class="avatar-group">
      <e-avatar shape="square" :count="10" src="https://picsum.photos/200/200/?random=1" alt="用户头像" />
      <e-avatar shape="square" is-dot src="https://picsum.photos/200/200/?random=2" alt="用户头像" />
      <e-avatar shape="square" :count="100">张三</e-avatar>
    </div>

    <div class="avatar-group">
      <e-avatar :count="10" src="https://picsum.photos/200/200/?random=1" alt="用户头像" />
      <e-avatar is-dot src="https://picsum.photos/200/200/?random=2" alt="用户头像" />
      <e-avatar :count="100">张三</e-avatar>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
