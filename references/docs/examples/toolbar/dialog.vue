<template>
  <e-button @click="visible = true">打开对话框</e-button>

  <e-dialog ref="dialogRef" v-model="visible" :show-close="false" @open="openHandler">
    <template #header="{ onClose, onFullscreen, onCollapse }">
      <e-toolbar ref="toolbarRef" class="toolbar" title-own-line>
        <template #title>
          <e-text>这是弹窗标题</e-text>
        </template>
        <template #button>
          <e-button type="primary">Primary</e-button>
          <e-button type="success">Success</e-button>
        </template>
        <template #filter>
          <div class="section">搜索区域</div>
        </template>
        <template #actions>
          <e-button :icon="LayoutCardBold" text />
          <e-button :icon="LayoutTableBold" text />
          <e-button text :icon="MoreFilled" />
          <e-button text :icon="ArrowDown" @click="onCollapse" />
          <e-button text :icon="Crop" @click="onFullscreen" />
          <e-button text :icon="Close" @click="onClose" />
        </template>
      </e-toolbar>
    </template>
    这是对话框内容。
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ArrowDown, Close, Crop, LayoutCardBold, LayoutTableBold, MoreFilled } from '@epoint-fe/eui-icons';
const toolbarRef = ref();

const visible = ref(false);

function openHandler() {
  toolbarRef.value?.filterSizeRefresh();
}
</script>
<style lang="scss" scoped>
.toolbar {
  flex: 1;
  padding: 0;
}

.section {
  height: 32px;
  padding: 0 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
</style>
