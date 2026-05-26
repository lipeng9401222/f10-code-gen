<template>
  <div class="eui-page">
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
  proxy?.$dialog(
    {
      title: '信息详情',
      width: 600,
      height: 460,
      contentPadding: false,
      closeCallback: (action) => {
        if (action !== 'close') {
          proxy?.$message(`关闭对话框, 回传值为${action}`);
        }
      }
    },
    () => {
      return h(
        defineAsyncComponent(() => import('@/views/demo/page/typical/form/subform/list-edit-dialog.vue')),
        {
          ouGuid: ouGuid.value
        }
      );
    }
  );
};

onMounted(() => {
  // 打开示例对话框
  openComponentDialog();
});
</script>

<style scoped lang="scss"></style>
