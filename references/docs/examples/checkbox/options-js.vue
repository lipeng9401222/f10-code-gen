<template>
  <div class="demo-checkbox-group-with-data">
    <e-button @click="add">新增选项</e-button>

    <e-form v-model="formData">
      <e-form-item label="选项" props="check">
        <e-checkbox-group v-model="formData.check" :options="data" />
      </e-form-item>
      <e-form-item label="选项(自定义渲染)" props="check">
        <e-checkbox-group v-model="formData.check" class="diy-checkbox-group" :options="data" :render="customRender" />
      </e-form-item>
      <e-form-item label="选项按钮" props="check">
        <e-checkbox-group v-model="formData.check" :options="data" option-type="button" />
      </e-form-item>

      <e-alert type="info" show-icon :closable="false">
        <p>自己写标签时优先级更高,options 不会生效</p>
      </e-alert>
      <e-form-item label="选项" props="check">
        <e-checkbox-group v-model="formData.check" :options="data">
          <e-checkbox value="1">1</e-checkbox>
          <e-checkbox value="2">2</e-checkbox>
          <e-checkbox value="3">3</e-checkbox>
        </e-checkbox-group>
      </e-form-item>
    </e-form>
  </div>
</template>

<script setup>
import { h, reactive } from 'vue';
const _data = Array.from({ length: 5 })
  .fill(0)
  .map((_, i) => ({
    label: `选项${i + 1}`,
    value: `${i + 1}`,
    disabled: false,
    contentStyle: `color: red; font-size: ${20 - i * 2}px; opacity: ${1 - (i + 1) * 0.1}`,
  }));
_data[0].disabled = true;
_data[2].disabled = true;
_data[4].disabled = true;
const data = reactive(_data);

const formData = reactive({
  check: ['1', '2', '3'],
});

const customRender = (itemData) => {
  console.log(itemData);
  return h(
    'div',
    {
      style: itemData.contentStyle,
    },
    [h('span', { class: 'diy-index' }), h('span', ` ${itemData.label}`)]
  );
};

function add() {
  const i = data.length + 1;
  const j = i % 5;
  const contentStyle = `color: red; font-size: ${20 - j * 2}px; opacity: ${1 - (j + 1) * 0.1}`;
  data.push({
    label: `选项${i}`,
    value: `${i}`,
    disabled: false,
    contentStyle,
  });
  console.log(data);
}
</script>

<style lang="scss">
.demo-checkbox-group-with-data {
  .diy-checkbox-group {
    counter-reset: diy-counter;
  }

  .diy-index {
    counter-increment: diy-counter;
  }

  .diy-index::before {
    content: counter(diy-counter) '. ';
    font-weight: bold;
  }
}
</style>
