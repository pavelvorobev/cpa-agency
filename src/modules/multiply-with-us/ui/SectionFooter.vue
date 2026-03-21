<script setup lang="ts">
import { ScrollToTop } from '@/common/ui'

defineOptions({
  name: 'MultiplyWithUsSectionFooter',
})

const social = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Telegram', href: 'https://t.me' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
] as const
</script>

<template>
  <footer class="multiply-section-footer">
    <div class="multiply-section-footer__social">
      <a
        v-for="link in social"
        :key="link.label"
        class="multiply-section-footer__link"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ link.label }}
      </a>
    </div>
    <ScrollToTop class="multiply-section-footer__link multiply-section-footer__top">
      Scroll to top ↑
    </ScrollToTop>
  </footer>
</template>

<style scoped lang="scss">
.multiply-section-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0;
  box-sizing: border-box;
}

.multiply-section-footer__social {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.multiply-section-footer__link {
  box-sizing: border-box;
  padding: 10px;
  border: 0;
  background: none;
  font-family: $font-family-base;
  font-size: $fs-20;
  line-height: normal;
  font-weight: $font-weight-bold;
  letter-spacing: tracking-in-percent(3);
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: #{fs(4)};
  color: $color-yellow;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: $color-white;
  }

  &:focus-visible {
    outline: #{fs(2)} solid $color-yellow;
    outline-offset: #{fs(2)};
  }
}

.multiply-section-footer__top {
  margin-left: auto;
}
</style>
