<script setup lang="ts">
import { UiContainer } from '@/common/ui'
import { Hero } from '@/modules/hero'
import { MultiBenefits } from '@/modules/multi-benefits'
import { MultiTasks } from '@/modules/multi-tasks'
import { MultiplyWithUs } from '@/modules/multiply-with-us'

defineOptions({
  name: 'HomePage',
})
</script>

<template>
  <UiContainer>
    <Hero />
    <MultiTasks />
    <MultiBenefits />
    <MultiplyWithUs />
  </UiContainer>
</template>

<style scoped lang="scss"></style>
