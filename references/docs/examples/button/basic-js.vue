<template>
  <e-row class="mb-4">
    <e-button>Default</e-button>
    <e-button type="primary">Primary</e-button>
    <e-button type="success">Success</e-button>
    <e-button type="info">Info</e-button>
    <e-button type="warning">Warning</e-button>
    <e-button type="danger">Danger</e-button>
  </e-row>

  <e-row class="mb-4">
    <e-button plain>Plain</e-button>
    <e-button type="primary" plain>Primary</e-button>
    <e-button type="success" plain>Success</e-button>
    <e-button type="info" plain>Info</e-button>
    <e-button type="warning" plain>Warning</e-button>
    <e-button type="danger" plain>Danger</e-button>
  </e-row>

  <e-row class="mb-4">
    <e-button round>Round</e-button>
    <e-button type="primary" round>Primary</e-button>
    <e-button type="success" round>Success</e-button>
    <e-button type="info" round>Info</e-button>
    <e-button type="warning" round>Warning</e-button>
    <e-button type="danger" round>Danger</e-button>
  </e-row>

  <e-row>
    <e-button :icon="Search" circle />
    <e-button type="primary" :icon="Edit" circle />
    <e-button type="success" :icon="Check" circle />
    <e-button type="info" :icon="Message" circle />
    <e-button type="warning" :icon="Star" circle />
    <e-button type="danger" :icon="Delete" circle />
  </e-row>
</template>

<script setup>
import { Check, Delete, Edit, Message, Search, Star } from '@epoint-fe/eui-icons';
</script>
