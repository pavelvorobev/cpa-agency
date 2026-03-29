<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  tag?: string
  class?: HTMLAttributes['class']
}

defineProps<Props>()
</script>

<template>
  <component :is="tag ?? 'div'" class="container" :class="class">
    <slot />
  </component>
</template>

<style lang="scss">
$side-offset: 25rem;

.container {
  width: 100%;
  max-width: calc(100dvw - #{$side-offset} * 2);
  margin-inline: auto;
}
</style>
