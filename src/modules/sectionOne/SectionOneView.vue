<script setup lang="ts">
import heroImg from '@/app/assets/images/landing/hero.png';
import { UiContainer, UiIcon } from '@/common/ui';
import AnimatedWords from './components/AnimatedWords.vue';

const socials = [
  {url: '#', icon: 'instagram'},
  {url: '#', icon: 'linkedin'},
  {url: '#', icon: 'telegram'},
]
</script>

<template>
  <section class="section-one">
    <div>
      <img class="section-one__image" :src="heroImg" alt="">
    </div>
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

    <div class="section-one__socials">
      <UiContainer>
        <template v-for="item in socials">
          <a :href="item.url" target="_blank" rel="noopener" class="social-link">
            <UiIcon :name="item.icon" />
          </a>
        </template>
      </UiContainer>
    </div>
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
  background: linear-gradient(135deg, #dc8400 0%, #560080 55.77%, #220032 100%);
  position: relative;
  overflow: hidden;

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  &__button {
    width: fit-content;
  }

  &__image {
    position: absolute;
    display: block;
    width: 475rem;
    z-index: 1;
    inset-inline-end: 0;
    inset-block-end: 0;
    max-width: 1400px;

    @media (width < 1340px) {
      inset-block-end: -40rem;
    }
  }

  &__socials {
    position: absolute;
    inset-inline-start: 0;
    inset-block-end: 0;
    width: 100%;
    padding-block-end: 27rem;
    z-index: 2;
  }
}

.social-link {
  display: inline-block;
  color: #{$color-white};

  &:not(:first-child) {
    margin-inline-start: 30px;
  }
}
</style>
