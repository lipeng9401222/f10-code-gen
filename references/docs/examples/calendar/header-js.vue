<template>
  <e-calendar ref="calendar">
    <template #header="{ date }">
      <span>Custom header content</span>
      <span>{{ date }}</span>
      <e-button-group>
        <e-button size="small" @click="selectDate('prev-year')"> Previous Year </e-button>
        <e-button size="small" @click="selectDate('prev-month')"> Previous Month </e-button>
        <e-button size="small" @click="selectDate('today')">Today</e-button>
        <e-button size="small" @click="selectDate('next-month')"> Next Month </e-button>
        <e-button size="small" @click="selectDate('next-year')"> Next Year </e-button>
      </e-button-group>
    </template>
  </e-calendar>
</template>

<script setup>
import { ref } from 'vue';

const calendar = ref();
const selectDate = (val) => {
  calendar.value.selectDate(val);
};
</script>
