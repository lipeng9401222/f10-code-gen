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

<script lang="ts" setup>
import { ref } from 'vue';
import { CollectionTag } from '@epoint-fe/eui-icons';
import type { TagProps } from '@eui-components/components/tag';

const type: Array<TagProps['type']> = ['success', 'info', 'warning', 'danger'];
const effect: Array<TagProps['effect']> = ['light', 'dark', 'plain'];

const tagType = ref<TagProps['type']>('');
const tagEffect = ref<TagProps['effect']>('plain');
const input = ref<string[]>(['tag1', 'tag2', 'tag3']);
</script>
