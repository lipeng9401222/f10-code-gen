<template>
  <div>
    <e-form class="mb-4" label-width="100px" label-position="left">
      <e-form-item label="快速测试">
        <span class="color-buttons">
          <e-tag
            v-for="item in presetColors"
            :key="item.value"
            class="mr-2"
            :color="item.value"
            @click="setColor(item.value)"
          >
            {{ item.name }}
          </e-tag>
        </span>
      </e-form-item>

      <e-form-item label="自选颜色">
        <e-color-picker v-model="color" :show-alpha="false" @change="setColor" />
        <span class="ml-2 text-gray-500">{{ color }}</span>
      </e-form-item>
    </e-form>

    <div ref="demoContainer" class="demo-container">
      <e-row class="mb-4">
        <e-button>Default</e-button>
        <e-button type="primary">Primary</e-button>
        <e-button type="success">Success</e-button>
        <e-button type="info">Info</e-button>
        <e-button type="warning">Warning</e-button>
        <e-button type="danger">Danger</e-button>
      </e-row>

      <e-row class="mb-4">
        <e-button plain>Plain</e-button>
        <e-button type="primary" plain>Primary</e-button>
        <e-button type="success" plain>Success</e-button>
        <e-button type="info" plain>Info</e-button>
        <e-button type="warning" plain>Warning</e-button>
        <e-button type="danger" plain>Danger</e-button>
      </e-row>

      <e-row class="mb-4">
        <e-button round>Round</e-button>
        <e-button type="primary" round>Primary</e-button>
        <e-button type="success" round>Success</e-button>
        <e-button type="info" round>Info</e-button>
        <e-button type="warning" round>Warning</e-button>
        <e-button type="danger" round>Danger</e-button>
      </e-row>

      <e-row class="mb-4">
        <e-button type="primary" plain>朴素按钮</e-button>
        <e-button type="primary" link class="ml-2">链接按钮</e-button>
        <e-switch class="ml-2" :model-value="true" />
        <e-radio label="1" class="ml-2">选项1</e-radio>
        <e-checkbox class="ml-2">复选框</e-checkbox>
      </e-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { EMessageBox, utils } from '@epoint-fe/eui-components';

const color = ref('#2370ef');

const presetColors = [
  { name: '蓝色', value: '#2370ef' },
  { name: '绿色', value: '#18a058' },
  { name: '橙色', value: '#f0883a' },
  { name: '红色', value: '#d03050' },
  { name: '紫色', value: '#8a2be2' },
  { name: '青色', value: '#0e7a8a' },
  { name: '粉色', value: '#ee3f86' },
];

const demoContainer = ref(null);
let globalStyle;

const createGlobalStyle = () => {
  if (globalStyle) {
    return;
  }

  globalStyle = document.createElement('style');
  globalStyle.id = 'demo-test-set-color';
  document.head.appendChild(globalStyle);
};

const setColor = (value) => {
  console.log(value);
  const result = utils.generateThemeColors(value);
  console.log(result);
  console.log(result.cssVars.delta);
  console.log(result.cssVars.full);

  // 全局生效 or 仅 demo 生效
  EMessageBox.confirm('你想应用到全局还是下面的 demo 区域', '请选择应用范围', {
    confirmButtonText: '全局',
    cancelButtonText: 'demo 区域',
  })
    .then(() => {
      createGlobalStyle();
      globalStyle.textContent = `:root { ${result.cssVars.deltaString} }`;
    })
    .catch(() => {
      console.log('cancel');
      // demoContainer.value.style.cssText = result.cssVars.delta;
      result.cssVars.delta.forEach(([key, value]) => {
        demoContainer.value.style.setProperty(key, value);
      });
    });
};
</script>
<style lang="scss" scoped>
:deep(.color-buttons .e-tag__content) {
  color: #fff;
}
</style>
