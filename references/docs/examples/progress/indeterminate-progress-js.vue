<template>
  <div class="demo-progress">
    <e-progress :percentage="50" :indeterminate="true" />
    <e-progress :percentage="100" :format="format" :indeterminate="true" />
    <e-progress :percentage="100" status="success" :indeterminate="true" :duration="5" />
    <e-progress :percentage="100" status="warning" :indeterminate="true" :duration="1" />
    <e-progress :percentage="50" status="exception" :indeterminate="true" />
  </div>
</template>

<script setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`);
</script>
<style scoped>
.demo-progress .e-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
