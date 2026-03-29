<script setup lang="ts">
defineOptions({
  name: 'CategoryNavButton',
})

withDefaults(
  defineProps<{
    active?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    active: false,
    type: 'button',
  },
)
</script>

<template>
  <button
    class="category-nav-button"
    :class="{ 'category-nav-button--active': active }"
    :type="type"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.category-nav-button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  width: max-content;
  max-width: 100%;
  gap: #{fs(40)};
  height: #{fs(90)};
  padding: 0 #{fs(40)};
  border: #{fs(3)} solid $color-yellow;
  border-radius: #{fs(100)};
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

  &--active {
    background: $color-yellow;
    color: $color-secondary;
    border-color: $color-secondary;
  }

  @media (hover: hover) {
    &:hover:not(:focus-visible) {
      background: $color-yellow;
      color: $color-secondary;
      border-color: $color-secondary;
    }
  }

  &:focus-visible {
    background: transparent;
    color: $color-white;
    border-color: $color-yellow;
    outline: #{fs(2)} solid $color-yellow;
    outline-offset: #{fs(2)};
  }

  &--active:focus-visible {
    background: $color-yellow;
    color: $color-secondary;
    border-color: $color-secondary;
    outline: #{fs(2)} solid $color-secondary;
    outline-offset: #{fs(2)};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
}

@media (max-width: 900px) {
  .category-nav-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: 60px;
    min-height: 60px;
    padding: 0 20px;
    border-width: 2px;
    border-radius: 100px;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.03em;
  }

  .category-nav-button :slotted(.multi-with-us-category-nav__label) {
    flex: 1 1 auto;
    min-width: 0;
  }

  .category-nav-button :slotted(.multi-with-us-category-nav__arrow) {
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
  }

  .category-nav-button:focus-visible {
    outline-width: 2px;
    outline-offset: 2px;
  }

  .category-nav-button--active:focus-visible {
    outline-width: 2px;
    outline-offset: 2px;
  }
}
</style>
