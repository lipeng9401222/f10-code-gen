<script setup>
import { isDark } from '~/utils/is-dark';
</script>

<template>
  <div class="flex">
    <e-button color="#626aef" :dark="isDark">Default</e-button>
    <e-button color="#626aef" :dark="isDark" plain>Plain</e-button>

    <e-button color="#626aef" :dark="isDark" disabled>Disabled</e-button>
    <e-button color="#626aef" :dark="isDark" disabled plain>Disabled Plain</e-button>
  </div>
</template>
