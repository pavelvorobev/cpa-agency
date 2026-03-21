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
  box-sizing: border-box;
  width: 100%;
  /* min(100%, …) — не шире родителя; иначе 100dvw + скроллбар даёт лишний горизонтальный скролл */
  max-width: min(100%, calc(100dvw - #{$side-offset} * 2));
  margin-inline: auto;
}
</style>