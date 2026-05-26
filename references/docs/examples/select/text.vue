<template>
  <p>单选</p>
  <e-select
    v-model="value1"
    v-model:text="text1"
    :options="options1"
    :loading="loading1"
    @visible-change="onVisibleChange1"
  />
  <p>多选</p>
  <e-select
    v-model="value2"
    v-model:text="text2"
    :options="options2"
    :loading="loading2"
    multiple
    @visible-change="onVisibleChange2"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const source = [
  {
    value: '1',
    label: 'Option1',
  },
  {
    value: '2',
    label: 'Option2',
  },
  {
    value: '3',
    label: 'Option3',
  },
  {
    value: '4',
    label: 'Option4',
  },
  {
    value: '5',
    label: 'Option5',
  },
];

const value1 = ref('1');
const text1 = ref('Option1');
const options1 = ref([]);
const loading1 = ref(false);
const onVisibleChange1 = (visible: boolean) => {
  if (visible && options1.value.length === 0) {
    loading1.value = true;
    // 模拟懒加载
    setTimeout(() => {
      options1.value = source;
      loading1.value = false;
    }, 500);
  }
};

const value2 = ref(['2']);
const text2 = ref(['Option2']);
const options2 = ref([]);
const loading2 = ref(false);
const onVisibleChange2 = (visible: boolean) => {
  if (visible && options2.value.length === 0) {
    loading2.value = true;
    // 模拟懒加载
    setTimeout(() => {
      options2.value = source;
      loading2.value = false;
    }, 500);
  }
};
</script>
