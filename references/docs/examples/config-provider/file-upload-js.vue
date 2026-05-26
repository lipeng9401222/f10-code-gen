<template>
  <div>
    <e-config-provider :file-upload="config">
      <e-file-upload action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile" />
    </e-config-provider>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const config = reactive({
  chunkSize: 1024,
  typeLimit: 'doc,docx,xls,xlsx,png,jpg,jpeg',
});
</script>
