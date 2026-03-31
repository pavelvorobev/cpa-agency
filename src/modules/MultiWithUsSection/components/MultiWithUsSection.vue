<script setup lang="ts">
import { SectionHeader, UiContainer, UiFooter, UiIcon } from '@/common/ui'

import { useMultiplySection } from '../api/useMultiplySection'
import CategoryNavButton from './CategoryNavButton.vue'
import InfoCard from './InfoCard.vue'
import SnakeFigure from './SnakeFigure.vue'
import { UiSection } from '@/common/ui'

defineOptions({
  name: 'MultiWithUsSection',
})

const emit = defineEmits<{
  (e: 'join'): void
}>()

const { activeId, categories, content, ctaLabel, selectCategory, loading } = useMultiplySection()

function onJoin() {
  emit('join')
}
</script>

<template>
  <UiSection>
    <div class="multi-with-us" aria-labelledby="multi-with-us-title">
      <div class="multi-with-us__snake">
        <SnakeFigure />
      </div>

      <div class="multi-with-us__inner">
        <UiContainer class="multi-with-us__shell">
          <div class="multi-with-us__body">
            <div class="multi-with-us__left">
              <nav class="multi-with-us-category-nav" aria-label="Audience">
                <ul class="multi-with-us-category-nav__list">
                  <li
                    v-for="item in categories"
                    :key="item.id"
                    class="multi-with-us-category-nav__item"
                  >
                    <CategoryNavButton
                      :active="item.id === activeId"
                      :aria-current="item.id === activeId ? 'true' : undefined"
                      @click="selectCategory(item.id)"
                    >
                      <span class="multi-with-us-category-nav__label">{{ item.label }}</span>
                      <span class="multi-with-us-category-nav__arrow" aria-hidden="true">
                        <UiIcon name="arrow-right" fit />
                      </span>
                    </CategoryNavButton>
                  </li>
                </ul>
              </nav>
            </div>

            <div class="multi-with-us__right">
              <InfoCard
                :lead="content.lead"
                :highlight="content.highlight"
                :cta-label="ctaLabel"
                :pending="loading"
                @join="onJoin"
              />
              <UiFooter class="multi-with-us__footer" />
            </div>
          </div>

          <SectionHeader id="multi-with-us-title" class="multi-with-us__title-wrap">
            Multiply with us
          </SectionHeader>
        </UiContainer>
      </div>
    </div>
  </UiSection>
</template>

<style scoped lang="scss">
/* Full-bleed: секция на ширину вьюпорта, чтобы змея в left/bottom не упиралась в UiContainer */
.multi-with-us {
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  height: 100dvh;
  min-height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
  /* padding-top: #{fs(60)};
  padding-bottom: max(#{fs(9)}, env(safe-area-inset-bottom, 0px)); */
}

/* Макет 1440×900: картинка 613×481.85 — ширина от вьюпорта, высота по пропорции */
.multi-with-us__snake {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: calc(100vw * 613 / 1440);
  max-width: 100%;
  aspect-ratio: 613 / 481.85;
  height: auto;
  pointer-events: none;
}

.multi-with-us__inner {
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  height: 100%;
  min-height: 0;
}

.multi-with-us__shell {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
  gap: #{fs(32)};
}

:deep(.multi-with-us__title-wrap) {
  flex-shrink: 0;
  align-self: flex-end;
  margin: 0;
}

@media (min-width: 901px) {
  :deep(.multi-with-us__title-wrap) {
    order: 0;
  }

  .multi-with-us__body {
    order: 1;
  }
}

.multi-with-us__body {
  display: grid;
  flex: 1 1 auto;
  box-sizing: border-box;
  width: 100%;
  min-height: 0;
  grid-template-columns: minmax(0, 40%) minmax(0, 60%);
  grid-template-rows: minmax(0, 1fr);
  gap: #{fs(32)} #{fs(48)};
  align-items: stretch;
}

.multi-with-us__left {
  display: flex;
  flex-direction: column;
  align-self: start;
  min-width: 0;
  min-height: 0;
}

.multi-with-us-category-nav {
  width: max-content;
  max-width: 100%;
}

.multi-with-us-category-nav__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: #{fs(20)};
  margin: 0;
  padding: 0;
  list-style: none;
}

.multi-with-us-category-nav__item {
  flex-shrink: 0;
  max-width: 100%;
}

.multi-with-us-category-nav__label {
  flex: 0 1 auto;
  min-width: 0;
  text-align: left;
  white-space: nowrap;
}

.multi-with-us-category-nav__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: inherit;
  width: #{fs(50)};
  height: #{fs(50)};
  flex-shrink: 0;
}

.multi-with-us__right {
  display: flex;
  flex-direction: column;
  gap: #{fs(24)};
  max-width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
}

.multi-with-us__right > :deep(.multi-with-us-info-card) {
  flex: 1 1 0;
  align-self: stretch;
  min-height: 0;
}

.multi-with-us__footer {
  flex-shrink: 0;
  align-self: stretch;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  z-index: 3;
}

@media (max-width: 900px) {
  .multi-with-us {
    padding-top: calc(40px + 40px + env(safe-area-inset-top, 0px));
    padding-bottom: max(8px, env(safe-area-inset-bottom, 0px));
  }

  .multi-with-us__body {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr);
    align-items: stretch;
    row-gap: 20px;
    column-gap: 0;
  }

  .multi-with-us__left {
    grid-row: 1;
  }

  .multi-with-us__right {
    grid-row: 2;
    min-height: 0;
    gap: 0;
  }

  .multi-with-us-category-nav {
    width: 100%;
  }

  .multi-with-us-category-nav__list {
    gap: 12px;
    align-items: center;
  }

  .multi-with-us-category-nav__item {
    width: fit-content;
  }

  .multi-with-us-category-nav__label {
    white-space: normal;
    text-align: left;
  }

  .multi-with-us-category-nav__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .multi-with-us__shell {
    gap: 30px;
  }

  :deep(.multi-with-us__title-wrap) {
    align-self: stretch;
  }

  .multi-with-us__footer {
    display: none;
  }

  .multi-with-us__snake {
    display: none;
  }
}
</style>
