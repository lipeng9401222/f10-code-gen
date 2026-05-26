<template>
  <e-form label-position="left" label-width="150px" style="max-width: 460px">
    <e-space fill>
      <e-alert type="info" show-icon :closable="false">
        <p>“全名”标签会自动附加到输入框：</p>
      </e-alert>
      <e-form-item label="全名">
        <e-input v-model="formAccessibility.fullName" />
      </e-form-item>
    </e-space>
    <e-space fill>
      <e-alert type="info" show-icon :closable="false">
        <p>
          “您的信息”作为输入框组的标签。<br />
          您必须为各个输入框指定标签。占位符不能替代使用“label”属性。
        </p>
      </e-alert>
      <e-form-item label="您的信息">
        <e-row :gutter="20">
          <e-col :span="12">
            <e-input v-model="formAccessibility.firstName" label="名" placeholder="名" />
          </e-col>
          <e-col :span="12">
            <e-input v-model="formAccessibility.lastName" label="姓" placeholder="姓" />
          </e-col>
        </e-row>
      </e-form-item>
    </e-space>
  </e-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const formAccessibility = reactive({
  fullName: '',
  firstName: '',
  lastName: '',
});
</script>
