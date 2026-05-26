<template>
  <div>
    <!-- <div>定制 loading 图标</div> -->
    <e-button @click="setData">重置数据</e-button>
    <p>
      模拟加载的时间范围
      <e-slider v-model="loadDelay" range show-stops :max="60" :min="1" />
    </p>
    <e-tree :data="treeData" :show-line="false" :checkable="true" :multiple="true" :load-more="loadMore">
      <template #loading-icon="{ isLeaf, loading }">
        <!-- 定制 loading 图标 -->
        <!-- e-icon 上的 is-loading 会让图标旋转 -->
        <e-icon v-if="!isLeaf && loading" class="is-loading">
          <Promotion />
        </e-icon>
      </template>
    </e-tree>
  </div>
</template>

<script setup>
import { h, ref } from 'vue';
import { Loading, Promotion } from '@epoint-fe/eui-icons';

const renderLoadingIcon = () => {
  return h(
    'span',
    {
      class: 'custom-loading-icon',
      style: { color: 'red' },
    },
    h(Loading)
  );
};

const data = [
  {
    label: '父节点 0-0',
    value: '0-0',
    isLeaf: false,
  },
  {
    label: '父节点 0-1',
    value: '0-1',
    children: [
      {
        label: '子节点 0-1-1',
        value: '0-1-1',
      },
    ],
  },
  {
    label: '父节点 0-2 loading是红的，自定义动画',
    value: '0-2',
    isLeaf: false,
    loadingIcon: renderLoadingIcon,
  },
];
const treeData = ref([]);
const setData = () => {
  treeData.value = JSON.parse(JSON.stringify(data));
  treeData.value[2].loadingIcon = renderLoadingIcon;
};
setData();

const loadDelay = ref([1, 5]);

const loadMore = (nodeData) => {
  const time = 1000 * (((Math.random() * (loadDelay.value[1] - loadDelay.value[0])) >>> 0) + loadDelay.value[0]);
  return new Promise((resolve) => {
    setTimeout(() => {
      const loadingIcon = nodeData.loadingIcon;
      nodeData.children = Array.from({ length: (Math.random() * 10 + 2) >>> 0 })
        .fill(0)
        .map((_, i) => {
          const n = i + 1;
          const obj = {
            label: `${nodeData.label}-${n}`,
            value: `${nodeData.value}-${n}`,
            isLeaf: Math.random() > 0.6,
          };
          if (loadingIcon) {
            obj.loadingIcon = loadingIcon;
          }
          return obj;
        });
      resolve('');
    }, time);
  });
};
</script>
<style scoped>
/* .custom-loading-icon {
  width: 16px;
  height: 16px;
  display: block;
} */
.custom-loading-icon svg {
  width: 16px;
  height: 16px;
  display: block;
  transform-origin: 50% 50%;
  animation: custom-loading-animation 2s linear infinite;
}
@keyframes custom-loading-animation {
  0% {
    transform: rotate(0deg) scale(0.8);
    opacity: 0.5;
  }
  80% {
    transform: rotate(300deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(0.8);
    opacity: 0.5;
  }
}
</style>
