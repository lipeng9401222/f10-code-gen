<template>
  <div class="eui-page">
    <e-main class="eui-main-section section__vertical-center">
      <e-result icon="success" :title="model.title" :sub-title="model.info">
        <template #extra>
          <e-button type="primary" @click="checkProcess">查看进度</e-button>
          <e-button @click="add">继续新增</e-button>
          <e-button @click="onBack">返回列表</e-button>
        </template>
      </e-result>
      <div class="to-improve mt-l px-xxl py-xl bg-fill-lighter rounded">
        <e-text class="text-lg fw-bold">以下信息需尽快完善：</e-text>
        <div class="flex-col pt-m">
          <div class="flex mt-s pt-s pb-s" v-for="item in model.warningList" :key="item.text">
            <e-icon class="mr-s mt-xs">
              <WarnTriangleFilled color="var(--e-color-warning)" />
            </e-icon>
            <e-text class="leading-base"
              >{{ item.text }}，
              <e-link class="complete leading-base" :underline="false" :href="item.link"
                >完善信息
                <e-icon size="18" color="var(--e-icon-color-1)">
                  <ChevronRightDoubleS />
                </e-icon>
              </e-link>
            </e-text>
          </div>
        </div>
      </div>
    </e-main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Utils } from '@epframe/eui-core';
import { WarnTriangleFilled, ChevronRightDoubleS } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'ImproveInformation'
});

const model = Utils.defineDataModel(() => {
  const title = ref('提交成功');
  const info = ref('项目已成功提交，请实时关注项目审核进度，以便得到及时回复和处理');
  const warningList = ref([
    {
      text: '项目招标主体信息缺失',
      link: '/'
    },
    {
      text: '项目投资组成信息缺失',
      link: '/'
    },
    {
      text: '项目审批（核准/备案）文件缺失',
      link: '/'
    }
  ]);

  return {
    models: {
      title,
      info,
      warningList
    }
  };
});

// 查看进度
const checkProcess = () => {
  Utils.logger.info('查看进度');
};

// 继续新增
const add = () => {
  Utils.logger.info('继续新增');
};

// 返回列表
const onBack = () => {
  Utils.logger.info('返回列表');
};
</script>
<style scoped>
.to-improve {
  width: 73%;
}

.complete:hover * {
  color: var(--e-text-color-primary-click);
}

.complete {
  vertical-align: top;
}
</style>
