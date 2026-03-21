<script setup lang="ts">
import { UiContainer } from '@/common/ui'
import { MultiplyWithUs } from '@/modules/multiply-with-us'

defineOptions({
  name: 'HomePage',
})
</script>

<template>
  <UiContainer>
    <h1 class="heading-1 homepage-heading">Home Page</h1>
  </UiContainer>
  <MultiplyWithUs />
</template>

<style scoped lang="scss"></style>
