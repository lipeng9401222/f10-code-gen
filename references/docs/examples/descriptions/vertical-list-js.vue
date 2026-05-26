<template>
  <e-radio-group v-model="size">
    <e-radio value="large">大号</e-radio>
    <e-radio value="default">默认</e-radio>
    <e-radio value="small">小号</e-radio>
  </e-radio-group>

  <e-descriptions title="垂直列表带边框" direction="vertical" :column="4" :size="size" border>
    <e-descriptions-item label="用户名">新点软件 - 中央研究院 - 前端研发部</e-descriptions-item>
    <e-descriptions-item label="电话">18100000000</e-descriptions-item>
    <e-descriptions-item label="地点" :span="2">苏州</e-descriptions-item>
    <e-descriptions-item label="备注">
      <e-tag size="small">公司</e-tag>
    </e-descriptions-item>
    <e-descriptions-item label="地址">江苏省苏州市吴中区吴中大道1188号</e-descriptions-item>
  </e-descriptions>

  <e-descriptions title="垂直列表无边框" :column="4" :size="size" direction="vertical" :style="blockMargin">
    <e-descriptions-item label="用户名">新点软件 - 中央研究院 - 前端研发部</e-descriptions-item>
    <e-descriptions-item label="电话">18100000000</e-descriptions-item>
    <e-descriptions-item label="地点" :span="2">苏州</e-descriptions-item>
    <e-descriptions-item label="备注">
      <e-tag size="small">学校</e-tag>
    </e-descriptions-item>
    <e-descriptions-item label="地址">江苏省苏州市张家港市杨舍镇江帆路8号</e-descriptions-item>
  </e-descriptions>
</template>

<script setup>
import { computed, ref } from 'vue';

const size = ref('');
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
</style>
