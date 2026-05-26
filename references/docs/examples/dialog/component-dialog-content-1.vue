<template>
  <div style="padding: 20px">
    <e-button type="primary" :loading="saveLoading" @click="save">保存</e-button>
    <e-button :loading="submitLoading" @click="submit">提交</e-button>
    <e-button @click="changToEdit">切换到编辑</e-button>
    <e-button @click="closeDialog()">关闭当前弹窗</e-button>

    <div>
      <div>这是查看的dialog</div>
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
const getCurrentDialog = inject('getCurrentDialog');

const closeDialog = (action = 'close') => {
  console.log('🚀 ~ closeDialog ~ getCurrentDialog:', getCurrentDialog);

  if (getCurrentDialog) {
    getCurrentDialog().close(action || 'close');
  }
};
const saveLoading = ref(false);
const submitLoading = ref(false);
const save = () => {
  saveLoading.value = true;
  setTimeout(() => {
    console.log('Dialog 关闭并保存');
    closeDialog('save');
    saveLoading.value = false;
  }, 200);
};

const submit = () => {
  submitLoading.value = true;
  setTimeout(() => {
    console.log('Dialog 提交并保存');
    submitLoading.value = false;
    closeDialog('submit');
  }, 200);
};

const changToEdit = () => {
  // console.log('Dialog 切换到编辑状态');
  if (getCurrentDialog) {
    const dialog = getCurrentDialog();
    dialog.setTitle('编辑弹窗');
    dialog.updateContent(() => {
      return h(
        defineAsyncComponent(() => import('./component-dialog-content-2.vue')),
        {
          title: '这是从查看页面切换的',
          content: '这是从查看页面切换的',
        }
      );
    });
  }
};
</script>
