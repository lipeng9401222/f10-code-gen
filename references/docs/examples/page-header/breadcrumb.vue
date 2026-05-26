<template>
  <e-page-header>
    <template #breadcrumb>
      <e-breadcrumb separator="/">
        <e-breadcrumb-item :to="{ path: './page-header.html' }"> homepage </e-breadcrumb-item>
        <e-breadcrumb-item><a href="./page-header.html">route 1</a></e-breadcrumb-item>
        <e-breadcrumb-item>route 2</e-breadcrumb-item>
      </e-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </e-page-header>
</template>
