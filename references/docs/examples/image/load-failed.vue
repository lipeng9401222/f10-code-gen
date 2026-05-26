<template>
  <div class="demo-image__error">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-image />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <e-image>
        <template #error>
          <div class="image-slot">
            <e-icon><icon-picture /></e-icon>
          </div>
        </template>
      </e-image>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Picture as IconPicture } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__error .e-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--e-fill-color-light);
  color: var(--e-text-color-secondary);
  font-size: 30px;
}
.demo-image__error .image-slot .e-icon {
  font-size: 30px;
}
</style>
