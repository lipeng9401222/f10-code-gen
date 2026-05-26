<template>
  <e-form v-model="position1" :inline="true">
    <e-form-item label="x">
      <e-select v-model="position1.x">
        <e-option label="left" value="left" />
        <e-option label="center" value="center" />
        <e-option label="right" value="right" />
      </e-select>
    </e-form-item>
    <e-form-item label="y">
      <e-select v-model="position1.y">
        <e-option label="top" value="top" />
        <e-option label="center" value="center" />
        <e-option label="bottom" value="bottom" />
      </e-select>
    </e-form-item>
    <e-form-item>
      <e-button @click="visible = true">打开对话框</e-button>
    </e-form-item>
  </e-form>
  <e-form v-model="position2" :inline="true">
    <e-form-item label="x">
      <e-select v-model="position2.x">
        <e-option label="left" value="left" />
        <e-option label="center" value="center" />
        <e-option label="right" value="right" />
      </e-select>
    </e-form-item>
    <e-form-item label="y">
      <e-select v-model="position2.y">
        <e-option label="top" value="top" />
        <e-option label="center" value="center" />
        <e-option label="bottom" value="bottom" />
      </e-select>
    </e-form-item>
    <e-form-item>
      <e-button @click="handleClick">打开对话框</e-button>
    </e-form-item>
  </e-form>

  <e-form v-model="position3" :inline="true">
    <e-form-item label="x">
      <e-input-number v-model="position3.x" />
    </e-form-item>
    <e-form-item label="y">
      <e-input-number v-model="position3.y" />
    </e-form-item>
    <e-form-item>
      <e-button @click="visible3 = true">打开对话框</e-button>
    </e-form-item>
  </e-form>

  <e-dialog v-model="visible" :position="position1" title="dialog1" :modal="false" draggable>
    这是对话框内容。
  </e-dialog>
  <e-dialog ref="dialogRef" title="dialog2" :width="500" :modal="false" draggable> 这是对话框内容。 </e-dialog>
  <!-- 测试坐标值， 并且外部可控 -->
  <e-dialog v-model="visible3" :position="position3" title="dialog3" :modal="false" draggable>
    这是对话框内容。
  </e-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const dialogRef = ref();

const visible = ref(false);
const visible3 = ref(false);

const position1 = reactive({
  x: 'center',
  y: 'center',
});

const position2 = reactive({
  x: 'right',
  y: 'bottom',
});

const position3 = reactive({
  x: 100,
  y: 100,
});

const handleClick = () => {
  dialogRef.value.showAtPos(position2);
};
</script>
