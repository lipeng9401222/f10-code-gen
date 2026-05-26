<template>
  <ep-layout-manager
    class="eui-page"
    v-loading="model.global.state.loading"
    :top-config="{ contentClass: 'eui-top-section', showDivider: false }"
    :right-config="{
      defaultWidth: 'fit-content',
      contentClass: 'eui-right-section',
      showDivider: false
    }"
  >
    <template #top>
      <e-toolbar button-position="right" filter-block filter-position="left">
        <template #title>
          <span class="ellipsis">设置页</span>
        </template>
        <template #button>
          <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="2" config-id="toolbar-btns" />
        </template>
        <template #actions>
          <e-button-group>
            <e-button :icon="MoreFilled" text />
          </e-button-group>
        </template>
      </e-toolbar>
    </template>
    <template #main>
      <div class="eui-main-section bg-transparent">
        <e-scrollbar ref="scrollbarRef">
          <ep-form class="eui-form" :model="formModel.data.productInfo" :security-config="model.global.securityConfig" label-position="left">
            <e-collapse v-model="activeItems" :show-nav="false" @change="collapseChange" ref="collapseRef">
              <e-collapse-item id="1" title="产品参数" class="eui-sub-section eui-sub-form anchor-tag">
                <ep-form-layout>
                  <ep-form-item label="生产日期" props="productionDate" :span="rowSpan">
                    <ep-date-picker v-model="formModel.data.productInfo.productionDate" type="date" placeholder="请选择日期" />
                  </ep-form-item>
                  <ep-form-item label="开发版本" :span="rowSpan">
                    <e-select v-model="formModel.data.productInfo.developVersion" placeholder="请选择" :options="developVersionModel.data" />
                  </ep-form-item>
                  <ep-form-item label="关于" label-tooltip="关于帮助提示" :span="rowSpan">
                    <e-switch v-model="formModel.data.productInfo.about" />
                  </ep-form-item>
                </ep-form-layout>
              </e-collapse-item>

              <e-collapse-item id="2" title="发布设置" class="eui-sub-section eui-sub-form anchor-tag">
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="发布日期">
                      <ep-date-picker v-model="formModel.data.publishSettings.publishDate" type="date" placeholder="请选择日期" />
                    </ep-form-item>
                  </e-col>
                </e-row>
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="访问权限">
                      <e-select v-model="formModel.data.publishSettings.access" placeholder="请选择" :options="accessModel.data" />
                    </ep-form-item>
                  </e-col>
                </e-row>
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="公开发布">
                      <e-switch v-model="formModel.data.publishSettings.publiclyReleased" />
                    </ep-form-item>
                  </e-col>
                </e-row>
                <ep-form-item label="产品截图">
                  <div class="flex flex-col gap-s">
                    <e-text class="mx-1" type="info">这里是对上传文件的提示说明文本，例如格式、大小等</e-text>
                    <e-image-upload
                      v-model:image-list="formModel.data.publishSettings.productImages"
                      action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
                      multiple
                      :size-limit="2048"
                      :image-size="80"
                      type-limit="jpg,png"
                    />
                  </div>
                </ep-form-item>
              </e-collapse-item>

              <e-collapse-item id="3" title="消息设置" class="eui-sub-section eui-sub-form anchor-tag">
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="消息发起人">
                      <ep-input v-model="formModel.data.msgSettings.user" placeholder="请输入" />
                    </ep-form-item>
                  </e-col>
                </e-row>
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="消息类型">
                      <ep-select v-model="formModel.data.msgSettings.msgType" placeholder="请选择" :options="msgTypeModel.data" />
                    </ep-form-item>
                  </e-col>
                </e-row>
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="关于">
                      <e-checkbox-group v-model="formModel.data.msgSettings.about" :options="msgSettingModel.data" />
                    </ep-form-item>
                  </e-col>
                </e-row>
              </e-collapse-item>

              <e-collapse-item id="4" title="用户权限" class="eui-sub-section eui-sub-form anchor-tag">
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="权限类型">
                      <ep-select v-model="formModel.data.userAccess.accessType" placeholder="请选择" :options="accessTypeModel.data" />
                    </ep-form-item>
                  </e-col>
                </e-row>
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="权限">
                      <e-checkbox-group v-model="formModel.data.userAccess.access" :options="userAccessModel.data" />
                    </ep-form-item>
                  </e-col>
                </e-row>
              </e-collapse-item>

              <e-collapse-item id="5" title="打印模板" class="eui-sub-section eui-sub-form anchor-tag">
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="自动更新">
                      <e-switch v-model="formModel.data.printTemplate.autoUpdate" />
                    </ep-form-item>
                  </e-col>
                </e-row>
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="更新日期">
                      <e-checkbox-group v-model="formModel.data.printTemplate.updateDate" :options="printTemplateUpdateDateModel.data" />
                    </ep-form-item>
                  </e-col>
                </e-row>
                <e-row>
                  <e-col :span="rowSpan">
                    <ep-form-item label="更新时间">
                      <e-time-select v-model="formModel.data.printTemplate.updateTime" start="08:30" step="00:15" end="18:30" />
                    </ep-form-item>
                  </e-col>
                </e-row>
              </e-collapse-item>
            </e-collapse>
          </ep-form>
        </e-scrollbar>
      </div>
    </template>
    <template #right v-if="showAnchorNav && !inDialog">
      <e-anchor class="ml-xl" :target="collapseTarget" :tags="anchorTags" @active-change="handleAnchorChange" />
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, onMounted, inject, computed, watch, nextTick } from 'vue';
import { EpLayoutManager, Hooks, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';
import { MoreFilled } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'Settings'
});

const { createSubModel, defineDataModel, request } = Utils;
const { useValidation, useListModel } = Hooks;
const { validate } = useValidation();

const getCurrentDialog = inject('getCurrentDialog');
// 是否处于弹窗中
const inDialog = !!getCurrentDialog;

// 关闭弹窗
const closeDialog = (action = 'close', data) => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action || 'close', data);
  }
};

// 表单
const formRef = ref(null);
const rowSpan = 13;
// 折叠面板
const collapseRef = ref(null);
// 折叠面板展开项
const activeItems = ref(['1', '2', '3', '4', '5']);

// Anchor 锚点导航配置
const anchorTags = ref(['.anchor-tag .e-collapse-item__title']);
const scrollbarRef = ref(null);
const collapseTarget = computed(() => scrollbarRef.value?.wrapRef);

// 定义 props传参
const props = defineProps({
  rowGuid: { type: String, default: '' },
  showNav: { type: Boolean, default: true } // 处于弹窗中时不显示锚点导航，此项配置无效
});

// 是否显示锚点导航
const showAnchorNav = computed(() => props.showNav);

const model = defineDataModel(() => {
  const rowGuid = ref(''); // rowGuid
  const developVersionModel = useListModel('/showcase/f10-demo/developVersionList', {
    lazy: false,
    labelField: 'label'
  });
  const accessModel = useListModel('/showcase/f10-demo/accessList', {
    lazy: false,
    labelField: 'label'
  });
  const msgTypeModel = useListModel('/showcase/f10-demo/msgTypeList', {
    lazy: false,
    labelField: 'label'
  });
  const accessTypeModel = useListModel('/showcase/f10-demo/accessTypeList', {
    lazy: false,
    labelField: 'label'
  });

  // 多选框
  // 消息设置-关于
  const msgSettingModel = useListModel('/showcase/f10-demo/msgSettinngList', {
    lazy: false,
    labelField: 'label'
  });
  // 用户权限-权限
  const userAccessModel = useListModel('/showcase/f10-demo/userAccessList', {
    lazy: false,
    labelField: 'label'
  });
  // 打印模板-更新日期
  const printTemplateUpdateDateModel = useListModel('/showcase/f10-demo/printTemplateUpdateDateList', {
    lazy: false,
    labelField: 'label'
  });

  const formModel = createSubModel(
    {
      productInfo: {
        productionDate: '',
        developVersion: '',
        about: false
      },
      publishSettings: {
        publishDate: '',
        access: '',
        publiclyReleased: false,
        productImages: [
          {
            attachGuid: '',
            name: '',
            url: '',
            downloadUrl: '',
            uploadDate: '',
            size: ''
          }
        ]
      },
      msgSettings: {
        user: '',
        msgType: '',
        about: []
      },
      userAccess: {
        accessType: '',
        access: []
      },
      printTemplate: {
        autoUpdate: false,
        updateDate: [],
        updateTime: ''
      }
    },
    {
      // 获取数据
      refresh: async () => {
        const formData = await request({
          url: `/showcase/f10-demo/settingForm`,
          data: {
            guid: rowGuid
          }
        });

        return formData;
      },
      // 保存
      saveForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/settingForm`,
          data: {
            guid: rowGuid,
            entities: [formData],
            type: 'saveForm'
          }
        });
      },
      // 重置
      resetForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/settingForm`,
          data: {
            guid: rowGuid,
            entities: [formData],
            type: 'resetForm'
          }
        });
      }
      // lazy: true // 懒加载，只有调用 refresh 方法时才会请求数据
    }
  );

  return {
    global: {
      // 给 initSecurityConfig 请求的 securityConfigParams 参数
      securityConfig: { apiUrl: 'rest/frameuserlist/addUser' }
    },
    models: {
      rowGuid, // rowGuid
      formModel,
      productInfo: formModel.data.productInfo,
      developVersionModel,
      accessModel,
      msgTypeModel,
      accessTypeModel,
      msgSettingModel,
      userAccessModel,
      printTemplateUpdateDateModel
    }
  };
});

const { formModel, productInfo, developVersionModel, accessModel, msgTypeModel, accessTypeModel, msgSettingModel, userAccessModel, printTemplateUpdateDateModel } = model;

watch(
  () => props.rowGuid,
  (newVal) => {
    model.rowGuid = newVal;
    model.formModel.refresh();
  }
);

const formData = ref([]);

watch(
  () => model.formModel.data,
  (newVal) => {
    formData.value = newVal;
  },
  {
    deep: true,
    immediate: true
  }
);

// 折叠面板展开项变更
const collapseChange = (val) => {
  Utils.logger.info('collapseChange val=', val);
};

// 锚点导航变更
const handleAnchorChange = (newValue, oldValue) => {
  Utils.logger.info('handleAnchorChange newValue=', newValue, 'oldValue=', oldValue);
};

// 取消事件
const onCancel = () => {
  EMessage({
    message: '取消！',
    type: 'default'
  });
  if (inDialog) {
    closeDialog('cancel');
  }
};

// 保存
const onSave = () => {
  Utils.logger.info('保存 formModel.data=', formModel.data);
  // 执行更新
  formModel.saveForm({ formData: formModel.data }).then(() => {
    closeDialog('save', formModel.data);
    EMessage({
      message: '保存成功！',
      type: 'success'
    });
  });
};

// 重置
const onReset = () => {
  // 执行重置
  formModel.resetForm({ formData: formModel.data }).then((newData) => {
    formModel.data = newData;
    EMessage({
      message: '重置成功！',
      type: 'success'
    });
  });
};

// 工具栏按钮配置
const toolbarBtnsRef = ref(null);
const toolbarBtnList = [
  {
    type: 'primary',
    onClick: onSave,
    content: '保存'
  },
  {
    type: 'default',
    onClick: onCancel,
    content: '取消'
  },
  {
    type: 'default',
    onClick: onReset,
    content: '重置'
  }
];

onMounted(() => {
  // 页面初始化
  model.methods.initData();
});
</script>

<style lang="scss" scoped></style>
