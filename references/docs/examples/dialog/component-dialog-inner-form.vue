<template>
  <e-form :model="form" label-width="120px">
    <e-form-item label="活动名称">
      <e-input v-model="form.name" @change="onChange" />
    </e-form-item>
    <template v-if="props.isShowDateTime">
      <e-form-item label="活动时间">
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
    </template>
    <e-form-item>
      <e-button type="primary" @click="onSubmit">提交</e-button>
      <e-button>取消</e-button>
    </e-form-item>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { EButton, ECol, EDatePicker, EForm, EFormItem, EInput, ETimePicker } from '@epoint-fe/eui-components';

// 入参
const props = defineProps({
  // 是否显示日期选择
  isShowDateTime: {
    type: Boolean,
    default: true,
  },
  // 验证前调用
  beforeValidate: {
    type: Function,
    default: () => true,
  },
});

// 事件
const emit = defineEmits(['submit', 'change']);

// 表单
const form = reactive({
  name: '',
  date1: '',
  date2: '',
});

// 值变化
const onChange = () => {
  emit('change', form.name);
};

// 提交
const onSubmit = () => {
  const result = props.beforeValidate();

  if (!result) {
    return;
  }
  emit('submit', form);
};
</script>
