<template>
  <e-table :columns="columns" :data-source="data" borderStyle="full">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a href="javascript:;">{{ text }}</a>
      </template>
    </template>
  </e-table>
</template>
<script setup>
// 在第五行，其他列合并到第一列
// 通过将其 colSpan 设置为 0 实现
const sharedOnCell = (_, index) => {
  if (index === 4) {
    return { colSpan: 0 };
  }
};

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: '北京市朝阳区第一公园',
  },
  {
    key: '2',
    name: '李四',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: '上海市浦东新区第一公园',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '广州市天河区第一公园',
  },
  {
    key: '4',
    name: '赵六',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '深圳市南山区第二公园',
  },
  {
    key: '5',
    name: '钱七',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '杭州市西湖区第二公园',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    customCell: (_, index) => ({
      colSpan: index < 4 ? 1 : 5,
    }),
  },
  {
    title: '年龄',
    dataIndex: 'age',
    customCell: sharedOnCell,
  },
  {
    title: '家庭电话',
    colSpan: 2,
    dataIndex: 'tel',
    customCell: (_, index) => {
      if (index === 2) {
        return { rowSpan: 2 };
      }
      // 这两行合并到上面的单元格
      if (index === 3) {
        return { rowSpan: 0 };
      }
      if (index === 4) {
        return { colSpan: 0 };
      }
    },
  },
  {
    title: '手机',
    colSpan: 0,
    dataIndex: 'phone',
    customCell: sharedOnCell,
  },
  {
    title: '地址',
    dataIndex: 'address',
    customCell: sharedOnCell,
  },
];
</script>
