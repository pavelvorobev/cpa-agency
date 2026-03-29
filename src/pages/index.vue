<script setup lang="ts">
import { UiContainer } from '@/common/ui'
import { Hero } from '@/modules/Hero'
import { MultiBenefitsSection } from '@/modules/MultiBenefitsSection'
import { MultiTasksSection } from '@/modules/MultiTasksSection'
import { MultiWithUsSection } from '@/modules/MultiWithUsSection'

defineOptions({
  name: 'HomePage',
})
</script>

<template>
  <Hero />
  <MultiTasksSection />
  <MultiBenefitsSection />
  <MultiWithUsSection />
</template>
