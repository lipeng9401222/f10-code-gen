<template>
  <e-alert title="unclosable alert" type="success" :closable="false" />
  <e-alert title="customized close-text" type="info" close-text="Gotcha" />
  <e-alert title="alert with callback" type="warning" @close="hello" />
</template>

<script lang="ts" setup>
const hello = () => {
  // eslint-disable-next-line no-alert
  alert('Hello World!');
};
</script>
<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>
