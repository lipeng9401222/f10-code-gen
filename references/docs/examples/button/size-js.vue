<template>
  <e-row>
    <e-button size="large">Large</e-button>
    <e-button>Default</e-button>
    <e-button size="small">Small</e-button>
    <e-button size="large" :icon="Search">Search</e-button>
    <e-button :icon="Search">Search</e-button>
    <e-button size="small" :icon="Search">Search</e-button>
  </e-row>
  <e-row class="my-4">
    <e-button size="large" round>Large</e-button>
    <e-button round>Default</e-button>
    <e-button size="small" round>Small</e-button>
    <e-button size="large" :icon="Search" round>Search</e-button>
    <e-button :icon="Search" round>Search</e-button>
    <e-button size="small" :icon="Search" round>Search</e-button>
  </e-row>
  <e-row>
    <e-button :icon="Search" size="large" circle />
    <e-button :icon="Search" circle />
    <e-button :icon="Search" size="small" circle />
  </e-row>
</template>

<script setup>
import { Search } from '@epoint-fe/eui-icons';
</script>
