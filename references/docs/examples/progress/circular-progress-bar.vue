<template>
  <div class="demo-progress">
    <e-progress type="circle" :percentage="0" />
    <e-progress type="circle" :percentage="25" />
    <e-progress type="circle" :percentage="100" status="success" />
    <e-progress type="circle" :percentage="70" status="warning" />
    <e-progress type="circle" :percentage="50" status="exception" />
  </div>
</template>
<style scoped>
.demo-progress .e-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .e-progress--circle {
  margin-right: 15px;
}
</style>
