<script setup lang="ts">
import { UiContainer, UiGridIllumination } from '@/common/ui'
import { MultiplyWithUs } from '@/modules/multiply-with-us'

defineOptions({
  name: 'HomePage',
})
</script>

<template>
  <UiContainer>
    <UiGridIllumination spot-size="lg" :spot-opacity="0.5" />
    <MultiplyWithUs />
  </UiContainer>
</template>

<style scoped lang="scss"></style>
