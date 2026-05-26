<template>
  <div class="example-pagination-block">
    <div class="example-demonstration">当你只有几页时</div>
    <e-pagination :total="50" />
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">当你只有很多页时</div>
    <e-pagination :total="10000" />
  </div>
</template>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
