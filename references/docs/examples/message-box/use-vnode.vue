<template>
  <e-button plain @click="open">Common VNode</e-button>
  <e-button plain @click="open1">Dynamic props</e-button>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { EMessageBox, ESwitch } from '@epoint-fe/eui-components';

const open = () => {
  EMessageBox({
    title: 'Message',
    message: h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
  });
};

const open1 = () => {
  const checked = ref<boolean | string | number>(false);
  EMessageBox({
    title: 'Message',
    // Should pass a function if VNode contains dynamic props
    message: () =>
      h(ESwitch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (val: boolean | string | number) => {
          checked.value = val;
        },
      }),
  });
};
</script>
