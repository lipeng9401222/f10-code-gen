---
title: Toolbar
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/e-toolbar/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/e-toolbar/)

![](http://192.168.219.170/docs/vue/latest/frame/_astro/toolbar-demo.C_OBYo8A_mEA8k.webp)

代码：（较为完整，根据实际情况删除不需要的）

<details>
<summary>用户管理列表页面 list.js 案例</summary>

```html
<template>
  <e-container class="fui-page -scroll-head" v-loading="model.global.state.loading" :class="autoHeight ? 'auto-h' : ''">
    <e-container>
      <!-- 顶部标题区域 -->
      <e-header>
        <e-toolbar>
          <template #button>
            <e-toolbar-btns
              ref="toolbarBtnsRef"
              :items="toolbarBtnList"
              configurable
              :max-display-count="4"
              config-id="toolbar-btns"
            />
          </template>
          <template #filter="{ opened }">
            <e-toolbar-search
              ref="toolbarSearchRef"
              :site-top="toolbarTopRef"
              :site-side="toolbarRightRef"
              :search-list="searchList"
              :is-open="opened"
              @advance-search="onAdvanceSearch"
              configurable
              config-id="toolbar-search"
              config-url="/rest/frameuserlist/getUserPageResult"
            />
          </template>

          <template #actions>
            <e-toolbar-more
              :table-ref="tableRef"
              :model="model"
              :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'"
            >
              <template #tip-content>
                <p>通过'导出'按钮导出的组织架构数据无法通过'模板化导入按钮'导入, 请使用'模板化导出'按钮导出后再导入;</p>
                <p>拖拽排序功能只支持部门内操作,需要打开搜索框勾选直属用户选项</p>
              </template>
            </e-toolbar-more>
          </template>
        </e-toolbar>
      </e-header>
      <!-- 正文区域 -->
      <e-container ref="tableStickyContainerRef">
        <div ref="toolbarTopRef"></div>
        <e-container>
          <!-- 左侧树 -->
          <e-left>
            <e-tree
              height="100%"
              v-model:expanded-keys="model.ouTree.expandedKeys"
              :data="model.ouTree.data"
              show-filter
              :load-more="model.ouTree.loadMore"
              :filter-method="model.ouTree.filterMethod"
              :field-names="model.ouTree.fieldNames"
              @select="onOuNodeClick"
            />
          </e-left>
          <!-- 右侧内容 -->
          <e-main>
            <e-content>
              <data-grid
                ref="tableRef"
                :sticky-container="tableStickyContainerRef"
                :proxy="proxy"
                :model="model"
                :auto-height="autoHeight"
                show-selection-column
                v-model:selectedRowKeys="model.selectedRowKeys"
                :data="model.userList.data"
                :total="model.userList.total"
                :current="model.userList.current"
                :page-size="model.userList.pageSize"
                :columns="columnList"
                :loading="model.userList.loading"
                :id-field="model.userList.idField"
                @change="model.userList.change"
                @refresh="model.userList.refresh"
                config-panel-name="表格"
                config-id="datagrid"
                configurable
              >
                <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'zt'">
                    <e-tag :type="text === '启用' ? 'success' : 'danger'" effect="light" round>{{ text }}</e-tag>
                  </template>
                  <template v-else-if="column.dataIndex === 'jzqk'">
                    <e-button
                      link
                      @click="openSecond(record)"
                      :class="`jzqk ${text === '有兼职' ? 'issecond' : 'nosecond'}`"
                      >{{ text }}</e-button
                    >
                  </template>
                </template>
              </data-grid>
            </e-content>
          </e-main>
        </e-container>
      </e-container>
    </e-container>
    <!-- 固定在侧边 -->
    <div ref="toolbarRightRef"></div>
  </e-container>

  <e-dialog
    v-model="dialogVisible"
    :title="subDialogTitle"
    :content-padding="0"
    :width="dialogSize.width"
    :height="dialogSize.height"
  >
    <edit
      v-if="dialogVisible"
      :is-edit="!!curUserGuid"
      :user-guid="curUserGuid"
      @save="updateFrameUser"
      @cancel="dialogVisible = false"
    />
  </e-dialog>

  <e-dialog v-model="importDialogVisible" title="用户导入" :width="dialogSize.width" :height="dialogSize.height">
    <import v-if="importDialogVisible" @save="updateFrameUser" @cancel="importDialogVisible = false" />
  </e-dialog>

  <e-dialog destroy-on-close v-model="moveDialogVisible" title="移动用户" :width="400" :height="dialogSize.height">
    <move v-if="moveDialogVisible" @save="moveUserCallBack" @cancel="moveDialogVisible = false" />
  </e-dialog>

  <e-dialog v-model="stepDialogVisible" title="排序步长" :width="600" :height="400">
    <stepSize v-if="stepDialogVisible" @save="stepSizeCallBack" @cancel="stepDialogVisible = false" />
  </e-dialog>
</template>

<script setup>
  import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
  import { EMessage, EMessageBox } from '@epoint-fe/eui-components';
  import { model } from './list';
  import { DataGrid, Utils } from '@epframe/eui-core';

  import { Refresh, Setting, Sort, SortDown, SortUp } from '@epoint-fe/eui-icons';

  import Edit from './components/edit.vue';
  import Import from './components/import.vue';
  import Move from './components/selectou.vue';
  import StepSize from './components/selectstepsize.vue';

  const { getRightUrl, getUrlParams, request, createToolbarList } = Utils;

  // #region 计算属性
  // 页面配置
  const frameVariable = computed(() => model.global.pageConfig.framevariable ?? {});

  const autoHeight = ref(true);
  // 表格是否有选中行
  const isSelected = computed(() => model.selectedRowKeys.length);

  // 弹窗大小
  const dialogSize = computed(() => ({
    width: Math.min(window.innerWidth, 960),
    height: Math.min(window.innerHeight, 700)
  }));
  // #endregion 计算属性

  // #region 变量
  const isSub = getUrlParams('isSub');
  const { proxy } = getCurrentInstance();
  const tableRef = ref();
  const tableStickyContainerRef = ref(null);

  // toolbar 搜索
  const toolbarSearchRef = ref(null);
  const toolbarTopRef = ref(null);
  const toolbarRightRef = ref(null);

  const toolbarBtnsRef = ref(null);

  const toolbarBtnList = ref([
    {
      type: 'primary',
      onClick: async () => newRow(),
      content: '新增用户'
    },
    {
      control: 'buttonGroup',
      content: '导入导出',
      items: [
        {
          onClick: async () => openImport(),
          content: '导入'
        },
        {
          control: 'dataExport',
          grid: tableRef,
          fileName: '用户列表',
          exportAction: 'frameuserlist/export',
          getColumns: async () => {
            const columns = await request({
              url: '/frameuserlist/getExportModel'
            });
            return columns.data;
          },
          params: computed(() => {
            return {
              leftTreeNodeGuid: model.ouGuid
            };
          }),
          content: '导出'
        }
      ]
    },
    {
      onClick: async () => saveAll(),
      content: '保存'
    },
    {
      type: 'danger',
      plain: true,
      onClick: async () => deleteSelected(),
      disabled: () => !isSelected.value,
      content: '删除选定'
    },
    {
      type: 'primary',
      plain: true,
      onClick: async () => setUserEnable(),
      disabled: () => !isSelected.value,
      content: '启用/禁用'
    },
    {
      type: 'primary',
      plain: true,
      onClick: async () => moveUser(),
      disabled: () => !isSelected.value,
      content: '移动'
    },
    {
      type: 'primary',
      plain: true,
      onClick: async () => addStepSize(),
      disabled: () => !model.ouGuid,
      content: '调整排序步长'
    },
    {
      type: 'primary',
      plain: true,
      onClick: async () => moveUserRole(),
      disabled: () => !isSelected.value,
      content: '转移用户角色'
    },
    {
      type: 'primary',
      plain: true,
      onClick: async () => setUserSyncThirdParty(),
      disabled: () => !isSelected.value,
      content: '授权/取消同步第三方'
    }
  ]);

  const operationsList = ref([
    {
      label: '等于',
      type: 'input',
      value: 'EQ'
    },
    {
      label: '不等于',
      type: 'input',
      value: 'NQ'
    },
    {
      label: '等于空',
      type: 'none',
      value: 'EQBLANK'
    },
    {
      label: '不等于空',
      type: 'none',
      value: 'NQBLANK'
    },
    {
      label: '模糊匹配',
      type: 'input',
      value: 'LIKE'
    },
    {
      label: '模糊匹配（排除）',
      type: 'input',
      value: 'NOTLIKE'
    },
    {
      label: '以...开头',
      type: 'input',
      value: 'LEFTLIKE'
    },
    {
      label: '以...结尾',
      type: 'input',
      value: 'RIGHTLIKE'
    },
    {
      label: '包含',
      type: 'multiSelect',
      value: 'IN'
    },
    {
      label: '不包含',
      type: 'multiSelect',
      value: 'NOTIN'
    }
  ]);

  const searchList = ref([
    {
      label: '全部',
      field: 'searchField',
      type: 'mixSearch', // 复合搜索
      default: true,
      operation: 'EQ',
      operations: [
        {
          label: '等于',
          type: 'mixSearch',
          value: 'EQ'
        },
        {
          label: '不等于',
          type: 'mixSearch',
          value: 'NQ'
        },
        {
          label: '模糊匹配',
          type: 'mixSearch',
          value: 'LIKE'
        },
        {
          label: '模糊匹配（排除）',
          type: 'mixSearch',
          value: 'NOTLIKE'
        }
      ],
      data: [
        { label: '姓名', value: 'name' },
        { label: '所属部门', value: 'department' },
        { label: '电话', value: 'phone' }
      ]
    },

    {
      label: '用户名',
      field: 'displayname',
      default: true,
      type: 'input',
      operation: 'LIKE',
      operations: ['EQ', 'LIKE', 'NQBLANK']
    },
    {
      label: '用户登录名',
      field: 'loginid',
      type: 'input',
      default: true,
      operation: 'EQ',
      operations: operationsList.value
    },
    {
      label: '状态',
      field: 'isenabled',
      type: 'select',
      default: false,
      operation: 'EQ',
      operations: operationsList.value,
      data: [
        {
          label: '启用',
          value: '1'
        },
        {
          label: '禁用',
          value: '0'
        }
      ]
    }
  ]);

  // const searchMap = createToolbarList({
  //   list: searchList.value,
  //   params: model.searchParams
  // })

  // 表格相关
  const curUserGuid = ref();
  const operateItems = computed(() =>
    frameVariable.value['soa.enableSOA']
      ? {}
      : {
          dataIndex: 'action',
          title: '操作',
          width: 240,
          key: 'action',
          hidden: false,
          action: {
            asText: true,
            items: [
              {
                icon: 'Edit',
                label: '编辑',
                onClick: (row) => {
                  editRow(row);
                }
              },
              {
                icon: 'CopyDocument',
                label: '复制',
                onClick: (row) => {
                  copyRow(row);
                }
              },
              {
                icon: 'Refresh',
                label: '初始化密码',
                onClick: (row) => {
                  rePassword(row);
                }
              },
              {
                icon: 'Setting',
                label: 'USB设置',
                onClick: (row) => {
                  keySet(row);
                }
              },
              {
                icon: 'MessageBox',
                label: '模块订阅',
                onClick: (row) => {
                  selectModule(row);
                }
              },
              {
                icon: 'Setting',
                label: '配置角色',
                onClick: (row) => {
                  selectRole(row);
                }
              },
              {
                icon: 'ChatDotRound',
                label: '复制用户角色模块关系',
                onClick: (row) => {
                  copyRight(row);
                }
              }
            ]
          }
        }
  );
  const displayNameItems = computed(() =>
    frameVariable.value['soa.enableSOA']
      ? {
          dataIndex: 'displayname',
          title: '用户姓名',
          hidden: false,
          width: 150
        }
      : {
          dataIndex: 'displayname',
          title: '用户姓名',
          width: 150,
          hidden: false,
          editor: {
            type: 'e-input',
            props: {
              maxlength: 50
            }
          }
        }
  );
  const orderItems = computed(() =>
    frameVariable.value['soa.enableSOA']
      ? {
          dataIndex: 'ordernumber',
          title: '排序',
          width: 100,
          hidden: false,
          sorter: true
        }
      : {
          dataIndex: 'ordernumber',
          title: '排序',
          width: 100,
          hidden: false,
          sorter: true,
          editor: { type: 'e-input-number', props: { min: 0, max: 99999999 } }
        }
  );
  const columnList = ref([
    displayNameItems.value,
    {
      dataIndex: 'loginid',
      title: '用户登录名',
      width: 150,
      hidden: false,
      resizable: true
    },
    {
      dataIndex: 'ouname',
      title: '所在部门',
      ellipsis: true,
      hidden: false
    },
    {
      dataIndex: 'framemj',
      title: '涉密等级',
      ellipsis: true,
      hidden: false,
      width: 100
    },
    {
      dataIndex: 'jzqk',
      title: '兼职',
      ellipsis: true,
      hidden: false,
      width: 80
    },
    { dataIndex: 'zt', title: '状态', width: 100, hidden: false },
    orderItems.value,
    operateItems.value
  ]);

  // 弹窗
  const dialogVisible = ref(false);
  const importDialogVisible = ref(false);
  const moveDialogVisible = ref(false);
  const stepDialogVisible = ref(false);
  const subDialogTitle = ref('修改用户');
  const isCopy = ref(false);

  // #endregion 变量

  // #region 监听
  // 监听页面配置数据变化
  watch(frameVariable, (newVal) => {
    logger.info('framevariable change：', newVal);
  });
  // #endregion 监听

  // #region 方法、事件
  /**
   * 左侧树部门点击方法 <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button> <Button type="primary" @click="applyPreview">应用</Button>
   * @param selectedKeys
   */
  const onOuNodeClick = (selectedKeys) => {
    const key = selectedKeys[0];
    model.ouGuid = key === 'f9root' ? '' : key;
  };
  /**
   * 新增用户
   */
  const newRow = () => {
    curUserGuid.value = '';
    dialogVisible.value = true;
    isCopy.value = false;
    subDialogTitle.value = '新增用户';
  };
  /**
   * 复制用户
   * @param row
   */
  const copyRow = (row) => {
    curUserGuid.value = row.userguid;
    isCopy.value = true;
    subDialogTitle.value = '复制用户';
    dialogVisible.value = true;
  };
  /**
   * 编辑行
   * @param row 行数据
   */
  const editRow = (row) => {
    curUserGuid.value = row.userguid;
    dialogVisible.value = true;
    isCopy.value = false;
    subDialogTitle.value = '修改用户';
  };

  /**
   * 兼职设定
   */
  const openSecond = (row) => {
    const url = getRightUrl(`framemanager/orga/orga/user/framesecondoulist?userGuid=${row.userguid}&isSub=${isSub}`);
    const handler = proxy?.$dialog({
      title: '用户兼职设定',
      url,
      width: 950,
      height: 550
    });
  };
  /**
   * 初始化密码
   * @param selected
   */
  const rePassword = async (selected) => {
    await model.methods.rePassword(selected);
    refreshTable();
  };
  /**
   * USB设置
   */
  const keySet = async (row) => {
    if (row.iscopy === 1) {
      EMessageBox.alert('关联账号不允许这么操作', '提示', { type: 'warning' });
    } else {
      const url = getRightUrl(`framemanager/orga/orga/user/usbkeyset?userGuid=${row.userguid}&isSub=${isSub}`);
      const handler = proxy?.$dialog({
        title: 'USB 设置',
        url,
        width: 950,
        height: 550
      });
    }
  };

  /**
   * 模块订阅
   * @param row
   */
  const selectModule = async (row) => {
    let tUrl = `framemanager/orga/uiset/menu/module/subscribemodule/subscribemoduletree?userGuid=${row.userguid}`;
    if (isSub && isSub == '1') {
      tUrl = `framemanager/orga/uiset/menu/module/sub/subsubscribemoduletree?userGuid=${row.userguid}`;
    }
    const url = getRightUrl(tUrl);
    const handler = proxy?.$dialog({
      title: '订阅模块',
      url,
      width: 1000,
      height: 800
    });
  };

  /**
   * 配置角色
   * @param row
   */
  const selectRole = async (row) => {
    const url = getRightUrl(`framemanager/orga/orga/user/settinguserrole?userGuid=${row.userguid}&isSub=${isSub}`);
    const handler = proxy?.$dialog({
      title: '设置用户角色关系',
      url,
      width: 710,
      height: 490,
      closeCallback: (params) => {
        if (params !== 'close' && params !== '') {
          refreshTable();
        }
      }
    });
  };

  /**
   * 复制用户角色模块关系
   * @param row
   */
  const copyRight = async (row) => {
    const url = getRightUrl(
      `framemanager/orga/orga/user/frameuserroleandmodulecopylist?isSub=${isSub}&userGuid=${row.userguid}`
    );
    const handler = proxy?.$dialog({
      title: '复制用户角色模块权限',
      url,
      width: 1250,
      height: 580,
      closeCallback: (params) => {
        if (params !== 'close' && params !== '') {
          refreshTable();
        }
      }
    });
  };

  /**
   * 刷新表格
   */
  const refreshTable = () => {
    tableRef.value && tableRef.value.refresh();
    // model.userList.refresh();
  };

  /**
   * 获取表格修改的数据
   */
  const getModifiedData = () => {
    return tableRef.value && tableRef.value.getModifiedData();
  };

  /**
   * 保存所有修改
   */
  const saveAll = async () => {
    const modifiedData = getModifiedData();
    await model.methods.saveAll(modifiedData);
    refreshTable();
  };
  /**
   * 删除选中行
   */
  const deleteSelected = (selected) => {
    EMessageBox.confirm('数据删除后不可恢复', '删除提醒', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await model.methods.deleteSelected(selected);
      refreshTable();
    });
  };

  /**
   * 启用/禁用
   * @param selected
   */
  const setUserEnable = async (selected) => {
    await model.methods.setUserEnable(selected);
    refreshTable();
  };

  /**
   * 授权/取消同步第三方
   */
  const setUserSyncThirdParty = async (selected) => {
    await model.methods.setUserSyncThirdParty(selected);
    refreshTable();
  };
  /**
   * 调整排序步长
   */
  const addStepSize = async () => {
    curUserGuid.value = model.selectedRowKeys;
    stepDialogVisible.value = true;
  };

  /**
   * 打开导入弹窗
   */
  const openImport = () => {
    curUserGuid.value = '';
    importDialogVisible.value = true;
  };
  /**
   * 搜索条件变化
   * @param params 搜索条件
   */
  const onAdvanceSearch = (params) => {
    logger.info('onAdvanceSearch');
    logger.info(params);
    model.searchParams.update(params);
  };
  /**
   * 编辑弹窗的保存
   */
  const updateFrameUser = () => {
    refreshTable();
    dialogVisible.value = false;
    importDialogVisible.value = false;
  };
  /**
   * 刷新页面
   */
  const refreshTab = () => {
    window.__E_VUE_APP__?.TabsNav ? window.__E_VUE_APP__.TabsNav.refreshTabContent() : window.location.reload();
  };
  /**
   * 移动用户
   */
  const moveUser = async () => {
    curUserGuid.value = model.selectedRowKeys;
    moveDialogVisible.value = true;
  };
  const moveUserCallBack = () => {
    refreshTable();
    moveDialogVisible.value = false;
  };
  /**
   * 转移用户角色
   */
  const moveUserRole = async () => {
    if (model.selectedRowKeys.length > 1) {
      EMessage.warning('请勿选择多条记录！');
      return;
    }
    const url = getRightUrl(
      `framemanager/orga/orga/role/userroleselect?userGuid=${model.selectedRowKeys}&isSub=${isSub}`
    );
    proxy?.$dialog({
      title: '设置用户角色关系',
      url,
      width: 710,
      height: 490,
      closeCallback: (params) => {
        if (params !== 'close' && params !== '') {
          refreshTable();
        }
      }
    });
  };

  const stepSizeCallBack = (stepSize) => {
    model.methods.addStepSize(stepSize);
    refreshTable();
    stepDialogVisible.value = false;
  };
  // #endregion 方法、事件

  // #region 生命周期
  onMounted(() => {
    model.methods.initData(proxy);
  });

  model.methods.registerHook('onAfterInitData', (state) => {
    logger.info('onAfterInitData:', state);
  });
  // #endregion 生命周期
</script>

<style lang="less" scoped>
  .zt-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 12px;

    &.success {
      background-color: var(--e-color-success);
    }

    &.error {
      background-color: var(--e-color-error);
    }
  }
  .jzqk {
    &.issecond {
      color: #e03f3f !important;
    }
    &.nosecond {
      color: #000000 !important;
    }
  }
  .page-type-select {
    margin-left: 8px;
  }
</style>
```

</details>

## e-toolbar-title 组件用法：

### 方式一

直接写 title，适用大多数场景

```html
<e-toolbar-title title="用户列表-toolbar"></e-toolbar-title>
```

### 方式二

使用插槽，自定义 title 内容

```html
<e-toolbar-title><h1>个性化标题</h1></e-toolbar-title>
```

![](http://192.168.219.170/docs/vue/latest/frame/_astro/toolbar-title.2T5po-eY_Z2dfLPu.webp)

![](http://192.168.219.170/docs/vue/latest/frame/_astro/toolbar-title-code.BTLdG-Ez_ZzKNfj.webp)

## e-toolbar-btns 用法

```html
<e-toolbar-btns :items="toolbarBtnList" :max-display-count="4" configurable config-id="toolbar-btns"></e-toolbar-btns>
```

**说明**

- max-display-count ：默认显示按钮的数量

- configurable 和 config-id ：页面偏好面板的属性

- items：按钮列表，具体格式见下方

```javascript
const newRow = () => {
  // 点击按钮事件
};

const toolbarBtnList = ref([
  {
    type: 'primary',
    onClick: async () => newRow(),
    content: '新增用户'
  },
  {
    type: 'primary',
    control: 'buttonGroup',
    onClick: () => {
      logger.info('新增模块');
    },
    options: [
      {
        content: '普通模块',
        onClick: () => {
          logger.info('普通模块');
        }
      },
      {
        content: 'vue模块',
        onClick: () => {
          logger.info('vue模块');
        }
      },
      {
        content: '应用模块',
        onClick: () => {
          logger.info('应用模块');
        }
      }
    ]
  },
  {
    type: 'primary',
    plain: true,
    onClick: async () => saveAll(),
    content: '保存'
  },
  {
    type: 'danger',
    plain: true,
    onClick: async () => deleteSelected(),
    disabled: () => !isSelected.value,
    content: '删除选定'
  }
]);
```

### 按钮类型

1.  普通类型

```javascript
const toolbarBtn = {
  type: 'primary', // 类型对应eui文档中按钮的 type 枚举值
  onClick: () => {},
  disabled: () => !isSelected.value, // 可不写，看业务情况
  content: '新增用户'
};
```

![](http://192.168.219.170/docs/vue/latest/frame/_astro/btn-1.CowkvqOc_2rNxyd.webp)

2. 按钮组

```javascript
const toolbarBtn = {
  control: 'buttonGroup',
  type: 'primary',
  items: [
    {
      content: '普通模块',
      onClick: () => {
        logger.info('普通模块');
      }
    },
    {
      content: 'vue模块',
      onClick: () => {
        logger.info('vue模块');
      }
    },
    {
      content: '应用模块',
      onClick: () => {
        logger.info('应用模块');
      }
    }
  ]
};
```

![](http://192.168.219.170/docs/vue/latest/frame/_astro/btn-2.kbZvPtKV_ZT9TNC.webp)

3. 下拉按钮组

```javascript
const toolbarBtn = {
  control: 'dropdown',
  type: 'primary',
  onClick: () => {
    logger.info('新增模块');
  },
  content: '新增模块',
  splitButton: true,
  items: [
    {
      content: '普通模块',
      onClick: () => {
        logger.info('普通模块');
      }
    },
    {
      content: 'vue模块',
      onClick: () => {
        logger.info('vue模块');
      }
    },
    {
      content: '应用模块',
      onClick: () => {
        logger.info('应用模块');
      }
    }
  ]
};
```

`splitButton` 为 true 时：新增模块按钮本身可以点击，有点击事件

![](http://192.168.219.170/docs/vue/latest/frame/_astro/btn-3.4oAJTXE6_104PsY.webp)

`splitButton` 为 false 时：新增模块按钮本身不可以点击，无点击事件

![](http://192.168.219.170/docs/vue/latest/frame/_astro/btn-4.BT8eCI1d_71qOi.webp)

**注意**：`dropdown` 类型的按钮在 更多中展示的时候，不管 `splitButton` 是什么值，本身是都无法点击的

![](http://192.168.219.170/docs/vue/latest/frame/_astro/btn-5.Bxj8PEwj_2uymqv.webp)

## e-toolbar-more 用法

简单写法

![](http://192.168.219.170/docs/vue/latest/frame/_astro/toolbar-more-1.BXGNPgir_1ahbQM.webp)

```html
<template #actions>
  <e-toolbar-more
    :table-ref="tableRef"
    :model="model"
    :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'"
  />
</template>
```

个性化写法，支持自定义按钮（按钮的事件需要自己去绑定）和帮助的 tip 内容

![](http://192.168.219.170/docs/vue/latest/frame/_astro/toolbar-more.Dics8EYI_Z1DDOyp.webp)

```html
<template #actions>
  <e-toolbar-more
    :table-ref="tableRef"
    :model="model"
    :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'"
  >
    <template #new-items>
      <e-dropdown-item>
        <div>test</div>
      </e-dropdown-item>
    </template>
    <template #tip-content>
      <p>通过'导出'按钮导出的组织架构数据无法通过'模板化导入按钮'导入, 请使用'模板化导出'按钮导出后再导入;</p>
      <p>拖拽排序功能只支持部门内操作,需要打开搜索框勾选直属用户选项</p>
    </template>
  </e-toolbar-more>
</template>
```

## e-toolbar-search 用法

### 属性

| 属性                       | 说明                                              | 默认值                                     |
| -------------------------- | ------------------------------------------------- | ------------------------------------------ |
| filterAdvancedFixed        | 默认固定位置：popover、top、side                  | popover                                    |
| site-top                   | 固定在顶部时需要的容器 dom 对象                   |                                            |
| site-side                  | 固定在侧边时需要的容器 dom 对象                   |                                            |
| is-open                    | 超载时是否展开，必传                              | 自动判断的，组件需要，故需要传，不需要手写 |
| search-list                | 页面业务需要的搜索字段                            | 必传，用户自己写                           |
| filter-plan-list           | 查询按钮下方的类型，可设置默认值 default          | 默认值见下方说明                           |
| filter-advanced-fixed-list | 高级搜索框支持的所在位置列表                      | 默认值见下方说明                           |
| configurable               | 页面偏好面板需要的属性                            |                                            |
| configId                   | 页面偏好面板需要的属性                            |                                            |
| configPanelName            | 页面偏好面板需要的属性                            |                                            |
| configUrl                  | toolbar 中接口所依赖的页面主接口,比如表格数据接口 |                                            |

**默认值说明**

- filter-plan-list

```json
[
  {
    "label": "符合所有条件",
    "value": "and"
  },
  {
    "label": "符合任意条件",
    "value": "or",
    "default": true
  }
]
```

- filter-advanced-fixed-list

`icon` 的值需要自己从图标库引入

```json
[
      {
        name: "悬浮窗口",
        value: "popover",
        icon: ViewPopoverBold
      },
      {
        name: "固定在顶部",
        value: "top",
        icon: ViewTopBold
      },
      {
        name: "固定在侧边",
        value: "side",
        icon: ViewRightBold
      }
    ]
```

### 事件

| 属性                | 说明                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| advance-search      | 搜索事件                                                                                              |
| advance-site-change | 高级面板所在位置变化事件, 值为 `filter-advanced-fixed-list` 中对应的 value 值，当关闭时，值为 `close` |

### searchList 属性说明

| 属性         | 说明                                                                                                                                    | 类型    | 默认值             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------ |
| label        | 显示的名称                                                                                                                              | string  |                    |
| field        | 字段名                                                                                                                                  | string  |                    |
| fieldType    | 字段名对应的类型，存在 `string`、`number`、`date` 这三种                                                                                | string  |                    |
| dataType     | 数据类型，目前支持 'default','select','tree'，表示字符串，下拉选项，树形数据源。**下拉选项和树数据源必须需要**有 url 属性或者 data 属性 | string  | 不填默认为 default |
| type         | 组件类型，目前支持的组件类型见下方表格                                                                                                  | string  |                    |
| default      | 是否默认显示到页面顶部                                                                                                                  | boolean |                    |
| operation    | 查询条件，目前支持的查询条件见下方 operations 说明                                                                                      | string  |                    |
| operations   | 条件列表，目前支持的条件列表见下方 operations 说明                                                                                      | array   |                    |
| data         | 组件数据，比如下拉框的选项                                                                                                              | array   |                    |
| url          | 代码项接口，比如性别，需要后端开发配置                                                                                                  | string  |                    |
| labelField   | 代码项接口返回的名称字段名，比如 text                                                                                                   | string  |                    |
| valueField   | 代码项接口返回的值字段名，比如 id                                                                                                       | string  |                    |
| searchParams | 代码项接口的请求参数，比如 `{lazy: true, labelField: 'text'}`                                                                           | object  |                    |
| \_config     | 其他配置，表单设计器中可以配置的其他参数，比如：`{ format: 'YYYY-MM-DD' }`，在个性化组件时可能会用到                                    | object  |                    |

**注意**： `type` 目前支持的组件类型见下方表格，`operations` 目前支持的条件需要联系后端同事，`data` 目前支持的组件数据默
认为：

```js
[
  {
    label: 'xxx',
    value: 'xxx'
  }
];
```

### searchList 中 type 目前支持的组件值

**注意**： 上方示例 `searchList` 中的 `personnel` 为测试数据，暂不可用。

| 支持的组件类型  | 说明         | 效果图                          |
| --------------- | ------------ | ------------------------------- |
| input           | 输入框       | ![](http://192.168.219.170/docs/vue/latest/frame/_astro/type-1.DPqA-YzU_1x3qkP.webp) |
| select          | 单选下拉框   | ![](http://192.168.219.170/docs/vue/latest/frame/_astro/type-2.v9cG6xiI_pn69u.webp) |
| multiSelect     | 多选下拉框   | ![](http://192.168.219.170/docs/vue/latest/frame/_astro/type-3.HmrQlbZK_Z1J0r3.webp) |
| datePicker      | 单个日期选择 | ![](http://192.168.219.170/docs/vue/latest/frame/_astro/type-4.CuG5jwTO_a1bSY.webp) |
| rangeDatePicker | 日期范围选择 | ![](http://192.168.219.170/docs/vue/latest/frame/_astro/type-5.ChGfFlY3_ZGqNdp.webp) |
| rangeNumber     | 数值范围     | ![](http://192.168.219.170/docs/vue/latest/frame/_astro/type-6.Bb2yPnSO_gRcBL.webp) |

### operations 说明

支持写法：

1. 不写，直接使用 fieldType

该方案会找到 string 对应的操作符类型，见 [关系表对应表](https://www.processon.com/v/689ee510c236d24a69d63bed)

现有的类型有 `string`、`number`、`date`

```json
{
  "fieldType": "string"
}
```

2. 简写

需要手动配置时，可以只写操作符类型，比如：

```json
{
  "operations": ["EQ", "NQ", "IN", "NOTIN"]
}
```

3. 完整写法

对象数组，对象里可以写文档上方【searchList 属性说明】 中除 `_config` 的所有属性，比如：url、searchParams、type 等。

```json
{
  "operations": [
    {
      "label": "等于",
      "value": "EQ"
    },
    {
      "label": "不等于",
      "value": "NQ"
    },
    {
      "label": "包含",
      "value": "IN"
    },
    {
      "label": "不包含",
      "value": "NOTIN"
    }
  ]
}
```

目前后端支持的类型如下表格：

**类型**根据实际情况选择，也就是上面的 【searchList 中 type 目前支持的组件值】类型是可用的，目前 input-number 类型还不支
持。

| 标签             | 类型         | 值        |
| ---------------- | ------------ | --------- |
| 等于             | input        | EQ        |
| 等于             | input-number | EQ        |
| 不等于           | input        | NQ        |
| 不等于           | input-number | NQ        |
| 等于 null        | none         | EQNULL    |
| 等于空           | none         | EQBLANK   |
| 不等于 null      | none         | NQNULL    |
| 不等于空         | none         | NQBLANK   |
| 模糊匹配         | input        | LIKE      |
| 模糊匹配（排除） | input        | NOTLIKE   |
| 以...开头        | input        | LEFTLIKE  |
| 以...结尾        | input        | RIGHTLIKE |
| 包含             | multiSelect  | IN        |
| 不包含           | multiSelect  | NOTIN     |
| 介于             | rangeNumber  | BTW       |
| 不介于           | rangeNumber  | NOTBTW    |
| 大于             | input-number | GT        |
| 大于等于         | input-number | GE        |
| 小于             | input-number | LT        |
| 小于等于         | input-number | LE        |

## 组件扩展

如果内置的组件类型不满足需求，可以自己扩展组件，但是需要注意以下几点：

- 组件文件名多个单词时驼峰命名，比如 rangeDatePicker，文件名为 RangeDatePicker.vue

- 新增组件名不和已有的组件名重复

- 项目中新增的组件类型，需要在 **添加条件** 中新增使用的话，需要联系后端开发配置，比如新增 `ou` 部门选择组件类型，需要后
  端开发配置 `ou` 这个类型。

### 示例：

比如新增一个 ou 部门组件：

#### 第一步

新增组件文件 `ou.vue`，可以在项目的 `src/components/type-service` 目录（没有这个目录就新建一个）下新建组件，内容如下：

```vue
<template>
  <e-button-edit
    v-model="ouValue"
    v-model:text="ouText"
    clearable
    popup-url="http://192.168.219.170/fetc/"
    @close="onButtonEditClose"
  />
</template>

<script setup>
// 状态
import { ref, watch, onMounted } from 'vue';
import { EButtonEdit, Hooks } from '@epframe/eui-core';
const emit = defineEmits(['update:value', 'update:text']);

const { useToolbarService } = Hooks;

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  value: {
    type: [Object],
    default: () => ({
      value: '',
      text: ''
    })
  },
  url: {
    type: String,
    default: ''
  },
  params: {
    type: Object,
    default: () => {}
  }
});

const ouValue = ref('');
const ouText = ref('');

// 监听父组件传入的value变化
watch(
  () => props.value,
  (newVal) => {
    if (Array.isArray(newVal)) {
      ouValue.value = newVal.value || '';
      ouText.value = newVal.text || '';
    } else {
      // 如果value不是数组，重置为空
      ouValue.value = '';
      ouText.value = '';
    }
  },
  { immediate: true }
);

const { val, handleValueChange } = useToolbarService(props, emit);

const onButtonEditClose = (e) => {
  const dialogData = e.params.split(';');
  const data = {
    text: dialogData[0],
    value: dialogData[1]
  };

  handleValueChange(data);
};

onMounted(() => {
  ouValue.value = props.value.value || '';
  ouText.value = props.value.text || '';
  val.value = [ouValue.value, ouText.value];
});
</script>

<style lang="scss" scoped></style>
```

**注意：**

- **popup-url**: 弹出框的地址，根据实际情况修改

- 在 `useToolbarService` 中做了一部分处理，可以不使用自行处理，该文件代码如下：

```js
import { ref, watch, onMounted } from 'vue';
import { Utils } from '@epframe/eui-core';

const { action2restAxios } = Utils;

interface RemoteMethodParams {
  url: string;
  params: Record<string, unknown>;
}

export function useToolbarService(props: { value: unknown }, emit: (event: string, value: unknown) => void) {
  // 值状态
  const val = ref(props.value);
  // 文本状态
  const text = ref('');

  // 监听父组件传递的 value 变化
  watch(
    () => props.value,
    (newVal) => {
      if (newVal !== val.value) {
        val.value = newVal;
      }
    }
  );

  // 初始化触发更新
  onMounted(() => {
    emit('update:value', val.value);
    emit('update:text', text.value);
  });

  // 值变化处理
  const handleValueChange = (newVal: unknown) => {
    emit('update:value', newVal);
    emit('update:text', text.value);
  };

  const getData = ({ url, params }: RemoteMethodParams) => {
    return action2restAxios({
      url,
      data: params || {}
    });
  };

  return {
    val,
    text,
    handleValueChange,
    getData
  };
}
```

#### 第二步

使用组件，在需要配置这个 `ou` 部门选择的地方，配置如下：

```js
import { Hooks } from '@epframe/eui-core';
import ou from '@/components/type-service/ou.vue';

const { extendServiceType } = Hooks;

extendServiceType({ ou });

const searchList = ref([
  {
    label: '部门',
    field: 'ouGuid',
    type: 'ou',
    default: true,
    operation: 'EQ',
    operations: [
      {
        label: '等于',
        value: 'EQ'
      },
      {
        label: '不等于',
        value: 'NQ'
      },
      {
        label: '包含',
        value: 'IN'
      },
      {
        label: '不包含',
        value: 'NOTIN'
      }
    ]
  }
]);
```

## 其他

### 默认查询条件

默认查询条件是指，页面打开时，默认展示的查询条件，比如默认展示 `状态` 等于 `启用` 的数据。

#### 第一步

需要在数据模型的查询条件对象中配置默认条件，实际情况可能不是这个变量，这里以这个为例。

```js
const searchParams = ref([
  {
    path: 'displayname',
    type: 'LIKE',
    value: '毛'
  },
  {
    path: 'sex',
    type: 'EQ',
    value: ['男', '女'],
    label: ['男', '女']
  }
]);
```

**注意：**

`searchList` 中 `type` 为 `multiSelect`、`rangeDatePicker`、`rangeNumber` 时，值是数组

#### 第二步

【eui-core 的 1.2.18 之后的版本】 使用该方案：

`e-toolbar-search` 组件新增了 `conditions` 属性，可以直接传入默认查询条件，如下：

```vue
<template>
  <template #filter="{ opened }">
    <e-toolbar-search
      ref="toolbarSearchRef"
      :site-top="toolbarTopRef"
      :site-side="toolbarRightRef"
      :search-list="searchList"
      :conditions="model.searchParams"
      :is-open="opened"
      @advance-search="onAdvanceSearch"
      configurable
      config-id="toolbar-search"
      config-url="/rest/frameuserlist/getUserPageResult"
    />
  </template>
</template>

<script setup>
import { model } from './list';

const searchList = ref([
  // 原先的配置
]);
</script>
```

---

【eui-core 的 1.2.18 及之前的版本】 使用该方案：

原先的 `searchList` 作为参数传入 `createToolbarList` 方法，如下：

```vue
<template>
  <template #filter="{ opened }">
    <e-toolbar-search
      ref="toolbarSearchRef"
      :site-top="toolbarTopRef"
      :site-side="toolbarRightRef"
      :search-list="toolbarSearchList"
      :is-open="opened"
      @advance-search="onAdvanceSearch"
      configurable
      config-id="toolbar-search"
      config-url="/rest/frameuserlist/getUserPageResult"
    />
  </template>
</template>

<script setup>
import { Utils } from '@epframe/eui-core';
import { model } from './list';

const { createToolbarList } = Utils;

const searchList = ref([
  // 原先的配置
]);

const toolbarSearchList = createToolbarList({ list: searchList.value, params: model.searchParams });
</script>
```