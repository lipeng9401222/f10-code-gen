---
title: StepForm 步骤表单
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-step-form/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-step-form/)

此组件由 `@epframe/eui-core` 包提供。

`EpStepForm` 是一个步骤表单组件，用于将复杂表单按步骤拆分，引导用户逐步填写。内部使用 `EpStepFormItem` 定义每个步骤，支持表单验证、水平/垂直布局、自定义步骤状态等功能。

## 基础使用

- 使用 `EpStepForm` 作为容器，内部放置若干 `EpStepFormItem` 来定义每个步骤。
- 通过 `v-model` 绑定整体表单数据对象。
- 监听 `submit` 事件获取最终提交的数据，监听 `step-change` 事件感知步骤切换。

**Demo 示例**: `@epframe/eui-core/components/step-form/base.vue`

```vue
<template>
  <div class="step-form-content">
    <ep-step-form
      v-model="formData"
      style="height: 420px"
      @submit="onSubmit"
      @step-change="onStepChange"
    >
      <ep-step-form-item title="基本信息" description="填写个人基本信息">
        <e-form label-width="100px" style="padding: 20px 20%">
          <e-form-item label="姓名">
            <e-input v-model="formData.name" placeholder="请输入姓名" />
          </e-form-item>
          <e-form-item label="年龄">
            <e-input v-model="formData.age" placeholder="请输入年龄" />
          </e-form-item>
        </e-form>
      </ep-step-form-item>

      <ep-step-form-item title="联系方式" description="填写联系信息">
        <e-form label-width="100px" style="padding: 20px 20%">
          <e-form-item label="电话">
            <e-input v-model="formData.phone" placeholder="请输入电话" />
          </e-form-item>
          <e-form-item label="邮箱">
            <e-input v-model="formData.email" placeholder="请输入邮箱" />
          </e-form-item>
        </e-form>
      </ep-step-form-item>

      <ep-step-form-item
        title="确认提交"
        description="核对信息后提交"
        :skip-validate="true"
      >
        <div style="padding: 30px 20%">
          <e-descriptions :column="1" border>
            <e-descriptions-item label="姓名">{{
              formData.name || '—'
            }}</e-descriptions-item>
            <e-descriptions-item label="年龄">{{
              formData.age || '—'
            }}</e-descriptions-item>
            <e-descriptions-item label="电话">{{
              formData.phone || '—'
            }}</e-descriptions-item>
            <e-descriptions-item label="邮箱">{{
              formData.email || '—'
            }}</e-descriptions-item>
          </e-descriptions>
        </div>
      </ep-step-form-item>
    </ep-step-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { EpStepForm, EpStepFormItem } from '@epframe/eui-core';

const formData = ref({
  name: '',
  age: '',
  phone: '',
  email: '',
});

const onSubmit = (data) => {
  console.log('提交数据：', data);
};

const onStepChange = (index) => {
  console.log('步骤切换到：', index);
};
</script>
<style lang="scss" scoped>
.step-form-content {
  padding: 20px;
}
</style>

```

## 垂直布局

- 设置 `direction="vertical"` 可切换为垂直布局，步骤指示器将显示在左侧。

**Demo 示例**: `@epframe/eui-core/components/step-form/vertical.vue`

```vue
<template>
  <div class="step-form-content">
    <ep-step-form
      v-model="formData"
      direction="vertical"
      style="height: 420px"
      @submit="onSubmit"
    >
      <ep-step-form-item title="项目信息" description="填写项目基础信息">
        <e-form label-width="100px" style="padding: 20px 40px">
          <e-form-item label="项目名称">
            <e-input
              v-model="formData.projectName"
              placeholder="请输入项目名称"
            />
          </e-form-item>
          <e-form-item label="负责人">
            <e-input v-model="formData.owner" placeholder="请输入负责人" />
          </e-form-item>
        </e-form>
      </ep-step-form-item>

      <ep-step-form-item title="详细描述" description="填写项目描述">
        <e-form label-width="100px" style="padding: 20px 40px">
          <e-form-item label="描述">
            <e-input
              v-model="formData.description"
              type="textarea"
              :rows="4"
              placeholder="请输入项目描述"
            />
          </e-form-item>
        </e-form>
      </ep-step-form-item>

      <ep-step-form-item
        title="完成"
        description="确认信息"
        :skip-validate="true"
      >
        <div style="padding: 20px 40px">
          <p>项目名称：{{ formData.projectName || '—' }}</p>
          <p>负责人：{{ formData.owner || '—' }}</p>
          <p>描述：{{ formData.description || '—' }}</p>
        </div>
      </ep-step-form-item>
    </ep-step-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { EpStepForm, EpStepFormItem } from '@epframe/eui-core';

const formData = ref({
  projectName: '',
  owner: '',
  description: '',
});

const onSubmit = (data) => {
  console.log('提交数据：', data);
};
</script>
<style scoped lang="scss">
.step-form-content {
  padding: 20px;

  :deep(.ep-step-form){
    display: flex;

    .ep-step-form__container {
      height: 100%;
      display: flex;
      flex-direction: column;
      .ep-step-form__content {
        flex: 1;
        overflow: auto;
        min-height: 0;
      }
    }
  }
}
</style>

```

## 表单验证

- 在 `EpStepFormItem` 上通过 `:validate` 属性传入对应步骤内 `e-form` 的 `validate` 方法，即可在点击"下一步"时自动触发该步骤的表单验证。
- 验证不通过时，步骤不会前进，并触发 `validate-error` 事件。
- 对于不需要验证的步骤（如最终确认页），可设置 `:skip-validate="true"` 跳过验证。

**Demo 示例**: `@epframe/eui-core/components/step-form/validate.vue`

```vue
<template>
  <div class="step-form-content">
    <ep-step-form
      v-model="formData"
      style="height: 450px"
      @submit="onSubmit"
      @validate-error="onValidateError"
    >
      <ep-step-form-item
        title="账号信息"
        description="填写账号与密码"
        :validate="() => step1Ref?.validate()"
      >
        <e-form
          ref="step1Ref"
          :model="formData"
          label-width="120px"
          style="padding: 20px 20%"
        >
          <e-form-item
            label="用户名"
            prop="username"
            :rules="[
              { required: true, message: '请输入用户名', trigger: 'blur' },
            ]"
          >
            <e-input v-model="formData.username" placeholder="请输入用户名" />
          </e-form-item>
          <e-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
            ]"
          >
            <e-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
            />
          </e-form-item>
        </e-form>
      </ep-step-form-item>

      <ep-step-form-item
        title="个人信息"
        description="填写真实姓名与邮箱"
        :validate="() => step2Ref?.validate()"
      >
        <e-form
          ref="step2Ref"
          :model="formData"
          label-width="120px"
          style="padding: 20px 20%"
        >
          <e-form-item
            label="真实姓名"
            prop="realName"
            :rules="[
              { required: true, message: '请输入真实姓名', trigger: 'blur' },
            ]"
          >
            <e-input v-model="formData.realName" placeholder="请输入真实姓名" />
          </e-form-item>
          <e-form-item
            label="邮箱"
            prop="email"
            :rules="[
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              {
                type: 'email',
                message: '请输入正确的邮箱格式',
                trigger: 'blur',
              },
            ]"
          >
            <e-input v-model="formData.email" placeholder="请输入邮箱" />
          </e-form-item>
        </e-form>
      </ep-step-form-item>

      <ep-step-form-item title="注册完成" :skip-validate="true">
        <div style="text-align: center; padding: 40px">
          <p style="font-size: 16px; font-weight: bold; margin-bottom: 16px">
            注册成功！
          </p>
          <p>用户名：{{ formData.username }}</p>
          <p>姓名：{{ formData.realName }}</p>
          <p>邮箱：{{ formData.email }}</p>
        </div>
      </ep-step-form-item>
    </ep-step-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { EpStepForm, EpStepFormItem } from '@epframe/eui-core';

const step1Ref = ref(null);
const step2Ref = ref(null);

const formData = ref({
  username: '',
  password: '',
  realName: '',
  email: '',
});

const onSubmit = (data) => {
  console.log('注册数据：', data);
};

const onValidateError = (index) => {
  console.log(`第 ${index + 1} 步验证失败`);
};
</script>
<style scoped lang="scss">
.step-form-content {
  padding: 20px;
}
</style>

```

## API

### EpStepForm 属性

| 属性名       | 说明                       | 类型                                    | 默认值         |
| ------------ | -------------------------- | --------------------------------------- | -------------- |
| v-model      | 步骤表单整体数据           | `Record<string, any>`                   | —              |
| direction    | 步骤条显示方向             | ^[enum]`'horizontal' \| 'vertical'`     | `'horizontal'` |
| active       | 初始激活步骤的索引         | `number`                                | `0`            |
| space        | 每个步骤的间距，不填则自适应 | `number \| string`                     | —              |
| align-center | 步骤居中对齐               | `boolean`                               | `false`        |
| simple       | 是否启用简洁风格           | `boolean`                               | `false`        |

### EpStepForm 事件

| 事件名         | 说明                             | 类型                                              |
| -------------- | -------------------------------- | ------------------------------------------------- |
| submit         | 最后一步点击提交时触发           | ^[Function]`(data: Record<string, any>) => void`  |
| step-change    | 步骤切换时触发                   | ^[Function]`(index: number) => void`              |
| validate-error | 当前步骤验证失败、无法前进时触发 | ^[Function]`(index: number) => void`              |

### EpStepForm 插槽

| 名称     | 说明                                                        |
| -------- | ----------------------------------------------------------- |
| default  | 存放 `EpStepFormItem` 组件                                  |
| stepItem | 自定义步骤指示器内容，作用域参数：`{ step, index }`         |
| button   | 在底部操作区插入自定义按钮，作用域参数：`{ currentStep, active, step }` |

### EpStepForm 方法

| 名称           | 说明                       | 类型                                        |
| -------------- | -------------------------- | ------------------------------------------- |
| getStepsData   | 获取当前步骤表单数据       | `() => Record<string, any>`                 |
| getCurrentItem | 获取当前激活步骤的注册信息 | `() => RegisteredStepItem \| null`          |

---

### EpStepFormItem 属性

| 属性名        | 说明                                                          | 类型                                                                               | 默认值  |
| ------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------- |
| title         | 步骤标题（必填）                                              | `string`                                                                           | —       |
| description   | 步骤描述文字                                                  | `string`                                                                           | —       |
| validate      | 验证函数，返回 `Promise<boolean>`，返回 `false` 时阻止进入下一步 | `() => Promise<boolean>`                                                        | —       |
| skip-validate | 是否跳过当前步骤的验证，直接允许进入下一步                    | `boolean`                                                                          | `false` |
| disabled      | 是否禁用当前步骤                                              | `boolean`                                                                          | `false` |
| icon          | 步骤图标                                                      | `string \| Component`                                                              | —       |
| status        | 步骤状态，优先级高于自动计算的状态                            | ^[enum]`'' \| 'wait' \| 'process' \| 'finish' \| 'error' \| 'success'`            | —       |

### EpStepFormItem 插槽

| 名称    | 说明         |
| ------- | ------------ |
| default | 当前步骤内容 |