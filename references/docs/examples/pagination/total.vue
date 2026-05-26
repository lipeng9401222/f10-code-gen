<template>
  <div>
    <e-pagination
      v-model:current="current1"
      v-model:page-size="pageSize1"
      :total="85"
      :show-total="(total) => `总数 ${total} 个`"
    />
    <br />
    <e-pagination
      v-model:current="current2"
      v-model:page-size="pageSize2"
      :total="85"
      :show-total="(total, range) => ` 共${total} 项，当前显示第${range[0]}至${range[1]}条`"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const current1 = ref<number>(1);
const current2 = ref<number>(2);
const pageSize1 = ref<number>(20);
const pageSize2 = ref<number>(20);
</script>
