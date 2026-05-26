<template>
  <e-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2">Hover to activate</e-button>
    </template>
  </e-popover>

  <e-popover
    placement="bottom"
    title="Title"
    :width="200"
    trigger="click"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2">Click to activate</e-button>
    </template>
  </e-popover>

  <e-popover
    ref="popover"
    placement="right"
    title="Title"
    :width="200"
    trigger="focus"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2">Focus to activate</e-button>
    </template>
  </e-popover>

  <e-popover
    ref="popover"
    title="Title"
    :width="200"
    trigger="contextmenu"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2">contextmenu to activate</e-button>
    </template>
  </e-popover>

  <e-popover
    :visible="visible"
    placement="bottom"
    title="Title"
    :width="200"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <e-button class="m-2" @click="visible = !visible">Manual to activate</e-button>
    </template>
  </e-popover>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<style scoped>
.e-button + .e-button {
  margin-left: 8px;
}
</style>
