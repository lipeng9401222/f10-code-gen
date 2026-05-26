<template>
  <e-button plain @click="open1"> Top Right </e-button>
  <e-button plain @click="open2"> Bottom Right </e-button>
  <e-button plain @click="open3"> Bottom Left </e-button>
  <e-button plain @click="open4"> Top Left </e-button>
</template>

<script setup>
import { ENotification } from '@epoint-fe/eui-components';

const open1 = () => {
  ENotification({
    title: 'Custom Position',
    message: "I'm at the top right corner",
  });
};

const open2 = () => {
  ENotification({
    title: 'Custom Position',
    message: "I'm at the bottom right corner",
    position: 'bottom-right',
  });
};

const open3 = () => {
  ENotification({
    title: 'Custom Position',
    message: "I'm at the bottom left corner",
    position: 'bottom-left',
  });
};

const open4 = () => {
  ENotification({
    title: 'Custom Position',
    message: "I'm at the top left corner",
    position: 'top-left',
  });
};
</script>
