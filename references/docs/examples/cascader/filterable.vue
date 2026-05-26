<template>
  <div class="m-4">
    <p>本地过滤（单选）</p>
    <e-cascader v-model="value1" placeholder="尝试搜索：指南" :options="options" filterable />
  </div>
  <div class="m-4">
    <p>本地过滤（多选）</p>
    <e-cascader v-model="value2" placeholder="尝试搜索：指南" :options="options" :props="multipleProps" filterable />
  </div>
  <div class="m-4">
    <p>远程搜索（单选）</p>
    <e-cascader
      v-model="value3"
      placeholder="输入关键词进行远程搜索"
      :options="remoteOptions"
      filterable
      :filter-method="remoteFilter"
    />
  </div>
  <div class="m-4">
    <p>远程搜索（多选）</p>
    <e-cascader
      v-model="value4"
      placeholder="输入关键词进行远程搜索"
      :options="remoteOptions"
      :props="multipleProps"
      filterable
      :filter-method="remoteFilter"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 单选
const value1 = ref('yizhi');
const value2 = ref();
const value3 = ref();
const value4 = ref();

// 多选配置
const multipleProps = {
  multiple: true,
};

const options = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          { value: 'yizhi', label: '一致' },
          { value: 'fankui', label: '反馈' },
          { value: 'xiaolv', label: '效率' },
          { value: 'kekong', label: '可控' },
        ],
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          { value: 'cexiang', label: '侧向导航' },
          { value: 'dingbu', label: '顶部导航' },
        ],
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: '基础组件',
        children: [
          { value: 'button', label: '按钮' },
          { value: 'icon', label: '图标' },
        ],
      },
      {
        value: 'form',
        label: '表单组件',
        children: [
          { value: 'input', label: '输入框' },
          { value: 'select', label: '选择器' },
          { value: 'cascader', label: '级联选择器' },
        ],
      },
    ],
  },
  {
    value: 'ziyuan',
    label: '资源',
    children: [
      { value: 'axure', label: 'Axure 组件' },
      { value: 'sketch', label: 'Sketch 模板' },
    ],
  },
];

// 远程搜索数据
const remoteOptions = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          { value: 'datunlu', label: '大屯路' },
          { value: 'sanyuanqiao', label: '三元桥' },
        ],
      },
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          { value: 'zhongguancun', label: '中关村' },
          { value: 'wudaokou', label: '五道口' },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [{ value: 'nanjinglu', label: '南京路' }],
      },
      {
        value: 'pudong',
        label: '浦东新区',
        children: [{ value: 'lujiazui', label: '陆家嘴' }],
      },
    ],
  },
];

// 远程搜索方法
const remoteFilter = (keyword: string) => {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      if (!keyword) {
        resolve(remoteOptions);
        return;
      }

      // 模拟远程搜索，返回匹配的结果
      const results = [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'chaoyang',
              label: `朝阳区 - ${keyword}`,
              children: [
                { value: 'datunlu', label: `${keyword} - 大屯路` },
                { value: 'datunlu2', label: `${keyword} - 大屯路2` },
                { value: 'datunlu3', label: `${keyword} - 大屯路3` },
              ],
            },
          ],
        },
        {
          value: 'shanghai',
          label: '上海',
          children: [
            { value: 'pudong', label: `浦东新区 - ${keyword}` },
            { value: 'pudong2', label: `浦东新区2 - ${keyword}` },
          ],
        },
      ];

      resolve(results);
    }, 500);
  });
};
</script>
