<template>
  <ul class="flex justify-between items-center">
    <li
      class="flex justify-between items-center h-xs"
      v-for="(item, key) in progressData"
      :key="key"
      :class="{ 'ml-m': key, 'text-placeholder': !item.value, 'text-brand': item.value === 1, 'text-success': item.value === 2 }"
    >
      <e-icon v-if="item.value === 1"><PendingFilled /></e-icon>
      <e-icon v-else-if="item.value === 2"><CircleCheckFilled /></e-icon>
      <e-icon v-else><TimeFilled /></e-icon>
      <span class="leading-lg text-base text-primary ml-s">{{ item.text }}</span>
      <span
        v-if="key !== progressData.length - 1"
        class="w-xs border-b border-2 ml-s"
        :class="{ 'border-default': !item.line, 'border-primary': item.line === 1, 'border-success': item.line === 2 }"
      ></span>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Utils } from '@epframe/eui-core';
import { TimeFilled, CircleCheckFilled, PendingFilled } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'ComplexDataProgress'
});
// 定义 props传参
const props = defineProps({
  progress: { type: Number, default: 0 } //
});

const progressData = [
  {
    text: '订单下单',
    value: 0, // 0-未开始 1-进行中 2-已完成
    line: 0 // 线
  },
  {
    text: '确认',
    value: 0,
    line: 0
  },
  {
    text: '收发货',
    value: 0,
    line: 0
  },
  {
    text: '完成',
    value: 0,
    line: 0
  }
];

// 监听组织节点 GUID 变化，刷新表单数据
watch(
  () => props.progress,
  (newVal) => {
    for (const [i, item] of progressData.entries()) {
      if (i === props.progress - 1) {
        item.value = 1;

        if (i === progressData.length - 1) {
          item.value = 2;
          progressData[i - 1].line = 2;
        } else if (i) {
          progressData[i - 1].line = 1;
        }
        break;
      }

      item.value = 2;
      item.line = 2;
    }
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<style lang="scss" scoped></style>
