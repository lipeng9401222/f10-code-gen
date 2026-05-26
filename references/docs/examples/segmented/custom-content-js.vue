<template>
  <div>
    <e-segmented v-model="value" :options="options">
      <template #default="scope">
        <div class="flex flex-col items-center gap-2 p-2">
          <e-icon size="20">
            <component :is="scope.item.icon" />
          </e-icon>
          <div>{{ scope.item.label }}</div>
        </div>
      </template>
    </e-segmented>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { Apple, Cherry, Grape, Orange, Pear, Watermelon } from '@epoint-fe/eui-icons';

const value = ref('Apple');

const options = [
  {
    label: 'Apple',
    value: 'Apple',
    icon: Apple,
  },
  {
    label: 'Cherry',
    value: 'Cherry',
    icon: Cherry,
  },
  {
    label: 'Grape',
    value: 'Grape',
    icon: Grape,
  },
  {
    label: 'Orange',
    value: 'Orange',
    icon: Orange,
  },
  {
    label: 'Pear',
    value: 'Pear',
    icon: Pear,
  },
  {
    label: 'Watermelon',
    value: 'Watermelon',
    icon: Watermelon,
  },
];
</script>
