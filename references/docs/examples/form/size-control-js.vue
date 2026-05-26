<template>
  <div class="toolbar-box">
    <e-radio-group v-model="size" label="尺寸控制">
      <e-radio-button value="large">大尺寸</e-radio-button>
      <e-radio-button value="default">默认尺寸</e-radio-button>
      <e-radio-button value="small">小尺寸</e-radio-button>
    </e-radio-group>
    <e-radio-group v-model="labelPosition" label="标签位置控制">
      <e-radio-button value="left">左侧</e-radio-button>
      <e-radio-button value="right">右侧</e-radio-button>
      <e-radio-button value="top">顶部</e-radio-button>
    </e-radio-group>
    <e-text class="mx-1">边框</e-text>
    <e-switch v-model="showBorder" />
  </div>
  <br />
  <!-- 在使用表单边框时，请注意 label-width 属性不应设置为 auto。这样可以确保表单的布局和样式保持一致，避免出现意外的显示问题。 -->
  <e-form
    ref="form"
    :model="sizeForm"
    label-width="100px"
    :bordered="showBorder"
    :label-position="labelPosition"
    :size="size"
  >
    <e-form-item label="活动名称">
      <e-input v-model="sizeForm.name" placeholder="请输入活动名称" />
    </e-form-item>
    <!-- 4列布局 -->
    <e-row :gutter="20">
      <e-col :span="12">
        <e-form-item label="4列布局1"> <e-input v-model="sizeForm.name1" disabled /> </e-form-item>
      </e-col>
      <e-col :span="12">
        <e-form-item label="4列布局2"> <e-input v-model="sizeForm.name2" /> </e-form-item>
      </e-col>
    </e-row>
    <!-- 6列布局 -->
    <e-row :gutter="20">
      <e-col :span="8">
        <e-form-item label="6列布局1"> <e-input v-model="sizeForm.name3" /></e-form-item>
      </e-col>
      <e-col :span="8">
        <e-form-item label="6列布局2"> <e-input v-model="sizeForm.name4" /></e-form-item>
      </e-col>
      <e-col :span="8">
        <e-form-item label="6列布局3"> <e-input v-model="sizeForm.name5" /> </e-form-item>
      </e-col>
    </e-row>
    <e-form-item label="活动区域">
      <e-select v-model="sizeForm.region" placeholder="请选择活动区域">
        <e-option label="区域一" value="shanghai" />
        <e-option label="区域二" value="beijing" />
      </e-select>
    </e-form-item>
    <e-form-item label="活动时间">
      <e-col :span="11">
        <e-date-picker
          v-model="sizeForm.date1"
          type="date"
          label="选择日期"
          placeholder="选择日期"
          style="width: 100%"
        />
      </e-col>
      <e-col class="text-center" :span="1" style="margin: 0 0.5rem">-</e-col>
      <e-col :span="11">
        <e-time-picker v-model="sizeForm.date2" label="选择时间" placeholder="选择时间" style="width: 100%" />
      </e-col>
    </e-form-item>
    <e-form-item label="活动类型">
      <e-checkbox-group v-model="sizeForm.type">
        <e-checkbox value="线上活动" label="线上活动" name="type" />
        <e-checkbox value="促销活动" label="促销活动" name="type" />
      </e-checkbox-group>
    </e-form-item>
    <e-form-item label="资源">
      <e-radio-group v-model="sizeForm.resource">
        <e-radio value="赞助商" label="赞助商" />
        <e-radio value="场馆" label="场馆" />
      </e-radio-group>
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="onSubmit">创建</e-button>
      <e-button>取消</e-button>
    </e-form-item>
  </e-form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const size = ref('default');
const labelPosition = ref('right');
const showBorder = ref(false);

const sizeForm = reactive({
  name: '',
  name1: '禁用',
  name2: '',
  name3: '',
  name4: '',
  name5: '',
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

<style scoped>
.e-radio-group {
  margin-right: 12px;
}

.toolbar-box {
  display: flex;
  align-items: center;
}

.e-text {
  margin-right: 6px;
}
</style>
