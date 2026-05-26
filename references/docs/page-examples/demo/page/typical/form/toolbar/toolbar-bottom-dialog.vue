<template>
  <div class="dialog">
    <e-button type="primary" @click="openComponentDialog"> 点击打开对话框 </e-button>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent, getCurrentInstance, h } from 'vue';

defineOptions({
  name: 'ToolbarBottomDialog'
});

const { proxy } = getCurrentInstance();

// 模拟弹窗带入业务所需的数据
const curRowGuid = ref('111');

// 打开对话框
const openComponentDialog = () => {
  proxy?.$dialog(
    {
      title: '发起申请',
      width: 700,
      height: 700,
      contentPadding: false,
      closeCallback: (action) => {
        proxy?.$message(`关闭对话框, 回传值为${action}`);
      }
    },
    () => {
      return h(
        defineAsyncComponent(() => import('@/views/demo/page/typical/form/toolbar/toolbar-bottom.vue')),
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
