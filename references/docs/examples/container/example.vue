<template>
  <e-container class="layout-container-demo" style="height: 500px">
    <e-aside width="200px">
      <e-scrollbar>
        <e-menu :default-openeds="['1', '3']">
          <e-sub-menu index="1">
            <template #title>
              <e-icon><message /></e-icon>Navigator One
            </template>
            <e-menu-item-group>
              <template #title>Group 1</template>
              <e-menu-item index="1-1">Option 1</e-menu-item>
              <e-menu-item index="1-2">Option 2</e-menu-item>
            </e-menu-item-group>
            <e-menu-item-group title="Group 2">
              <e-menu-item index="1-3">Option 3</e-menu-item>
            </e-menu-item-group>
            <e-sub-menu index="1-4">
              <template #title>Option4</template>
              <e-menu-item index="1-4-1">Option 4-1</e-menu-item>
            </e-sub-menu>
          </e-sub-menu>
          <e-sub-menu index="2">
            <template #title>
              <e-icon><icon-menu /></e-icon>Navigator Two
            </template>
            <e-menu-item-group>
              <template #title>Group 1</template>
              <e-menu-item index="2-1">Option 1</e-menu-item>
              <e-menu-item index="2-2">Option 2</e-menu-item>
            </e-menu-item-group>
            <e-menu-item-group title="Group 2">
              <e-menu-item index="2-3">Option 3</e-menu-item>
            </e-menu-item-group>
            <e-sub-menu index="2-4">
              <template #title>Option 4</template>
              <e-menu-item index="2-4-1">Option 4-1</e-menu-item>
            </e-sub-menu>
          </e-sub-menu>
          <e-sub-menu index="3">
            <template #title>
              <e-icon><setting /></e-icon>Navigator Three
            </template>
            <e-menu-item-group>
              <template #title>Group 1</template>
              <e-menu-item index="3-1">Option 1</e-menu-item>
              <e-menu-item index="3-2">Option 2</e-menu-item>
            </e-menu-item-group>
            <e-menu-item-group title="Group 2">
              <e-menu-item index="3-3">Option 3</e-menu-item>
            </e-menu-item-group>
            <e-sub-menu index="3-4">
              <template #title>Option 4</template>
              <e-menu-item index="3-4-1">Option 4-1</e-menu-item>
            </e-sub-menu>
          </e-sub-menu>
        </e-menu>
      </e-scrollbar>
    </e-aside>

    <e-container>
      <e-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <e-dropdown>
            <e-icon style="margin-right: 8px; margin-top: 1px"><setting /></e-icon>
            <template #dropdown>
              <e-dropdown-menu>
                <e-dropdown-item>View</e-dropdown-item>
                <e-dropdown-item>Add</e-dropdown-item>
                <e-dropdown-item>Delete</e-dropdown-item>
              </e-dropdown-menu>
            </template>
          </e-dropdown>
          <span>Tom</span>
        </div>
      </e-header>

      <e-main>
        <e-scrollbar>
          <e-table :data-source="tableData" :columns="columns" />
        </e-scrollbar>
      </e-main>
    </e-container>
  </e-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Menu as IconMenu, Message, Setting } from '@epoint-fe/eui-icons';

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
};
const tableData = ref(Array.from({ length: 20 }).fill(item));

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 140,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
</script>

<style scoped>
.layout-container-demo .e-header {
  position: relative;
  background-color: var(--e-color-primary-light-7);
  color: var(--e-text-color-primary);
}
.layout-container-demo .e-aside {
  color: var(--e-text-color-primary);
  background: var(--e-color-primary-light-8);
}
.layout-container-demo .e-menu {
  border-right: none;
}
.layout-container-demo .e-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
