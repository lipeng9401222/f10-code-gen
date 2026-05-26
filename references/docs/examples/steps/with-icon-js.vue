<template>
  <e-steps :active="1">
    <e-step title="Step 1" :icon="Edit" />
    <e-step title="Step 2" :icon="Upload" />
    <e-step title="Step 3" :icon="Picture" />
  </e-steps>
</template>

<script setup>
import { Edit, Picture, Upload } from '@epoint-fe/eui-icons';
</script>
