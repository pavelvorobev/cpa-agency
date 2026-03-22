<script setup lang="ts">
import { SectionHeader, UiContainer, UiFooter, UiIcon } from '@/common/ui'

import { useMultiplySection } from './model/useMultiplySection'
import CategoryNavButton from './ui/CategoryNavButton.vue'
import InfoCard from './ui/InfoCard.vue'
import SnakeFigure from './ui/SnakeFigure.vue'

defineOptions({
  name: 'MultiplyWithUs',
})

const { activeId, categories, content, ctaLabel, selectCategory, loading } = useMultiplySection()

function onJoin() {
  console.info('[MultiplyWithUs] join CTA')
}
</script>

<template>
  <section class="multiply-with-us" aria-labelledby="multiply-with-us-title">
    <div class="multiply-with-us__snake">
      <SnakeFigure />
    </div>

    <div class="multiply-with-us__inner">
      <UiContainer class="multiply-with-us__shell">
        <div class="multiply-with-us__body">
          <div class="multiply-with-us__left">
            <nav class="multiply-category-nav" aria-label="Audience">
              <ul class="multiply-category-nav__list">
                <li v-for="item in categories" :key="item.id" class="multiply-category-nav__item">
                  <CategoryNavButton
                    :active="item.id === activeId"
                    :aria-current="item.id === activeId ? 'true' : undefined"
                    @click="selectCategory(item.id)"
                  >
                    <span class="multiply-category-nav__label">{{ item.label }}</span>
                    <span class="multiply-category-nav__arrow" aria-hidden="true">
                      <UiIcon name="arrow-right" fit />
                    </span>
                  </CategoryNavButton>
                </li>
              </ul>
            </nav>
          </div>

          <div class="multiply-with-us__right">
            <InfoCard
              :lead="content.lead"
              :highlight="content.highlight"
              :cta-label="ctaLabel"
              :pending="loading"
              @join="onJoin"
            />
            <UiFooter class="multiply-with-us__footer" />
          </div>
        </div>

        <SectionHeader id="multiply-with-us-title" class="multiply-with-us__title-wrap">
          Multiply with us
        </SectionHeader>
      </UiContainer>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./styles/section.scss"></style>
