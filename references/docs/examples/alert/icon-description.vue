<template>
  <e-alert title="success alert" type="success" description="more text description" show-icon />
  <e-alert title="info alert" type="info" description="more text description" show-icon />
  <e-alert title="warning alert" type="warning" description="more text description" show-icon />
  <e-alert title="error alert" type="error" description="more text description" show-icon />
</template>
<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>
