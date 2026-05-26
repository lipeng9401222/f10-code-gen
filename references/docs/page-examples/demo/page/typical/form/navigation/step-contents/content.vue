<template>
  <div class="eui-page p-0">
    <div class="eui-main-section">
      <e-scrollbar>
        <ep-form class="eui-form" ref="formRef" :model="formData" label-position="top" :rules="rules" label-width="220px">
          <e-collapse v-model="activeItems">
            <e-collapse-item id="1" title="公告信息">
              <ep-form-layout :gutter="40">
                <ep-form-item label="公告标题" prop="noticeTitle" label-tooltip="公告标题">
                  <e-input v-model="formData.noticeTitle" />
                </ep-form-item>
                <ep-form-item label="公告内容" prop="noticeContent" label-tooltip="公告内容">
                  <e-input v-model="formData.noticeContent" type="textarea" />
                </ep-form-item>
                <ep-form-item label="通知开始时间" prop="noticeStartTime" :span="12">
                  <ep-date-picker v-model="formData.noticeStartTime" value-format="YYYY-MM-DD" type="date" placeholder="请选择" />
                </ep-form-item>
                <ep-form-item label="通知结束时间" prop="noticeEndTime" :span="12">
                  <ep-date-picker v-model="formData.noticeEndTime" value-format="YYYY-MM-DD" type="date" placeholder="请选择" />
                </ep-form-item>
                <ep-form-item label="通知系统/平台" prop="systemPlatform">
                  <ep-select v-model="formData.systemPlatform" :options="model.models.reasonOptions.data" multiple placeholder="请选择" />
                </ep-form-item>
              </ep-form-layout>
            </e-collapse-item>
            <e-collapse-item id="2" title="更新时间">
              <ep-form-layout :gutter="40">
                <ep-form-item label="更新开始时间" prop="updateStartTime" :span="12">
                  <ep-date-picker v-model="formData.updateStartTime" value-format="YYYY-MM-DD" type="date" placeholder="请选择" />
                </ep-form-item>
                <ep-form-item label="更新持续时间" prop="updateEndTime" :span="12">
                  <ep-date-picker v-model="formData.updateEndTime" value-format="YYYY-MM-DD" type="date" placeholder="请选择" />
                </ep-form-item>
                <ep-form-item label="备注说明" prop="remark">
                  <e-input v-model="formData.remark" type="textarea" />
                </ep-form-item>
              </ep-form-layout>
            </e-collapse-item>
            <e-collapse-item id="3" title="更新内容">
              <ep-form-item label="更新详细内容" prop="updateContent" label-tooltip="更新详细内容">
                <e-input v-model="formData.updateContent" type="textarea" />
              </ep-form-item>
            </e-collapse-item>
          </e-collapse>
        </ep-form>
      </e-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, inject } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';

const { createSubModel, defineDataModel, request } = Utils;
const { useListModel } = Hooks;

const formData = defineModel('modelValue', {
  noticeTitle: '公告标题',
  noticeContent: '',
  noticeStartTime: '',
  noticeEndTime: '',
  systemPlatform: [],
  updateStartTime: '',
  updateEndTime: '',
  remark: '',
  updateContent: '',
  priority: 'high'
});

const model = defineDataModel(() => {
  const reasonOptions = useListModel('/showcase/f10-demo/platformOptions', {
    labelField: 'label',
    lazy: false // 懒加载
  });

  return {
    models: {
      reasonOptions
    }
  };
});

const { reasonOptions } = model;

const options = ref([
  { label: '前台用户系统', value: '1' },
  { label: '后台管理系统', value: '2' },
  { label: '操作系统', value: '3' }
]);

const rules = reactive({
  noticeTitle: [
    {
      required: true,
      message: '请输入公告标题',
      trigger: 'blur'
    }
  ],
  noticeContent: [
    {
      required: true,
      message: '请输入公告内容',
      trigger: 'blur'
    }
  ],
  noticeStartTime: [
    {
      required: true,
      message: '请选择开始时间',

      trigger: 'blur'
    }
  ],
  noticeEndTime: [
    {
      required: true,
      message: '请选择结束时间',
      trigger: 'blur'
    }
  ],
  systemPlatform: [
    {
      required: true,
      message: '请选择系统平台',
      trigger: 'blur'
    }
  ],
  updateStartTime: [
    {
      required: true,
      message: '请选择更新开始时间',
      trigger: 'blur'
    }
  ],
  updateEndTime: [
    {
      required: true,
      message: '请选择更新持续时间',
      trigger: 'blur'
    }
  ],
  updateContent: [
    {
      required: true,
      message: '请选择更新内容',
      trigger: 'blur'
    }
  ]
});

const activeItems = ref(['1', '2', '3']);

const formRef = ref(null);
onMounted(() => {
  model.methods.initData();
});

defineExpose({
  validate: () => formRef.value?.validate()
});
</script>
<style scoped lang="scss"></style>
