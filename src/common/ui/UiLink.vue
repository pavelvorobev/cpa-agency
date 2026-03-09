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

<style scoped lang="scss">
.ui-link {
  cursor: pointer;
}
</style>