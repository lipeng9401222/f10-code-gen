<template>
  <e-mention v-model="value" :options="options" style="width: 320px" placeholder="Please input">
    <template #label="{ item }">
      <div style="display: flex; align-items: center">
        <e-avatar :size="24" :src="item.avatar" />
        <span style="margin-left: 6px">{{ item.value }}</span>
      </div>
    </template>
  </e-mention>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');

const options = ref([
  {
    value: 'Fuphoenixes',
    avatar: 'https://avatars.githubusercontent.com/u/27912232',
  },
  {
    value: 'kooriookami',
    avatar: 'https://avatars.githubusercontent.com/u/38392315',
  },
  {
    value: 'Jeremy',
    avatar: 'https://avatars.githubusercontent.com/u/15975785',
  },
  {
    value: 'btea',
    avatar: 'https://avatars.githubusercontent.com/u/24516654',
  },
]);
</script>
