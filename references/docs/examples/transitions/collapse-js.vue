<template>
  <div>
    <e-button @click="show = !show">Click Me</e-button>

    <div style="margin-top: 20px; height: 200px">
      <e-collapse-transition>
        <div v-show="show">
          <div class="transition-box">e-collapse-transition</div>
          <div class="transition-box">e-collapse-transition</div>
        </div>
      </e-collapse-transition>
    </div>
  </div>
</template>

<script setup>
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
