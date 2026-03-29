<script setup lang="ts">
import ScrollToTop from './ScrollToTop.vue'

defineOptions({
  name: 'UiFooter',
})

const social = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Telegram', href: 'https://t.me' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
]
</script>

<template>
  <footer class="ui-footer">
    <div class="ui-footer__social">
      <a
        v-for="link in social"
        :key="link.label"
        class="ui-footer__link"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ link.label }}
      </a>
    </div>
    <ScrollToTop class="ui-footer__link ui-footer__top">Scroll to top ↑</ScrollToTop>
  </footer>
</template>

<style scoped lang="scss">
.ui-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: #{fs(10)};
  padding: 0;
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
  z-index: 3;
}

.ui-footer__social {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.ui-footer__link {
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

.ui-footer__top {
  margin-left: auto;
}
</style>
