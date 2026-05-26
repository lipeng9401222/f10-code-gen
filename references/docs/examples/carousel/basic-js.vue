<template>
  <div class="block text-center">
    <span class="demonstration">Switch when indicator is hovered (default)</span>
    <e-carousel height="150px">
      <e-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </e-carousel-item>
    </e-carousel>
  </div>
  <div class="block text-center" m="t-4">
    <span class="demonstration">Switch when indicator is clicked</span>
    <e-carousel trigger="click" height="150px">
      <e-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </e-carousel-item>
    </e-carousel>
  </div>
</template>

<style scoped>
.demonstration {
  color: var(--e-text-color-secondary);
}

.e-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.e-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.e-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
