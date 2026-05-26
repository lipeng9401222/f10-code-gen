<template>
  <div class="p-xl">
    <e-button type="primary" @click="openComponentDialog"> 点击打开对话框 </e-button>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent, getCurrentInstance, h } from 'vue';

defineOptions({
  name: 'ListEdit'
});

const { proxy } = getCurrentInstance();

// 模拟弹窗带入业务所需的数据
const ouGuid = ref('');

// 打开对话框
const openComponentDialog = () => {
  // TODO: 非阻断组件BUG-打开弹框携带了is-modal
  proxy?.$dialog(
    {
      title: '列表弹窗',
      width: '35%',
      height: 500,
      contentPadding: false,
      closeCallback: (action) => {
        if (action !== 'close') {
          proxy?.$message(`关闭对话框, 回传值为${action}`);
        }
      }
    },
    () => {
      return h(
        defineAsyncComponent(() => import('@/views/demo/page/framework/dynamic/list-edit-dialog.vue')),
        {
          ouGuid: ouGuid.value
        }
      );
    }
  );
};

onMounted(() => {
  // 打开对话框
  openComponentDialog();
});
</script>
