<template>
  <e-calendar>
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </e-calendar>
</template>

<style scoped>
.is-selected {
  color: #1989fa;
}
</style>
