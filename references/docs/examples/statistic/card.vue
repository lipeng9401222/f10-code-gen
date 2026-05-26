<template>
  <e-row :gutter="16">
    <e-col :span="8">
      <div class="statistic-card">
        <e-statistic :value="98500">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Daily active users
              <e-tooltip effect="dark" content="Number of users who logged into the product in one day" placement="top">
                <e-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </e-icon>
              </e-tooltip>
            </div>
          </template>
        </e-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>than yesterday</span>
            <span class="green">
              24%
              <e-icon>
                <CaretTop />
              </e-icon>
            </span>
          </div>
        </div>
      </div>
    </e-col>
    <e-col :span="8">
      <div class="statistic-card">
        <e-statistic :value="693700">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Monthly Active Users
              <e-tooltip
                effect="dark"
                content="Number of users who logged into the product in one month"
                placement="top"
              >
                <e-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </e-icon>
              </e-tooltip>
            </div>
          </template>
        </e-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>month on month</span>
            <span class="red">
              12%
              <e-icon>
                <CaretBottom />
              </e-icon>
            </span>
          </div>
        </div>
      </div>
    </e-col>
    <e-col :span="8">
      <div class="statistic-card">
        <e-statistic :value="72000" title="New transactions today">
          <template #title>
            <div style="display: inline-flex; align-items: center">New transactions today</div>
          </template>
        </e-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>than yesterday</span>
            <span class="green">
              16%
              <e-icon>
                <CaretTop />
              </e-icon>
            </span>
          </div>
          <div class="footer-item">
            <e-icon :size="14">
              <ArrowRight />
            </e-icon>
          </div>
        </div>
      </div>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { ArrowRight, CaretBottom, CaretTop, Warning } from '@epoint-fe/eui-icons';
</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--e-fill-color) !important;
}

.e-statistic {
  --e-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--e-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--e-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--e-color-success);
}
.red {
  color: var(--e-color-error);
}
</style>
