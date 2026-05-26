<template>
  <e-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </e-button>

  <e-drawer v-model="drawer" title="I am the title" close-on-click-modal close-on-press-escape :with-header="false">
    <span>Hi there!</span>
    <p>There is no Header, so there is no title. You can click the overlay or press ESC to close this drawer.</p>
    <p>没有顶部，所以没有标题，你可以点击遮罩层，或者按下ESC来关闭此抽屉。</p>
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const drawer = ref(false);
</script>
