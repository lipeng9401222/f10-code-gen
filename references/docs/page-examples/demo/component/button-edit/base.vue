<template>
  <ep-form v-model="form" class="demo-form">
    <ep-form-item label="字段挑选" prop="value">
      <ep-button-edit v-model="form.value" v-model:text="form.text" placeholder="请选择" clearable popup-url="/f9/dialog/base.html" @close="onButtonEditClose" />
    </ep-form-item>
  </ep-form>
</template>
<script setup>
import { ref } from 'vue';
import { EpButtonEdit } from '@epframe/eui-core';

const form = ref({
  value: '',
  text: ''
});

const onButtonEditClose = (e) => {
  const pArr = e.params.split(';');
  // 将返回的数据格式化成 ButtonEdit 控件需要的格式
  e.params = {
    text: pArr[0],
    value: pArr[1]
  };
};
</script>

<style scoped>
/* Add any scoped styles here */
.demo-form {
  border: 1px solid transparent;
}
</style>
