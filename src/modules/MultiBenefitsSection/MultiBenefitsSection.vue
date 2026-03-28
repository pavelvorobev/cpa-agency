<script setup lang="ts">
import { SectionHeader } from '@/common/ui'

defineOptions({
  name: 'MultiBenefitsSection',
})
</script>

<template>
  <section class="multi-benefits-section" aria-labelledby="multi-benefits-section-title">
    <header class="multi-benefits-section__top">
      <SectionHeader id="multi-benefits-section-title">MULTI-BENEFITS</SectionHeader>
    </header>
  </section>
</template>

<style scoped lang="scss">
.multi-benefits-section {
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  height: 100dvh;
  max-height: 100dvh;
}

.multi-benefits-section__top {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  padding-top: #{fs(60)};
  padding-inline: 0;
}
</style>
