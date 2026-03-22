<script setup lang="ts">
import { SectionHeader } from '@/common/ui'

defineOptions({
  name: 'MultiTasks',
})
</script>

<template>
  <section class="multi-tasks" aria-labelledby="multi-tasks-title">
    <div class="multi-tasks__backdrop" aria-hidden="true" />
    <header class="multi-tasks__top">
      <SectionHeader id="multi-tasks-title">MULTI-TASKS</SectionHeader>
    </header>
  </section>
</template>

<style scoped lang="scss" src="./styles/section.scss"></style>
