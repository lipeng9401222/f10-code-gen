<template>
  <e-form :model="form" label-width="120px">
    <e-form-layout :gutter="20" :item-span="24">
      <e-form-item label="活动名称" :span="12">
        <e-input v-model="form.name" />
      </e-form-item>
      <e-form-item label="活动区域" :span="12">
        <e-select v-model="form.region" placeholder="请选择您的区域">
          <e-option label="区域一" value="shanghai" />
          <e-option label="区域二" value="beijing" />
        </e-select>
      </e-form-item>
      <e-form-item label="开始时间" :span="12">
        <e-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
      </e-form-item>
      <e-form-item label="结束时间" :span="12">
        <e-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%" />
      </e-form-item>
      <e-form-item label="活动类型">
        <e-checkbox-group v-model="form.type">
          <e-checkbox label="线上活动" value="线上活动" name="type" />
          <e-checkbox label="促销活动" value="促销活动" name="type" />
          <e-checkbox label="线下活动" value="线下活动" name="type" />
          <e-checkbox label="简单品牌曝光" value="简单品牌曝光" name="type" />
        </e-checkbox-group>
      </e-form-item>
      <e-form-item label="即时送货" :span="8">
        <e-switch v-model="form.delivery" />
      </e-form-item>
      <e-form-item label="资源" :span="8">
        <e-radio-group v-model="form.resource">
          <e-radio label="赞助商" value="赞助商" />
          <e-radio label="场馆" value="场馆" />
        </e-radio-group>
      </e-form-item>
      <e-form-item label="是否签到" :span="8">
        <e-switch v-model="form.signin" />
      </e-form-item>
      <e-form-item label="活动形式">
        <e-input v-model="form.desc" type="textarea" />
      </e-form-item>
      <e-form-item>
        <e-button type="primary" @click="onSubmit">创建</e-button>
        <e-button>取消</e-button>
      </e-form-item>
    </e-form-layout>
  </e-form>
</template>

<script setup>
import { reactive } from 'vue';

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  signin: false,
});

const onSubmit = () => {
  console.log('submit!');
};
</script>
