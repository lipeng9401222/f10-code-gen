<template>
  <e-row>
    <e-col v-for="(o, index) in 2" :key="o" :span="8" :offset="index > 0 ? 2 : 0">
      <e-card :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px">
          <span>Yummy hamburger</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <e-button text class="button">Operating</e-button>
          </div>
        </div>
      </e-card>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentDate = ref(new Date());
</script>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
