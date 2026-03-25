<script setup lang="ts">
import UiLink from './UiLink.vue';

interface Props {
  itemClass?: string
}

defineProps<Props>()
</script>

<template>
  <div>
      <UiLink href="#en" :class="itemClass">Eng</UiLink>
      <span class="ui-link" :class="itemClass">/</span>
      <UiLink href="#ru" :class="itemClass">Рус</UiLink>
  </div>
</template>