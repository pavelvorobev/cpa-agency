<script setup lang="ts">
import { ref } from 'vue'

import { Hero } from '@/modules/hero'
import { MultiBenefitsSection } from '@/modules/MultiBenefitsSection'
import { MultiTasksSection } from '@/modules/MultiTasksSection'
import { useSectionScrollAnimation } from '@/modules/SectionScrollAnimation'
import { MultiWithUsSection } from '@/modules/MultiWithUsSection'

defineOptions({
  name: 'HomePage',
})

const pageRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

useSectionScrollAnimation(pageRef, trackRef)
</script>

<template>
  <main ref="pageRef" class="home-page">
    <div ref="trackRef" class="home-page__track">
      <div class="home-page__section" data-scroll-section>
        <Hero />
      </div>
      <div class="home-page__section" data-scroll-section>
        <MultiTasksSection />
      </div>
      <div class="home-page__section" data-scroll-section>
        <MultiBenefitsSection />
      </div>
      <div class="home-page__section" data-scroll-section>
        <MultiWithUsSection />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.home-page {
  position: relative;
  height: 100dvh;
  overflow: hidden;
}

.home-page__track {
  width: 100%;
  will-change: transform;
}

.home-page__section {
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
}
</style>
