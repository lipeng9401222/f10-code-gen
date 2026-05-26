<template>
  <e-breadcrumb :separator-icon="ArrowRight">
    <e-breadcrumb-item :to="{ path: '/' }">homepage</e-breadcrumb-item>
    <e-breadcrumb-item>promotion management</e-breadcrumb-item>
    <e-breadcrumb-item>promotion list</e-breadcrumb-item>
    <e-breadcrumb-item>promotion detail</e-breadcrumb-item>
  </e-breadcrumb>
</template>

<script setup>
import { ArrowRight } from '@epoint-fe/eui-icons';
</script>
