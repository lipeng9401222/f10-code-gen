<template>
  <e-metric-nav v-model="active" loop arrow="always">
    <e-metric-nav-item value="sales" label="销售额" :metric="1234" unit="万" />
    <e-metric-nav-item value="profit" label="利润" :metric="567" unit="万" disabled />
    <e-metric-nav-item value="orders" label="订单数" :metric="89" unit="笔" />
    <e-metric-nav-item value="custom">
      <div class="custom-card">
        <div class="custom-label">自定义</div>
        <div class="custom-content">
          <span class="custom-value">任意内容</span>
        </div>
      </div>
    </e-metric-nav-item>
  </e-metric-nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EMetricNav, EMetricNavItem } from '@epoint-fe/eui-components';

const active = ref('sales');
</script>

<style scoped>
.custom-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.custom-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.custom-content {
  display: flex;
  align-items: baseline;
}

.custom-value {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}
</style>
