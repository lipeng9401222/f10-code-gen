<template>
  <div class="demo-progress">
    <e-progress :percentage="50" />
    <e-progress :percentage="100" :format="format" />
    <e-progress :percentage="100" status="success" />
    <e-progress :percentage="100" status="warning" />
    <e-progress :percentage="50" status="exception" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`);
</script>

<style scoped>
.demo-progress .e-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
