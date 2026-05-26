<template>
  <e-space>
    <e-button @click="openComponentIcon">组件图标</e-button>
    <e-button @click="openStringIcon">字体图标</e-button>
    <e-button @click="openUrlIcon">图片 URL</e-button>
  </e-space>

  <e-modal v-model="visible" :title="title" :icon="currentIcon" :icon-bg-color="bgColor" :icon-color="color">
    <e-card>
      <p><strong>当前渲染方式：</strong>{{ currentType }}</p>
      <e-form :model="formData" label-width="80px" class="mt-l">
        <e-form-item label="用户名">
          <e-input v-model="formData.username" />
        </e-form-item>
        <e-form-item label="邮箱">
          <e-input v-model="formData.email" />
        </e-form-item>
      </e-form>
    </e-card>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import { Edit } from '@epoint-fe/eui-icons';

const visible = ref(false);
const title = ref('');
const currentIcon = shallowRef<any>();
const bgColor = ref('');
const color = ref('');
const currentType = ref('');

const openComponentIcon = () => {
  title.value = '使用 Vue 组件';
  currentIcon.value = Edit;
  bgColor.value = '#fff3e0';
  color.value = '#ff6b00';
  currentType.value = '传入 Vue 图标组件实例 (Component)';
  visible.value = true;
};

const openStringIcon = () => {
  title.value = '使用字体图标';
  currentIcon.value = 'custom-demo-icon';
  bgColor.value = '#e3f2fd';
  color.value = '#1976d2';
  currentType.value = '传入字体图标的 class 字符串';
  visible.value = true;
};

const openUrlIcon = () => {
  title.value = '使用图片 URL';
  // 采用一个公网图片作为演示
  currentIcon.value = 'https://cn.vuejs.org/logo.svg';
  bgColor.value = '#f4f4f5';
  color.value = ''; // 通常图片自身带颜色，不需单独设定 icon-color
  currentType.value = '传入以 http(s):// 或 / 开头的图片地址字符串';
  visible.value = true;
};

const formData = ref({
  username: '张三',
  email: 'zhangsan@example.com',
});
</script>

<style>
/* 本地模拟一个字体图标类以供演示 */
.custom-demo-icon::before {
  content: '★';
  font-family: inherit;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
