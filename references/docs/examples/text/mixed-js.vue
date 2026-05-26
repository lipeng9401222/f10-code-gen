<template>
  <e-space direction="vertical">
    <e-text>
      <e-icon>
        <Flag />
      </e-icon>
      旗帜
    </e-text>
    <e-row>
      <e-text>Rate</e-text>
      <e-rate class="ml-1" />
    </e-row>
    <e-text>
      This is text mixed icon
      <e-icon>
        <Bell />
      </e-icon>
      and component
      <e-button>Button</e-button>
    </e-text>
  </e-space>
</template>

<script setup>
import { Bell, Flag } from '@epoint-fe/eui-icons';
</script>
