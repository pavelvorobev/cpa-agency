<script setup lang="ts">

interface Props {
  tag?: string
}

defineProps<Props>()
</script>

<template>
  <component :is="tag ?? 'div'" class="container">
    <slot />
  </component>
</template>

<style lang="scss">
:root {
  --side-offset: 25rem;

  @media (width <= 1280px) {
    --side-offset: 17rem;
  }

  @media (width < 768px) {
    --side-offset: 8rem;
  }
}
.container {
  width: 100%;
  max-width: calc(100dvw - var(--side-offset) * 2);
  margin-inline: auto;
}
</style>