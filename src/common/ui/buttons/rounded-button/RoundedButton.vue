<script setup lang="ts">
defineOptions({
  name: 'RoundedButton',
})

withDefaults(
  defineProps<{
    /** Включает активный стиль (заливка + инвертированный цвет) */
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
  <button class="rounded-button" :class="{ 'rounded-button--active': active }" :type="type">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.rounded-button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: max-content;
  max-width: 100%;
  gap: #{fs(40)};
  height: #{fs(90)};
  min-height: #{fs(90)};
  padding: #{fs(32)} #{fs(57)};
  border: #{fs(3)} solid $color-yellow;
  border-radius: #{fs(45)};
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
    &:hover {
      background: $color-yellow;
      color: $color-secondary;
      border-color: $color-secondary;
    }
  }

  &:focus-visible {
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
</style>
