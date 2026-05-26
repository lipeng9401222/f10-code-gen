<template>
  <e-row class="row-bg">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="center">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="end">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /> </e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="space-between">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="space-around">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="space-evenly">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
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
