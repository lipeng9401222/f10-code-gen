<template>
  <e-row :gutter="20">
    <e-col :span="16"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="8"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row :gutter="20">
    <e-col :span="8"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="8"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row :gutter="20">
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="16"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
</template>

<style scoped>
.e-row {
  margin-bottom: 20px;
}
.e-row:last-child {
  margin-bottom: 0;
}
.e-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
