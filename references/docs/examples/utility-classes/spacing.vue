<template>
  <div class="utility-demo">
    <h4>外边距</h4>
    <div class="flex items-center gap-s mb-l">
      <div class="demo-bg">
        <div class="border text-center text-sm demo-box-size m-xs">xs</div>
      </div>
      <div class="demo-bg">
        <div class="border text-center text-sm demo-box-size m-s">s</div>
      </div>
      <div class="demo-bg">
        <div class="border text-center text-sm demo-box-size m-m">m</div>
      </div>
      <div class="demo-bg">
        <div class="border text-center text-sm demo-box-size m-l">l</div>
      </div>
      <div class="demo-bg">
        <div class="border text-center text-sm demo-box-size m-xl">xl</div>
      </div>
    </div>

    <h4>内边距</h4>
    <div class="flex items-center gap-s mb-l">
      <div class="demo-outline">
        <div class="border text-center text-sm demo-bg-content demo-inner-size p-xs">xs</div>
      </div>
      <div class="demo-outline">
        <div class="border text-center text-sm demo-bg-content demo-inner-size p-s">s</div>
      </div>
      <div class="demo-outline">
        <div class="border text-center text-sm demo-bg-content demo-inner-size p-m">m</div>
      </div>
      <div class="demo-outline">
        <div class="border text-center text-sm demo-bg-content demo-inner-size p-l">l</div>
      </div>
    </div>

    <h4>方向性间距</h4>
    <div class="flex items-center gap-s mb-l">
      <div class="demo-bg">
        <div class="border text-center text-sm demo-box-size mt-l">上外边距</div>
      </div>
      <div class="demo-bg">
        <div class="border text-center text-sm demo-box-size ml-l">左外边距</div>
      </div>
      <div class="demo-outline">
        <div class="border text-center text-sm demo-box-size px-l demo-bg-content">水平内边距</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-box-size {
  min-width: 60px;
  line-height: 32px;
  background-color: #fff;
}

.demo-inner-size {
  min-width: 40px;
  line-height: 24px;
}

.demo-bg {
  background: #facda1;
}
.demo-outline {
  background-color: #c5cf8b;
}
.demo-bg-content {
  background: content-box #8eb5c2;
}
</style>
