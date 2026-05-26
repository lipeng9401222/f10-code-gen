<template>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag :icon="User">User</e-tag>
    <e-tag :icon="Star" type="success">Star</e-tag>
    <e-tag :icon="Message" type="info">Message</e-tag>
    <e-tag :icon="Warning" type="warning">Warning</e-tag>
    <e-tag :icon="Delete" type="danger">Delete</e-tag>
  </div>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag :icon="User" effect="dark">User</e-tag>
    <e-tag :icon="Star" type="success" effect="dark">Star</e-tag>
    <e-tag :icon="Message" type="info" effect="dark">Message</e-tag>
    <e-tag :icon="Warning" type="warning" effect="dark">Warning</e-tag>
    <e-tag :icon="Delete" type="danger" effect="dark">Delete</e-tag>
  </div>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag :icon="User" round>User</e-tag>
    <e-tag :icon="Star" type="success" round>Star</e-tag>
    <e-tag :icon="Message" type="info" round>Message</e-tag>
    <e-tag :icon="Warning" type="warning" round>Warning</e-tag>
    <e-tag :icon="Delete" type="danger" round>Delete</e-tag>
  </div>
</template>

<script lang="ts" setup>
import { Delete, Message, Star, User, Warning } from '@epoint-fe/eui-icons';
</script>
