<script lang="ts" setup>
import { isDark } from '~/utils/is-dark';
</script>

<template>
  <div>
    <img v-if="isDark" class="lineH-left" src="/images/typography/line-height-dark.png" />
    <img v-else class="lineH-left" src="/images/typography/line-height.png" />
    <ul class="lineH-right">
      <li>
        line-height: <code>1</code> <span>无行高 No line height</span>
        <div class="block">
          <div class="row" style="line-height: 1"><span class="text">无行高 No line height</span></div>
          <div class="row" style="line-height: 1"><span class="text">无行高 No line height</span></div>
          <div class="row" style="line-height: 1"><span class="text">无行高 No line height</span></div>
        </div>
      </li>
      <li>
        line-height: <code>1.3</code> <span>紧凑 Compact</span>
        <div class="block">
          <div class="row" style="line-height: 1.3"><span class="text">紧凑 Compact</span></div>
          <div class="row" style="line-height: 1.3"><span class="text">紧凑 Compact</span></div>
          <div class="row" style="line-height: 1.3"><span class="text">紧凑 Compact</span></div>
        </div>
      </li>
      <li>
        line-height: <code>1.5</code> <span>常规 Regular</span>
        <div class="block">
          <div class="row" style="line-height: 1.5"><span class="text">常规 Regular</span></div>
          <div class="row" style="line-height: 1.5"><span class="text">常规 Regular</span></div>
          <div class="row" style="line-height: 1.5"><span class="text">常规 Regular</span></div>
        </div>
      </li>
      <li>
        line-height: <code>1.7</code> <span>宽松 Loose</span>
        <div class="block">
          <div class="row" style="line-height: 1.7"><span class="text">宽松 Loose</span></div>
          <div class="row" style="line-height: 1.7"><span class="text">宽松 Loose</span></div>
          <div class="row" style="line-height: 1.7"><span class="text">宽松 Loose</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.block {
  background: #f5f5f5;
  color: #fff;
}
.row {
  background: #cce3ff;
}
.text {
  font-size: 14px;
  background: red;
}
</style>
