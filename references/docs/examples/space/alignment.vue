<template>
  <div class="alignment-container">
    <e-space>
      string
      <e-button> button </e-button>
      <e-card>
        <template #header> header </template>
        body
      </e-card>
    </e-space>
  </div>
  <div class="alignment-container">
    <e-space alignment="flex-start">
      string
      <e-button> button </e-button>
      <e-card>
        <template #header> header </template>
        body
      </e-card>
    </e-space>
  </div>
  <div class="alignment-container">
    <e-space alignment="flex-end">
      string
      <e-button> button </e-button>
      <e-card>
        <template #header> header </template>
        body
      </e-card>
    </e-space>
  </div>
</template>

<style scoped>
.alignment-container {
  width: 240px;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid var(--e-border-color);
}
</style>
