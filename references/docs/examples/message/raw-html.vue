<template>
  <e-button :plain="true" @click="openHTML">Use HTML String</e-button>
</template>

<script lang="ts" setup>
import { EMessage } from '@epoint-fe/eui-components';

const openHTML = () => {
  EMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  });
};
</script>
