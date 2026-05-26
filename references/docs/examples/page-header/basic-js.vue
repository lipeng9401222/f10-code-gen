<template>
  <e-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </e-page-header>
</template>
<script setup>
const goBack = () => {
  console.log('go back');
};
</script>
