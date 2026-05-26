<template>
  <e-popconfirm
    width="220"
    confirm-button-text="OK"
    cancel-button-text="No, Thanks"
    :icon="InfoFilled"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
  >
    <template #reference>
      <e-button>Delete</e-button>
    </template>
  </e-popconfirm>
</template>

<script setup>
import { InfoFilled } from '@epoint-fe/eui-icons';
</script>
