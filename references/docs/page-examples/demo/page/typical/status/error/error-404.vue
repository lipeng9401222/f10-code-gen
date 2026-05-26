<template>
  <div class="eui-page">
    <div class="eui-main-section section__center tip-main">
      <img src="./images/img-404.svg" alt="404插图" width="520" height="430" />
      <div class="tip-content flex flex-col gap-xxl">
        <h2 class="text-brand text-xxxl fw-bold">404</h2>
        <p class="tip">抱歉，您访问的页面不存在</p>
        <div>
          <e-button type="primary" @click="reload">重试</e-button>
          <e-button @click="goBack">返回</e-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineOptions({
  name: 'Error404'
});

const router = useRouter();

const reload = () => {
  window.location.reload();
};

const goBack = () => {
  router.back();
};
</script>

<style scoped lang="scss">
.tip-main {
  /* 2*(2+12+36)=100px */
  gap: calc(2 * (var(--e-space-xs) + var(--e-space-l) + var(--e-space-xxxl)));
}

.gap-xxl {
  gap: var(--e-space-xxl);
}

.tip-content {
  width: 520px;
}
</style>
