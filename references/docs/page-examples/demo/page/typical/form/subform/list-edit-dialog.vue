<template>
  <ep-layout-manager class="eui-page custom-page" v-loading="model.global.state.loading" :bottom-config="{ contentClass: 'eui-bottom-section' }">
    <template #main>
      <div class="eui-main-section">
        <!-- NOTE: 下方内容为业务自定义场景，样式由业务自行定义 -->
        <e-scrollbar ref="scrollbarRef">
          <div class="section-title text-lg fw-bold leading-xl pl-l">供应商信息</div>
          <ep-form
            class="eui-form dynamic-form"
            ref="formRef"
            :model="formModel.data"
            :security-config="model.global.securityConfig"
            :attach-rules="model.global.securityConfig.attach"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
            label-position="left"
          >
            <div class="leading-base text-secondary mt-l">供应商</div>
            <ul>
              <li v-for="(item, index) in formModel.data.supplierList" :key="item._key" class="flex flex-row justify-between" :class="{ 'mt-m': index === 0, 'mt-l': index !== 0 }">
                <div class="flex-auto rounded-sm">
                  <ep-row :gutter="4">
                    <ep-col :span="10">
                      <!-- 供应商 -->
                      <ep-form-item label="供应商" :prop="`supplierList.${index}.supplierId`" required>
                        <e-select v-model="item.supplierId" placeholder="单位" :options="model.workplaceList.data" />
                      </ep-form-item>
                    </ep-col>
                    <ep-col :span="6">
                      <!-- 联系人 -->
                      <ep-form-item label="联系人" :prop="`supplierList.${index}.linkName`" required>
                        <ep-input v-model="item.linkName" placeholder="负责人" />
                      </ep-form-item>
                    </ep-col>
                    <ep-col :span="8">
                      <!-- 联系方式 -->
                      <ep-form-item label="联系方式" :prop="`supplierList.${index}.phoneNumber`" required>
                        <ep-input v-model="item.phoneNumber" placeholder="联系方式" />
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </div>
                <e-button class="del-button" :icon="Delete" text ghost type="danger" @click="handleDelete(index)" />
              </li>
              <div>
                <e-button class="mt-m pl-0" type="primary" :icon="Add" plain text @click="handleAdd"> 添加信息 </e-button>
              </div>
            </ul>
          </ep-form>
        </e-scrollbar>
      </div>
    </template>
    <template #bottom>
      <e-toolbar button-position="right">
        <template #button>
          <e-toolbar-btns ref="footerBtnsRef" :items="footerBtnList" />
        </template>
      </e-toolbar>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';
import { Delete, Add } from '@epoint-fe/eui-icons';
import { Utils, Hooks } from '@epframe/eui-core';

defineOptions({
  name: 'ListEditDialog'
});

const { PageConfig, createSubModel, request } = Utils;
const { useListModel, useValidation } = Hooks;
const { validate } = useValidation();

// 定义 props传参
const props = defineProps({
  ouGuid: { type: String, default: '' } // 组织节点 GUID
});

const getCurrentDialog = inject('getCurrentDialog');

// 关闭弹窗
const closeDialog = (action = 'close', data) => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action || 'close', data);
  }
};
const footerBtnList = ref([
  {
    type: 'default',
    content: '取消',
    onClick: () => {
      handleCancel();
    }
  },
  {
    type: 'primary',
    content: '确定',
    onClick: () => {
      handleConfirm();
    }
  }
]);

// 页面配置模型
const pageConfig = new PageConfig({});

// 生成唯一 key（用于动态行的 key 绑定）
const genKey = () => `row_${Date.now()}_${Math.random().toString(36)}`;

// 创建空白供应商行
const createEmptyRow = () => ({
  _key: genKey(),
  supplierId: '',
  phoneNumber: '',
  linkName: ''
});

const model = Utils.defineDataModel(() => {
  const ouGuid = ref(props.ouGuid); // 组织节点 GUID

  // 供应商公司数据模型
  const workplaceList = useListModel('/showcase/f10-demo/workplaceList', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 其他信息表单模型
  const formModel = createSubModel(
    {
      supplierList: []
    },
    {
      // 刷新表单数据
      refresh: async () => {
        // 请求表单数据
        const formData = await request({
          url: '/showcase/f10-demo/subForm/form-base-supplier',
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
        // 为每个对象添加 _key 属性
        if (formData && formData.supplierList && Array.isArray(formData.supplierList)) {
          formData.supplierList.forEach((item) => {
            if (!item._key) {
              item._key = genKey();
            }
          });
        }
        return formData;
      },
      // 更新保存表单数据
      submitForm: async ({ type, newData }) => {
        // 请求保存表单数据
        return await request({
          url: '/showcase/f10-demo/subForm/form-base-supplier',
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
  const securityConfig = { apiUrl: 'rest/frameuserlist/addUser' };

  return {
    global: { pageConfig, securityConfig }, // 全局模型
    models: {
      ouGuid, // 组织节点 GUID
      formModel, // 表单模型
      workplaceList // 开户行
    }
  };
});

const formRef = ref(null);
const { formModel } = model;

const scrollbarRef = ref(null);
// 添加
const handleAdd = () => {
  formModel.data.supplierList.push(createEmptyRow());
  scrollbarRef.value?.setScrollTop(0);
};

// 删除
const handleDelete = (index) => {
  formModel.data.supplierList.splice(index, 1);
};

// 取消
const handleCancel = () => {
  closeDialog('cancel');
};

// 确定
const handleConfirm = async () => {
  // 表单列表为空，无需验证
  if (!formModel.data.supplierList || formModel.data.supplierList.length === 0) {
    EMessage.error('至少需要一条记录');
    return;
  }

  const isValid = await validate(formRef);
  if (!isValid) return;

  await model.formModel
    .submitForm({
      type: 'save',
      newData: formModel.data.supplierList
    })
    .then(() => {
      EMessage({
        message: '保存成功！',
        type: 'success'
      });
      closeDialog('save', formModel.data.supplierList);
    });
};


// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style scoped lang="scss">
.custom-page {
  // padding: var(--e-space-m) var(--e-space-xxl);
  .eui-form {
    padding-top: 0;
  }
}
.dynamic-form {
  // 隐藏标签区域
  :deep(.e-form-item__label) {
    display: none;
  }

  // 隐藏默认的错误提示区域
  :deep(.e-form-item__error-wrap) {
    display: none;
  }

  .del-button {
    color: #7d8da6;
  }
}

// 标题
.section-title {
  position: relative;
  margin-top: var(--e-space-m);
  margin-left: var(--e-space-xxl);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: var(--e-font-size-large);
    background-color: var(--e-color-primary);
  }
}
</style>
