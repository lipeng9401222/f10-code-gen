<template>
  <e-badge :value="12" class="item">
    <e-button>comments</e-button>
  </e-badge>
  <e-badge :value="3" class="item">
    <e-button>replies</e-button>
  </e-badge>
  <e-badge :value="1" class="item" type="primary">
    <e-button>comments</e-button>
  </e-badge>
  <e-badge :value="2" class="item" type="warning">
    <e-button>replies</e-button>
  </e-badge>

  <e-dropdown trigger="click">
    <span class="e-dropdown-link">
      Click Me
      <e-icon class="e-icon--right"><caret-bottom /></e-icon>
    </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item class="clearfix">
          comments
          <e-badge class="mark" :value="12" />
        </e-dropdown-item>
        <e-dropdown-item class="clearfix">
          replies
          <e-badge class="mark" :value="3" />
        </e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>

<script setup>
import { CaretBottom } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}

.e-dropdown {
  margin-top: 1.1rem;
}
</style>
