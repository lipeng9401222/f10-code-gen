---
title: Tree
originUrl: http://192.168.219.170/docs/vue/latest/component/component/tree.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

# Tree

对于文件夹、分类目录、组织架构等层级较多的内容，树可以清楚显示他们的层级关系，并具有展开、收起、选择等交互功能。

## 基本用法

为每个节点赋予全局唯一的 `key`（必填项），`title` 为该节点显示的内容。

**Demo 示例**: `tree/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-tree :data="treeData" :default-expanded-keys="['0-0-0']" :default-selected-keys="['0-0-0', '0-0-1']" />
</template>

<script lang="ts" setup>
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Branch 0-0-0',
        value: '0-0-0',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-0-0',
          },
          {
            label: 'Leaf',
            value: '0-0-0-1',
          },
        ],
      },
      {
        label: 'Branch 0-0-1',
        value: '0-0-1',
        children: [
          {
            label: 'Leaf',
            value: '0-0-1-0',
          },
        ],
      },
    ],
  },
];
</script>

```

## 非占据一行节点

节点非占据一整行。

**Demo 示例**: `tree/block-node`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-tree :block-node="false" :data="treeData" />
</template>

<script lang="ts" setup>
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Branch 0-0-0',
        value: '0-0-0',
        children: [
          {
            label: 'Leaf',
            value: '0-0-0-0',
          },
          {
            label: 'Leaf',
            value: '0-0-0-1',
          },
        ],
      },
      {
        label: 'Branch 0-0-1',
        value: '0-0-1',
        children: [
          {
            label: 'Leaf',
            value: '0-0-1-0',
          },
        ],
      },
    ],
  },
];
</script>

```

## 多选

`Tree` 设置 `multiple` 属性为`true`，可以启用多选。

**Demo 示例**: `tree/multiple`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-checkbox
    v-model="multiple"
    @change="
      () => {
        selectedKeys = [];
      }
    "
  >
    multiple
  </e-checkbox>
  <p>Current: {{ selectedKeys?.join(' , ') }}</p>
  <e-tree v-model:selected-keys="selectedKeys" :multiple="multiple" :data="treeData" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const selectedKeys = ref([]);
const multiple = ref(true);
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        children: [
          {
            label: 'Leaf',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf',
        value: '0-1-2',
      },
    ],
  },
];
</script>

```

## 带单选框的树

为 `Tree` 添加 `checkable` 属性，并设置 `multiple` 属性为 `false`（默认值），即可使树具有单选框功能。

**Demo 示例**: `tree/radioable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-checkbox
    v-model="multiple"
    @change="
      () => {
        checkedKeys = [];
      }
    "
  >
    multiple
  </e-checkbox>
  <p>checkedKeys:{{ checkedKeys.join(',') }}</p>
  <e-tree v-model:checked-keys="checkedKeys" :checkable="true" :multiple="multiple" :data="treeData" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkedKeys = ref(['0-0']);
const multiple = ref(false);

const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
          {
            label: 'Leaf',
            value: '0-0-2-2',
            disableCheckbox: true,
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        children: [
          {
            label: 'Leaf ',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf ',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf',
        value: '0-1-2',
      },
    ],
  },
];
</script>

```

## 带复选框的树

为 `Tree` 添加 `checkable` 属性，并设置 `multiple` 属性为 `true`, 即可使树具有复选框功能，可以用 `defaultCheckedKeys` 指定复选框默认选中的节点。

**Demo 示例**: `tree/checkable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-checkbox
    v-model="checkStrictly"
    @change="
      () => {
        checkedKeys = [];
      }
    "
  >
    checkStrictly
  </e-checkbox>
  <e-tree
    v-model:checked-keys="checkedKeys"
    :checkable="true"
    :multiple="true"
    :check-strictly="checkStrictly"
    :data="treeData"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkedKeys = ref([]);
const checkStrictly = ref(false);

const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
          {
            label: 'Leaf',
            value: '0-0-2-2',
            disableCheckbox: true,
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        children: [
          {
            label: 'Leaf ',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf ',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf',
        value: '0-1-2',
      },
    ],
  },
];
</script>

```

## 双向绑定

`selectedKeys` 、 `checkedKeys` 、 `expandedKeys` 属性均可受控，不仅支持 `v-model` ，还可以在对应的 `select` / `check` / `expand` 事件中自行控制如何更新属性值。

**Demo 示例**: `tree/control`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-button-group style="margin-bottom: 20px">
    <e-button type="primary" @click="toggleChecked">
      {{ checkedKeys?.length ? 'deselect all' : 'select all' }}
    </e-button>
    <e-button type="primary" @click="toggleExpanded">
      {{ expandedKeys?.length ? 'fold' : 'unfold' }}
    </e-button>
  </e-button-group>
  <e-tree
    v-model:selected-keys="selectedKeys"
    v-model:checked-keys="checkedKeys"
    v-model:expanded-keys="expandedKeys"
    :checkable="true"
    :multiple="true"
    :data="treeData"
    @select="onSelect"
    @check="onCheck"
    @expand="onExpand"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const allCheckedKeys = ['0-0', '0-0-1', '0-0-2', '0-0-2-1', '0-1', '0-1-1', '0-1-2'];
const allExpandedKeys = ['0-0', '0-1', '0-0-2'];

const selectedKeys = ref<string[]>([]);
const checkedKeys = ref<string[]>([]);
const expandedKeys = ref<string[]>([]);

const toggleChecked = () => {
  checkedKeys.value = checkedKeys?.value.length ? [] : allCheckedKeys;
};
const toggleExpanded = () => {
  expandedKeys.value = expandedKeys?.value.length ? [] : allExpandedKeys;
};
const onSelect = (newSelectedKeys, event) => {
  console.log('select:', newSelectedKeys, event);
};
const onCheck = (newCheckedKeys, event) => {
  console.log('check:', newCheckedKeys, event);
};
const onExpand = (newExpandedKeys, event) => {
  console.log('expand:', newExpandedKeys, event);
};

const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf 0-0-1',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        children: [
          {
            label: 'Leaf 0-0-2-1',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Leaf 0-1-1',
        value: '0-1-1',
      },
      {
        label: 'Leaf 0-1-2',
        value: '0-1-2',
      },
    ],
  },
];
</script>

```

## 动态加载

动态加载节点。

**Demo 示例**: `tree/load-more`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-tree :data="treeData" :load-more="loadMore" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const treeData = ref([
  {
    label: 'Trunk 0-0',
    value: '0-0',
    isLeaf: false,
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
      },
    ],
  },
]);

const loadMore = (nodeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      nodeData.children = Array.from({ length: (Math.random() * 10 + 2) >>> 0 })
        .fill(0)
        .map((_, i) => {
          const n = i + 1;
          return {
            label: `${nodeData.label}-${n}`,
            value: `${nodeData.value}-${n}`,
            isLeaf: Math.random() > 0.6,
          };
        });
      resolve('');
    }, 1000);
  });
};
</script>

```

## 拖拽

可拖拽的树节点。

**Demo 示例**: `tree/draggable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-checkbox v-model="checked" style="margin-bottom: 20px"> checkable </e-checkbox>
  <e-tree class="tree-demo" draggable block-node :checkable="checked" :data="treeData" @drop="onDrop" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultTreeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf 0-0-1',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        disableCheckbox: true,
        children: [
          {
            draggable: false,
            label: 'Leaf 0-0-2-1 (Drag disabled)',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        checkable: false,
        children: [
          {
            label: 'Leaf 0-1-1-1',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf 0-1-1-2',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf 0-1-2',
        value: '0-1-2',
      },
    ],
  },
];
const treeData = ref(defaultTreeData);
const checked = ref(false);

const onDrop = ({ dragNode, dropNode, dropPosition }) => {
  const data = treeData.value;
  const loop = (data, value, callback) => {
    data.some((item, index, arr) => {
      if (item.value === value) {
        callback(item, index, arr);
        return true;
      }
      if (item.children) {
        return loop(item.children, value, callback);
      }
      return false;
    });
  };

  loop(data, dragNode.value, (_, index, arr) => {
    arr.splice(index, 1);
  });

  if (dropPosition === 0) {
    loop(data, dropNode.value, (item) => {
      item.children = item.children || [];
      item.children.push(dragNode);
    });
  } else {
    loop(data, dropNode.value, (_, index, arr) => {
      arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
    });
  }
};
</script>

```

## 设置回填方式

为 `Tree` 添加 `checkedStrategy` 可以设置选中时的回填方式。

**Demo 示例**: `tree/checked-strategy`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-radio-group
    v-model="checkedStrategy"
    type="button"
    @change="
      (value) => {
        checkedKeys = [];
      }
    "
  >
    <e-radio v-for="item in strategyOptions" :key="item?.value" :value="item?.value">
      {{ item?.label }}
    </e-radio>
  </e-radio-group>
  <p>Current: {{ checkedKeys?.join(' , ') }}</p>
  <e-tree
    v-model:checked-keys="checkedKeys"
    :checkable="true"
    :multiple="true"
    :checked-strategy="checkedStrategy"
    :data="treeData"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        children: [
          {
            label: 'Leaf',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf',
        value: '0-1-2',
      },
    ],
  },
];

const strategyOptions = [
  {
    value: 'all',
    label: 'show all',
  },
  {
    value: 'parent',
    label: 'show parent',
  },
  {
    value: 'child',
    label: 'show child',
  },
];

const checkedKeys = ref([]);
const checkedStrategy = ref('all');
</script>

```

## 显示连接线

为 `Tree` 添加 `showLine` 属性即可使树具有连接线

**Demo 示例**: `tree/show-line`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <div>
    <span>showLine</span>
    <e-switch v-model="showLine" style="margin-left: 12px" />
  </div>
  <e-tree :default-selected-keys="['0-0-1']" :data="treeData" :show-line="showLine" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showLine = ref(true);

const treeData = [
  {
    label: 'Trunk 1',
    value: '0-0',
    children: [
      {
        label: 'Trunk 1-0',
        value: '0-0-0',
        children: [
          { label: 'leaf', value: '0-0-0-0' },
          {
            label: 'leaf',
            value: '0-0-0-1',
            children: [{ label: 'leaf', value: '0-0-0-1-0' }],
          },
          { label: 'leaf', value: '0-0-0-2' },
        ],
      },
      {
        label: 'Trunk 1-1',
        value: '0-0-1',
      },
      {
        label: 'Trunk 1-2',
        value: '0-0-2',
        children: [
          { label: 'leaf', value: '0-0-2-0' },
          {
            label: 'leaf',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 2',
    value: '0-1',
  },
  {
    label: 'Trunk 3',
    value: '0-2',
    children: [
      {
        label: 'Trunk 3-0',
        value: '0-2-0',
        children: [
          { label: 'leaf', value: '0-2-0-0' },
          { label: 'leaf', value: '0-2-0-1' },
        ],
      },
    ],
  },
];
</script>

```

## 定制额外节点

`Tree` 提供了名为 `extra` 的 `Slot`, 可以在节点上定制额外的内容。

**Demo 示例**: `tree/render-extra`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <div style="width: 500px; padding: 2px; overflow: auto">
    <e-tree :block-node="true" :checkable="true" :multiple="true" :data="treeData">
      <template #extra="nodeData">
        <e-icon style="color: #3370ff; margin-right: 5px" @click="() => onIconClick(nodeData)">
          <Plus />
        </e-icon>
        <e-icon style="color: #f53f3f" @click="() => onDeleteClick(nodeData)">
          <Minus />
        </e-icon>
      </template>
    </e-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Minus, Plus } from '@epoint-fe/eui-icons';

function findNodeByValue(nodes, value) {
  for (const node of nodes) {
    if (node.value === value) {
      return node;
    }
    if (node.children) {
      const found = findNodeByValue(node.children, value);
      if (found) return found;
    }
  }
  return null;
}

function findParentNode(nodes, value, parent = null) {
  for (const node of nodes) {
    if (node.value === value) {
      return parent;
    }
    if (node.children && node.children.length > 0) {
      const found = findParentNode(node.children, value, node);
      if (found) return found;
    }
  }
  return null;
}

function onIconClick(nodeData) {
  const originalNode = findNodeByValue(treeData.value, nodeData.value);

  if (originalNode) {
    if (!originalNode.children) {
      originalNode.children = [];
    }

    originalNode.children.push({
      label: 'new tree node',
      value: `${nodeData.value}-${originalNode.children.length + 1}`,
    });

    treeData.value = [...treeData.value];
  }
}

function onDeleteClick(nodeData) {
  if (nodeData.value.split('-').length === 2) {
    const index = treeData.value.findIndex((node) => node.value === nodeData.value);
    if (index !== -1) {
      treeData.value.splice(index, 1);
      treeData.value = [...treeData.value];
    }
    return;
  }

  const parentNode = findParentNode(treeData.value, nodeData.value);

  if (parentNode && parentNode.children) {
    const index = parentNode.children.findIndex((node) => node.value === nodeData.value);
    if (index !== -1) {
      parentNode.children.splice(index, 1);

      if (parentNode.children.length === 0) {
        delete parentNode.children;
      }

      treeData.value = [...treeData.value];
    }
  }
}

const treeData = ref([
  {
    label: 'Trunk',
    value: '0-0',
    children: [
      {
        label: 'Leaf',
        value: '0-0-1',
      },
      {
        label: 'Branch',
        value: '0-0-2',
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk',
    value: '0-1',
    children: [
      {
        label: 'Branch',
        value: '0-1-1',
        children: [
          {
            label: 'Leaf',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf',
        value: '0-1-2',
      },
    ],
  },
]);
</script>

```

## 定制组件图标

### 展开收起图标{#switcher-icon}

**Demo 示例**: `tree/icons-switcher`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <!-- <div>定制 switcher 图标</div> -->
  <e-tree :data="treeData" :show-line="false" :checkable="true" :multiple="true">
    <template #switcher-icon="{ isLeaf, expanded }">
      <!-- 定制 switcher 图标 -->
      <Plus v-if="!isLeaf && !expanded" />
      <Minus v-if="!isLeaf && expanded" />
      <Star v-if="isLeaf" />
    </template>
  </e-tree>
  <hr />
  <e-tree :data="treeData" :show-line="true" :checkable="true" :multiple="true">
    <template #switcher-icon="{ isLeaf, expanded }">
      <!-- 定制 switcher 图标 -->
      <Plus v-if="!isLeaf && !expanded" />
      <Minus v-if="!isLeaf && expanded" />
      <Star v-if="isLeaf" />
    </template>
  </e-tree>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { Camera, Minus, Notebook, Plus, Star } from '@epoint-fe/eui-icons';

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
    label: '父节点2',
    value: 'node3',
    children: [
      {
        label: '叶子节点switcher显示为笔记本',
        value: 'node4',
        switcherIcon: () => h(Notebook),
      },
      {
        label: '叶子节点switcher显示为照相机',
        value: 'node5',
        switcherIcon: () => h(Camera),
      },

      {
        label: '叶子节点没有定义，显示为树配置的星星',
        value: 'node6',
      },
    ],
  },
];
</script>

```

### 加载中图标{#loading-icon}

**Demo 示例**: `tree/icons-loading`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
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

<script lang="ts" setup>
import { h, ref } from 'vue';
import { Loading, Promotion } from '@epoint-fe/eui-icons';
import type { TreeNodeData } from '@epoint-fe/eui-components';

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
const treeData = ref<any>([]);
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
          const obj: TreeNodeData = {
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

```

### 类型图标{#type-icon}

通过 showTypeIcon 属性可以开启类型图标的显示。此图标显示在展开图标之后，勾选节点之前。

本属性为和 miniui 中的树一致而开发定制，建议优先使用下文的 `icon` 插槽，icon节点的位置和业界常见位置相同。

**Demo 示例**: `tree/icons-type-show`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-switch v-model="showTypeIcon" style="margin-left: 12px" active-text="显示节点图标" inactive-text="隐藏节点图标" />
  <e-tree
    :data="treeData"
    :default-expanded-keys="['0-0-0']"
    :default-selected-keys="['0-0-0', '0-0-1']"
    :show-type-icon="showTypeIcon"
    checkable
    multiple
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const showTypeIcon = ref(true);
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Branch 0-0-0',
        value: '0-0-0',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-0-0',
          },
          {
            label: 'Leaf',
            value: '0-0-0-1',
          },
        ],
      },
      {
        label: 'Branch 0-0-1',
        value: '0-0-1',
        children: [
          {
            label: 'Leaf',
            value: '0-0-1-0',
          },
        ],
      },
    ],
  },
];
</script>

```

### 类型图标自定义{#type-icon-diy}

**Demo 示例**: `tree/icons-type-diy`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-tree :data="treeData" show-line :checkable="true" :multiple="true" show-type-icon>
    <template #type-icon="{ isLeaf, expanded }">
      <!-- 定制 type 图标 -->
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
    typeIcon: ({ expanded, checked, isLeaf }) => {
      console.log('当前节点状态', expanded, checked, isLeaf);
      return h('span', `${expanded ? '-' : '+'}`);
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
        typeIcon: () => h(UserFilled),
      },
      {
        label: '叶子节点7, 个性化成不一样的图标',
        value: 'node7',
        typeIcon: () => h(Finished),
      },

      {
        label: '叶子节点8, 个性化成不一样的图标',
        value: 'node8',
        typeIcon: () =>
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
        typeIcon: () => {
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
    ],
  },
];
</script>

```

### 节点图标{#node-icon}

icon 位于勾选之后，文字之前。

**Demo 示例**: `tree/node-icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-switch v-model="showIcon" style="margin-left: 12px" active-text="显示节点图标" inactive-text="隐藏节点图标" />
  <e-tree
    checkable
    multiple
    :data="treeData"
    :default-expanded-keys="['0-0-0']"
    :default-selected-keys="['0-0-0', '0-0-1']"
    :show-icon="showIcon"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const showIcon = ref(true);
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Branch 0-0-0',
        value: '0-0-0',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-0-0',
          },
          {
            label: 'Leaf',
            value: '0-0-0-1',
          },
        ],
      },
      {
        label: 'Branch 0-0-1',
        value: '0-0-1',
        children: [
          {
            label: 'Leaf',
            value: '0-0-1-0',
          },
        ],
      },
    ],
  },
];
</script>

```

### 节点图标自定义{#node-icon-diy}

**Demo 示例**: `tree/node-icon-diy`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
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

```

## 虚拟列表

通过指定 `virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。

**Demo 示例**: `tree/virtual`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-button type="primary" :style="{ marginBottom: '20px' }" @click="scrollIntoView">
    Scroll to 0-0-2-2, i.e. the 26th.
  </e-button>
  <e-tree
    ref="treeRef"
    block-node
    checkable
    multiple
    :data="treeData"
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TreeNodeData } from '@epoint-fe/eui-components';

const treeRef = ref();
const treeData = loop();

const scrollIntoView = () => {
  treeRef.value && treeRef.value.scrollIntoView({ key: '0-0-2-2' });
};

function loop(path = '0', level = 2) {
  const list: TreeNodeData[] = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode: TreeNodeData = {
      label: key,
      value: key,
    };

    if (level > 0) {
      treeNode.children = loop(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}
</script>

```

## 搜索树

为 `Tree` 添加 `showFilter` 属性可以开启搜索功能 。

**Demo 示例**: `tree/search`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-tree :data="originTreeData" show-filter />
</template>

<script lang="ts" setup>
const originTreeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Branch 0-0-1',
        value: '0-0-1',
        children: [
          {
            label: 'Leaf 0-0-1-1',
            value: '0-0-1-1',
          },
          {
            label: 'Leaf 0-0-1-2',
            value: '0-0-1-2',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        children: [
          {
            label: 'Leaf 0-1-1-0',
            value: '0-1-1-0',
          },
        ],
      },
      {
        label: 'Branch 0-1-2',
        value: '0-1-2',
        children: [
          {
            label: 'Leaf 0-1-2-0',
            value: '0-1-2-0',
          },
        ],
      },
    ],
  },
];
</script>

```

## 远程搜索树

可通过 `filterMethod` 属性来实现远程搜索效果。

**Demo 示例**: `tree/search-remote`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-tree :data="treeData" show-filter :filter-method="filter" />
</template>

<script lang="ts" setup>
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Branch 0-0-0',
        value: '0-0-0',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-0-0',
          },
          {
            label: 'Leaf',
            value: '0-0-0-1',
          },
        ],
      },
      {
        label: 'Branch 0-0-1',
        value: '0-0-1',
        children: [
          {
            label: 'Leaf',
            value: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

const filter = (key: string) => {
  return new Promise((resolve) => {
    const data = [
      {
        label: 'Trunk 0-0',
        value: '0-0',
        children: [
          {
            label: `Branch ${key}`,
            value: '0-0-0',
            children: [
              {
                label: `Leaf ${key}`,
                value: '0-0-0-0',
              },
              {
                label: `${key} Leaf`,
                value: '0-0-0-1',
              },
            ],
          },
        ],
      },
    ];
    setTimeout(() => {
      resolve(key ? data : treeData);
    }, 500);
  });
};
</script>

```

## 自定义 data 的字段名称

通过 `fieldNames` 字段可以自定义 data 的字段名。

**Demo 示例**: `tree/field-names`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <e-tree
    :default-selected-keys="['0-0-1']"
    :field-names="{
      value: 'value',
      label: 'text',
      children: 'items',
      icon: 'customIcon',
    }"
    :data="treeData"
  />
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { Notebook, Star } from '@epoint-fe/eui-icons';

const treeData = [
  {
    text: 'Trunk 0-0',
    value: '0-0',
    items: [
      {
        text: 'Branch 0-0-2',
        value: '0-0-2',
        selectable: false,
        customIcon: () => h(Notebook),
        items: [
          {
            text: 'Leaf',
            value: '0-0-2-1',
            items: [
              {
                text: 'Leaf 0-0-2',
                value: '0-0-2-1-0',
                items: [
                  {
                    text: 'Leaf',
                    customIcon: () => h(Star),
                    value: '0-0-2-1-0-0',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: 'Trunk 0-1',
    value: '0-1',
    items: [
      {
        text: 'Branch 0-1-1',
        value: '0-1-1',
        items: [
          {
            text: 'Leaf',
            value: '0-1-1-0',
          },
        ],
      },
    ],
  },
];
</script>

```

## 悬停或选中行高亮范围

通过 `hoverScope` 属性定义行高亮范围。

**Demo 示例**: `tree/hover-scope`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree.html)

```vue
<template>
  <div class="hover-scope">
    <div>
      <h3>默认整行高亮</h3>
      <e-tree :default-selected-keys="['0-0-1']" :data="treeData" />
    </div>
    <div>
      <h3>设置文字高亮</h3>
      <e-tree :default-selected-keys="['0-0-1']" :data="treeData" hover-scope="text" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
          {
            label: 'Leaf',
            value: '0-0-2-2',
            disableCheckbox: true,
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        children: [
          {
            label: 'Leaf ',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf ',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf',
        value: '0-1-2',
      },
    ],
  },
];
</script>
<style lang="scss">
.hover-scope {
  display: flex;
  > div {
    flex: 1;
    width: 0;
  }
}
</style>

```

## API

### Attributes

| Name                            | Description                                                                                                     | Type                                                                                | Default |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------- |
| block-node                      | 节点是否占据一行                                                                                                | boolean                                                                             | true    |
| default-expand-all              | 是否默认展开父节点                                                                                              | boolean                                                                             | true    |
| multiple                        | 是否支持多选，`checkable` 为 `true` 时可用于控制选项框单/多选类型                                               | boolean                                                                             | false   |
| checkable                       | 是否在节点前添加复选框，支持函数格式                                                                            | boolean \| (node: TreeNodeData, info: {level: number; isLeaf: boolean;}) => boolean | false   |
| selectable                      | 是否支持选择，支持函数格式                                                                                      | boolean \| (node: TreeNodeData, info: {level: number; isLeaf: boolean;}) => boolean | true    |
| check-strictly                  | 是否取消父子节点关联                                                                                            | boolean                                                                             | false   |
| checked-strategy                | 定制回填方式 <br/> all: 返回所有选中的节点 <br/> parent: 父子节点都选中时只返回父节点 <br/> child: 只返回子节点 | `'all' \| 'parent' \| 'child'`                                                      | 'all'   |
| default-selected-keys           | 默认选中的树节点                                                                                                | `Array<string \| number>`                                                           | —       |
| selected-keys **(v-model)**     | 选中的树节点                                                                                                    | `Array<string \| number>`                                                           | —       |
| default-checked-keys            | 默认选中复选框的树节点                                                                                          | `Array<string \| number>`                                                           | —       |
| checked-keys **(v-model)**      | 选中复选框的树节点                                                                                              | `Array<string \| number>`                                                           | —       |
| default-expanded-keys           | 默认展开的节点                                                                                                  | `Array<string \| number>`                                                           | —       |
| expanded-keys **(v-model)**     | 展开的节点                                                                                                      | `Array<string \| number>`                                                           | —       |
| data                            | 传入`data`,生成对应的树结构                                                                                     | `TreeNodeData[]`                                                                    | []      |
| field-names                     | 指定节点数据中的字段名                                                                                          | `TreeFieldNames`                                                                    | —       |
| show-line                       | 是否展示连接线                                                                                                  | boolean                                                                             | false   |
| show-type-icon                  | 是否显示树节点的类型图标，展开收起之后，勾选节点前                                                              | boolean                                                                             | false   |
| show-icon                       | 是否显示树节点的的图标，勾选节点后，文字内容前                                                                  | boolean                                                                             | false   |
| load-more                       | 异步加载数据的回调，返回一个 `Promise`                                                                          | `(node: TreeNodeData) => Promise<void>`                                             | —       |
| draggable                       | 是否可以拖拽                                                                                                    | boolean                                                                             | false   |
| allow-drop                      | 拖拽时是否允许在某节点上释放                                                                                    | `(options: { dropNode: TreeNodeData; dropPosition: -1 \| 0 \| 1;}) => boolean`      | —       |
| virtual-list-props              | 传递虚拟列表属性，传入此参数以开启虚拟滚动，[VirtualListProps](#virtuallistprops)                               | `VirtualListProps`                                                                  | —       |
| default-expand-selected         | 是否默认展开已选中节点的父节点                                                                                  | boolean                                                                             | false   |
| default-expand-checked          | 是否默认展开已选中复选框节点的父节点                                                                            | boolean                                                                             | false   |
| auto-expand-parent              | 是否自动展开已展开节点的父节点                                                                                  | boolean                                                                             | true    |
| half-checked-keys **(v-model)** | 半选状态的节点，仅在 checkable 且 checkStrictly 时生效                                                          | `Array<string \| number>`                                                           | —       |
| only-check-leaf                 | 开启后 checkedKeys 只处理叶子节点，父节点状态由子节点决定（仅在 checkable 且 checkStrictly 为 false 时生效）    | boolean                                                                             | false   |
| animation                       | 是否开启展开时的过渡动效                                                                                        | boolean                                                                             | true    |
| action-on-node-click            | 点击节点的时候触发的动作                                                                                        | 'expand'                                                                            | —       |
| show-filter                     | 是否开启搜索功能                                                                                                | boolean                                                                             | false   |
| filter-placeholder              | 过滤输入框的 placeholder                                                                                        | string                                                                              | —       |
| filter-method                   | 异步搜索的回调，返回一个 `Promise`                                                                              | `(keyword: string) => Promise<TreeNodeData[]>`                                      | —       |
| debounce                        | 输入筛选关键词的防抖延迟，以毫秒为单位                                                                          | number                                                                              | 300     |
| hover-scope                     | 悬停或选中行高亮范围                                                                                            | `'row' \| 'text' `                                                                  | 'row'   |

### Events

| Name       | Description            | Parameters                                                                                                                                                                                                      |
| ---------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| select     | 点击树节点时触发       | selectedKeys: `Array<string \| number>`<br>data: `{ selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`                                                                       |
| check      | 点击树节点复选框时触发 | checkedKeys: `Array<string \| number>`<br>data: `{ checked?: boolean; checkedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; halfCheckedKeys: (string \| number)[]; halfCheckedNodes: TreeNodeData[]; }` |
| expand     | 展开/关闭              | expandKeys: `Array<string \| number>`<br>data: `{ expanded?: boolean; expandNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`                                                                           |
| drag-start | 节点开始拖拽           | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drag-end   | 节点结束拖拽           | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drag-over  | 节点被拖拽至可释放目标 | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drag-leave | 节点离开可释放目标     | ev: `DragEvent`<br>node: `TreeNodeData`                                                                                                                                                                         |
| drop       | 节点在可释放目标上释放 | data: `{ e: DragEvent; dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: number; }`                                                                                                                 |

### Methods

| Method              | Description                                                                      | Parameters                                                                               |
| ------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| scrollIntoView      | 控制滚到到展示传入的节点，仅当组件本身存在滚动条时有效。`align` 在虚拟列表时无效 | options: `{ index?: number; key?: number \| string; align: 'auto' \| 'top' \| 'bottom'}` |
| getNodes            | 获取节点对象                                                                     | keys: `TreeNodeKey[]`                                                                    |
| getSelectedKeys     | 获取选中节点的 key 值                                                            | —                                                                                        |
| getSelectedNodes    | 获取选中的节点                                                                   | —                                                                                        |
| getCheckedKeys      | 获取选中复选框节点的 key 值。支持传入 `checkedStrategy`，没有传则取组件的配置。  | options: `checkedStrategy?: 'all' \| 'parent' \| 'child'; includeHalfChecked?: boolean;` |
| getCheckedNodes     | 获取选中复选框的节点。支持传入 `checkedStrategy`，没有传则取组件的配置。         | options: `checkedStrategy?: 'all' \| 'parent' \| 'child'; includeHalfChecked?: boolean;` |
| getHalfCheckedKeys  | 获取复选框半选节点的 key 值                                                      | —                                                                                        |
| getHalfCheckedNodes | 获取复选框半选的节点                                                             | —                                                                                        |
| getExpandedNodes    | 获取展开的节点                                                                   | —                                                                                        |
| checkAll            | 设置全部节点的复选框状态                                                         | checked: `boolean`                                                                       |
| checkNode           | 设置指定节点的复选框状态                                                         | key: `TreeNodeKey \| TreeNodeKey[]`<br>checked: `boolean`<br>onlyCheckLeaf: `boolean`    |
| selectAll           | 设置全部节点的选中状态                                                           | selected: `boolean`                                                                      |
| selectNode          | 设置指定节点的选中状态                                                           | key: `TreeNodeKey \| TreeNodeKey[]`<br>selected: `boolean`                               |
| expandAll           | 设置全部节点的展开状态                                                           | expanded: `boolean`                                                                      |
| expandNode          | 设置指定节点的展开状态                                                           | key: `TreeNodeKey \| TreeNodeKey[]`<br>expanded: `boolean`                               |
| filter              | 过滤节点                                                                         | keyword: ` string`                                                                       |

### Slots

| Name          | Description                                |
| ------------- | ------------------------------------------ |
| switcher-icon | 定制 switcher 图标                         |
| loading-icon  | 定制 loading 图标                          |
| type-icon     | 定制节点类型图标，开启`showTypeIcon`后可用 |
| icon          | 定制节点图标，开启`showIcon`后可用         |
| title         | 标题                                       |
| extra         | 渲染额外的节点内容                         |
| drag-icon     | 定制 drag 图标                             |

以上插槽的作用域参数为 `TreeNodeData & TreeNodeStatus` , 详见 [TreeNodeData](#treenodedata) 和 [TreeNodeStatus](#treenodestatus)。

### TreeNodeData

| 参数名          | 描述                                | 类型                                      | 默认值  |
| --------------- | ----------------------------------- | ----------------------------------------- | :-----: |
| value           | 唯一标示                            | `string \| number`                        |    —    |
| label           | 该节点显示的标题                    | `string`                                  |    —    |
| selectable      | 是否允许选中                        | `boolean`                                 | `false` |
| disabled        | 是否禁用节点                        | `boolean`                                 | `false` |
| disableCheckbox | 是否禁用复选框                      | `boolean`                                 | `false` |
| checkable       | 是否显示多选框                      | `boolean`                                 | `false` |
| draggable       | 是否可以拖拽                        | `boolean`                                 | `false` |
| isLeaf          | 是否是叶子节点。动态加载时有效      | `boolean`                                 | `false` |
| typeIcon        | 节点的类型图标                      | `(nodeInfo: TreeNodeRenderArgs) => VNode` |    —    |
| icon            | 节点的图标                          | `(nodeInfo: TreeNodeRenderArgs) => VNode` |    —    |
| switcherIcon    | 定制 switcher 图标，优先级大于 tree | `(nodeInfo: TreeNodeRenderArgs) => VNode` |    —    |
| loadingIcon     | 定制 loading 图标，优先级大于 tree  | `(nodeInfo: TreeNodeRenderArgs) => VNode` |    —    |
| dragIcon        | 定制 drag 图标，优先级大于 tree     | `() => VNode`                             |    —    |
| children        | 子节点                              | `TreeNodeData[]`                          |    —    |
| showTypeIcon    | 是否是节点类型图标                  | `boolean`                                 | `false` |
| showIcon        | 是否是节点图标                      | `boolean`                                 | `false` |

其中 `TreeNodeRenderArgs` 类型为 `TreeNodeData & TreeNodeStatus` , 详见 [TreeNodeData](#treenodedata) 和 [TreeNodeStatus](#treenodestatus)。

### TreeNodeStatus

| 参数名        | 描述         | 类型      |
| ------------- | ------------ | --------- |
| loading       | 是否加载中   | `boolean` |
| checked       | 是否勾选     | `boolean` |
| selected      | 是否选中     | `boolean` |
| expanded      | 是否展开     | `boolean` |
| indeterminate | 是否半选     | `boolean` |
| isLeaf        | 是否叶子节点 | `boolean` |

### TreeFieldNames

| 参数名          | 描述                                            | 类型     |      默认值       |
| --------------- | ----------------------------------------------- | -------- | :---------------: |
| value           | 指定 value 在 TreeNodeData 中的字段名           | `string` |      `value`      |
| label           | 指定 label 在 TreeNodeData 中的字段名           | `string` |      `label`      |
| disabled        | 指定 disabled 在 TreeNodeData 中的字段名        | `string` |    `disabled`     |
| children        | 指定 children 在 TreeNodeData 中的字段名        | `string` |    `children`     |
| isLeaf          | 指定 isLeaf 在 TreeNodeData 中的字段名          | `string` |     `isLeaf`      |
| disableCheckbox | 指定 disableCheckbox 在 TreeNodeData 中的字段名 | `string` | `disableCheckbox` |
| checkable       | 指定 checkable 在 TreeNodeData 中的字段名       | `string` |    `checkable`    |
| icon            | 指定 icon 在 TreeNodeData 中的字段名            | `string` |    `checkable`    |

### VirtualListProps

| 参数名        | 描述                                                               | 类型               | 默认值  |
| ------------- | ------------------------------------------------------------------ | ------------------ | :-----: |
| height        | 可视区域高度                                                       | `number \| string` |    —    |
| threshold     | 开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。 | `number`           |    —    |
| fixedSize     | 元素高度是否是固定的。                                             | `boolean`          | `false` |
| estimatedSize | 元素高度不固定时的预估高度。                                       | `number`           |    —    |
| buffer        | 视口边界外提前挂载的元素数量。                                     | `number`           |   `5`   |