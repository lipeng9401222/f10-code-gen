<template>
  <e-button text @click="dialogTableVisible = true"> 打开嵌套表格的对话框 </e-button>

  <e-dialog v-model="dialogTableVisible" title="送货地址">
    <e-table :data="gridData">
      <e-table-column property="date" label="日期" width="150" />
      <e-table-column property="name" label="姓名" width="200" />
      <e-table-column property="address" label="地址" />
    </e-table>
  </e-dialog>

  <!-- 表单 -->
  <e-button text @click="dialogFormVisible = true"> 打开嵌套表单的对话框 </e-button>

  <e-dialog v-model="dialogFormVisible" title="送货地址">
    <e-form :model="form">
      <e-form-item label="促销名称" :label-width="formLabelWidth">
        <e-input v-model="form.name" autocomplete="off" />
      </e-form-item>
      <e-form-item label="区域" :label-width="formLabelWidth">
        <e-select v-model="form.region" placeholder="请选择一个区域">
          <e-option label="区域一" value="shanghai" />
          <e-option label="区域二" value="beijing" />
        </e-select>
      </e-form-item>
    </e-form>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="dialogFormVisible = false">取消</e-button>
        <e-button type="primary" @click="dialogFormVisible = false"> 确认 </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';

const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

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
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
];
</script>
<style scoped>
.e-button--text {
  margin-right: 15px;
}
.e-select {
  width: 300px;
}
.e-input {
  width: 300px;
}
</style>
