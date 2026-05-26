<template>
  <e-steps :space="200" :active="1" simple>
    <e-step title="Step 1" :icon="Edit" />
    <e-step title="Step 2" :icon="UploadFilled" />
    <e-step title="Step 3" :icon="Picture" />
  </e-steps>

  <e-steps :active="1" finish-status="success" simple style="margin-top: 20px">
    <e-step title="Step 1" />
    <e-step title="Step 2" />
    <e-step title="Step 3" />
  </e-steps>
</template>

<script setup>
import { Edit, Picture, UploadFilled } from '@epoint-fe/eui-icons';
</script>
