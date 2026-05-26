<template>
  <div class="container">
    <e-avatar-group :avatar-list="avatarList" before-order />
    <e-avatar-group :avatar-list="avatarList" />
    <e-avatar-group :avatar-list="avatarList" :max-count="3" />
    <e-avatar-group shape="circle" :avatar-list="avatarList2" />
    <e-avatar-group shape="square" :avatar-list="avatarList2" />
    <e-avatar-group shape="square" :avatar-list="avatarList2" :max-count="3" />
  </div>
</template>

<script setup lang="ts">
const avatarList = [
  { src: 'https://picsum.photos/200/200/?random=1', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=2', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=3', alt: 'user avatar' },
  { text: 'ZhangSanLiSi' },
  { text: 'OuYangNaNa', textTruncate: 2, backgroundColor: '#1677ff' },
  { src: 'https://picsum.photos/200/200/?random=6', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=7', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=8', alt: 'user avatar' },
];

const avatarList2 = [
  { src: 'https://picsum.photos/200/200/?random=1', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=2', alt: 'user avatar' },
  { text: 'WangXiaoMing', textTruncate: -2, backgroundColor: '#13c2c2' },
  { src: 'https://picsum.photos/200/200/?random=4', alt: 'user avatar' },
];
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
}

.avatar-group {
  display: flex;
  gap: 30px;
}
</style>
