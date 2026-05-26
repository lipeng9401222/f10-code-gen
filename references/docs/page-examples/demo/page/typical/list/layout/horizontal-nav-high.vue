<template>
  <!-- TODO: 页面样例待优化: 页面嵌套了另一个list页面，不便于样式参考 -->
  <ep-layout-manager class="eui-page p-0" v-loading="model.global.state.loading" ref="layoutRef" :left-config="leftConfig">
    <template #left>
      <div class="eui-list-side-tree">
        <div class="tree-header">
          <div class="tree-title">导航</div>
          <e-dropdown>
            <e-button :icon="Setting" />
            <template #dropdown>
              <e-dropdown-menu>
                <e-dropdown-item><e-button :icon="AddRectangle" @click="handleAddRectangle" /></e-dropdown-item>
                <e-dropdown-item><e-button :icon="Edit" @click="handleEdit" /></e-dropdown-item>
              </e-dropdown-menu>
            </template>
          </e-dropdown>
        </div>

        <e-scrollbar class="tree-content">
          <e-tree ref="treeRef" v-model:selected-keys="selectGuid" :data="model.ouTree.data" show-filter filter-placeholder="搜索" @select="onOuNodeClick" />
        </e-scrollbar>
      </div>
    </template>
    <template #main>
      <div class="eui-main-section bg-transparent">
        <keep-alive>
          <component v-if="currentComponent" :key="componentKey" :is="currentComponent" :data="componentData" />
        </keep-alive>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, watch, computed, onMounted, onActivated } from 'vue';
import { EpLayoutManager, Utils, Hooks } from '@epframe/eui-core';
import { Setting, AddRectangle, Edit } from '@epoint-fe/eui-icons';

// 提前导入/注册需要动态渲染的组件
import Base from '../layout/base.vue';
import TreeGrid from '../content/tree-grid.vue';

defineOptions({
  name: 'HorizontalNavHigh'
});

const { useTreeModel } = Hooks;
const { PageConfig } = Utils;

// 页面配置模型
const pageConfig = new PageConfig({});

// 定义数据模型
const model = Utils.defineDataModel(() => {
  // 组织树模型
  const ouTree = useTreeModel('/showcase/f10-demo/componentree', {
    requestType: 'restful', // 请求类型
    lazy: false // 懒加载
  });

  return {
    global: { pageConfig }, // 全局模型
    models: {
      ouTree // 组织树模型
    }
  };
});

// 布局引用
const layoutRef = ref(null);
// 左侧导航配置
const leftConfig = {
  enabled: true,
  defaultWidth: '240px',
  minWidth: '180px',
  maxWidth: '480px',
  toggle: true,
  resize: true
};

// 添加矩形节点
const handleAddRectangle = () => {};

// 编辑节点
const handleEdit = () => {};

// 组织树引用
const treeRef = ref(null);
const selectGuid = ref(null); // 左侧树选中节点 id 数组

// 监听组织树数据变化
watch(
  () => model.ouTree.data,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      selectGuid.value = [model.ouTree.selectGuid ? model.ouTree.selectGuid : newVal[0].value];
      let node = newVal.find((item) => item.value === selectGuid.value[0]);
      getComponentData(node);
    }
  },
  {
    deep: true,
    immediate: true
  }
);
// 组织树节点点击事件
const onOuNodeClick = (nodeData) => {
  selectGuid.value = nodeData;
  let node = treeRef.value?.getNodes(selectGuid.value);
  getComponentData(node[0]);
};

// 当前动态组件名称
const componentMap = {
  Base: Base,
  TreeGrid: TreeGrid
};
// 传递给动态组件的数据
const componentData = ref(null);
// 当前动态组件实例
const currentComponent = ref(null);
// 组件 key，强制重新渲染
const componentKey = ref(0);

// 根据选中节点信息获取要渲染的组件和数据
const getComponentData = (node) => {
  // 获取当前选中节点信息
  if (node) {
    currentComponent.value = componentMap[node.component] || '';
    // 将选中节点信息传递给动态组件
    componentData.value = {
      isComponent: true,
      data: node
    };
    componentKey.value = node.value; // 使用节点 value 作为 key，确保每次选中不同节点时组件都会重新渲染
  }
};

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style lang="scss" scoped>
@use '../../../../../../assets/custom_common.scss';
</style>
