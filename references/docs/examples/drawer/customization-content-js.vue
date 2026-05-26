<template>
  <e-button text @click="table = true">Open Drawer with nested table</e-button>
  <e-button text @click="dialog = true">Open Drawer with nested form</e-button>
  <e-drawer v-model="table" title="I have a nested table inside!" direction="rtl" size="50%">
    <e-table :data-source="gridData">
      <e-table-column data-index="date" title="日期" width="150" />
      <e-table-column data-index="name" title="姓名" width="200" />
      <e-table-column data-index="address" title="地址" />
    </e-table>
  </e-drawer>

  <e-drawer
    ref="drawerRef"
    v-model="dialog"
    title="I have a nested form inside!"
    :before-close="handleClose"
    direction="ltr"
    class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <e-form :model="form">
        <e-form-item label="Name" :label-width="formLabelWidth">
          <e-input v-model="form.name" autocomplete="off" />
        </e-form-item>
        <e-form-item label="Area" :label-width="formLabelWidth">
          <e-select v-model="form.region" placeholder="Please select activity area">
            <e-option label="Area1" value="shanghai" />
            <e-option label="Area2" value="beijing" />
          </e-select>
        </e-form-item>
      </e-form>
      <div class="demo-drawer__footer">
        <e-button @click="cancelForm">Cancel</e-button>
        <e-button type="primary" :loading="loading" @click="onClick">{{
          loading ? 'Submitting ...' : 'Submit'
        }}</e-button>
      </div>
    </div>
  </e-drawer>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { EDrawer, EMessageBox } from '@epoint-fe/eui-components';

const formLabelWidth = '80px';
let timer;

const table = ref(false);
const dialog = ref(false);
const loading = ref(false);

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const gridData = [
  {
    date: '2016-05-02',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-04',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-01',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-03',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
];

const drawerRef = ref();
const onClick = () => {
  drawerRef.value.close();
};

const handleClose = (done) => {
  if (loading.value) {
    return;
  }
  EMessageBox.confirm('Do you want to submit?')
    .then(() => {
      loading.value = true;
      timer = setTimeout(() => {
        done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false;
        }, 400);
      }, 2000);
    })
    .catch(() => {
      // catch error
    });
};

const cancelForm = () => {
  loading.value = false;
  dialog.value = false;
  clearTimeout(timer);
};
</script>
