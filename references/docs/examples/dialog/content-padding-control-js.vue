<template>
  <e-button text @click="dialogVisible1 = true"> 点击打开对话框1 </e-button>
  <e-button text @click="dialogVisible2 = true"> 点击打开对话框2 </e-button>
  <e-button text @click="dialogVisible3 = true"> 点击打开对话框3 </e-button>
  <e-button text @click="dialogVisible4 = true"> 点击打开对话框4 </e-button>
  <e-button text @click="dialogVisible5 = true"> 点击打开带背景色对话框 </e-button>

  <e-dialog v-model="dialogVisible1" title="没有边距" :content-padding="false">
    <div class="content-demo"><p>没有边距</p></div>
  </e-dialog>
  <e-dialog v-model="dialogVisible2" title="自定义边距" width="30%" :content-padding="[10, 20]">
    <div class="content-demo"><p>自定义边距</p></div>
  </e-dialog>
  <e-dialog v-model="dialogVisible3" title="通过class样式定义" content-cls="my-dialog-content">
    <div class="content-demo"><p>通过class样式定义</p></div>
  </e-dialog>
  <e-dialog v-model="dialogVisible4" title="通过style样式定义" :content-style="myStyle">
    <div class="content-demo"><p>通过style样式定义</p></div>
  </e-dialog>
  <e-dialog v-model="dialogVisible5" title="带背景色的内容区域" width="30%" show-bg>
    <div class="content-demo"><p>内容区域带背景色</p></div>
  </e-dialog>
</template>

<script setup>
import { ref } from 'vue';

const dialogVisible1 = ref(false);
const dialogVisible2 = ref(false);
const dialogVisible3 = ref(false);
const dialogVisible4 = ref(false);
const dialogVisible5 = ref(false);

const myStyle = ref({
  padding: '50px',
  fontWeight: 'bold',
  textDecoration: 'underline',
});
</script>
<style scoped>
.content-demo {
  background: var(--e-color-primary-light-7);
  height: 300px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
</style>
<style scoped>
.my-dialog-content {
  background-image: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet);
}
</style>
