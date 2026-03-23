<script setup lang="ts">
import UiLink from './UiLink.vue';

interface Props {
  itemClass?: string
}

defineProps<Props>()
</script>

<template>
  <div>
      <UiLink href="#team" :class="itemClass">Eng</UiLink>
      <span class="ui-link" :class="itemClass">/</span>
      <UiLink href="#team" :class="itemClass">Рус</UiLink>
  </div>
</template>