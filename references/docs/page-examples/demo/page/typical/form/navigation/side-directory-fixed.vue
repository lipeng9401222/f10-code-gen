<template>
  <div class="dialog">
    <e-button type="primary" @click="openModal">打开全屏弹窗</e-button>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, getCurrentInstance, h } from 'vue';
import { SystemMessages } from '@epoint-fe/eui-icons';

// 定宽页面
defineOptions({
  name: 'SideDirectoryFixed'
});

const { proxy } = getCurrentInstance();

const openModal = () => {
  proxy?.$modal(
    {
      title: '新增系统公告',
      backText: '返回',
      icon: SystemMessages,
      iconBgColor: '#885ae0',
      contentPadding: 0,
      closeCallback: (action) => {
        if (action === 'submit' || action === 'save') {
          // 其他处理逻辑。。。
        }
      }
    },
    () => {
      return h(
        defineAsyncComponent(() => import('@/views/demo/page/typical/form/navigation/side-directory-page.vue')),
        {
          showBottom: true
        }
      );
    }
  );
};

onMounted(() => {
  // 打开全屏弹窗
  openModal();
});
</script>
