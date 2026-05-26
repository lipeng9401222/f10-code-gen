<template>
  <e-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <e-button class="button" text>Operation button</e-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    <template #footer>
      <e-button text>Footer Content</e-button>
    </template>
  </e-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
