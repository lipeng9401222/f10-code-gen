<template>
  <div class="block text-center" style="height: 300px">
    <span class="demonstration">每个 carouselItem 有不同的高度</span>
    <e-carousel height="auto" autoplay>
      <e-carousel-item style="height: 100px">
        <h3 class="small justify-center" text="2xl">height 100px</h3>
      </e-carousel-item>
      <e-carousel-item style="height: 200px">
        <h3 class="small justify-center" text="2xl">height 200px</h3>
      </e-carousel-item>
      <e-carousel-item style="height: 300px">
        <h3 class="small justify-center" text="2xl">height 300px</h3>
      </e-carousel-item>
    </e-carousel>
  </div>
</template>

<style scoped>
.carouse-item {
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.e-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  display: flex;
  align-items: center;
  margin: 0;
  text-align: center;
  height: 100%;
}

.e-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.e-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
