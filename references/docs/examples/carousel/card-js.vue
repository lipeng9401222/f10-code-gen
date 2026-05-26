<template>
  <e-carousel :interval="4000" type="card" height="200px">
    <e-carousel-item v-for="item in 6" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </e-carousel-item>
  </e-carousel>
</template>

<style scoped>
.e-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
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
