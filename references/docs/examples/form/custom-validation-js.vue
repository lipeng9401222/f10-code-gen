<template>
  <e-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <e-form-item label="密码" prop="pass">
      <e-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password />
    </e-form-item>
    <e-form-item label="再次输入密码" prop="checkPass">
      <e-input v-model="ruleForm.checkPass" type="password" autocomplete="off" show-password />
    </e-form-item>
    <e-form-item label="年龄" prop="age">
      <e-input v-model.number="ruleForm.age" />
    </e-form-item>
    <e-form-item>
      <e-button type="primary" @click="submitForm(ruleFormRef)">Submit</e-button>
      <e-button @click="resetForm(ruleFormRef)">Reset</e-button>
    </e-form-item>
  </e-form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const ruleFormRef = ref();

const checkAge = (value, rule) => {
  if (!value) {
    return new Error('请输入年龄');
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        resolve(new Error('年龄只能是数字'));
      } else {
        if (value < 18) {
          resolve(new Error('年龄必须大于18'));
        } else {
          resolve(true);
        }
      }
    }, 1000);
  });
};

const validatePwd = (pwd, options = {}) => {
  const { minLength, requireCombo, hasNumber, hasLowerCase, hasUpperCase, hasSymbol } = options;
  if (pwd.length < minLength) return false;

  let criteriaMet = 0;
  if (hasNumber && /\d/.test(pwd)) criteriaMet++;
  if (hasLowerCase && /[a-z]/.test(pwd)) criteriaMet++;
  if (hasUpperCase && /[A-Z]/.test(pwd)) criteriaMet++;
  if (hasSymbol && /[^a-zA-Z0-9]/.test(pwd)) criteriaMet++;

  return criteriaMet >= requireCombo;
};

function defaultPwdRule(pwd) {
  const ok = validatePwd(pwd, {
    minLength: 8,
    requireCombo: 3,
    hasNumber: true,
    hasLowerCase: true,
    hasUpperCase: true,
    hasSymbol: true,
  });
  return {
    isValid: ok,
    message: ok ? '' : '密码最短需要8个字符, 至少包含 (大写字母, 小写字母, 数字, 符号) 中的3种',
  };
}

const validatePass = (value, rule) => {
  console.log(value, rule);
  if (value === '') {
    return new Error('请输入密码');
  } else {
    const { isValid, message } = defaultPwdRule(value);
    return isValid ? true : new Error(message);
  }
};

const validatePass2 = (value, rule, callback) => {
  if (value === '') {
    return new Error('请再次输入密码进行确认');
  } else if (value !== ruleForm.pass) {
    return new Error('两次的密码不一致');
  } else {
    return true;
  }
};

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
});

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
