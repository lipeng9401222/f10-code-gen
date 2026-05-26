<template>
  <table class="demo-typo-size">
    <tbody>
      <tr>
        <td>Level</td>
        <td>Font Size</td>
        <td class="color-dark-light">Demo</td>
      </tr>
      <tr v-for="(fontSize, i) in fontSizes" :key="i" :style="`font-size: var(--e-font-size-${fontSize.type})`">
        <td>{{ fontSize.level }}</td>
        <td>
          {{ useCssVar(`--e-font-size-${fontSize.type}`).value + ' ' + formatType(fontSize.type) }}
        </td>
        <td>Build In EuiComponents</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useCssVar } from '@vueuse/core';

const fontSizes = [
  {
    level: '辅助文本 Supplementary text',
    type: 'extra-small',
  },
  {
    level: '正文（小号） Body (small)',
    type: 'small',
  },
  {
    level: '正文 Body',
    type: 'base',
  },
  {
    level: '小标题 Small Title',
    type: 'medium',
  },
  {
    level: '标题 Title',
    type: 'large',
  },
  {
    level: '主标题 Main Title',
    type: 'extra-large',
  },
];

function formatType(type) {
  return type
    .split('-')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}
</script>

<style scoped>
.demo-typo-size td {
  padding: 5px 10px;
}
</style>
