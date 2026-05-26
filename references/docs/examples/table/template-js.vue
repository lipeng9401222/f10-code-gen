<template>
  <e-table :data-source="data">
    <e-table-column-group>
      <template #title><span style="color: #1890ff">姓名</span></template>
      <e-table-column key="firstName" data-index="firstName">
        <template #title><span style="color: #1890ff">名</span></template>
      </e-table-column>
      <e-table-column key="lastName" title="姓" data-index="lastName" />
    </e-table-column-group>
    <e-table-column key="age" title="年龄" data-index="age" />
    <e-table-column key="address" title="地址" data-index="address" />
    <e-table-column key="tags" title="标签" data-index="tags">
      <template #default="{ text: tags }">
        <span>
          <e-tag v-for="tag in tags" :key="tag">{{ tag }}</e-tag>
        </span>
      </template>
    </e-table-column>
    <e-table-column key="action" title="操作">
      <template #default="{ record }">
        <span>
          <e-button link type="primary">操作 一 {{ record.firstName }}</e-button>
          <e-divider direction="vertical" />
          <e-button link type="primary">删除</e-button>
        </span>
      </template>
    </e-table-column>
  </e-table>
</template>
<script setup>
const data = [
  {
    key: '1',
    firstName: '明',
    lastName: '张',
    age: 32,
    address: '张家港市杨舍镇步行街',
    tags: ['优秀', '开发'],
  },
  {
    key: '2',
    firstName: '华',
    lastName: '李',
    age: 42,
    address: '张家港市金港镇长江路',
    tags: ['新手'],
  },
  {
    key: '3',
    firstName: '强',
    lastName: '王',
    age: 32,
    address: '张家港市塘桥镇人民路',
    tags: ['资深', '教师'],
  },
];
</script>
