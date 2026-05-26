<template>
  <div class="demo-type">
    <div class="item">
      <e-avatar :size="60" src="https://empty" text="ZhangSanLiSi" @error="errorHandler" />
      <p>Fallback to text</p>
    </div>
    <div class="item">
      <e-avatar :size="60" src="https://empty" text="ZhangSanLiSi" @error="errorHandler">
        <span>slot</span>
      </e-avatar>
      <p>Slot overrides text</p>
    </div>
  </div>
</template>

<script setup>
const errorHandler = () => true;
</script>

<style scoped>
.demo-type {
  display: flex;
  gap: 24px;
}

.item {
  text-align: center;
}

.item p {
  margin-top: 8px;
  font-size: 12px;
  color: var(--e-text-color-secondary);
}
</style>
