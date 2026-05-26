<template>
  <e-tree :data="treeData" show-line :checkable="true" :multiple="true" show-icon>
    <template #icon="{ isLeaf, expanded }">
      <!-- 定制 prefix 图标 -->
      <!-- 默认： 父节点根据是否展开显示为文件夹图标, 子节点文档图标 -->
      <template v-if="!isLeaf">
        <Folder v-if="!expanded" />
        <FolderChecked v-else />
      </template>
      <template v-else>
        <User />
      </template>
    </template>
  </e-tree>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { Finished, Folder, FolderChecked, FolderOpened, User, UserFilled } from '@epoint-fe/eui-icons';

const treeData = [
  {
    label: '父节点1',
    value: 'node1',
    children: [
      {
        label: 'Leaf',
        value: 'node2',
      },
    ],
  },
  {
    label: '父节点2个性化图标，显示成加减号',
    value: 'node3',
    icon: ({ expanded, checked, isLeaf }) => {
      console.log('当前节点状态', expanded, checked, isLeaf);
      return h('span', { style: 'color:red' }, `${expanded ? '-' : '+'}`);
    },
    children: [
      {
        label: '叶子节点4',
        value: 'node4',
      },
      {
        label: '叶子节点5',
        value: 'node5',
      },

      {
        label: '叶子节点6, 个性化成不一样的用户图标',
        value: 'node6',
        icon: () => {
          return h(
            'span',
            {
              style: { color: 'red' },
            },
            h(UserFilled)
          );
        },
      },
      {
        label: '叶子节点7, 个性化成不一样的图标',
        value: 'node7',
        icon: () => h(Finished),
      },

      {
        label: '叶子节点8, 个性化成不一样的图标',
        value: 'node8',
        icon: () =>
          h('span', {
            style: {
              display: 'block',
              width: '16px',
              height: '16px',
              background: 'url(https://oa.epoint.com.cn/OA9/fui/css/images/usertree/userOnline.png) no-repeat',
            },
          }),
      },
      {
        label: '叶子节点9, 个性化成不一样的图标',
        value: 'node9',
        icon: () => {
          return h('span', {
            style: {
              display: 'block',
              width: '16px',
              height: '16px',
              background: 'url(https://oa.epoint.com.cn/OA9/fui/css/images/usertree/userOffline.png) no-repeat',
            },
          });
        },
      },
      {
        label: '叶子节点10, 个性化成不一样的用户图标',
        value: 'node10',
        icon: () => {
          return h(
            'span',
            {
              style: { color: 'blue' },
            },
            h(UserFilled)
          );
        },
      },
    ],
  },
];
</script>
