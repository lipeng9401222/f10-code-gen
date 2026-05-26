<template>
  <e-button plain @click="open1"> Success </e-button>
  <e-button plain @click="open2"> Warning </e-button>
  <e-button plain @click="open3"> Info </e-button>
  <e-button plain @click="open4"> Error </e-button>
</template>

<script lang="ts" setup>
import { ENotification } from '@epoint-fe/eui-components';

const open1 = () => {
  ENotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success',
  });
};

const open2 = () => {
  ENotification({
    title: 'Warning',
    message: 'This is a warning message',
    type: 'warning',
  });
};

const open3 = () => {
  ENotification({
    title: 'Info',
    message: 'This is an info message',
    type: 'info',
  });
};

const open4 = () => {
  ENotification({
    title: 'Error',
    message: 'This is an error message',
    type: 'error',
  });
};
</script>
