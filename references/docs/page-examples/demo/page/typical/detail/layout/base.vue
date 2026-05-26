<template>
  <div class="eui-page" v-loading="model.global.state.loading">
    <e-scrollbar class="eui-main-section">
      <ep-form class="eui-form" ref="formRef" :model="form" filled :security-config="model.global.securityConfig" label-position="top">
        <e-collapse v-model="activeItems">
          <e-collapse-item id="1" title="基本信息">
            <ep-form-layout :gutter="40">
              <ep-form-item label="入职人员" :span="12">
                <span>{{ form.name }}</span>
              </ep-form-item>
              <ep-form-item label="入职部门" :span="12">
                <span>{{ form.depart }}</span>
              </ep-form-item>
              <ep-form-item label="入职时间" :span="12">
                <span>{{ form.time }}</span>
              </ep-form-item>
              <ep-form-item label="职位" :span="12">
                <span>{{ form.position }}</span>
              </ep-form-item>
            </ep-form-layout>
          </e-collapse-item>
          <e-collapse-item id="2" title="详细信息">
            <ep-form-layout :gutter="40">
              <template v-for="(item, i) in form.detail" :key="i">
                <ep-form-item label="学校" :span="8">
                  <span>{{ item.school }}</span>
                </ep-form-item>
                <ep-form-item label="专业" :span="8">
                  <span>{{ item.major }}</span>
                </ep-form-item>
                <ep-form-item label="学位" :span="8">
                  <span>{{ item.degree }}</span>
                </ep-form-item>
              </template>
            </ep-form-layout>
          </e-collapse-item>
        </e-collapse>
      </ep-form>
    </e-scrollbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Utils } from '@epframe/eui-core';
const { createSubModel } = Utils;

const activeItems = ref(['1', '2']); //折叠展开区域

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const formModel = createSubModel(
    {
      name: '',
      depart: '',
      time: '',
      position: '',
      detail: []
    },
    {
      refresh: async () => {
        return await Utils.request({
          url: '/showcase/f10-demo/detail-form',
          data: {}
        });
      }
    }
  );
  const securityConfig = {
    apiUrl: 'rest/frameuserlist/addUser'
  };

  return {
    global: {
      securityConfig
    },
    models: {
      formModel
    }
  };
});

const form = model.models.formModel.data; // 定义表单数据

onMounted(() => {
  model.methods.initData();
});
</script>
<style lang="scss" scoped></style>
