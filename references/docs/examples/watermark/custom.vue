<script setup lang="ts">
import { reactive } from 'vue';

const config = reactive({
  content: 'Eui Vue',
  font: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.15)',
  },
  zIndex: -1,
  rotate: -22,
  gap: [100, 100] as [number, number],
  offset: [0, 0] as [number, number],
});
</script>

<template>
  <div class="wrapper">
    <e-watermark
      class="watermark"
      :content="config.content"
      :font="config.font"
      :z-index="config.zIndex"
      :rotate="config.rotate"
      :gap="config.gap"
      :offset="config.offset"
    >
      <div class="demo">
        <h1>Eui</h1>
        <h2>A Vue 3 based component library for designers and developers</h2>
        <img src="/images/hamburger.png" alt="示例图片" />
      </div>
    </e-watermark>
    <e-form class="form" :model="config" label-position="top" label-width="50px">
      <e-form-item label="Content">
        <e-input v-model="config.content" />
      </e-form-item>
      <e-form-item label="Color">
        <e-color-picker v-model="config.font.color" show-alpha />
      </e-form-item>
      <e-form-item label="FontSize">
        <e-slider v-model="config.font.fontSize" />
      </e-form-item>
      <e-form-item label="zIndex">
        <e-slider v-model="config.zIndex" />
      </e-form-item>
      <e-form-item label="Rotate">
        <e-slider v-model="config.rotate" :min="-180" :max="180" />
      </e-form-item>
      <e-form-item label="Gap">
        <e-space>
          <e-input-number v-model="config.gap[0]" controls-position="right" />
          <e-input-number v-model="config.gap[1]" controls-position="right" />
        </e-space>
      </e-form-item>
      <e-form-item label="Offset">
        <e-space>
          <e-input-number v-model="config.offset[0]" placeholder="offsetLeft" controls-position="right" />
          <e-input-number v-model="config.offset[1]" placeholder="offsetTop" controls-position="right" />
        </e-space>
      </e-form-item>
    </e-form>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
}
.watermark {
  display: flex;
  flex: auto;
}
.demo {
  flex: auto;
}
.form {
  width: 330px;
  margin-left: 20px;
  border-left: 1px solid #eee;
  padding-left: 20px;
}

img {
  z-index: 10;
  width: 100%;
  max-width: 300px;
  position: relative;
}
</style>
