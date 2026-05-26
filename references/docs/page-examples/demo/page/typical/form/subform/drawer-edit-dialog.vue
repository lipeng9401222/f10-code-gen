<template>
  <div class="h-full" v-loading="model.global.state.loading">
    <ep-layout-manager class="h-full">
      <template #main>
        <e-scrollbar class="px-xxl py-m">
          <ep-form
            ref="editFormRef"
            :model="editNode"
            :security-config="model.global.securityConfig"
            :attach-rules="model.global.securityConfig.attach"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
            label-position="top"
            class="overflow-hidden"
          >
            <ep-form-item label="单位" prop="workplace">
              <e-select v-model="editNode.workplace" placeholder="请选择" :options="model.workplaceList.data"></e-select>
            </ep-form-item>
            <ep-row :gutter="40">
              <ep-col :span="12">
                <ep-form-item label="负责人" prop="principal">
                  <e-select v-model="editNode.principal" placeholder="请选择" :options="model.principalList.data"></e-select>
                </ep-form-item>
              </ep-col>
              <ep-col :span="12">
                <ep-form-item label="联系方式" prop="linkType">
                  <ep-input v-model="editNode.linkType" placeholder="请输入联系方式" />
                </ep-form-item>
              </ep-col>
            </ep-row>
            <ep-form-item label="资质" prop="certification">
              <e-select v-model="editNode.certification" placeholder="请选择" :options="model.certificationList.data"></e-select>
            </ep-form-item>
            <ep-form-item label="商品信息" prop="merchandise">
              <ep-input v-model="editNode.merchandise" placeholder="请输入商品信息" />
            </ep-form-item>
            <ep-row :gutter="40">
              <ep-col :span="12">
                <ep-form-item label="报价(元)" prop="quotedPrice">
                  <ep-input-number v-model="editNode.quotedPrice" :precision="2" :step="0.01" placeholder="请输入" />
                </ep-form-item>
              </ep-col>
              <ep-col :span="12">
                <ep-form-item label="单价(元)" prop="unitPrice">
                  <ep-input-number v-model="editNode.unitPrice" :precision="2" :step="0.01" placeholder="请输入" />
                </ep-form-item>
              </ep-col>
            </ep-row>
            <ep-form-item label="附件">
              <e-file-upload
                v-model:file-list="editNode.file"
                action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
                :data="[editNode[props.idField]]"
                :num-limit="3"
                enable-download
                :on-remove="handleUploadRemove"
                :before-remove="beforeUploadRemove"
              >
                <template #default>
                  <e-button class="pl-0" type="primary" :icon="Upload" text>上传附件</e-button>
                </template>
              </e-file-upload>
            </ep-form-item>
          </ep-form>
        </e-scrollbar>
      </template>
      <template #bottom>
        <div class="flex justify-end py-l px-xxl operation">
          <e-button @click="handleDrawerCancel">取消</e-button>
          <e-button type="primary" @click="handleDrawerConfirm">确认</e-button>
        </div>
      </template>
    </ep-layout-manager>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, inject } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';
import { Upload } from '@epoint-fe/eui-icons';
import { deepClone } from '@epoint-fe/common-utils';

defineOptions({
  name: 'DrawerEditDialog'
});

const { PageConfig, createSubModel, request } = Utils;
const { useListModel, useValidation } = Hooks;

// 定义 props传参
const props = defineProps({
  ouGuid: { type: String, default: '' }, // 组织节点 GUID
  editNodes: { type: Object, default: () => ({}) }, // 编辑节点数据
  idField: { type: String, default: '' } // 唯一标识键值
});

// 页面配置模型
const pageConfig = new PageConfig({});

// 表单验证
const { validate } = useValidation();

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const ouGuid = ref(null); // 组织节点 GUID

  // 单位数据模型
  const workplaceList = useListModel('/showcase/f10-demo/workplaceList', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 负责人数据模型
  const principalList = useListModel('/showcase/f10-demo/principalList', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 资质数据模型
  const certificationList = useListModel('/showcase/f10-demo/dynamicList', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 给 initSecurityConfig 请求的 securityConfigParams 参数
  const securityConfig = { apiUrl: 'rest/announcement/addAnnouncement' };

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

  return {
    global: { pageConfig, securityConfig }, // 全局模型
    models: {
      ouGuid, // 组织节点 GUID
      workplaceList, // 单位数据模型
      principalList, // 负责人数据模型
      certificationList, // 资质数据模型
      dynamicGridSubmit // 保存列表
    }
  };
});

const getCurrentDrawer = inject('getCurrentDrawer');

// 关闭弹窗
const closeDialog = (action = 'close', data = '') => {
  if (getCurrentDrawer) {
    getCurrentDrawer().close(action === 'close' ? action : data);
  }
};

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

// 编辑抽屉
const editNode = ref({});
const editFormRef = ref(null);

// 监听组织节点 GUID 变化，刷新表单数据
watch(
  () => props.editNodes,
  (newVal) => {
    editNode.value = deepClone(newVal);
  },
  {
    deep: true,
    immediate: true
  }
);

// 编辑取消
const handleDrawerCancel = () => {
  closeDialog('close');
};

// 编辑确认
const handleDrawerConfirm = () => {
  const isValid = validate(editFormRef);
  if (!isValid) {
    return;
  }

  // 先保存后刷新
  model
    .dynamicGridSubmit({
      type: 'save',
      newData: {
        modifed: [editNode.value]
      }
    })
    .then(() => {
      closeDialog('save');
    });
};


// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style scoped lang="scss">
.overflow-hidden {
  padding: 1px;
}
</style>
