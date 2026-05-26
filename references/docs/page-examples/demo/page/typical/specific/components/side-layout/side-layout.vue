<template>
  <e-container class="side-layout pt-xl px-xl" :class="{ specific }" :style="layoutStyle">
    <e-scrollbar ref="mainRef" class="main" view-class="side-layout-main">
      <div ref="pageRef" class="content-page">
        <div ref="contentRootRef" class="main-content">
          <e-scrollbar ref="contentRef" class="content-scrollbar">
            <div ref="contentInnerRef" class="content-inner px-xxl">
              <slot name="content" />
            </div>
          </e-scrollbar>
        </div>
        <div v-if="hasSide" ref="sideContentRef" class="side-content">
          <div class="tab-container" :class="{ 'is-specific': specific }">
            <div class="tab-header-btns">
              <e-tooltip :content="specific ? '固定底部' : '固定侧边'" placement="bottom">
                <e-icon class="layout-icon" @click="$emit('change-layout')"><ExpandDown /></e-icon>
              </e-tooltip>
            </div>
            <e-tabs v-model="tabActiveName" type="section">
              <e-tab-pane v-if="hasComment" name="communication" class="tab-content-container">
                <template #label>
                  <h2 class="tab-title">沟通交流 ({{ messageTotal }})</h2>
                </template>
                <e-scrollbar ref="commentRef" class="comment-container">
                  <ep-comment class="comment" v-bind="commentPassThroughProps" :scroll-container="commentScrollTarget" @message-change="handleMessageChange" />
                </e-scrollbar>
              </e-tab-pane>
              <e-tab-pane v-if="hasApproveHistory" name="approveHistory" class="tab-content-container">
                <template #label>
                  <h2 class="tab-title">审批记录</h2>
                </template>
                <e-scrollbar class="record-container">
                  <workflow-approve-history class="approve-history" v-bind="approveHistoryProps" />
                </e-scrollbar>
              </e-tab-pane>
            </e-tabs>
          </div>
        </div>
      </div>
    </e-scrollbar>
    <div v-if="showAnchor" class="anchor-content">
      <e-anchor
        class="anchor"
        :target="contentInnerRef"
        :scroll-target="anchorScrollTarget"
        :tags="tags"
        :extra-nodes="anchorExtraNodes"
        @active-change="handleAnchorActiveChange"
        @type-change="$emit('type-change', $event)"
      />
    </div>
    <div v-if="hasFooter" class="content-footer">
      <slot name="footer" />
    </div>
  </e-container>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, useSlots, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { ExpandDown } from '@epoint-fe/eui-icons';
import { EpComment } from '@epframe/eui-core';
import { workflowApproveHistory } from '@epframe/epoint-workflow-vue';

const props = defineProps({
  specific: { type: Boolean, default: false },
  tags: { type: Array, default: () => ['.e-collapse-item__title'] },
  anchorExtraNodes: { type: Array, default: () => [] },
  commentConfig: { type: Object, default: null },
  approveHistoryConfig: { type: Object, default: null }
});

const emit = defineEmits(['change-layout', 'active-change', 'type-change']);

const slots = useSlots();
const mainRef = ref(null);
const contentRef = ref(null);
const contentRootRef = ref(null);
const contentInnerRef = ref(null);
const commentRef = ref(null);
const pageRef = ref(null);
const sideContentRef = ref(null);
const resizeObserver = shallowRef();
const contentOffsetRight = ref(0);
const messageTotal = ref(0);
const tabActiveName = ref('communication');

const hasComment = computed(() => Boolean(props.commentConfig));
const hasApproveHistory = computed(() => Boolean(props.approveHistoryConfig));
const hasSide = computed(() => hasComment.value || hasApproveHistory.value);
const hasFooter = computed(() => Boolean(slots.footer));
const showAnchor = computed(() => props.tags.length > 0);
const mainWrapRef = computed(() => mainRef.value?.wrapRef);
const contentWrapRef = computed(() => contentRef.value?.wrapRef);
const commentWrapRef = computed(() => commentRef.value?.wrapRef);
const anchorScrollTarget = computed(() => (props.specific ? contentWrapRef.value : mainWrapRef.value));
const commentScrollTarget = computed(() => (props.specific ? commentWrapRef.value : mainWrapRef.value));
const commentPassThroughProps = computed(() => {
  if (!props.commentConfig) {
    return {};
  }

  return Object.fromEntries(Object.entries(props.commentConfig).filter(([key]) => key !== 'scrollContainer'));
});
const approveHistoryProps = computed(() => props.approveHistoryConfig || {});

const layoutStyle = computed(() => {
  return {
    '--footer-space': hasFooter.value ? '56px' : '0px',
    '--footer-right': `${contentOffsetRight.value}px`
  };
});

const updateContentOffsetRight = () => {
  const rect = contentRootRef.value?.getBoundingClientRect();
  if (!rect) {
    contentOffsetRight.value = 0;
    return;
  }

  contentOffsetRight.value = Math.round(window.innerWidth - rect.right);
};

const handleMessageChange = ({ total }) => {
  messageTotal.value = total || 0;
};

/**
 * 在纵向布局下将主滚动容器定位到侧栏区域。
 */
const scrollMainToSideContent = async () => {
  if (props.specific) {
    return;
  }

  await nextTick();

  const sideEl = sideContentRef.value;
  if (!mainWrapRef.value || !sideEl) {
    return;
  }

  sideEl.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  });
};

const handleAnchorActiveChange = (newValue) => {
  if (!newValue) {
    return;
  }

  if (newValue.name.startsWith('沟通交流') && hasComment.value) {
    tabActiveName.value = 'communication';
    scrollMainToSideContent();
  } else if (newValue.name.startsWith('审批记录') && hasApproveHistory.value) {
    tabActiveName.value = 'approveHistory';
    scrollMainToSideContent();
  }

  emit('active-change', newValue);
};

watch(
  [hasComment, hasApproveHistory],
  ([commentEnabled, approveHistoryEnabled]) => {
    if (commentEnabled) {
      tabActiveName.value = 'communication';
      return;
    }

    if (approveHistoryEnabled) {
      tabActiveName.value = 'approveHistory';
    }
  },
  { immediate: true }
);

watch(
  contentRootRef,
  (el) => {
    resizeObserver.value && resizeObserver.value.stop();
    if (el) {
      resizeObserver.value = useResizeObserver(el, () => {
        updateContentOffsetRight();
      });
      updateContentOffsetRight();
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (resizeObserver.value) resizeObserver.value.stop();
});

defineExpose({
  mainRef,
  mainWrapRef,
  contentRef,
  contentWrapRef,
  commentRef,
  commentWrapRef,
  contentRootRef,
  pageRef
});
</script>

<style scoped lang="scss">
.side-layout {
  gap: calc(var(--e-space-xl) - var(--e-space-m));
  height: 100%;
  overflow: hidden;
  position: relative;

  :deep(.side-layout-main) {
    height: auto;
    min-height: 100%;
    padding-bottom: var(--footer-space);
  }

  .main {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding-right: var(--e-space-m);
  }

  .content-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--e-space-xl);
  }

  .main-content {
    min-width: 0;
    background-color: var(--e-fill-color);
    border-radius: var(--e-border-radius-base);
    padding: var(--e-space-xxl) 0;
  }

  .side-content {
    min-width: 0;
    min-height: 300px;
    background-color: var(--e-fill-color);
    border-top-left-radius: var(--e-border-radius-base);
    border-top-right-radius: var(--e-border-radius-base);
  }

  .tab-container {
    // padding: 24px;
    // padding-right: 16px;
    position: relative;
    height: 100%;

    &.is-specific {
      .layout-icon {
        transform: rotate(0deg) !important;
      }
    }

    & > :deep(.e-tabs) {
      height: 100%;
      display: flex;
      flex-direction: column;

      --e-tabs-header-height: 32px;

      .e-tabs__header {
        margin: 0 0 15px;
        padding: 24px 24px 0;
        position: relative;
      }

      .e-tabs__active-bar {
        bottom: 0;
      }
    }

    .tab-header-btns {
      position: absolute;
      right: 24px;
      top: 24px;
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 40px;
      z-index: 10;
      gap: var(--e-space-m);

      .layout-icon {
        cursor: pointer;
        color: var(--e-icon-color-1);
        transform: rotate(-90deg);
      }

      .layout-icon,
      .sort-button {
        &:hover {
          color: var(--e-color-primary);

          :deep(.e-icon) {
            color: var(--e-color-primary);
          }
        }
      }
    }
  }

  .tab-content-container {
    height: 100%;
    padding: 0 12px;
  }

  .tab-title {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: var(--text-primary-2);
  }

  .comment-container,
  .record-container {
    height: 100%;
  }

  .comment {
    padding-left: var(--e-space-l);
    padding-right: var(--e-space-l);
  }

  .approve-history {
    padding: 0 var(--e-space-l);
  }

  :deep(.ep-comment-file-list--vertical) {
    max-width: 100%;
  }

  .content-footer {
    position: absolute;
    bottom: 0;
    left: var(--e-space-xl);
    right: var(--footer-right);
    min-height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--e-fill-color);
    border-top: 1px solid var(--e-function-color-line);
    z-index: 999;
  }

  &.specific {
    :deep(.side-layout-main) {
      height: 100%;
      overflow: auto;
      padding-bottom: 0;
    }

    .content-page {
      height: 100%;
      flex-direction: row;
      gap: 10px;
    }

    .main-content {
      flex: 1;
      overflow: hidden;
      margin-bottom: var(--footer-space);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .content-scrollbar {
      height: 100%;
    }

    .side-content {
      width: 25%;
      max-width: 480px;
      min-width: 400px;
      flex-shrink: 0;
      overflow: hidden;
    }
  }
}
</style>
