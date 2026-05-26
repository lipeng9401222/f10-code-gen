<template>
  <e-row :gutter="10">
    <e-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content e-bg-purple-light" /></e-col>
  </e-row>
</template>

<style scoped>
.e-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
