<script setup lang="ts">
import { UiIcon } from '@/common/ui'

import type { MultiplyCategory, MultiplyCategoryId } from '../model/categories'

defineOptions({
  name: 'MultiplyWithUsCategoryNav',
})

const props = defineProps<{
  categories: MultiplyCategory[]
  activeId: MultiplyCategoryId
}>()

const emit = defineEmits<{
  select: [id: MultiplyCategoryId]
}>()
</script>

<template>
  <nav class="multiply-category-nav" aria-label="Audience">
    <ul class="multiply-category-nav__list">
      <li v-for="item in props.categories" :key="item.id" class="multiply-category-nav__item">
        <button
          type="button"
          class="multiply-category-nav__btn"
          :class="{ 'multiply-category-nav__btn--active': item.id === props.activeId }"
          :aria-current="item.id === props.activeId ? 'true' : undefined"
          @click="emit('select', item.id)"
        >
          <span class="multiply-category-nav__label">{{ item.label }}</span>
          <span class="multiply-category-nav__arrow" aria-hidden="true">
            <UiIcon name="arrow-right" fit />
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
/* Макет 1440×900: высота кнопки ровно 90px (border-box).
   33+33+lh24+border2 = 92 — перебор; при lh 24 нужен pad-y 32: 32+32+24+2 = 90 */
$multiply-nav-pad-y: 32;
$multiply-nav-pad-x: 57;
$multiply-nav-gap: 40;

.multiply-category-nav {
  width: max-content;
  max-width: 100%;
}

.multiply-category-nav__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: #{fs(20)};
  margin: 0;
  padding: 0;
  list-style: none;
}

.multiply-category-nav__item {
  flex-shrink: 0;
  max-width: 100%;
}

.multiply-category-nav__btn {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: max-content;
  max-width: 100%;
  gap: #{fs($multiply-nav-gap)};
  height: #{fs(90)};
  min-height: #{fs(90)};
  max-height: #{fs(90)};
  padding: #{fs($multiply-nav-pad-y)} #{fs($multiply-nav-pad-x)};
  border: #{fs(1)} solid $color-yellow;
  border-radius: #{fs(45)};
  background: transparent;
  font-family: inherit;
  font-size: $fs-32;
  line-height: $fs-24;
  font-weight: $font-weight-bold;
  letter-spacing: tracking-in-percent(2);
  text-transform: uppercase;
  color: $color-yellow;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &--active,
  &:focus-visible {
    background: $color-yellow;
    color: $color-secondary;
    border-color: $color-secondary;
  }

  @media (hover: hover) {
    &:hover {
      background: $color-yellow;
      color: $color-secondary;
      border-color: $color-secondary;
    }
  }

  &:focus-visible {
    outline: #{fs(2)} solid $color-secondary;
    outline-offset: #{fs(2)};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
}

.multiply-category-nav__label {
  flex: 0 1 auto;
  min-width: 0;
  text-align: left;
  white-space: nowrap;
}

/* 56px при $fs-32 на кнопке ≈ 1.75em — тот же масштаб, что и у типографики навигации */
.multiply-category-nav__arrow {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  line-height: 0;
  color: inherit;
  width: 1.75em;
  aspect-ratio: 52 / 23;
}
</style>
