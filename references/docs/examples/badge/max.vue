<template>
  <e-badge :value="200" :max="99" class="item">
    <e-button>comments</e-button>
  </e-badge>
  <e-badge :value="100" :max="10" class="item">
    <e-button>replies</e-button>
  </e-badge>
</template>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
