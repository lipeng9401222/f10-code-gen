<template>
  <div style="display: flex; align-items: center">
    <e-popover placement="right" :width="400" trigger="click">
      <template #reference>
        <e-button style="margin-right: 16px">点击激活</e-button>
      </template>
      <e-table :data-source="gridData" :columns="columns" />
    </e-popover>

    <e-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <e-avatar>张三</e-avatar>
      </template>
      <template #default>
        <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
          <e-avatar :size="60" style="margin-bottom: 8px">张三</e-avatar>
          <div>
            <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">张三</p>
            <p class="demo-rich-content__mention" style="margin: 0; font-size: 14px; color: var(--e-color-info)">
              @zhangsan
            </p>
          </div>

          <p class="demo-rich-content__desc" style="margin: 0">
            一位热爱技术的前端开发工程师，专注于Vue.js生态系统的开发与实践。
          </p>
        </div>
      </template>
    </e-popover>
  </div>
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 150,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 300,
  },
];

const gridData = [
  {
    date: '2016-05-02',
    name: '张三',
    address: '北京市朝阳区',
  },
  {
    date: '2016-05-04',
    name: '李四',
    address: '上海市浦东新区',
  },
  {
    date: '2016-05-01',
    name: '王五',
    address: '广州市天河区',
  },
  {
    date: '2016-05-03',
    name: '赵六',
    address: '深圳市南山区',
  },
];
</script>
