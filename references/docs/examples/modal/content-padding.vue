<template>
  <e-button @click="visible1 = true">默认 Padding</e-button>
  <e-button style="margin-left: 12px" @click="visible2 = true">无 Padding</e-button>
  <e-button style="margin-left: 12px" @click="visible3 = true">自定义 Padding</e-button>

  <e-modal v-model="visible1" title="默认 Padding">
    <p>body 区域使用默认的 padding 间距</p>
    <p>与 Dialog 保持一致的默认表现</p>
  </e-modal>

  <e-modal v-model="visible2" title="无 Padding" :content-padding="false">
    <p class="p-l">需要自行在内容区域添加 padding</p>
    <p class="p-l">适合完全自定义布局的场景</p>
  </e-modal>

  <e-modal v-model="visible3" title="自定义 Padding" content-padding="20px 40px">
    <p>body 区域使用自定义的 padding 值</p>
    <p>支持数字、字符串、数组和 false 四种形式</p>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
</script>
