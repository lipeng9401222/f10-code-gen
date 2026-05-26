<template>
  <ep-layout-manager class="h-full" v-loading="loading">
    <template #main>
      <e-scrollbar class="flex-1">
        <ep-form :model="data" filled label-position="top" class="p-xl">
          <e-collapse v-model="activeItems">
            <e-collapse-item id="1" title="基本信息">
              <e-row>
                <e-col :span="12">
                  <ep-form-item label="标段（包）编号">
                    <span>{{ data.sectionCode || '-' }}</span>
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item label="采购项目名称">
                    <span>{{ data.procurementName || '-' }}</span>
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row>
                <e-col :span="12">
                  <ep-form-item label="标段（包）名称">
                    <span>{{ data.sectionName || '-' }}</span>
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item label="分类">
                    <span>{{ data.classification === 1 ? '设计' : data.classification === 2 ? '施工' : '-' }}</span>
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row>
                <e-col :span="12">
                  <ep-form-item label="审核状态">
                    <e-tag :type="reviewStateMap[data.reviewState]?.cls" round>{{ reviewStateMap[data.reviewState]?.text || '-' }}</e-tag>
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item label="发布状态">
                    <e-tag :type="data.releaseState === 1 ? 'success' : 'info'">{{ data.releaseState === 1 ? '已发布' : '未发布' }}</e-tag>
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row>
                <e-col :span="12">
                  <ep-form-item label="投标截止时间">
                    <span>{{ data.deadline || '-' }}</span>
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item label="备注">
                    <span>{{ data.remark || '-' }}</span>
                  </ep-form-item>
                </e-col>
              </e-row>
            </e-collapse-item>
            <e-collapse-item id="2" title="其他信息">
              <e-row>
                <e-col :span="12">
                  <ep-form-item label="创建时间">
                    <span>{{ data.createTime || '-' }}</span>
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item label="更新时间">
                    <span>{{ data.updateTime || '-' }}</span>
                  </ep-form-item>
                </e-col>
              </e-row>
            </e-collapse-item>
          </e-collapse>
        </ep-form>
      </e-scrollbar>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { Utils } from '@epframe/eui-core';

defineOptions({
  name: 'PageExamplesDefineDataModelDetail'
});

const props = defineProps({
  rowGuid: { type: String, default: '' }
});

const getCurrentDialog = inject('getCurrentDialog');

const loading = ref(false);
const data = ref({});
const activeItems = ref(['1', '2']);
const { request } = Utils;

const reviewStateMap = {
  1: { cls: 'danger', text: '审核不通过' },
  2: { cls: 'warning', text: '待审核' },
  3: { cls: 'success', text: '审核通过' },
  4: { cls: '', text: '编辑中' }
};

const loadDetail = async () => {
  if (!props.rowGuid) return;
  loading.value = true;
  try {
    const res = await request({
      url: '/api/page-examples/detail',
      data: { params: { id: props.rowGuid } }
    });
    data.value = res;
  } catch (e) {
    console.error('加载详情失败:', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadDetail();
});
</script>

<style lang="less" scoped></style>