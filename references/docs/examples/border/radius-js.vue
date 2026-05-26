<template>
  <e-row :gutter="12" class="demo-radius">
    <e-col v-for="(radius, i) in radiusGroup" :key="i" :span="6" :xs="{ span: 12 }">
      <div class="title">{{ radius.name }}</div>
      <div class="value">
        <code>border-radius: {{ getValue(radius.type) || '0px' }}</code>
      </div>
      <div
        class="radius"
        :style="{
          borderRadius: radius.type ? `var(--e-border-radius-${radius.type})` : '',
        }"
      />
    </e-col>
  </e-row>
</template>

<script setup>
import { ref } from 'vue';

const radiusGroup = ref([
  {
    name: '无圆角',
    type: '',
  },
  {
    name: '小圆角（图标）',
    type: 'mini',
  },
  {
    name: '小圆角（菜单）',
    type: 'small',
  },
  {
    name: '基础圆角',
    type: 'base',
  },
  {
    name: '大圆角',
    type: 'large',
  },
  {
    name: '全圆角（胶囊形状）',
    type: 'round',
  },
]);

const getValue = (type) => {
  const getCssVarValue = (prefix, type) =>
    getComputedStyle(document.documentElement).getPropertyValue(`--e-${prefix}-${type}`);
  return getCssVarValue('border-radius', type);
};
</script>
<style scoped>
.demo-radius .title {
  color: var(--e-text-color-regular);
  font-size: 18px;
  margin: 10px 0;
}
.demo-radius .value {
  color: var(--e-text-color-primary);
  font-size: 16px;
  margin: 10px 0;
}
.demo-radius .radius {
  height: 40px;
  width: 70%;
  border: 1px solid var(--e-border-color);
  border-radius: 0;
  margin-top: 20px;
}
</style>
