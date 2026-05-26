<template>
  <p class="text-center demonstration">normal vertical layout</p>
  <e-carousel height="200px" direction="vertical" :autoplay="false">
    <e-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </e-carousel-item>
  </e-carousel>
  <p class="text-center demonstration">card vertical layout</p>
  <e-carousel height="400px" direction="vertical" type="card" :autoplay="false">
    <e-carousel-item v-for="item in 4" :key="item">
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
