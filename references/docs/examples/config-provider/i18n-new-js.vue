<template>
  <div>
    <h2>通过语言的 key 值切换</h2>
    <e-button class="mb-1" @click="toggle">{{ toggleLanguageText }}</e-button>
    <br />

    <e-config-provider :lang="language">
      <e-form ref="formRef" :model="form" :rules="rules" class="mb-1" error-mode="text" label-position="top">
        <e-row>
          <e-col :span="12" :xs="24">
            <e-form-item label="姓名" prop="name">
              <e-input v-model="form.name" />
            </e-form-item>
          </e-col>
          <e-col :span="12" :xs="24">
            <e-form-item label="email" prop="email">
              <e-input v-model="form.email" />
            </e-form-item>
          </e-col>
          <e-col :span="12" :xs="24">
            <e-form-item label="爱好" prop="hobby">
              <e-select v-model="form.hobby" :options="form.hobbyOptions" />
            </e-form-item>
          </e-col>
        </e-row>
      </e-form>

      <e-tree class="mb-1" />
      <e-table :data="[]" class="mb-1" />
      <e-pagination :total="100" class="mb-1" />
    </e-config-provider>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { getAvailableLanguages, registerLocale } from '@epoint-fe/eui-components';

const toggleLanguageText = computed(() => {
  return language.value === 'zh-cn' ? '切换为英文' : '切换为中文';
});

// 中文默认已经注册，自动注册其他语言包
const autoLoad = () => {
  return new Promise((resolve) => {
    const languages = getAvailableLanguages();
    console.log('languages', languages);
    // 如语言包未注册，则引入并注册
    if (!languages.includes('en')) {
      import('@epoint-fe/eui-components/dist/locale/en.mjs')
        .then((en) => {
          console.log('语言包加载成功', en);
          registerLocale('en', en.default);
          resolve(true);
        })
        .catch((err) => {
          console.error('语言包加载失败', err);
          resolve(false);
        });
    } else {
      resolve(true);
    }
  });
};

const language = ref('zh-cn');

const toggle = async () => {
  const target = language.value === 'zh-cn' ? 'en' : 'zh-cn';
  if (target === 'en') {
    await autoLoad();
  }
  console.log('target language', target);
  language.value = target;

  formRef.value?.validate();
};

const form = ref({
  name: '',
  email: 'vnvbn',
  hobby: '',
  hobbyOptions: [
    { label: '篮球', value: 'basketball' },
    { label: '足球', value: 'football' },
    { label: '乒乓球', value: 'pingpong' },
  ],
});

const rules = ref({
  name: [{ required: true }],
  email: [{ required: true, type: 'email' }],
  hobby: [{ required: true }],
});

const formRef = ref();
onMounted(() => {
  formRef.value?.validate();
});
</script>
