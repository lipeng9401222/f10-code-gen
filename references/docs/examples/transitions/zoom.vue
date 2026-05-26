<template>
  <div>
    <e-button @click="show = !show">Click Me</e-button>

    <div style="display: flex; margin-top: 20px; height: 100px">
      <transition name="e-zoom-in-center">
        <div v-show="show" class="transition-box">.e-zoom-in-center</div>
      </transition>

      <transition name="e-zoom-in-top">
        <div v-show="show" class="transition-box">.e-zoom-in-top</div>
      </transition>

      <transition name="e-zoom-in-bottom">
        <div v-show="show" class="transition-box">.e-zoom-in-bottom</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(true);
</script>

<style scoped>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
