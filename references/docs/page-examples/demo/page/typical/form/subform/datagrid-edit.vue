<template>
  <div class="eui-page">
    <ep-layout-manager class="eui-main-section" v-loading="model.global.state.loading" :bottom-config="{ contentClass: 'eui-bottom-section' }">
      <template #main>
        <e-scrollbar>
          <ep-form
            ref="formProductRef"
            class="eui-form"
            :model="formProductModel.data"
            :security-config="model.global.securityConfig"
            :attach-rules="model.global.securityConfig.attach"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
          >
            <e-collapse v-model="activeItems" :show-nav="false" :scrollbar-option="{ visible: true }">
              <e-collapse-item id="product" title="产品信息">
                <ep-row :gutter="40">
                  <ep-col :span="12">
                    <ep-form-item label="产品编号" prop="productCode"> <ep-input v-model="formProductModel.data.productCode" placeholder="请输入" /> </ep-form-item
                    ><ep-form-item label="产品名称" prop="productName"> <ep-input v-model="formProductModel.data.productName" placeholder="请输入" /> </ep-form-item>
                    <ep-form-item label="开始日期" prop="productStartDate">
                      <ep-date-picker v-model="formProductModel.data.productStartDate" placeholder="请输入" />
                    </ep-form-item>
                    <ep-form-item label="结束日期" prop="productEndDate">
                      <ep-date-picker v-model="formProductModel.data.productEndDate" placeholder="请输入" />
                    </ep-form-item>
                    <ep-form-item label="产品描述" prop="productDescribe">
                      <ep-input v-model="formProductModel.data.productDescribe" type="textarea" :rows="4" placeholder="请输入" />
                    </ep-form-item>
                  </ep-col>
                  <ep-col :span="12">
                    <DatagridForm ref="datagridFromRef" label="报价项" />
                  </ep-col>
                </ep-row>
              </e-collapse-item>
              <e-collapse-item id="other" title="市场详情">
                <DatagridBase ref="datagridBaseRef" />
              </e-collapse-item>
            </e-collapse>
          </ep-form>
        </e-scrollbar>
      </template>
      <template #bottom>
        <e-toolbar button-position="right">
          <template #button>
            <e-toolbar-btns ref="footerBtnsRef" :items="footerBtnList" />
          </template>
        </e-toolbar>
      </template>
    </ep-layout-manager>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';
import { SearchList } from '@epoint-fe/eui-icons';
import { EMessage } from '@epoint-fe/eui-components';

// 提前导入/注册需要动态渲染的组件
import DatagridBase from '../subform/datagrid-edit-base.vue';
import DatagridForm from '../subform/datagrid-edit-form.vue';

defineOptions({
  name: 'DatagridEdit'
});

const { PageConfig, createSubModel, request } = Utils;
const { useValidation } = Hooks;

// 页面配置模型
const pageConfig = new PageConfig({});

// 表单验证
const { validate } = useValidation();

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const ouGuid = ref(null); // 组织节点 GUID

  // 产品信息表单模型
  const formProductModel = createSubModel(
    {},
    {
      // 刷新表单数据
      refresh: async () => {
        // 请求表单数据
        const formData = await request({
          url: `/showcase/f10-demo/productForm`,
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
      submitForm: async ({ type }) => {
        // 请求保存表单数据
        return await request({
          url: `/showcase/f10-demo/productFormSave`,
          data: {
            entities: [formProductModel.data], // 表单数据
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

  // 保存产品报价项列表
  const dynamicGridProductSubmit = async ({ type, newData }) => {
    return await request({
      url: '/showcase/f10-demo/dynamicGridProductSave',
      data: {
        entities: [newData], // 列表数据
        customParams: {
          ouGuid: ouGuid.value // 组织节点 GUID
        },
        type: type
      }
    });
  };

  // 保存列表
  const dynamicGridSubmit = async ({ type, newData }) => {
    return await request({
      url: '/showcase/f10-demo/dynamicGridSave',
      data: {
        entities: [newData], // 列表数据
        customParams: {
          ouGuid: ouGuid.value // 组织节点 GUID
        },
        type: type
      }
    });
  };

  // 保存-提交
  const saveAll = async ({ type }) => {
    const isProductValid = await validate(formProductRef);
    const editedProduct = datagridFromRef.value?.getEdited();
    const edited = datagridBaseRef.value?.getEdited();
    if (!isProductValid) {
      return;
    }

    // 请求更新表单数据
    return await Promise.all([formProductModel.submitForm({ type }), dynamicGridProductSubmit({ type, newData: editedProduct }), dynamicGridSubmit({ type, newData: edited })]);
  };

  return {
    global: { pageConfig, securityConfig }, // 全局模型
    models: {
      ouGuid, // 组织节点 GUID
      formProductModel, // 产品信息表单模型
      saveAll // 保存方法
    }
  };
});

const { formProductModel } = model;

// 定义表单引用
const formProductRef = ref(null);


// 默认展开所有项
const activeItems = ref(['product', 'other']);

// 定义数据表格引用
const datagridBaseRef = ref(null);
const datagridFromRef = ref(null);

// 底部按钮
const footerBtnsRef = ref(null);
const footerBtnList = ref([
  {
    type: 'default',
    content: '保存修改',
    onClick: async () => {
      model.saveAll({ type: 'save' }).then((data) => {
        EMessage({
          message: '暂存成功！',
          type: 'success'
        });
      });
    }
  },
  {
    type: 'primary',
    content: '确认提交',
    onClick: async () => {
      model.saveAll({ type: 'submit' }).then((data) => {
        EMessage({
          message: '提交成功！',
          type: 'success'
        });
      });
    }
  }
]);

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style scoped lang="scss"></style>
