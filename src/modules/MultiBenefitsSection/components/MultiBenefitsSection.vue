<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchBenefits } from '../api/benefitsApi'
import type { BenefitsSection } from '../types/benefits.types'
import { UiIcon, UiSection, UiContainer } from '@/common/ui'
import { SectionHeader } from '@/common/ui'

const sectionData = ref<BenefitsSection | null>(null)

onMounted(async () => {
  sectionData.value = await fetchBenefits()
})

const highlightedTitle = computed(() => {
  if (!sectionData.value?.title) return ''
  const escaped = sectionData.value.title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
  return escaped.replace(
    /guaranteed/gi,
    '<span class="benefits-section__heading-highlight">$&</span>',
  )
})
</script>

<template>
  <UiSection v-if="sectionData" class="benefits-section">
    <UiContainer>
      <SectionHeader id="multi-benefits-section-title" class="benefits-section__title">
        MULTI-BENEFITS
      </SectionHeader>
      <div class="benefits-section__body">
        <div class="benefits-section__left">
          <p
            v-if="sectionData?.title"
            class="benefits-section__heading"
            v-html="highlightedTitle"
          />
          <p v-if="sectionData?.description" class="benefits-section__description">
            {{ sectionData.description }}
          </p>
        </div>
        <ul v-if="sectionData?.benefits?.length" class="benefits-section__list">
          <li
            v-for="(benefit, index) in sectionData.benefits"
            :key="index"
            class="benefits-section__item"
          >
            {{ benefit }}
          </li>
        </ul>
        <div class="benefits-section__line">
          <div class="benefits-section__line-track">
            <span v-for="i in 6" :key="i" class="benefits-section__line-item">
              Dream big earn bigger!
              <UiIcon name="main-logo" width="30" height="27" class="benefits-section__line-icon" />
            </span>
          </div>
        </div>
      </div>
    </UiContainer>
  </UiSection>
</template>

<style lang="scss" scoped>
.benefits-section {
  position: relative;

  &__title {
    margin-bottom: 30rem;
    color: $color-yellow;
    text-align: right;
    text-transform: uppercase;

    @include text-style(20rem, 90%, 700, -0.04em);

    @media (max-height: 899px) {
      margin-bottom: 15rem;
    }
  }

  &__body {
    display: grid;
    padding-bottom: 30rem;
    grid-template-columns: 3fr 2fr;
    gap: 10rem;
    background-image: url('@/app/assets/images/landing/section-3.png');
    background-repeat: no-repeat;
    background-position: center bottom -10rem;
    background-size: 190rem;
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: 15rem;
  }

  &__heading {
    font-weight: 700;
    color: $color-white;

    @include text-style(25rem, 100%, 700);
  }

  &__heading :deep(.benefits-section__heading-highlight) {
    color: $color-yellow;
  }

  &__description {
    max-width: 282rem;
    font-weight: 500;
    color: $color-white;

    @include text-style(10rem, 120%, 500);
  }

  &__list {
    display: flex;
    flex-direction: column;
    margin-top: 70rem;
    gap: 10rem;
    list-style: none;
  }

  &__item {
    background-color: $color-primary;
    border-radius: 8rem;
    padding: 10rem;
    font-weight: 700;
    color: $color-white;

    @include text-style(10rem, 120%, 700);

    &:hover {
      background-color: $color-yellow;
      color: $color-dark;
    }

    @media (max-height: 899px) {
      padding: 10rem 12rem;
    }
  }

  &__line {
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 80%;
    width: 100%;
    height: 52rem;
    border-top: 1.5rem solid $color-yellow;
    border-bottom: 1.5rem solid $color-yellow;
    transform: rotate(1deg);
  }

  &__line-track {
    display: flex;
    align-items: center;
    height: 100%;
    width: max-content;
    animation: marquee 20s linear infinite;
  }

  &__line-item {
    display: inline-flex;
    align-items: center;
    gap: 25rem;
    padding-right: 25rem;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;

    @include text-style(35rem, 100%, 300);
  }

  &__line-icon {
    color: $color-yellow;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
}
</style>
