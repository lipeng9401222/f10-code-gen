<template>
  <e-popconfirm
    confirm-button-text="Yes"
    cancel-button-text="No"
    :icon="InfoFilled"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <e-button>Delete</e-button>
    </template>
  </e-popconfirm>
</template>

<script setup lang="ts">
import { InfoFilled } from '@epoint-fe/eui-icons';

const confirmEvent = () => {
  console.log('confirm!');
};
const cancelEvent = () => {
  console.log('cancel!');
};
</script>
