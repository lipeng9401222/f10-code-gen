<template>
  <e-radio-group v-model="size">
    <e-radio value="large">大号</e-radio>
    <e-radio value="default">默认</e-radio>
    <e-radio value="small">小号</e-radio>
  </e-radio-group>

  <e-descriptions class="margin-top" title="带边框" :column="3" :size="size" border>
    <template #extra>
      <e-button type="primary">操作</e-button>
    </template>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <user />
          </e-icon>
          用户名
        </div>
      </template>
      新点软件 - 中央研究院 - 前端研发部
    </e-descriptions-item>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <iphone />
          </e-icon>
          电话
        </div>
      </template>
      18100000000
    </e-descriptions-item>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <location />
          </e-icon>
          地点
        </div>
      </template>
      苏州
    </e-descriptions-item>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <tickets />
          </e-icon>
          备注
        </div>
      </template>
      <e-tag size="small">公司</e-tag>
    </e-descriptions-item>
    <e-descriptions-item>
      <template #label>
        <div class="cell-item">
          <e-icon :style="iconStyle">
            <office-building />
          </e-icon>
          地址
        </div>
      </template>
      江苏省苏州市张家港市杨舍镇江帆路8号
    </e-descriptions-item>
  </e-descriptions>

  <e-descriptions class="margin-top" title="无边框" :column="3" :size="size" :style="blockMargin">
    <template #extra>
      <e-button type="primary">操作</e-button>
    </template>
    <e-descriptions-item label="用户名">新点软件 - 中央研究院 - 前端研发部</e-descriptions-item>
    <e-descriptions-item label="电话">18100000000</e-descriptions-item>
    <e-descriptions-item label="地点">Company</e-descriptions-item>
    <e-descriptions-item label="备注">
      <e-tag size="small">学校</e-tag>
    </e-descriptions-item>
    <e-descriptions-item label="地址">江苏省苏州市张家港市杨舍镇江帆路8号</e-descriptions-item>
  </e-descriptions>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Iphone, Location, OfficeBuilding, Tickets, User } from '@epoint-fe/eui-icons';

const size = ref('');
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});
</script>

<style scoped>
.e-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
