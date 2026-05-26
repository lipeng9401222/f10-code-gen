---
title: Config Provider 全局配置
originUrl: http://192.168.219.170/docs/vue/latest/component/component/config-provider.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

# Config Provider 全局配置

Config Provider 被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到。

## i18n 配置 {#i18n}

通过 Config Provider 来配置多语言，让你的应用可以随时切换语言。

**Demo 示例**: `config-provider/i18n-new`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

```vue
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

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { getAvailableLanguages, registerLocale } from '@epoint-fe/eui-components';
import type { Language } from '@epoint-fe/eui-components';

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
          registerLocale('en', en.default as Language);
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

```

## 对按钮进行配置

**Demo 示例**: `config-provider/button`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

```vue
<template>
  <div>
    <div m="b-2">
      <e-checkbox v-model="config.autoInsertSpace">autoInsertSpace</e-checkbox>
    </div>

    <e-config-provider :button="config">
      <e-button>中文</e-button>
    </e-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const config = reactive({
  autoInsertSpace: true,
});
</script>

```

## 对消息进行配置

**Demo 示例**: `config-provider/message`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

```vue
<template>
  <div>
    <e-config-provider :message="config">
      <e-button @click="open">OPEN</e-button>
    </e-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';
const config = reactive({
  max: 3,
});
const open = () => {
  EMessage({
    message: 'This is a normal message',
    // duration: 0,
  });
};
</script>

```

## 对 select 进行配置

**Demo 示例**: `config-provider/select`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

```vue
<template>
  <div>
    <div m="b-2">
      <e-checkbox v-model="selectConfig.clearable">showclearable</e-checkbox>
    </div>
    <e-config-provider :select="selectConfig">
      <e-select v-model="value1" multiple placeholder="请选择" style="width: 240px">
        <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </e-select>
    </e-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const value1 = ref([]);

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];

const selectConfig = reactive({
  clearable: true,
});
</script>

```

## 对 datePicker 进行配置

**Demo 示例**: `config-provider/date-picker`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

```vue
<template>
  <div>
    <div m="b-2">firstDayOfWeek：<e-input-number v-model="config.firstDayOfWeek" :min="1" :max="7" /></div>
    <div m="b-2">format：<e-select v-model="config.format" :options="options" /></div>

    <e-config-provider :date-picker="config">
      <e-date-picker v-model="value" type="date" />
    </e-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const options = [
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
  { label: 'YYYY年MM月DD日', value: 'YYYY年MM月DD日' },
];
const value = ref('');
const config = reactive({
  firstDayOfWeek: 1,
  format: 'YYYY-MM-DD',
});
</script>

```

## 对表单进行配置

**Demo 示例**: `config-provider/form`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

```vue
<template>
  <div>
    <e-config-provider :form="formConfig">
      <e-form label-width="100px" :model="formConfig" :rules="rules">
        <e-form-item label="标签后缀">
          <e-input v-model="formConfig.labelSuffix" style="width: 240px" />
        </e-form-item>
        <e-form-item label="标签对齐方式">
          <e-select v-model="formConfig.labelPosition" placeholder="请选择对齐方式" style="width: 240px">
            <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </e-select>
        </e-form-item>
        <e-form-item label="必填星号位置设置" prop="requireAsteriskPosition">
          <e-select v-model="formConfig.requireAsteriskPosition" placeholder="请选择星号位置" style="width: 240px">
            <e-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
          </e-select>
        </e-form-item>
      </e-form>
    </e-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { FormRules } from '@epoint-fe/eui-components';

const formConfig = reactive({
  labelSuffix: ':',
  labelPosition: 'top',
  requireAsteriskPosition: 'left',
});

const options = [
  {
    value: 'left',
    label: '左侧',
  },
  {
    value: 'right',
    label: '右侧',
  },
  {
    value: 'top',
    label: '顶部',
  },
];

const options2 = [
  {
    value: 'left',
    label: '左侧',
  },
  {
    value: 'right',
    label: '右侧',
  },
];

const rules = reactive<FormRules>({
  requireAsteriskPosition: [
    {
      required: true,
      trigger: 'change',
    },
  ],
});
</script>

```

## 对折叠面板进行配置

**Demo 示例**: `config-provider/collapse`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

```vue
<template>
  <div>
    <div m="b-2">
      <e-checkbox v-model="collapseConfig.showNav">showNav</e-checkbox>
    </div>
    <e-config-provider :collapse="collapseConfig">
      <e-collapse v-model="activeNames">
        <e-collapse-item title="一致性" name="1">
          <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
          <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
        </e-collapse-item>
        <e-collapse-item title="反馈" name="2">
          <div>操作反馈：通过样式更新和交互效果使用户清晰感知其操作；</div>
          <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
        </e-collapse-item>
        <e-collapse-item title="效率" name="3">
          <div>简化流程：保持操作流程简单和直观；</div>
          <div>明确和清晰：明确表达您的意图，以便用户能够迅速理解并做出决策；</div>
          <div>易于识别：界面应该直截了当，帮助用户辨识，并让他们免于记忆和回忆。</div>
        </e-collapse-item>
        <e-collapse-item title="可控性" name="4">
          <div>决策制定：提供关于操作的建议是可以接受的，但不要代替用户做决策；</div>
          <div>可控的后果：用户应该获得自由操作的权利，包括取消、中止或终止当前操作。</div>
        </e-collapse-item>
      </e-collapse>
    </e-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const activeNames = ref(['1']);
const collapseConfig = reactive({
  showNav: true,
});
</script>

```

## 对文件上传进行配置

**Demo 示例**: `config-provider/file-upload`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

```vue
<template>
  <div>
    <e-config-provider :file-upload="config">
      <e-file-upload action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile" />
    </e-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const config = reactive({
  chunkSize: 1024,
  typeLimit: 'doc,docx,xls,xlsx,png,jpg,jpeg',
});
</script>

```

## i18n 配置（旧）^(deprecated) {#i18n-old}

> 旧的 i18n 配置方式，不推荐使用

通过 Config Provider 来配置多语言，让你的应用可以随时切换语言。

**Demo 示例**: `config-provider/i18n-old`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/config-provider.html)

```vue
<template>
  <div>
    <e-button mb-2 @click="toggle">Switch Language</e-button>
    <br />

    <e-config-provider :locale="locale">
      <e-select class="mb-1" />
      <e-tree class="mb-1" />
      <e-table :data="[]" class="mb-1" />
      <e-pagination :total="100" />
    </e-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import zhCN from '@epoint-fe/eui-components/dist/locale/zh-cn.mjs';
import en from '@epoint-fe/eui-components/dist/locale/en.mjs';

const language = ref('zh-cn');
const locale = computed(() => (language.value === 'zh-cn' ? zhCN : en));

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn';
};
</script>

```

<!-- ## Experimental features

In this section, you can learn how to use Config Provider to provide experimental features. For now, we haven't added any experimental features, but in the feature roadmap, we will add some experimental features. You can use this config to manage the features you want or not. -->

 <!-- TODO -->

## API

### Config Provider Attributes

| Name                  | Description                                             | Type                                                                                                                                                                                                                      | Default                                                                                   |
| --------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| lang                | 语言包的 key 值                                            | ^[string]`默认包含：'zh-cn' \| 'en' \| 'zh-tw'`                                                                                                                                                                                              | zh-cn                                                                                   |
| locale^(deprecated) | 翻译文本对象, 不推荐使用，请使用 lang 属性替代                 | ^[object]`{name: string, el: TranslatePair}`[](http://192.168.217.8/febase/vue/eui-vue/-/blob/master/packages/locale/index.ts#L5) [languages](http://192.168.217.8/febase/vue/eui-vue/-/tree/master/packages/locale/lang) | [zh-CN](http://192.168.217.8/febase/vue/eui-vue/-/tree/master/packages/locale/lang/zh-cn.ts) |
| size                  | 全局组件大小                                            | ^[enum]`'large' \| 'default' \| 'small'`                                                                                                                                                                                  | default                                                                                   |
| zIndex                | 全局初始化 zIndex 的值                                  | ^[number]                                                                                                                                                                                                                 | —                                                                                         |
| button                | 按钮相关配置, [详见下表](#button-attribute)             | ^[object]`{autoInsertSpace?: boolean}`                                                                                                                                                                                    | 详见下表                                                                                  |
| message               | 消息相关配置, [详见下表](#message-attribute)            | ^[object]`{max?: number}`                                                                                                                                                                                                 | see the following table                                                                   |
| select                | select 相关配置, [详见下表](#select-attribute)          | ^[object]`{clearable?: boolean}`                                                                                                                                                                                          | 详见下表                                                                                  |
| date-picker                | date-picker 相关配置, [详见下表](#date-picker-attribute)          | ^[object]`{firstDayOfWeek?: number; format: string}`                                                                                                                                                                                          | 详见下表                                                                                  |
| form                  | 表单相关配置, [详见下表](#form-attribute)               | ^[object]`{labelSuffix?: string,labelPosition?:string}`                                                                                                                                                                   | 详见下表                                                                                  |
| collapse              | 折叠面板相关配置, [详见下表](#collapse-attribute)       | ^[object]`{showNav?: boolean}`                                                                                                                                                                                            | 详见下表                                                                                  |
| upload                | 上传组件相关配置, [详见下表](#upload-attribute)         | ^[object]`{accept?: string}`                                                                                                                                                                                              | 详见下表                                                                                  |
| table                 | 表格组件相关配置, [详见下表](#table-attribute)          | ^[object]`{pageSize?: number}`                                                                                                                                                                                            | 详见下表                                                                                  |
| fileUpload            | 文件上传组件相关配置, [详见下表](#fileupload-attribute) | ^[object]`{needChunkMd5?: boolean,needChunkLocal?: boolean,fileNameLengthLimit?: number,typeLimit?: string,chunkSize?: number}`                                                                                           | 详见下表                                                                                  |
| experimental-features | 将要添加的实验阶段的功能，所有功能都是默认设置为 false  | ^[object]                                                                                                                                                                                                                 | —                                                                                         |
| enableGlobalContext    | 是否设置为全局配置（影响通过 createVNode + render 创建的组件） | ^[boolean]                                                                                                                                                                                                                | false                                                                                     |
| verifyCode            | 验证码相关配置, [详见下表](#verifycode-attribute)       | ^[object]`{httpRequest?: VerifyRequestHandler}`                                                                                                                                                                           | 详见下表                                                                                  |

### Button Attribute

| Attribute       | Description                    | Type       | Default |
| --------------- | ------------------------------ | ---------- | ------- |
| autoInsertSpace | 自动在两个中文字符之间插入空格 | ^[boolean] | false   |

### Message Attribute

| Attribute | Description              | Type      | Default |
| --------- | ------------------------ | --------- | ------- |
| max       | 可同时显示的消息最大数量 | ^[number] | —       |

### VerifyCode Attribute

| Attribute   | Description              | Type                                                                                           | Default |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------- | ------- |
| httpRequest | 自定义的初始化和验证请求 | ^[VerifyRequestHandler]`(options: VerifyRequestOptions) => XMLHttpRequest \| Promise<unknown>` | —       |

### Select Attribute

| Attribute | Description      | Type       | Default |
| --------- | ---------------- | ---------- | ------- |
| clearable | 是否显示清空按钮 | ^[boolean] | —       |

### date-picker Attribute

| Attribute | Description      | Type       | Default |
| --------- | ---------------- | ---------- | ------- |
| firstDayOfWeek | 每周第一天的日期 | ^[number] | —       |
| format | 日期显示格式 | ^[string] | —       |

### Form Attribute

| Attribute               | Description    | Type       | Default |
| ----------------------- | -------------- | ---------- | ------- |
| labelSuffix             | 标签后缀       | ^[string]  | —       |
| labelPosition           | 标签对齐方式   | ^[string]  | —       |
| requireAsteriskPosition | 必填星号位置   | ^[string]  | —       |
| bordered                | 是否显示边框线 | ^[boolean] | —       |

### Collapse Attribute

| Attribute | Description | Type       | Default |
| --------- | ----------- | ---------- | ------- |
| showNav   | 是否导航栏  | ^[boolean] | —       |

### Upload Attribute

| Attribute | Description    | Type      | Default |
| --------- | -------------- | --------- | ------- |
| accept    | 接受的文件类型 | ^[string] | —       |

### Table Attribute

| Attribute   | Description | Type      | Default |
| ----------- | ----------- | --------- | ------- |
| pageSize    | 每页条数    | ^[number] | —       |
| borderStyle | 边框        | ^[string] | —       |
| stripe | 是否显示斑马纹        | ^[boolean] | —       |

### FileUpload Attribute

| Attribute           | Description                      | Type       | Default |
| ------------------- | -------------------------------- | ---------- | ------- |
| needChunkMd5        | 分片是否计算 MD5                 | ^[boolean] | —       |
| needChunkLocal      | 服务端是否将分片存储到本地磁盘上 | ^[boolean] | —       |
| fileNameLengthLimit | 可上传的最大文件名称长度         | ^[number]  | —       |
| typeLimit           | 可上传文件后缀                   | ^[string]  | —       |
| chunkSize           | 分片大小，单位为 `KB`            | ^[number]  | —       |

### Config Provider Slots

| Name    | Description    | Scope                              |
| ------- | -------------- | ---------------------------------- |
| default | 自定义默认内容 | config: 提供全局配置（从顶部继承） |