<template>
  <e-checkbox-group v-model="checkList">
    <e-checkbox value="A" label="选项 A" />
    <e-checkbox value="B" label="选项 B" />
    <e-checkbox value="C" label="选项 C" />
    <e-checkbox v-model="independentValue" value="D" label="跳出组" :skip-group="true" />
  </e-checkbox-group>

  <e-button @click="onSubmit">提交</e-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkList = ref([]);

const independentValue = ref(false);

const onSubmit = () => {
  console.log(checkList.value, independentValue.value);
};
</script>
