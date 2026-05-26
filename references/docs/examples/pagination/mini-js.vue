<template>
  <div id="components-pagination-demo-mini">
    <e-pagination size="small" :total="50" />
    <e-pagination size="small" :total="50" show-size-changer show-quick-jumper />
    <e-pagination size="small" :total="50" :show-total="(total) => `Total ${total} items`" />
  </div>
</template>
<style scoped>
#components-pagination-demo-mini .e-pagination:not(:last-child) {
  margin-bottom: 24px;
}
</style>
