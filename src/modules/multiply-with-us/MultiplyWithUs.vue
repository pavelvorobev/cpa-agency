<script setup lang="ts">
import { RoundedButton, UiContainer, UiGridIllumination, UiIcon } from '@/common/ui'

import { useMultiplySection } from './model/useMultiplySection'
import InfoCard from './ui/InfoCard.vue'
import SectionFooter from './ui/SectionFooter.vue'
import SectionHeader from './ui/SectionHeader.vue'
import SnakeFigure from './ui/SnakeFigure.vue'

defineOptions({
  name: 'MultiplyWithUs',
})

const { activeId, categories, content, selectCategory, loading } = useMultiplySection()

function onJoin() {
  // Набросок: сюда позже подключат роут или модалку
  console.info('[MultiplyWithUs] join CTA')
}
</script>

<template>
  <section class="multiply-with-us" aria-labelledby="multiply-with-us-title">
    <UiGridIllumination class="multiply-with-us__grid" />

    <div class="multiply-with-us__snake">
      <SnakeFigure />
    </div>

    <div class="multiply-with-us__inner">
      <UiContainer class="multiply-with-us__shell">
        <header class="multiply-with-us__top">
          <SectionHeader />
        </header>

        <div class="multiply-with-us__body">
          <div class="multiply-with-us__left">
            <nav class="multiply-category-nav" aria-label="Audience">
              <ul class="multiply-category-nav__list">
                <li
                  v-for="item in categories"
                  :key="item.id"
                  class="multiply-category-nav__item"
                >
                  <RoundedButton
                    :active="item.id === activeId"
                    :aria-current="item.id === activeId ? 'true' : undefined"
                    @click="selectCategory(item.id)"
                  >
                    <span class="multiply-category-nav__label">{{ item.label }}</span>
                    <span class="multiply-category-nav__arrow" aria-hidden="true">
                      <UiIcon name="arrow-right" fit />
                    </span>
                  </RoundedButton>
                </li>
              </ul>
            </nav>
          </div>

          <div class="multiply-with-us__right">
            <InfoCard
              :lead="content.lead"
              :highlight="content.highlight"
              :pending="loading"
              @join="onJoin"
            />
            <SectionFooter class="multiply-with-us__footer" />
          </div>
        </div>
      </UiContainer>
    </div>
  </section>
</template>

<style scoped lang="scss">
.multiply-with-us {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  overflow: hidden;
  padding-block: #{fs(48)} #{fs(40)};
  background: linear-gradient(to bottom right, #dc8400 0%, #560080 56%, #220032 100%);
  color: $color-yellow;
}

.multiply-with-us__grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.58;
  pointer-events: none;
}

.multiply-with-us__snake {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: #{fs(630)};
  height: #{fs(360)};
  pointer-events: none;
}

.multiply-with-us__inner {
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  height: 100%;
  min-height: 0;
}

.multiply-with-us__shell {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
}

.multiply-with-us__top {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  margin-bottom: #{fs(32)};
}

.multiply-with-us__body {
  display: grid;
  flex: 1 1 auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  grid-template-columns: minmax(0, 563fr) minmax(0, 767fr);
  grid-template-rows: 1fr;
  gap: #{fs(32)} #{fs(48)};
  align-items: stretch;
  min-height: 0;
}

.multiply-with-us__left {
  display: flex;
  flex-direction: column;
  align-self: start;
  min-width: 0;
}

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

.multiply-category-nav__label {
  flex: 0 1 auto;
  min-width: 0;
  text-align: left;
  white-space: nowrap;
}

.multiply-category-nav__arrow {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  line-height: 0;
  color: inherit;
  width: 1.75em;
  aspect-ratio: 52 / 23;
}

.multiply-with-us__right {
  display: flex;
  flex-direction: column;
  gap: #{fs(24)};
  min-width: 0;
  max-width: 100%;
  min-height: 0;
  overflow: hidden;
}

.multiply-with-us__right > :deep(.multiply-info-card) {
  align-self: stretch;
}

.multiply-with-us__footer {
  flex-shrink: 0;
  align-self: stretch;
  width: 100%;
  margin-top: auto;
  position: sticky;
  bottom: 9px;
  z-index: 3;
}

@media (max-width: 900px) {
  .multiply-with-us__body {
    grid-template-columns: 1fr;
  }

  .multiply-with-us__snake {
    width: min(#{fs(630)}, 100vw);
    height: auto;
    aspect-ratio: 630 / 360;
  }
}
</style>
