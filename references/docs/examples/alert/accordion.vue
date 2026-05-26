<template>
  <e-alert title="success alert" type="success" description="more text description" collapsible />
  <e-alert
    title="info alert"
    type="info"
    description="more text description"
    collapsible
    collapse-text="collapse"
    expand-text="expand"
  />
  <e-alert
    title="warning alert"
    type="warning"
    description="more text description"
    center
    collapsible
    collapse-text="collapse"
    expand-text="expand"
  />
  <e-alert
    title="error alert"
    type="error"
    description="more text description"
    center
    show-icon
    collapsible
    collapse-text="collapse"
    expand-text="expand"
  />
</template>
<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>
