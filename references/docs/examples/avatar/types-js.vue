<template>
  <div class="demo-type">
    <div>
      <e-avatar :icon="UserFilled" />
      <p>Icon</p>
    </div>
    <div>
      <e-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <p>Image</p>
    </div>
    <div>
      <e-avatar text="ZhangSanLiSi" />
      <p>Last two chars</p>
    </div>
    <div>
      <e-avatar text="OuYangNaNa" :text-truncate="2" background-color="#1677ff" />
      <p>First two + custom bg</p>
    </div>
  </div>
</template>

<script setup>
import { UserFilled } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.demo-type {
  display: flex;
}

.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type p {
  margin-top: 8px;
  font-size: 12px;
  color: var(--e-text-color-secondary);
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--e-border-color);
}
</style>
