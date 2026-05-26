<template>
  <e-table :columns="columns" :data-source="data" borderStyle="full" size="middle" :scroll="{ x: 'calc(700px + 50%)', y: 240 }" />
</template>
<script setup>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
    // filters: [
    //   {
    //     text: '张三',
    //     value: '张三',
    //   },
    //   {
    //     text: '李四',
    //     value: '李四',
    //   },
    // ],
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: '其他信息',
    children: [
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 80,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '地址',
        children: [
          {
            title: '街道',
            dataIndex: 'street',
            key: 'street',
            width: 200,
          },
          {
            title: '区块',
            children: [
              {
                title: '楼栋',
                dataIndex: 'building',
                key: 'building',
                width: 100,
              },
              {
                title: '门牌号',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '公司',
    children: [
      {
        title: '公司地址',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
      },
      {
        title: '公司名称',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right',
  },
];
const data = [...Array(100)].map((_, i) => ({
  key: i,
  name: '张三',
  age: i + 1,
  street: '张家港路',
  building: 'C',
  number: 2035,
  companyAddress: '张家港路42号',
  companyName: '张家港科技有限公司',
  gender: '男',
}));
</script>
