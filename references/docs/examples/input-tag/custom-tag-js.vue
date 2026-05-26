<template>
  <div>
    <e-segmented v-model="tagType" :options="type" class="mr-5" />
    <e-segmented v-model="tagEffect" :options="effect" />
  </div>
  <br />
  <e-input-tag v-model="input" :tag-type="tagType" :tag-effect="tagEffect" placeholder="Please input">
    <template #tag="{ value }">
      <div class="flex items-center">
        <e-icon class="mr-1">
          <CollectionTag />
        </e-icon>
        <span>{{ value }}</span>
      </div>
    </template>
  </e-input-tag>
</template>

<script setup>
import { ref } from 'vue';
import { CollectionTag } from '@epoint-fe/eui-icons';

const type = ['success', 'info', 'warning', 'danger'];
const effect = ['light', 'dark', 'plain'];

const tagType = ref('');
const tagEffect = ref('plain');
const input = ref(['tag1', 'tag2', 'tag3']);
</script>
