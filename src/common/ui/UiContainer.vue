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
.container {
  --side-offset: 25rem;
  width: 100%;
  max-width: calc(100dvw - var(--side-offset) * 2);
  margin-inline: auto;

  @media (max-height: 899px) {
    --side-offset: 15rem;
  }
}
</style>
