<script setup lang="ts">
import type { AnchorHTMLAttributes } from 'vue';

interface UiLinkProps extends /* @vue-ignore */ AnchorHTMLAttributes {
  active?: boolean;
}

defineProps<UiLinkProps>()
</script>

<template>
  <a class="ui-link" :class="{ 'ui-link--active': active }" v-bind="$attrs">
    <slot />
  </a>
</template>

<style lang="scss">
.ui-link {
  color: #{$color-yellow};
  text-transform: uppercase;
  text-decoration: underline;
  font-weight: 600;
  font-size: 10rem;
  transition: color 0.15s ease-in-out;

  &--active {
    color: #{$color-white};
  }
  
  @media (hover: hover) {
    &:where([href]):not(&--active):hover {
      color: #{$color-white};
    }
  }
}
</style>

<style scoped lang="scss">
.ui-link {
  cursor: pointer;
}
</style>