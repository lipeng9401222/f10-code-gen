<template>
  <div class="p-xl">
    <e-button type="primary" @click="openComponentDialog"> 点击打开对话框 </e-button>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent, getCurrentInstance, h } from 'vue';

defineOptions({
  name: 'FormEdit'
});

const { proxy } = getCurrentInstance();

// 模拟弹窗带入业务所需的数据
const ouGuid = ref('555');

// 打开对话框
const openComponentDialog = () => {
  proxy?.$dialog(
    {
      title: '表单弹窗',
      width: '35%',
      height: '70%',
      contentPadding: false,
      closeCallback: (action) => {
        if (action !== 'close') {
          proxy?.$message(`关闭对话框, 回传值为${action}`);
        }
      }
    },
    () => {
      return h(
        defineAsyncComponent(() => import('@/views/demo/page/typical/form/subform/form-edit-dialog.vue')),
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
