<template>
  <div>
    <e-table :columns="columns" :data-source="dataSource" :pagination="false">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'address'">
          <span>
            <e-icon>
              <Sunny />
            </e-icon>
            地址
          </span>
        </template>
      </template>
    </e-table>

    <p style="color: var(--e-text-color-secondary)">required 仅供示意，不提供实际验证功能</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Sunny } from '@epoint-fe/eui-icons';
const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    required: true,
    tooltip: '请输入姓名',
    sorter: (a, b) => {
      return a.name.length - b.name.length;
    },
    filters: [
      {
        text: '李华',
        value: '李华',
      },
      {
        text: '张明',
        value: '张明',
      },
      {
        text: '子菜单',
        value: '子菜单',
        children: [
          {
            text: '张 开头',
            value: '^张',
          },
          {
            text: '李 开头',
            value: '^李',
          },
        ],
      },
    ],
    onFilter: (value: string, record) => {
      if (value.startsWith('^')) {
        return record.name.startsWith(value.slice(1));
      }
      return record.name === value;
    },
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    tooltip: {
      content: '<span style="color: var(--e-color-danger)">请填写真实手机号</span>',
      placement: 'left',
      effect: 'light',
      rawContent: true,
      showArrow: false,
    },
    editor: {
      type: 'input',
      props: {},
    },
    rules: [{ required: true, message: '请输入手机号' }],
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    tooltip: '请输入邮箱',
    sorter: () => 1,
    filters: [
      {
        text: '李华',
        value: '李华',
      },
    ],
    editor: {},
    rules: [
      { type: 'required', message: '请输入邮箱' },
      { type: 'email', message: '请输入正确的邮箱' },
    ],
  },
  {
    dataIndex: 'address',
    key: 'address',
  },
]);

const dataSource = ref([
  {
    key: '1',
    name: '张明',
    age: 32,
    address: '张家港市杨舍镇步行街',
  },
  {
    key: '2',
    name: '李华',
    age: 42,
    address: '张家港市金港镇长江路',
  },
  {
    key: '3',
    name: '王强',
    age: 32,
    address: '张家港市塘桥镇人民路',
  },
  {
    key: '4',
    name: '李红',
    age: 32,
    address: '张家港市金港镇长江路2号',
  },
]);
</script>
