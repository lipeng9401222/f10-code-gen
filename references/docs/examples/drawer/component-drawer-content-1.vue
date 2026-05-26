<template>
  <div style="padding: 20px">
    <e-button type="primary" :loading="saveLoading" @click="save">保存</e-button>
    <e-button :loading="submitLoading" @click="submit">提交</e-button>
    <e-button @click="changToEdit">切换到编辑</e-button>
    <e-button @click="closeDrawer()">关闭当前抽屉</e-button>

    <div>
      <div>这是查看的抽屉</div>
      <div>外部传入属性 title:{{ props.title }}</div>
      <div>外部传入属性 content:{{ props.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, h, inject, ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});
const getCurrentDrawer = inject('getCurrentDrawer');

const closeDrawer = (action = 'close') => {
  console.log('🚀 ~ closeDrawer ~ getCurrentDrawer:', getCurrentDrawer);

  if (getCurrentDrawer) {
    getCurrentDrawer().close(action || 'close');
  }
};
const saveLoading = ref(false);
const submitLoading = ref(false);
const save = () => {
  saveLoading.value = true;
  setTimeout(() => {
    console.log('Drawer 关闭并保存');
    closeDrawer('save');
    saveLoading.value = false;
  }, 200);
};

const submit = () => {
  submitLoading.value = true;
  setTimeout(() => {
    console.log('Drawer 提交并保存');
    submitLoading.value = false;
    closeDrawer('submit');
  }, 200);
};

const changToEdit = () => {
  if (getCurrentDrawer) {
    const drawer = getCurrentDrawer();
    drawer.setTitle('编辑抽屉');
    drawer.updateContent(() => {
      return h(
        defineAsyncComponent(() => import('./component-drawer-content-2.vue')),
        {
          title: '这是从查看页面切换的',
          content: '这是从查看页面切换的',
        }
      );
    });
  }
};
</script>
