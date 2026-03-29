<script setup lang="ts">
import { CubicButton, UiIcon } from '@/common/ui'

defineOptions({
  name: 'MultiWithUsInfoCard',
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
    class="multi-with-us-info-card"
    :class="{ 'multi-with-us-info-card--pending': props.pending }"
    :aria-busy="props.pending"
  >
    <p class="multi-with-us-info-card__text">{{ lead }}</p>
    <span class="multi-with-us-info-card__sep" aria-hidden="true">
      <span class="multi-with-us-info-card__sep-inner">
        <UiIcon name="arrow-right" fit />
      </span>
    </span>
    <p class="multi-with-us-info-card__text multi-with-us-info-card__text--emphasis">{{ highlight }}</p>
    <span class="multi-with-us-info-card__sep" aria-hidden="true">
      <span class="multi-with-us-info-card__sep-inner">
        <UiIcon name="arrow-right" fit />
      </span>
    </span>
    <div class="multi-with-us-info-card__cta">
      <CubicButton size="md" @click="emit('join')">{{ ctaLabel }}</CubicButton>
    </div>
  </article>
</template>

<style scoped lang="scss">
.multi-with-us-info-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  flex: 1 1 0;
  min-height: 0;
  font-size: $fs-20;
  gap: #{fs(16)};
  padding: #{fs(32)} #{fs(36)};
  border-radius: #{fs(28)};
  background: $color-primary;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
}

.multi-with-us-info-card__text {
  margin: 0;
  max-width: 100%;
  font-weight: $font-weight-medium;
  line-height: 1.2;
  color: $color-white;
}

.multi-with-us-info-card__text--emphasis {
  font-weight: $font-weight-bold;
}

.multi-with-us-info-card__sep {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: calc(#{fs(50)} * 23 / 52);
  height: #{fs(50)};
  line-height: 0;
  color: $color-secondary;
}

.multi-with-us-info-card__sep-inner {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: #{fs(50)};
  aspect-ratio: 52 / 23;
  transform: translate(-50%, -50%) rotate(90deg);
}

.multi-with-us-info-card--pending {
  opacity: 0.65;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

@media (max-width: 900px) {
  .multi-with-us-info-card {
    font-size: 16px;
    line-height: 1.35;
    gap: 12px;
    padding: 20px 18px;
    border-radius: 16px;
  }

  .multi-with-us-info-card__text {
    line-height: 1.35;
  }

  .multi-with-us-info-card :deep(.cubic-button.cubic-button--md) {
    --cubic-inset-top: 6px;
    --cubic-inset-right: 7px;
    --cubic-inset-bottom: 2px;
    --cubic-inset-left: 3px;
    --cubic-inline-pad: 12px;
    --cubic-text-pad: 12px;

    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 60px;
    height: 60px;
  }

  .multi-with-us-info-card :deep(.cubic-button--md .cubic-button__label) {
    font-size: 15px;
    letter-spacing: 0.03em;
  }

  .multi-with-us-info-card__sep {
    width: calc(30px * 23 / 52);
    height: 30px;
  }

  .multi-with-us-info-card__sep-inner {
    width: 30px;
    height: 30px;
    aspect-ratio: auto;
  }
}
</style>
