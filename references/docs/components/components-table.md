---
title: Table
originUrl: http://192.168.219.170/docs/vue/latest/component/component/table.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/table.html)

# Table 表格

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 基本用法

简单的表格，最后一列是各种操作。

**Demo 示例**: `table/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <e-button link>
          {{ record.name }}
        </e-button>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <e-tag
            v-for="tag in record.tags"
            :key="tag"
            :type="tag === '待改进' ? 'danger' : tag.length > 5 ? '' : 'success'"
          >
            {{ tag.toUpperCase() }}
          </e-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <e-button link type="primary">邀请 一 {{ record.name }}</e-button>
          <e-divider direction="vertical" />
          <e-button link type="primary">删除</e-button>
          <e-divider direction="vertical" />
          <e-button link type="primary">
            更多操作
            <e-icon>
              <ArrowDown />
            </e-icon>
          </e-button>
        </span>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@epoint-fe/eui-icons';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    width: 180,
  },
  {
    title: '嵌套结构',
    dataIndex: ['nested', 'sub', 'name'],
  },
  {
    title: '操作',
    key: 'action',
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京市朝阳区',
    nested: { sub: { name: '子项1' } },
    tags: ['优秀', '工程师'],
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海市浦东新区',
    nested: { sub: { name: '子项2' } },
    tags: ['待改进'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '广州市天河区',
    nested: { sub: { name: '子项3' } },
    tags: ['资深', '讲师'],
  },
];
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>

```

## 切换布局

**Demo 示例**: `table/view-type`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-button-group>
    <e-button
      v-for="type in types"
      :key="type"
      @click="viewType = type"
      :type="viewType === type ? 'primary' : 'default'"
      >{{ type }}</e-button
    >
  </e-button-group>

  <e-table
    class="e-card-demo"
    :columns="columns"
    :data-source="data"
    :row-selection="rowSelection"
    :view-type="viewType"
  />
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

type ViewType = 'table' | 'card';

const types: ViewType[] = ['table', 'card'];

const viewType = ref<ViewType>('card');

// 多选表格行选择配置（用于测试）
const rowSelection = reactive({
  type: 'checkbox',
  selectedRowKeys: ['1', '2'] as string[],
  onChange: (selectedRowKeys: string[]) => {
    rowSelection.selectedRowKeys = selectedRowKeys;
  },
});

const columns = [
  {
    title: '会议名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '会议时间',
    dataIndex: 'date',
    key: 'date',
    width: 280,
  },
  {
    title: '会议室',
    dataIndex: 'room',
    key: 'room',
    width: 180,
  },
  {
    title: '线上ID',
    key: 'online_id',
    dataIndex: 'online_id',
    width: 200,
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: 160,
  },

  {
    title: '操作',
    key: 'action',
    width: 180,
    action: {
      asText: () => viewType.value !== 'card',
      maxCollapse: () => (viewType.value === 'card' ? 1 : 3),
      type: () => (viewType.value === 'card' ? 'default' : 'primary'),
      items: [
        {
          label: '分享',
          onClick: (record) => {
            console.log('分享', record);
          },
        },
        {
          label: '编辑',
          onClick: (record) => {
            console.log('编辑', record);
          },
        },
        {
          label: '设置',
          onClick: (record) => {
            console.log('设置', record);
          },
        },
        {
          label: '删除',
          type: 'danger',
          onClick: (record) => {
            console.log('删除', record);
          },
        },
      ],
    },
  },
];

function createData(len: number) {
  const result: any[] = [];
  for (let i = 0; i < len; i++) {
    result.push({
      key: (i + 1).toString(),
      name: `AI大模型产品方案--${i}`,
      date: i % 2 === 0 ? '今天 14:00-15:00' : '明天 14:00-15:00',
      room: `E80${i}`,
      online_id: '123 321 785',
      status: i % 2 === 0 ? '进行中' : '待开始',
    });
  }
  return result;
}

const data = createData(20);
</script>

<style lang="scss" scoped>
.e-card-demo {
  margin-top: 16px;
}
</style>

```

## 卡片自适应

> **💡 提示**
>
> 当开启 `card-auto-layout` 时，如果 `.e-table-card_item` 卡片容器设置了 `min-width` 样式，则会根据 `min-width` 的尺寸计算每行卡片个数，若不存在`min-width`，则根据 `cardBreakLine` 属性计算特定尺寸内每行的卡片个数， 且 `.e-table-card__body` 容器的 `gap` 也会参与计算

**Demo 示例**: `table/card-auto-layout`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table class="e-card-demo" :columns="columns" :data-source="data" view-type="card" card-auto-layout />
</template>
<script lang="ts" setup>
const columns = [
  {
    title: '会议名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '会议时间',
    dataIndex: 'date',
    key: 'date',
    width: 280,
  },
  {
    title: '会议室',
    dataIndex: 'room',
    key: 'room',
    width: 180,
  },
  {
    title: '线上ID',
    key: 'online_id',
    dataIndex: 'online_id',
    width: 200,
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: 160,
  },
];

function createData(len: number) {
  const result: any[] = [];
  for (let i = 0; i < len; i++) {
    result.push({
      key: (i + 1).toString(),
      name: `AI大模型产品方案-${i}`,
      date: i % 2 === 0 ? '今天 14:00-15:00' : '明天 14:00-15:00',
      room: `E80${i}`,
      online_id: '123 321 785',
      status: i % 2 === 0 ? '进行中' : '待开始',
    });
  }
  return result;
}

const data = createData(50);
</script>

<style scoped lang="scss">
.e-card-demo {
  height: 400px;
}
</style>

```

## 瀑布流布局

可以通过 `card-waterfall` 属性开启瀑布流布局

> **💡 提示**
>
> 瀑布流布局仅在开启 `card-auto-layout` 卡片自适应布局时生效

**Demo 示例**: `table/card-waterfall-layout`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table
    class="e-card-demo"
    :columns="columns"
    :data-source="data"
    :row-selection="rowSelection"
    :view-type="viewType"
    card-auto-layout
    card-waterfall
  />
</template>
<script setup>
import { reactive, ref } from 'vue';

const viewType = ref('card');

// 多选表格行选择配置（用于测试）
const rowSelection = reactive({
  type: 'checkbox',
  selectedRowKeys: ['1', '2'],
  onChange: (selectedRowKeys) => {
    rowSelection.selectedRowKeys = selectedRowKeys;
  },
});

const columns = [
  {
    title: '会议名称',
    dataIndex: 'name',
    key: 'name',
    filters: [
      {
        text: 'E800',
        value: 'E800',
      },
      {
        text: 'E801',
        value: 'E801',
      },
    ],
    onFilter: (value, record) => record.room === value,
  },
  {
    title: '会议时间',
    dataIndex: 'date',
    key: 'date',
    width: 280,
  },
  {
    title: '会议室',
    dataIndex: 'room',
    key: 'room',
    width: 180,
  },
  {
    title: '线上ID',
    key: 'online_id',
    dataIndex: 'online_id',
    width: 200,
    sorter: (a, b) => a.online_id - b.online_id,
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: 160,
  },
  {
    title: '内容',
    key: 'content',
    dataIndex: 'content',
    width: 160,
  },

  {
    title: '操作',
    key: 'action',
    width: 180,
    action: {
      asText: () => viewType.value !== 'card',
      maxCollapse: () => (viewType.value === 'card' ? 1 : 3),
      type: () => (viewType.value === 'card' ? 'default' : 'primary'),
      items: [
        {
          label: '分享',
          onClick: (record) => {
            console.log('分享', record);
          },
        },
        {
          label: '编辑',
          onClick: (record) => {
            console.log('编辑', record);
          },
        },
        {
          label: '设置',
          onClick: (record) => {
            console.log('设置', record);
          },
        },
        {
          label: '删除',
          type: 'danger',
          onClick: (record) => {
            console.log('删除', record);
          },
        },
      ],
    },
  },
];

function createData(len) {
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push({
      key: (i + 1).toString(),
      name: `AI大模型产品方案汇报-${i}`,
      date: i % 2 === 0 ? '今天 14:00-15:00' : '明天 14:00-15:00',
      room: `E80${i}`,
      online_id: 100 + i,
      status: i % 2 === 0 ? '进行中' : '待开始',
      content: randomString(5, 100),
    });
  }
  return result;
}

function randomString(min, max) {
  const chars = '啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎';
  let result = '';
  const len = Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const data = createData(20);
</script>

<style lang="scss" scoped>
.e-card-demo {
  height: 400px;
}
</style>

```

## 自定义卡片内容

**Demo 示例**: `table/card-custom`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table
    class="e-card-demo"
    :columns="columns"
    :data-source="data"
    :row-selection="rowSelection"
    view-type="card"
    card-auto-layout
  >
    <template #bodyRow="{ record, selectionNode, actionNode }">
      <e-card class="card-item" :key="record.key">
        <template #header>
          <div class="card-header">
            <e-avatar shape="square" :size="50" :src="record.avatar" />
            <div>
              <component class="card-selection" v-if="selectionNode" :is="selectionNode" />
              <e-tag :type="record.status === '进行中' ? 'success' : 'warning'">{{ record.status }}</e-tag>
              <component v-if="actionNode" :is="actionNode" />
            </div>
          </div>
        </template>
        <p>{{ record.name }}</p>
        <span>{{ record.date }}</span>
        <div class="room-info">
          <span>会议室： {{ record.room }}</span>
          <e-divider direction="vertical" />
          <span>线上： {{ record.online_id }}</span>
        </div>
        <e-avatar-group class="avatar-list" :avatar-list="record.personal" :max-count="3" />
      </e-card>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

// 多选表格行选择配置（用于测试）
const rowSelection = reactive({
  type: 'checkbox',
  selectedRowKeys: ['1', '2'] as string[],
  onChange: (selectedRowKeys: string[]) => {
    rowSelection.selectedRowKeys = selectedRowKeys;
  },
});

const columns = [
  {
    title: '会议名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '会议时间',
    dataIndex: 'date',
    key: 'date',
    width: 280,
  },
  {
    title: '会议室',
    dataIndex: 'room',
    key: 'room',
    width: 180,
  },
  {
    title: '线上ID',
    key: 'online_id',
    dataIndex: 'online_id',
    width: 200,
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: 160,
  },
  {
    title: '参会人员',
    key: 'avatarList',
    dataIndex: 'avatarList',
    width: 180,
  },
  {
    title: '操作',
    key: 'action',
    width: 180,
    action: {
      asText: () => false,
      maxCollapse: () => 1,
      type: () => 'default',
      items: [
        {
          label: '分享',
          onClick: (record) => {
            console.log('分享', record);
          },
        },
        {
          label: '编辑',
          onClick: (record) => {
            console.log('编辑', record);
          },
        },
        {
          label: '设置',
          onClick: (record) => {
            console.log('设置', record);
          },
        },
        {
          label: '删除',
          type: 'danger',
          onClick: (record) => {
            console.log('删除', record);
          },
        },
      ],
    },
  },
];

function createData(len: number) {
  const result: any[] = [];
  for (let i = 0; i < len; i++) {
    result.push({
      key: (i + 1).toString(),
      name: `AI大模型产品方案汇报-${i}`,
      date: i % 2 === 0 ? '今天 14:00-15:00' : '明天 14:00-15:00',
      room: `E80${i}`,
      online_id: '123 321 785',
      status: i % 2 === 0 ? '进行中' : '待开始',
      avatar: 'https://picsum.photos/200/200/?random=' + i,
      personal: [
        { src: 'https://picsum.photos/200/200/?random=1', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=2', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=3', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=4', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=5', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=6', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=7', alt: '用户头像' },
        { src: 'https://picsum.photos/200/200/?random=8', alt: '用户头像' },
      ],
    });
  }
  return result;
}

const data = createData(20);
</script>

<style scoped lang="scss">
.e-card-demo {
  margin-top: 20px;
  height:400px;

  .card-item {
    padding: var(--e-space-xl);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .card-more {
        height: 24px;
        outline: none !important;
        margin-left: 12px;
      }
      :deep(.card-selection) {
        height: 24px;
      }
    }
    p {
      margin: 12px 0;
    }

    .room-info {
      span {
        font-size: 14px;
        color: var(--e-text-color-secondary);
      }
    }

    .avatar-list {
      margin-top: 16px;
    }
  }
}
</style>

```

## 远程加载数据

这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。

另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的 onFilter 和 sorter 函数，而是在把筛选和排序的参数发到服务端来处理。

当使用 rowSelection 时，请设置 rowSelection.preserveSelectedRowKeys 属性以保留 key。

**Demo 示例**: `table/ajax`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :row-key="record => record.login.uuid" :data-source="dataSource" :pagination="pagination"
    :loading="loading" @change="handleTableChange">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import type { TableProps } from '@epoint-fe/eui-components';
import axios from 'axios';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    // filters: [
    //   { text: '男', value: 'male' },
    //   { text: '女', value: 'female' },
    // ],
    width: '20%',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
];

type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};
type APIResult = {
  results: {
    gender: 'female' | 'male';
    name: string;
    email: string;
  }[];
};

const queryData = (params: APIParams) => {
  return axios.get<APIResult>('https://randomuser.me/api?noinfo', { params });
};

const current = ref(1)
const pageSize = ref(10)
const dataSource = ref([])
const pagination = reactive({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
});
const loading = ref(false);

const getData = (params?: any) => {
  loading.value = true;
  queryData({
    results: pagination.pageSize,
    page: pagination.current,
    ...params
  }).then((res) => {
    dataSource.value = res.data.results;
    loading.value = false;

    console.log(res)
  }).catch((err) => {
    loading.value = false;
  });
}
const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
) => {
  pagination.pageSize = pag.pageSize;
  pagination.current = pag.current;

  getData({
    sortField: sorter.field,
    sortOrder: sorter.order
  })
};

getData()
</script>

```

## 带边框

**Demo 示例**: `table/bordered`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <div>
    <e-radio-group v-model="borderStyle" label="边框控制">
      <e-radio-button value="none">无边框</e-radio-button>
      <e-radio-button value="horizontal">行边框</e-radio-button>
      <e-radio-button value="full">全边框</e-radio-button>
    </e-radio-group>
  </div>
  <br />
  <e-table :columns="columns" :data-source="data" :borderStyle="borderStyle">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link>{{ text }}</e-button>
      </template>
    </template>
    <template #title>表头</template>
    <template #footer>表尾</template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

type BorderStyle = boolean | 'none' | 'horizontal' | 'full';
const borderStyle = ref<BorderStyle>('full');

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '现金资产',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    money: '￥300,000.00',
    address: '北京市朝阳区第一公园',
  },
  {
    key: '2',
    name: '李四',
    money: '￥1,256,000.00',
    address: '上海市浦东新区第一公园',
  },
  {
    key: '3',
    name: '王五',
    money: '￥120,000.00',
    address: '广州市天河区第一公园',
  },
];
</script>
<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>

```

## 单元格自动省略

设置 `column.ellipsis` 可以让单元格内容根据宽度自动省略。

> 列头缩略暂不支持和排序筛选一起使用。

**Demo 示例**: `table/ellipsis`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <div style="margin-bottom: 16px">
    <e-switch v-model="ellipsisEnabled" />
    <span style="margin-left: 8px">{{ ellipsisEnabled ? '开启省略' : '关闭省略' }}</span>
  </div>
  <e-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link>{{ text }}</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';

const ellipsisEnabled = ref(true);

const baseColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 80,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address 1',
  },
  {
    title: '长文本列',
    dataIndex: 'address',
    key: 'address 2',
  },
  {
    title: '长文本列',
    dataIndex: 'address',
    key: 'address 3',
  },
  {
    title: '长文本列',
    dataIndex: 'address',
    key: 'address 4',
  },
];

const columns = computed(() => {
  return baseColumns.map(column => {
    if (column.dataIndex === 'address') {
      return {
        ...column,
        ellipsis: ellipsisEnabled.value,
        customCell: ellipsisEnabled.value ? undefined : () => ({
          style: {
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          },
        }),
      };
    }
    return column;
  });
});

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京市朝阳区第一公园，北京市朝阳区第一公园',
    tags: ['优秀', '开发'],
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海市浦东新区第二公园，上海市浦东新区第二公园',
    tags: ['新手'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '广州市天河区第一公园，广州市天河区第一公园',
    tags: ['优秀', '教师'],
  },
];
</script>
```

## 表格行/列合并

表头只支持列合并，使用 column 里的 colSpan 进行设置。

表格内容支持行/列合并，`customCell` 中返回对应的 colSpan 或者 rowSpan 即可。当一个单元格的 colSpan 或者 rowSpan 设值为 0 时，不会渲染。

此配置你可以自由设置任何单元格的合并，但需要注意合并的单元格不能有交叉的情况。 如果你只是希望一列中相同值的单元格合并，可以使用下方的 `merge-columns` 配置。

> **⚠️ 警告**
>
> 行列合并的设置位置应该是起始的一个行/列，后续相关行/列设置为 0。
> 
> 如果需要合并第一、第二、第三列，则在起始列第一列 设置 colSpan 为 3，在第二、第三列设置 colSpan 为 0；不能在 第一列设置 0，第二列设置 3，第三列设置 0。

**Demo 示例**: `table/colspan-rowspan`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" borderStyle="full">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a href="javascript:;">{{ text }}</a>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
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

```

## 合并指定列

通过 `merge-columns` 配置，将指定列值相同的单元格合并。

> `merge-columns` 支持以下配置方式：
>
> 1. 字符串 dataIndex：直接使用字段名，如 `'name'`
> 2. 数组 dataIndex：使用点号连接形式，如 `'store.name'` 对应 `dataIndex: ['store', 'name']`
> 3. column.key：如果列定义了 `key` 属性，可使用 key 值或 dataIndex 点号形式，任一匹配即可

**Demo 示例**: `table/merge-columns`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" :merge-columns="mergeColumns" borderStyle="full" />
</template>

<script setup>
import { ref } from 'vue';

const mergeColumns = ref(['rowIndex', 'company.name', 'company.address']);

const data = [
  {
    rowIndex: '1',
    company: {
      name: '广西农业',
      address: '广西南宁市',
    },
    type: '汽油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '1',
    company: {
      name: '广西农业',
      address: '广西南宁市',
    },
    type: '柴油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '2',
    company: {
      name: '广西工业',
      address: '广西柳州市',
    },
    type: '汽油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '2',
    company: {
      name: '广西工业',
      address: '广西柳州市',
    },
    type: '柴油',
    unit: '吨',
    sales: '600',
    price: '5000',
  },
];

const columns = [
  {
    title: '序号',
    dataIndex: 'rowIndex',
    width: 100,
  },
  {
    title: '公司名称',
    dataIndex: ['company', 'name'],
  },
  {
    title: '公司地址',
    dataIndex: ['company', 'address'],
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '单位',
    dataIndex: 'unit',
  },
  {
    title: '销量',
    dataIndex: 'sales',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
];
</script>

```

## 合并任意单元格

通过 `merge-cells` 配置，合并指定单元格。

> **⚠️ 警告**
>
> 配置 `merge-cells` 后 `merge-columns` 将无效。

**Demo 示例**: `table/merge-cells`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" :mergeCells="mergeCells" borderStyle="full" />
</template>

<script setup>
import { ref } from 'vue';

const mergeCells = ref([
  { rowIndex: 0, columnIndex: 3, rowSpan: 3 },
  { rowIndex: 2, columnIndex: 1, rowSpan: 2, colSpan: 3 },
]);

const data = [
  {
    rowIndex: '1',
    company: '广西农业',
    type: '汽油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '1',
    company: '广西农业',
    type: '柴油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '2',
    company: '广西工业',
    type: '汽油',
    unit: '吨',
    sales: '500',
    price: '5000',
  },
  {
    rowIndex: '2',
    company: '广西工业',
    type: '柴油',
    unit: '吨',
    sales: '600',
    price: '5000',
  },
];

const columns = [
  {
    title: '序号',
    dataIndex: 'rowIndex',
    width: 100,
  },
  {
    title: '公司',
    dataIndex: 'company',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '单位',
    dataIndex: 'unit',
  },
  {
    title: '销量',
    dataIndex: 'sales',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
];
</script>

```

## 操作按钮配置

通过 `column.action` 快捷配置表格的列操作功能。

**Demo 示例**: `table/actions`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table ref="tableRef" :columns="columns" :data-source="data" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Delete, Edit, Save, Rollback, Setting } from '@epoint-fe/eui-icons';

const tableRef = ref();

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    editor: {
      component: 'e-input',
      props: {
        placeholder: '请输入名称',
      },
    },
    rules: [
      { type: 'string', required: true, message: '姓名不能为空' },
      { type: 'string', min: 2, message: '姓名最少2个字符' },
    ],
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 180,
    editor: {
      component: 'e-date-picker',
      props: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请选择日期',
      },
    },
  },
  {
    title: '颜色',
    dataIndex: 'color',
    key: 'color',
    width: 150,
    editor: {
      component: 'e-color-picker',
    },
  },

  {
    title: '嵌套结构',
    dataIndex: ['nested', 'sub', 'name'],
    width: 150,
    editor: {
      component: 'e-input',
    },
  },
  {
    title: '评分',
    dataIndex: 'score',
    key: 'score',
    width: 150,
    editor: {
      component: 'e-input-number',
      props: {
        max: 100,
      },
    },
  },
  {
    title: '操作',
    key: 'action',
    action: {
      items: [
        {
          icon: Edit,
          label: '编辑',
          visible: (params) => !params.isRowEditing,
          onClick(record) {
            tableRef.value?.beginEditRow(record);
          },
        },
        {
          icon: Save,
          label: '保存',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.commitEditRow(record);
          },
        },
        {
          icon: Rollback,
          label: '取消',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.cancelEditRow(record);
          },
        },
        {
          icon: Delete,
          label: '删除',
          onClick(record) {
            tableRef.value?.deleteRow(record);
          },
        },
        {
          icon: Setting,
          label: '设置',
          onClick(record) {
            console.log(record);
          },
        },
      ],
    },
  },
];

function createRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createData(length: number = 20) {
  const data = [] as Array<any>;
  for (let i = 1; i <= length; i++) {
    data.push({
      key: i.toString(),
      name: `产品${i}`,
      date: `2025-04-02`,
      color: createRandomColor(),
      tags: ['标签1', '标签2', '标签3'],
      nested: { sub: { name: `子项${i}` } },
      score: Math.floor(Math.random() * 100),
    });
  }
  return data;
}

const data = createData();
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}

.mb-10 {
  margin-bottom: 10px;
}
</style>

```

## 可编辑单元格

> **⚠️ 警告**
>
> 无法编辑已合并的单元格。

**Demo 示例**: `table/edit-cell`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-button type="primary" @click="getChanges">获取编辑数据</e-button>
  <e-button type="primary" @click="reject">还原编辑数据</e-button>

  <e-table ref="tableRef" :columns="columns" :data-source="data" @edit-cell-change="onCellChange">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tags'">{{ record.tags.join(', ') }} </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { EInput, ESelect } from '@eui-components/components';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    editor: {
      component: (props) => h(EInput, props),
      props: {
        placeholder: '请输入名称',
      },
    },
    rules: [
      { type: 'string', required: true, message: '姓名不能为空' },
      { type: 'string', min: 2, message: '姓名最少2个字符' },
    ],
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 180,
    editor: {
      component: 'e-date-picker',
      props: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请选择日期',
      },
    },
  },
  {
    title: '颜色',
    dataIndex: 'color',
    key: 'color',
    width: 150,
    editor: {
      component: 'e-color-picker',
    },
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    width: 240,
    editor: {
      component: (props) => h(ESelect, props),
      props: {
        multiple: true,
        options: [
          { label: '标签1', value: '标签1' },
          { label: '标签2', value: '标签2' },
        ],
      },
    },
  },
];

const tableRef = ref();

function createRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createData(length: number = 20) {
  const data = [] as Array<any>;
  for (let i = 1; i <= length; i++) {
    data.push({
      key: i.toString(),
      name: `产品${i}`,
      date: `2025-04-02`,
      color: createRandomColor(),
      tags: ['标签1', '标签2'],
    });
  }
  return data;
}

const data = ref(createData());

const reject = () => {
  tableRef.value?.reject();
};

const getChanges = () => {
  const modified = tableRef.value?.getChanges();
  console.log('modified', modified);
};

const onCellChange = (changed) => {
  console.log('cell changes', changed);
};
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>

```

## 可编辑行

带行编辑功能的表格。

**Demo 示例**: `table/edit-row`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <div>
    <e-button type="primary" @click="addRow">添加行</e-button>
    <e-button type="primary" @click="getChanges">获取编辑数据</e-button>
  </div>
  <br />
  <e-table ref="tableRef" :columns="columns" :data-source="data" :cell-editable="false" @edit-row-change="onRowChange">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tags'">
        <span>
          <e-tag v-for="tag in record.tags" :key="tag">
            {{ tag }}
          </e-tag>
        </span>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Delete, Edit, Save, Rollback } from '@epoint-fe/eui-icons';

const tableRef = ref();

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 130,
    editor: {
      component: 'e-input',
      props: {
        placeholder: '请输入名称',
      },
    },
    rules: [
      { type: 'string', required: true, message: '姓名不能为空' },
      { type: 'string', min: 2, message: '姓名最少2个字符' },
    ],
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 170,
    editor: {
      component: 'e-date-picker',
      props: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请选择日期',
      },
    },
  },
  {
    title: '颜色',
    dataIndex: 'color',
    key: 'color',
    width: 120,
    editor: {
      component: 'e-color-picker',
    },
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    width: 240,
    editor: {
      component: 'e-select',
      props: {
        multiple: true,
        options: [
          { label: '标签1', value: '标签1' },
          { label: '标签2', value: '标签2' },
        ],
      },
      rules: [{ required: true, message: '标签不能为空' }],
    },
  },
  {
    title: '操作',
    key: 'action',
    action: {
      items: [
        {
          icon: Edit,
          label: '编辑',
          visible: (params) => !params.isRowEditing,
          onClick(record) {
            tableRef.value?.beginEditRow(record);
          },
        },
        {
          icon: Save,
          label: '提交',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.commitEditRow(record);
          },
        },
        {
          icon: Rollback,
          label: '取消',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.cancelEditRow(record);
          },
        },
        {
          icon: Delete,
          label: '删除',
          onClick(record) {
            tableRef.value?.deleteRow(record);
          },
        },
      ],
    },
  },
];

function createRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createData(length: number = 20) {
  const data = [] as Array<any>;
  for (let i = 1; i <= length; i++) {
    data.push({
      key: i.toString(),
      name: `产品${i}`,
      date: `2025-04-02`,
      color: createRandomColor(),
      tags: ['标签1', '标签2'],
    });
  }
  return data;
}

const data = ref(createData());

const addRow = () => {
  tableRef.value?.addRow({
    record: {
      name: '',
      date: '',
      color: '',
      tags: [],
    },
    position: 'top',
    editable: true,
  });
};

const getChanges = () => {
  const edited = tableRef.value?.getChanges();
  console.log('edited', edited);
};

const onRowChange = (record, oldRecord) => {
  console.log('row changes', record, oldRecord);
};
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>

```

## 编辑全部

使用 `beginEdit` 开启所有单元格的编辑状态。

**Demo 示例**: `table/edit-all`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <div>
    <e-button type="primary" @click="beginEdit">编辑全部</e-button>
    <e-button type="primary" @click="cancelEdit">取消编辑</e-button>
    <e-button type="primary" @click="commitEdit">提交编辑</e-button>
    <e-button type="primary" @click="acceptEdit">接受编辑</e-button>
    <e-button type="primary" @click="getChanges">获取编辑数据</e-button>
    <e-button type="primary" @click="reject">重置编辑</e-button>
  </div>
  <br />
  <e-table ref="tableRef" :columns="columns" :data-source="data" @edit-change="onEditChange" @change="onChange">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tags'">
        <span>
          <e-tag v-for="tag in record.tags" :key="tag">
            {{ tag }}
          </e-tag>
        </span>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import { Delete, Edit, Save, Rollback } from '@epoint-fe/eui-icons';

const tableRef = ref();

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 130,
    editor: {
      component: 'e-input',
      props: {
        placeholder: '请输入名称',
      },
    },
    rules: [
      { type: 'string', required: true, message: '姓名不能为空' },
      { type: 'string', min: 2, message: '姓名最少2个字符' },
    ],
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 170,
    editor: {
      component: 'e-date-picker',
      props: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请选择日期',
      },
    },
  },
  {
    title: '颜色',
    dataIndex: 'color',
    key: 'color',
    width: 120,
    editor: {
      component: 'e-color-picker',
    },
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    width: 240,
    editor: {
      component: 'e-select',
      props: {
        multiple: true,
        options: [
          { label: '标签1', value: '标签1' },
          { label: '标签2', value: '标签2' },
        ],
      },
      rules: [{ required: true, message: '标签不能为空' }],
    },
  },
  {
    title: '操作',
    key: 'action',
    action: {
      asText: true,
      items: [
        {
          icon: Edit,
          label: '编辑',
          visible: (params) => !params.isRowEditing,
          onClick(record) {
            tableRef.value?.beginEditRow(record);
          },
        },
        {
          icon: Save,
          label: '提交',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.commitEditRow(record);
          },
        },
        {
          icon: Rollback,
          label: '取消',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.cancelEditRow(record);
          },
        },
        {
          icon: Delete,
          label: '删除',
          onClick(record) {
            tableRef.value?.deleteRow(record);
          },
        },
      ],
    },
  },
];

function createRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createData(length: number = 20) {
  const data = [] as Array<any>;
  for (let i = 1; i <= length; i++) {
    data.push({
      key: i.toString(),
      name: `产品${i}`,
      date: `2025-04-02`,
      color: createRandomColor(),
      tags: ['标签1', '标签2'],
    });
  }
  return data;
}

const data = ref(createData());

const getChanges = () => {
  const edited = tableRef.value?.getChanges();
  console.log('edited', edited);
};

const beginEdit = () => {
  tableRef.value?.beginEdit();
};

const commitEdit = () => {
  tableRef.value?.commitEdit();
};

const cancelEdit = () => {
  tableRef.value?.cancelEdit();
};

const acceptEdit = () => {
  tableRef.value?.accept();
};

const reject = () => {
  tableRef.value?.reject();
};

const onEditChange = (value, oldValue) => {
  console.log('edit changes', value, oldValue);
};

const onChange = () => {
  nextTick(() => {
    tableRef.value?.beginEdit();
  });
};

onMounted(() => {
  // 进入页面后自动开启编辑全部行
  tableRef.value?.beginEdit();
});
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>

```

## 联动编辑

使用 `editCellChange` 事件和 `getCellEditor` 方法可实现单元格联动编辑。

**Demo 示例**: `table/edit-link`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table
    ref="tableRef"
    :columns="columns"
    :data-source="data"
    :before-edit="onBeforeEdit"
    :cell-editable="true"
    @edit-cell-change="onCellChange"
  />
</template>
<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { Edit, Save, Rollback } from '@epoint-fe/eui-icons';

const tableRef = ref();

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    editor: {
      component: 'e-input',
      props: {
        placeholder: '请输入名称',
      },
    },
    rules: [
      { type: 'string', required: true, message: '姓名不能为空' },
      { type: 'string', min: 2, message: '姓名最少2个字符' },
    ],
  },
  {
    title: '部门',
    dataIndex: 'dept_name',
    key: 'dept_name',
    width: 200,
    editor: {
      component: 'e-select',
      props: {
        options: [
          { label: '财务部', value: '1' },
          { label: '人事部', value: '2' },
          { label: '研发部', value: '3' },
        ],
      },
    },
  },
  {
    title: '职务',
    dataIndex: 'position_name',
    key: 'position_name',
    width: 200,
    editor: {
      component: 'e-select',
    },
  },
  {
    title: '操作',
    key: 'action',
    action: {
      asText: true,
      items: [
        {
          icon: Edit,
          label: '编辑',
          visible: (params) => !params.isRowEditing,
          onClick(record) {
            tableRef.value?.beginEditRow(record);
          },
        },
        {
          icon: Save,
          label: '提交',
          onClick(record) {
            tableRef.value?.commitEditRow(record);
          },
        },
        {
          icon: Rollback,
          label: '取消',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.cancelEditRow(record);
          },
        },
      ],
    },
  },
];

const data = ref([
  {
    key: '1',
    name: '张三',
    dept_name: '研发部',
    position_name: '工程师',
  },
  {
    key: '2',
    name: '李四',
    dept_name: '人事部',
    position_name: '招聘专员',
  },
  {
    key: '3',
    name: '王五',
    dept_name: '财务部',
    position_name: '财务总监',
  },
]);

const getOptions = (name) => {
  let options: any[] = [];

  if (name === '人事部') {
    options = [
      { label: '招聘专员', value: '招聘专员' },
      { label: '人事主管', value: '人事主管' },
      { label: '人事经理', value: '人事经理' },
    ];
  } else if (name === '研发部') {
    options = [
      { label: '工程师', value: '工程师' },
      { label: '高级工程师', value: '高级工程师' },
      { label: '研发经理', value: '研发经理' },
    ];
  } else if (name === '财务部') {
    options = [
      { label: '会计', value: '会计' },
      { label: '出纳', value: '出纳' },
      { label: '财务总监', value: '财务总监' },
    ];
  }

  return options;
};

const onBeforeEdit = (params) => {
  const { record } = params;

  const positionEditor = tableRef.value?.getCellEditor(record, 'position_name');
  const deptEditor = tableRef.value?.getCellEditor(record, 'dept_name');

  positionEditor.updateEditProps({
    options: getOptions(deptEditor.getEditValue()),
  });
};

// editStatus 用于处理取消行编辑后联动编辑再次打开的问题
let editStatus = {};

const onCellChange = (params) => {
  const { record, column, value } = params;
  if (column.dataIndex === 'dept_name') {
    const positionEditor = tableRef.value?.getCellEditor(record, 'position_name');

    const key = record.key + '-position_name';

    if (!editStatus[key]) {
      positionEditor.beginEditCell();
      nextTick(() => {
        positionEditor.setEditValue('');
      });
      editStatus[key] = true;
    } else {
      positionEditor.updateEditProps({
        options: getOptions(value),
      });
      positionEditor.setEditValue('');
      editStatus[key] = positionEditor.isEditing;
    }
  }
};
</script>

```

## 树形数据展示

表格支持树形数据的展示，当数据中有 children 字段时会自动展示为树形表格，如果不需要或配置为其他字段可以用 childrenColumnName 进行配置。 可以通过设置 indentSize 以控制每一层的缩进宽度。

**Demo 示例**: `table/expand-children`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  严格选择: <e-switch v-model="rowSelection.checkStrictly"></e-switch>
  <e-table :columns="columns" :data-source="data" :row-selection="rowSelection" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    key: 1,
    name: '张大明',
    age: 60,
    address: '北京市朝阳区第一公园',
    children: [
      {
        key: 11,
        name: '张小明',
        age: 42,
        address: '北京市朝阳区第二公园',
      },
      {
        key: 12,
        name: '张小华',
        age: 30,
        address: '北京市朝阳区第三公园',
        children: [
          {
            key: 121,
            name: '张华华',
            age: 16,
            address: '北京市朝阳区第三公园',
          },
        ],
      },
      {
        key: 13,
        name: '李大明',
        age: 72,
        address: '上海市浦东新区第一公园',
        children: [
          {
            key: 131,
            name: '李小明',
            age: 42,
            address: '上海市浦东新区第二公园',
            children: [
              {
                key: 1311,
                name: '李小华',
                age: 25,
                address: '上海市浦东新区第三公园',
              },
              {
                key: 1312,
                name: '李华华',
                age: 18,
                address: '上海市浦东新区第四公园',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: '王大明',
    age: 32,
    address: '广州市天河区第一公园',
  },
];

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows);
  },
});
</script>

```

## 可展开

当表格内容较多不能一次性完全展示时。

**Demo 示例**: `table/expand`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table
    :columns="columns"
    :data-source="data"
    :row-expandable="() => true"
    :scroll="{ x: 800 }"
    :expand-column-width="100"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action'">
        <e-button link type="primary">删除</e-button>
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <p style="margin: 0">
        {{ record.description }}
      </p>
    </template>
    <template #expandColumnTitle>
      <span style="color: red">更多</span>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name', fixed: true },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '操作', key: 'action' },
];

const data = [
  {
    key: 1,
    name: '张三',
    age: 32,
    address: '北京市朝阳区第一公园',
    description: '我叫张三，今年32岁，住在北京市朝阳区第一公园。',
  },
  {
    key: 2,
    name: '李四',
    age: 42,
    address: '上海市浦东新区第一公园',
    description: '我叫李四，今年42岁，住在上海市浦东新区第一公园。',
  },
  {
    key: 3,
    name: '王五',
    age: 32,
    address: '广州市天河区第一公园',
    description: '我叫王五，今年32岁，住在广州市天河区第一公园。',
  },
];
</script>

```

## 固定头和列

适合同时展示有大量数据和数据列。

> 若列头与内容不对齐或出现列重复，请指定**固定列**的宽度 `width`。如果指定 `width` 不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。

> 建议指定 `scroll.x` 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 `scroll.x`。

**Demo 示例**: `table/fixed-columns-header`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <e-button link type="primary">操作</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
const columns: TableColumnsType = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '列 1', dataIndex: 'address', key: '1', width: 160 },
  { title: '列 2', dataIndex: 'address', key: '2', width: 160 },
  { title: '列 3', dataIndex: 'address', key: '3', width: 160 },
  { title: '列 4', dataIndex: 'address', key: '4', width: 160 },
  { title: '列 5', dataIndex: 'address', key: '5', width: 160 },
  { title: '列 6', dataIndex: 'address', key: '6', width: 160 },
  { title: '列 7', dataIndex: 'address', key: '7', width: 160 },
  { title: '列 8', dataIndex: 'address', key: '8', width: 160 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `张三 ${i}`,
    age: 32,
    address: `张家港第 ${i} 号`,
  });
}
</script>

```

## 固定列

对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 `scroll.x` 配合使用。

> 若列头与内容不对齐或出现列重复，请指定**固定列**的宽度 `width`。如果指定 `width` 不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。

> 建议指定 `scroll.x` 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 `scroll.x`。

**Demo 示例**: `table/fixed-columns`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <e-button link type="primary">操作</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>

const columns = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '列 1', dataIndex: 'address', key: '1' },
  { title: '列 2', dataIndex: 'address', key: '2' },
  { title: '列 3', dataIndex: 'address', key: '3' },
  { title: '列 4', dataIndex: 'address', key: '4' },
  { title: '列 5', dataIndex: 'address', key: '5' },
  { title: '列 6', dataIndex: 'address', key: '6' },
  { title: '列 7', dataIndex: 'address', key: '7' },
  { title: '列 8', dataIndex: 'address', key: '8' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '张家港公园',
  },
  {
    key: '2',
    name: '李四',
    age: 40,
    address: '张家港公园',
  },
];
</script>

```

## 固定表头

方便一页内展示大量数据。

> 需要指定 column 的 `width` 属性，否则列头和内容可能不对齐。如果指定 `width` 不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。

**Demo 示例**: `table/fixed-header`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" :pagination="{ pageSize: 50 }" :scroll="{ y: 240 }" />
</template>
<script lang="ts" setup>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const data = [...Array(100)].map((_, i) => ({
  key: i,
  name: `张三 ${i}`,
  age: 32,
  address: `张家港第 ${i} 号`,
}));
</script>

```

## 隐藏列

使用 hidden 隐藏列。

> 需要指定 column 的 `hidden` 属性为 true

**Demo 示例**: `table/hidden-columns`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <div>
    <e-button
      v-for="(item, index) in columns"
      :key="index"
      :type="item.hidden ? 'default' : 'primary'"
      @click="changeVisible(item)"
      >{{ item.title }}</e-button
    >
  </div>
  <br />
  <e-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <e-button link type="primary">操作</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

interface ColumnItem {
  title: string;
  width?: number;
  dataIndex?: string;
  key: string;
  hidden: boolean;
}

const columns = ref<ColumnItem[]>([
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', hidden: false },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', hidden: false },
  { title: '列 1', dataIndex: 'address', key: '1', hidden: false },
  { title: '列 2', dataIndex: 'address', key: '2', hidden: false },
  { title: '列 3', dataIndex: 'address', key: '3', hidden: false },
  { title: '列 4', dataIndex: 'address', key: '4', hidden: false },
  {
    title: '操作',
    key: 'operation',
    hidden: false,
    width: 100,
  },
]);

const changeVisible = (item: ColumnItem) => {
  item.hidden = !item.hidden;
};

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '张家港公园',
  },
  {
    key: '2',
    name: '李四',
    age: 40,
    address: '张家港公园',
  },
];
</script>

```

## 表头分组

`columns[n]` 可以内嵌 `children`，以渲染分组表头。

**Demo 示例**: `table/grouping-columns`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" borderStyle="full" size="middle" :scroll="{ x: 'calc(700px + 50%)', y: 240 }" />
</template>
<script lang="ts" setup>
type TableDataType = {
  key: number;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
};
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
    // onFilter: (value: string, record: TableDataType) => record.name.indexOf(value) === 0,
  },
  {
    title: '其他信息',
    children: [
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 80,
        sorter: (a: TableDataType, b: TableDataType) => a.age - b.age,
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

```

## 多列排序

`column.sorter` 支持 `multiple` 字段以配置多列排序优先级。通过 `sorter.compare` 配置排序逻辑，你可以通过不设置该函数只启动多列排序的交互形式。

**Demo 示例**: `table/multiple-sorter`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" @change="onChange" />
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '语文成绩',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: '数学成绩',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: '英语成绩',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: '李四',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: '王五',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: '赵六',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('参数', pagination, filters, sorter, extra);
}
</script>

```

## 嵌套子表格

展示每行数据更详细的信息。

**Demo 示例**: `table/nested-table`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" :row-expandable="() => true" class="components-table-demo-nested">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <e-button link type="primary">发布</e-button>
      </template>
    </template>
    <template #expandedRowRender>
      <e-table :columns="innerColumns" :data-source="innerData" :pagination="false">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'state'">
            <span>
              <e-badge status="success" />
              已完成
            </span>
          </template>
          <template v-else-if="column.key === 'operation'">
            <span class="table-operation">
              <e-button link type="primary">暂停</e-button>
              <e-button link type="primary">停止</e-button>
              <e-dropdown>
                <template #dropdown>
                  <e-dropdown-menu>
                    <e-dropdown-item>操作 1</e-dropdown-item>
                    <e-dropdown-item>操作 2</e-dropdown-item>
                  </e-dropdown-menu>
                </template>
                <e-button link type="primary">
                  更多
                  <e-icon class="e-icon--right">
                    <arrow-down />
                  </e-icon>
                </e-button>
              </e-dropdown>
            </span>
          </template>
        </template>
      </e-table>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@epoint-fe/eui-icons';
const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '平台', dataIndex: 'platform', key: 'platform' },
  { title: '版本', dataIndex: 'version', key: 'version' },
  { title: '升级次数', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: '创建者', dataIndex: 'creator', key: 'creator' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', key: 'operation' },
];

interface DataItem {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: `屏幕 ${i + 1}`,
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: '张三',
    createdAt: '2014-12-24 23:12:00',
  });
}

const innerColumns = [
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '状态', key: 'state' },
  { title: '升级状态', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
];

interface innerDataItem {
  key: number;
  date: string;
  name: string;
  upgradeNum: string;
}

const innerData: innerDataItem[] = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    name: `这是产品名称 ${i + 1}`,
    upgradeNum: '已升级: 56',
  });
}
</script>

<style scoped>
.e-dropdown {
  margin-left: 12px;
  vertical-align: middle;
}
</style>

```

## 筛选和排序

对某一列数据进行筛选，使用列的 `filters` 属性来指定需要筛选菜单的列，`onFilter` 用于筛选当前数据，`filterMultiple` 用于指定多选和单选。

对某一列数据进行排序，通过指定列的 `sorter` 函数即可启动排序按钮。`sorter: function(rowA, rowB) { ... }`， rowA、rowB 为比较的两个行数据。

`sortDirections: ['ascend' | 'descend']`改变每列可用的排序方式，切换排序时按数组内容依次切换，设置在 table props 上时对所有列生效。

使用 `defaultSortOrder` 属性，设置列的默认排序顺序。

**Demo 示例**: `table/filter-sorter`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" @change="onChange" />
</template>
<script lang="ts" setup>
type TableDataType = {
  key: string;
  name: string;
  age: number;
  address: string;
};

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    filters: [
      {
        text: '李四',
        value: '李四',
      },
      {
        text: '张三',
        value: '张三',
      },
      {
        text: '子菜单',
        value: '子菜单',
        children: [
          {
            text: '王五',
            value: '王五',
          },
          {
            text: '赵六',
            value: '赵六',
          },
        ],
      },
    ],
    onFilter: (value: string, record: TableDataType) => record.name === value,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a: TableDataType, b: TableDataType) => a.age - b.age,
  },
  {
    title: '地址',
    dataIndex: 'address',
    filters: [
      {
        text: '张家港',
        value: '张家港',
      },
      {
        text: '北京',
        value: '北京',
      },
    ],
    filterMultiple: false,
    onFilter: (value: string, record: TableDataType) =>
      record.address.indexOf(value) === 0,
    sorter: (a: TableDataType, b: TableDataType) =>
      a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const data: TableDataType[] = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
  },
  {
    key: '4',
    name: '赵六',
    age: 32,
    address: '张家港第二公园',
  },
];
const onChange = (pagination, filters, sorter) => {
  console.log('参数', pagination, filters, sorter);
};
</script>

```

## 自定义筛选菜单

通过 `customFilterDropdown` 定义自定义的列筛选功能，并实现一个搜索列的示例。

<!-- **Demo 示例**: `table/custom-filter-panel`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

> ⚠️ **示例代码未找到**
 -->

## 可控的筛选和排序

使用受控属性对筛选和排序状态进行控制。

> 1. columns 中定义了 filteredValue 和 sortOrder 属性即视为受控模式。
> 2. 只支持同时对一列进行排序，请保证只有一列的 sortOrder 属性是生效的。
> 3. 务必指定 `column.key`。

**Demo 示例**: `table/reset-filter`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <div>
    <div class="table-operations">
      <e-button @click="setAgeSort">年龄排序</e-button>
      <e-button @click="clearFilters">清除筛选</e-button>
      <e-button @click="clearAll">清除筛选和排序</e-button>
    </div>
    <e-table :columns="columns" :data-source="data" @change="handleChange" />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
  },
  {
    key: '4',
    name: '赵六',
    age: 32,
    address: '张家港第二公园',
  },
];

const filteredInfo = ref();
const sortedInfo = ref();

const columns = computed(() => {
  const filtered = filteredInfo.value || {};
  const sorted = sortedInfo.value || {};
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: '王', value: '王' },
        { text: '李', value: '李' },
      ],
      filteredValue: filtered.name || null,
      onFilter: (value: string, record: DataItem) => record.name.includes(value),
      sorter: (a: DataItem, b: DataItem) => a.name.length - b.name.length,
      sortOrder: sorted.columnKey === 'name' && sorted.order,
      ellipsis: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: DataItem, b: DataItem) => a.age - b.age,
      sortOrder: sorted.columnKey === 'age' && sorted.order,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: '张家港', value: '张家港' },
        { text: '北京', value: '北京' },
      ],
      filteredValue: filtered.address || null,
      onFilter: (value: string, record: DataItem) => record.address.includes(value),
      sorter: (a: DataItem, b: DataItem) => a.address.length - b.address.length,
      sortOrder: sorted.columnKey === 'address' && sorted.order,
      ellipsis: true,
    },
  ];
});

const handleChange = (pagination, filters, sorter) => {
  console.log('各种参数', pagination, filters, sorter);
  filteredInfo.value = filters;
  sortedInfo.value = sorter;
};
const clearFilters = () => {
  filteredInfo.value = null;
};
const clearAll = () => {
  filteredInfo.value = null;
  sortedInfo.value = null;
};
const setAgeSort = () => {
  sortedInfo.value = {
    order: 'descend',
    columnKey: 'age',
  };
};
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>

```

## 自定义筛选的搜索

`filterSearch` 用于开启筛选项的搜索，通过 `filterSearch:(input, record) => boolean`

**Demo 示例**: `table/filter-search`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" @change="onChange" />
</template>
<script lang="ts" setup>
type TableDataType = {
  key: string;
  name: string;
  age: number;
  address: string;
};

type TableFilterType = {
  text: string;
  value: string;
};

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    filters: [
      {
        text: '李四',
        value: '李四',
      },
      {
        text: '张三',
        value: '张三',
      },
      {
        text: '王五',
        value: '王五',
      },
      {
        text: '赵六',
        value: '赵六',
      },
    ],
    filterSearch: (input: string, record: TableFilterType) => record.text.toUpperCase().includes(input.toUpperCase()),
    onFilter: (value: string, record: TableDataType) => record.name === value,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a: TableDataType, b: TableDataType) => a.age - b.age,
  },
  {
    title: '地址',
    dataIndex: 'address',
    filters: [
      {
        text: '张家港',
        value: '张家港',
      },
      {
        text: '北京',
        value: '北京',
      },
    ],
    filterMultiple: false,
    onFilter: (value: string, record: TableDataType) =>
      record.address.indexOf(value) === 0,
    sorter: (a: TableDataType, b: TableDataType) =>
      a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const data: TableDataType[] = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
  },
  {
    key: '4',
    name: '赵六',
    age: 32,
    address: '张家港第二公园',
  },
];
const onChange = (pagination, filters, sorter) => {
  console.log('参数', pagination, filters, sorter);
};
</script>

```

## 树型筛选菜单

可以使用 `filterMode` 来修改筛选菜单的 UI，可选值有 `menu`（默认）和 `tree`。

> `filterSearch` 用于开启筛选项的搜索。

**Demo 示例**: `table/filter-in-tree`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" @change="onChange" />
</template>
<script lang="ts" setup>
type TableDataType = {
  key: string;
  name: string;
  age: number;
  address: string;
};

type TableFilterType = {
  text: string;
  value: string;
};

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    filters: [
      {
        text: '李四',
        value: '李四',
      },
      {
        text: '张三',
        value: '张三',
        children: [
          {
            text: '王五',
            value: '王五',
          },
          {
            text: '赵六',
            value: '赵六',
          },
        ],
      },
    ],
    onFilter: (value: string, record: TableDataType) => record.name === value,
    filterMode: 'tree',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
  },
  {
    title: '地址',
    dataIndex: 'address',
    filters: [
      {
        text: '张家港',
        value: '张家港',
      },
      {
        text: '北京',
        value: '北京',
      },
    ],
    onFilter: (value: string, record: TableDataType) =>
      record.address.indexOf(value) === 0,
  },
];

const data: TableDataType[] = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
  },
  {
    key: '4',
    name: '赵六',
    age: 32,
    address: '张家港第二公园',
  },
];
const onChange = (pagination, filters, sorter) => {
  console.log('参数', pagination, filters, sorter);
};
</script>

```

## 行列拖拽排序

通过 `Table` 配置项 `drag.allowRowDrag` 开启行拖拽功能, `drag.allowColDrag` 项开启列拖拽功能。

`Table` 配置项 `drag.rowDisabled` 禁止单个行或者列数据拖拽, 在列配置项 `dragDisabled` 禁止单个列数据拖拽。

`Table` 配置项 `drag.onChange` 设置监听行列拖拽放置变更方法。

> **使用注意：**
>
> 1. 固定列不参与拖拽行为
> 2. 行、列存在合并项时，表格不支持对应行、列拖拽。包括分组表头，存在跨行、跨列单元格的表格

**Demo 示例**: `table/drag-basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" :drag="drag">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link>{{ text }}</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

// 是否允许行拖拽
const isAllowRowDrag = ref(true);
// 是否允许列拖拽
const isAllowColDrag = ref(true);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age(禁止列拖拽)',
    dataIndex: 'age',
    key: 'age',
    draggable: false,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
];

const data = [
  {
    name: 'Dog',
    age: 18,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
  },
  {
    name: 'Cat(禁止行拖拽)',
    age: 24,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
  },
  {
    name: 'Rat',
    age: 36,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
  },
];

const drag = {
  allowRowDrag: isAllowRowDrag,
  allowColDrag: isAllowColDrag,
  // 拖拽变化前监听，返回false则阻断当前拖拽
  onChangeBefore: (dragData: any, dragPathList: number[], dropPathList: number[], dragType: string) => {
    // NOTE: 返回boolean或不返回,若返回false,则阻断当前的拖拽操作
    return true;
  },
  // 监听拖拽变化后
  onChange: (dragData: any, dragPathList: number[], dropPathList: number[]) => {
    EMessage({
      type: 'info',
      message: `拖拽目标: ${dragData.name || dragData.title} | 拖拽位置: ${JSON.stringify(
        dragPathList
      )} | 放置位置: ${JSON.stringify(dropPathList)}`,
    });
  },
  // 是否禁止当前行进行拖拽
  rowDisabled: (record: any) => {
    // 第二行禁止拖拽
    return record.name === 'Cat(禁止行拖拽)';
  },
};
</script>

```

## 树形结构拖拽排序

通过 `Table` 配置项 `drag.rowDropInToItem` 控制是否可以向不含子节点的元素拖入节点，在 `drag.onChange` 中，`dragIndexList` 表示拖拽目标位于原数据中的路径索引列表，`dropIndexList` 表示放置目标位于原数据中的路径索引列表。

**Demo 示例**: `table/drag-tree`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table v-model:columns="columns" v-model:data-source="data" :drag="drag" />
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
]);

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
  children?: DataItem[];
}

const data = ref<DataItem[]>([
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
]);

const drag = {
  allowRowDrag: true,
  // 监听拖拽变化后
  onChange: (dragRow: any, dragStartPathList: number[], dropPathList: number[]) => {
    EMessage({
      type: 'info',
      message: `拖拽目标: ${dragRow.name} | 拖拽路径: ${JSON.stringify(dragStartPathList)} | 放置路径: ${JSON.stringify(
        dropPathList
      )}`,
    });
  },
  rowDropInToItem: true,
};
</script>

```

## 使用手柄拖拽

通过 `Table` 配置项 `drag.rowDragHandler` 开启手柄拖拽行功能。
**Demo 示例**: `table/drag-handler`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" :drag="drag">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link>{{ text }}</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

// 是否允许行拖拽
const isAllowRowDrag = ref(true);
// 是否允许列拖拽
const isAllowColDrag = ref(true);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age(禁止列拖拽)',
    dataIndex: 'age',
    key: 'age',
    dragDisabled: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
];

const data = [
  {
    name: 'Dog',
    age: 18,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
  },
  {
    name: 'Cat(禁止行拖拽)',
    age: 24,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
  },
  {
    name: 'Rat',
    age: 36,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
  },
];

const drag = {
  allowRowDrag: isAllowRowDrag,
  allowColDrag: isAllowColDrag,
  rowDragHandler: true,
  // 拖拽变化前监听，返回false则阻断当前拖拽
  onChangeBefore: (dragRow: any, dragPathList: number[], dropPathList: number[]) => {
    // NOTE: 返回boolean或不返回,若返回false,则阻断当前的拖拽操作
    return true;
  },
  // 监听拖拽变化后
  onChange: (dragRow: any, dragPathList: number[], dropPathList: number[]) => {
    EMessage({
      type: 'info',
      message: `拖拽目标: ${dragRow.name} | 拖拽位置: ${JSON.stringify(dragPathList)} | 放置位置: ${JSON.stringify(
        dropPathList
      )}`,
    });
  },
  // 是否禁止当前行进行拖拽
  rowDisabled: (record: any) => {
    // 第二行禁止拖拽
    return record.name === 'Cat(禁止行拖拽)';
  },
};
</script>

```

## 选择和操作

选择后进行操作，完成后清空选择，通过 `rowSelection.selectedRowKeys` 来控制选中项。

**Demo 示例**: `table/row-selection-and-operation`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <div>
    <div style="margin-bottom: 16px">
      <e-button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="start">
        重新加载
      </e-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `已选择 ${state.selectedRowKeys.length} 项` }}
        </template>
      </span>
    </div>
    <e-table :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :columns="columns"
      :data-source="data" />
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';

type Key = string | number;

interface DataType {
  key: Key;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `张三 ${i}`,
    age: 32,
    address: `张家港第一公园 ${i}号`,
  });
}

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const start = () => {
  state.loading = true;
  // ajax request after empty completing
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};
const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('选中的行发生变化：', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
</script>

```

## 自定义选择项

通过 `rowSelection.selections` 自定义选择项，默认不显示下拉选项，设为 `true` 时显示默认选择项。

**Demo 示例**: `table/row-selection-custom`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :row-selection="rowSelection" :columns="columns" :data-source="data" />
</template>
<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { ETable } from '@epoint-fe/eui-components';

interface DataType {
  key: string | number;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `张三 ${i}`,
    age: 32,
    address: `张家港第一公园 ${i}号`,
  });
}

const selectedRowKeys = ref<DataType['key'][]>([]); // Check here to configure the default column

const onSelectChange = (changableRowKeys: string[]) => {
  console.log('选中的行发生变化：', changableRowKeys);
  selectedRowKeys.value = changableRowKeys;
};

const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      ETable.SELECTION_ALL,
      ETable.SELECTION_INVERT,
      ETable.SELECTION_NONE,
      {
        key: 'odd',
        text: '选择奇数行',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          selectedRowKeys.value = newSelectedRowKeys;
        },
      },
      {
        key: 'even',
        text: '选择偶数行',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          selectedRowKeys.value = newSelectedRowKeys;
        },
      },
    ],
  };
});
</script>

```

## 可选择

第一列是联动的选择框。 默认点击 checkbox 触发选择行为。

**Demo 示例**: `table/row-selection`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :row-selection="rowSelection" :columns="columns" :data-source="data">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link type="primary">{{ text }}</e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];
const data: DataType[] = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
  },
  {
    key: '4',
    name: '禁用用户',
    age: 99,
    address: '上海第一公园',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
    console.log(`选中的行键值: ${selectedRowKeys}`, '选中的行数据: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === '禁用用户', // 配置不可选中的列
    name: record.name,
  }),
  defaultShowIndex: true, // 默认显示序号
  indexFormatter: (index: number) => `#${index + 1}`, // 自定义序号格式 可选
};
</script>

```

## 选择列合并序号列功能

为了节省空间，我们提供可选择列合并序号列功能。

**Demo 示例**: `table/checker-column-with-index`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <div class="checker-column-with-index-demos">
    <div class="control-panel">
      <e-switch v-model="defaultShowIndex" active-text="显示序号" inactive-text="常规显示" />
      <e-switch v-model="multiple" active-text="多选" inactive-text="单选" />
    </div>
    <e-table
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';

const defaultShowIndex = ref(true);
const multiple = ref(true);

const rowSelection = reactive({
  // columnWidth: 52,
  type: multiple.value ? 'check' : 'radio',
  selectedRowKeys: ['2'] as string[],
  onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
    console.log(`选中的行键值: ${selectedRowKeys}`, '选中的行数据: ', selectedRows);
    rowSelection.selectedRowKeys = selectedRowKeys;
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === '禁用用户', // 配置不可选中的列
    name: record.name,
  }),
  defaultShowIndex: defaultShowIndex.value, // 默认显示序号
  // 自定义序号格式 可选
  indexFormatter: (index: number, paginationInfo) => {
    if (!paginationInfo || !paginationInfo.pageSize) {
      return `#${index + 1}`;
    }
    return `#${paginationInfo.pageSize * (paginationInfo.current - 1) + index + 1}`;
  },
});

watch(defaultShowIndex, () => {
  rowSelection.defaultShowIndex = defaultShowIndex.value;
});

watch(multiple, () => {
  rowSelection.type = multiple.value ? 'check' : 'radio';
});

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width:800,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width:800,
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 800,
  },
];

const data = ref<DataType[]>([]);

const current = ref(1);
const pageSize = ref(5);
const pagination = reactive({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
});

const loading = ref(false);

const queryData = (params) => {
  // 模拟表格数据
  return new Promise((resolve) => {
    setTimeout(() => {
      const { current, pageSize } = params;
      let i = 0;
      const data: DataType[] = [];
      while (++i < pageSize) {
        data.push({
          key: `${pageSize * (current - 1) + i}`,
          name: `用户 ${current}-${i}`,
          age: Math.floor(Math.random() * 40 + 20),
          address: '北京第一公园',
        });
      }
      data.push({
        key: `${pageSize * (current - 1) + i}`,
        name: '禁用用户',
        age: 33,
        address: '北京第一公园',
      });
      resolve({
        results: data,
      });
    }, (Math.random() * 1000 + 20) >>> 0);
  });
};

const getData = () => {
  loading.value = true;
  queryData(pagination)
    .then((res) => {
      // @ts-ignore
      data.value = res.results;
      loading.value = false;
      console.log(pagination, current.value, pageSize.value);
    })
    .catch((err) => {
      loading.value = false;
    });
};
const handleTableChange = (pager: { pageSize: number; current: number }) => {
  console.log('表格变化', pager);
  pagination.pageSize = pager.pageSize;
  pagination.current = pager.current;

  getData();
};

getData();
</script>

<style lang="scss" scoped>
.control-panel {
  display: flex;
  gap: 20px;
}
</style>

```

## 随页面滚动的固定表头和滚动条

对于长表格，需要滚动才能查看表头和滚动条，那么现在可以设置跟随页面固定表头和滚动条。

**Demo 示例**: `table/sticky`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :sticky="stickyOption" :columns="columns" :data-source="data" :scroll="{ x: 1500 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'"><e-button link type="primary">操作</e-button></template>
    </template>
    <template #summary>
      <e-table-summary :fixed="fixedTop ? 'top' : 'bottom'">
        <e-table-summary-row>
          <e-table-summary-cell :index="0" :col-span="2">
            <e-switch v-model="fixedTop" active-text="固定在顶部" inactive-text="固定在顶部" inline-prompt></e-switch>
          </e-table-summary-cell>
          <e-table-summary-cell :index="2" :col-span="8">滚动区域</e-table-summary-cell>
          <e-table-summary-cell :index="10">固定在右侧</e-table-summary-cell>
        </e-table-summary-row>
      </e-table-summary>
    </template>
  </e-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const stickyOption = { offsetHeader: 56 };
const columns = ref([
  {
    title: '姓名',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '年龄',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: '列 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: '列 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: '列 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: '列 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: '列 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: '列 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: '列 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: '列 8', dataIndex: 'address', key: '8' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
]);

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `张三 ${i}`,
    age: 32,
    address: `北京公园 ${i}号`,
  });
}
const fixedTop = ref(false);
</script>

<style scoped>
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}

[data-theme='dark'] #components-table-demo-summary tfoot th,
[data-theme='dark'] #components-table-demo-summary tfoot td {
  background: #1d1d1d;
}
</style>

```

## 可伸缩列

设置 resizable 开启拖动列。

鼠标 hover 到 Name、 Age 分割线上体验一下吧。

**Demo 示例**: `table/resizable-column`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <e-button link type="primary">
          {{ record.name }}
        </e-button>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <e-tag
            v-for="tag in record.tags"
            :key="tag"
            :type="tag === '待改进' ? 'danger' : tag.length > 5 ? '' : 'success'"
          >
            {{ tag.toUpperCase() }}
          </e-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <e-button link type="primary">邀请 一 {{ record.name }}</e-button>
          <e-divider direction="vertical" />
          <e-button link type="primary">删除</e-button>
          <e-divider direction="vertical" />
          <e-button link type="primary">
            更多操作
            <e-icon>
              <ArrowDown />
            </e-icon>
          </e-button>
        </span>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ArrowDown } from '@epoint-fe/eui-icons';

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
    tags: ['优秀', '开发'],
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
    tags: ['待改进'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
    tags: ['优秀', '教师'],
  },
];

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    resizable: true,
    width: 120,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    resizable: true,
    width: 40,
    minWidth: 40,
    maxWidth: 160,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    width: 170,
  },
  {
    title: '操作',
    key: 'action',
  },
]);
function handleResizeColumn(w, col) {
  col.width = w;
}
</script>

<style scoped>
.e-tag + .e-tag {
  margin-left: 8px;
}
</style>

```

## 尺寸

除了默认的大小，表格组件还提供了几种额外的尺寸可供选择。

**Demo 示例**: `table/size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <h4>大尺寸表格</h4>
  <e-table :columns="columns" :data-source="data" size="large" />
  <h4>小尺寸表格</h4>
  <e-table :columns="columns" :data-source="data" size="small" />
</template>
<script lang="ts" setup>
const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];
const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
  },
];
</script>
<style scoped>
h4 {
  margin-bottom: 16px;
}
</style>

```

## 带斑马纹表格

使用 `stripe` 属性设置带斑马纹的表格。

**Demo 示例**: `table/stripe`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" stripe />
  <e-table :columns="columns" :data-source="data" stripe borderStyle="full" />
</template>

<script lang="ts" setup>
const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];
const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京第一公园',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '张家港第一公园',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '上海第一公园',
  },
  {
    key: '4',
    name: '赵六',
    age: 15,
    address: '上海第一公园',
  },
];
</script>

```

## 总结栏

通过 `summary` 设置总结栏。使用 `e-table-summary-cell` 同步 Column 的固定状态。你可以通过配置 `e-table-summary` 的 `fixed` 属性使其固定。

**Demo 示例**: `table/summary`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" :pagination="false" borderStyle="full">
    <template #summary>
      <e-table-summary-row>
        <e-table-summary-cell>总计</e-table-summary-cell>
        <e-table-summary-cell>
          <e-text type="danger">{{ totals.totalBorrow }}</e-text>
        </e-table-summary-cell>
        <e-table-summary-cell>
          <e-text>{{ totals.totalRepayment }}</e-text>
        </e-table-summary-cell>
      </e-table-summary-row>
      <e-table-summary-row>
        <e-table-summary-cell>余额</e-table-summary-cell>
        <e-table-summary-cell :col-span="2">
          <e-text type="danger">
            {{ totals.totalBorrow - totals.totalRepayment }}
          </e-text>
        </e-table-summary-cell>
      </e-table-summary-row>
    </template>
  </e-table>
  <br />
  <e-table :columns="fixedColumns" :data-source="fixedData" :pagination="false" :scroll="{ x: 2000, y: 500 }" borderStyle="full">
    <template #summary>
      <e-table-summary fixed>
        <e-table-summary-row>
          <e-table-summary-cell :index="0">汇总</e-table-summary-cell>
          <e-table-summary-cell :index="1">这是汇总内容</e-table-summary-cell>
        </e-table-summary-row>
      </e-table-summary>
    </template>
  </e-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '借款',
    dataIndex: 'borrow',
  },
  {
    title: '还款',
    dataIndex: 'repayment',
  },
]);

const data = ref([
  {
    key: '1',
    name: '张三',
    borrow: 10,
    repayment: 33,
  },
  {
    key: '2',
    name: '李四',
    borrow: 100,
    repayment: 0,
  },
  {
    key: '3',
    name: '王五',
    borrow: 10,
    repayment: 10,
  },
  {
    key: '4',
    name: '赵六',
    borrow: 75,
    repayment: 45,
  },
]);

const fixedColumns = ref<TableColumnsType>([
  {
    title: '姓名',
    dataIndex: 'name',
    fixed: true,
    width: 100,
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
]);

const fixedData = ref<{ key: number; name: string; description: string }[]>([]);
for (let i = 0; i < 20; i += 1) {
  fixedData.value.push({
    key: i,
    name: ['光明', '竹子', '小不点'][i % 3],
    description: '万物有始必有终。',
  });
}

const totals = computed(() => {
  let totalBorrow = 0;
  let totalRepayment = 0;

  data.value.forEach(({ borrow, repayment }) => {
    totalBorrow += borrow;
    totalRepayment += repayment;
  });
  return { totalBorrow, totalRepayment };
});
</script>

<style scoped>
.e-table tfoot th,
.e-table tfoot td {
  background: #fafafa;
}

html.dark .e-table tfoot th,
html.dark .e-table tfoot td {
  background: #1d1d1d;
}
</style>

```

## 响应式

响应式配置列的展示。

通过列配置项的 `responsive` 属性可以控制不同宽度设备下配置列是否展示,默认始终展示。

**Demo 示例**: `table/responsive`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :row-key="record => record.key" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <e-button link type="primary">
          {{ record.name }}
        </e-button>
      </template>
    </template>
  </e-table>
</template>
<script lang="ts" setup>
const columns = [
  {
    title: '姓名（所有屏幕）',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄（中等屏幕或更大）',
    dataIndex: 'age',
    key: 'age',
    responsive: ['md'],
  },
  {
    title: '地址（大屏幕或更大）',
    dataIndex: 'address',
    key: 'address',
    responsive: ['lg'],
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '纽约第一湖公园',
  },
];
</script>

```

## 渲染 HTML

通过列配置项的 `allowHtml` 属性可以控制单元格对于 HTML 字符串的渲染行为。

**Demo 示例**: `table/allow-html`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="data" >

  </e-table>
</template>
<script lang="ts" setup>
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

```

## 列显示字段

通过列配置项的 `displayField` 属性可以控制单元格的显示字段。

**Demo 示例**: `table/display-field`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table
    ref="tableRef"
    :columns="columns"
    :data-source="data"
    :before-edit="onBeforeEdit"
    @edit-cell-change="onCellChange"
  />
</template>
<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { Edit, Save, Rollback } from '@epoint-fe/eui-icons';

const tableRef = ref();

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width:300
  },
  {
    title: '部门',
    dataIndex: 'dept_value',
    displayField: 'dept_name',
    key: 'dept_name',
    editor: {
      component: 'e-select',
      props: {
        options: [
          { label: '财务部', value: '1' },
          { label: '人事部', value: '2' },
          { label: '研发部', value: '3' },
        ],
      },
    },
  },
  {
    title: '职务',
    dataIndex: 'position_name',
    key: 'position_name',
    editor: {
      component: 'e-select',
    },
  },
  {
    title: '操作',
    key: 'action',
    action: {
      asText: true,
      items: [
        {
          icon: Edit,
          label: '编辑',
          visible: (params) => !params.isRowEditing,
          onClick(record) {
            tableRef.value?.beginEditRow(record);
          },
        },
        {
          icon: Save,
          label: '提交',
          onClick(record) {
            tableRef.value?.commitEditRow(record);
          },
        },
        {
          icon: Rollback,
          label: '取消',
          visible: (params) => params.isRowEditing,
          onClick(record) {
            tableRef.value?.cancelEditRow(record);
          },
        },
      ],
    },
  },
];

const data = ref([
  {
    key: '1',
    name: '张三',
    dept_name: '研发部',
    dept_value: '3',
    position_name: '工程师'
  },
  {
    key: '2',
    name: '李四',
    dept_name: '人事部',
    dept_value: '2',
    position_name: '招聘专员',
  },
  {
    key: '3',
    name: '王五',
    dept_name: '财务部',
    dept_value: '1',
    position_name: '财务总监',
  },
]);

const getOptions = (name) => {
  let options: any[] = [];

  if (name === '2') {
    options = [
      { label: '招聘专员', value: '招聘专员' },
      { label: '人事主管', value: '人事主管' },
      { label: '人事经理', value: '人事经理' },
    ];
  } else if (name === '3') {
    options = [
      { label: '工程师', value: '工程师' },
      { label: '高级工程师', value: '高级工程师' },
      { label: '研发经理', value: '研发经理' },
    ];
  } else if (name === '1') {
    options = [
      { label: '会计', value: '会计' },
      { label: '出纳', value: '出纳' },
      { label: '财务总监', value: '财务总监' },
    ];
  }

  return options;
};

const onBeforeEdit = (params) => {
  const { record } = params;

  const positionEditor = tableRef.value?.getCellEditor(record, 'position_name');
  const deptEditor = tableRef.value?.getCellEditor(record, 'dept_value');

  positionEditor.updateEditProps({
    options: getOptions(deptEditor.getEditValue()),
  });
};

// editStatus 用于处理取消行编辑后联动编辑再次打开的问题
let editStatus = {};

const onCellChange = (params) => {
  const { record, column, value } = params;
  if (column.dataIndex === 'dept_value') {
    const positionEditor = tableRef.value?.getCellEditor(record, 'position_name');

    const key = record.key + '-position_name';

    if (!editStatus[key]) {
      positionEditor.beginEditCell();
      nextTick(() => {
        positionEditor.setEditValue('');
      });
      editStatus[key] = true;
    } else {
      positionEditor.updateEditProps({
        options: getOptions(value),
      });
      positionEditor.setEditValue('');
      editStatus[key] = positionEditor.isEditing;
    }
  }
};
</script>

```

## template 风格的 API

使用 template 风格的 API。

> 不推荐使用，会有一定的性能损耗。

> 这个只是一个描述 `columns` 的语法糖，所以你不能用其他组件去包裹 `Column` 和 `ColumnGroup`。

**Demo 示例**: `table/template`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
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
<script lang="ts" setup>
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

```

## 列响应式数据源

支持使用 `v-model:columns` 对列数据进行响应式绑定, 便于在行列拖拽后对数据进行查看 或 手动进行列排序操作。

**Demo 示例**: `table/drag-reactive`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table
    v-model:columns="columns"
    :data-source="data"
    :row-drag="rowDrag"
    :allow-row-drag="true"
    :allow-col-drag="true"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <e-button link>{{ text }}</e-button>
      </template>
    </template>
  </e-table>
  <e-button type="primary" @click="getColumns">获取当前列数据</e-button>
  <e-button type="primary" @click="manualDrag">第一列数据放置最后</e-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
]);

const data = [
  {
    name: 'Dog',
    age: 18,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
  },
  {
    name: 'Cat',
    age: 24,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
  },
  {
    name: 'Rat',
    age: 36,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
  },
];

// 获取当前列数据
const getColumns = () => {
  EMessage({
    type: 'info',
    message: `当前表格数据名称列表: ${columns.value.map((ele) => ele.title).join(' | ')}`,
  });
};

// 手动拖拽
const manualDrag = () => {
  const unshiftData = columns.value.shift()!;
  columns.value.push(unshiftData);
  EMessage({
    type: 'info',
    message: `当前表格数据名称列表: ${columns.value.map((ele) => ele.title).join(' | ')}`,
  });
};

const rowDrag = {
  // 监听拖拽变化后
  onChange: (dragRow: any, dragStartPathList: number[], dropPathList: number[]) => {
    EMessage({
      type: 'info',
      message: `拖拽目标: ${dragRow.name}`
    });
  },
};
</script>

```

## 表头内的额外标记

**Demo 示例**: `table/column-marker`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
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

```

## 表格行点击响应事件

通过 `row-click` 可以监听整行点击事件。

**Demo 示例**: `table/row-click`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table
    :rowSelection="rowSelection"
    :columns="columns"
    :data-source="dataSource"
    :pagination="false"
    @row-click="handleRowClick"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const rowSelection = reactive({
  type: 'check',
  defaultShowIndex: true
})

const dataSource = ref([
  {
    key: '1',
    name: '张明',
    dept: '研发一部',
  },
  {
    key: '2',
    name: '李华',
    dept: '产品部',
  },
  {
    key: '3',
    name: '王强',
    dept: '测试部',
  },
]);

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '部门',
    dataIndex: 'dept',
    key: 'dept',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    action: {
      asText: true,
      maxCollapse: 2,
      items: [
        {
          icon: 'View',
          label: '查看1',
          onClick(record) {
            EMessage({
              message: '点击了按钮[查看1]',
              type: 'success',
            });
          },
        },
        {
          icon: 'View',
          label: '查看2',
          onClick(record) {
            EMessage({
              message: '点击了按钮[查看2]',
              type: 'success',
            });
          },
        },
        {
          icon: 'View',
          label: '查看3',
          onClick(record) {
            EMessage({
              message: '点击了按钮[查看3]',
              type: 'success',
            });
          },
        },
      ],
    },
  },
]);

function handleRowClick(record) {
  EMessage({
    message: `点击了行: ${record.name}`,
    type: 'success',
  });
}
</script>

```

## 表格单元格点击响应事件

通过 `cell-click` 可以监听表格内容区单元格点击事件，回参依次为当前行的 `record`、当前列的 `column` 以及当前单元格数据 `value`。

当 `column.customCell.onClick` 与 `cell-click` 同时存在时会一起执行。

**Demo 示例**: `table/cell-click`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/table.html)

```vue
<template>
  <e-table :columns="columns" :data-source="dataSource" :pagination="false" @cell-click="handleCellClick" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const dataSource = ref([
  {
    key: '1',
    name: '张明',
    dept: '研发一部',
    status: '在职',
  },
  {
    key: '2',
    name: '李华',
    dept: '产品部',
    status: '试用',
  },
  {
    key: '3',
    name: '王强',
    dept: '测试部',
    status: '离职',
  },
]);

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    customCell: (record) => ({
      style: {
        cursor: 'pointer',
      },
      onClick: () => {
        EMessage({
          message: `customCell.onClick: ${record.name}`,
          type: 'success',
        });
      },
    }),
  },
  {
    title: '部门',
    dataIndex: 'dept',
    key: 'dept',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
]);

function handleCellClick(record, column, value) {
  EMessage({
    message: `cell-click: 行[${record.name}]，列[${column.title}]，值[${value}]`,
    type: 'success',
  });
}
</script>

```

## API

### Table Attributes

文中涉及的 `Key` 类型表示 `string | number`，详见 [Key](#key)。

| Name                     | Description                                                                                                                          | Type                                                                                                                                         | Default                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| borderStyle              | 控制表格的边框类型，支持布尔简写：`true` 等价于 `full`，`false` 等价于 `horizontal`                                                  | `boolean \| 'none' \| 'horizontal' \| 'full'`                                                                                                | `horizontal`                                                              |
| childrenColumnName       | 指定树形结构的列名                                                                                                                   | string                                                                                                                                       | `children`                                                                |
| columns                  | 表格列的配置描述，具体项见[下表](#column)                                                                                            | ([Column](#column) \| [ColumnGroup](#columngroup))[]                                                                                        | -                                                                         |
| components               | 覆盖默认的 table 元素                                                                                                                | object                                                                                                                                       | -                                                                         |
| customHeaderRow          | 设置头部行属性                                                                                                                       | Function(columns, index)                                                                                                                     | -                                                                         |
| customRow                | 设置行属性                                                                                                                           | Function(record, index)                                                                                                                      | -                                                                         |
| dataSource               | 数据数组                                                                                                                             | object\[]                                                                                                                                    |                                                                           |
| defaultExpandAllRows     | 初始时，是否展开所有行                                                                                                               | boolean                                                                                                                                      | false                                                                     |
| defaultExpandedRowKeys   | 默认展开的行                                                                                                                         | `Key[]`                                                                                                                                     | -                                                                         |
| cellEmptyText            | 空单元格占位文本，仅在 `showCellEmptyText` 为 `true` 时生效                                                                          | string                                                                                                                                       | `--`                                                                      |
| expandedRowKeys(v-model) | 展开的行，控制属性                                                                                                                   | `Key[]`                                                                                                                                     | -                                                                         |
| expandedRowRender        | 额外的展开行，支持函数属性或同名插槽                                                                                                 | `Function({ record, index, indent, expanded }): VNode`<br />`v-slot:expandedRowRender="{ record, index, indent, expanded }"`            | -                                                                         |
| expandColumnWidth        | 展开列宽度                                                                                                                           | number                                                                                                                                       | -                                                                         |
| expandFixed              | 控制展开图标是否固定，可选 `true`、`left`、`right`                                                                                   | `boolean \| 'left' \| 'right'`                                                                                                               | false                                                                     |
| expandIcon               | 自定义展开图标，支持函数属性或同名插槽                                                                                               | `Function(props): VNode`<br />`v-slot:expandIcon="props"`                                                                                    | -                                                                         |
| expandRowByClick         | 通过点击行来展开子行                                                                                                                 | boolean                                                                                                                                      | `false`                                                                   |
| footer                   | 表格尾部，支持函数属性或同名插槽                                                                                                     | `Function(currentPageData): VNode`<br />`v-slot:footer="currentPageData"`                                                                   | -                                                                         |
| indentSize               | 展示树形数据时，每层缩进的宽度，以 px 为单位                                                                                         | number                                                                                                                                       | 15                                                                        |
| expandedRowClassName     | 展开行的类名                                                                                                                         | `string \| Function(record, index, indent): string`                                                                                          | -                                                                         |
| loading                  | 页面是否加载中                                                                                                                       | `boolean \| LoadingOptions`                                                                                                                  | false                                                                     |
| locale                   | 默认文案设置，目前包括排序、过滤、空数据文案                                                                                         | object                                                                                                                                       | filterConfirm: `确定` <br> filterReset: `重置` <br> emptyText: `暂无数据` |
| mergeColumns             | 自定合并指定列的同值单元格，通过 `column` 的 `dataIndex` 指定列                                                                      | `string[] \| 'all'`                                                                                                                          | -                                                                         |
| mergeCells               | 根据数组配置合并任意单元格，配置后 merge-columns 将失效                                                                              | [MergeCells](#mergecells)                                                                                                                    | -                                                                         |
| pagination               | 分页器，参考[配置项](#pagination)或 [pagination](http://192.168.219.170/docs/vue/latest/component/component/pagination.html)文档，设为 false 时不展示和进行分页                                 | [`TablePaginationConfig`](#pagination) \| `false`                                                                                            |                                                                           |
| rowClassName             | 表格行的类名                                                                                                                         | `string \| Function(record, index, indent): string`                                                                                          | -                                                                         |
| stripe                   | 是否显示斑马纹                                                                                                                       | boolean                                                                                                                                      | -                                                                         |
| rowExpandable            | 设置是否允许行展开                                                                                                                   | (record) => boolean                                                                                                                          | -                                                                         |
| rowKey                   | 表格行 key 的取值，可以是字符串或一个函数                                                                                            | `string \| Function(record, index?): Key`                                                                                                    | 'key'                                                                     |
| rowSelection             | 列表项是否可选择，[配置项](#rowselection)                                                                                            | [`TableRowSelection`](#rowselection)                                                                                                         | null                                                                      |
| scroll                   | 表格是否可滚动，也可以指定滚动区域的宽、高，[配置项](#scroll)                                                                        | [`Scroll`](#scroll)                                                                                                                          | -                                                                         |
| showCellEmptyText        | 空单元格数据为空时是否显示占位文本                                                                                                   | boolean                                                                                                                                      | `true`                                                                    |
| showExpandColumn         | 设置是否展示行展开列                                                                                                                 | boolean                                                                                                                                      | true                                                                      |
| showHeader               | 是否显示表头                                                                                                                         | boolean                                                                                                                                      | true                                                                      |
| showSorterTooltip        | 表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性                                                 | boolean \| [Tooltip props](http://192.168.219.170/docs/vue/latest/component/component/tooltip)                                                                                                        | true                                                                      |
| size                     | 表格大小                                                                                                                             | `large` \| `default` \| `small`                                                                                                              | `default`                                                                 |
| sortDirections           | 支持的排序方式，取值为 `ascend` `descend`                                                                                            | `('ascend' \| 'descend')[]`                                                                                                                  | \[`ascend`, `descend`]                                                    |
| sticky                   | 设置粘性头部和滚动条                                                                                                                 | `boolean \| { offsetHeader?: number, offsetSummary?: number, offsetScroll?: number, getContainer?: () => Window \| HTMLElement }`           | -                                                                         |
| tableLayout              | 表格元素的 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性，设为 `fixed` 表示内容不会影响列的布局 | `'auto' \| 'fixed' \| undefined`                                                                                                             | 无<hr />固定表头/列或使用了 `column.ellipsis` 时，默认值为 `fixed`        |
| title                    | 表格标题，支持函数属性或同名插槽                                                                                                     | `Function(currentPageData): VNode`<br />`v-slot:title="currentPageData"`                                                                    | -                                                                         |
| transformCellText        | 数据渲染前可以再次改变，一般用于空数据的默认配置                                                                                     | Function({ text, column, record, index }) => any，此处的 text 是经过其它定义单元格 api 处理后的数据，有可能是 VNode \| string \| number Type | -                                                                         |
| drag                     | 行拖拽配置,参考[Drag](#drag)                                                                                                         | [Drag](#drag)                                                                                                                                | -                                                                         |
| cellEditable             | 控制是否显示单元格编辑按钮                                                                                                           | boolean                                                                                                                                      | true                                                                      |
| cellEditOnClick          | 是否点击整个单元格开启编辑状态，关闭后只能点击单元格编辑按钮开启编辑                                                                 | boolean                                                                                                                                      | `true`                                                                    |
| beforeEdit<br />         | 控制是否进入编辑状态                                                                                                                 | `Function({ record, column?, index? }, type): boolean \| Promise<boolean> \| void`                                                          | -                                                                         |
| viewType                 | 表格的视图类型。`card` 视图可使用 [bodyRow](#table-slots) 插槽自定义内容；`table` 视图可使用 [bodyCell](#table-slots) 插槽自定义单元格内容 | `table` \| `card`                                                                                                                            | table                                                                     |
| cardAutoLayout           | 是否根据容器大小自动计算每行的卡片个数及尺寸。当卡片 DOM 存在 `min-width` 样式时会根据 `min-width` 的样式计算；否则会根据下方 `cardBreakLine` 属性配置计算 | boolean                                                                                                                                      | false
| cardBreakLine            | 配置自动布局时，容器宽度对应的每行卡片个数，默认值为 `[500, 1000, 1400]`                                                          | `number[]`                                                                                                                                   | `[500, 1000, 1400]`                                                       |
| cardWaterfall            | 开启瀑布流布局方式，需要开启 `cardAutoLayout` 才会生效                                                                               | boolean                                                                                                                                      | false                                                                     |

### Events

| Name               | Description                                                    | Type                                                                 |
| ------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------- |
| change             | 分页、排序、筛选变化时触发                                     | Function(pagination, filters, sorter, { action, currentDataSource }) |
| expand             | 点击展开图标时触发                                             | Function(expanded, record)                                           |
| expandedRowsChange | 展开的行变化时触发                                             | `Function(expandedKeys)`                                             |
| row-click          | 点击整行时触发，和 `customRow.onClick` 同时存在时会一起执行    | Function(record, index, event)                                       |
| cell-click         | 点击单元格时触发，和 `customCell.onClick` 同时存在时会一起执行 | Function(record, column, value, event)                               |
| resizeColumn       | 拖动列时触发                                                   | Function(width, column)                                              |
| editChange         | 表格编辑数据发生变化时触发                                     | Function(value, oldValue)                                            |
| editRowChange      | 行编辑数据变化时触发                                           | `Function(newRecord, oldRecord)`                                     |
| editCellChange     | 单元格编辑数据变化时触发                                       | `Function({ value, oldValue, column, index, record })`               |

### Methods

| Name          | Description                      | Parameters                          | Return                        |
| ------------- | -------------------------------- | ----------------------------------- | ----------------------------- |
| addRow        | 添加新的行                       | [addRowOptions](#addRowOptions)     |                               |
| deleteRow     | 删除指定行                       | record :`RecordType \|RecordType[]` |                               |
| beginEdit     | 开始全部单元格编辑               | -                                   |                               |
| beginEditRow  | 开始行编辑                       | record :`RecordType \|RecordType[]` |                               |
| commitEdit    | 提交所有行编辑                   | -                                   |                               |
| commitEditRow | 提交行编辑                       | record :`RecordType \|RecordType[]` |                               |
| cancelEdit    | 取消所有行编辑                   | -                                   |                               |
| cancelEditRow | 取消行编辑，并关闭               | record :`RecordType \|RecordType[]` |                               |
| getChanges    | 获取增加、删除、修改后的数据集合 | -                                   | `{ added?: RecordType[]; deleted?: RecordType[]; modified?: RecordType[] }` |
| getEditData   | 获取正在编辑的数据               |                                     | `RecordType[]`                |
| getValidation | 获取已编辑单元格验证信息         |                                     | [`Validation`](#validation)[] |
| reject        | 取消编辑并还原数据修改           |                                     |                               |
| rejectRow     | 还原指定行的新增、删除或修改状态 | record :`RecordType \|RecordType[]` |                               |
| rejectModified| 还原全部已修改数据               | -                                   |                               |
| rejectDeleted | 还原全部已删除数据               | -                                   |                               |
| accept        | 接受编辑，并清除修改标记         |                                     |                               |
| acceptRow     | 接受指定行编辑，并清除修改标记   | record :`RecordType \|RecordType[]` |                               |
| isEditing     | 判断表格当前是否为编辑状态       |                                     | `boolean`                     |
| isEditingRow  | 指定行是否处于编辑状态           | record :`RecordType`                | `boolean`                     |
| getCellEditor | 获取指定列和行的编辑器控件对象   | record :`RecordType`, dataIndex     | [CellEditor](#cellEditor)     |
| clearAdded    | 清空新增行数据                   |                                     |                               |
| scrollToTop   | 表格滚动条滚动到顶部             | -                                   |                               |

### Column

列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

| Name                              | Description                                                                                                                                                                                  | Type                                                       | Default                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------- |
| align                             | 设置列的对齐方式                                                                                                                                                                             | `left` \| `right` \| `center`                              | `left`                  |
| allowHtml                         | 是否允许直接渲染数据中的 HTML 字符串。详见 [AllowHtml](#allowhtml)                                                                                                                           | ^[enum]`false \| true \| 'text' \| 'html' \| 'decodeHtml'` | false                   |
| colSpan                           | 表头列合并,设置为 0 时，不渲染                                                                                                                                                               | number                                                     |                         |
| customCell                        | 设置单元格属性                                                                                                                                                                               | Function(record, rowIndex, column)                         | -                       |
| customFilterDropdown              | 启用 v-slot:customFilterDropdown，优先级低于 filterDropdown                                                                                                                                  | boolean                                                    | false                   |
| customHeaderCell                  | 设置头部单元格属性                                                                                                                                                                           | Function(column)                                           | -                       |
| customRender                      | 生成复杂数据的渲染函数                                                                                                                                                                        | `Function({ value, text, record, index, renderIndex, column }) => VNode \| RenderedCell` | -                       |
| dataIndex                         | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径                                                                                                                                         | `string \| number \| (string \| number)[]`                 | -                       |
| displayField                      | 列显示数据在数据项中对应的路径，支持通过数组查询嵌套路径。未设置时，取 dataIndex 配置                                                                                                         | `string \| number \| (string \| number)[]`                 | -                       |
| defaultFilteredValue              | 默认筛选值                                                                                                                                                                                   | `Key[] \| null`                                            | -                       |
| filterResetToDefaultFilteredValue | 点击重置按钮的时候，是否恢复默认筛选值                                                                                                                                                       | boolean                                                    | false                   |
| defaultSortOrder                  | 默认排序顺序                                                                                                                                                                                 | `ascend` \| `descend`                                      | -                       |
| ellipsis                          | 超过宽度将自动省略，暂不支持和排序筛选一起使用。<br />设置为 `true` 或 `{ showTitle?: boolean }` 时，表格布局将变成 `tableLayout="fixed"`。                                                  | boolean \| `{ showTitle?: boolean }`                       | false                   |
| filterDropdown                    | 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互                                                                                                                               | VNode \| (props: FilterDropdownProps) => VNode             | -                       |
| filterDropdownOpen                | 用于控制自定义筛选菜单是否可见                                                                                                                                                               | boolean                                                    | -                       |
| filtered                          | 标识数据是否经过过滤，筛选图标会高亮                                                                                                                                                         | boolean                                                    | false                   |
| filteredValue                     | 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组                                                                                                                          | `Key[] \| null`                                            | -                       |
| filterIcon                        | 自定义 filter 图标。                                                                                                                                                                         | `VNode \| ({ filtered: boolean, column: ColumnType }) => VNode` | false                   |
| filterMode                        | 指定筛选菜单的用户界面                                                                                                                                                                       | 'menu' \| 'tree'                                           | 'menu'                  |
| filterMultiple                    | 是否多选                                                                                                                                                                                     | boolean                                                    | true                    |
| filters                           | 表头的筛选菜单项                                                                                                                                                                             | `ColumnFilterItem[]`                                       | -                       |
| filterSearch                      | 筛选菜单项是否可搜索                                                                                                                                                                         | `boolean \| Function(input, record): boolean`              | false                   |
| fixed                             | 列是否固定，可选 `true`(等效于 left) `'left'` `'right'`                                                                                                                                      | `boolean \| 'left' \| 'right'`                             | false                   |
| hidden                            | 列是否隐藏                                                                                                                                                                                   | boolean                                                    | false                   |
| key                               | Vue 需要的 key，如果已经设置了唯一的 `dataIndex`，可以忽略这个属性                                                                                                                           | `string \| number`                                         | -                       |
| maxWidth                          | 拖动列最大宽度，会受到表格自动调整分配宽度影响                                                                                                                                               | number                                                     | -                       |
| minWidth                          | 拖动列最小宽度，会受到表格自动调整分配宽度影响                                                                                                                                               | number                                                     | 50                      |
| required                          | 是否在列表头中显示必填标记                                                                                                                                                                   | boolean                                                    | -                       |
| resizable                         | 是否可拖动调整宽度 Type                                                                                                                                                                      | boolean                                                    | true                    |
| responsive                        | 响应式 breakpoint 配置列表。未设置则始终可见。                                                                                                                                               | [Breakpoint](#breakpoint)\[]                               | -                       |
| rowScope                          | 设置列范围                                                                                                                                                                                   | `row` \| `rowgroup`                                        | -                       |
| showSorterTooltip                 | 表头显示下一次排序的 tooltip 提示, 覆盖 table 中 `showSorterTooltip`                                                                                                                         | boolean \| [Tooltip props](http://192.168.219.170/docs/vue/latest/component/component/tooltip#api)                  | true                    |
| sortClickHeader                   | 是否允许点击表头触发排序，默认仅点击排序图标触发                                                                                                                                             | boolean                                                    | false                   |
| sortDirections                    | 支持的排序方式，取值为 `'ascend'` `'descend'`                                                                                                                                                | `('ascend' \| 'descend' \| null)[]`                        | `['ascend', 'descend']` |
| sorter                            | 排序函数，或排序配置对象；需要服务端排序可设为 `true`                                                                                                                                         | `boolean \| Function \| { compare: Function; multiple?: number }` | -                  |
| sortOrder                         | 排序的受控属性，外界可用此控制列的排序，可设置为 `'ascend'` `'descend'` `null`                                                                                                               | `'ascend' \| 'descend' \| null`                            | -                       |
| title                             | 列头显示文字，支持函数写法接收当前排序/筛选状态                                                                                                                                               | `string \| VNode \| Function(props)`                       | -                       |
| tooltip                           | 表头帮助提示内容，支持字符串或 Tooltip 配置对象                                                                                                                                              | `string \| ETooltipProps`                                  | -                       |
| width                             | 列宽度                                                                                                                                                                                       | string\|number                                             | -                       |
| onFilter                          | 本地模式下，确定筛选的运行函数, 使用 template 或 jsx 时作为`filter`事件使用                                                                                                                  | `Function(value, record): boolean`                         | -                       |
| onFilterDropdownOpenChange        | 自定义筛选菜单可见变化时调用，使用 template 或 jsx 时作为`filterDropdownOpenChange`事件使用                                                                                                  | `Function(visible): void`                                  | -                       |
| draggable                         | 当前列是否允许拖拽                                                                                                                                                                           | boolean                                                    | true                    |
| editor                            | 表格编辑配置                                                                                                                                                                                 | [Editor](#editor)                                          | -                       |
| action                            | 快捷操作按钮配置                                                                                                                                                                             | [Action](#action)                                          |                         |
| dateFormat                        | 日期格式化配置                                                                                                                                                                               | string                                                     | `'YYYY-MM-DD HH:mm:ss'` |
| valueType                         | 列的值类型，用于格式化显示。可选值为 `'date'` `'dateTime'` `'normal'`。当值为 `'date'` 或 `'dateTime'` 时，且值是13位数字时，会自动识别为时间戳并根据 dateFormat 属性值转换为当前时区的日期格式字符串。 | `'date' \| 'dateTime' \| 'normal'`                         | `dateTime`              |

#### Editor

| Name      | Description                  | Type                                                                                                                                                                                                                                                        | Default   |
| --------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| component | 组件类型，支持自定义组件传入 | ^[string]`'e-cascader' \|'e-checkbox' \| 'e-input' \| 'e-input-number' \| 'e-input-tag'\| 'e-mention'\| 'e-radio'\| 'e-rate'\| 'e-select'\| 'e-switch'\| 'e-date-picker'\| 'e-time-picker'\| 'e-time-select'\| 'e-color-picker'` \| `Function` \| `Component` | 'e-input' |
| type      | 向下兼容的组件类型字段，未配置 `component` 时生效 | string                                                                                                                                                                                                                                         | -         |
| cellEditable | 是否显示当前列的单元格编辑按钮        | boolean                                                                                                                                                                                                                                      | true      |
| props     | 组件的配置参数               | Props                                                                                                                                                                                                                                                       | -         |

#### CellEditor

| Name            | Description                              | Type     |
| --------------- | ---------------------------------------- | -------- |
| editorRef       | 编辑器 Ref                               |          |
| getRecord       | 获取所属行数据                           |          |
| getEditValue    | 获取编辑器临时编辑值                     |          |
| validation      | 验证信息                                 | string   |
| isEditing       | 是否处于编辑状态                         | boolean  |
| editorProps     | 当前编辑器的属性                         | object   |
| updateEditProps | 更新编辑器的属性                         | Function |
| beginEditCell   | 开始编辑单元格                           | Function |
| commitEditCell  | 提交编辑单元格                           | Function |
| cancelEditCell  | 取消编辑                                 | Function |
| acceptEditCell  | 接受编辑数据，清除编辑标记               | Function |
| rejectEditCell  | 取消编辑，并还原数据，清除编辑标记       | Function |
| setEditValue    | 设置编辑器临时编辑值，仅编辑器打开时生效 | Function |

#### Validation

```ts
interface Validation {
  rowKey: Key;
  dataIndex: string;
  message: string;
}
```

#### RenderedCell

```ts
interface RenderedCell<RecordType = any> {
  props?: {
    key?: Key;
    class?: string;
    style?: CSSProperties;
    column?: ColumnType<RecordType>;
    colSpan?: number;
    rowSpan?: number;
  };
  children?: any;
}
```

#### Action

| Name        | Description                          | Type                                                                                                                                                                          | Default        |
| ----------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| type        | Button 类型                          | ^[string]`'default' \|'danger' \| 'primary' \| 'success' \| 'warning' \| 'info'`                                                                                              | primary        |
| asText      | 仅显示文字                           | boolean                                                                                                                                                                       | false          |
| isLink      | 是否为链接按钮                       | boolean                                                                                                                                                                       | true           |
| collapse    | 是否将过多的按钮通过下拉折叠         | boolean                                                                                                                                                                       | true           |
| maxCollapse | 最多显示的按钮数量，其余按钮将被折叠 | number                                                                                                                                                                        | 3              |
| trigger     | 更多操作下拉菜单触发方式             | ^[string]`'hover' \| 'click' \| 'focus' \| 'contextmenu'` \| string[] \| Function(params) => string \| string[]                                                               | `click`        |
| effect      | 更多操作下拉菜单主题                 | ^[string]`'light' \| 'dark' \| 'danger'` \| Function(params) => string                                                                                                         | `light`        |
| placement   | 更多操作下拉菜单弹出位置             | ^[string]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` \| Function(params) => string | `bottom-start` |
| render      | 自定义处理最终渲染的按钮列表         | `Function(actionBtns, record) => ActionItem[]`                                                                                                                                 | -              |
| items       | 操作按钮的配置                       | [ActionItem](#actionitem)[]                                                                                                                                                   | -              |

#### Drag

行拖拽配置

| Name              | Description                                                                                                                                                                                                               | Type                                                                                                 | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------- |
| allowRowDrag      | 是否允许行拖拽                                                                                                                                                                                                            | boolean                                                                                              | false   |
| allowColDrag      | 是否允许列拖拽                                                                                                                                                                                                            | boolean                                                                                              | false   |
| rowDragHandler    | 是否启用手柄拖拽行                                                                                                                                                                                                        | boolean                                                                                              | false   |
| rowDisabled       | 控制表格数据是否允许行拖拽                                                                                                                                                                                                | (record: any) => boolean                                                                             |         |
| rowDropInToItem   | 是否可以向树结构不含子节点的行拖入新的节点                                                                                                                                                                                | boolean                                                                                              | false   |
| columnShadowWidth | 列拖拽阴影盒宽度，不配置时会获取当前列的宽度作为阴影盒子的宽度                                                                                                                                                            | number                                                                                               |         |
| onChange          | 拖拽数据变化后触发。`dragIndexList`、`dropIndexList` 为拖拽目标、放置目标在数据源中的索引路径列表；单层表格仅返回长度为 1 的列表，若是树结构，返回长度可能超过 1，`dragType` 是拖拽类型，`row` 代表行拖拽，`column` 代表列拖拽 | `(record: any, dragIndexList: number[], dropIndexList: number[], dragType: string) => void`         |         |
| onChangeBefore    | 拖拽数据变化前触发，是否进行阻断，返回 `false` 则阻断当前拖拽。                                                                                                                                                           | `(record: any, dragIndexList: number[], dropIndexList: number[], dragType: string) => boolean \| void` |       |

#### AddRowOptions

| Name     | Description      | Type                        | Default |
| -------- | ---------------- | --------------------------- | ------- |
| record   | 新增行数据       | object \| object[]          | -       |
| position | 新增位置         | ^[string]`'top' \|'bottom'` | 'top'   |
| editable | 是否开启编辑模式 | boolean                     | false   |

#### ActionItem

| Name     | Description  | Type                                   |
| -------- | ------------ | -------------------------------------- |
| icon     | 按钮图标     | component                              |
| label    | 按钮文字     | string                                  |
| ghost    | 是否为幽灵按钮 | boolean \| Function(params) => boolean |
| stopPropagation    | 是否阻止事件冒泡，默认阻止     | boolean                                  |
| visible  | 是否显示按钮 | boolean \| Function(params) => boolean |
| disabled | 使用禁用按钮 | boolean \| Function(params) => boolean |
| onClick  | 按钮点击事件 | Function(record, event)                       |

### Table Slots

| Name                 | Description                                                     | Type                                                                                                                                       |
| -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| emptyText            | 自定义整表无数据内容                                            | `v-slot:emptyText`                                                                                                                        |
| title                | 表格标题插槽，也支持同名 `prop`                                  | `v-slot:title="currentPageData"`                                                                                                           |
| footer               | 表格尾部插槽，也支持同名 `prop`                                  | `v-slot:footer="currentPageData"`                                                                                                          |
| summary              | 总结栏                                                          | `v-slot:summary="{ pageData }"`                                                                                                            |
| bodyRow              | 个性化行插槽，仅在 card 视图时生效                              | `v-slot:bodyRow="{ record, index, renderIndex, indent, columnTitle, columns, actionNode, selectionNode, expandNode, expanded }"`         |
| bodyCell             | 个性化单元格插槽，仅在 table 视图时生效                         | `v-slot:bodyCell="{ text, value, record, index, column, isRowEditing, isCellEditing }"`                                                  |
| headerCell           | 个性化头部单元格                                                | `v-slot:headerCell="{ title, column }"`                                                                                                   |
| expandColumnTitle    | 自定义展开列表头                                                | `v-slot:expandColumnTitle`                                                                                                                 |
| expandIcon           | 自定义展开图标插槽，也支持同名 `prop`                            | `v-slot:expandIcon="props"`                                                                                                                |
| expandedRowRender    | 自定义展开行内容插槽，也支持同名 `prop`                          | `v-slot:expandedRowRender="{ record, index, indent, expanded }"`                                                                          |
| customFilterIcon     | 自定义筛选图标                                                  | `v-slot:customFilterIcon="{ filtered, column }"`                                                                                          |
| customFilterDropdown | 自定义筛选菜单，需要配合 `column.customFilterDropdown` 使用     | `v-slot:customFilterDropdown="props"`，其中 `props` 类型见 [FilterDropdownProps](#filterdropdownprops)                                   |

> **💡 提示**
>
> `Table Attributes` 中的 `cellEmptyText` 用于空单元格占位文本；`Table Slots` 中的 `emptyText` 用于自定义整表无数据内容，两者保留兼容。

#### Breakpoint

```ts
type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
```

#### AllowHtml{#allowhtml}

控制表格当前列中内容的渲染方式是否允许 html 展示，可选值为:

- `text`: 以纯文本形式展示，不渲染 HTML。
- `html`: 直接渲染 HTML。
- `decodeHtml`：先还原转义字符，再渲染 HTML。
- 也可设置成 `boolean` 值，`false` 等价于 `text`，`true` 等价于 `html`

注意：如果你自定义了列的渲染，此属性不会生效。

```ts
type AllowHtml = boolean | 'text' | 'html' | 'decodeHtml';
```

### ColumnGroup

| Name  | Description  | Type           | Default |
| ----- | ------------ | -------------- | ------- |
| title | 列头显示文字 | `string \| VNode \| Function(props)` | -       |

### pagination

分页的配置项。

| Name     | Description                                                                                                         | Type  | Default          |
| -------- | ------------------------------------------------------------------------------------------------------------------- | ----- | ---------------- |
| position | 指定分页显示的位置， 取值为`topLeft` \| `topCenter` \| `topRight` \|`bottomLeft` \| `bottomCenter` \| `bottomRight` | `('topLeft' \| 'topCenter' \| 'topRight' \| 'bottomLeft' \| 'bottomCenter' \| 'bottomRight')[]` | \[`bottomRight`] |

更多配置项，请查看 [`Pagination`](http://192.168.219.170/docs/vue/latest/component/component/pagination)。

### rowSelection

选择功能的配置。

| Name                    | Description                                                     | Type                                                                                | Default    |
| ----------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------- |
| checkStrictly           | checkable 状态下节点选择完全受控（父子数据选中状态不再关联）    | boolean                                                                             | true       |
| columnTitle             | 自定义列表选择框标题                                            | string\|VNode                                                                       | -          |
| columnWidth             | 自定义列表选择框宽度                                            | string\|number                                                                      | -          |
| defaultSelectedRowKeys  | 默认选中项的 key 数组                                           | `Key[]`                                                                             | -          |
| fixed                   | 把选择框列固定，可选 `true`(等效于 left) `'left'` `'right'`     | `boolean \| 'left' \| 'right'`                                                      | -          |
| getCheckboxProps        | 选择框的默认属性配置                                            | Function(record)                                                                    | -          |
| hideSelectAll           | 隐藏全选勾选框与自定义选择项                                    | boolean                                                                             | false      |
| preserveSelectedRowKeys | 当数据被删除时仍然保留选项的 `key`                              | boolean                                                                             | -          |
| renderCell              | 自定义选择框单元格渲染                                           | `Function(checked, record, index, originNode) => VNode \| RenderedCell`            | -          |
| selectedRowKeys         | 指定选中项的 key 数组，需要和 onChange 进行配合                 | `Key[]`                                                                             | \[]        |
| selections              | 自定义选择项 [配置项](#selection), 设为 `true` 时使用默认选择项 | [`SelectionItem`](#selection)[] \| boolean                                          | -          |
| type                    | 多选/单选，`checkbox` or `radio`                                | string                                                                              | `checkbox` |
| defaultShowIndex        | 是否默认显示成序号列                                            | boolean                                                                             | `false`    |
| indexFormatter          | 序号列的格式化函数，开启时有效                                  | ^[Function]`(index: number, pagination?: Partial<TablePaginationConfig>) => string` | -          |
| onChange                | 选中项发生变化时的回调                                          | Function(selectedRowKeys, selectedRows)                                             | -          |
| onSelect                | 用户手动选择/取消选择某列的回调                                 | Function(record, selected, selectedRows, nativeEvent)                               | -          |
| onSelectAll             | 用户手动选择/取消选择所有列的回调                               | Function(selected, selectedRows, changeRows)                                        | -          |
| onSelectInvert          | 用户手动选择反选的回调                                          | `Function(selectedRowKeys)`                                                         | -          |
| onSelectMultiple        | 使用 Shift 批量选择时的回调                                     | `Function(selected, selectedRows, changeRows)`                                      | -          |
| onSelectNone            | 用户清空选择的回调                                              | function()                                                                          | -          |

### scroll

| Name                     | Description                                                                                                                                                   | Type                     | Default |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------- |
| scrollToFirstRowOnChange | 当分页、排序、筛选变化后是否滚动到表格顶部                                                                                                                    | boolean                  | -       |
| x                        | 设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 ['max-content'](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width#max-content) | string \| number \| true | -       |
| y                        | 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值                                                                                                      | string \| number         | -       |

### selection

自定义选择配置项

| Name     | Description              | Type                        | Default |
| -------- | ------------------------ | --------------------------- | ------- |
| key      | Vue 需要的 key，建议设置 | string                      | -       |
| text     | 选择项显示的文字         | string\|VNode               | -       |
| onSelect | 选择项点击回调           | Function(changeableRowKeys) | -       |

### mergeCells

```ts
interface MergeCell {
  rowIndex: number;
  columnIndex: number;
  rowSpan?: number;
  colSpan?: number;
}

type MergeCells = MergeCell[];
```

### Key

表格文档中涉及主键相关的 `Key[]` 类型时，均表示由该类型组成的数组。

```ts
type Key = string | number;
```

### ColumnFilterItem

```ts
interface ColumnFilterItem {
  text: string;
  value: string | number;
  children?: ColumnFilterItem[];
}
```

### FilterDropdownProps

```ts
interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: Key[]) => void;
  selectedKeys: Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters?: (param?: FilterResetProps) => void;
  filters?: ColumnFilterItem[];
  visible: boolean;
  column: ColumnType;
  close: () => void;
}

interface FilterConfirmProps {
  closeDropdown: boolean;
}

interface FilterResetProps {
  confirm?: boolean;
  closeDropdown?: boolean;
}
```

## 注意

在 Table 中，`dataSource` 和 `columns` 里的数据值都需要指定 `key` 值。对于 `dataSource` 默认将每列数据的 `key` 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 `rowKey` 来指定数据列的主键。若没有指定，控制台会出现缺少 key 的提示，表格组件也会出现各类奇怪的错误。

```html
// 比如你的数据主键是 uid <e-table rowKey="uid" />;
```