<script setup lang="ts">
defineProps<{
  noPaddingBottom?: boolean
}>()
</script>

<template>
  <section class="ui-section" :class="{ 'ui-section--no-padding-bottom': noPaddingBottom }">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.ui-section {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  padding: 30rem 0 62rem 0;
  box-sizing: border-box;

  @media (max-height: 899px) {
    padding: 10rem 0 14rem 0;
  }

  &--no-padding-bottom {
    padding-bottom: 0;
  }
}
</style>
