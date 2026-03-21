<script setup lang="ts">
import { CubicButton, UiIcon } from '@/common/ui'

defineOptions({
  name: 'MultiplyWithUsInfoCard',
})

const props = withDefaults(
  defineProps<{
    lead: string
    highlight: string
    /** Первичная загрузка с API */
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
      <CubicButton size="md" @click="emit('join')">Join the team</CubicButton>
    </div>
  </article>
</template>

<style scoped lang="scss">
/* Размеры от колонки и доступной высоты: ширина 100% колонки, высота — доля flex-слота справа */
.multiply-info-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  font-size: $fs-20;
  /* отступы от шрифта карточки */
  gap: 0.8em;
  padding: 1.6em 1.8em;
  border-radius: 1.4em;
  background: $color-primary;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
}

.multiply-info-card__text {
  margin: 0;
  max-width: 100%;
  font-weight: $font-weight-medium;
  line-height: 1.2;
  color: $color-white;
}

.multiply-info-card__text--emphasis {
  font-weight: $font-weight-bold;
}

/* Стрелка в em от шрифта карточки ($fs-20): на референсе 56px ≈ 2.8em; масштаб как у всего макета */
.multiply-info-card__sep {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: calc(2.8em * 23 / 52);
  height: 2.8em;
  line-height: 0;
  color: $color-secondary;
}

.multiply-info-card__sep-inner {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2.8em;
  aspect-ratio: 52 / 23;
  transform: translate(-50%, -50%) rotate(90deg);
}

.multiply-info-card--pending {
  opacity: 0.65;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
</style>
