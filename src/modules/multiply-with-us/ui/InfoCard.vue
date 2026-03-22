<script setup lang="ts">
import { CubicButton, UiIcon } from '@/common/ui'

defineOptions({
  name: 'MultiplyWithUsInfoCard',
})

const props = withDefaults(
  defineProps<{
    lead: string
    highlight: string
    ctaLabel: string
    pending?: boolean
  }>(),
  { pending: false },
)

const emit = defineEmits<{
  join: []
}>()
</script>

<template>
  <article
    class="multiply-info-card"
    :class="{ 'multiply-info-card--pending': props.pending }"
    :aria-busy="props.pending"
  >
    <p class="multiply-info-card__text">{{ lead }}</p>
    <span class="multiply-info-card__sep" aria-hidden="true">
      <span class="multiply-info-card__sep-inner">
        <UiIcon name="arrow-right" fit />
      </span>
    </span>
    <p class="multiply-info-card__text multiply-info-card__text--emphasis">{{ highlight }}</p>
    <span class="multiply-info-card__sep" aria-hidden="true">
      <span class="multiply-info-card__sep-inner">
        <UiIcon name="arrow-right" fit />
      </span>
    </span>
    <div class="multiply-info-card__cta">
      <CubicButton size="md" @click="emit('join')">{{ ctaLabel }}</CubicButton>
    </div>
  </article>
</template>

<style scoped lang="scss" src="../styles/info-card.scss"></style>
