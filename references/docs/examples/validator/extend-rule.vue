<template>
  <e-form ref="ruleFormRef" :model="formdata" :rules="rules" label-width="220px" class="demo-ruleForm" status-icon>
    <e-form-item label="uuid-v4" prop="guid">
      <e-input v-model="formdata.guid" />
    </e-form-item>
    <e-form-item label="版本号" prop="version1">
      <e-input v-model="formdata.version1" />
    </e-form-item>
    <e-form-item label="版本号-只能大写" prop="version2">
      <e-input v-model="formdata.version2" />
    </e-form-item>
    <e-form-item label="版本号-不支持预发布版本" prop="version3">
      <e-input v-model="formdata.version3" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(ruleFormRef)"> 创建 </e-button>
    </e-form-item>
  </e-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { validator } from '@epoint-fe/eui-components';
import type { FormInstance, FormRules } from '@epoint-fe/eui-components';
const ruleFormRef = ref<FormInstance>();
const { _validator } = validator;

// 全局扩展规则
_validator.register(
  {
    type: 'uuid-v4',
    // message: 'UUID 格式不正确,仅支持 v4 格式',
  },
  (value) => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value);
  }
);
_validator.register(
  {
    type: 'version-string',
    ignoreCase: true, // 配置项 是否忽略大小写
    allowPrereleases: true, // 配置项 是否允许 prerelease 版本
    prereleasesList: ['alpha', 'beta', 'rc'], // 配置项 prerelease 版本列表
    // message: '版本号格式不正确,',
  },
  (input, config) => {
    // 第一个参数是要验证的值，第二个参数是实际的配置项目
    const { ignoreCase, allowPrereleases, prereleasesList } = config;

    const versionRegex = ignoreCase
      ? new RegExp('^\\d+\\.\\d+\\.\\d+(-[0-9A-Z-]+)?$', 'i')
      : new RegExp('^\\d+\\.\\d+\\.\\d+(-[0-9A-Z-]+)?$');

    if (!versionRegex.test(input)) {
      return false;
    }

    if (!allowPrereleases) {
      const prereleaseRegex = new RegExp(`-${prereleasesList.join('|')}`);
      if (prereleaseRegex.test(input)) {
        return false;
      }
    }

    return true;
  }
);

const formdata = ref({
  guid: '16ABC8A2-F989-48DF-A220-F12FD9F4BA05___',
  version1: '1.1.1-beta',
  version2: '1.1.1-beta',
  version3: '1.1.1-alpha',
});
const rules = reactive<FormRules>({
  guid: [{ type: 'uuid-v4', required: true, message: 'UUID 格式不正确,仅支持 v4 格式' }],
  version1: [{ type: 'version-string', required: true, message: '版本号格式不正确' }],
  version2: [{ type: 'version-string', required: true, ignoreCase: false, message: '版本号格式不正确，字母需要大写' }],
  version3: [
    {
      type: 'version-string',
      required: true,
      ignoreCase: false,
      allowPrereleases: false,
      message: '版本号格式不正确，不支持预发布版本',
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('提交成功！');
    } else {
      console.log('提交失败！', fields);
    }
  });
};
</script>
