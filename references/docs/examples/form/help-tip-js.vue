<template>
  <e-form :model="form" label-width="120px">
    <e-form-item label="活动名称" label-tooltip="帮助提示：请输入活动名称">
      <e-input v-model="form.name" placeholder="请输入活动名称" />
    </e-form-item>
    <e-form-item label="活动区域" tooltip="帮助提示：请选择活动区域">
      <e-select v-model="form.region" placeholder="请选择活动区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
    </e-form-item>
    <e-form-item
      label="活动时间"
      :label-tooltip="{
        content: '帮助提示：<span style=\'color:var(--e-color-danger)\'>请选择日期</span>',
        placement: 'left',
        effect: 'light',
        showArrow: false,
        rawContent: true,
      }"
    >
      <e-col :span="11">
        <e-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
      </e-col>
      <e-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </e-col>
      <e-col :span="11">
        <e-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%" />
      </e-col>
    </e-form-item>
    <e-form-item label="活动类型">
      <e-checkbox-group v-model="form.type">
        <e-checkbox value="线上活动" label="线上活动" name="type" />
        <e-checkbox value="促销活动" label="促销活动" name="type" />
      </e-checkbox-group>
    </e-form-item>
    <e-form-item label="资源">
      <e-radio-group v-model="form.resource">
        <e-radio value="赞助商" label="赞助商" />
        <e-radio value="场馆" label="场馆" />
      </e-radio-group>
    </e-form-item>
    <e-form-item label="活动说明">
      <e-input v-model="form.desc" type="textarea" />
      <template #extra>
        <span>请填写活动的详细说明，不少于10个字符</span>
      </template>
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="onSubmit">创建</e-button>
      <e-button>取消</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

function onSubmit() {
  console.log('submit!');
}
</script>
