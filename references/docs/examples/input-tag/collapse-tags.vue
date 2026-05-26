<template>
  <e-input-tag v-model="input" :max="10" collapse-tags collapse-tags-tooltip :max-collapse-tags="3" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<string[]>(['Vue', 'React', 'Angular', 'Svelte', 'Ember', 'Backbone', 'jQuery']);
</script>
