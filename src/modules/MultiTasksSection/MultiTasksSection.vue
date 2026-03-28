<script setup lang="ts">
import { SectionHeader } from '@/common/ui'

defineOptions({
  name: 'MultiTasksSection',
})
</script>

<template>
  <section class="multi-tasks-section" aria-labelledby="multi-tasks-section-title">
    <div class="multi-tasks-section__backdrop" aria-hidden="true" />
    <header class="multi-tasks-section__top">
      <SectionHeader id="multi-tasks-section-title">MULTI-TASKS</SectionHeader>
    </header>
  </section>
</template>

<style scoped lang="scss">
.multi-tasks-section {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  height: 100dvh;
  max-height: 100dvh;
  background: transparent;
}

.multi-tasks-section__backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% - 50vw);
  width: 100vw;
  max-width: 100vw;
  z-index: 0;
  pointer-events: none;
  box-sizing: border-box;
  backdrop-filter: brightness(0.48);
  -webkit-backdrop-filter: brightness(0.48);
  background: linear-gradient(
    90deg,
    rgba(20, 9, 26, 0.22) 0%,
    rgba(20, 9, 26, 0.22) 56%,
    rgba(34, 0, 50, 0.32) 100%
  );
}

.multi-tasks-section__top {
  position: relative;
  z-index: 1;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  padding-top: #{fs(60)};
  padding-inline: 0;
}
</style>
