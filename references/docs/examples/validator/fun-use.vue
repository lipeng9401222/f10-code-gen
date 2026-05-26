<template>
  <div>
    <div>
      <label>
        <span style="margin-right: 5px">普通的输入框上调用验证方法</span>
        <input v-model="textValue" type="text" @input="myValidate" />
      </label>

      <div v-if="!validateResult.isValid" style="color: red">
        <div>验证失败：</div>
        <div v-for="(it, i) in validateResult.errors" :key="i">{{ it.message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { validator } from '@epoint-fe/eui-components';

const { validateWithRules, validateOneRule, _validator, createNewValidator } = validator;

const textValue = ref('12345@qq.com');
const validateResult = ref({
  isValid: true,
  errors: [],
});

async function myValidate() {
  console.log('xxx');
  const results = await validateWithRules(textValue.value, [
    // emial 验证
    {
      type: 'email',
      message: '请输入有效的邮箱格式',
      required: true,
    },
    // 长度验证
    {
      type: 'string',
      min: 5,
      max: 20,
      message: '长度应在 5 到 20 之间',
    },
    // 自定义验证
    {
      validator: (v) => {
        const pre = v.split('@')[0];
        if (/^\d+$/.test(pre)) {
          return new Error('电子邮件的用户名不能全是数字');
        }
        return true;
      },
    },
    // 自定义验证2 走服务端验证
    {
      validator: async (v) => {
        return new Promise((resolve) => {
          // 用 fetch 或者 axios 获取数据 这里 setTimeout 模拟一下
          setTimeout(
            () => {
              if (/12345/.test(v) || Math.random() > 0.7) {
                resolve(new Error('该邮箱已被占用'));
              }
              resolve(true);
            },
            ((Math.random() * 500) >>> 0) + 100
          );
        });
      },
    },
  ]);
  const errorItems = results.filter((it) => !it.result);
  if (!errorItems.length) {
    validateResult.value = {
      isValid: true,
      errors: [],
    };
  } else {
    validateResult.value = {
      isValid: false,
      errors: errorItems,
    };
  }
}
</script>
