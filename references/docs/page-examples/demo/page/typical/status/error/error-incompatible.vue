<template>
  <div class="eui-page">
    <div class="eui-main-section section__center tip-main">
      <img src="./images/img-incompatible.svg" alt="不兼容插图" width="520" height="430" />
      <div class="tip-content flex flex-col gap-xxl">
        <h2 class="text-brand text-xxxl fw-bold">浏览器不兼容</h2>
        <p class="tip">浏览器版本过低，为避免可能存在的安全隐患，推荐升级以下浏览器。</p>
        <div class="flex gap-xxl">
          <e-link :underline="false" href="https://www.microsoft.com/zh-cn/edge" target="_blank" title="微软 Edge">
            <img src="./images/icon-edge.svg" alt="微软 Edge" width="42" height="42" />
          </e-link>
          <e-link :underline="false" href="https://www.firefox.com/zh-CN" target="_blank" title="火狐 Firefox">
            <img src="./images/icon-fire-fox.svg" alt="火狐 Firefox" width="42" height="42" />
          </e-link>
          <e-link :underline="false" href="https://www.google.cn/chrome/index.html" target="_blank" title="谷歌 Chrome">
            <img src="./images/icon-chrome.svg" alt="谷歌 Chrome" width="42" height="42" />
          </e-link>
          <e-link :underline="false" href="https://www.apple.com.cn/safari/" target="_blank" title="苹果 Safari">
            <img src="./images/icon-safari.svg" alt="苹果 Safari" width="42" height="42" />
          </e-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ErrorIncompatible'
});
</script>

<style lang="scss" scoped>
.e-link {
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
}

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
