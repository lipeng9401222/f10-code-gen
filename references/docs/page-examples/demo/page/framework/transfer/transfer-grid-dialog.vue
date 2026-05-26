<template>
  <div class="dialog">
    <e-button type="primary" @click="openComponentDialog"> 点击打开对话框 </e-button>
  </div>
</template>

<script setup>
defineOptions({
  name: 'TransferGridDialog'
});
import { ref, onMounted, defineAsyncComponent, getCurrentInstance, h } from 'vue';

const { proxy } = getCurrentInstance();

// 模拟弹窗带入业务所需的数据
const curRowGuid = ref('111');

// 打开对话框
const openComponentDialog = () => {
  proxy?.$dialog(
    {
      title: '数据选择',
      width: 1200,
      height: 854,
      contentPadding: false,
      closeCallback: (action) => {
        proxy?.$message(`关闭对话框, 回传值为${action}`);
      }
    },
    () => {
      return h(
        defineAsyncComponent(() => import('@/views/demo/page/framework/transfer/transfer-grid.vue')),
        {
          rowGuid: curRowGuid.value
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

