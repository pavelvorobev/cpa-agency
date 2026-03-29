<script setup lang="ts">
import { UiContainer } from '@/common/ui';
import AnimatedWords from './components/AnimatedWords.vue';
</script>

<template>
  <section class="section-one">
    <div></div>
    <UiContainer class="section-one__content">
        <h1 class="heading-1">
          PRACTICE MAKES 
          <AnimatedWords :words="['PROFIT', 'GROWTH', 'SKILS']" height="39rem" class="color-yellow" />
        </h1>
        <p class="input-16">
          We provide effective solutions, tested and refined on our own products and ad budgets
        </p>
        <button class="section-one__button button-text-20">Get in Touch</button>
    </UiContainer>
  </section>
</template>

<style scoped lang="scss">
.heading-1,
.input-16 {
  margin: 0;
}

.heading-1 {
  max-width: 385rem;
  margin-block-end: 6rem;
}

.input-16 {
  max-width: 235rem;
  line-height: 1.5;
  margin-block-end: 15rem;
}

.section-one {
  height: 100dvh;

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__button {
    width: fit-content;
  }
}
</style>
