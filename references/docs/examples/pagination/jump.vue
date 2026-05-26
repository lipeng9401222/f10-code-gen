<template>
  <div>
    <e-pagination v-model:current="current1" show-quick-jumper :total="500" @change="onChange" />
    <br />
    <e-pagination
      v-model:current="current2"
      show-quick-jumper
      :total="500"
      disabled
      show-less-items
      @change="onChange"
    />
    <br />
    <e-pagination v-model:current="current3" :show-quick-jumper="false" :total="500" @change="onChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const current1 = ref<number>(1);
const current2 = ref<number>(2);
const current3 = ref<number>(3);
const onChange = (pageNumber: number) => {
  console.log('Page:', pageNumber);
};
</script>
