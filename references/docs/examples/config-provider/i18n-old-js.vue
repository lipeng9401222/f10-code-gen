<template>
  <div>
    <e-button mb-2 @click="toggle">Switch Language</e-button>
    <br />

    <e-config-provider :locale="locale">
      <e-select />
      <e-tree />
      <e-table mb-1 :data="[]" />
      <e-pagination :total="100" />
    </e-config-provider>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import zhCN from '@epoint-fe/eui-components/dist/locale/zh-cn.mjs';
import en from '@epoint-fe/eui-components/dist/locale/en.mjs';

const language = ref('zh-cn');
const locale = computed(() => (language.value === 'zh-cn' ? zhCN : en));

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn';
};
</script>
