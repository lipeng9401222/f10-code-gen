<template>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading">
    <template #main>
      <div class="eui-main-section">
        <div class="h-full flex flex-col py-m">
          <div class="px-xxl leading-base text-secondary text-base mb-m">银行卡信息</div>
          <div class="form-edit-con">
            <e-scrollbar ref="scrollbarRef" class="h-full px-xxl">
              <ul ref="formEditCon">
                <li v-for="(item, index) in formData" :key="index + '-form'" class="flex flex-row justify-between" :class="{ 'mt-xl': index !== 0 }">
                  <div class="flex-auto p-xl rounded-sm bg-fill-lighter">
                    <ep-form
                      :ref="
                        (el) => {
                          if (el) formRef[index] = el;
                        }
                      "
                      :model="item"
                      :security-config="model.global.securityConfig"
                      :attach-rules="model.global.securityConfig.attach"
                      :validate-on-rule-change="model.global.state.validateOnRuleChange"
                      label-position="top"
                    >
                      <ep-row :gutter="40">
                        <ep-col :span="12">
                          <ep-form-item label="开户行">
                            <e-select v-model="item.openingBank" placeholder="请选择" :options="model.openingBankOptions.data"></e-select>
                          </ep-form-item>
                        </ep-col>
                        <ep-col :span="12">
                          <ep-form-item label="开户人名称" prop="openingBankAccount">
                            <ep-input v-model="item.openingBankAccount" placeholder="请输入" />
                          </ep-form-item>
                        </ep-col>
                      </ep-row>
                      <ep-row :gutter="40">
                        <ep-col :span="12">
                          <ep-form-item label="银行卡号" prop="bankCode">
                            <ep-input v-model="item.bankCode" placeholder="请输入" />
                          </ep-form-item>
                        </ep-col>
                        <ep-col :span="12">
                          <ep-form-item label="有效时间">
                            <e-date-picker v-model="item.validTime" type="date" placeholder="请选择日期" />
                          </ep-form-item>
                        </ep-col>
                      </ep-row>
                    </ep-form>
                  </div>
                  <e-button :icon="Delete" text ghost type="danger" class="ml-m delete" @click="handleDelete(index)" />
                </li>
              </ul>
            </e-scrollbar>
          </div>
          <div class="px-xxl">
            <e-button class="mt-m" type="primary" :icon="Add" plain text @click="handleAdd">添加信息</e-button>
          </div>
        </div>
      </div>
    </template>
    <template #bottom>
      <div class="flex justify-end py-l px-xxl">
        <e-button @click="handleCancel">取消</e-button>
        <e-button type="primary" @click="handleConfirm">确定</e-button>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, inject, computed } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';
import { Delete, Add } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'FormEditDialog'
});

const { PageConfig, createSubModel, request } = Utils;
const { useListModel } = Hooks;

// 定义 props传参
const props = defineProps({
  ouGuid: { type: String, default: '' } // 组织节点 GUID
});

const getCurrentDialog = inject('getCurrentDialog');

// 关闭弹窗
const closeDialog = (action = 'close', data) => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action === 'close' ? action : data);
  }
};

// 页面配置模型
const pageConfig = new PageConfig({});

const model = Utils.defineDataModel(() => {
  const ouGuid = ref(''); // 组织节点 GUID

  // 开户行数据模型
  const openingBankOptions = useListModel('/showcase/f10-demo/openingBankOptions', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 其他信息表单模型
  const formModel = createSubModel(
    {},
    {
      // 刷新表单数据
      refresh: async () => {
        // 请求表单数据
        const formData = await request({
          url: `/showcase/f10-demo/editForm`,
          data: {
            // 查询条件
            conditions: [
              {
                path: 'ouGuid', //  组织节点 GUID
                type: 'EQ', // 等于
                value: ouGuid.value // 组织节点 GUID 值
              }
            ]
          }
        });
        return formData;
      },
      // 更新保存表单数据
      submitForm: async ({ type, newData }) => {
        // 请求保存表单数据
        return await request({
          url: `/showcase/f10-demo/editFormSave`,
          data: {
            entities: newData, // 表单数据
            customParams: {
              ouGuid: ouGuid.value // 组织节点 GUID
            },
            type: type
          }
        });
      },
      lazy: false // 懒加载，只有调用 refresh 方法时才会请求数据
    }
  );

  // 给 initSecurityConfig 请求的 securityConfigParams 参数
  const securityConfig = { apiUrl: 'rest/announcement/addAnnouncement' };

  return {
    global: { pageConfig, securityConfig }, // 全局模型
    models: {
      ouGuid, // 组织节点 GUID
      formModel, // 表单模型
      openingBankOptions // 开户行
    }
  };
});

// 监听组织节点 GUID 变化，刷新表单数据
watch(
  () => props.ouGuid,
  (newVal) => {
    model.ouGuid = newVal;
  },
  {
    deep: true,
    immediate: true
  }
);

const formRef = ref([]);
const formData = ref([]);

watch(
  () => model.formModel.data,
  (newVal) => {
    formData.value = newVal.data;
  },
  {
    deep: true,
    immediate: true
  }
);

const scrollbarRef = ref(null);
const formEditCon = ref(null);
// 添加
const handleAdd = () => {
  formData.value.push({
    openingBank: '',
    bankCode: '',
    openingBankAccount: '',
    validTime: ''
  });
  nextTick(() => {
    formRef.value &&
      formRef.value[formRef.value.length - 1].validate(() => {
        scrollbarRef.value?.setScrollTop(formEditCon?.value?.offsetHeight);
      });
  });
};

// 删除
const handleDelete = (index) => {
  formRef.value = [];
  formData.value.splice(index, 1);
};

// 取消
const handleCancel = () => {
  closeDialog('cancel');
};

// 确定
// 判断是否通过验证
const judgeValidate = async () => {
  let noValid = false;
  for (const item of formRef.value) {
    await item.validate((valid) => {
      if (!valid) noValid = true;
    });
  }

  return noValid;
};
const handleConfirm = async () => {
  // 表单列表为空，无需验证
  if (!formRef.value || formRef.value.length === 0) {
    return;
  }

  const noValid = await judgeValidate();

  // 都完成验证之后
  if (noValid) return;
  // 不存在验证没通过的

  await model.formModel.submitForm({
    type: 'save',
    newData: formData.value
  });

  closeDialog('save', {});
};


// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style scoped lang="scss">
.delete.is-text {
  color: var(--e-icon-color-1);
}

.form-edit-con {
  max-height: calc(100% - 40px - 30px);
}
</style>
