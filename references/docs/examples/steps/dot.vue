<template>
  <div class="steps-container-item">
    <e-steps :active="active" finish-status="success" dot align-center>
      <e-step title="Step 1" description="This is a description" />
      <e-step title="Step 2" description="This is a description" />
      <e-step title="Step 3" description="This is a description" />
    </e-steps>
  </div>

  <div class="steps-container-item-vertical">
    <e-steps :active="active" finish-status="success" dot direction="vertical" style="height: 300px" align-center>
      <e-step title="Step 1" status="success" description="This is a description" />
      <e-step title="Step 2" status="error" description="This is a description" />
      <e-step title="Step 3" status="wait" description="This is a description" />
    </e-steps>
  </div>

  <e-button style="margin-top: 12px" @click="next">Next step</e-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>

<style lang="scss" scoped>
.steps-container-item {
  margin-bottom: 40px;
}

.steps-container-item-vertical {
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
}
</style>
