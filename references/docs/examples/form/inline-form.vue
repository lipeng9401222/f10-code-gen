<template>
  <e-form :inline="true" :model="formInline" class="demo-form-inline">
    <e-form-item label="审批人">
      <e-input v-model="formInline.user" placeholder="审批人" />
    </e-form-item>
    <e-form-item label="活动区域">
      <e-select v-model="formInline.region" placeholder="选择活动区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="onSubmit">查询</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const formInline = reactive({
  user: '',
  region: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>
