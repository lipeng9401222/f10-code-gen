<template>
  <e-select
    v-model="value"
    filterable
    :options="options"
    placeholder="Please select"
    style="width: 240px; margin-right: 16px; vertical-align: middle"
    multiple
    :virtual-list-props="{
      height: 200,
    }"
  />
  <e-select
    v-model="value"
    disabled
    filterable
    :options="options"
    placeholder="Please select"
    style="width: 240px; vertical-align: middle"
    multiple
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref([]);
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
  disabled: idx % 10 === 0,
}));
</script>
