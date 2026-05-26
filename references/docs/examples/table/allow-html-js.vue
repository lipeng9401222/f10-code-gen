<template>
  <e-table :columns="columns" :data-source="data" >

  </e-table>
</template>
<script setup>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    allowHtml: 'text'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    allowHtml: 'html'
  },
  {
    title: '地址',
    dataIndex: 'address',
    allowHtml: 'decodeHtml'
  },
];

const data = [
  {
    key: '1',
    name: '<span style="color: red">张三</span>',
    sex: '<span style="color: red">女</span>',
    address: '<span style="color: red">纽约第一湖公园</span>',
  },
  {
    key: '2',
    name: '&lt;span style=&quot;color: red&quot;&gt;李四&lt;/span&gt;',
    sex: '&lt;span style=&quot;color: red&quot;&gt;男&lt;/span&gt;',
    address: '&lt;span style=&quot;color: red&quot;&gt;伦敦第一湖公园&lt;/span&gt;',
  },
  {
    key: '3',
    name: '王五',
    sex: '男',
    address: '悉尼第一湖公园',
  },
];
</script>

<style scoped>
.e-tag+.e-tag {
  margin-left: 8px;
}
</style>
