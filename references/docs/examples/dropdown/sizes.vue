<template>
  <e-dropdown size="large" split-button type="primary">
    Large
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item>Action 4</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>

  <e-dropdown split-button type="primary">
    Default
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item>Action 4</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>

  <e-dropdown size="small" split-button type="primary">
    Small
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item>Action 4</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>
<style scoped>
.example-showcase .e-dropdown + .e-dropdown {
  margin-left: 15px;
}
</style>
