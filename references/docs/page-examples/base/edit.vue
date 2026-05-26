<template>
  <ep-layout-manager class="h-full" v-loading="loading">
    <template #main>
      <e-scrollbar class="flex-1">
        <ep-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="p-xl">
          <e-row>
            <e-col :span="12">
              <ep-form-item label="采购项目名称" prop="procurementName">
                <ep-input v-model="formData.procurementName" placeholder="请输入采购项目名称" maxlength="50" show-word-limit />
              </ep-form-item>
            </e-col>
            <e-col :span="12">
              <ep-form-item label="标段（包）名称" prop="sectionName">
                <ep-input v-model="formData.sectionName" placeholder="请输入标段（包）名称" maxlength="50" show-word-limit />
              </ep-form-item>
            </e-col>
          </e-row>
          <e-row>
            <e-col :span="12">
              <ep-form-item label="分类" prop="classification">
                <ep-select v-model="formData.classification" :options="classificationOptions" placeholder="请选择分类" />
              </ep-form-item>
            </e-col>
            <e-col :span="12">
              <ep-form-item label="投标截止时间" prop="deadline">
                <ep-date-picker v-model="formData.deadline" type="datetime" placeholder="请选择投标截止时间" style="width: 100%" />
              </ep-form-item>
            </e-col>
          </e-row>
          <ep-form-item label="备注">
            <ep-input v-model="formData.remark" type="textarea" :rows="3" placeholder="请输入备注" maxlength="200" show-word-limit />
          </ep-form-item>
        </ep-form>
      </e-scrollbar>
    </template>

    <template #bottom>
      <div class="flex items-center justify-end px-xl py-m" style="border-top: 1px dashed var(--e-border-color-brand-light)">
        <e-button @click="onCancel">取消</e-button>
        <e-button type="primary" class="ml-m" :loading="submitting" @click="onSubmit">确认</e-button>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

defineOptions({
  name: 'PageExamplesDefineDataModelEdit'
});

const props = defineProps({
  rowGuid: { type: String, default: '' }
});

const getCurrentDialog = inject('getCurrentDialog');
const closeDialog = (action = 'close', data) => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action, data);
  }
};

const { useDataSource, useValidation } = Hooks;
const { request } = Utils;
const { validate } = useValidation();

const loading = ref(false);
const submitting = ref(false);
const formRef = ref(null);

const { dataSource: classificationOptions } = useDataSource('/api/page-examples/classificationOptions');

const formData = reactive({
  procurementName: '',
  sectionName: '',
  classification: '',
  deadline: '',
  remark: ''
});

const rules = {
  procurementName: [
    { required: true, message: '请输入采购项目名称', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  sectionName: [
    { required: true, message: '请输入标段（包）名称', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  classification: [{ required: true, message: '请选择分类', trigger: 'change' }],
  deadline: [{ required: true, message: '请选择投标截止时间', trigger: 'change' }]
};

const loadDetail = async () => {
  if (!props.rowGuid) return;
  loading.value = true;
  try {
    const res = await request({
      url: '/api/page-examples/detail',
      data: { params: { id: props.rowGuid } }
    });
    Object.assign(formData, {
      procurementName: res.procurementName || '',
      sectionName: res.sectionName || '',
      classification: res.classification || '',
      deadline: res.deadline || '',
      remark: res.remark || ''
    });
  } catch (e) {
    console.error('加载详情失败:', e);
  } finally {
    loading.value = false;
  }
};

const onCancel = () => {
  closeDialog('cancel');
};

const onSubmit = async () => {
  const isValid = await validate(formRef);
  if (!isValid) return;

  submitting.value = true;
  try {
    const { state, message } = await request({
      url: '/api/page-examples/update',
      data: { params: { ...formData, id: props.rowGuid } }
    });
    EMessage({ message, type: state ? 'success' : 'error' });
    if (state) closeDialog('submit', formData);
  } catch (e) {
    console.error('提交失败:', e);
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  loadDetail();
});
</script>

<style lang="less" scoped></style>