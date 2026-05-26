<template>
  <div class="affix-container">
    <e-affix target=".affix-container" :offset="80">
      <e-button type="primary">Target container</e-button>
    </e-affix>
  </div>
</template>
<style scoped>
.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--e-color-primary-light-9);
}
</style>
